"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Shrink, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCcw, 
  FileImage,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileDown,
  ChevronRight,
  Upload,
  Info,
  Zap,
  MousePointer2,
  Crop,
  BookOpen,
  Image as ImageIcon,
  Layout,
  FileSearch,
  Check,
  BadgeCheck,
  UserCircle
} from 'lucide-react';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ResizeOptions, loadImage, processImage } from '@/lib/canvas-utils';
import { cn } from '@/lib/utils';

function ReduceSizeContent() {
  const searchParams = useSearchParams();
  const targetParam = searchParams.get('target');
  const wParam = searchParams.get('w');
  const hParam = searchParams.get('h');

  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    isProcessingAll,
    downloadAll,
  } = useImageProcessor();

  const [targetSize, setTargetSize] = useState<number>(10);
  const [targetUnit, setTargetUnit] = useState<'KB' | 'MB'>('KB');
  const [format, setFormat] = useState<string>('image/jpeg');

  useEffect(() => {
    if (targetParam) {
      const match = targetParam.match(/(\d+)(kb|mb)/i);
      if (match) {
        setTargetSize(parseInt(match[1]));
        setTargetUnit(match[2].toUpperCase() as any);
      }
    }
  }, [targetParam]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<any[]>([]);

  const handleReduce = async () => {
    setIsProcessing(true);
    const targetBytes = targetUnit === 'KB' ? targetSize * 1024 : targetSize * 1024 * 1024;
    
    const results = await Promise.all(images.map(async (img) => {
      try {
        const htmlImg = await loadImage(img.previewUrl);
        
        let quality = 0.9;
        let blob = await processImage(htmlImg, {
          unit: 'px',
          maintainAspectRatio: true,
          format: format as any,
          quality: quality,
          width: wParam ? parseInt(wParam) : undefined,
          height: hParam ? parseInt(hParam) : undefined,
        });

        if (blob.size > targetBytes) {
          for (let i = 0; i < 8; i++) {
            quality -= 0.1;
            if (quality < 0.05) break;
            const newBlob = await processImage(htmlImg, {
              unit: 'px',
              maintainAspectRatio: true,
              format: format as any,
              quality: quality,
              width: wParam ? parseInt(wParam) : undefined,
              height: hParam ? parseInt(hParam) : undefined,
            });
            blob = newBlob;
            if (newBlob.size <= targetBytes) break;
          }
        }

        return {
          ...img,
          status: 'done' as const,
          processedBlob: blob,
          processedUrl: URL.createObjectURL(blob),
          newSize: blob.size
        };
      } catch (err) {
        return { ...img, status: 'error' as const, error: (err as Error).message };
      }
    }));

    setProcessedImages(results);
    setIsProcessing(false);
  };

  const activeImages = processedImages.length > 0 ? processedImages : images;
  const isDone = processedImages.length > 0 && processedImages.every(img => img.status === 'done');

  const pageTitle = targetParam 
    ? `Resize image to ${targetSize}${targetUnit.toLowerCase()} Online`
    : "Reduce Image Size Online";

  const discoverMore = [
    { label: "Cropping", icon: Crop, href: "/crop" },
    { label: "Photography", icon: BookOpen, href: "#" },
    { label: "Stock Photos", icon: ImageIcon, href: "#" },
    { label: "Editing", icon: Layout, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Breadcrumbs */}
      <nav className="container px-4 py-4 md:py-6 flex items-center text-xs md:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1 md:mx-1.5 opacity-50 shrink-0" />
        <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-1 md:mx-1.5 opacity-50 shrink-0" />
        <span className="text-slate-900 font-medium">Resize image to {targetSize}{targetUnit.toLowerCase()}</span>
      </nav>

      {/* Hero Section */}
      <section className="container px-4 pt-6 md:pt-8 pb-8 md:pb-12 text-center">
        <h1 className="text-3xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 md:mb-6 leading-tight">
          {pageTitle}
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 md:mb-10 font-medium">
          Compress or increase the size of dozens of photos to {targetSize}{targetUnit} — free 
          and instant.
        </p>

        {/* Discover More Tags */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          <span className="text-xs md:text-sm font-bold text-slate-400 self-center mr-1 md:mr-2">Discover more</span>
          {discoverMore.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href}
              className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-blue-100 text-blue-600 text-[10px] md:text-sm font-semibold hover:bg-blue-50 transition-colors shadow-sm"
            >
              <link.icon className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Tool Main Area */}
      <main className="container px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dropzone Area */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className={cn(
              "relative bg-white border-2 border-dashed border-slate-200 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 transition-all min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center text-center",
              images.length > 0 ? "border-solid border-slate-100 shadow-sm" : "hover:border-primary/50 hover:bg-primary/[0.02]"
            )}>
              {images.length === 0 ? (
                <>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-slate-50 flex items-center justify-center mb-4 md:mb-6">
                    <Upload className="w-8 h-8 md:w-10 md:h-10 text-primary/40" />
                  </div>
                  <p className="text-slate-400 text-sm md:text-base font-semibold mb-2">Select images ({images.length}/12)</p>
                  <h3 className="text-slate-900 text-lg md:text-xl font-bold mb-6 md:mb-8 leading-tight">Drag & drop images here</h3>
                  
                  <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-6 md:mb-8">
                    {['JPG', 'JPEG', 'PNG', 'WEBP'].map(ext => (
                      <span key={ext} className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-black rounded-full">
                        {ext}
                      </span>
                    ))}
                  </div>

                  <Dropzone onFilesAdded={addFiles} className="bg-transparent border-none p-0">
                    <Button size="lg" className="rounded-xl md:rounded-2xl px-8 md:px-10 h-12 md:h-14 bg-indigo-600 hover:bg-indigo-700 text-base md:text-lg font-bold shadow-xl shadow-indigo-600/20 w-full md:w-auto">
                      Select image
                    </Button>
                  </Dropzone>
                </>
              ) : (
                <div className="w-full space-y-4 md:space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {activeImages.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden border bg-slate-50 group">
                        <img src={img.previewUrl} alt="preview" className="w-full h-full object-contain p-2" />
                        <button 
                          onClick={() => removeImage(img.id)}
                          className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {img.status === 'done' && (
                          <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 bg-white rounded-full p-1" />
                          </div>
                        )}
                      </div>
                    ))}
                    {images.length < 12 && (
                       <Dropzone onFilesAdded={addFiles} className="h-full">
                        <div className="aspect-square rounded-xl md:rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                          <Upload className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
                          <span className="text-[10px] md:text-xs font-bold">Add more</span>
                        </div>
                       </Dropzone>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t px-1">
                    <p className="text-xs font-bold text-slate-500">{images.length}/12 images</p>
                    <Button variant="ghost" className="text-red-500 font-bold text-xs h-8 px-2" onClick={clearImages}>
                      Clear all
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sample Images Section */}
            {images.length === 0 && (
              <div className="mt-8 md:mt-12 text-center">
                <p className="text-slate-500 text-sm font-bold mb-4 md:mb-6">Sample images:</p>
                <div className="flex justify-center gap-3 md:gap-4">
                  <img src="/sample1.png" alt="Sample 1" className="w-16 h-20 md:w-24 md:h-32 rounded-xl md:rounded-2xl object-cover border-2 md:border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform" />
                  <img src="/sample2.png" alt="Sample 2" className="w-16 h-20 md:w-24 md:h-32 rounded-xl md:rounded-2xl object-cover border-2 md:border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform" />
                </div>
              </div>
            )}
          </div>

          {/* Right: Settings Area */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
              <CardHeader className="px-6 md:px-8 pt-6 md:pt-8 pb-4">
                <CardTitle className="text-xl md:text-2xl font-black text-slate-900">Output requirements</CardTitle>
              </CardHeader>
              <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-6 md:space-y-8">
                {/* Max File Size Section */}
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-1 bg-slate-50 rounded-[1.25rem] md:rounded-[1.5rem] border border-slate-100 gap-1">
                    <div className="relative flex-1">
                      <Label className="absolute left-4 top-3 text-[9px] md:text-[10px] font-black uppercase tracking-wider text-slate-400">Max File Size</Label>
                      <Input 
                        type="number"
                        value={targetSize}
                        onChange={(e) => setTargetSize(Number(e.target.value))}
                        className="h-14 md:h-16 pl-4 pt-6 bg-transparent border-none text-lg md:text-xl font-bold focus-visible:ring-0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-600 font-black text-xs md:text-sm">{targetUnit}</span>
                    </div>
                    <div className="flex p-1 bg-white rounded-xl md:rounded-2xl shadow-sm">
                      <button 
                        onClick={() => setTargetUnit('KB')}
                        className={cn(
                          "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all",
                          targetUnit === 'KB' ? "bg-emerald-300 text-emerald-900" : "text-slate-400"
                        )}
                      >
                        KB
                      </button>
                      <button 
                        onClick={() => setTargetUnit('MB')}
                        className={cn(
                          "flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-black transition-all",
                          targetUnit === 'MB' ? "bg-emerald-300 text-emerald-900" : "text-slate-400"
                        )}
                      >
                        MB
                      </button>
                    </div>
                  </div>
                </div>

                {/* Format Selector Section */}
                <div className="space-y-3">
                  <Label className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400 ml-4">Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="h-14 md:h-16 rounded-xl md:rounded-2xl border-slate-100 bg-slate-50 px-4 md:px-6 text-base md:text-lg font-bold">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100">
                      <SelectItem value="image/jpeg" className="font-bold">JPG</SelectItem>
                      <SelectItem value="image/png" className="font-bold">PNG</SelectItem>
                      <SelectItem value="image/webp" className="font-bold">WEBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Process Button */}
                <Button 
                  className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg md:text-xl shadow-xl shadow-indigo-600/20"
                  onClick={handleReduce}
                  disabled={isProcessing || images.length === 0}
                >
                  {isProcessing ? (
                    <RefreshCcw className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                  ) : (
                    "Compress Images"
                  )}
                </Button>

                {isDone && (
                  <Button 
                    variant="outline"
                    className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.5rem] border-2 border-indigo-600 text-indigo-600 font-black text-lg md:text-xl hover:bg-indigo-50"
                    onClick={() => processedImages.forEach(img => {
                      if (img.processedUrl) {
                        const link = document.createElement('a');
                        link.href = img.processedUrl;
                        link.download = `compressed-${img.originalFile.name}`;
                        link.click();
                      }
                    })}
                  >
                    <Download className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Download All
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Trust & Features Section */}
      <section className="py-16 md:py-24 bg-white border-t">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <Zap className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">Lightning Fast</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">Fast processing, instant results. No waiting in queue or long upload times.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <UserCircle className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">User Friendly</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">Simple and intuitive interface designed for both desktop and mobile users.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <BadgeCheck className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-slate-900">High Quality</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">Professional algorithms ensure your images stay sharp regardless of the target size.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ReduceSizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>}>
      <ReduceSizeContent />
    </Suspense>
  );
}
