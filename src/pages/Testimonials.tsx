import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";
import { useStore } from "../store";
import { Star, Quote, ExternalLink } from "lucide-react";

export function Testimonials() {
  const { testimonials, language } = useStore();

  const t = {
    id: {
      title: "Hasil Kerja",
      subtitle: "Kami.",
      desc: "Lihat bukti nyata proyek yang telah kami selesaikan untuk berbagai klien dari berbagai industri.",
      trust: "Dipercaya Oleh",
      viewProject: "Lihat Projek"
    },
    en: {
      title: "Our",
      subtitle: "Works.",
      desc: "See real proof of projects we have completed for various clients across different industries.",
      trust: "Trusted By",
      viewProject: "View Project"
    }
  }[language];

  return (
    <div className="bg-slate-50 dark:bg-[#0f172a] min-h-screen">
      <Helmet>
        <title>Portofolio & Testimoni Klien | Jasite.id</title>
        <meta name="description" content="Lihat bukti nyata proyek website yang telah kami selesaikan untuk berbagai klien. Kepercayaan Anda adalah prioritas kami." />
      </Helmet>
      {/* Header */}
      <section className="pt-40 pb-16 bg-slate-100 dark:bg-[#080808] border-b border-slate-200 dark:border-slate-800/50">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            >
              {language === 'id' ? (
                <>{t.title} <span className="text-primary italic">{t.subtitle}</span></>
              ) : (
                <>{t.title} <span className="text-primary italic">{t.subtitle}</span></>
              )}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {t.desc}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-8 aspect-video">
                <img 
                  src={project.projectImage || project.avatar} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {project.demoLink && (
                  <a 
                    href={project.demoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                  >
                    <span className="px-8 py-3 bg-white text-black font-black rounded-xl uppercase tracking-widest text-sm">
                      {t.viewProject}
                    </span>
                  </a>
                )}
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-sm text-primary font-bold uppercase tracking-widest mb-4">
                    {project.role}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl mb-6">
                    {project.content}
                  </p>
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary font-black rounded-xl uppercase tracking-widest text-xs hover:bg-primary hover:text-black transition-all group/btn"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <section className="py-20 bg-slate-100 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800/50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-12 uppercase tracking-[0.3em]">{t.trust}</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 dark:opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Mock Logos */}
            <div className="text-3xl font-black tracking-tighter">LOGOIPSUM</div>
            <div className="text-3xl font-black tracking-tighter">BRANDNAME</div>
            <div className="text-3xl font-black tracking-tighter">COMPANY</div>
            <div className="text-3xl font-black tracking-tighter">STARTUP</div>
          </div>
        </div>
      </section>
    </div>
  );
}
