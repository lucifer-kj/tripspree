/**
 * TripSpree Unsplash Asset Registry
 * Curated high-resolution editorial photography for quiet-luxury sanctuaries.
 */

export interface UnsplashAsset {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  blurDataUrl?: string;
}

export const UNSPLASH_ASSETS = {
  // Hero Section
  heroBackground: {
    id: "bvPswCXrBvI",
    url: "https://images.unsplash.com/photo-1765422704685-9db1e2933325?auto=format&fit=crop&w=2400&q=85",
    alt: "Wooden sanctuary cabin nestled beside a mirror-still alpine lake and pine mountains",
    photographer: "Mikhail Mamaev",
    photographerUrl: "https://unsplash.com/@mikhailmamaev",
  },
  heroFocalPavilion: {
    id: "Za9KlWqJwkI",
    url: "https://images.unsplash.com/photo-1724157531851-57d4e79818dd?auto=format&fit=crop&w=1400&q=85",
    alt: "Minimalist cedar water pavilion with stone garden contemplation courtyard",
    photographer: "Naoki Suzuki",
    photographerUrl: "https://unsplash.com/@naokisuzuki",
  },
  heroCharterPlane: {
    id: "UdUbSPwbv2c",
    url: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1600&q=85",
    alt: "Private chartered jet ascending into pristine azure skies",
    photographer: "Kevin Woblick",
    photographerUrl: "https://unsplash.com/@kevinwoblick",
  },

  // Sanctuaries Showcase
  amanemu: {
    id: "bzRao_Gj5_E",
    url: "https://images.unsplash.com/photo-1770653711356-e6b9737866d0?auto=format&fit=crop&w=1400&q=85",
    alt: "Thermal mineral onsen pavilions enveloped in misty coastal forest",
    photographer: "Lei Hwang",
    photographerUrl: "https://unsplash.com/@leihwang",
  },
  benesseHouse: {
    id: "mQiZnKwGXW0",
    url: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?auto=format&fit=crop&w=1400&q=85",
    alt: "Tadao Ando smooth concrete oval pavilion framing open sky and water",
    photographer: "Kimon Maritz",
    photographerUrl: "https://unsplash.com/@kimonmaritz",
  },
  sowakaKyoto: {
    id: "u8fS3_bSWdI",
    url: "https://images.unsplash.com/photo-1610238115511-81be15284155?auto=format&fit=crop&w=1400&q=85",
    alt: "Cedar veranda and moss courtyard in historic Gion sanctuary",
    photographer: "Samuel Berner",
    photographerUrl: "https://unsplash.com/@samuelberner",
  },
  hoshinoyaKyoto: {
    id: "odaWAm5E3Cg",
    url: "https://images.unsplash.com/photo-1700109688821-15b8b773e780?auto=format&fit=crop&w=1400&q=85",
    alt: "Morning river mist and wild maples along the Oi River gorge in Arashiyama",
    photographer: "Gandosh Ganbaatar",
    photographerUrl: "https://unsplash.com/@gandosh",
  },

  // Curator's Journal & App
  mountFujiSunrise: {
    id: "WJAl9CtgdyA",
    url: "https://images.unsplash.com/photo-1767286694091-2bffe3e8b489?auto=format&fit=crop&w=1400&q=85",
    alt: "Mount Fuji reflected in mirror water during twilight sunrise",
    photographer: "Steven Lynn",
    photographerUrl: "https://unsplash.com/@stevenlynn",
  },
  teaCeremony: {
    id: "9a0S_8bU0lo",
    url: "https://images.unsplash.com/photo-1558869632-279458ac1734?auto=format&fit=crop&w=1400&q=85",
    alt: "Traditional sukiya wooden tea pavilion in ancient cedar forest",
    photographer: "David Emrich",
    photographerUrl: "https://unsplash.com/@davidemrich",
  },
  forestMist: {
    id: "yd9G7X8_Jhc",
    url: "https://images.unsplash.com/photo-1759709953690-32b798b61822?auto=format&fit=crop&w=1400&q=85",
    alt: "Ancient fern forest bathed in quiet morning mountain mist",
    photographer: "Hotaka Saito",
    photographerUrl: "https://unsplash.com/@hotakasaito",
  },
};
