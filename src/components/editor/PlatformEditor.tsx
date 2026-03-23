"use client";

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Trash2, 
  RefreshCcw, 
  FileImage,
  Layers,
  CheckCircle2,
  ChevronRight,
  Layout,
  Upload
} from 'lucide-react';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface PlatformPreset {
  name: string;
  width: number;
  height: number;
  unit: 'px' | 'cm' | 'mm' | 'inch';
  ratio: string;
}

interface PlatformEditorProps {
  platformName: string;
  presets: PlatformPreset[];
  slug: string;
}

export function PlatformEditor({ platformName, presets, slug }: PlatformEditorProps) {
  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    processAll, 
    downloadAll, 
    isProcessingAll 
  } = useImageProcessor();

  const [selectedPreset, setSelectedPreset] = useState<PlatformPreset>(presets[0]);

  useEffect(() => {
    setSelectedPreset(presets[0]);
  }, [presets]);

  const handleProcess = () => {
    processAll({
      width: selectedPreset.width,
      height: selectedPreset.height,
      unit: selectedPreset.unit,
      maintainAspectRatio: true,
      dpi: 72,
      format: 'image/jpeg',
      quality: 0.9
    });
  };

  const isDone = images.length > 0 && images.every(img => img.status === 'done');

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="container max-w-7xl px-4 py-4 flex items-center gap-2 text-xs md:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3 flex-shrink-0" />
        <span className="text-foreground">Resize Image for {platformName}</span>
      </div>

      <div className="container max-w-7xl px-4 py-8 md:py-16 text-center space-y-6">
        <h1 className="text-3xl md:text-7xl font-bold tracking-tight text-[#111827]">
          Resize Image for {platformName}
        </h1>
        <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          Resize your photos for {platformName} instantly — bulk upload up to 12 images 
          and download pixel-perfect results.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-4">
          <span className="text-xs md:text-sm font-bold text-gray-400 self-center uppercase tracking-wider mr-2">Discover more</span>
          {['Photo editing', 'Image cropping', 'PNG converter', 'Image compression'].map(tag => (
            <Link key={tag} href="#" className="flex items-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2.5 bg-white border border-gray-200 rounded-full text-blue-600 text-xs md:text-sm font-semibold hover:shadow-md transition-all">
              <RefreshCcw className="w-3 h-3 md:w-3.5 md:h-3.5" /> {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="container max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dropzone */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border-2 border-dashed border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="flex flex-col items-center justify-center py-8 md:py-12 space-y-6 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm md:text-base font-medium">Select images ({images.length}/12)</p>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Drag & drop images here</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                  {['JPG', 'JPEG', 'PNG', 'WEBP'].map(ext => (
                    <span key={ext} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold rounded-full">{ext}</span>
                  ))}
                </div>
                <Button 
                  onClick={() => (document.getElementById('platform-file-input') as any)?.click()}
                  className="bg-blue-600 hover:bg-blue-700 h-12 md:h-14 px-6 md:px-10 rounded-xl md:rounded-2xl text-base md:text-lg font-bold shadow-lg shadow-blue-200 w-full md:w-auto"
                >
                  <Layout className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  Select image
                </Button>
                <input 
                  id="platform-file-input"
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))} 
                />
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {images.map(img => (
                  <Card key={img.id} className="rounded-2xl md:rounded-3xl overflow-hidden group relative border-none shadow-sm">
                    <div className="aspect-square relative bg-gray-100">
                      <img src={img.previewUrl} className="w-full h-full object-cover" alt="Preview" />
                      {img.status === 'done' && (
                        <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 bg-white rounded-full" />
                        </div>
                      )}
                      <Button 
                        variant="destructive" size="icon" 
                        className="absolute top-2 right-2 opacity-100 lg:opacity-0 group-hover:opacity-100 rounded-full w-7 h-7 md:w-9 md:h-9"
                        onClick={() => removeImage(img.id)}
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-400 text-sm font-medium">Sample images:</p>
              <div className="flex gap-3">
                <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-200 rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer border-2 border-white">
                  <img src="/sample1.png" className="w-full h-full object-cover" alt="Sample 1" />
                </div>
                <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-200 rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer border-2 border-white">
                  <img src="/sample1.png" className="w-full h-full object-cover" alt="Sample 2" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Templates */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-none shadow-xl bg-white p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">{platformName} templates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
                {presets.map(p => (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPreset(p)}
                    className={cn(
                      "text-left p-4 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-300",
                      selectedPreset.name === p.name 
                        ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100" 
                        : "bg-white border-gray-100 text-gray-900 hover:border-blue-200"
                    )}
                  >
                    <p className="font-bold text-base md:text-lg mb-0.5 md:mb-1">{p.name}</p>
                    <p className={cn("text-xs md:text-sm font-medium", selectedPreset.name === p.name ? "text-blue-100" : "text-gray-500")}>
                      {p.width} x {p.height} Px
                    </p>
                    <p className={cn("text-[10px] md:text-xs font-bold mt-2", selectedPreset.name === p.name ? "text-blue-200" : "text-gray-400 uppercase tracking-tighter")}>
                      Ratio: {p.ratio}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                <Button 
                  onClick={handleProcess}
                  disabled={images.length === 0 || isProcessingAll}
                  className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.25rem] bg-blue-600 hover:bg-blue-700 text-base md:text-lg font-bold shadow-lg shadow-blue-100"
                >
                  {isProcessingAll ? <RefreshCcw className="animate-spin mr-2 w-4 h-4 md:w-5 md:h-5" /> : null}
                  Process All Images
                </Button>
                {isDone && (
                  <Button variant="outline" onClick={downloadAll} className="w-full h-14 md:h-16 rounded-xl md:rounded-[1.25rem] border-2 font-bold text-base md:text-lg">
                    <Download className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Download Zip
                  </Button>
                )}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
