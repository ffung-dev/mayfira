import { defineType } from "sanity";
import { contentTypeFields } from "./shared/contentTypeFields";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: contentTypeFields("Technologies used"),
  preview: {
    select: { title: "title", media: "thumbnailImage" },
  },
});
