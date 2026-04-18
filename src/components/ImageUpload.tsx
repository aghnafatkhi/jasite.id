import React, { useState, useRef } from 'react';
import { UploadCloud, X, Check } from 'lucide-react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
  aspect?: number;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function ImageUpload({ value, onChange, aspect = 16 / 9 }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setCrop(undefined);
        setCompletedCrop(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleCropSave = () => {
    if (imageSrc && completedCrop && imgRef.current) {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );

      const base64Image = canvas.toDataURL('image/jpeg', 0.9);
      onChange(base64Image);
      setImageSrc(null);
    } else if (imageSrc && !completedCrop && imgRef.current) {
      // Jika tidak ada crop yang dilakukan, simpan gambar asli
      onChange(imageSrc);
      setImageSrc(null);
    }
  };

  return (
    <>
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        className={`relative w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all ${
          isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
        }`}
      >
        {value ? (
          <>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
                Ganti Gambar
                <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
              </label>
            </div>
          </>
        ) : (
          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-sm flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Klik atau Drag & Drop gambar kesini</span>
            <span className="text-xs mt-2 font-medium uppercase tracking-widest opacity-50">Maks 2MB (JPG, PNG)</span>
            <input type="file" accept="image/*" className="hidden" onChange={onFileInput} />
          </label>
        )}
      </div>

      <AnimatePresence>
        {imageSrc && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setImageSrc(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0f172a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-xl font-black text-white tracking-tight">Potong Gambar</h3>
                <button onClick={() => setImageSrc(null)} className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full overflow-hidden bg-black/50 p-6 flex flex-col items-center justify-center min-h-[40vh] max-h-[60vh] overscroll-contain" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  className="max-h-full max-w-full"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imageSrc}
                    onLoad={onImageLoad}
                    className="max-h-[50vh] w-auto object-contain select-none"
                    draggable={false}
                  />
                </ReactCrop>
              </div>

              <div className="p-6 bg-[#0f172a] border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setImageSrc(null)}
                  className="px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleCropSave}
                  className="px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-primary text-black hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <Check className="w-4 h-4" />
                  Simpan Potongan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
