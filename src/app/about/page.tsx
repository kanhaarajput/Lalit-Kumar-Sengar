import { GraduationCap, Briefcase, Heart, Rocket, Code, Server, Wrench, MapPin, Mail, Award, GitCommit } from 'lucide-react';
import { AnimatedDiv } from '@/components/AnimatedDiv';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';


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

const drives = [
  'Constantly learning and evolving with modern tech',
  'Attention to detail with a strong UI/UX mindset',
  'Collaboration, clean code, and product-focused thinking',
  'Ambition to build platforms that create impact and scale globally',
];

const techStack = {
  frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'],
  tools: [], 
};

function InfoCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-card text-card-foreground p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="rounded-xl bg-card text-card-foreground p-8 shadow-2xl border border-border/20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-headline">Lalit Kumar Sengar</h1>
        <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">Full Stack Developer</Badge>

        <div className="grid grid-cols-3 gap-4 pt-4 text-center">
            <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <p className="text-2xl font-bold">2</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Experience</p>
                <p className="text-2xl font-bold">1+</p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Commits</p>
                <p className="text-2xl font-bold">500+</p>
            </div>
        </div>

        <p className="text-muted-foreground pt-4">
          👋 Hi, I'm Lalit Kumar Sengar, a passionate Full Stack Developer based in Ghaziabad, India.I specialize in crafting modern, scalable, and user-focused web applications.
        </p>

        <Button asChild className="mt-4">
          <Link href="/contact">
            Contact Me <Mail className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-muted/30 dark:bg-zinc-900 py-12 md:py-24">
      <div className="container mx-auto max-w-3xl">
        <AnimatedDiv className="space-y-8">
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
        </AnimatedDiv>
      </div>
    </div>
  );
}
