'use client';

import type { Project } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Sparkles, ArrowRight, Github } from 'lucide-react';
import { ImproveDescriptionDialog } from './ImproveDescriptionDialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="group flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint="abstract technology"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <CardHeader className="flex-1">
          <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-wrap justify-between gap-2 bg-muted/50 p-4">
             <div className="flex gap-2">
              <Button asChild variant="ghost" size="sm">
                  <Link href={project.link}>
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
               {project.liveLink && (
                     <Button asChild variant="default" size="sm">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live
                        </Link>
                    </Button>
                )}
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsDialogOpen(true)}>
                <Sparkles className="h-4 w-4" />
                <span className="sr-only">AI Assistant</span>
            </Button>
        </CardFooter>
      </Card>
      <ImproveDescriptionDialog
        project={project}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
