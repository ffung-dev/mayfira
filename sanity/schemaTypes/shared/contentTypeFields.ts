import { defineField } from "sanity";

/** Field set shared by `project` and `hobby` — same shape, same UI on the
 * frontend, but kept as two distinct document types since they're browsed
 * on separate pages and edited independently in the Studio. */
export function contentTypeFields(techFieldTitle: string) {
  return [
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
      title: "Description",
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
      name: "links",
      type: "array",
      title: "Links",
      of: [{ type: "linkItem" }],
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
