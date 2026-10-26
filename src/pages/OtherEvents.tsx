import { useMemo } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import {
  getCurrentHijriYear,
  hijriToGregorian,
} from "../utils/islamic-calendar";

import { formatNepaliDate } from "../utils/nepali-date";
import { formatGregorianDate } from "../data/prayer-schedule";
import { HIJRI_MONTHS_EN, HIJRI_MONTHS_NP } from "../utils";

const NEPALI_DIGITS = "०१२३४५६७८९";

const toNepaliDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => NEPALI_DIGITS[Number(digit)]);

const formatHijriDate = (date: string, language: "en" | "np") => {
  const parts = date.split(" ");

  if (parts.length < 3) return date;

  const day = parts[0];
  const year = parts[parts.length - 1];
  const month = parts.slice(1, -1).join(" ");

  if (language === "en") {
    return `${day} ${month} ${year}`;
  }

  const monthIndex = HIJRI_MONTHS_EN.findIndex(
    (item) => item.toLowerCase() === month.toLowerCase(),
  );

  const nepaliMonth = monthIndex >= 0 ? HIJRI_MONTHS_NP[monthIndex] : month;

  return `${toNepaliDigits(day)} ${nepaliMonth} ${toNepaliDigits(year)} हिजरी`;
};

const OtherEvents = () => {
  const { language, t } = useLanguage();

  const events = useMemo(() => {
    const currentHijriYear = getCurrentHijriYear();

    const eventDefinitions = [
      {
        key: "alaHazrat",
        hijriMonth: 2,
        hijriDay: 25,
      },
      {
        key: "shereNepal",
        hijriMonth: 3,
        hijriDay: 27,
      },
      {
        key: "gausePakh",
        hijriMonth: 4,
        hijriDay: 11,
      },
      {
        key: "khwajaGaribNawaz",
        hijriMonth: 7,
        hijriDay: 6,
      },
    ] as const;

    return [currentHijriYear, currentHijriYear + 1]
      .flatMap((year) =>
        eventDefinitions.map((event) => {
          const converted = hijriToGregorian(
            year,
            event.hijriMonth,
            event.hijriDay,
          );

          return {
            ...event,
            hijriDate: converted.hijriDate,
            gregorianDate: converted.gregorianDate,
            nepaliDate: formatNepaliDate(converted.gregorianDate),
          };
        }),
      )
      .sort((a, b) => a.gregorianDate.getTime() - b.gregorianDate.getTime());
  }, []);

  const today = useMemo(() => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const isPast = (date: Date) => {
    const eventDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    return eventDate < today;
  };

  const nextEventIndex = events.findIndex(
    (event) => !isPast(event.gregorianDate),
  );

  const nextEvent = nextEventIndex >= 0 ? events[nextEventIndex] : null;

  const getEventName = (key: keyof typeof t.otherEvents.events) =>
    t.otherEvents.events[key];

  return (
    <section id="other-events" className="w-full">
      {/* Hero */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src="/dua.avif"
          alt={t.otherEvents.eyebrow}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-8 left-6 md:left-18">
          <div className="rounded-2xl border border-accent-gray/15 bg-accent/25 px-6 py-3 shadow-lg backdrop-blur-md">
            <h1 className="text-xl font-bold text-white md:text-4xl">
              {t.otherEvents.eyebrow}
            </h1>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-islamic-gold" />

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">
              {t.otherEvents.headings}
            </p>
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-primary md:text-5xl">
            {t.otherEvents.title1}
            <span className="text-secondary-green">
              {" "}
              {t.otherEvents.title2}
            </span>
          </h2>

          <p className="mt-6 max-w-3xl leading-7 text-gray-600">
            {t.otherEvents.description}
          </p>
        </div>

        {/* Next event */}
        {nextEvent && (
          <div className="mb-14 overflow-hidden rounded-3xl bg-primary text-white shadow-lg">
            <div className="grid md:grid-cols-[1fr_auto]">
              <div className="p-7 md:p-10">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                  <Clock3 size={15} />
                  {t.otherEvents.nextEvent}
                </div>

                <h3 className="text-2xl font-bold md:text-4xl">
                  {getEventName(nextEvent.key)}
                </h3>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="mb-2 text-xs text-white/60">
                      {t.otherEvents.hijriLabel}
                    </p>
                    <p className="font-medium">
                      {formatHijriDate(nextEvent.hijriDate, language)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs text-white/60">
                      {t.otherEvents.gregorianLabel}
                    </p>
                    <p className="font-medium">
                      {formatGregorianDate(nextEvent.gregorianDate, language)}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs text-white/60">
                      {t.otherEvents.nepaliLabel}
                    </p>
                    <p className="font-medium">{nextEvent.nepaliDate}</p>
                  </div>
                </div>
              </div>

              <div className="flex min-w-[180px] flex-col items-center justify-center border-t border-white/10 bg-white/5 px-8 py-8 text-center md:border-l md:border-t-0">
                <CalendarDays size={34} strokeWidth={1.5} className="mb-4" />
                <p className="text-sm text-white/60">
                  {t.otherEvents.upcoming}
                </p>
                <p className="mt-2 text-lg font-bold">
                  {formatGregorianDate(nextEvent.gregorianDate, language)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Calendar list */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-islamic-gold">
            {t.otherEvents.calendarLabel}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
            {t.otherEvents.calendarTitle}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {t.otherEvents.calendarDescription}
          </p>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[9px] top-0 w-px bg-gray-200 md:left-[11px]" />

          <div className="space-y-4">
            {events.map((event, index) => {
              const past = isPast(event.gregorianDate);
              const isNext = index === nextEventIndex;

              return (
                <article
                  key={`${event.key}-${event.hijriDate}`}
                  className={`relative pl-9 transition-opacity md:pl-12 ${
                    past ? "opacity-55" : ""
                  }`}
                >
                  <div
                    className={`absolute left-0 top-7 z-10 h-[19px] w-[19px] rounded-full border-[3px] bg-white ${
                      isNext ? "border-islamic-gold" : "border-gray-200"
                    }`}
                  />

                  <div
                    className={`rounded-2xl border p-5 transition-shadow md:p-6 ${
                      isNext
                        ? "border-islamic-gold/40 bg-islamic-gold/[0.05] shadow-sm"
                        : "border-gray-100 bg-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <h4 className="text-base font-bold text-primary md:text-lg">
                            {getEventName(event.key)}
                          </h4>

                          {isNext && (
                            <span className="rounded-full bg-islamic-gold px-3 py-1 text-xs font-bold text-white">
                              {t.otherEvents.nextEvent}
                            </span>
                          )}

                          {past && (
                            <span className="text-xs text-gray-400">
                              {t.otherEvents.passed}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500">
                          {formatHijriDate(event.hijriDate, language)}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-2 md:min-w-[380px] md:border-l md:border-t-0 md:pl-6 md:pt-0">
                        <div>
                          <p className="mb-1 text-xs text-gray-400">
                            {t.otherEvents.gregorianLabel}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {formatGregorianDate(event.gregorianDate, language)}
                          </p>
                        </div>

                        <div>
                          <p className="mb-1 text-xs text-gray-400">
                            {t.otherEvents.nepaliLabel}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {event.nepaliDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherEvents;
