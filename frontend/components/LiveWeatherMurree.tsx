"use client";

import { useCallback, useEffect, useState } from "react";
import { Cloud, CloudDrizzle, CloudFog, CloudRain, CloudSnow, Droplets, Loader2, Sun, Wind } from "lucide-react";

/** Murree town (Open-Meteo grid). */
const MURREE_LAT = 33.9078;
const MURREE_LON = 73.3903;

type CurrentWeather = {
  temperature: number;
  apparent: number;
  humidity: number;
  windKmh: number;
  code: number;
  time: string;
};

function wmoLabel(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  if (code <= 99) return "Thunderstorm";
  return "Mixed";
}

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  const cn = className ?? "h-10 w-10 text-[#c9a55b]";
  if (code === 0) return <Sun className={cn} aria-hidden />;
  if (code <= 3) return <Cloud className={cn} aria-hidden />;
  if (code <= 48) return <CloudFog className={cn} aria-hidden />;
  if (code <= 57) return <CloudDrizzle className={cn} aria-hidden />;
  if (code <= 67) return <CloudRain className={cn} aria-hidden />;
  if (code <= 77) return <CloudSnow className={cn} aria-hidden />;
  if (code <= 82) return <CloudRain className={cn} aria-hidden />;
  if (code <= 86) return <CloudSnow className={cn} aria-hidden />;
  return <CloudRain className={cn} aria-hidden />;
}

export default function LiveWeatherMurree() {
  const [data, setData] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams({
        latitude: String(MURREE_LAT),
        longitude: String(MURREE_LON),
        current: [
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "weather_code",
          "wind_speed_10m",
        ].join(","),
        timezone: "Asia/Karachi",
        wind_speed_unit: "kmh",
      });
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Weather unavailable");
      const json = (await res.json()) as {
        current?: {
          temperature_2m: number;
          apparent_temperature: number;
          relative_humidity_2m: number;
          weather_code: number;
          wind_speed_10m: number;
          time: string;
        };
      };
      const c = json.current;
      if (!c) throw new Error("No current data");
      setData({
        temperature: Math.round(c.temperature_2m * 10) / 10,
        apparent: Math.round(c.apparent_temperature * 10) / 10,
        humidity: Math.round(c.relative_humidity_2m),
        windKmh: Math.round(c.wind_speed_10m * 10) / 10,
        code: c.weather_code,
        time: c.time,
      });
    } catch {
      setError("Could not load live weather. Please try again later.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 15 * 60 * 1000);
    return () => window.clearInterval(id);
  }, [load]);

  return (
    <section
      className="border-y border-[#e5dcc8] bg-[#f6f1ea] px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="murree-weather-heading"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 md:flex-row md:items-stretch md:justify-between md:gap-12">
        <div className="md:max-w-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8b6914]">Live conditions</p>
          <h2
            id="murree-weather-heading"
            className="mt-3 font-display text-4xl font-normal text-neutral-900 md:text-5xl"
          >
            Murree — live weather
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            Real-time forecast for the Murree hills (same range as Bhurban). Refreshes every 15 minutes while you plan
            your drive and packing.
          </p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void load().finally(() => setLoading(false));
            }}
            className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b6914] underline-offset-4 hover:underline"
          >
            Refresh now
          </button>
        </div>

        <div className="min-w-0 flex-1 rounded-sm border border-[#eadfce] bg-white p-6 shadow-sm md:p-8">
          {loading && !data ? (
            <div className="flex min-h-[160px] items-center justify-center gap-2 text-neutral-500">
              <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
              <span className="text-sm">Loading Murree weather…</span>
            </div>
          ) : error && !data ? (
            <p className="text-sm text-red-800/90">{error}</p>
          ) : data ? (
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <WeatherIcon code={data.code} className="h-14 w-14 shrink-0 text-[#c9a55b] md:h-16 md:w-16" />
                <div>
                  <p className="font-display text-5xl font-light text-neutral-900 md:text-6xl">
                    {data.temperature}
                    <span className="text-2xl align-top text-neutral-500 md:text-3xl">°C</span>
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{wmoLabel(data.code)}</p>
                  <p className="mt-0.5 text-xs text-neutral-400">
                    Feels like {data.apparent}°C · Updated {new Date(data.time).toLocaleString("en-PK", {
                      hour: "2-digit",
                      minute: "2-digit",
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-4 border-t border-[#f0e8dc] pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                <div className="flex items-start gap-2">
                  <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a55b]" aria-hidden />
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-neutral-500">Humidity</dt>
                    <dd className="font-display text-xl text-neutral-900">{data.humidity}%</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Wind className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a55b]" aria-hidden />
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider text-neutral-500">Wind</dt>
                    <dd className="font-display text-xl text-neutral-900">{data.windKmh} km/h</dd>
                  </div>
                </div>
              </dl>
            </div>
          ) : null}

          <p className="mt-6 border-t border-[#f5efe4] pt-4 text-[10px] leading-relaxed text-neutral-400">
            Weather by{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b6914] underline-offset-2 hover:underline"
            >
              Open-Meteo
            </a>
            . Location: Murree ({MURREE_LAT.toFixed(2)}°N, {MURREE_LON.toFixed(2)}°E), timezone Asia/Karachi.
          </p>
        </div>
      </div>
    </section>
  );
}
