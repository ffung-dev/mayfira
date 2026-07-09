import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

/** Custom desk layout: Projects/Hobbies/Contact Notes get drag-to-reorder
 * lists (their on-site order follows Studio order), About is pinned to a
 * single fixed document instead of a create-many list. */
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({ type: "project", title: "Projects", S, context }),
      orderableDocumentListDeskItem({ type: "hobby", title: "Hobbies", S, context }),
      orderableDocumentListDeskItem({ type: "contactNote", title: "Contact Notes", S, context }),
      S.documentTypeListItem("polaroidPhoto").title("Polaroid Photos"),
      S.divider(),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem()
        .title("Projects Page Settings")
        .child(S.document().schemaType("projectsPageSettings").documentId("projectsPageSettings")),
      S.listItem()
        .title("Hobbies Page Settings")
        .child(S.document().schemaType("hobbiesPageSettings").documentId("hobbiesPageSettings")),
    ]);
