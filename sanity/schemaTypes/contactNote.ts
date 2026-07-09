import { defineField, defineType } from "sanity";

const PAPER_STYLES = [
  { title: "Sticky note", value: "sticky-note" },
  { title: "Index card", value: "index-card" },
  { title: "Mini poster", value: "mini-poster" },
  { title: "Grocery receipt", value: "grocery-receipt" },
  { title: "Notebook paper", value: "notebook-paper" },
];

const ICON_KEYS = [
  { title: "Email", value: "email" },
  { title: "Instagram", value: "instagram" },
  { title: "GitHub", value: "github" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Phone", value: "phone" },
  { title: "Other", value: "other" },
];

export default defineType({
  name: "contactNote",
  title: "Contact Note",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      title: "Platform",
      description: 'e.g. "Instagram", "Email"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      type: "string",
      title: "Username / email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Short description",
      rows: 2,
    }),
    defineField({
      name: "paperStyle",
      type: "string",
      title: "Paper style",
      options: { list: PAPER_STYLES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconKey",
      type: "string",
      title: "Icon",
      options: { list: ICON_KEYS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconImage",
      type: "image",
      title: "Custom icon (optional)",
      description: "Overrides the coded icon for this note if set.",
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Link URL",
      validation: (Rule) =>
        Rule.required().uri({ allowRelative: false, scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "rotationOverride",
      type: "number",
      title: "Rotation override (degrees)",
      description: "Leave blank to use the automatic pinned-note tilt.",
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "value" },
  },
});
