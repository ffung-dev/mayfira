import { defineField } from "sanity";

/** Field set shared by `project` and `hobby` — same shape, same UI on the
 * frontend, but kept as two distinct document types since they're browsed
 * on separate pages and edited independently in the Studio. */
export function contentTypeFields(techFieldTitle: string) {
  return [
    // Required by the drag-to-reorder plugin (orderableDocumentListDeskItem
    // in structure.ts) — it needs a real schema field to store the order
    // in, it doesn't add one on its own. Hidden since it's managed by
    // dragging in the Studio list, not typed in directly.
    defineField({
      name: "orderRank",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnailImage",
      type: "image",
      title: "Sidebar thumbnail",
      options: { hotspot: true },
    }),
    defineField({
      name: "galleryImages",
      type: "array",
      title: "Gallery images",
      description: "Shown as a row of up to three images at the top of the entry.",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: "description",
      type: "blockContent",
      title: "About this project",
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Date",
    }),
    defineField({
      name: "techOrMaterials",
      type: "array",
      title: techFieldTitle,
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "myRole",
      type: "text",
      title: "My role",
      rows: 3,
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Key highlights",
      description: "Short bullet points — shown in the highlights card.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      of: [{ type: "linkItem" }],
    }),
    defineField({
      name: "codeLink",
      type: "object",
      title: "Hanging tab link",
      description:
        "The small tab that hangs off the edge of the content card. Leave the URL blank to hide it entirely — it doesn't have to be code, the label/icon are editable too.",
      fields: [
        defineField({
          name: "label",
          type: "string",
          title: "Label",
          initialValue: "view code",
        }),
        defineField({
          name: "icon",
          type: "image",
          title: "Icon (optional)",
          description: "Defaults to a GitHub mark if left blank.",
        }),
        defineField({
          name: "url",
          type: "url",
          title: "URL",
          validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
        }),
      ],
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ];
}
