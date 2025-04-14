const cityList = [
    // {
    //     "filename": "accra",
    //     "name": "Accra, Ghana"
    // },
    // {
    //     "filename": "addis-ababa",
    //     "name": "Addis Ababa, Ethiopia"
    // },
    // {
    //     "filename": "albufeira",
    //     "name": "Albufeira, Portugal"
    // },
    // {
    //     "filename": "amman",
    //     "name": "Amman, Jordan"
    // },
    // {
    //     "filename": "antalya",
    //     "name": "Antalya, Türkiye"
    // },
    // {
    //     "filename": "arezzo",
    //     "name": "Arezzo, Tuscany, Italy"
    // },
    // {
    //     "filename": "aruba",
    //     "name": "Aruba, Netherlands Antilles"
    // },
    // {
    //     "filename": "athens",
    //     "name": "Athens, Attica, Greece"
    // },
    // {
    //     "filename": "ascoli-piceno",
    //     "name": "Ascoli Piceno, Italy"
    // },
    // {
    //     "filename": "auckland",
    //     "name": "Auckland, New Zealand"
    // },
    // {
    //     "filename": "bali",
    //     "name": "Bali, Indonesia"
    // },
    // {
    //     "filename": "bangalore",
    //     "name": "Bangalore, Karnataka, India"
    // },
    // {
    //     "filename": "bangkok",
    //     "name": "Bangkok, Thailand"
    // },
    {
        "filename": "barcelona",
        "name": "Barcelona, Spain"
    },
    // {
    //     "filename": "bilbao",
    //     "name": "Bilbao, Basque Country, Spain"
    // },
    // {
    //     "filename": "bucharest",
    //     "name": "Bucharest, Romania"
    // },
    // {
    //     "filename": "budapest",
    //     "name": "Budapest, Hungary"
    // },
    {
        "filename": "buenos-aires",
        "name": "Buenos Aires, Argentina"
    },
    // {
    //     "filename": "bratislava",
    //     "name": "Bratislava, Slovakia"
    // },
    // {
    //     "filename": "byron-bay",
    //     "name": "Byron Bay, New South Wales, Australia"
    // },
    // {
    //     "filename": "cairo",
    //     "name": "Cairo, Egypt"
    // },
    // {
    //     "filename": "cape-town",
    //     "name": "Cape Town, South Africa"
    // },
    // {
    //     "filename": "cebu-city",
    //     "name": "Cebu City, Cebu, Philippines"
    // },
    // {
    //     "filename": "cefalu",
    //     "name": "Cefalu, Sicily, Italy"
    // },
    // {
    //     "filename": "chania",
    //     "name": "Chania, Crete, Greece"
    // },
    // {
    //     "filename": "chiang-mai",
    //     "name": "Chiang Mai, Thailand"
    // },
    // {
    //     "filename": "chicago",
    //     "name": "Chicago, Illinois, United States"
    // },
    // {
    //     "filename": "colombo",
    //     "name": "Colombo, Sri Lanka"
    // },
    // {
    //     "filename": "copenhagen",
    //     "name": "Copenhagen, Denmark"
    // },
    // {
    //     "filename": "cuenca-ecuador",
    //     "name": "Cuenca, Azuay, Ecuador"
    // },
    // {
    //     "filename": "cuenca-spain",
    //     "name": "Cuenca, Spain"
    // },
    // {
    //     "filename": "dubai",
    //     "name": "Dubai, United Arab Emirates"
    // },
    // {
    //     "filename": "essaouira",
    //     "name": "Essaouira, Morocco"
    // },
    // {
    //     "filename": "faro",
    //     "name": "Faro, Algarve, Portugal"
    // },
    // {
    //     "filename": "florence",
    //     "name": "Florence, Tuscany, Italy"
    // },
    // {
    //     "filename": "fuerteventura",
    //     "name": "Fuerteventura, Canary Islands, Spain"
    // },
    // {
    //     "filename": "girona",
    //     "name": "Girona, Catalonia, Spain"
    // },
    // {
    //     "filename": "hanoi",
    //     "name": "Hanoi, Vietnam"
    // },
    // {
    //     "filename": "hong-kong",
    //     "name": "Hong Kong, China"
    // },
    // {
    //     "filename": "istanbul",
    //     "name": "Istanbul (European Side), Türkiye"
    // },
    // {
    //     "filename": "istanbul-asia",
    //     "name": "Istanbul (Asian Side), Türkiye"
    // },
    // {
    //     "filename": "jeddah",
    //     "name": "Jeddah, Makkah Province, Saudi Arabia"
    // },
    // {
    //     "filename": "jerusalem",
    //     "name": "Jerusalem, West Bank, Palestine, Israel"
    // },
    // {
    //     "filename": "kalamata",
    //     "name": "Kalamata, Peloponnese, Greece"
    // },
    // {
    //     "filename": "kigali",
    //     "name": "Kigali, Rwanda"
    // },
    // {
    //     "filename": "kuala-lumpur",
    //     "name": "Kuala Lumpur, Wilayah Persekutuan, Malaysia"
    // },
    // {
    //     "filename": "krakow",
    //     "name": "Kraków, Poland"
    // },
    // {
    //     "filename": "lake-como",
    //     "name": "Lake Como, Lombardy, Italy"
    // },
    // {
    //     "filename": "larnaca",
    //     "name": "Larnaca, Famagusta, Cyprus"
    // },
    // {
    //     "filename": "las-terrenas",
    //     "name": "Las Terrenas, Bávaro, Dominican Republic"
    // },
    // {
    //     "filename": "lecce",
    //     "name": "Lecce, Puglia, Italy"
    // },
    // {
    //     "filename": "lhasa",
    //     "name": "Lhasa, Tibet Autonomous Region, China"
    // },
    // {
    //     "filename": "lima",
    //     "name": "Lima, Perú"
    // },
    // {
    //     "filename": "lisbon",
    //     "name": "Lisbon, Portugal"
    // },
    // {
    //     "filename": "london",
    //     "name": "London, England, United Kingdom"
    // },
    // {
    //     "filename": "luang-prabang",
    //     "name": "Luang Prabang, Laos"
    // },
    // {
    //     "filename": "luxor",
    //     "name": "Luxor, Egypt"
    // },
    // {
    //     "filename": "lucca",
    //     "name": "Lucca, Tuscany, Italy"
    // },
    // {
    //     "filename": "lyon",
    //     "name": "Lyon, Rhône-Alpes, France"
    // },
    // {
    //     "filename": "macau",
    //     "name": "Macau, Special Administrative Region of China"
    // },
    // {
    //     "filename": "madrid",
    //     "name": "Madrid, Spain"
    // },
    // {
    //     "filename": "malaga",
    //     "name": "Malaga, Andalusia, Spain"
    // },
    // {
    //     "filename": "marrakech",
    //     "name": "Marrakech, Morocco"
    // },
    // {
    //     "filename": "medellin",
    //     "name": "Medellín, Antioquia, Colombia"
    // },
    // {
    //     "filename": "mecca",
    //     "name": "Mecca, Saudi Arabia"
    // },
    // {
    //     "filename": "mexico-city",
    //     "name": "Mexico City, Mexico"
    // },
    // {
    //     "filename": "nafplio",
    //     "name": "Nafplio, Peloponnese, Greece"
    // },
    // {
    //     "filename": "nairobi",
    //     "name": "Nairobi, Kenya"
    // },
    {
        "filename": "new-york",
        "name": "New York City, United States"
    },
    // {
    //     "filename": "oslo",
    //     "name": "Oslo, Norway"
    // },
    // {
    //     "filename": "panama-city",
    //     "name": "Panama City, Panama"
    // },
    // {
    //     "filename": "paris",
    //     "name": "Paris, France"
    // },
    // {
    //     "filename": "penang",
    //     "name": "Penang, Malaysia"
    // },
    // {
    //     "filename": "phuket",
    //     "name": "Phuket, Phang Nga, Thailand"
    // },
    // {
    //     "filename": "perth",
    //     "name": "Perth, Western Australia"
    // },
    // {
    //     "filename": "pipa",
    //     "name": "Pipa, Rio Grande do Norte, Brazil"
    // },
    // {
    //     "filename": "porto",
    //     "name": "Porto, Portugal"
    // },
    // {
    //     "filename": "prague",
    //     "name": "Prague, Czech Republic"
    // },
    // {
    //     "filename": "rhodes",
    //     "name": "Rhodes, Dodecanese, Greece"
    // },
    // {
    //     "filename": "rome",
    //     "name": "Rome, Lazio, Italy"
    // },
    // {
    //     "filename": "ronda",
    //     "name": "Ronda, Andalusia, Spain"
    // },
    // {
    //     "filename": "salerno",
    //     "name": "Salerno, Campania, Italy"
    // },
    // {
    //     "filename": "santorini",
    //     "name": "Santorini, Cyclades, Greece"
    // },
    {
        "filename": "san-francisco",
        "name": "San Francisco, California, United States"
    },
    // {
    //     "filename": "saranda",
    //     "name": "Saranda, Albania"
    // },
    // {
    //     "filename": "san-miguel-de-allende",
    //     "name": "San Miguel de Allende, Guanajuato, Mexico"
    // },
    // {
    //     "filename": "santiago",
    //     "name": "Santiago, Chile"
    // },
    // {
    //     "filename": "seoul",
    //     "name": "Seoul, South Korea"
    // },
    // {
    //     "filename": "shanghai",
    //     "name": "Shanghai, China"
    // },
    // {
    //     "filename": "siem-reap",
    //     "name": "Siem Reap, Cambodia"
    // },
    // {
    //     "filename": "siena",
    //     "name": "Siena, Tuscany, Italy"
    // },
    // {
    //     "filename": "spoleto",
    //     "name": "Spoletto, Umbria, Italy"
    // },
    // {
    //     "filename": "sydney",
    //     "name": "Sydney, New South Wales, Australia"
    // },
    // {
    //     "filename": "tbilisi",
    //     "name": "Tbilisi, Georgia"
    // },
    // {
    //     "filename": "tehran",
    //     "name": "Tehran, Iran"  
    // },
    // {
    //     "filename": "tokyo",
    //     "name": "Tokyo, Japan"
    // },
    // {
    //     "filename": "trento",
    //     "name": "Trento, Italy"
    // },
    // {
    //     "filename": "tunis",
    //     "name": "Tunis, Tunisia"
    // },
    // {
    //     "filename": "valencia",
    //     "name": "Valencia, Spain"
    // },
    // {
    //     "filename": "vienna",
    //     "name": "Vienna, Austria"
    // },
    // {
    //     "filename": "warsaw",
    //     "name": "Warsaw, Mazovia, Poland"
    // },
    // {
    //     "filename": "wellington",
    //     "name": "Wellington, New Zealand"
    // },
    // {
    //     "filename": "zagreb",
    //     "name": "Zagreb, Croatia"
    // },
    // {
    //     "filename": "zurich",
    //     "name": "Zurich, Switzerland"
    // }
]

export default cityList;