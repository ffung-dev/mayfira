import { defineField, defineType } from "sanity";

/** Singleton. Small bits of page chrome that aren't tied to any one
 * hobby entry — the taped tag next to the heading, and the sidebar's
 * bottom footer note. */
export default defineType({
  name: "hobbiesPageSettings",
  title: "Hobbies Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "tagText",
      type: "string",
      title: "Heading tag text",
      description: "Small taped tag shown next to the page heading.",
      initialValue: "for fun",
    }),
    defineField({
      name: "sidebarNote",
      type: "string",
      title: "Sidebar footer note",
      description: "The last, differently-styled tape at the bottom of the sidebar list.",
      initialValue: "always curious, always making ♥",
    }),
  ],
});
