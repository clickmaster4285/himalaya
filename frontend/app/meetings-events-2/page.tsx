import { permanentRedirect } from "next/navigation";

/** Legacy duplicate URL — consolidated under /meetings-events. */
export default function MeetingsEvents2RedirectPage() {
  permanentRedirect("/meetings-events");
}
