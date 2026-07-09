import { defineField, defineType } from "sanity";

export default defineType({
  name: "polaroidPhoto",
  title: "Polaroid Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
      description: "Shown in a text bubble when a visitor hovers the photo.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rotationOverride",
      type: "number",
      title: "Rotation override (degrees)",
      description: "Leave blank to use the automatic pinned tilt.",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
  },
});
