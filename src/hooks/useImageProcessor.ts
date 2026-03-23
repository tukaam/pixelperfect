"use client";

import { useState, useCallback } from 'react';
import { 
  processImage, 
  loadImage, 
  ResizeOptions, 
  Unit 
} from '@/lib/canvas-utils';

export interface ProcessedImage {
  id: string;
  originalFile: File;
  previewUrl: string;
  processedBlob?: Blob;
  processedUrl?: string;
  status: 'idle' | 'processing' | 'done' | 'error';
  error?: string;
}

export function useImageProcessor() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessingAll, setIsProcessingAll] = useState(false);

  const addFiles = useCallback((files: File[]) => {
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      originalFile: file,
      previewUrl: URL.createObjectURL(file),
      status: 'idle' as const,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
        if (imageToRemove.processedUrl) URL.revokeObjectURL(imageToRemove.processedUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const clearImages = useCallback(() => {
    images.forEach(img => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
    });
    setImages([]);
  }, [images]);

  const processAll = useCallback(async (options: ResizeOptions) => {
    setIsProcessingAll(true);
    
    const processingPromises = images.map(async (img) => {
      setImages(prev => prev.map(p => p.id === img.id ? { ...p, status: 'processing' } : p));
      
      try {
        const htmlImg = await loadImage(img.previewUrl);
        const blob = await processImage(htmlImg, options);
        const processedUrl = URL.createObjectURL(blob);
        
        setImages(prev => prev.map(p => p.id === img.id ? { 
          ...p, 
          processedBlob: blob, 
          processedUrl, 
          status: 'done' 
        } : p));
      } catch (err) {
        setImages(prev => prev.map(p => p.id === img.id ? { 
          ...p, 
          status: 'error', 
          error: (err as Error).message 
        } : p));
      }
    });

    await Promise.all(processingPromises);
    setIsProcessingAll(false);
  }, [images]);

  const downloadAll = useCallback(() => {
    images.forEach((img) => {
      if (img.processedUrl) {
        const link = document.createElement('a');
        link.href = img.processedUrl;
        link.download = `pixelperfect-${img.originalFile.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }, [images]);

  return {
    images,
    addFiles,
    removeImage,
    clearImages,
    processAll,
    downloadAll,
    isProcessingAll,
  };
}
