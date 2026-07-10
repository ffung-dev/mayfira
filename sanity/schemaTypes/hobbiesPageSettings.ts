import { defineField, defineType } from "sanity";

/** Singleton. Small bits of page chrome that aren't tied to any one
 * hobby entry — the note card next to the heading, the sidebar's
 * bottom footer note, and the clipboard placeholder's stickers. */
export default defineType({
  name: "hobbiesPageSettings",
  title: "Hobbies Page Settings",
  type: "document",
  groups: [
    { name: "noteCard", title: "Note card" },
    { name: "sidebar", title: "Sidebar" },
    { name: "clipboard", title: "Clipboard placeholder" },
  ],
  fields: [
    defineField({
      name: "tagText",
      type: "text",
      title: "Note card text",
      description: "The note card pinned next to the page heading.",
      rows: 2,
      initialValue: "collect hobbies, not things.",
      group: "noteCard",
    }),
    defineField({
      name: "stickerImage",
      type: "image",
      title: "Note card sticker (optional)",
      description: "Decoration in the corner of the note card. Defaults to a coded flower doodle.",
      options: { hotspot: true },
      group: "noteCard",
    }),
    defineField({
      name: "sidebarNote",
      type: "string",
      title: "Sidebar footer note",
      description: "The last, differently-styled tape at the bottom of the sidebar list.",
      initialValue: "always curious, always making ♥",
      group: "sidebar",
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
