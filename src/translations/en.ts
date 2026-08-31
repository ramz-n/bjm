const en = {
  nav: {
    home: "Home",
    prayerTimetable: "Prayer Timetable",
    keyDates: "Key Dates",
    names99: "99 Names",
    learn: "Learn",
  },

  hero: {
    location: "PRAGATIPATH-2 · NARAYANGARH · CHITWAN · NEPAL",

    title:{
      titleFront: "A place of ",
      titleMiddle:"Worship, ",
      titleEnd:"learning & community.",
    },

    description:
      "Welcome to Al Jamiatul Barkatiya Jame Masjid, a place for worship, learning, service and community.",

    localTime:"Local Time",
    nextPrayer: "Up next",
    tomorrow: "Next tomorrow",
    dailySchedule: "Daily Schedule",
    prayerTimes: "Prayer Times",
    gregorian: "Gregorian",
    nepali: "Nepali",
    hijri: "Hijri",
  },

  prayer: {
    fajr: "Fajr",
    sunrise: "Sunrise",
    zuhr: "Zuhr",
    asr: "Asr",
    maghrib: "Magrib",
    isha: "Isha",
  },

  about: {
    eyebrow: "About Al Jamiatul Barkatiya Jame Masjid",

    title:
      "Barkati Jame Masjid is one of the oldest mosques located in Narayanghat, Chitwan.",

    paragraph1:
      "Established in 1955 AD, the mosque has been actively serving the community.",

    paragraph2:
      "Al Jamiatul Barkatiya Jame Masjid has served the Muslim community of Narayanghat for decades by providing a place for worship, Islamic education, charity, and social gatherings. It continues to welcome everyone with a spirit of unity, compassion, and service.",

    established: "Since 1955",

    mosqueName: "Barkati Jame Masjid",

    communityOwned: {
      title: "Community Owned",
      description:
        "BJM is a registered mosque owned by the community in Chitwan.",
    },

    events: {
      title: "Events & Congregation",
      description:
        "The mosque conducts various events and congregational prayers.",
    },

    charity: {
      title: "Charity Program",
      description:
        "The mosque helps the poor and needy through its charity programs.",
    },
  },

  footer: {
    title: "Al-Jamaetul Barkatiya Jame Masjid",

    tagline: "Prayer. Learning. Giving.",

    description:
      "Our doors are open to worshippers and visitors alike. Come and share in a community rooted in faith and compassion.",

    visit: "Visit",

    address: {
      road: "Masjid Road",
      location: "Pragatipath-2, Narayangarh",
      country: "Chitwan, Nepal",
    },

    openingHours: "Open daily, from 10 AM to 6 PM",

    contact: "Contact",

    designedBy: "Designed and developed by",
  },

  notifications: { unsupported: "This browser does not support notifications.", permissionDenied: "Notification permission was denied.", namazAlert: "Namaz Alert ⏰", timeIn: (prayer: string, minutes: string) => `${prayer} time in ${minutes}!`, timeStarted: (prayer: string) => `${prayer} time has started!`, },
};

export default en;