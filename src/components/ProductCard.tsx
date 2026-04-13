import React from "react";
import { MessageSquare, ExternalLink, Tag, Image as ImageIcon } from "lucide-react";
import { Project, useStore } from "../store";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  project: Project;
}

export const ProductCard: React.FC<ProductCardProps> = ({ project }) => {
  const { language, testimonials } = useStore();
  
  // Find related portfolio items based on category
  const relatedPortfolios = testimonials.filter(t => t.role === project.category);
  const hasPortfolio = relatedPortfolios.length > 0;
  
  const t = {
    id: {
      save: "Hemat",
      order: "Pesan",
      demo: "Demo",
      noDemo: "Tanpa Demo",
      portfolio: "Lihat Portofolio",
      waMessage: `Halo jasite.id, saya tertarik untuk memesan website paket: *${project.title}* seharga `
    },
    en: {
      save: "Save",
      order: "Order",
      demo: "Demo",
      noDemo: "No Demo",
      portfolio: "View Portfolio",
      waMessage: `Hello jasite.id, I am interested in ordering the website package: *${project.title}* priced at `
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
    const text = `${t.waMessage}${formatRupiah(project.price)}. Mohon info selanjutnya.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      whileHover={{ y: -12, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative flex flex-col h-full glass-card overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
            <Tag className="w-3 h-3 text-primary" />
            {project.category}
          </span>
        </div>

        {/* Promo Badge */}
        {project.originalPrice && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-lg bg-primary text-black text-[10px] font-black uppercase tracking-widest shadow-lg">
              {t.save} {Math.round(((project.originalPrice - project.price) / project.originalPrice) * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* Portfolio Link if exists */}
        {hasPortfolio && (
          <div className="mb-6">
            <Link to="/testimoni" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover transition-colors">
              <ImageIcon className="w-4 h-4" />
              {t.portfolio} ({relatedPortfolios.length})
            </Link>
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
          <div className="flex items-end justify-between gap-4">
            <div>
              {project.originalPrice && (
                <span className="block text-xs text-slate-400 dark:text-slate-500 line-through font-bold mb-1">
                  {formatRupiah(project.originalPrice)}
                </span>
              )}
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                {formatRupiah(project.price)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={handleBuy}
              className="btn-primary text-xs py-3.5"
            >
              <MessageSquare className="w-4 h-4" />
              {t.order}
            </button>
            {project.demoLink ? (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-3.5"
              >
                <ExternalLink className="w-4 h-4" />
                {t.demo}
              </a>
            ) : (
              <button disabled className="btn-secondary text-xs py-3.5 opacity-50 cursor-not-allowed">
                {t.noDemo}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

