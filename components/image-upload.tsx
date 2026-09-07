"use client";

import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | null;
  onChange: (base64: string | null) => void;
  maxSizeMB?: number;
}

export function ImageUpload({ value, onChange, maxSizeMB = 1 }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // In a real app we'd resize/compress here before passing it up,
      // but for this MVP we'll just pass the raw base64 data.
      onChange(base64String);
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline rounded-xl p-6 bg-surface/50">
        {value ? (
          <div className="relative w-full aspect-video max-w-md rounded-lg overflow-hidden bg-background">
            <Image src={value} alt="Uploaded" fill className="object-contain" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <ImageIcon size={24} />
            </div>
            <p className="text-sm font-medium mb-1">Upload an image</p>
            <p className="text-xs text-foreground/60 mb-4">
              SVG, PNG, JPG or WEBP (max. {maxSizeMB}MB)
            </p>
            <Button
              type="button"
              onPress={() => fileInputRef.current?.click()}
            >
              <Upload size={16} className="mr-2"/>
              Select File
            </Button>
          </div>
        )}
      </div>
      {error && <p className="text-danger text-sm mt-2">{error}</p>}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
