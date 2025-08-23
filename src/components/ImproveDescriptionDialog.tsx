'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/lib/data';
import { useState, useTransition, useEffect } from 'react';
import { improveDescriptionAction } from '@/app/actions';
import { Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

interface ImproveDescriptionDialogProps {
  project: Project;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ImproveDescriptionDialog({
  project,
  isOpen,
  onOpenChange,
}: ImproveDescriptionDialogProps) {
  const [improvedDescription, setImprovedDescription] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setImprovedDescription('');
    }
  }, [isOpen]);

  const handleImproveDescription = () => {
    startTransition(async () => {
      const result = await improveDescriptionAction(project.description);
      if (result.success && result.improvedDescription) {
        setImprovedDescription(result.improvedDescription);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message || 'Failed to generate suggestion.',
        });
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-primary" /> AI Assistant
          </DialogTitle>
          <DialogDescription>
            Improve the description for &quot;{project.name}&quot; with AI.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">Current Description</h3>
                <p className="rounded-md border bg-muted p-3 text-sm min-h-[100px]">{project.description}</p>
            </div>
            <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">AI Suggestion</h3>
                {isPending ? (
                  <div className="space-y-2 rounded-md border p-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[75%]" />
                  </div>
                ) : improvedDescription ? (
                  <Textarea readOnly value={improvedDescription} rows={5} className="bg-background" />
                ) : (
                  <div className="flex h-full min-h-[100px] items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-sm text-muted-foreground">Click generate to see a suggestion.</p>
                  </div>
                )}
            </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleImproveDescription} disabled={isPending}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isPending ? 'Generating...' : 'Generate Suggestion'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
