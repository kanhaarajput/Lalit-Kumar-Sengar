import { ContactForm } from "@/components/ContactForm";
import { Mail, Phone } from 'lucide-react';
import { AnimatedDiv } from '@/components/AnimatedDiv';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-24">
      <AnimatedDiv>
        <div className="text-center">
          <h1 className="mb-4 font-headline text-4xl font-bold sm:text-5xl">Contact Me</h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Have a question or want to work together? Drop me a line.
          </p>
        </div>
      </AnimatedDiv>

      <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-5">
        <AnimatedDiv className="space-y-8 md:col-span-2" delay={0.2}>
            <h2 className="font-headline text-3xl font-semibold">Get in Touch</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email</h3>
                        <p className="text-muted-foreground">
                            I'm open to discussing new projects, creative ideas, or opportunities.
                        </p>
                        <a href="mailto:lalitthakur894@gmail.com" className="mt-1 inline-block font-medium text-primary transition-colors hover:text-primary/80">
                            lalitthakur894@gmail.com
                        </a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Phone</h3>
                         <p className="text-muted-foreground">
                            Feel free to give me a call to discuss your project needs.
                        </p>
                        <p className="mt-1 font-medium text-primary">+91 7253015988</p>
                    </div>
                </div>
            </div>
        </AnimatedDiv>
        <AnimatedDiv className="md:col-span-3" delay={0.3}>
           <ContactForm />
        </AnimatedDiv>
      </div>
    </div>
  );
}
