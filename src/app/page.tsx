'use client';

import { useState, useEffect } from 'react';
import { projectsData, type Project } from '@/lib/data';
import { getHeroData, getEducation, getDrives, getTechStack, getProjects, getAchievements } from '@/lib/portfolio-service';
import type { HeroData, EducationItem, DriveItem, TechStack, ProjectItem, AchievementItem } from '@/lib/portfolio-service';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail, Phone, GraduationCap, Heart, Rocket, Code, Server, Wrench, MapPin, Sparkles, Download, Database, Bot } from 'lucide-react';
import { AnimatedDiv } from '@/components/AnimatedDiv';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard } from '@/components/ProjectCard';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ThreeBackground } from '@/components/ThreeBackground';
import { useGSAPAnimations } from '@/hooks/useGSAPAnimations';
import { FloatingCard } from '@/components/FloatingCard';
import { AchievementPublicCard } from '@/components/AchievementPublicCard';

// ─── Static Fallbacks ─────────────────────────────────────────────────────────
const defaultHero: HeroData = {
  name: "Lalit Kumar Sengar", role: "Full Stack Developer",
  tagline: "Hi, I'm Lalit Kumar Sengar — a passionate full-stack developer with a knack for building scalable, real-world applications.",
  available: true, githubUrl: "https://github.com/kanhaarajput",
  linkedinUrl: "https://www.linkedin.com/in/lalit-kumar-sengar-220646311",
  email: "lalitthakur894@gmail.com", phone: "+91 7253015988",
  projectsCount: "2", experience: "1+", commits: "500+",
  bio: "👋 Hi, I'm Lalit Kumar Sengar, a passionate Full Stack Developer based in Ghaziabad, India. I specialize in crafting modern, scalable, and user-focused web applications.",
  profileImage: "/lalit.jpg",
  resumeUrl: "",
};

const defaultEducation: EducationItem[] = [
  { degree: 'B.Tech in Computer Science', institution: 'ABES Institute of Technology, Ghaziabad (2023-2027)', order: 0 },
  { degree: 'Senior Secondary (10+2)', institution: 'SBS Public School, Hathras (Completed 2023)', order: 1 },
];

const defaultDrives: DriveItem[] = [
  { text: 'Constantly learning and evolving with modern tech', order: 0 },
  { text: 'Attention to detail with a strong UI/UX mindset', order: 1 },
  { text: 'Collaboration, clean code, and product-focused thinking', order: 2 },
  { text: 'Ambition to build platforms that create impact and scale globally', order: 3 },
];

const defaultTechStack: TechStack = {
  frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'],
  tools: [],
};

// ─── Info Card ────────────────────────────────────────────────────────────────
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

