import { defineField, defineType } from "sanity";

/** Singleton — there is only ever one of these. It's pinned directly to a
 * fixed document ID in structure.ts instead of showing up as a list. */
export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      initialValue: "it's about time we met!",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      type: "blockContent",
      title: "Bio",
    }),
    defineField({
      name: "photos",
      type: "array",
      title: "Photos",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
});
