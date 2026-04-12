import React, { useState } from "react";
import { useStore, Project, Feature, Testimonial } from "../store";
import { Plus, Pencil, Trash2, X, LayoutDashboard, Package, MessageSquareQuote, Tags, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageUpload } from "../components/ImageUpload";

export function Admin() {
  const { 
    projects, addProject, updateProject, deleteProject, 
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    categories, addCategory, deleteCategory,
    features, addFeature, updateFeature, deleteFeature
  } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials' | 'categories' | 'features'>('projects');

  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    category: categories[0] || "Semua",
    image: "",
    description: "",
    price: 0,
    originalPrice: 0,
    demoLink: "",
  });

  const [featureFormData, setFeatureFormData] = useState<Omit<Feature, "id">>({
    icon: "Star",
    title: "",
    desc: ""
  });

  const [newCategory, setNewCategory] = useState("");

  const [testimonialFormData, setTestimonialFormData] = useState<Omit<Testimonial, "id">>({
    name: "",
    role: "",
    content: "",
    avatar: "",
    projectImage: "",
    demoLink: ""
  });

  const handleOpenTestimonialModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setTestimonialFormData({
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        avatar: testimonial.avatar,
        projectImage: testimonial.projectImage || "",
        demoLink: testimonial.demoLink || ""
      });
    } else {
      setEditingId(null);
      setTestimonialFormData({
        name: "",
        role: "",
        content: "",
        avatar: "",
        projectImage: "",
        demoLink: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        category: project.category,
        image: project.image,
        description: project.description,
        price: project.price,
        originalPrice: project.originalPrice || 0,
        demoLink: project.demoLink || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        category: categories[0] || "Semua",
        image: "",
        description: "",
        price: 0,
        originalPrice: 0,
        demoLink: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenFeatureModal = (feature?: Feature) => {
    if (feature) {
      setEditingId(feature.id);
      setFeatureFormData({
        icon: feature.icon,
        title: feature.title,
        desc: feature.desc,
      });
    } else {
      setEditingId(null);
      setFeatureFormData({
        icon: "Star",
        title: "",
        desc: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'features') {
      if (editingId) {
        updateFeature(editingId, featureFormData);
      } else {
        addFeature(featureFormData);
      }
    } else if (activeTab === 'testimonials') {
      if (editingId) {
        updateTestimonial(editingId, testimonialFormData);
      } else {
        addTestimonial(testimonialFormData);
      }
    } else {
      const dataToSave = {
        ...formData,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      };

      if (editingId) {
        updateProject(editingId, dataToSave);
      } else {
        addProject(dataToSave);
      }
    }
    setIsModalOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-12 bg-gray-50 dark:bg-[#080808] border-b border-gray-200 dark:border-gray-800/50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <LayoutDashboard className="w-3 h-3" />
                Dashboard Admin
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
                Kelola <span className="text-primary italic">Konten.</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'projects' ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-gray-900 text-gray-500'}`}
              >
                <Package className="w-4 h-4" />
                Produk
              </button>
              <button 
                onClick={() => setActiveTab('categories')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'categories' ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-gray-900 text-gray-500'}`}
              >
                <Tags className="w-4 h-4" />
                Kategori
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'features' ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-gray-900 text-gray-500'}`}
              >
                <Star className="w-4 h-4" />
                Keunggulan
              </button>
              <button 
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 'testimonials' ? 'bg-primary text-black' : 'bg-gray-200 dark:bg-gray-900 text-gray-500'}`}
              >
                <MessageSquareQuote className="w-4 h-4" />
                Testimoni
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Daftar Produk ({projects.length})</h2>
              <button
                onClick={() => handleOpenModal()}
                className="btn-primary"
              >
                <Plus className="w-5 h-5" />
                Tambah Produk
              </button>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800/50">
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-500">Produk</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-500">Kategori</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-500">Harga</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-gray-500 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <img src={project.image} alt={project.title} className="w-14 h-14 rounded-xl object-cover bg-gray-100 dark:bg-gray-800" />
                            <div>
                              <div className="font-black text-gray-900 dark:text-white">{project.title}</div>
                              <div className="text-xs text-gray-500 font-medium truncate max-w-xs">{project.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="inline-flex px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
                            {project.category}
                          </span>
                        </td>
                        <td className="p-6 font-black text-gray-900 dark:text-white">
                          {formatRupiah(project.price)}
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleOpenModal(project)}
                              className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm("Yakin ingin menghapus produk ini?")) {
                                  deleteProject(project.id);
                                }
                              }}
                              className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Daftar Kategori ({categories.length})</h2>
            </div>
            
            <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nama kategori baru..."
                className="flex-1 px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                <Plus className="w-5 h-5" />
                Tambah Kategori
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c} className="glass-card p-4 flex justify-between items-center">
                  <span className="font-black text-gray-900 dark:text-white">{c}</span>
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus kategori ${c}?`)) {
                        deleteCategory(c);
                      }
                    }}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Daftar Keunggulan ({features.length})</h2>
              <button
                onClick={() => handleOpenFeatureModal()}
                className="btn-primary"
              >
                <Plus className="w-5 h-5" />
                Tambah Keunggulan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.id} className="glass-card p-6 relative group">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenFeatureModal(f)}
                      className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Hapus keunggulan ini?")) {
                          deleteFeature(f.id);
                        }
                      }}
                      className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'testimonials' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Daftar Testimoni ({testimonials.length})</h2>
              <button
                onClick={() => handleOpenTestimonialModal()}
                className="btn-primary"
              >
                <Plus className="w-5 h-5" />
                Tambah Testimoni
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="glass-card p-6 flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-black text-gray-900 dark:text-white">{t.name}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">{t.role}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{t.content}"</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleOpenTestimonialModal(t)}
                      className="p-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-xl transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Hapus testimoni ini?")) {
                          deleteTestimonial(t.id);
                        }
                      }}
                      className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-[#080808] rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-200 dark:border-gray-800"
            >
              <div className="flex justify-between items-center p-8 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {activeTab === 'features' 
                    ? (editingId ? "Edit Keunggulan" : "Tambah Keunggulan Baru")
                    : activeTab === 'testimonials'
                    ? (editingId ? "Edit Testimoni" : "Tambah Testimoni Baru")
                    : (editingId ? "Edit Produk" : "Tambah Produk Baru")}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:rotate-90 transition-transform">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === 'features' ? (
                    <>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Icon (Lucide)</label>
                        <input
                          required
                          type="text"
                          value={featureFormData.icon}
                          onChange={(e) => setFeatureFormData({ ...featureFormData, icon: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          placeholder="e.g. Star, Zap, Shield"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Judul Keunggulan</label>
                        <input
                          required
                          type="text"
                          value={featureFormData.title}
                          onChange={(e) => setFeatureFormData({ ...featureFormData, title: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Deskripsi</label>
                        <textarea
                          required
                          rows={3}
                          value={featureFormData.desc}
                          onChange={(e) => setFeatureFormData({ ...featureFormData, desc: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold resize-none"
                        />
                      </div>
                    </>
                  ) : activeTab === 'testimonials' ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Nama Klien</label>
                          <input
                            required
                            type="text"
                            value={testimonialFormData.name}
                            onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Peran / Perusahaan</label>
                          <input
                            required
                            type="text"
                            value={testimonialFormData.role}
                            onChange={(e) => setTestimonialFormData({ ...testimonialFormData, role: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Avatar Klien</label>
                        <ImageUpload 
                          value={testimonialFormData.avatar} 
                          onChange={(base64) => setTestimonialFormData({ ...testimonialFormData, avatar: base64 })} 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Gambar Proyek (Bukti)</label>
                        <ImageUpload 
                          value={testimonialFormData.projectImage || ""} 
                          onChange={(base64) => setTestimonialFormData({ ...testimonialFormData, projectImage: base64 })} 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">URL Demo / Live Website</label>
                        <input
                          type="url"
                          value={testimonialFormData.demoLink || ""}
                          onChange={(e) => setTestimonialFormData({ ...testimonialFormData, demoLink: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Isi Testimoni</label>
                        <textarea
                          required
                          rows={3}
                          value={testimonialFormData.content}
                          onChange={(e) => setTestimonialFormData({ ...testimonialFormData, content: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold resize-none"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Nama Produk</label>
                          <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Kategori</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          >
                            {categories.map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Gambar Produk</label>
                        <ImageUpload 
                          value={formData.image} 
                          onChange={(base64) => setFormData({ ...formData, image: base64 })} 
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">URL Demo (Live Preview)</label>
                        <input
                          type="url"
                          value={formData.demoLink}
                          onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          placeholder="https://demo.jasite.id/..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Deskripsi Singkat</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Harga Promo (Rp)</label>
                          <input
                            required
                            type="number"
                            min="0"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Harga Asli (Rp)</label>
                          <input
                            type="number"
                            min="0"
                            value={formData.originalPrice || ""}
                            onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-primary text-slate-900 dark:text-white font-bold"
                            placeholder="Opsional"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
              
              <div className="p-8 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4 bg-gray-50 dark:bg-gray-900/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 text-sm font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  form="product-form"
                  className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  {activeTab === 'features' ? "Simpan Keunggulan" : activeTab === 'testimonials' ? "Simpan Testimoni" : "Simpan Produk"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
