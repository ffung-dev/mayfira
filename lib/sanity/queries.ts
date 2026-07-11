import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { urlFor } from "./image";

/** The Sanity project may not be configured yet (or the API may be briefly
 * unreachable) — that's a real, expected state during setup, not a bug, so
 * pages should render their empty/placeholder state instead of 500ing. */
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query);
  } catch (error) {
    console.warn(`[sanity] query failed, using fallback: ${query}`, error);
    return fallback;
  }
}

export type ContentLink = { label: string; url: string };

type RawCodeLink = { label?: string; icon?: SanityImageSource; url?: string };
export type CodeLink = { label: string; iconUrl?: string; url: string };

// Shape returned straight out of GROQ, before images are turned into URLs.
type RawContentItem = {
  _id: string;
  title: string;
  slug: string;
  thumbnailImage?: SanityImageSource;
  galleryImages?: SanityImageSource[];
  description?: PortableTextBlock[];
  date?: string;
  techOrMaterials?: string[];
  myRole?: string;
  highlights?: string[];
  links?: ContentLink[];
  codeLink?: RawCodeLink;
  tags?: string[];
};

export type ContentItem = {
  _id: string;
  title: string;
  slug: string;
  thumbnailUrl?: string;
  galleryUrls: string[];
  description: PortableTextBlock[];
  date?: string;
  techOrMaterials?: string[];
  myRole?: string;
  highlights?: string[];
  links?: ContentLink[];
  codeLink?: CodeLink;
  tags?: string[];
};

