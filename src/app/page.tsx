'use client';

import { homeData, projectsData, type Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Phone, GraduationCap, Heart, Rocket, Code, Server, Wrench, MapPin, Award, GitCommit, Sparkles } from 'lucide-react';
import { AnimatedDiv } from '@/components/AnimatedDiv';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from '@/components/ProjectCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ThreeBackground } from '@/components/ThreeBackground';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { FloatingCard } from '@/components/FloatingCard';

// Education data
const education = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'ABES Institute of Technology, Ghaziabad (2023-2027)',
  },
  {
    degree: 'Senior Secondary (10+2)',
    institution: 'SBS Public School, Hathras (Completed 2023)',
  },
];

// Drives data
const drives = [
  'Constantly learning and evolving with modern tech',
  'Attention to detail with a strong UI/UX mindset',
  'Collaboration, clean code, and product-focused thinking',
  'Ambition to build platforms that create impact and scale globally',
];

// Tech stack data
const techStack = {
  frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'],
  tools: [], 
};

// Info Card Component
function InfoCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <FloatingCard className="info-card">
      <div className="rounded-lg bg-card/80 backdrop-blur-sm text-card-foreground p-6 shadow-lg border border-border/20 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          {icon}
          <h2 className="text-2xl font-bold font-headline">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </FloatingCard>
  );
}

// Profile Card Component
function ProfileCard() {
  return (
    <FloatingCard className="profile-card" intensity={0.15}>
      <div className="rounded-xl bg-card/80 backdrop-blur-sm text-card-foreground p-8 shadow-2xl border border-border/20 hover:border-primary/30 transition-all duration-300">
        <div className="text-center space-y-4">
          <div className="relative">
            <h1 className="text-4xl font-bold font-headline glow-text">Lalit Kumar Sengar</h1>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-pulse" />
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30">
            Full Stack Developer
          </Badge>

          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground">Projects</p>
                  <p className="text-2xl font-bold text-primary">2</p>
              </div>
               <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-2xl font-bold text-primary">1+</p>
              </div>
               <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground">Commits</p>
                  <p className="text-2xl font-bold text-primary">500+</p>
              </div>
          </div>

          <p className="text-muted-foreground pt-4">
            👋 Hi, I'm Lalit Kumar Sengar, a passionate Full Stack Developer based in Ghaziabad, India. I specialize in crafting modern, scalable, and user-focused web applications.
          </p>

          <Button asChild className="mt-4 gradient-bg hover:scale-105 transition-transform duration-300">
            <a href="#contact">
              Contact Me <Mail className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </FloatingCard>
  );
}

