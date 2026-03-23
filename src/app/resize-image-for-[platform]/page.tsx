"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

interface PlatformPreset {
  name: string;
  width: number;
  height: number;
  unit: 'px' | 'cm' | 'mm' | 'inch';
  ratio: string;
}

const PLATFORM_CONFIGS: Record<string, { title: string; presets: PlatformPreset[] }> = {
  'instagram': {
    title: 'Instagram',
    presets: [
      { name: "Profile picture", width: 1080, height: 1080, unit: 'px', ratio: "1:1" },
      { name: "Post - square", width: 1080, height: 1080, unit: 'px', ratio: "1:1" },
      { name: "Post - portrait", width: 1080, height: 1350, unit: 'px', ratio: "4:5" },
      { name: "Post - landscape", width: 1080, height: 566, unit: 'px', ratio: "1.91:1" },
      { name: "Story", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
      { name: "Reels", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
      { name: "Reels cover", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
    ]
  },
  'facebook': {
    title: 'Facebook',
    presets: [
      { name: "Profile Picture", width: 320, height: 320, unit: 'px', ratio: "1:1" },
      { name: "Cover Photo", width: 851, height: 315, unit: 'px', ratio: "2.7:1" },
      { name: "Story", width: 1080, height: 1920, unit: 'px', ratio: "9:16" },
      { name: "Event Cover", width: 1920, height: 1005, unit: 'px', ratio: "1.91:1" },
      { name: "Feed Post", width: 1200, height: 630, unit: 'px', ratio: "1.91:1" },
    ]
  },
  'youtube': {
    title: 'YouTube',
    presets: [
      { name: "Thumbnail", width: 1280, height: 720, unit: 'px', ratio: "16:9" },
      { name: "Banner", width: 2560, height: 1440, unit: 'px', ratio: "16:9" },
      { name: "Profile", width: 800, height: 800, unit: 'px', ratio: "1:1" },
    ]
  }
};

export default function PlatformResizePage() {
  const params = useParams();
  const platform = (params.platform as string) || 'instagram';
  const config = PLATFORM_CONFIGS[platform.toLowerCase()] || PLATFORM_CONFIGS['instagram'];
  
  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    processAll, 
    downloadAll, 
    isProcessingAll 
  } = useImageProcessor();

  const [selectedPreset, setSelectedPreset] = useState<PlatformPreset>(config.presets[0]);

  useEffect(() => {
    setSelectedPreset(config.presets[0]);
  }, [config]);

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
      <div className="container max-w-7xl py-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground capitalize">Resize Image for {config.title}</span>
      </div>

      <div className="container max-w-7xl py-8 md:py-16 text-center space-y-6">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-[#111827]">
          Resize Image for {config.title}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Resize your photos for {config.title} instantly — bulk upload up to 12 images, 
          pick any format, and download pixel-perfect results. Free, 100% private, no login required.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <span className="text-sm font-bold text-gray-400 self-center uppercase tracking-wider mr-2">Discover more</span>
          {['Photo editing tutorial', 'Image cropping tool', 'PNG file converter', 'Computer memory RAM upgrade', 'Photo rotation service', 'Image compression tool'].map(tag => (
            <Link key={tag} href="#" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-blue-600 text-sm font-semibold hover:shadow-md transition-all">
              <RefreshCcw className="w-3.5 h-3.5" /> {tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="container max-w-7xl pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dropzone */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-dashed border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-gray-500 font-medium">Please select a image to get started (0/12)</p>
                  <h3 className="text-2xl font-bold text-gray-900">Or drag & drop images in this page</h3>
                </div>
                <div className="flex gap-2">
                  {['JPG', 'JPEG', 'PNG', 'WEBP'].map(ext => (
                    <span key={ext} className="px-4 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{ext}</span>
                  ))}
                </div>
                <Button 
                  onClick={() => (document.querySelector('input[type="file"]') as any)?.click()}
                  className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-2xl text-lg font-bold shadow-lg shadow-blue-200"
                >
                  <Layout className="w-5 h-5 mr-3" />
                  Select image
                </Button>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))} 
                />
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map(img => (
                  <Card key={img.id} className="rounded-3xl overflow-hidden group relative border-none shadow-sm">
                    <div className="aspect-square relative bg-gray-100">
                      <img src={img.previewUrl} className="w-full h-full object-cover" />
                      {img.status === 'done' && (
                        <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500 bg-white rounded-full" />
                        </div>
                      )}
                      <Button 
                        variant="destructive" size="icon" 
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 rounded-full"
                        onClick={() => removeImage(img.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              <p className="text-gray-400 font-medium">Or try with sample images:</p>
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 h-24 bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer border-2 border-white">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-xs text-gray-400 pt-4">100% Free & no login required. Your images never leave your device.</p>
            </div>
          </div>

          {/* Right: Templates */}
          <div className="lg:col-span-5">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{config.title} templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {config.presets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedPreset(preset)}
                    className={cn(
                      "text-left p-5 rounded-2xl border-2 transition-all duration-300",
                      selectedPreset.name === preset.name 
                        ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100" 
                        : "bg-white border-gray-100 text-gray-900 hover:border-blue-200"
                    )}
                  >
                    <p className="font-bold text-lg mb-1">{preset.name}</p>
                    <p className={cn("text-sm font-medium", selectedPreset.name === preset.name ? "text-blue-100" : "text-gray-500")}>
                      {preset.width} x {preset.height} Px
                    </p>
                    <p className={cn("text-xs font-bold mt-2", selectedPreset.name === preset.name ? "text-blue-200" : "text-gray-400 uppercase tracking-tighter")}>
                      Ratio: {preset.ratio}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <Button 
                  onClick={handleProcess}
                  disabled={images.length === 0 || isProcessingAll}
                  className="w-full h-16 rounded-[1.25rem] bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg shadow-blue-100"
                >
                  {isProcessingAll ? <RefreshCcw className="animate-spin mr-2" /> : null}
                  Process All Images
                </Button>
                {isDone && (
                  <Button variant="outline" onClick={downloadAll} className="w-full h-16 rounded-[1.25rem] border-2 font-bold text-lg">
                    <Download className="mr-2" /> Download Zip
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
