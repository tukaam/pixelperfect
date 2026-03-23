"use client";

import React, { useState } from 'react';
import { 
  FileCheck, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCcw, 
  Layers,
  CheckCircle2,
  FileImage,
  ArrowRight
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

export default function FormatConverterPage() {
  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    processAll, 
    downloadAll, 
    isProcessingAll 
  } = useImageProcessor();

  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/png');

  const handleProcess = () => {
    processAll({
      unit: 'px',
      dpi: 72,
      maintainAspectRatio: true,
      format,
      quality: 0.95
    });
  };

  const isDone = images.length > 0 && images.every(img => img.status === 'done');

  return (
    <div className="container py-12 px-4 max-w-7xl">
      <div className="flex flex-col items-center mb-10 text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-200">
          <FileCheck className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Convert Image Format</h1>
        <p className="text-muted-foreground max-w-2xl">
          Instantly convert your images between JPG, PNG, and WEBP formats while maintaining transparency and quality.
        </p>
      </div>

      {images.length === 0 ? (
        <Dropzone onFilesAdded={addFiles} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <Card className="border-yellow-600/20 shadow-xl shadow-yellow-600/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-yellow-600/5 border-b border-yellow-600/10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings2 className="w-5 h-5 text-yellow-600" />
                  Conversion Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <Label>Target Format</Label>
                  <Select 
                    value={format} 
                    onValueChange={(v: any) => setFormat(v)}
                  >
                    <SelectTrigger className="rounded-xl h-11">
                      <SelectValue placeholder="Select Target Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/jpeg">JPEG (Best for photos)</SelectItem>
                      <SelectItem value="image/png">PNG (Best for icons/logos)</SelectItem>
                      <SelectItem value="image/webp">WEBP (Best for web)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-6 bg-muted/20 border-t border-muted/50">
                <Button 
                  className="w-full h-12 rounded-xl font-bold text-base bg-yellow-600 hover:bg-yellow-700 shadow-lg shadow-yellow-600/20 text-black"
                  onClick={handleProcess}
                  disabled={isProcessingAll || images.length === 0}
                >
                  {isProcessingAll ? (
                    <>
                      <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-5 h-5 mr-2" />
                      Convert Images
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
                <Card key={img.id} className="group relative border-muted/40 overflow-hidden rounded-2xl transition-all duration-300">
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
                    <div className="flex items-center justify-between">
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate leading-none">{img.originalFile.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded uppercase">
                            {img.originalFile.type.split('/')[1]}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded font-bold uppercase">
                            {format.split('/')[1]}
                          </span>
                        </div>
                      </div>
                      {img.processedUrl && (
                        <Button size="icon" variant="ghost" className="rounded-full" asChild>
                          <a href={img.processedUrl} download={`converted-${img.originalFile.name.split('.')[0]}.${format.split('/')[1]}`}>
                            <Download className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
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
