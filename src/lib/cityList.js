const cityList = [
    {
        "filename": "accra",
        "name": "Accra, Ghana",
        "flag": "gh",
        "continent": "Africa"
    },
    // {
    //     "filename": "addis-ababa",
    //     "name": "Addis Ababa, Ethiopia",
    //     "flag": "et",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "albufeira",
    //     "name": "Albufeira, Portugal",
    //     "flag": "pt",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "amman",
    //     "name": "Amman, Jordan",
    //     "flag": "jo",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "antalya",
    //     "name": "Antalya, Türkiye",
    //     "flag": "tr",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "arezzo",
    //     "name": "Arezzo, Tuscany, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "aruba",
    //     "name": "Aruba, Netherlands Antilles",
    //     "flag": "aw",
    //     "continent": "America"
    // },
    // {
    //     "filename": "athens",
    //     "name": "Athens, Attica, Greece",
    //     "flag": "gr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "ascoli-piceno",
    //     "name": "Ascoli Piceno, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "auckland",
    //     "name": "Auckland, New Zealand",
    //     "flag": "nz",
    //     "continent": "Oceania"
    // },
    // {
    //     "filename": "bali",
    //     "name": "Bali, Indonesia",
    //     "flag": "id",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "bangalore",
    //     "name": "Bangalore, Karnataka, India",
    //     "flag": "in",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "bangkok",
    //     "name": "Bangkok, Thailand",
    //     "flag": "th",
    //     "continent": "Asia"
    // },
    {
        "filename": "barcelona",
        "name": "Barcelona, Catalonia, Spain",
        "flag": "es",
        "continent": "Europe"
    },
    // {
    //     "filename": "bilbao",
    //     "name": "Bilbao, Basque Country, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "bucharest",
    //     "name": "Bucharest, Romania",
    //     "flag": "ro",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "budapest",
    //     "name": "Budapest, Hungary",
    //     "flag": "hu",
    //     "continent": "Europe"
    // },
    {
        "filename": "buenos-aires",
        "name": "Buenos Aires, Argentina",
        "flag": "ar",
        "continent": "America"
    },
    {
        "filename": "bratislava",
        "name": "Bratislava, Slovakia",
        "flag": "sk",
        "continent": "Europe"
    },
    // {
    //     "filename": "byron-bay",
    //     "name": "Byron Bay, New South Wales, Australia"
    // },
    // {
    //     "filename": "cairo",
    //     "name": "Cairo, Egypt",
    //     "flag": "eg",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "cape-town",
    //     "name": "Cape Town, South Africa",
    //     "flag": "za",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "cebu-city",
    //     "name": "Cebu City, Cebu, Philippines",
    //     "flag": "ph",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "cefalu",
    //     "name": "Cefalu, Sicily, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "chania",
    //     "name": "Chania, Crete, Greece",
    //     "flag": "gr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "chiang-mai",
    //     "name": "Chiang Mai, Thailand",
    //     "flag": "th",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "chicago",
    //     "name": "Chicago, Illinois, United States",
    //     "flag": "us",
    //     "continent": "America"
    // },
    // {
    //     "filename": "colombo",
    //     "name": "Colombo, Sri Lanka",
    //     "flag": "lk",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "copenhagen",
    //     "name": "Copenhagen, Denmark",
    //     "flag": "dk",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "cuenca-ecuador",
    //     "name": "Cuenca, Azuay, Ecuador",
    //     "flag": "ec",
    //     "continent": "America"
    // },
    // {
    //     "filename": "cuenca-spain",
    //     "name": "Cuenca, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    {
        "filename": "dubai",
        "name": "Dubai, United Arab Emirates",
        "flag": "ae",
        "continent": "Asia"
    },
    // {
    //     "filename": "essaouira",
    //     "name": "Essaouira, Morocco",
    //     "flag": "ma",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "faro",
    //     "name": "Faro, Algarve, Portugal",
    //     "flag": "pt",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "florence",
    //     "name": "Florence, Tuscany, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "fuerteventura",
    //     "name": "Fuerteventura, Canary Islands, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "girona",
    //     "name": "Girona, Catalonia, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "hanoi",
    //     "name": "Hanoi, Vietnam",
    //     "flag": "vn",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "hong-kong",
    //     "name": "Hong Kong, China",
    //     "flag": "hk",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "istanbul",
    //     "name": "Istanbul (European Side), Türkiye",
    //     "flag": "tr",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "istanbul-asia",
    //     "name": "Istanbul (Asian Side), Türkiye",
    //     "flag": "tr",
    //     "continent": "Asia"
    // },
    {
        "filename": "jeddah",
        "name": "Jeddah, Makkah Province, Saudi Arabia",
        "flag": "sa",
        "continent": "Asia"
    },
    // {
    //     "filename": "jerusalem",
    //     "name": "Jerusalem, West Bank, Palestine, Israel",
    //     "flag": "il",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "kalamata",
    //     "name": "Kalamata, Peloponnese, Greece",
    //     "flag": "gr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "kigali",
    //     "name": "Kigali, Rwanda",
    //     "flag": "rw",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "kuala-lumpur",
    //     "name": "Kuala Lumpur, Wilayah Persekutuan, Malaysia",
    //     "flag": "my",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "krakow",
    //     "name": "Kraków, Poland",
    //     "flag": "pl",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "lake-como",
    //     "name": "Lake Como, Lombardy, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "larnaca",
    //     "name": "Larnaca, Famagusta, Cyprus",
    //     "flag": "cy",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "las-terrenas",
    //     "name": "Las Terrenas, Bávaro, Dominican Republic",
    //     "flag": "do",
    //     "continent": "America"
    // },
    // {
    //     "filename": "lecce",
    //     "name": "Lecce, Puglia, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "lhasa",
    //     "name": "Lhasa, Tibet Autonomous Region, China",
    //     "flag": "cn",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "lima",
    //     "name": "Lima, Perú",
    //     "flag": "pe",
    //     "continent": "America"
    // },
    // {
    //     "filename": "lisbon",
    //     "name": "Lisbon, Portugal",
    //     "flag": "pt",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "london",
    //     "name": "London, England, United Kingdom",
    //     "flag": "gb",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "luang-prabang",
    //     "name": "Luang Prabang, Laos",
    //     "flag": "la",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "luxor",
    //     "name": "Luxor, Egypt",
    //     "flag": "eg",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "lucca",
    //     "name": "Lucca, Tuscany, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "lyon",
    //     "name": "Lyon, Rhône-Alpes, France",
    //     "flag": "fr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "macau",
    //     "name": "Macau, Special Administrative Region of China",
    //     "flag": "mo",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "madrid",
    //     "name": "Madrid, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "malaga",
    //     "name": "Malaga, Andalusia, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "marrakech",
    //     "name": "Marrakech, Morocco",
    //     "flag": "ma",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "medellin",
    //     "name": "Medellín, Antioquia, Colombia",
    //     "flag": "co",
    //     "continent": "America"
    // },
    // {
    //     "filename": "mecca",
    //     "name": "Mecca, Saudi Arabia",
    //     "flag": "sa",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "mexico-city",
    //     "name": "Mexico City, Mexico",
    //     "flag": "mx",
    //     "continent": "America"
    // },
    // {
    //     "filename": "nafplio",
    //     "name": "Nafplio, Peloponnese, Greece",
    //     "flag": "gr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "nairobi",
    //     "name": "Nairobi, Kenya",
    //     "flag": "ke",
    //     "continent": "Africa"
    // },
    {
        "filename": "new-york",
        "name": "New York City, United States",
        "flag": "us",
        "continent": "America"
    },
    // {
    //     "filename": "oslo",
    //     "name": "Oslo, Norway",
    //     "flag": "no",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "panama-city",
    //     "name": "Panama City, Panama",
    //     "flag": "pa",
    //     "continent": "America"
    // },
    // {
    //     "filename": "paris",
    //     "name": "Paris, France",
    //     "flag": "fr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "penang",
    //     "name": "Penang, Malaysia",
    //     "flag": "my",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "phuket",
    //     "name": "Phuket, Phang Nga, Thailand",
    //     "flag": "th",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "perth",
    //     "name": "Perth, Western Australia",
    //     "flag": "au",
    //     "continent": "Oceania"
    // },
    // {
    //     "filename": "pipa",
    //     "name": "Pipa, Rio Grande do Norte, Brazil",
    //     "flag": "br",
    //     "continent": "America"
    // },
    // {
    //     "filename": "porto",
    //     "name": "Porto, Portugal",
    //     "flag": "pt",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "prague",
    //     "name": "Prague, Czech Republic",
    //     "flag": "cz",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "rhodes",
    //     "name": "Rhodes, Dodecanese, Greece",
    //     "flag": "gr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "rome",
    //     "name": "Rome, Lazio, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "ronda",
    //     "name": "Ronda, Andalusia, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "salerno",
    //     "name": "Salerno, Campania, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "santorini",
    //     "name": "Santorini, Cyclades, Greece",
    //     "flag": "gr",
    //     "continent": "Europe"
    // },
    {
        "filename": "san-francisco",
        "name": "San Francisco, California, United States",
        "flag": "us",
        "continent": "America"
    },
    // {
    //     "filename": "saranda",
    //     "name": "Saranda, Albania",
    //     "flag": "al",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "san-miguel-de-allende",
    //     "name": "San Miguel de Allende, Guanajuato, Mexico",
    //     "flag": "mx",
    //     "continent": "America"
    // },
    // {
    //     "filename": "santiago",
    //     "name": "Santiago, Chile",
    //     "flag": "cl",
    //     "continent": "America"
    // },
    // {
    //     "filename": "seoul",
    //     "name": "Seoul, South Korea",
    //     "flag": "kr",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "shanghai",
    //     "name": "Shanghai, China",
    //     "flag": "cn",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "siem-reap",
    //     "name": "Siem Reap, Cambodia",
    //     "flag": "kh",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "siena",
    //     "name": "Siena, Tuscany, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "spoleto",
    //     "name": "Spoletto, Umbria, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    {
        "filename": "sydney",
        "name": "Sydney, New South Wales, Australia",
        "flag": "au",
        "continent": "Oceania"
    },
    // {
    //     "filename": "tbilisi",
    //     "name": "Tbilisi, Georgia",
    //     "flag": "ge",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "tehran",
    //     "name": "Tehran, Iran",
    //     "flag": "ir",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "tokyo",
    //     "name": "Tokyo, Japan",
    //     "flag": "jp",
    //     "continent": "Asia"
    // },
    // {
    //     "filename": "trento",
    //     "name": "Trento, Italy",
    //     "flag": "it",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "tunis",
    //     "name": "Tunis, Tunisia",
    //     "flag": "tn",
    //     "continent": "Africa"
    // },
    // {
    //     "filename": "valencia",
    //     "name": "Valencia, Spain",
    //     "flag": "es",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "vienna",
    //     "name": "Vienna, Austria",
    //     "flag": "at",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "warsaw",
    //     "name": "Warsaw, Mazovia, Poland",
    //     "flag": "pl",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "wellington",
    //     "name": "Wellington, New Zealand",
    //     "flag": "nz",
    //     "continent": "Oceania"
    // },
    // {
    //     "filename": "zagreb",
    //     "name": "Zagreb, Croatia",
    //     "flag": "hr",
    //     "continent": "Europe"
    // },
    // {
    //     "filename": "zurich",
    //     "name": "Zurich, Switzerland",
    //     "flag": "ch",
    //     "continent": "Europe"
    // }
]

export default cityList;