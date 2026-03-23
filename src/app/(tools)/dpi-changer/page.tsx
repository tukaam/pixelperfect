"use client";

import React, { useState } from 'react';
import { 
  Printer, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCcw, 
  Layers,
  CheckCircle2,
  FileImage,
  Info
} from 'lucide-react';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default function DPIChangerPage() {
  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    processAll, 
    downloadAll, 
    isProcessingAll 
  } = useImageProcessor();

  const [dpi, setDpi] = useState(300);

  const handleProcess = () => {
    processAll({
      unit: 'px',
      dpi,
      maintainAspectRatio: true,
      format: 'image/jpeg',
      quality: 0.95
    });
  };

  const isDone = images.length > 0 && images.every(img => img.status === 'done');

  return (
    <div className="container py-12 px-4 max-w-7xl">
      <div className="flex flex-col items-center mb-10 text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-200">
          <Printer className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Change Image DPI</h1>
        <p className="text-muted-foreground max-w-2xl">
          Adjust the Dots Per Inch (DPI) of your images for high-quality printing. Standard is 300 DPI for professional prints.
        </p>
      </div>

      {images.length === 0 ? (
        <Dropzone onFilesAdded={addFiles} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <Card className="border-cyan-600/20 shadow-xl shadow-cyan-600/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-cyan-600/5 border-b border-cyan-600/10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings2 className="w-5 h-5 text-cyan-600" />
                  DPI Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label>Target DPI</Label>
                  <Select 
                    value={dpi.toString()} 
                    onValueChange={(v) => setDpi(Number(v))}
                  >
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select Target DPI" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="72">72 DPI (Standard Web)</SelectItem>
                      <SelectItem value="96">96 DPI (High-Res Web)</SelectItem>
                      <SelectItem value="150">150 DPI (Draft Print)</SelectItem>
                      <SelectItem value="300">300 DPI (High Quality Print)</SelectItem>
                      <SelectItem value="600">600 DPI (Ultra High Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-700 leading-relaxed">
                    Higher DPI means better print quality. However, it does not increase the actual detail in a low-resolution photo.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-6 bg-muted/20 border-t border-muted/50">
                <Button 
                  className="w-full h-12 rounded-xl font-bold text-base bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-600/20"
                  onClick={handleProcess}
                  disabled={isProcessingAll || images.length === 0}
                >
                  {isProcessingAll ? (
                    <>
                      <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                      Adjusting...
                    </>
                  ) : (
                    <>
                      <Printer className="w-5 h-5 mr-2" />
                      Adjust DPI
                    </>
                  )}
                </Button>
                {isDone && (
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl font-bold border-2"
                    onClick={downloadAll}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download All
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-destructive"
                  onClick={clearImages}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-bold flex items-center gap-2 text-lg px-2">
              <Layers className="w-5 h-5 text-muted-foreground" />
              Uploads ({images.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img) => (
                <Card key={img.id} className="group relative border-muted/40 overflow-hidden rounded-2xl transition-all duration-300 hover:border-cyan-600/30">
                  <div className="aspect-video relative bg-muted flex items-center justify-center overflow-hidden">
                    <img 
                      src={img.previewUrl} 
                      alt={img.originalFile.name} 
                      className="object-contain w-full h-full p-2"
                    />
                    
                    {img.status === 'done' && (
                      <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm font-bold truncate leading-none">{img.originalFile.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      Target: {dpi} DPI
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
