
import { projectsData } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';

export default function ProjectDetailsPage() {
  const project = projectsData.find((p) => p.id === 'project-1');

  if (!project || !project.details) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
       <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      <article className="prose prose-lg mx-auto dark:prose-invert">
         <div className="mb-8">
            <h1 className="font-headline text-4xl font-bold sm:text-5xl">{project.name}</h1>
            <p className="lead">{project.description}</p>
             <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary">
                    {tech}
                </Badge>
                ))}
            </div>
        </div>
        
        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg shadow-xl">
            <Image 
                src={project.image} 
                alt={project.name}
                fill
                className="object-cover"
                data-ai-hint="food sharing app"
            />
        </div>

        <div className="prose-p:my-4 prose-headings:my-6 prose-headings:font-headline prose-h2:text-3xl prose-h2:border-b prose-h2:pb-2">
            <ReactMarkdown>{project.details}</ReactMarkdown>
        </div>

         <div className="mt-12 flex gap-4">
            <Button asChild>
                <Link href={project.liveLink || '#'} target="_blank" rel="noopener noreferrer">
                    View Live Project <ExternalLink className="ml-2"/>
                </Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="https://github.com/kanhaarajput/Food_Share.git" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2"/> View on GitHub
                </Link>
            </Button>
        </div>
      </article>
    </div>
  );
}

// Add react-markdown to dependencies
// We need to add `react-markdown` to our dependencies in package.json
// to render the project details from markdown format.
