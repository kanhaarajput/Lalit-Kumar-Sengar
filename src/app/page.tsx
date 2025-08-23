
import { homeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatedDiv } from '@/components/AnimatedDiv';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  return (
    <div className="container mx-auto">
      <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center py-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <AnimatedDiv>
            <div className="space-y-6">
              <Badge variant="secondary">Available for Work</Badge>
              <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
                Hi, I'm Lalit Kumar Sengar
              </h1>
              <h2 className="text-3xl font-semibold text-muted-foreground">
                Full Stack Developer
              </h2>
              <p className="text-lg text-muted-foreground">
                {homeData.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/projects">
                    View My Work <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2">
                   <Button asChild variant="outline" size="icon">
                    <Link href="https://github.com/kanhaarajput" target="_blank" rel="noopener noreferrer">
                      <Github className="h-6 w-6" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <Link href="https://www.linkedin.com/in/lalit-kumar-sengar-220646311" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <Link href="/contact">
                      <Mail className="h-6 w-6" />
                      <span className="sr-only">Contact</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedDiv>
          <AnimatedDiv delay={0.2} className="flex justify-center">
            <div className="relative w-[300px] lg:w-[375px]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                <Image
                    src="/lalit.jpg"
                    alt="Portrait of Lalit Sengar"
                    fill
                    className="object-cover"
                    data-ai-hint="man standing"
                />
                </div>
            </div>
          </AnimatedDiv>
        </div>
      </section>
    </div>
  );
}

function Card({ children, className, ...props }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) {
    return (
        <div className={`bg-card text-card-foreground border rounded-lg ${className}`} {...props}>
            {children}
        </div>
    )
}
