import { ProjectCard } from '@/components/ProjectCard';
import { projectsData, type Project } from '@/lib/data';
import { AnimatedDiv } from '@/components/AnimatedDiv';

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-0 left-[-20%] top-0 -z-10 m-auto h-[510px] w-[510px] rounded-full bg-accent/20 opacity-20 blur-[120px]"></div>
      </div>
      <div className="container mx-auto py-12 md:py-24">
        <AnimatedDiv>
           <div className="relative text-center">
            <h1 className="relative z-10 mb-4 font-headline text-4xl font-bold sm:text-5xl">My Projects</h1>
             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-0" />
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              A collection of my work, from web applications to personal experiments.
            </p>
          </div>
        </AnimatedDiv>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project: Project, index: number) => (
              <AnimatedDiv key={project.id} delay={0.1 * (index + 1)}>
                <ProjectCard project={project} />
              </AnimatedDiv>
            ))}
        </div>
      </div>
    </div>
  );
}