// ─── Profile Card ─────────────────────────────────────────────────────────────
function ProfileCard({ hero }: { hero: HeroData }) {
  return (
    <FloatingCard className="profile-card" intensity={0.15}>
      <div className="rounded-xl bg-card/80 backdrop-blur-sm text-card-foreground p-8 shadow-2xl border border-border/20 hover:border-primary/30 transition-all duration-300">
        <div className="text-center space-y-4">
          <div className="relative">
            <h1 className="text-4xl font-bold font-headline glow-text">{hero.name}</h1>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30">
            {hero.role}
          </Badge>

          <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-3 rounded-lg bg-primary/10">
              <p className="text-sm text-muted-foreground">Projects</p>
              <p className="text-2xl font-bold text-primary">{hero.projectsCount}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <p className="text-sm text-muted-foreground">Experience</p>
              <p className="text-2xl font-bold text-primary">{hero.experience}</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <p className="text-sm text-muted-foreground">Commits</p>
              <p className="text-2xl font-bold text-primary">{hero.commits}</p>
            </div>
          </div>

          <p className="text-muted-foreground pt-4">{hero.bio}</p>

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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { setSectionRef } = useGSAPAnimations();

  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [education, setEducation] = useState<EducationItem[]>(defaultEducation);
  const [drives, setDrives] = useState<DriveItem[]>(defaultDrives);
  const [techStack, setTechStack] = useState<TechStack>(defaultTechStack);
  const [projects, setProjects] = useState<(ProjectItem | Project)[]>(projectsData);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);

  useEffect(() => {
    // Fetch all data from Firestore in parallel
    Promise.all([
      getHeroData(),
      getEducation(),
      getDrives(),
      getTechStack(),
      getProjects(),
      getAchievements(),
    ]).then(([heroData, eduData, drivesData, techData, projectsData, achievementsData]) => {
      if (heroData) setHero(heroData);
      if (eduData?.length) setEducation(eduData);
      if (drivesData?.length) setDrives(drivesData);
      if (techData) setTechStack(techData);
      if (projectsData?.length) setProjects(projectsData);
      if (achievementsData?.length) setAchievements(achievementsData);
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <ThreeBackground />
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
              <h1 className="hero-title font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl glow-text">
                Hi, I&apos;m {hero.name}
              </h1>
              <h2 className="hero-subtitle text-3xl font-semibold text-muted-foreground">
                {hero.role}
              </h2>
              <p className="hero-description text-lg text-muted-foreground">
                {hero.tagline}
              </p>
              <div className="hero-buttons flex flex-col gap-4">
                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="gradient-bg hover:scale-105 transition-transform duration-300">
                    <a href="#projects">
                      View My Work <ArrowRight className="ml-2" />
                    </a>
                  </Button>
                  {hero.resumeUrl && (
                    <Button asChild size="lg" variant="outline" className="hover:scale-105 transition-transform duration-300 border-primary/40 hover:border-primary">
                      <a href={`/api/download?url=${encodeURIComponent(hero.resumeUrl)}`} download>
                        <Download className="mr-2 h-4 w-4" /> Download CV
                      </a>
                    </Button>
                  )}
                </div>

                {/* Social Buttons — moved below */}
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="icon" className="hover:scale-110 transition-transform duration-300">
                    <Link href={hero.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="hover:scale-110 transition-transform duration-300">
                    <Link href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon" className="hover:scale-110 transition-transform duration-300">
                    <a href="#contact">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Contact</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center">
              <FloatingCard className="hero-image" intensity={0.2}>
                <div className="relative w-[300px] lg:w-[375px] float-animation">
                  <div className="relative w-[300px] h-[300px] lg:w-[375px] lg:h-[375px] overflow-hidden rounded-full shadow-xl glow">
                    <Image
                      src={hero.profileImage || '/lalit.jpg'}
                      alt={`Portrait of ${hero.name}`}
                      fill
                      className="object-cover"
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

            <ProfileCard hero={hero} />

            <InfoCard title="Education" icon={<GraduationCap className="h-8 w-8 text-primary" />}>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
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
                  <li key={drive.id || index}>{drive.text}</li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard title="Tech Stack I Love" icon={<Heart className="h-8 w-8 text-primary" />}>
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground/80">
                    <Code className="h-5 w-5 text-violet-400" /> Frontend Ecosystem
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.frontend.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 border-violet-500/20 transition-colors text-sm px-3 py-1 cursor-default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground/80">
                    <Server className="h-5 w-5 text-blue-400" /> Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.backend.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20 transition-colors text-sm px-3 py-1 cursor-default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                {(techStack.database && techStack.database.length > 0) && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground/80">
                      <Database className="h-5 w-5 text-orange-400" /> Database
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.database.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border-orange-500/20 transition-colors text-sm px-3 py-1 cursor-default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {(techStack.ai && techStack.ai.length > 0) && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground/80">
                      <Bot className="h-5 w-5 text-pink-400" /> AI Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.ai.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border-pink-500/20 transition-colors text-sm px-3 py-1 cursor-default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {techStack.tools.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground/80">
                      <Wrench className="h-5 w-5 text-emerald-400" /> Tools & Others
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.tools.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 transition-colors text-sm px-3 py-1 cursor-default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section
          id="achievements"
          ref={(el) => setSectionRef('achievements', el)}
          className="py-12 md:py-24 relative"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-30" />
          <div className="container mx-auto relative z-10">
            <div className="relative text-center mb-16">
              <h2 className="font-headline text-4xl font-bold sm:text-5xl mb-4 glow-text text-primary">Achievements & Certifications</h2>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Milestones, awards, and certifications I&apos;ve earned along my journey.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item, i) => (
                <div key={item.id || i} className="project-card">
                  <AchievementPublicCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            {projects.map((project, index) => (
              <div key={project.id} className="project-card">
                <FloatingCard intensity={0.1}>
                  <ProjectCard project={project as Project} />
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
                    <p className="text-muted-foreground">I&apos;m open to discussing new projects, creative ideas, or opportunities.</p>
                    <a href={`mailto:${hero.email}`} className="mt-1 inline-block font-medium text-primary transition-colors hover:text-primary/80">
                      {hero.email}
                    </a>
                  </div>
                </div>
                <div className="contact-info flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">Phone</h4>
                    <p className="text-muted-foreground">Feel free to give me a call to discuss your project needs.</p>
                    <p className="mt-1 font-medium text-primary">{hero.phone}</p>
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

      <ScrollToTop />
    </div>
  );
}
