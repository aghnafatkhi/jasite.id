import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`relative w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
      }`}
    >
      {value ? (
        <>
          <img src={value} alt="Preview" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <label className="cursor-pointer bg-white dark:bg-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-transform text-slate-900 dark:text-white">
              Ganti Gambar
              <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
            </label>
          </div>
        </>
      ) : (
        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors">
          <UploadCloud className="w-10 h-10 mb-2" />
          <span className="text-sm font-bold">Drag & Drop atau Klik untuk Upload</span>
          <span className="text-xs mt-1 opacity-70">Maks 2MB (JPG, PNG)</span>
          <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
        </label>
      )}
    </div>
  );
}
