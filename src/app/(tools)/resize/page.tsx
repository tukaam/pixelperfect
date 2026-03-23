"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  MoveDiagonal, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCcw, 
  FileImage,
  Layers,
  CheckCircle2,
  AlertCircle,
  Layout,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Unit, ResizeOptions } from '@/lib/canvas-utils';
import { cn } from '@/lib/utils';
import { TemplateSelector } from '@/components/shared/TemplateSelector';
import Link from 'next/link';

function ResizePageContent() {
  const searchParams = useSearchParams();
  const preset = searchParams.get('preset');
  
  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    processAll, 
    downloadAll, 
    isProcessingAll 
  } = useImageProcessor();

  const [options, setOptions] = useState<ResizeOptions>({
    width: undefined,
    height: undefined,
    unit: 'px',
    dpi: 300,
    maintainAspectRatio: true,
    format: 'image/jpeg',
    quality: 0.9,
  });

  // Apply presets if available
  useEffect(() => {
    if (!preset) return;

    const presets: Record<string, { w?: number; h?: number; u: Unit }> = {
      '600x600': { w: 600, h: 600, u: 'px' },
      '1080x1080': { w: 1080, h: 1080, u: 'px' },
      '1080x1920': { w: 1080, h: 1920, u: 'px' },
      '1200x630': { w: 1200, h: 630, u: 'px' },
      '1280x720': { w: 1280, h: 720, u: 'px' },
      '500x500': { w: 500, h: 500, u: 'px' },
      '1584x396': { w: 1584, h: 396, u: 'px' },
      'A4': { w: 8.27, h: 11.69, u: 'inch' },
      'Letter': { w: 8.5, h: 11, u: 'inch' },
    };

    const config = presets[preset];
    if (config) {
      setOptions(prev => ({ 
        ...prev, 
        width: config.w, 
        height: config.h, 
        unit: config.u 
      }));
    }
  }, [preset]);

  const handleProcess = () => {
    processAll(options);
  };

  const isDone = images.length > 0 && images.every(img => img.status === 'done');

  return (
    <div className="bg-background min-h-screen">
      <div className="container max-w-7xl py-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Resize Image</span>
      </div>

      <div className="container max-w-7xl py-8 md:py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Free Image Resizer</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Resize photos with any unit (px, inch, cm, mm) — free, instant, 
            and 100% private. Your images never leave your device.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <span className="text-sm font-medium mr-2 self-center">Discover more</span>
            <Link href="/increase-size" className="flex items-center gap-1.5 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-primary text-sm hover:bg-primary/10 transition-colors">
              <RefreshCcw className="w-3.5 h-3.5" /> Computer memory RAM upgrade
            </Link>
            <Link href="/reduce-size" className="flex items-center gap-1.5 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-primary text-sm hover:bg-primary/10 transition-colors">
              <RefreshCcw className="w-3.5 h-3.5" /> Digital photography course
            </Link>
            <Link href="/rotate" className="flex items-center gap-1.5 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full text-primary text-sm hover:bg-primary/10 transition-colors">
              <RefreshCcw className="w-3.5 h-3.5" /> Social media marketing courses
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Dropzone & Uploaded Images */}
          <div className="space-y-8">
            <div className={cn(images.length > 0 ? "hidden" : "block")}>
              <Dropzone onFilesAdded={addFiles} className="min-h-[400px] bg-white border-muted-foreground/10 shadow-sm" />
            </div>

            {images.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="font-bold flex items-center gap-2 text-xl">
                    <Layers className="w-5 h-5 text-primary" />
                    Uploaded Photos ({images.length}/12)
                  </h2>
                  <Button variant="outline" size="sm" className="rounded-xl" onClick={() => (document.getElementById('add-more') as HTMLInputElement)?.click()}>
                    Add More
                    <input 
                      id="add-more" 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
                    />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {images.map((img) => (
                    <Card key={img.id} className="group relative border-muted/40 overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                      <div className="aspect-video relative bg-muted flex items-center justify-center overflow-hidden">
                        <img 
                          src={img.previewUrl} 
                          alt={img.originalFile.name} 
                          className="object-contain w-full h-full p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {img.status === 'processing' && (
                          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                            <RefreshCcw className="w-10 h-10 text-primary animate-spin" />
                          </div>
                        )}
                        {img.status === 'done' && (
                          <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-green-500 bg-white rounded-full shadow-lg" />
                          </div>
                        )}

                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            size="icon" 
                            variant="destructive" 
                            className="w-8 h-8 rounded-full shadow-lg"
                            onClick={() => removeImage(img.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4 bg-card">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <FileImage className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate leading-none">{img.originalFile.name}</p>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              {(img.originalFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center text-sm text-muted-foreground py-4">
              100% Free & no login required. Your images never leave your device.
            </div>
          </div>

          {/* Right Column: Output Requirements */}
          <div className="lg:sticky lg:top-24">
            <Card className="rounded-[2rem] border-none shadow-2xl bg-white overflow-hidden">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-bold">Output image requirements</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                {/* Unit Tabs */}
                <Tabs 
                  value={options.unit} 
                  onValueChange={(v) => setOptions(prev => ({ ...prev, unit: v as Unit }))}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full h-14 bg-muted/30 p-1.5 rounded-2xl">
                    <TabsTrigger value="px" className="rounded-xl text-xs font-bold uppercase data-[state=active]:bg-emerald-400 data-[state=active]:text-white">PX</TabsTrigger>
                    <TabsTrigger value="inch" className="rounded-xl text-xs font-bold uppercase">INCH</TabsTrigger>
                    <TabsTrigger value="cm" className="rounded-xl text-xs font-bold uppercase">CM</TabsTrigger>
                    <TabsTrigger value="mm" className="rounded-xl text-xs font-bold uppercase">MM</TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Dimensions Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <div className="flex justify-between items-end mb-1">
                      <Label className="text-xs font-bold text-muted-foreground uppercase px-1">Width</Label>
                    </div>
                    <div className="relative">
                      <Input 
                        id="width"
                        type="number"
                        placeholder="Input width"
                        value={options.width || ''}
                        onChange={(e) => setOptions(prev => ({ ...prev, width: Number(e.target.value) || undefined }))}
                        className="rounded-2xl h-16 bg-muted/20 border-none px-6 text-lg font-bold focus-visible:ring-2 focus-visible:ring-primary/20"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 font-bold uppercase text-sm">{options.unit}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-end mb-1">
                      <Label className="text-xs font-bold text-muted-foreground uppercase px-1">Height</Label>
                    </div>
                    <div className="relative">
                      <Input 
                        id="height"
                        type="number"
                        placeholder="Input height"
                        value={options.height || ''}
                        onChange={(e) => setOptions(prev => ({ ...prev, height: Number(e.target.value) || undefined }))}
                        className="rounded-2xl h-16 bg-muted/20 border-none px-6 text-lg font-bold focus-visible:ring-2 focus-visible:ring-primary/20"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-primary/40 font-bold uppercase text-sm">{options.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Template Selector */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-muted-foreground">Resize Template</Label>
                  <TemplateSelector 
                    onSelect={(w, h, u) => setOptions(prev => ({ ...prev, width: w, height: h, unit: u }))}
                    trigger={
                      <Button variant="outline" className="w-full justify-between h-16 rounded-2xl border-muted/30 px-6 hover:bg-muted/10">
                        <span className="text-base font-medium">Custom</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </Button>
                    }
                  />
                </div>

                <Button 
                  className="w-full h-16 rounded-2xl font-bold text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                  onClick={handleProcess}
                  disabled={isProcessingAll || images.length === 0}
                >
                  {isProcessingAll ? (
                    <>
                      <RefreshCcw className="w-6 h-6 mr-3 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Apply Resize
                    </>
                  )}
                </Button>

                {isDone && (
                  <Button 
                    variant="outline" 
                    className="w-full h-16 rounded-2xl font-bold text-lg border-2"
                    onClick={downloadAll}
                  >
                    <Download className="w-6 h-6 mr-3" />
                    Download All
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResizePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCcw className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <ResizePageContent />
    </Suspense>
  );
}
