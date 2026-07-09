import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { urlFor } from "./image";

export type ContentLink = { label: string; url: string };

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
  links?: ContentLink[];
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
  links?: ContentLink[];
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
  links,
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
    links: doc.links,
    tags: doc.tags,
  };
}

export async function getProjects(): Promise<ContentItem[]> {
  const docs = await sanityClient.fetch<RawContentItem[]>(
    `*[_type == "project"] | order(orderRank) ${CONTENT_PROJECTION}`,
  );
  return docs.map(normalizeContentItem);
}

export async function getHobbies(): Promise<ContentItem[]> {
  const docs = await sanityClient.fetch<RawContentItem[]>(
    `*[_type == "hobby"] | order(orderRank) ${CONTENT_PROJECTION}`,
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
  const doc = await sanityClient.fetch<RawAboutPage | null>(
    `*[_type == "aboutPage"][0]{ heading, bio, photos }`,
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
  const docs = await sanityClient.fetch<RawContactNote[]>(
    `*[_type == "contactNote"] | order(orderRank) {
      _id, platform, value, description, paperStyle, iconKey, iconImage, url, rotationOverride
    }`,
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
  const docs = await sanityClient.fetch<RawPolaroidPhoto[]>(
    `*[_type == "polaroidPhoto"] | order(_createdAt) { _id, image, caption, rotationOverride }`,
  );
  return docs.map((doc) => ({
    _id: doc._id,
    imageUrl: urlFor(doc.image).width(400).height(480).fit("crop").url(),
    caption: doc.caption,
    rotationOverride: doc.rotationOverride,
  }));
}
