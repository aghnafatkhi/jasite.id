import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { Admin } from "./pages/Admin";
import { Testimonials } from "./pages/Testimonials";
import { ScrollToTop } from "./components/ScrollToTop";
import { useEffect } from "react";
import { useStore } from "./store";

export default function App() {
  const { theme } = useStore();

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="katalog" element={<Catalog />} />
          <Route path="testimoni" element={<Testimonials />} />
          <Route path="secret-admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
