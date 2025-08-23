
import { postsData } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
      <article className="prose prose-lg mx-auto dark:prose-invert">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl font-bold sm:text-5xl">{post.title}</h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
                 <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span>{post.author}</span>
                </div>
            </div>
        </div>
        
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-lg shadow-xl">
            <Image 
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint="tech blog"
            />
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
