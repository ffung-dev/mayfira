import { defineField, defineType } from "sanity";

export default defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      validation: (Rule) =>
        Rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
