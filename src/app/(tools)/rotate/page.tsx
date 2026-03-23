"use client";

import React, { useState } from 'react';
import { 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCcw, 
  Layers,
  CheckCircle2,
  FileImage
} from 'lucide-react';
import { Dropzone } from '@/components/shared/Dropzone';
import { useImageProcessor } from '@/hooks/useImageProcessor';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function RotatePage() {
  const { 
    images, 
    addFiles, 
    removeImage, 
    clearImages, 
    processAll, 
    downloadAll, 
    isProcessingAll 
  } = useImageProcessor();

  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const handleProcess = () => {
    processAll({
      unit: 'px',
      dpi: 72,
      maintainAspectRatio: true,
      format: 'image/jpeg',
      quality: 0.9,
      rotation,
      flipHorizontal: flipH,
      flipVertical: flipV
    });
  };

  const isDone = images.length > 0 && images.every(img => img.status === 'done');

  return (
    <div className="container py-12 px-4 max-w-7xl">
      <div className="flex flex-col items-center mb-10 text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-200">
          <RotateCw className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Rotate & Flip Image</h1>
        <p className="text-muted-foreground max-w-2xl">
          Quickly rotate your images by 90°, 180°, or 270°. Flip them horizontally or vertically with one click.
        </p>
      </div>

      {images.length === 0 ? (
        <Dropzone onFilesAdded={addFiles} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <Card className="border-purple-600/20 shadow-xl shadow-purple-600/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-purple-600/5 border-b border-purple-600/10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings2 className="w-5 h-5 text-purple-600" />
                  Orientation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-4">
                  <Label>Rotation</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={rotation === 90 ? "default" : "outline"} 
                      onClick={() => setRotation(90)}
                      className="rounded-xl flex flex-col h-20 gap-2"
                    >
                      <RotateCw className="w-5 h-5" />
                      90° CW
                    </Button>
                    <Button 
                      variant={rotation === 270 ? "default" : "outline"} 
                      onClick={() => setRotation(270)}
                      className="rounded-xl flex flex-col h-20 gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      90° CCW
                    </Button>
                    <Button 
                      variant={rotation === 180 ? "default" : "outline"} 
                      onClick={() => setRotation(180)}
                      className="rounded-xl flex flex-col h-20 gap-2"
                    >
                      <RefreshCcw className="w-5 h-5" />
                      180°
                    </Button>
                    <Button 
                      variant={rotation === 0 ? "default" : "outline"} 
                      onClick={() => setRotation(0)}
                      className="rounded-xl flex flex-col h-20 gap-2"
                    >
                      <RefreshCcw className="w-5 h-5" />
                      Reset
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Flip</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={flipH ? "default" : "outline"} 
                      onClick={() => setFlipH(!flipH)}
                      className="rounded-xl h-12"
                    >
                      <FlipHorizontal className="w-5 h-5 mr-2" />
                      Horizontal
                    </Button>
                    <Button 
                      variant={flipV ? "default" : "outline"} 
                      onClick={() => setFlipV(!flipV)}
                      className="rounded-xl h-12"
                    >
                      <FlipVertical className="w-5 h-5 mr-2" />
                      Vertical
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-6 bg-muted/20 border-t border-muted/50">
                <Button 
                  className="w-full h-12 rounded-xl font-bold text-base bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20"
                  onClick={handleProcess}
                  disabled={isProcessingAll || images.length === 0}
                >
                  {isProcessingAll ? (
                    <>
                      <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <RotateCw className="w-5 h-5 mr-2" />
                      Apply Changes
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
                      src={img.status === 'done' ? img.processedUrl : img.previewUrl} 
                      alt={img.originalFile.name} 
                      className="object-contain w-full h-full p-2 transition-transform duration-300"
                      style={{
                        transform: img.status !== 'done' ? `rotate(${rotation}deg) scale(${flipH ? -1 : 1}, ${flipV ? -1 : 1})` : 'none'
                      }}
                    />
                    
                    {img.status === 'done' && (
                      <div className="absolute inset-0 bg-green-500/10 backdrop-blur-[1px] flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm font-bold truncate leading-none">{img.originalFile.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-2 uppercase">
                      {rotation}° Rotation • {flipH ? 'H-Flip' : ''} {flipV ? 'V-Flip' : ''}
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
