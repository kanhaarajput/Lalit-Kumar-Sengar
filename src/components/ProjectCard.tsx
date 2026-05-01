'use client';

import type { Project } from '@/lib/data';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, X, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';

interface ProjectCardProps {
  project: Project;
}

// ─── Project Detail Modal ─────────────────────────────────────────────────────
function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card border border-border/30 shadow-2xl shadow-primary/10">
        {/* Hero Image */}
        {project.image && (
          <div className="relative h-72 w-full overflow-hidden rounded-t-2xl">
            <Image src={project.image} alt={project.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Title & badges */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-bold font-headline text-foreground">{project.name}</h2>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 flex-shrink-0">
                <Star className="w-3 h-3 mr-1" /> Featured
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2">{project.description}</p>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/70 mb-2 uppercase tracking-wider">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {(project.tech || []).map((tech) => (
                <Badge key={tech} variant="secondary"
                  className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Details / description */}
          {project.details && (
            <div>
              <h3 className="text-sm font-semibold text-foreground/70 mb-2 uppercase tracking-wider">About This Project</h3>
              <div className="prose dark:prose-invert prose-sm max-w-none text-muted-foreground">
                <ReactMarkdown>{project.details}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-border/20">
            {project.liveLink && project.liveLink !== '#' && (
              <Button asChild className="gradient-bg hover:scale-105 transition-transform duration-300">
                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Live
                </Link>
              </Button>
            )}
            {project.link && project.link !== '#' && !project.link.startsWith('/projects') && (
              <Button asChild variant="outline" className="hover:border-primary/40">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            )}
            <Button variant="ghost" onClick={onClose} className="ml-auto">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
export function ProjectCard({ project }: ProjectCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Card className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/20 bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 hover:border-primary/30">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image || 'https://placehold.co/600x400.png'}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
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
            {(project.tech || []).map((tech) => (
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
        <CardFooter className="flex gap-2 bg-muted/30 p-4 border-t border-border/20">
          {/* Details → opens modal */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
            onClick={() => setShowDetail(true)}
          >
            Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* GitHub */}
          {project.link && project.link !== '#' && !project.link.startsWith('/projects') && (
            <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}

          {/* Live */}
          {project.liveLink && project.liveLink !== '#' && (
            <Button asChild variant="default" size="sm" className="gradient-bg hover:scale-105 transition-transform duration-300 ml-auto">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Detail Modal */}
      {showDetail && <ProjectDetailModal project={project} onClose={() => setShowDetail(false)} />}
    </>
  );
}
