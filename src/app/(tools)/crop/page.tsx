"use client";

import React, { useState, useRef } from 'react';
import { 
  Cropper, 
  CropperRef,
} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { 
  Scissors, 
  Settings2, 
  Download, 
  Trash2, 
  RefreshCcw, 
  Layers,
  CheckCircle2,
  Maximize,
  Square,
  RectangleHorizontal,
  RectangleVertical
} from 'lucide-react';
import { Dropzone } from '@/components/shared/Dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function CropPage() {
  const [images, setImages] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const cropperRef = useRef<CropperRef>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);

  const addFiles = (files: File[]) => {
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCanvas();
      if (canvas) {
        const url = canvas.toDataURL('image/jpeg', 0.95);
        setProcessedUrl(url);
      }
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div className="container py-12 px-4 max-w-7xl">
      <div className="flex flex-col items-center mb-10 text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
          <Scissors className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Crop Your Images</h1>
        <p className="text-muted-foreground max-w-2xl">
          Trim your photos perfectly with our interactive cropper. Choose from popular aspect ratios or free crop.
        </p>
      </div>

      {images.length === 0 ? (
        <Dropzone onFilesAdded={addFiles} maxFiles={1} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <Card className="border-orange-600/20 shadow-xl shadow-orange-600/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-orange-600/5 border-b border-orange-600/10">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings2 className="w-5 h-5 text-orange-600" />
                  Crop Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <Label>Aspect Ratio</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={aspectRatio === undefined ? "default" : "outline"} 
                      onClick={() => setAspectRatio(undefined)}
                      className="rounded-xl h-12"
                    >
                      <Maximize className="w-4 h-4 mr-2" />
                      Free
                    </Button>
                    <Button 
                      variant={aspectRatio === 1 ? "default" : "outline"} 
                      onClick={() => setAspectRatio(1)}
                      className="rounded-xl h-12"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      1:1 (Square)
                    </Button>
                    <Button 
                      variant={aspectRatio === 16/9 ? "default" : "outline"} 
                      onClick={() => setAspectRatio(16/9)}
                      className="rounded-xl h-12"
                    >
                      <RectangleHorizontal className="w-4 h-4 mr-2" />
                      16:9
                    </Button>
                    <Button 
                      variant={aspectRatio === 4/5 ? "default" : "outline"} 
                      onClick={() => setAspectRatio(4/5)}
                      className="rounded-xl h-12"
                    >
                      <RectangleVertical className="w-4 h-4 mr-2" />
                      4:5
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 p-6 bg-muted/20 border-t border-muted/50">
                <Button 
                  className="w-full h-12 rounded-xl font-bold text-base bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/20"
                  onClick={handleCrop}
                >
                  <Scissors className="w-5 h-5 mr-2" />
                  Crop Image
                </Button>
                {processedUrl && (
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl font-bold border-2"
                    asChild
                  >
                    <a href={processedUrl} download={`cropped-${currentImage.file.name}`}>
                      <Download className="w-5 h-5 mr-2" />
                      Download Result
                    </a>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-destructive"
                  onClick={() => { setImages([]); setProcessedUrl(null); }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <Card className="rounded-3xl border-muted/40 overflow-hidden bg-muted/20 min-h-[500px] flex items-center justify-center p-4">
              {currentImage && (
                <div className="w-full h-full max-h-[600px]">
                  <Cropper
                    ref={cropperRef}
                    src={currentImage.preview}
                    className="cropper h-[500px]"
                    stencilProps={{
                      aspectRatio: aspectRatio,
                    }}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
