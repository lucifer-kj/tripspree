export interface JournalDispatch {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  category: string;
  curator: string;
  curatorRole: string;
  date: string;
  readTime: string;
  heightClass: string;
  offsetClass: string;
  gradient: string;
  excerpt: string;
  fullNarrative: string[];
  audioGuideAvailable: boolean;
  patronExclusiveNote?: string;
}

export const JOURNAL_DISPATCHES: JournalDispatch[] = [
  {
    id: "kyoto-moss-gardens",
    title: "The Cadence of Moss: Rain in Saihō-ji",
    subtitle: "How seven centuries of undisturbed rain shaped Kyoto's most contemplative temple garden.",
    region: "Kyoto, Japan",
    category: "Cultural Sanctuaries",
    curator: "Kenji Sato",
    curatorRole: "East Asian Heritage Specialist",
    date: "Autumn 2026",
    readTime: "7 min read",
    heightClass: "min-h-[440px]",
    offsetClass: "",
    gradient: "from-stone-900 via-neutral-900 to-stone-950",
    excerpt: "At Saihō-ji, moss is not merely flora; it is the physical accumulation of monastic patience and Kyoto's basin humidity.",
    fullNarrative: [
      "To step across the threshold of Saihō-ji after the midday mist has cleared is to enter a temple where silence has weight. More than 120 varieties of moss carpet the lower sanctuary, their green tonal shifts responding directly to the degree of cedar canopy overhead.",
      "In 1339, Zen master Musō Soseki redesigned the grounds not as an ornamental spectacle, but as an aid to zazen meditation. The pathways are intentionally uneven, obliging the traveler to look down, to regulate each stride, to notice how moisture clings to the fibrous tips of Leucobryum juniperoideum.",
      "For our travelers visiting in November, your private morning allocation permits two uninterrupted hours before the gate opens to standard reservations. We advise wearing thick wool tabi; the morning stones retain the crisp mountain chill of Mount Matsuo."
    ],
    audioGuideAvailable: true,
    patronExclusiveNote: "Private morning meditation access confirmed with Master Soseki's lineage for Day 2.",
  },
  {
    id: "amalfi-unseen",
    title: "Li Galli at Dawn: The Maritime Silence of the Sirens",
    subtitle: "Sailing the private waters between Capri and Positano before the world awakens.",
    region: "Campania, Italy",
    category: "Maritime Solitude",
    curator: "Matteo Rossi",
    curatorRole: "Mediterranean Maritime Fellow",
    date: "Late Summer 2026",
    readTime: "9 min read",
    heightClass: "min-h-[520px]",
    offsetClass: "md:translate-y-8",
    gradient: "from-slate-900 via-zinc-900 to-stone-900",
    excerpt: "The Sirens archipelago holds its deepest allure not in myth, but in the forty minutes before the Mediterranean sunrise strikes the limestone cliffs.",
    fullNarrative: [
      "The small archipelago of Li Galli — Gallo Lungo, Rotonda, and Dei Briganti — rises abruptly from the Tyrrhenian Sea like dolphin spines of pale limestone. While daytime brings yachts in search of glamor, dawn offers absolute solitude.",
      "Here, Rudolf Nureyev made his final home, dancing on mosaic terraces built over ancient Roman ruins. The acoustic resonance within the natural sea caves explains why Homer placed the Sirens here: the wind funnels through subterranean caverns with a haunting, chordal drone.",
      "TripSpree's private wooden gozzo departs Nerano harbour at 05:15. As the cliffs of Amalfi ignite in copper light, freshly roasted espresso is served on deck alongside warm sfogliatelle from Pasticceria Pansa."
    ],
    audioGuideAvailable: true,
    patronExclusiveNote: "Captain Marco holds your private tender reservation off Gallo Lungo with emergency VHF priority.",
  },
  {
    id: "lofoten-polar-twilight",
    title: "The Architecture of Cold: Living in the Shadow of Reine",
    subtitle: "A week inside a restored rorbu where the Atlantic wind provides the only percussion.",
    region: "Nordland, Norway",
    category: "Mountain Preserves",
    curator: "Astrid Lindqvist",
    curatorRole: "Nordic Geography Lead",
    date: "September 2026",
    readTime: "6 min read",
    heightClass: "min-h-[460px]",
    offsetClass: "",
    gradient: "from-neutral-900 via-stone-800 to-neutral-950",
    excerpt: "The granite horns of the Reinefjorden plunge 800 vertical meters into black water, creating a microclimate of sublime sensory isolation.",
    fullNarrative: [
      "In the Arctic archipelago of Lofoten, silence is punctuated only by the creak of timber piles driven into tidal bedrock. The rorbuer — historic cod fishermen cabins painted in Falun red oxblood — have been distilled to their purest architectural essence.",
      "Under the polar twilight of late autumn, the light does not set; it lingers in perpetual indigo and amber along the horizon for six continuous hours. The wood-burning Finnish sauna on the jetty, paired with sea plunges into 4°C fjords, recalibrates the autonomic nervous system with shocking clarity.",
      "Evenings inside the sanctuary are illuminated by beeswax tallow candles and the low amber flicker of birchwood hearths. No digital interfaces penetrate this sanctuary."
    ],
    audioGuideAvailable: false,
    patronExclusiveNote: "Woodfire sauna pre-stoked each evening at 19:00 with birch harvested from inner Salten.",
  },
  {
    id: "provence-terroir",
    title: "The Olive Presses of the Luberon: An Inheritance of Stone",
    subtitle: "Harvesting uncertified ancient groves with the fourth generation of the d'Arbaud lineage.",
    region: "Provence, France",
    category: "Historic Estates",
    curator: "Claire Dubois",
    curatorRole: "Gastronomic Historian",
    date: "August 2026",
    readTime: "8 min read",
    heightClass: "min-h-[480px]",
    offsetClass: "",
    gradient: "from-stone-900 via-stone-800 to-zinc-900",
    excerpt: "Ancient Aglandau olive trees rooted in dry calcareous limestone produce oil with notes of fresh-cut artichoke and peppery wild thyme.",
    fullNarrative: [
      "High above the lavender plateaus of Apt, the Luberon ridge is carved with ancient bories — dry-stone shepherds' huts untouched since the seventeenth century. Here, trees planted during the reign of Henri IV still bear fruit.",
      "We walk between the silver canopies with Jean-Luc d'Arbaud, whose family refuses modern centrifuges in favor of granite millstones turned at cold friction temperatures. The first pressing is unctuous, unfiltered, emerald green, and cloudy with live antioxidants.",
      "A rustic luncheon follows: fresh sourdough baked in wood ovens, coarse fleur de sel from the Camargue marshes, and goat's milk Tomme ripened in chestnut leaves."
    ],
    audioGuideAvailable: true,
    patronExclusiveNote: "Private vintage allocation of 6 unlabelled numbered amphorae reserved for your cellar.",
  },
  {
    id: "atlas-star-preserves",
    title: "Dark Sky Cartography: Above the High Atlas Cloud Line",
    subtitle: "Bivouacking at 2,800 meters where the Milky Way casts discernible shadows on sandstone.",
    region: "Oukaïmeden, Morocco",
    category: "Mountain Preserves",
    curator: "Tariq Mansour",
    curatorRole: "Sahara & Maghreb Specialist",
    date: "July 2026",
    readTime: "11 min read",
    heightClass: "min-h-[420px]",
    offsetClass: "md:translate-y-8",
    gradient: "from-zinc-950 via-neutral-900 to-stone-900",
    excerpt: "At 2,800 meters, above the dust and moisture of the Marrakesh plains, the sky ceases to be a ceiling and becomes an abyss of cosmic clarity.",
    fullNarrative: [
      "The ascent past the Berber village of Asni requires four hours by private desert patrol vehicle. As night settles, the temperature drops precipitously, crystallizing the mountain atmosphere into zero-humidity glass.",
      "Through our brass Takahashi refractor telescope, the planetary rings of Saturn and the galactic core of Sagittarius reveal detail invisible from lower altitudes. Our Amazigh astronomy guide recounts constellations named not from Greek mythology, but from nomadic caravan survival routes.",
      "Wool rugs hand-woven with camel hair insulate the bivouac pavilion, where saffron mint tea is brewed continually over olive wood charcoal."
    ],
    audioGuideAvailable: false,
    patronExclusiveNote: "Satellite satellite uplink test verified; emergency medical clearance active with Marrakesh.",
  },
  {
    id: "cyclades-off-season",
    title: "The Marble Quarries of Tinos: The Island After the Wind",
    subtitle: "When the summer Meltemi dies down, the Aegean light sharpens into pure geometric stillness.",
    region: "Cyclades, Greece",
    category: "Maritime Solitude",
    curator: "Elena Vance",
    curatorRole: "Founding Travel Director",
    date: "June 2026",
    readTime: "7 min read",
    heightClass: "min-h-[490px]",
    offsetClass: "",
    gradient: "from-slate-950 via-stone-900 to-neutral-900",
    excerpt: "Tinos in October is an austere cathedral of green and white marble, sculpted by centuries of wind and stonecutters' chisels.",
    fullNarrative: [
      "While tourists flood Mykonos across the narrow strait, Tinos preserves a quiet monastic rhythm. The village of Pyrgos is constructed almost entirely of hand-chiseled marble — lintels, fountains, street paving, and church belfries.",
      "Visiting the studio of Master Sculptor Yannoulis reveals why marble feels warmer than granite: the calcite crystals allow daylight to penetrate three millimeters into the surface before reflecting back, giving Greek statues their unmistakable biological luminescence.",
      "Evenings at our cliffside sanctuary in Kardiani feature wild caper leaves, dry Assyrtiko wine aged in terracotta amphorae, and the sound of waves lapping against pebbles 200 feet below."
    ],
    audioGuideAvailable: true,
    patronExclusiveNote: "Elena Vance personally coordinated your private audience with Master Sculptor Yannoulis.",
  },
];
