"use client";

import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  X, 
  Monitor, 
  Smartphone, 
  Square, 
  Layout, 
  Image as ImageIcon,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  FileImage,
  UserCircle,
  Scissors
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Template {
  name: string;
  category: string;
  width: number;
  height: number;
  unit: 'px' | 'inch' | 'cm' | 'mm';
  icon?: any;
}

const templates: Template[] = [
  // Facebook
  { name: "Facebook Profile Picture", category: "Facebook", width: 320, height: 320, unit: 'px' },
  { name: "Facebook Cover Photo", category: "Facebook", width: 851, height: 315, unit: 'px' },
  { name: "Facebook Story", category: "Facebook", width: 1080, height: 1920, unit: 'px' },
  { name: "Facebook Feed Post", category: "Facebook", width: 1200, height: 630, unit: 'px' },
  // Instagram
  { name: "Instagram Post", category: "Instagram", width: 1080, height: 1080, unit: 'px' },
  { name: "Instagram Story", category: "Instagram", width: 1080, height: 1920, unit: 'px' },
  { name: "Instagram Portrait", category: "Instagram", width: 1080, height: 1350, unit: 'px' },
  // YouTube
  { name: "YouTube Thumbnail", category: "YouTube", width: 1280, height: 720, unit: 'px' },
  { name: "YouTube Banner", category: "YouTube", width: 2560, height: 1440, unit: 'px' },
  { name: "YouTube Profile", category: "YouTube", width: 800, height: 800, unit: 'px' },
  // LinkedIn
  { name: "LinkedIn Profile Photo", category: "LinkedIn", width: 400, height: 400, unit: 'px' },
  { name: "LinkedIn Cover Photo", category: "LinkedIn", width: 1584, height: 396, unit: 'px' },
  { name: "LinkedIn Post Image", category: "LinkedIn", width: 1200, height: 627, unit: 'px' },
  // X (Twitter)
  { name: "X (Twitter) Profile Photo", category: "X (Twitter)", width: 400, height: 400, unit: 'px' },
  { name: "X (Twitter) Header", category: "X (Twitter)", width: 1500, height: 500, unit: 'px' },
  { name: "X (Twitter) Post", category: "X (Twitter)", width: 1600, height: 900, unit: 'px' },
  // Paper
  { name: "A4 Size", category: "Paper Sizes", width: 8.27, height: 11.69, unit: 'inch' },
  { name: "Letter (US)", category: "Paper Sizes", width: 8.5, height: 11, unit: 'inch' },
  // Passport
  { name: "US Passport", category: "Passport & Visa", width: 2, height: 2, unit: 'inch' },
  { name: "India Passport", category: "Passport & Visa", width: 3.5, height: 4.5, unit: 'cm' },
  { name: "Schengen Visa", category: "Passport & Visa", width: 35, height: 45, unit: 'mm' },
];

const categories = ["All Categories", "Custom", "Facebook", "Instagram", "YouTube", "LinkedIn", "X (Twitter)", "Paper Sizes", "Passport & Visa"];

interface TemplateSelectorProps {
  onSelect: (width: number, height: number, unit: any) => void;
  trigger?: React.ReactNode;
}

export function TemplateSelector({ onSelect, trigger }: TemplateSelectorProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All Categories" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Group filtered by category for display
  const grouped = filteredTemplates.reduce((acc, curr) => {
    if (!acc[curr.category]) acc[curr.category] = [];
    acc[curr.category].push(curr);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Select Template</Button>}
      </DialogTrigger>
      <DialogContent className="!w-[90vw] h-[90vh] lg:!w-[80vw] lg:h-[85vh] !max-w-none flex flex-col p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
        <div className="p-6 border-b bg-background/95 backdrop-blur-md sticky top-0 z-10">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">Select Template</DialogTitle>
            <DialogDescription>Choose a predefined size for your social media, documents, or print projects.</DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search templates (e.g. 'instagram', 'passport')..." 
                className="pl-10 h-12 bg-muted/30 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="overflow-x-auto scrollbar-hide -mx-2 px-2 pb-1">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full whitespace-nowrap h-9 px-5 transition-all duration-200",
                      activeCategory === cat ? "shadow-lg shadow-primary/20 scale-105" : "hover:bg-muted"
                    )}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
          <div className="grid gap-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider pl-1">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {items.map(template => (
                    <button
                      key={template.name}
                      onClick={() => {
                        onSelect(template.width, template.height, template.unit);
                        setIsOpen(false);
                      }}
                      className="group relative flex flex-col items-start p-4 rounded-2xl bg-background border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 text-left overflow-hidden"
                    >
                      <div className="w-full aspect-[4/3] bg-muted/30 rounded-xl mb-4 flex items-center justify-center p-4 relative overflow-hidden">
                        {/* Visual representation of aspect ratio */}
                        <div 
                          className="bg-background border-2 border-primary/20 rounded shadow-sm transition-all group-hover:border-primary/40 group-hover:scale-105"
                          style={{
                            width: template.width > template.height ? '100%' : `${(template.width / template.height) * 100}%`,
                            height: template.height > template.width ? '100%' : `${(template.height / template.width) * 100}%`,
                            maxHeight: '100%',
                            maxWidth: '100%'
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          {template.width}×{template.height} {template.unit}
                        </div>
                      </div>
                      <div className="space-y-1 w-full">
                        <p className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{template.name}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium">
                          {template.width} × {template.height} {template.unit}
                        </p>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredTemplates.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <div>
                  <p className="text-lg font-bold">No templates found</p>
                  <p className="text-muted-foreground">Try searching for something else or browse categories.</p>
                </div>
                <Button variant="outline" onClick={() => {setSearch(""); setActiveCategory("All Categories");}}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
