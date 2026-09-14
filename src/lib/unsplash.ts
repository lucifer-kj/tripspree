/**
 * TripSpree Unsplash Asset Registry
 * Curated ultra-high-resolution editorial photography for quiet-luxury sanctuaries.
 * Covers Indian Heritage (Rajasthan, Kerala, Ladakh) and Global Gateways (Maldives, Kyoto, Amalfi, Alps).
 */

export interface UnsplashAsset {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  blurDataUrl?: string;
  region?: string;
  country?: string;
}

export const UNSPLASH_ASSETS = {
  // Full-Bleed Widescreen Hero Section
  heroFullBleed: {
    id: "hero-udaipur-dawn",
    url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=2560&q=85",
    alt: "Marble pavilions and calm water reflections of Lake Pichola at sunrise in Udaipur",
    photographer: "Devansh S",
    photographerUrl: "https://unsplash.com",
    region: "Udaipur, Rajasthan",
    country: "India",
  },
  heroFocalPavilion: {
    id: "Za9KlWqJwkI",
    url: "https://images.unsplash.com/photo-1724157531851-57d4e79818dd?auto=format&fit=crop&w=1600&q=85",
    alt: "Minimalist cedar water pavilion with stone garden contemplation courtyard",
    photographer: "Naoki Suzuki",
    photographerUrl: "https://unsplash.com/@naokisuzuki",
    region: "Ise-Shima",
    country: "Japan",
  },
  heroCharterPlane: {
    id: "UdUbSPwbv2c",
    url: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1600&q=85",
    alt: "Private chartered jet ascending into pristine azure skies",
    photographer: "Kevin Woblick",
    photographerUrl: "https://unsplash.com/@kevinwoblick",
  },

  // Domestic Indian Luxury Sanctuaries
  udaivilasUdaipur: {
    id: "sanctuary-udaivilas",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    alt: "The Oberoi Udaivilas palace courtyards and reflecting pools overlooking Lake Pichola",
    photographer: "Siddharth B",
    photographerUrl: "https://unsplash.com",
    region: "Udaipur, Rajasthan",
    country: "India",
  },
  rambaghJaipur: {
    id: "sanctuary-rambagh",
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85",
    alt: "Carved marble jharokhas and courtyards of a royal heritage palace in Jaipur",
    photographer: "Prateek Katyal",
    photographerUrl: "https://unsplash.com/@prateekkatyal",
    region: "Jaipur, Rajasthan",
    country: "India",
  },
  keralaBackwaters: {
    id: "sanctuary-kerala",
    url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85",
    alt: "Private wooden houseboat drifting along emerald canals of Kumarakom at twilight",
    photographer: "Naveen Annam",
    photographerUrl: "https://unsplash.com",
    region: "Kumarakom, Kerala",
    country: "India",
  },
  ladakhStargazing: {
    id: "sanctuary-ladakh",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85",
    alt: "High altitude luxury camp under a pristine Milky Way night sky in Ladakh",
    photographer: "Ales Krivec",
    photographerUrl: "https://unsplash.com/@aleskrivec",
    region: "Thiksey, Ladakh",
    country: "India",
  },
  jawaiWilderness: {
    id: "sanctuary-jawai",
    url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
    alt: "Granite wilderness camp in Rajasthan with unhurried private sunset safari",
    photographer: "Harshil Gudka",
    photographerUrl: "https://unsplash.com/@harshilgudka",
    region: "JAWAI, Rajasthan",
    country: "India",
  },

  // Global Luxury Gateways
  maldivesOverwater: {
    id: "sanctuary-maldives",
    url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
    alt: "Private overwater villa suspended over crystal clear turquoise lagoon in Noonu Atoll",
    photographer: "Colin Watts",
    photographerUrl: "https://unsplash.com/@colin_watts",
    region: "Noonu Atoll",
    country: "Maldives",
  },
  amalfiVeranda: {
    id: "sanctuary-amalfi",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85",
    alt: "Clifftop private balcony overlooking pastel houses and the blue Mediterranean Sea in Positano",
    photographer: "Daniele D'Andreti",
    photographerUrl: "https://unsplash.com",
    region: "Positano, Amalfi",
    country: "Italy",
  },
  swissAlpsChalet: {
    id: "sanctuary-alps",
    url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=85",
    alt: "Warm wooden alpine refuge nestled amongst snow-covered pine peaks in St. Moritz",
    photographer: "Alberto Casetta",
    photographerUrl: "https://unsplash.com/@albertocasetta",
    region: "St. Moritz, Engadin",
    country: "Switzerland",
  },
  amanemu: {
    id: "bzRao_Gj5_E",
    url: "https://images.unsplash.com/photo-1770653711356-e6b9737866d0?auto=format&fit=crop&w=1600&q=85",
    alt: "Thermal mineral onsen pavilions enveloped in misty coastal forest",
    photographer: "Lei Hwang",
    photographerUrl: "https://unsplash.com/@leihwang",
    region: "Ago Bay, Ise-Shima",
    country: "Japan",
  },
  benesseHouse: {
    id: "mQiZnKwGXW0",
    url: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?auto=format&fit=crop&w=1600&q=85",
    alt: "Tadao Ando smooth concrete oval pavilion framing open sky and water",
    photographer: "Kimon Maritz",
    photographerUrl: "https://unsplash.com/@kimonmaritz",
    region: "Naoshima Art Island",
    country: "Japan",
  },
  sowakaKyoto: {
    id: "u8fS3_bSWdI",
    url: "https://images.unsplash.com/photo-1610238115511-81be15284155?auto=format&fit=crop&w=1600&q=85",
    alt: "Cedar veranda and moss courtyard in historic Gion sanctuary",
    photographer: "Samuel Berner",
    photographerUrl: "https://unsplash.com/@samuelberner",
    region: "Gion Yasaka, Kyoto",
    country: "Japan",
  },
  hoshinoyaKyoto: {
    id: "hoshinoya-kyoto-asset",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
    alt: "Private wooden boat gliding along serene Arashiyama gorge river towards Hoshinoya Kyoto",
    photographer: "Su San Lee",
    photographerUrl: "https://unsplash.com/@susan_lee",
    region: "Arashiyama, Kyoto",
    country: "Japan",
  },

  // Journal & Editorial
  mountFujiSunrise: {
    id: "WJAl9CtgdyA",
    url: "https://images.unsplash.com/photo-1767286694091-2bffe3e8b489?auto=format&fit=crop&w=1600&q=85",
    alt: "Mount Fuji reflected in mirror water during twilight sunrise",
    photographer: "Steven Lynn",
    photographerUrl: "https://unsplash.com/@stevenlynn",
  },
  teaCeremony: {
    id: "9a0S_8bU0lo",
    url: "https://images.unsplash.com/photo-1558869632-279458ac1734?auto=format&fit=crop&w=1600&q=85",
    alt: "Traditional sukiya wooden tea pavilion in ancient cedar forest",
    photographer: "David Emrich",
    photographerUrl: "https://unsplash.com/@davidemrich",
  },
  forestMist: {
    id: "yd9G7X8_Jhc",
    url: "https://images.unsplash.com/photo-1759709953690-32b798b61822?auto=format&fit=crop&w=1600&q=85",
    alt: "Ancient fern forest bathed in quiet morning mountain mist",
    photographer: "Hotaka Saito",
    photographerUrl: "https://unsplash.com/@hotakasaito",
  },

  // Generational Specialists & Cultural Stewards
  specialistVikramaditya: {
    id: "specialist-vikramaditya",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
    alt: "Dr. Vikramaditya Singh, Mewar architectural historian",
    photographer: "Joseph Pearson",
    photographerUrl: "https://unsplash.com",
  },
  specialistAnanya: {
    id: "specialist-ananya",
    url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
    alt: "Ananya Menon, Vedic botanist and Ayurvedic wellness director",
    photographer: "Christina @ wocintechchat.com",
    photographerUrl: "https://unsplash.com",
  },
  specialistTenzin: {
    id: "specialist-tenzin",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=85",
    alt: "Tenzin Norbu, high-altitude Himalayan expeditioner",
    photographer: "Albert Dera",
    photographerUrl: "https://unsplash.com",
  },
};
