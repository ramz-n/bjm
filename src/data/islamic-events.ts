export type IslamicEventKey =
    | "islamicNewYear"
    | "ashura"
    | "mawlid"
    | "israMiraj"
    | "shabEBarat"
    | "ramadanStart"
    | "lastTenNights"
    | "laylatulQadr21"
    | "laylatulQadr23"
    | "laylatulQadr25"
    | "laylatulQadr27"
    | "laylatulQadr29"
    | "eidFitr"
    | "dhulHijjahStart"
    | "hajjBegins"
    | "dayOfArafah"
    | "eidAdha";

export interface IslamicEvent {
    key: IslamicEventKey;
    hijriMonth: number;
    hijriDay: number;

    /**
     * Local moon-sighting adjustment.
     *
     * 0  = calculated date
     * 1  = one day later
     * -1 = one day earlier
     */
    adjustment?: number;
}

export const islamicEvents: IslamicEvent[] = [
    {
        key: "islamicNewYear",
        hijriMonth: 1,
        hijriDay: 1,
    },
    {
        key: "ashura",
        hijriMonth: 1,
        hijriDay: 10,
    },
    {
        key: "mawlid",
        hijriMonth: 3,
        hijriDay: 12,
    },
    {
        key: "israMiraj",
        hijriMonth: 7,
        hijriDay: 27,
    },
    {
        key: "shabEBarat",
        hijriMonth: 8,
        hijriDay: 15,
    },
    {
        key: "ramadanStart",
        hijriMonth: 9,
        hijriDay: 1,
    },
    {
        key: "lastTenNights",
        hijriMonth: 9,
        hijriDay: 21,
    },
    {
        key: "laylatulQadr21",
        hijriMonth: 9,
        hijriDay: 21,
    },
    {
        key: "laylatulQadr23",
        hijriMonth: 9,
        hijriDay: 23,
    },
    {
        key: "laylatulQadr25",
        hijriMonth: 9,
        hijriDay: 25,
    },
    {
        key: "laylatulQadr27",
        hijriMonth: 9,
        hijriDay: 27,
    },
    {
        key: "laylatulQadr29",
        hijriMonth: 9,
        hijriDay: 29,
    },
    {
        key: "eidFitr",
        hijriMonth: 10,
        hijriDay: 1,
    },
    {
        key: "dhulHijjahStart",
        hijriMonth: 12,
        hijriDay: 1,
    },
    {
        key: "hajjBegins",
        hijriMonth: 12,
        hijriDay: 8,
    },
    {
        key: "dayOfArafah",
        hijriMonth: 12,
        hijriDay: 9,
    },
    {
        key: "eidAdha",
        hijriMonth: 12,
        hijriDay: 10,
    },
];