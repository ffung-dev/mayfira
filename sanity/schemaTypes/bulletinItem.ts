import { defineField, defineType } from "sanity";

const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

const DISPLAY_STYLES = [
  { title: "Post-it", value: "post-it" },
  { title: "Poster", value: "poster" },
  { title: "Decoration / image", value: "decoration-image" },
  { title: "Polaroid", value: "polaroid" },
  { title: "Tag", value: "tag" },
  { title: "Receipt", value: "receipt" },
];

/** Free-form bulletin board content — unlike `contactNote` (which is
 * specifically a clickable contact method) this is for anything else you
 * want pinned to the board: photos, quotes, decorations. Pick how it's
 * rendered per entry. */
export default defineType({
  name: "bulletinItem",
  title: "Bulletin Board Item",
  type: "document",
  fields: [
    // Required by the drag-to-reorder plugin (orderableDocumentListDeskItem
    // in structure.ts) — it needs a real schema field to store the order
    // in, it doesn't add one on its own.
    defineField({
      name: "orderRank",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "displayStyle",
      type: "string",
      title: "Display style",
      options: { list: DISPLAY_STYLES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title (optional)",
    }),
    defineField({
      name: "text",
      type: "text",
      title: "Text (optional)",
      description: "Caption or body text — used differently depending on the display style.",
      rows: 3,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image (optional)",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Link (optional)",
      description: "If set, the item opens this in a new tab when clicked.",
      validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "rotationOverride",
      type: "number",
      title: "Rotation override (degrees)",
      description: "Leave blank to use the automatic pinned tilt.",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Background color (hex, optional)",
      description: 'e.g. "#FFD3D5". Leave blank to use the display style\'s normal color.',
      validation: (Rule) => Rule.regex(HEX_COLOR_PATTERN, { name: "hex color" }),
    }),
    defineField({
      name: "outlineColor",
      type: "string",
      title: "Outline color (hex, optional)",
      description: 'e.g. "#372417". Leave blank for the default brown outline.',
      validation: (Rule) => Rule.regex(HEX_COLOR_PATTERN, { name: "hex color" }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "displayStyle", media: "image" },
  },
});
