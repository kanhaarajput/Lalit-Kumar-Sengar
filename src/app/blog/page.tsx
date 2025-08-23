
import { PostCard } from '@/components/PostCard';
import { postsData, type Post } from '@/lib/data';
import { AnimatedDiv } from '@/components/AnimatedDiv';

export default function BlogPage() {
  return (
    <div className="bg-muted/30 dark:bg-card">
      <div className="container mx-auto py-12 md:py-24">
        <AnimatedDiv>
          <div className="text-center">
              <h1 className="mb-4 font-headline text-4xl font-bold sm:text-5xl">My Blog</h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                Sharing my thoughts on web development, technology, and more.
              </p>
          </div>
        </AnimatedDiv>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {postsData.map((post: Post, index: number) => (
              <AnimatedDiv key={post.slug} delay={0.1 * (index + 1)}>
                <PostCard post={post} />
              </AnimatedDiv>
            ))}
        </div>
      </div>
    </div>
  );
}