export default function Home() {
  const { setSectionRef } = useGSAPAnimations();

  return (
    <div className="relative min-h-screen">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 animated-gradient opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section 
        id="home" 
        ref={(el) => setSectionRef('home', el)}
        className="flex min-h-[calc(100vh-5rem)] items-center justify-center py-12 relative overflow-hidden"
      >
        <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <Badge variant="secondary" className="gradient-bg text-white border-0">
                <Sparkles className="mr-2 h-3 w-3" />
                Available for Work
              </Badge>
              <h1 className="hero-title font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl glow-text">
                Hi, I'm Lalit Kumar Sengar
              </h1>
              <h2 className="hero-subtitle text-3xl font-semibold text-muted-foreground">
                Full Stack Developer
              </h2>
              <p className="hero-description text-lg text-muted-foreground">
                {homeData.tagline}
              </p>
              <div className="hero-buttons flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="gradient-bg hover:scale-105 transition-transform duration-300">
                  <a href="#projects">
                    View My Work <ArrowRight className="ml-2" />
                  </a>
                </Button>
                <div className="flex items-center gap-2">
                   <Button asChild variant="outline" size="icon" className="hover:scale-110 transition-transform duration-300">
                    <Link href="https://github.com/kanhaarajput" target="_blank" rel="noopener noreferrer">
                      <Github className="h-6 w-6" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="hover:scale-110 transition-transform duration-300">
                    <Link href="https://www.linkedin.com/in/lalit-kumar-sengar-220646311" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="hover:scale-110 transition-transform duration-300">
                    <a href="#contact">
                      <Mail className="h-6 w-6" />
                      <span className="sr-only">Contact</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <FloatingCard className="hero-image" intensity={0.2}>
                <div className="relative w-[300px] lg:w-[375px] float-animation">
                    <div className="relative w-[300px] h-[300px] lg:w-[375px] lg:h-[375px] overflow-hidden rounded-full shadow-xl glow">
                <Image
                    src="/lalit.jpg"
                    alt="Portrait of Lalit Sengar"
                    fill
                    className="object-cover"
                    data-ai-hint="man standing"
                />
                </div>
            </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={(el) => setSectionRef('about', el)}
        className="py-12 md:py-24 relative"
      >
        <div className="absolute inset-0 gradient-bg-2 opacity-5" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="about-title font-headline text-4xl font-bold sm:text-5xl mb-4 glow-text">About Me</h2>
              <p className="text-lg text-muted-foreground">
                Get to know me better - my background, skills, and what drives me.
              </p>
            </div>

            <ProfileCard />

            <InfoCard title="Education" icon={<GraduationCap className="h-8 w-8 text-primary" />}>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <p>{edu.institution}</p>
                    </div>
                    {index < education.length - 1 && <hr className="my-4 border-border" />}
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard title="What Drives Me?" icon={<Rocket className="h-8 w-8 text-primary" />}>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {drives.map((drive, index) => (
                  <li key={index}>{drive}</li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard title="Tech Stack I Love" icon={<Heart className="h-8 w-8 text-primary" />}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Code className="h-5 w-5"/>Frontend:</h3>
                  <p className="text-muted-foreground">{techStack.frontend.join(', ')}</p>
                  <hr className="my-2 border-border/50" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Server className="h-5 w-5"/>Backend:</h3>
                  <p className="text-muted-foreground">{techStack.backend.join(', ')}</p>
                   <hr className="my-2 border-border/50" />
                </div>
                 {techStack.tools.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Wrench className="h-5 w-5"/>Tools & Others:</h3>
                    <p className="text-muted-foreground">{techStack.tools.join(', ')}</p>
                  </div>
                )}
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={(el) => setSectionRef('projects', el)}
        className="py-12 md:py-24 relative"
      >
        <div className="absolute inset-0 gradient-bg-3 opacity-5" />
        <div className="container mx-auto relative z-10">
          <div className="relative text-center mb-16">
            <h2 className="projects-title font-headline text-4xl font-bold sm:text-5xl mb-4 glow-text">My Projects</h2>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-0" />
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              A collection of my work, from web applications to personal experiments.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectsData.map((project: Project, index: number) => (
                <div key={project.id} className="project-card">
                  <FloatingCard intensity={0.1}>
                    <ProjectCard project={project} />
                  </FloatingCard>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={(el) => setSectionRef('contact', el)}
        className="py-12 md:py-24 relative"
      >
        <div className="absolute inset-0 gradient-bg-4 opacity-5" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="contact-title mb-4 font-headline text-4xl font-bold sm:text-5xl glow-text">Contact Me</h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Have a question or want to work together? Drop me a line.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
            <div className="space-y-8 md:col-span-2">
                <h3 className="font-headline text-3xl font-semibold">Get in Touch</h3>
                <div className="space-y-6">
                    <div className="contact-info flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold">Email</h4>
                            <p className="text-muted-foreground">
                                I'm open to discussing new projects, creative ideas, or opportunities.
                            </p>
                            <a href="mailto:lalitthakur894@gmail.com" className="mt-1 inline-block font-medium text-primary transition-colors hover:text-primary/80">
                                lalitthakur894@gmail.com
                            </a>
                        </div>
                    </div>
                     <div className="contact-info flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold">Phone</h4>
                             <p className="text-muted-foreground">
                                Feel free to give me a call to discuss your project needs.
                            </p>
                            <p className="mt-1 font-medium text-primary">+91 7253015988</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-form md:col-span-3">
               <FloatingCard intensity={0.05}>
                 <ContactForm />
               </FloatingCard>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
