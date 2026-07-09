import { defineField, defineType } from "sanity";

/** Singleton. Optional per-item image overrides for the four cart
 * illustrations — leave any of these blank to keep the coded SVG. */
export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "teddyBearImage",
      type: "image",
      title: "Teddy bear (About) — custom image",
      options: { hotspot: true },
    }),
    defineField({
      name: "laptopImage",
      type: "image",
      title: "Laptop (Projects) — custom image",
      options: { hotspot: true },
    }),
    defineField({
      name: "yarnBallImage",
      type: "image",
      title: "Yarn ball (Hobbies) — custom image",
      options: { hotspot: true },
    }),
    defineField({
      name: "telephoneImage",
      type: "image",
      title: "Telephone (Contact) — custom image",
      options: { hotspot: true },
    }),
  ],
});
