"use client";

import { useEffect } from "react";

/* Behaviour ported verbatim from the reference build's inline script (tracking, form, lightbox).
   The markup is server-rendered by page.tsx; this component only attaches listeners. */

// ---- configuration (developer) ----
const WA_NUMBER = "923045679000";
const WA_REDIRECT = ""; // set to "/go/school-whatsapp" once the tracked route is live and tested
const FORM_ENDPOINT = ""; // set to the API route (e.g. "/api/school-trips") that e-mails reservations@ and appends the leads sheet
const SOURCE = "landing";

type Params = Record<string, string>;

export default function SchoolTripsClient() {
  useEffect(() => {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    const dl = (w.dataLayer = w.dataLayer || []);
    const track = (ev: string, params: Params = {}) => dl.push({ event: ev, ...params });
    const utms = (): Params => {
      const o: Params = {};
      try {
        new URLSearchParams(location.search).forEach((v, k) => {
          if (k.indexOf("utm_") === 0) o[k] = v;
        });
      } catch {}
      return o;
    };
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Document,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
    ) => {
      el.addEventListener(type, fn as EventListener);
      cleanups.push(() => el.removeEventListener(type, fn as EventListener));
    };

    // page view
    track("school_trip_page_view", { page_location: location.href, page_referrer: document.referrer, ...utms() });

    // WhatsApp links: optional switch to the tracked redirect, and a client-side click event
    document.querySelectorAll<HTMLAnchorElement>(".hv-st a[data-wa]").forEach((a) => {
      const placement = a.getAttribute("data-placement") || "page";
      if (WA_REDIRECT) a.setAttribute("href", `${WA_REDIRECT}?source=${SOURCE}&placement=${encodeURIComponent(placement)}`);
      on(a, "click", () => track("school_trip_whatsapp_click", { source: SOURCE, placement, page_referrer: document.referrer }));
    });
    document.querySelectorAll<HTMLAnchorElement>(".hv-st a[data-tel]").forEach((a) => {
      on(a, "click", () => track("school_trip_call_click", { link_id: "contact_call" }));
    });

    // ---- form ----
    const form = document.getElementById("schoolForm") as HTMLFormElement | null;
    const thanks = document.getElementById("thanks");
    const sticky = document.getElementById("sticky");
    if (form && thanks && sticky) {
      let started = false;
      on(form, "focusin", () => {
        if (!started) {
          started = true;
          track("school_trip_form_start", { form_id: "school_trips" });
        }
        sticky.classList.add("hide");
      });
      on(form, "focusout", () => {
        setTimeout(() => {
          if (!form.contains(document.activeElement)) sticky.classList.remove("hide");
        }, 120);
      });

      const val = (id: string) =>
        ((document.getElementById(id) as HTMLInputElement | null)?.value || "").trim();
      const setInvalid = (id: string, bad: boolean) => {
        const el = document.getElementById(id);
        if (!el) return;
        const f = el.closest(".field");
        el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (f) f.classList.toggle("invalid", bad);
      };
      const validate = () => {
        let ok = true;
        ["school", "contact", "city", "students", "teachers", "date", "type"].forEach((id) => {
          const bad = !val(id);
          setInvalid(id, bad);
          if (bad) ok = false;
        });
        const phone = val("phone").replace(/[\s\-()]/g, "");
        const phoneOk = /^(\+?92|0)?3\d{9}$/.test(phone) || /^\+?\d{10,14}$/.test(phone);
        setInvalid("phone", !phoneOk);
        if (!phoneOk) ok = false;
        return ok;
      };
      const bucket = (s: string) => {
        const n = parseInt(s, 10) || 0;
        return n <= 40 ? "1-40" : n <= 80 ? "41-80" : n <= 150 ? "81-150" : "150+";
      };
      const composeMessage = (d: Params) =>
        "Hello, I am planning a school trip and would like a customised plan and quotation from Himalaya Villas.\n\n" +
        "Institution: " + d.school + "\nContact: " + d.contact + (d.designation ? " (" + d.designation + ")" : "") +
        "\nCity: " + d.city + "\nStudents: " + d.students + " · Teachers: " + d.teachers +
        "\nPreferred date: " + d.date + "\nFormat: " + d.type + (d.notes ? "\nRequirements: " + d.notes : "") +
        "\n\n(Sent from himalayavillas.com/school-trips)";

      on(form, "submit", (e) => {
        e.preventDefault();
        if (val("website")) return; // honeypot
        if (!validate()) {
          const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
          if (first) first.focus();
          return;
        }
        const data: Params = {
          school: val("school"), contact: val("contact"), designation: val("designation"), city: val("city"), phone: val("phone"),
          students: val("students"), teachers: val("teachers"), date: val("date"), type: val("type"), email: val("email"), notes: val("notes"),
          source: SOURCE, placement: "form", page: location.href,
          ...utms(),
        };
        const btn = document.getElementById("submitBtn") as HTMLButtonElement | null;
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Sending…";
        }
        const done = () => {
          form.style.display = "none";
          thanks.style.display = "block";
          document.getElementById("thanksWa")?.setAttribute("href", "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(composeMessage(data)));
          track("school_trip_form_submit", { form_id: "school_trips", trip_type: data.type, students_bucket: bucket(data.students), city: data.city });
          track("formSubmitted", { form_id: "school_trips", trip_type: data.type });
          thanks.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        if (FORM_ENDPOINT) {
          fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
            .then((r) => {
              if (!r.ok) throw new Error("bad status");
              done();
            })
            .catch(() => done()); // the WhatsApp hand-off in the thank-you state means no inquiry is lost
        } else {
          done();
        }
      });
    }

    // ---- lightbox ----
    const figs = Array.from(document.querySelectorAll<HTMLElement>("#galleryGrid figure"));
    const lb = document.getElementById("lb");
    const lbImg = document.getElementById("lbImg") as HTMLImageElement | null;
    const lbCap = document.getElementById("lbCap");
    if (lb && lbImg && lbCap && figs.length) {
      let idx = 0;
      const show = (i: number) => {
        idx = (i + figs.length) % figs.length;
        const img = figs[idx].querySelector("img");
        if (!img) return;
        lbImg.src = img.getAttribute("data-full") || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = figs[idx].querySelector("figcaption")?.textContent || "";
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      };
      const hide = () => {
        lb.classList.remove("open");
        document.body.style.overflow = "";
      };
      figs.forEach((f, i) => {
        on(f, "click", () => show(i));
        f.setAttribute("tabindex", "0");
        on(f, "keydown", (e) => {
          if (e.key === "Enter") show(i);
        });
      });
      const btn = (id: string) => document.getElementById(id);
      const x = btn("lbClose"), prev = btn("lbPrev"), next = btn("lbNext");
      if (x) on(x, "click", hide);
      if (prev) on(prev, "click", () => show(idx - 1));
      if (next) on(next, "click", () => show(idx + 1));
      on(lb, "click", (e) => {
        if (e.target === lb) hide();
      });
      on(document, "keydown", (e) => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") hide();
        if (e.key === "ArrowLeft") show(idx - 1);
        if (e.key === "ArrowRight") show(idx + 1);
      });
      cleanups.push(() => {
        document.body.style.overflow = "";
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
