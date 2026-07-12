import Heading from "@/components/ui/Heading";
import ContentBrowser from "@/components/content-viewer/ContentBrowser";
import { getProjects, getProjectsPageSettings } from "@/lib/sanity/queries";
import patterns from "@/styles/pagePatterns.module.css";

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getProjectsPageSettings()]);

  return (
    <main className={`flex min-h-screen flex-col items-center gap-8 px-6 pt-16 pb-28 ${patterns.projects}`}>
      <Heading className="text-center text-cream">full-time problem solver, part-time creative</Heading>
      <ContentBrowser
        pageKey="projects"
        items={projects}
        techLabel="Technologies used"
        sidebarHeading="pick a project"
        footerNote={settings.sidebarNote}
        footerImageUrl={settings.sidebarFooterImageUrl}
        clipboardText={settings.clipboardText}
        clipboardStickers={settings}
      />
    </main>
  );
}
