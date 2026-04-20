"use client";

import { useCallback, useEffect, useState } from "react";
import { Cloud, CloudRain, Loader2, Sun } from "lucide-react";

const MURREE_LAT = 33.9078;
const MURREE_LON = 73.3903;

type Props = {
  variant?: "light" | "dark";
};

type WeatherData = {
  temp: number;
  code: number;
};

function WeatherTinyIcon({ code }: { code: number }) {
  if (code === 0) return <Sun className="h-3.5 w-3.5" aria-hidden />;
  if (code <= 3) return <Cloud className="h-3.5 w-3.5" aria-hidden />;
  return <CloudRain className="h-3.5 w-3.5" aria-hidden />;
}

export default function LiveWeatherBadge({ variant = "light" }: Props) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        latitude: String(MURREE_LAT),
        longitude: String(MURREE_LON),
        current: "temperature_2m,weather_code",
        timezone: "Asia/Karachi",
      });

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("weather unavailable");
      const json = (await res.json()) as {
        current?: { temperature_2m: number; weather_code: number };
      };
      if (!json.current) throw new Error("missing weather");
      setData({
        temp: Math.round(json.current.temperature_2m),
        code: json.current.weather_code,
      });
    } catch {
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

  const shellClass =
    variant === "light"
      ? "border-white/35 bg-black/25 text-white"
      : "border-neutral-300 bg-white text-neutral-800";

  return (
    <div
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${shellClass}`}
      aria-label="Live Murree weather"
      title="Live Murree weather"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
          <span>Weather</span>
        </>
      ) : data ? (
        <>
          <WeatherTinyIcon code={data.code} />
          <span>Murree {data.temp}°C</span>
        </>
      ) : (
        <span>Murree</span>
      )}
    </div>
  );
}

