import Heading from "@/components/ui/Heading";
import ContentBrowser from "@/components/content-viewer/ContentBrowser";
import PageTag from "@/components/content-viewer/PageTag";
import { getProjects, getProjectsPageSettings } from "@/lib/sanity/queries";
import patterns from "@/styles/pagePatterns.module.css";

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getProjectsPageSettings()]);

  return (
    <main className={`flex min-h-screen flex-col items-center gap-8 px-6 pt-16 pb-28 ${patterns.projects}`}>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="min-w-0 flex-1">
          <Heading className="text-center text-cream">full-time problem solver, part-time creative</Heading>
        </div>
        <PageTag text={settings.tagText} />
      </div>
      <ContentBrowser
        items={projects}
        placeholderMessage="let's look at a project!"
        techLabel="Technologies used"
        sidebarHeading="pick a project"
        footerNote={settings.sidebarNote}
      />
    </main>
  );
}
