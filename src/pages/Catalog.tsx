import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useStore } from "../store";
import { ProductCard } from "../components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";

export function Catalog() {
  const { projects, language, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const allCategories = ["Semua", ...categories];

  const t = {
    id: {
      title: "Katalog",
      subtitle: "Website.",
      desc: "Temukan berbagai pilihan paket website profesional yang dirancang khusus untuk meningkatkan kredibilitas bisnis Anda di dunia digital.",
      noResults: "Belum Ada Hasil",
      noResultsDesc: "Maaf, belum ada website yang sesuai. Silakan coba pencarian lain.",
      searchPlaceholder: "Cari website...",
      sortNewest: "Terbaru",
      sortPriceAsc: "Harga Terendah",
      sortPriceDesc: "Harga Tertinggi",
      categories: {
        "Semua": "Semua",
        "Toko Online": "Toko Online",
        "Company Profile": "Profil Bisnis",
        "Undangan Web": "Undangan Digital",
        "Landing Page": "Landing Page"
      }
    },
    en: {
      title: "Website",
      subtitle: "Catalog.",
      desc: "Find various professional website package options specifically designed to increase your business credibility in the digital world.",
      noResults: "No Results Found",
      noResultsDesc: "Sorry, there are no websites matching your criteria. Please try another search.",
      searchPlaceholder: "Search websites...",
      sortNewest: "Newest",
      sortPriceAsc: "Lowest Price",
      sortPriceDesc: "Highest Price",
      categories: {
        "Semua": "All",
        "Toko Online": "Online Store",
        "Company Profile": "Business Profile",
        "Undangan Web": "Digital Invitation",
        "Landing Page": "Landing Page"
      }
    }
  }[language];

  const filteredProjects = projects
    .filter((p) => p.isActive !== false)
    .filter((p) => activeCategory === "Semua" || (p.categories && p.categories.includes(activeCategory)))
    .filter((p) => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0; // newest is default order in store
    });

  return (
    <div className="bg-slate-50 dark:bg-[#0f172a] min-h-screen">
      <Helmet>
        <title>Katalog Website Profesional | Jasite.id</title>
        <meta name="description" content="Temukan berbagai pilihan paket website profesional dari Jasite.id untuk meningkatkan kredibilitas bisnis Anda." />
      </Helmet>
      {/* Header */}
      <section className="pt-40 pb-16 bg-slate-100 dark:bg-[#080808] border-b border-slate-200 dark:border-slate-800/50">
        <div className="container-custom">
          <div className="max-w-3xl">
            <motion.h1 
              key={"catalog-title-" + language}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            >
              {language === 'id' ? (
                <>Katalog <span className="text-primary italic">Website.</span></>
              ) : (
                <>Website <span className="text-primary italic">Catalog.</span></>
              )}
            </motion.h1>
            <motion.p 
              key={"catalog-desc-" + language}
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

      <div className="container-custom py-16">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-medium"
            />
          </div>
          <div className="relative min-w-[200px]">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-12 pr-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-medium appearance-none"
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="price-asc">{t.sortPriceAsc}</option>
              <option value="price-desc">{t.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-16 max-w-xs">
          <label className="block text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Kategori
          </label>
          <div className="relative">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full pl-5 pr-12 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold appearance-none cursor-pointer"
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {(t.categories as any)[category] || category}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={activeCategory + searchQuery + sortBy}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredProjects.map((project) => (
                <ProductCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t.noResults}</h3>
            <p className="text-slate-500 dark:text-slate-400">{t.noResultsDesc}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
