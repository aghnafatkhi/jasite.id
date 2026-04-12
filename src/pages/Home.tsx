import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Zap, Shield, Clock, Star, Search, Smartphone, Layout, Code, Monitor, Cpu, Globe, CheckCircle } from "lucide-react";
import { useStore } from "../store";
import { ProductCard } from "../components/ProductCard";
import { Counter } from "../components/Counter";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

const iconMap: Record<string, any> = {
  Zap, Shield, Clock, Star, Search, Smartphone, Layout, Code, Monitor, Cpu, Globe, CheckCircle
};

export function Home() {
  const { projects, testimonials, language, features } = useStore();
  const featuredProjects = projects.slice(0, 3);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const t = {
    id: {
      badge: "Solusi Web UMKM #1 di Indonesia",
      hero1: "Website Bagus",
      hero2: "Harga Jujur.",
      start: "Mulai Sekarang",
      consult: "Konsultasi Gratis",
      stats1: "Klien Puas",
      stats2: "Jam Kerja",
      stats3: "Garansi Online",
      stats4: "Support Teknis",
      whyTitle: "Kenapa jasite.id?",
      whyDesc: "Kami menggabungkan desain modern dengan performa tinggi untuk hasil maksimal.",
      feat1Title: "Proses Kilat",
      feat1Desc: "Website Anda siap online dalam waktu kurang dari 72 jam tanpa kompromi kualitas.",
      feat2Title: "Keamanan Pro",
      feat2Desc: "Gratis SSL & sistem keamanan berlapis untuk menjaga data bisnis Anda tetap aman.",
      feat3Title: "Support 24/7",
      feat3Desc: "Tim ahli kami siap membantu Anda kapan saja jika terjadi kendala teknis.",
      feat4Title: "Desain Premium",
      feat4Desc: "Tampilan eksklusif yang disesuaikan dengan identitas brand Anda.",
      feat5Title: "SEO Friendly",
      feat5Desc: "Struktur website yang dioptimasi agar mudah ditemukan di Google.",
      feat6Title: "Mobile Responsive",
      feat6Desc: "Tampil sempurna di semua perangkat, dari HP hingga desktop.",
      popularTitle: "Paket Populer",
      popularDesc: "Pilih paket yang paling sesuai dengan kebutuhan dan budget bisnis Anda saat ini.",
      seeAll: "Lihat Semua",
      testiTitle: "Bukti Proyek Kami",
      testiDesc: "Kepercayaan klien adalah prioritas utama kami dalam setiap pengerjaan proyek.",
      allTesti: "Lihat Semua Portofolio",
      readyTitle: "Siap Bawa Bisnis Anda ke Level Selanjutnya?",
      contactUs: "Hubungi Kami",
      faqTitle: "Pertanyaan Populer",
      faqDesc: "Beberapa hal yang sering ditanyakan oleh calon klien kami.",
      faqs: [
        { q: "Berapa lama proses pengerjaannya?", a: "Untuk paket basic, website bisa selesai dalam 24-72 jam setelah data lengkap kami terima." },
        { q: "Apakah ada biaya bulanan?", a: "Tidak ada biaya bulanan wajib. Biaya perpanjangan hanya dilakukan setahun sekali untuk domain dan hosting." },
        { q: "Apakah website bisa diedit sendiri?", a: "Ya, kami menggunakan sistem yang memudahkan Anda untuk mengedit konten, gambar, dan produk sendiri." },
        { q: "Apakah sudah termasuk SEO?", a: "Tentu, setiap website yang kami bangun sudah mengikuti standar SEO terbaru agar mudah ditemukan di Google." }
      ]
    },
    en: {
      badge: "#1 MSME Web Solution in Indonesia",
      hero1: "Great Website",
      hero2: "Honest Price.",
      start: "Start Now",
      consult: "Free Consultation",
      stats1: "Happy Clients",
      stats2: "Working Hours",
      stats3: "Online Guarantee",
      stats4: "Technical Support",
      whyTitle: "Why jasite.id?",
      whyDesc: "We combine modern design with high performance for maximum results.",
      feat1Title: "Lightning Process",
      feat1Desc: "Your website is ready to go online in less than 72 hours without compromising quality.",
      feat2Title: "Pro Security",
      feat2Desc: "Free SSL & layered security systems to keep your business data safe.",
      feat3Title: "24/7 Support",
      feat3Desc: "Our expert team is ready to help you anytime if technical issues occur.",
      feat4Title: "Premium Design",
      feat4Desc: "Exclusive appearance tailored to your brand identity.",
      feat5Title: "SEO Friendly",
      feat5Desc: "Optimized website structure to be easily found on Google.",
      feat6Title: "Mobile Responsive",
      feat6Desc: "Looks perfect on all devices, from mobile to desktop.",
      popularTitle: "Popular Packages",
      popularDesc: "Choose the package that best fits your current business needs and budget.",
      seeAll: "See All",
      testiTitle: "Our Project Proofs",
      testiDesc: "Client trust is our top priority in every project execution.",
      allTesti: "See All Portfolio",
      readyTitle: "Ready to Take Your Business to the Next Level?",
      contactUs: "Contact Us",
      faqTitle: "Popular Questions",
      faqDesc: "Some things our potential clients often ask.",
      faqs: [
        { q: "How long does the process take?", a: "For basic packages, the website can be completed in 24-72 hours after we receive complete data." },
        { q: "Are there monthly fees?", a: "There are no mandatory monthly fees. Renewal fees are only once a year for domain and hosting." },
        { q: "Can I edit the website myself?", a: "Yes, we use a system that makes it easy for you to edit content, images, and products yourself." },
        { q: "Is SEO included?", a: "Of course, every website we build follows the latest SEO standards to be easily found on Google." }
      ]
    }
  }[language];

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.03]); // Very slight scale up

  return (
    <div>
      <Helmet>
        <title>Jasite.id - Solusi Website UMKM Terbaik di Indonesia</title>
        <meta name="description" content="Jasite.id menyediakan jasa pembuatan website profesional untuk UMKM dengan harga jujur, proses kilat, dan desain premium. Tingkatkan bisnis Anda sekarang!" />
      </Helmet>
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-slate-50 dark:bg-[#050505] min-h-screen flex flex-col items-center justify-start overflow-hidden pt-32 pb-20">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-bg" />
        
        <motion.div 
          style={{ y: y1 }}
          className="container-custom relative z-10"
        >
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]"
            >
              <Zap className="w-4 h-4" />
              <motion.span key={"badge-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t.badge}</motion.span>
            </motion.div>
            <motion.h1 
              key={"hero-title-" + language}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[8rem] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.75] mb-14"
            >
              {t.hero1} <br />
              <motion.span 
                style={{ scale: scaleParallax, display: 'inline-block', transformOrigin: 'center' }}
                className="animate-gradient-text italic"
              >
                {t.hero2}
              </motion.span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link to="/katalog" className="w-full sm:w-auto btn-primary text-xl px-12 py-5">
                <motion.span key={"btn-start-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t.start}</motion.span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-full sm:w-auto btn-secondary text-xl px-12 py-5">
                <motion.span key={"btn-consult-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t.consult}</motion.span>
              </a>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-40 right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
          className="absolute bottom-40 left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-black text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                <Counter value={500} suffix="+" />
              </div>
              <motion.div key={"stat1-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black uppercase tracking-widest opacity-70">{t.stats1}</motion.div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                <Counter value={72} suffix="" />
              </div>
              <motion.div key={"stat2-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black uppercase tracking-widest opacity-70">{t.stats2}</motion.div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                <Counter value={100} suffix="%" />
              </div>
              <motion.div key={"stat3-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black uppercase tracking-widest opacity-70">{t.stats3}</motion.div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
                <Counter value={24} suffix="/7" />
              </div>
              <motion.div key={"stat4-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-black uppercase tracking-widest opacity-70">{t.stats4}</motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white dark:bg-[#050505] border-b border-slate-100 dark:border-slate-800/50 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
              <div className="text-2xl font-black tracking-tighter text-slate-300 dark:text-slate-800">LOGOIPSUM</div>
              <div className="text-2xl font-black tracking-tighter text-slate-300 dark:text-slate-800">BRANDNAME</div>
              <div className="text-2xl font-black tracking-tighter text-slate-300 dark:text-slate-800">COMPANY</div>
              <div className="text-2xl font-black tracking-tighter text-slate-300 dark:text-slate-800">STARTUP</div>
              <div className="text-2xl font-black tracking-tighter text-slate-300 dark:text-slate-800">AGENCY</div>
              <div className="text-2xl font-black tracking-tighter text-slate-300 dark:text-slate-800">STUDIO</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="pt-16 md:pt-32 pb-8 md:pb-16 bg-slate-50 dark:bg-[#050505]">
        <div className="container-custom">
          <div className="mb-12 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.popularTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t.popularDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
            {featuredProjects.map(project => (
              <ProductCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/katalog" className="btn-secondary group inline-flex">
              {t.seeAll} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-slate-50 dark:bg-[#050505] relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 dark:opacity-10">
          <div className="w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              key={"why-title-" + language} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            >
              {t.whyTitle}
            </motion.h2>
            <motion.p 
              key={"why-desc-" + language} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg"
            >
              {t.whyDesc}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] || Star;
              const colors = [
                "bg-primary/10 text-primary border-primary/20",
                "bg-blue-500/10 text-blue-500 border-blue-500/20",
                "bg-green-500/10 text-green-500 border-green-500/20",
                "bg-purple-500/10 text-purple-500 border-purple-500/20",
                "bg-orange-500/10 text-orange-500 border-orange-500/20",
                "bg-pink-500/10 text-pink-500 border-pink-500/20"
              ];
              const color = colors[i % colors.length];
              
              return (
                <motion.div 
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white dark:bg-[#0a0a0a] border border-slate-100 dark:border-slate-800/50 rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none hover:border-primary/50 transition-all hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 ${color} border rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section-padding bg-slate-50 dark:bg-[#050505]">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.testiTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{t.testiDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {testimonials.slice(0, 2).map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-10 text-left"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-8 text-xl font-medium leading-relaxed italic">"{t.content}"</p>
                <div className="flex items-center gap-5">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <div className="font-black text-slate-900 dark:text-white text-lg">{t.name}</div>
                    <div className="text-sm text-slate-500 font-bold uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/testimoni" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
              {t.allTesti} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50 dark:bg-[#050505]">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t.faqTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">{t.faqDesc}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 group hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-primary text-black flex items-center justify-center text-sm shrink-0">?</span>
                  {faq.q}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed pl-12">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-5xl md:text-8xl font-black text-black mb-10 tracking-tighter leading-[0.9]">{t.readyTitle}</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/katalog" className="w-full sm:w-auto px-12 py-6 bg-black text-white font-black rounded-2xl text-2xl hover:scale-105 transition-transform">
              {t.start}
            </Link>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-12 py-6 border-4 border-black text-black font-black rounded-2xl text-2xl hover:bg-black hover:text-white transition-all">
              {t.contactUs}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
