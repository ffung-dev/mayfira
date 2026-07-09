import Heading from "@/components/ui/Heading";
import ContentBrowser from "@/components/content-viewer/ContentBrowser";
import { getProjects } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-cream px-6 pt-16 pb-28">
      <Heading className="text-center">full-time problem solver, part-time creative</Heading>
      <ContentBrowser
        items={projects}
        placeholderMessage="let's look at a project!"
        techLabel="Technologies used"
      />
    </main>
  );
}
