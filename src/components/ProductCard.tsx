import React, { useState } from "react";
import { MessageSquare, ExternalLink, Tag, Image as ImageIcon, Zap, Crown } from "lucide-react";
import { Project, useStore } from "../store";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  project: Project;
}

export const ProductCard: React.FC<ProductCardProps> = ({ project }) => {
  const { language, testimonials } = useStore();
  const [isPremium, setIsPremium] = useState(false);
  
  // Find related portfolio items based on categories
  const relatedPortfolios = testimonials.filter(t => project.categories?.includes(t.role));
  const hasPortfolio = relatedPortfolios.length > 0;
  
  const hasPremium = project.priceElite !== undefined && project.priceElite > 0;

  const currentPrice = isPremium && hasPremium ? project.priceElite! : project.price;
  const currentOriginalPrice = isPremium && hasPremium ? project.originalPriceElite : project.originalPrice;
  const currentImage = isPremium && hasPremium && project.imageElite ? project.imageElite : project.image;
  const currentDemoLink = isPremium && hasPremium && project.demoLinkElite ? project.demoLinkElite : project.demoLink;
  
  const t = {
    id: {
      save: "Hemat",
      order: "Pesan",
      demo: "Demo",
      noDemo: "Tanpa Demo",
      portfolio: "Lihat Portofolio",
      waMessage: `Halo jasite.id, saya tertarik untuk memesan website paket: *${project.title}* (Versi ${isPremium ? 'Exclusive' : 'Standard'}) seharga `
    },
    en: {
      save: "Save",
      order: "Order",
      demo: "Demo",
      noDemo: "No Demo",
      portfolio: "View Portfolio",
      waMessage: `Hello jasite.id, I am interested in ordering the website package: *${project.title}* (${isPremium ? 'Exclusive' : 'Standard'} Version) priced at `
    }
  }[language];

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleBuy = () => {
    const text = `${t.waMessage}${formatRupiah(currentPrice)}. Mohon info selanjutnya.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div
      className={`group relative flex flex-col h-full bg-white dark:bg-[#0f172a] rounded-[2rem] border overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isPremium ? 'border-amber-400 ring-4 ring-amber-400/20 shadow-[0_20px_40px_-15px_rgba(251,191,36,0.3)]' : 'border-slate-200 dark:border-slate-800 shadow-xl'}`}
    >
      {/* Image Container - Make it more prominent */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <motion.img
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={currentImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Promo Badge */}
        {currentOriginalPrice && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`px-3 py-1.5 rounded-lg text-black text-[10px] font-black uppercase tracking-widest shadow-lg ${isPremium ? 'bg-amber-400' : 'bg-primary'}`}>
              {t.save} {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow relative">
        {/* Categories Badges - Moved to content area so it doesnt cover image */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories?.map(cat => (
            <span key={cat} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${isPremium ? 'bg-amber-400/10 text-amber-600 dark:text-amber-400' : 'bg-primary/10 text-primary'}`}>
              <Tag className="w-2.5 h-2.5" />
              {cat}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Features variant */}
        <ul className="text-slate-600 dark:text-slate-300 text-sm mb-6 space-y-3 flex-grow">
          { (isPremium && hasPremium && project.featuresExclusive && project.featuresExclusive.length > 0 ? project.featuresExclusive : project.featuresStandard || []).map((f, i) => (
             <li key={i} className="flex items-start gap-3">
               <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${isPremium ? 'bg-amber-400' : 'bg-primary'}`} />
               <span className="leading-snug">{f}</span>
             </li>
          )) }
        </ul>

        {/* Portfolio Link if exists */}
        {hasPortfolio && (
          <div className="mb-6">
            <Link to="/testimoni" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
              <ImageIcon className="w-4 h-4" />
              {t.portfolio} ({relatedPortfolios.length})
            </Link>
          </div>
        )}

        {/* Pricing & Variants */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 mt-auto">
          
          {/* Variant Toggle */}
          {hasPremium && (
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-6">
              <button
                onClick={() => setIsPremium(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${!isPremium ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <Zap className="w-3.5 h-3.5" />
                Standard
              </button>
              <button
                onClick={() => setIsPremium(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isPremium ? 'bg-amber-400 text-black shadow-sm' : 'text-slate-500 hover:text-amber-500'}`}
              >
                <Crown className="w-3.5 h-3.5" />
                Exclusive
              </button>
            </div>
          )}

          <div className="flex items-end justify-between gap-4">
            <div>
              {currentOriginalPrice && (
                <span className="block text-xs text-slate-400 dark:text-slate-500 line-through font-bold mb-1">
                  {formatRupiah(currentOriginalPrice)}
                </span>
              )}
              <span className={`text-3xl font-black tracking-tighter ${isPremium ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>
                {formatRupiah(currentPrice)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={handleBuy}
              className={`text-xs py-3.5 rounded-xl font-black uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2 ${isPremium ? 'bg-amber-400 text-black hover:bg-amber-500 shadow-lg shadow-amber-400/20' : 'bg-primary text-black hover:bg-primary-hover shadow-lg shadow-primary/20'}`}
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span>{t.order}</span>
            </button>
            {currentDemoLink ? (
              <a
                href={currentDemoLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-3.5 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {t.demo}
              </a>
            ) : (
              <button disabled className="btn-secondary text-xs py-3.5 opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                {t.noDemo}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

