import { defineField, defineType } from "sanity";

/** Singleton. Small bits of page chrome that aren't tied to any one
 * project entry — the sidebar's bottom footer note, and the clipboard
 * placeholder's stickers. */
export default defineType({
  name: "projectsPageSettings",
  title: "Projects Page Settings",
  type: "document",
  groups: [
    { name: "sidebar", title: "Sidebar" },
    { name: "clipboard", title: "Clipboard placeholder" },
  ],
  fields: [
    defineField({
      name: "sidebarNote",
      type: "string",
      title: "Sidebar footer note",
      description: "The last, differently-styled tape at the bottom of the sidebar list.",
      initialValue: "always learning, always building ♥",
      group: "sidebar",
    }),
    defineField({
      name: "clipboardText",
      type: "string",
      title: "Clipboard text",
      description: "The handwritten line on the empty-state clipboard.",
      initialValue: "pick a project to explore!",
      group: "clipboard",
    }),
    defineField({
      name: "clipboardStickerOne",
      type: "image",
      title: "Clipboard sticker 1 (optional)",
      description: "Draggable decoration on the empty-state clipboard. Defaults to a coded paperclip.",
      options: { hotspot: true },
      group: "clipboard",
    }),
    defineField({
      name: "clipboardStickerTwo",
      type: "image",
      title: "Clipboard sticker 2 (optional)",
      description: "Draggable decoration on the empty-state clipboard. Defaults to a coded flower.",
      options: { hotspot: true },
      group: "clipboard",
    }),
    defineField({
      name: "clipboardStickerThree",
      type: "image",
      title: "Clipboard sticker 3 (optional)",
      description: "Draggable decoration on the empty-state clipboard. Defaults to a coded spark.",
      options: { hotspot: true },
      group: "clipboard",
    }),
    defineField({
      name: "clipboardStickerFour",
      type: "image",
      title: "Clipboard sticker 4 (optional)",
      description: "Draggable decoration on the empty-state clipboard. Defaults to a coded smiley.",
      options: { hotspot: true },
      group: "clipboard",
    }),
  ],
});
