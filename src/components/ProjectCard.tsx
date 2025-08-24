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
      <Card className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/20 bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/30">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint="abstract technology"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              <Sparkles className="mr-1 h-3 w-3" />
              Featured
            </Badge>
          </div>
        </div>
        <CardHeader className="flex-1">
          <CardTitle className="font-headline text-xl text-foreground group-hover:text-primary transition-colors duration-300">
            {project.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-muted-foreground">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 hover:from-primary/20 hover:to-primary/10 transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-wrap justify-between gap-2 bg-muted/30 p-4 border-t border-border/20">
             <div className="flex gap-2">
              <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
                  <Link href={project.link}>
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
              </Button>
               {project.liveLink && (
                     <Button asChild variant="default" size="sm" className="gradient-bg hover:scale-105 transition-transform duration-300">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live
                        </Link>
                    </Button>
                )}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300" 
              onClick={() => setIsDialogOpen(true)}
            >
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
