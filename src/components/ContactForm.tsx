'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, LoaderCircle } from 'lucide-react';

const initialState = {
  message: '',
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? 'Sending...' : 'Send Message'}
      {!pending && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && !state.errors) {
       toast({
         variant: 'destructive',
         title: 'Error',
         description: state.message,
       });
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Send a Message</CardTitle>
            <CardDescription>I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your Name" required />
                    {state.errors?.name && <p className="mt-1 text-sm text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                    {state.errors?.email && <p className="mt-1 text-sm text-destructive">{state.errors.email[0]}</p>}
                </div>
                <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message here..." required rows={5} />
                    {state.errors?.message && <p className="mt-1 text-sm text-destructive">{state.errors.message[0]}</p>}
                </div>
                <SubmitButton />
            </form>
        </CardContent>
    </Card>
  );
}
