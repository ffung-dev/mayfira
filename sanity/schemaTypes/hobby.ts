import { defineType } from "sanity";
import { contentTypeFields } from "./shared/contentTypeFields";

export default defineType({
  name: "hobby",
  title: "Hobby",
  type: "document",
  fields: contentTypeFields("Materials used"),
  preview: {
    select: { title: "title", media: "thumbnailImage" },
  },
});
