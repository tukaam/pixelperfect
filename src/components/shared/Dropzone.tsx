"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  className?: string;
  maxFiles?: number;
  children?: React.ReactNode;
}

export function Dropzone({ onFilesAdded, className, maxFiles = 12, children }: DropzoneProps) {
  const [rejected, setRejected] = useState<any[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (acceptedFiles?.length) {
      onFilesAdded(acceptedFiles);
    }
    setRejected(fileRejections);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles,
    maxSize: 20 * 1024 * 1024 // 20MB
  });

  if (children) {
    return (
      <div {...getRootProps()} className={className}>
        <input {...getInputProps()} />
        {children}
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 min-h-[350px] flex flex-col items-center justify-center p-10 text-center bg-card shadow-sm hover:shadow-md",
          isDragActive 
            ? "border-primary bg-primary/5 scale-[0.99]" 
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-6">
          <div className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
            isDragActive ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}>
            <Upload className={cn("w-10 h-10 transition-transform duration-300", isDragActive ? "scale-110" : "group-hover:translate-y-[-4px]")} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {isDragActive ? "Drop your images here" : "Drag & Drop Images"}
            </h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
              Upload up to {maxFiles} images. Supported formats: <span className="text-foreground font-medium">JPG, PNG, WEBP</span>
            </p>
          </div>

          <Button variant="default" className="rounded-xl px-8 font-semibold shadow-lg shadow-primary/20">
            Browse Files
          </Button>
        </div>
      </div>

      {rejected.length > 0 && (
        <div className="mt-6 space-y-3">
          {rejected.map(({ file, errors }) => (
            <div key={file.name} className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileImage className="w-5 h-5 text-destructive shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold truncate">{file.name}</p>
                  <ul className="flex gap-2">
                    {errors.map((e: any) => (
                      <li key={e.code} className="text-[11px] text-destructive/80">{e.message}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => setRejected(prev => prev.filter(p => p.file.name !== file.name))}
                className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
