import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Feature {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
  originalPrice?: number;
  demoLink?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  projectImage?: string;
  demoLink?: string;
}

interface AppState {
  theme: 'light' | 'dark';
  language: 'id' | 'en';
  toggleTheme: () => void;
  setLanguage: (lang: 'id' | 'en') => void;
  projects: Project[];
  testimonials: Testimonial[];
  categories: string[];
  features: Feature[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  addFeature: (feature: Omit<Feature, 'id'>) => void;
  updateFeature: (id: string, feature: Partial<Feature>) => void;
  deleteFeature: (id: string) => void;
}

const defaultCategories = ["Toko Online", "Company Profile", "Undangan Web", "Landing Page"];

const defaultFeatures: Feature[] = [
  { id: "f1", icon: "Zap", title: "Proses Kilat", desc: "Website Anda siap online dalam waktu kurang dari 72 jam tanpa kompromi kualitas." },
  { id: "f2", icon: "Shield", title: "Keamanan Pro", desc: "Gratis SSL & sistem keamanan berlapis untuk menjaga data bisnis Anda tetap aman." },
  { id: "f3", icon: "Clock", title: "Support 24/7", desc: "Tim ahli kami siap membantu Anda kapan saja jika terjadi kendala teknis." },
  { id: "f4", icon: "Star", title: "Desain Premium", desc: "Tampilan eksklusif yang disesuaikan dengan identitas brand Anda." },
  { id: "f5", icon: "Search", title: "SEO Friendly", desc: "Struktur website yang dioptimasi agar mudah ditemukan di Google." },
  { id: "f6", icon: "Smartphone", title: "Mobile Responsive", desc: "Tampil sempurna di semua perangkat, dari HP hingga desktop." }
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Toko Online Basic",
    category: "Toko Online",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    description: "Website toko online sederhana dengan fitur keranjang belanja dan checkout WhatsApp.",
    price: 350000,
    originalPrice: 750000,
    demoLink: "https://demo.jasite.id/toko-basic"
  },
  {
    id: "2",
    title: "Company Profile Pro",
    category: "Company Profile",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    description: "Tingkatkan kredibilitas bisnis Anda dengan website profil perusahaan yang profesional.",
    price: 500000,
    originalPrice: 1000000,
    demoLink: "https://demo.jasite.id/company-pro"
  },
  {
    id: "3",
    title: "Undangan Pernikahan Digital",
    category: "Undangan Web",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    description: "Undangan digital elegan dengan fitur RSVP, galeri foto, dan peta lokasi.",
    price: 150000,
    originalPrice: 300000,
    demoLink: "https://demo.jasite.id/undangan-digital"
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Coffee Shop Jakarta",
    role: "E-Commerce",
    content: "Website penjualan kopi dengan sistem katalog yang rapi dan integrasi WhatsApp.",
    avatar: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=150",
    projectImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "t2",
    name: "Luxury Villa Bali",
    role: "Company Profile",
    content: "Landing page eksklusif untuk penyewaan villa dengan galeri foto resolusi tinggi.",
    avatar: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=150",
    projectImage: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?auto=format&fit=crop&q=80&w=800"
  }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'id',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),
      setLanguage: (lang) => set({ language: lang }),
      projects: defaultProjects,
      testimonials: defaultTestimonials,
      categories: defaultCategories,
      features: defaultFeatures,
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: Date.now().toString() }]
      })),
      updateProject: (id, updatedFields) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
      addTestimonial: (testimonial) => set((state) => ({
        testimonials: [...state.testimonials, { ...testimonial, id: Date.now().toString() }]
      })),
      updateTestimonial: (id, updatedFields) => set((state) => ({
        testimonials: state.testimonials.map(t => t.id === id ? { ...t, ...updatedFields } : t)
      })),
      deleteTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter(t => t.id !== id)
      })),
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
      })),
      deleteCategory: (category) => set((state) => ({
        categories: state.categories.filter(c => c !== category)
      })),
      addFeature: (feature) => set((state) => ({
        features: [...state.features, { ...feature, id: Date.now().toString() }]
      })),
      updateFeature: (id, updatedFields) => set((state) => ({
        features: state.features.map(f => f.id === id ? { ...f, ...updatedFields } : f)
      })),
      deleteFeature: (id) => set((state) => ({
        features: state.features.filter(f => f.id !== id)
      }))
    }),
    {
      name: 'jasite-storage-v1',
    }
  )
);
