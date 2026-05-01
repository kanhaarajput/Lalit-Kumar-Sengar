import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Rocket, X } from 'lucide-react';
import { FloatingCard } from './FloatingCard';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import type { AchievementItem } from '@/lib/portfolio-service';

export function AchievementPublicCard({ item }: { item: AchievementItem }) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (showModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  return (
    <>
      <FloatingCard intensity={0.05} className="h-full cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="h-full flex flex-col bg-card border border-border/30 rounded-2xl overflow-hidden shadow-xl shadow-primary/5 hover:border-primary/50 transition-colors">
          {item.image && (
            <div className="relative h-48 w-full">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2 gap-4">
              <h3 className="font-bold text-xl leading-tight">{item.title}</h3>
            </div>
            {item.date && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-md bg-primary/10 text-primary text-xs font-medium w-fit">
                <Rocket className="w-3 h-3" /> {item.date}
              </div>
            )}
            <p className="text-muted-foreground text-sm flex-1">{item.description}</p>
            {item.details && (
              <button 
                className="mt-4 text-left text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              >
                View Details &rarr;
              </button>
            )}
          </div>
        </div>
      </FloatingCard>

      {mounted && showModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
              <div>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                {item.date && <p className="text-muted-foreground text-sm mt-1">{item.date}</p>}
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
              {item.image && (
                <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden mb-6 border border-border/30">
                  <Image src={item.image} alt={item.title} fill className="object-contain bg-black/5" />
                </div>
              )}
              
              <div className="prose dark:prose-invert prose-sm max-w-none text-muted-foreground">
                <ReactMarkdown>{item.details || item.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
