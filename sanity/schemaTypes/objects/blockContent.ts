import { defineArrayMember, defineField, defineType } from "sanity";

/** Rich text used for project/hobby descriptions and the About bio. Kept
 * deliberately small — H1/H2 are reserved for page headings, so only H4
 * is offered here as an in-body subheading. */
export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Subheading", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          defineField({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: "newTab",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