const CONTENT_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  thumbnailImage,
  galleryImages,
  description,
  date,
  techOrMaterials,
  myRole,
  highlights,
  links,
  codeLink,
  tags
}`;

function normalizeContentItem(doc: RawContentItem): ContentItem {
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    thumbnailUrl: doc.thumbnailImage
      ? urlFor(doc.thumbnailImage).width(200).height(200).fit("crop").url()
      : undefined,
    galleryUrls: (doc.galleryImages ?? []).map((image) =>
      urlFor(image).width(800).height(600).fit("max").url(),
    ),
    description: doc.description ?? [],
    date: doc.date,
    techOrMaterials: doc.techOrMaterials,
    myRole: doc.myRole,
    highlights: doc.highlights,
    links: doc.links,
    codeLink:
      doc.codeLink?.url
        ? {
            label: doc.codeLink.label || "view code",
            iconUrl: doc.codeLink.icon ? urlFor(doc.codeLink.icon).width(48).height(48).fit("max").url() : undefined,
            url: doc.codeLink.url,
          }
        : undefined,
    tags: doc.tags,
  };
}

export async function getProjects(): Promise<ContentItem[]> {
  const docs = await safeFetch<RawContentItem[]>(
    `*[_type == "project"] | order(orderRank) ${CONTENT_PROJECTION}`,
    [],
  );
  return docs.map(normalizeContentItem);
}

export async function getHobbies(): Promise<ContentItem[]> {
  const docs = await safeFetch<RawContentItem[]>(
    `*[_type == "hobby"] | order(orderRank) ${CONTENT_PROJECTION}`,
    [],
  );
  return docs.map(normalizeContentItem);
}

type RawAboutPage = {
  heading: string;
  bio?: PortableTextBlock[];
  photos?: SanityImageSource[];
};

export type AboutPageData = {
  heading: string;
  bio: PortableTextBlock[];
  photoUrls: string[];
};

export async function getAboutPage(): Promise<AboutPageData | null> {
  const doc = await safeFetch<RawAboutPage | null>(
    `*[_type == "aboutPage"][0]{ heading, bio, photos }`,
    null,
  );
  if (!doc) return null;
  return {
    heading: doc.heading,
    bio: doc.bio ?? [],
    photoUrls: (doc.photos ?? []).map((image) =>
      urlFor(image).width(600).height(600).fit("max").url(),
    ),
  };
}

type RawContactNote = {
  _id: string;
  platform: string;
  value: string;
  description?: string;
  paperStyle: string;
  iconKey: string;
  iconImage?: SanityImageSource;
  url: string;
  rotationOverride?: number;
};

export type ContactNote = {
  _id: string;
  platform: string;
  value: string;
  description?: string;
  paperStyle: string;
  iconKey: string;
  iconImageUrl?: string;
  url: string;
  rotationOverride?: number;
};

export async function getContactNotes(): Promise<ContactNote[]> {
  const docs = await safeFetch<RawContactNote[]>(
    `*[_type == "contactNote"] | order(orderRank) {
      _id, platform, value, description, paperStyle, iconKey, iconImage, url, rotationOverride
    }`,
    [],
  );
  return docs.map((doc) => ({
    _id: doc._id,
    platform: doc.platform,
    value: doc.value,
    description: doc.description,
    paperStyle: doc.paperStyle,
    iconKey: doc.iconKey,
    iconImageUrl: doc.iconImage
      ? urlFor(doc.iconImage).width(64).height(64).fit("max").url()
      : undefined,
    url: doc.url,
    rotationOverride: doc.rotationOverride,
  }));
}

type RawPolaroidPhoto = {
  _id: string;
  image: SanityImageSource;
  caption: string;
  rotationOverride?: number;
};

export type PolaroidPhoto = {
  _id: string;
  imageUrl: string;
  caption: string;
  rotationOverride?: number;
};

export async function getPolaroidPhotos(): Promise<PolaroidPhoto[]> {
  const docs = await safeFetch<RawPolaroidPhoto[]>(
    `*[_type == "polaroidPhoto"] | order(_createdAt) { _id, image, caption, rotationOverride }`,
    [],
  );
  return docs.map((doc) => ({
    _id: doc._id,
    imageUrl: urlFor(doc.image).width(400).height(480).fit("crop").url(),
    caption: doc.caption,
    rotationOverride: doc.rotationOverride,
  }));
}

type RawBulletinItem = {
  _id: string;
  displayStyle: string;
  title?: string;
  text?: string;
  image?: SanityImageSource;
  url?: string;
  rotationOverride?: number;
};

export type BulletinItem = {
  _id: string;
  displayStyle: string;
  title?: string;
  text?: string;
  imageUrl?: string;
  url?: string;
  rotationOverride?: number;
};

export async function getBulletinItems(): Promise<BulletinItem[]> {
  const docs = await safeFetch<RawBulletinItem[]>(
    `*[_type == "bulletinItem"] | order(orderRank) { _id, displayStyle, title, text, image, url, rotationOverride }`,
    [],
  );
  return docs.map((doc) => ({
    _id: doc._id,
    displayStyle: doc.displayStyle,
    title: doc.title,
    text: doc.text,
    imageUrl: doc.image ? urlFor(doc.image).width(500).height(500).fit("max").url() : undefined,
    url: doc.url,
    rotationOverride: doc.rotationOverride,
  }));
}

type RawHomePage = {
  teddyBearImage?: SanityImageSource;
  laptopImage?: SanityImageSource;
  yarnBallImage?: SanityImageSource;
  telephoneImage?: SanityImageSource;
  orangesBagImage?: SanityImageSource;
  scallionsImage?: SanityImageSource;
  chipBagImage?: SanityImageSource;
  milkCartonImage?: SanityImageSource;
  breadLoafImage?: SanityImageSource;
  eggCartonImage?: SanityImageSource;
  cannedGoodImage?: SanityImageSource;
  cerealBoxImage?: SanityImageSource;
  doodleImages?: SanityImageSource[];
  specials?: string[];
  specialsPaperclipImage?: SanityImageSource;
  subtitle?: string;
};

export type HomePageData = {
  teddyBearUrl?: string;
  laptopUrl?: string;
  yarnBallUrl?: string;
  telephoneUrl?: string;
  orangesBagUrl?: string;
  scallionsUrl?: string;
  chipBagUrl?: string;
  milkCartonUrl?: string;
  breadLoafUrl?: string;
  eggCartonUrl?: string;
  cannedGoodUrl?: string;
  cerealBoxUrl?: string;
  doodleUrls: string[];
  specials: string[];
  specialsPaperclipUrl?: string;
  subtitle: string;
};

const DEFAULT_SUBTITLE = "take a look around — everything in the cart leads somewhere.";

export async function getHomePageData(): Promise<HomePageData> {
  const doc = await safeFetch<RawHomePage | null>(
    `*[_type == "homePage"][0]{
      teddyBearImage, laptopImage, yarnBallImage, telephoneImage,
      orangesBagImage, scallionsImage, chipBagImage,
      milkCartonImage, breadLoafImage, eggCartonImage, cannedGoodImage, cerealBoxImage,
      doodleImages, specials, specialsPaperclipImage, subtitle
    }`,
    null,
  );
  if (!doc) return { doodleUrls: [], specials: [], subtitle: DEFAULT_SUBTITLE };
  const image200 = (source?: SanityImageSource) =>
    source ? urlFor(source).width(200).height(200).fit("max").url() : undefined;
  return {
    teddyBearUrl: image200(doc.teddyBearImage),
    laptopUrl: image200(doc.laptopImage),
    yarnBallUrl: image200(doc.yarnBallImage),
    telephoneUrl: image200(doc.telephoneImage),
    orangesBagUrl: image200(doc.orangesBagImage),
    scallionsUrl: image200(doc.scallionsImage),
    chipBagUrl: image200(doc.chipBagImage),
    milkCartonUrl: image200(doc.milkCartonImage),
    breadLoafUrl: image200(doc.breadLoafImage),
    eggCartonUrl: image200(doc.eggCartonImage),
    cannedGoodUrl: image200(doc.cannedGoodImage),
    cerealBoxUrl: image200(doc.cerealBoxImage),
    doodleUrls: (doc.doodleImages ?? []).map((image) => urlFor(image).width(120).height(120).fit("max").url()),
    specials: doc.specials ?? [],
    specialsPaperclipUrl: image200(doc.specialsPaperclipImage),
    subtitle: doc.subtitle ?? DEFAULT_SUBTITLE,
  };
}

export type ClipboardStickerUrls = {
  clipboardStickerOneUrl?: string;
  clipboardStickerTwoUrl?: string;
  clipboardStickerThreeUrl?: string;
  clipboardStickerFourUrl?: string;
};

export type ClipboardText = { clipboardText: string };

export type ContentPageSettings = ClipboardStickerUrls &
  ClipboardText & {
    sidebarNote: string;
    sidebarFooterImageUrl?: string;
  };

type RawContentPageSettings = {
  sidebarNote?: string;
  sidebarFooterImage?: SanityImageSource;
  clipboardText?: string;
  clipboardStickerOne?: SanityImageSource;
  clipboardStickerTwo?: SanityImageSource;
  clipboardStickerThree?: SanityImageSource;
  clipboardStickerFour?: SanityImageSource;
} | null;

const PAGE_SETTINGS_PROJECTION = `{
  sidebarNote, sidebarFooterImage, clipboardText,
  clipboardStickerOne, clipboardStickerTwo, clipboardStickerThree, clipboardStickerFour
}`;

const DEFAULT_PROJECTS_SETTINGS: Omit<ContentPageSettings, keyof ClipboardStickerUrls> = {
  sidebarNote: "always learning, always building ♥",
  clipboardText: "pick a project to explore!",
};

const DEFAULT_HOBBIES_SETTINGS: Omit<ContentPageSettings, keyof ClipboardStickerUrls> = {
  sidebarNote: "always curious, always making ♥",
  clipboardText: "pick a hobby, any hobby …",
};

function normalizePageSettings(
  doc: RawContentPageSettings,
  defaults: Omit<ContentPageSettings, keyof ClipboardStickerUrls>,
): ContentPageSettings {
  const image = (source?: SanityImageSource) =>
    source ? urlFor(source).width(160).height(160).fit("max").url() : undefined;
  return {
    sidebarNote: doc?.sidebarNote ?? defaults.sidebarNote,
    sidebarFooterImageUrl: image(doc?.sidebarFooterImage),
    clipboardText: doc?.clipboardText ?? defaults.clipboardText,
    clipboardStickerOneUrl: image(doc?.clipboardStickerOne),
    clipboardStickerTwoUrl: image(doc?.clipboardStickerTwo),
    clipboardStickerThreeUrl: image(doc?.clipboardStickerThree),
    clipboardStickerFourUrl: image(doc?.clipboardStickerFour),
  };
}

// GROQ omits fields that were never set rather than nulling them, and the
// document itself may not exist at all yet — normalize handles both.
export async function getProjectsPageSettings(): Promise<ContentPageSettings> {
  const doc = await safeFetch<RawContentPageSettings>(
    `*[_type == "projectsPageSettings"][0]${PAGE_SETTINGS_PROJECTION}`,
    null,
  );
  return normalizePageSettings(doc, DEFAULT_PROJECTS_SETTINGS);
}

export async function getHobbiesPageSettings(): Promise<ContentPageSettings> {
  const doc = await safeFetch<RawContentPageSettings>(
    `*[_type == "hobbiesPageSettings"][0]${PAGE_SETTINGS_PROJECTION}`,
    null,
  );
  return normalizePageSettings(doc, DEFAULT_HOBBIES_SETTINGS);
}
