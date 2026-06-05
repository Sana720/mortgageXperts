/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Settings,
  FileText,
  MessageSquare,
  Users,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Lock,
  Link,
  Globe,
  Percent,
  Check,
  X,
  User,
  ExternalLink,
  Home,
  CheckCircle,
  Clock,
  Archive,
  Menu,
  Eye,
  EyeOff
} from "lucide-react";

type Enquiry = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  savings: string | null;
  income: string | null;
  state: string | null;
  status: string;
  createdAt: string;
};

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  published: number;
  createdAt: string;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
};

type SettingsMap = Record<string, string>;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"enquiries" | "settings" | "hero" | "blogs" | "testimonials">("enquiries");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Data States
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<SettingsMap>({});
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  // Page SEO & Hero Configuration States
  const [selectedPagePath, setSelectedPagePath] = useState("/");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentPageSettings, setCurrentPageSettings] = useState<any>({
    page_path: "/",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    hero_badge: "",
    hero_title: "",
    hero_subtext: "",
    hero_image: "",
    hero_btn1_text: "",
    hero_btn1_link: "",
    hero_btn2_text: "",
    hero_btn2_link: "",
    slides: "[]"
  });
  
  // Save State
  const [saveLoading, setSaveLoading] = useState(false);

  // Modal / Form States
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    published: false
  });

  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    rating: 5,
    content: "",
    avatar: ""
  });

  // Verify auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch page settings when activeTab is "hero" or selectedPagePath changes
  useEffect(() => {
    if (isAuthenticated && activeTab === "hero") {
      fetchPageSettings(selectedPagePath);
    }
  }, [isAuthenticated, activeTab, selectedPagePath]);

  const fetchPageSettings = async (path: string) => {
    try {
      const res = await fetch(`/api/admin/page-settings?page_path=${encodeURIComponent(path)}`);
      const data = await res.json();
      if (data && data.pageSettings) {
        setCurrentPageSettings(data.pageSettings);
      }
    } catch (err) {
      console.error("Failed to fetch page settings:", err);
    }
  };

  const handleSavePageSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const res = await fetch("/api/admin/page-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPageSettings)
      });
      if (res.ok) {
        alert("Page SEO & Hero settings saved successfully!");
      } else {
        alert("Failed to save page settings");
      }
    } catch {
      alert("Error saving page settings");
    } finally {
      setSaveLoading(false);
    }
  };

  const handlePageHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, slideIndex?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (slideIndex !== undefined) {
          // Update specific slide's image in the slides array
          let slidesList = [];
          try {
            slidesList = typeof currentPageSettings.slides === "string" 
              ? JSON.parse(currentPageSettings.slides) 
              : (currentPageSettings.slides || []);
          } catch {
            slidesList = [];
          }
          slidesList[slideIndex] = {
            ...(slidesList[slideIndex] || {}),
            image: data.url
          };
          setCurrentPageSettings((prev: any) => ({
            ...prev,
            slides: JSON.stringify(slidesList)
          }));
        } else {
          // Update primary hero image
          setCurrentPageSettings((prev: any) => ({
            ...prev,
            hero_image: data.url
          }));
        }
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Error uploading file");
    }
  };

  const handleTestimonialAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setTestimonialForm(prev => ({ ...prev, avatar: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Error uploading file");
    }
  };

  const handleBlogCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setBlogForm(prev => ({ ...prev, coverImage: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Error uploading file");
    }
  };

  // Fetch data when authenticated state changes or active tab changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchTabContents();
      setSidebarOpen(false);
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Invalid username or password");
      }
    } catch {
      setAuthError("Failed to login");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
    } catch {
      alert("Failed to logout");
    }
  };

  const fetchTabContents = async () => {
    try {
      if (activeTab === "enquiries") {
        const res = await fetch("/api/admin/enquiries");
        const data = await res.json();
        setEnquiries(Array.isArray(data) ? data : []);
      } else if (activeTab === "settings") {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        setSettings(data?.settings || {});
      } else if (activeTab === "blogs") {
        const res = await fetch("/api/admin/blogs");
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } else if (activeTab === "testimonials") {
        const res = await fetch("/api/admin/testimonials");
        const data = await res.json();
        setTestimonials(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error loading tab content:", err);
    }
  };

  // Action: update settings / hero
  const handleSaveSettings = async (e: React.FormEvent, keysToSave: string[]) => {
    e.preventDefault();
    setSaveLoading(true);
    const payload: SettingsMap = {};
    keysToSave.forEach(key => {
      payload[key] = settings[key] || "";
    });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings");
      }
    } catch {
      alert("Error saving settings");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setSettings(prev => ({ ...prev, [key]: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Error uploading file");
    }
  };

  // Action: enquiry status change
  const handleEnquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Action: delete enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Action: Blog Save (Create or Edit)
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    const method = editingBlog ? "PUT" : "POST";
    const payload = editingBlog ? { ...blogForm, id: editingBlog.id } : blogForm;

    try {
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setBlogModalOpen(false);
        setEditingBlog(null);
        fetchTabContents();
      } else {
        alert(data.error || "Failed to save blog");
      }
    } catch {
      alert("Error saving blog");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      coverImage: blog.coverImage,
      category: blog.category,
      published: blog.published === 1
    });
    setBlogModalOpen(true);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchTabContents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Action: Testimonial Save
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    const method = editingTestimonial ? "PUT" : "POST";
    const payload = editingTestimonial ? { ...testimonialForm, id: editingTestimonial.id } : testimonialForm;

    try {
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setTestimonialModalOpen(false);
        setEditingTestimonial(null);
        fetchTabContents();
      } else {
        alert("Failed to save testimonial");
      }
    } catch {
      alert("Error saving testimonial");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      name: t.name,
      role: t.role,
      rating: t.rating,
      content: t.content,
      avatar: t.avatar
    });
    setTestimonialModalOpen(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchTabContents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Setup initial blog form for Create
  const handleNewBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "/images/logo.png",
      category: "First Home Buyer",
      published: true
    });
    setBlogModalOpen(true);
  };

  // Setup initial testimonial form for Create
  const handleNewTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: "",
      role: "First Home Buyer - Sydney",
      rating: 5,
      content: "",
      avatar: "/images/aakash_new.png"
    });
    setTestimonialModalOpen(true);
  };

  // Login Screen (Beautiful Light/Dark Two-Pane Split Theme)
  if (isAuthenticated === false || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-10 font-inter antialiased">
        <div className="w-full max-w-[1000px] min-h-[600px] bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-slate-200">
          
          {/* LEFT PANE: Form Block */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-between bg-white">
            {/* Header: Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-36 h-12">
                <Image
                  src="/images/logo.png"
                  alt="Mortgage Xperts Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>

            {/* Login Form Body */}
            <div className="space-y-6 my-auto">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Welcome Back
                </h1>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Please enter your details to sign in.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-4 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Username"
                      className="w-full bg-[#f0f4f9]/60 hover:bg-[#f0f4f9] focus:bg-[#f0f4f9] border border-transparent focus:border-blue-500/30 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Please contact system administrators to reset your login credentials.")}
                      className="text-[10px] font-extrabold text-[#1e40af] hover:text-[#1d4ed8] hover:underline uppercase tracking-wider"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-[#f0f4f9]/60 hover:bg-[#f0f4f9] focus:bg-[#f0f4f9] border border-transparent focus:border-blue-500/30 rounded-xl pl-11 pr-12 py-3.5 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 p-1 rounded hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="bg-red-50/70 border border-red-100/60 rounded-xl p-3 text-center">
                    <p className="text-rose-600 text-xs font-bold">{authError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  Sign In to Dashboard
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="text-[10px] text-slate-400 font-semibold mt-6 uppercase tracking-wider">
              © 2026 Mortgage Xperts. Protected System.
            </div>
          </div>

          {/* RIGHT PANE: Branding Panel */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0f294a] via-[#091a2f] to-[#040c17] relative p-16 flex-col justify-center text-white overflow-hidden">
            {/* Glowing Orb/Blob */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-500/10 blur-[60px]" />
            <div className="absolute top-12 left-12 w-64 h-64 rounded-full bg-blue-400/5 blur-[80px]" />

            <div className="relative z-10 max-w-sm space-y-6">
              {/* Colored underline decoration */}
              <div className="w-12 h-1 bg-[#2563EB] rounded-full" />
              
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Manage Your Mortgage Vision
              </h2>
              
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Access the complete suite of tools to manage client enquiries, update page testimonials, success stories and website settings securely.
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col md:flex-row antialiased relative">
      
      {/* ── BACKDROP OVERLAY FOR MOBILE OFF-CANVAS ── */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-30 md:hidden transition-opacity" 
        />
      )}

      {/* ── SIDEBAR NAVIGATION (Premium Light Off-Canvas) ── */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/70 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto md:sticky md:top-0 md:h-screen overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        {/* Sidebar Header (Fixed height h-20) */}
        <div className="h-20 border-b border-slate-100 flex items-center justify-between px-6 shrink-0 animate-fade-in">
          <div className="flex items-center gap-3">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="h-10 max-w-[180px] object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm shadow-blue-500/20 animate-pulse">
                  M
                </div>
                <span className="text-slate-900 text-[15px] font-black tracking-tight" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Mortgage Xperts
                </span>
              </div>
            )}
          </div>

          {/* Close Sidebar Button for Mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 hover:bg-slate-100 rounded-lg md:hidden text-slate-500 hover:text-slate-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Info Card */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">Aakash KC</div>
              <div className="text-[9px] text-slate-500 font-medium truncate">Home Loan Expert</div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "enquiries"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <Users className="w-4 h-4" />
            <span>Enquiries & Leads</span>
            {enquiries.filter(e => e.status === "new").length > 0 && (
              <span className="ml-auto bg-rose-500 text-white font-black px-2 py-0.5 rounded-full text-[9px] animate-bounce">
                {enquiries.filter(e => e.status === "new").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "settings"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <Settings className="w-4 h-4" />
            <span>Global Settings</span>
          </button>

          <button
            onClick={() => setActiveTab("hero")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "hero"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Hero Content</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "blogs"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <FileText className="w-4 h-4" />
            <span>Blogs Manager</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "testimonials"
                ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-extrabold py-2.5 rounded-xl transition-all"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ── */}
      <main className="flex-1 min-h-screen flex flex-col">
        
        {/* Tab Header (Matches height of sidebar header h-20 on desktop) */}
        <div className="h-auto md:h-20 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 md:py-0 px-6 md:px-10 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-xl md:hidden text-slate-600 shrink-0"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-slate-900 text-xl md:text-2xl font-bold tracking-tight capitalize animate-fade-in" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                {activeTab === "hero" ? "Hero Banner Settings" : `${activeTab} Management`}
              </h1>
              <p className="text-slate-500 text-[11px] md:text-xs font-medium mt-0.5">Manage live records, tweak text displays, and monitor customer inputs.</p>
            </div>
          </div>
          
          {/* Header Action Buttons */}
          {activeTab === "blogs" && (
            <button
              onClick={handleNewBlog}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 self-start shadow-sm shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Blog</span>
            </button>
          )}
          {activeTab === "testimonials" && (
            <button
              onClick={handleNewTestimonial}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 self-start shadow-sm shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>New Testimonial</span>
            </button>
          )}
        </div>

        {/* Tab Content Panel (Normal scrolling workspace) */}
        <div className="p-6 md:p-10 space-y-6">
          
          {/* ── TAB 1: ENQUIRIES PANEL ── */}
          {activeTab === "enquiries" && (
            <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-sm">
              {enquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <Users className="w-10 h-10 mx-auto text-slate-300" />
                  <h3 className="font-bold text-slate-700">No Enquiries Received Yet</h3>
                  <p className="text-xs">Leads submitted via your site forms and borrowing capacity calculator will dynamically appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[10px] font-black uppercase text-slate-500 tracking-wider">
                        <th className="p-4">Client Detail</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Assessed Criteria</th>
                        <th className="p-4">Source Type</th>
                        <th className="p-4">Submission Date</th>
                        <th className="p-4">Current Status</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-900 text-sm">{enq.name}</div>
                            {enq.state && (
                              <div className="text-[10px] text-blue-600 font-extrabold uppercase mt-0.5 tracking-wide">{enq.state}</div>
                            )}
                          </td>
                          <td className="p-4 space-y-1 font-medium">
                            <div className="text-slate-800">📞 {enq.phone}</div>
                            <div className="text-slate-500 text-[11px]">{enq.email}</div>
                          </td>
                          <td className="p-4 space-y-1">
                            {enq.income || enq.savings ? (
                              <div className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10.5px] font-bold text-slate-700 max-w-[220px] space-y-1 shadow-xs">
                                {enq.income && (
                                  <div className="flex flex-col">
                                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Income / Details:</span>
                                    <span className="text-slate-800 break-words font-semibold leading-tight">
                                      {!isNaN(Number(enq.income)) && Number(enq.income) > 0 ? `$${Number(enq.income).toLocaleString()}` : enq.income}
                                    </span>
                                  </div>
                                )}
                                {enq.savings && (
                                  <div className={`flex flex-col ${enq.income ? "border-t border-slate-200/60 pt-1 mt-1" : ""}`}>
                                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">Deposit / Savings:</span>
                                    <span className="text-slate-800 break-words font-semibold leading-tight">
                                      {!isNaN(Number(enq.savings)) && Number(enq.savings) > 0 ? `$${Number(enq.savings).toLocaleString()}` : enq.savings}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 italic text-[11px] block">No financial details provided</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${
                              enq.type === "calculator"
                                ? "bg-purple-50 text-purple-600 border-purple-100"
                                : enq.type === "mortgage_mate"
                                ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                                : enq.type === "callback"
                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                : "bg-slate-50 text-slate-600 border-slate-100"
                            }`}>
                              {enq.type ? enq.type.replace('_', ' ') : 'callback'}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500 font-medium text-[11px]">
                            {new Date(enq.createdAt).toLocaleDateString()} at {new Date(enq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="p-4">
                            <select
                              value={enq.status}
                              onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                              className={`px-2 py-1 rounded-lg border text-[10px] font-extrabold uppercase focus:outline-none cursor-pointer ${
                                enq.status === "new"
                                  ? "bg-rose-50 text-rose-600 border-rose-100"
                                  : enq.status === "contacted"
                                  ? "bg-amber-50 text-amber-600 border-amber-100"
                                  : "bg-emerald-50 text-emerald-600 border-emerald-100"
                              }`}
                            >
                              <option value="new">New Lead</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed / Handled</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="text-slate-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 2: GLOBAL SETTINGS ── */}
          {activeTab === "settings" && (
            <form onSubmit={(e) => handleSaveSettings(e, [
              "header_phone", "support_email", "footer_address", 
              "facebook_url", "instagram_url", "linkedin_url", "tiktok_url", 
              "logo_url", "site_icon_url", "interest_rate",
              "meta_title", "meta_description", "meta_keywords",
              "smtp_host", "smtp_port", "smtp_user", "smtp_pass", "smtp_from",
              "google_maps_embed"
            ])} className="bg-white border border-slate-200/70 rounded-2xl p-6 md:p-8 space-y-8 max-w-4xl shadow-sm">
              
              {/* SECTION A: Site Branding Assets */}
              <div className="space-y-4">
                <h3 className="text-slate-900 text-sm font-bold tracking-tight pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Site Assets & Branding Logos</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Site Logo (Header / Footer)</label>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={settings.logo_url || ""}
                          onChange={e => setSettings(prev => ({ ...prev, logo_url: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                          placeholder="/images/logo.png"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="bg-slate-100 hover:bg-slate-200 border border-slate-250 cursor-pointer text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all inline-block shrink-0">
                          Upload File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFileUpload(e, "logo_url")}
                            className="hidden"
                          />
                        </label>
                        {settings.logo_url && (
                          <div className="w-10 h-10 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 bg-slate-50 shrink-0">
                            <img src={settings.logo_url} alt="Logo" className="max-h-full max-w-full object-contain" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Site Favicon Icon (.ico / .png)</label>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={settings.site_icon_url || ""}
                          onChange={e => setSettings(prev => ({ ...prev, site_icon_url: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                          placeholder="/favicon.ico"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <label className="bg-slate-100 hover:bg-slate-200 border border-slate-250 cursor-pointer text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all inline-block shrink-0">
                          Upload File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleFileUpload(e, "site_icon_url")}
                            className="hidden"
                          />
                        </label>
                        {settings.site_icon_url && (
                          <div className="w-10 h-10 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 bg-slate-50 shrink-0">
                            <img src={settings.site_icon_url} alt="Favicon" className="max-h-full max-w-full object-contain" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: Contact & Google Maps Location */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-900 text-sm font-bold tracking-tight pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Contact Information & Office Details</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Header Phone Number</label>
                    <input
                      type="text"
                      value={settings.header_phone || ""}
                      onChange={e => setSettings(prev => ({ ...prev, header_phone: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="0450 240 757"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Support Email Address</label>
                    <input
                      type="email"
                      value={settings.support_email || ""}
                      onChange={e => setSettings(prev => ({ ...prev, support_email: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="mortgage@mortgagexperts.com.au"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Physical Office Address</label>
                    <input
                      type="text"
                      value={settings.footer_address || ""}
                      onChange={e => setSettings(prev => ({ ...prev, footer_address: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="e.g. Sydney, Australia"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Google Maps Embed Link (Iframe Src)</label>
                    <input
                      type="text"
                      value={settings.google_maps_embed || ""}
                      onChange={e => setSettings(prev => ({ ...prev, google_maps_embed: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="https://www.google.com/maps/embed?..."
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: Search Engine Optimization (SEO) */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-900 text-sm font-bold tracking-tight pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Homepage Metadata (SEO)</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={settings.meta_title || ""}
                      onChange={e => setSettings(prev => ({ ...prev, meta_title: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="Home title displayed on search results page tab"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={settings.meta_keywords || ""}
                      onChange={e => setSettings(prev => ({ ...prev, meta_keywords: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="e.g. mortgage broker, home loans, low deposit, Nepali broker"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Meta Description</label>
                    <textarea
                      rows={3}
                      value={settings.meta_description || ""}
                      onChange={e => setSettings(prev => ({ ...prev, meta_description: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
                      placeholder="SEO meta description snippet summarizing the homepage contents..."
                    />
                  </div>
                </div>
              </div>

              {/* SECTION D: SMTP Mail Configuration */}
              <div className="space-y-4 pt-2">
                <h3 className="text-slate-900 text-sm font-bold tracking-tight pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>SMTP Outbound Mail Server Setup</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">SMTP Host / Server</label>
                    <input
                      type="text"
                      value={settings.smtp_host || ""}
                      onChange={e => setSettings(prev => ({ ...prev, smtp_host: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="smtp.mailtrap.io"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">SMTP Port</label>
                    <input
                      type="text"
                      value={settings.smtp_port || ""}
                      onChange={e => setSettings(prev => ({ ...prev, smtp_port: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="2525"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">SMTP Username</label>
                    <input
                      type="text"
                      value={settings.smtp_user || ""}
                      onChange={e => setSettings(prev => ({ ...prev, smtp_user: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="e.g. key_username"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">SMTP Password</label>
                    <input
                      type="password"
                      value={settings.smtp_pass || ""}
                      onChange={e => setSettings(prev => ({ ...prev, smtp_pass: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="••••••••••••"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">SMTP Sender Email (From)</label>
                    <input
                      type="text"
                      value={settings.smtp_from || ""}
                      onChange={e => setSettings(prev => ({ ...prev, smtp_from: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="noreply@mortgagexperts.com.au"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION E: Rate Settings & Social Media Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-slate-100 pt-5">
                
                <div className="space-y-4">
                  <h3 className="text-slate-900 text-sm font-bold tracking-tight pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Percent className="w-3.5 h-3.5 text-blue-600" />
                    <span>Assessed Interest Rate</span>
                  </h3>
                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={settings.interest_rate || ""}
                      onChange={e => setSettings(prev => ({ ...prev, interest_rate: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="6.19"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-slate-900 text-sm font-bold tracking-tight pb-2 border-b border-slate-100 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Social Media Connection Links</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {["facebook_url", "instagram_url", "linkedin_url", "tiktok_url"].map((field) => (
                      <div key={field} className="relative">
                        <label className="text-[9.5px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1.5">{field.replace("_url", "")}</label>
                        <div className="relative">
                          <Link className="w-3.5 h-3.5 absolute left-3.5 top-3.5 text-slate-400" />
                          <input
                            type="url"
                            value={settings[field] || ""}
                            onChange={e => setSettings(prev => ({ ...prev, [field]: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  {saveLoading ? "Saving..." : "Save Settings Configuration"}
                </button>
              </div>
            </form>
          )}

          {/* ── TAB 3: CENTRALIZED PAGE SEO & HERO MANAGER ── */}
          {activeTab === "hero" && (
            <div className="space-y-6 max-w-6xl">
              
              {/* Page Selection Bar */}
              <div className="bg-white border border-slate-200/70 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Select Page to Configure</label>
                  <select
                    value={selectedPagePath}
                    onChange={(e) => {
                      setSelectedPagePath(e.target.value);
                      setActiveSlideIndex(0);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 text-xs font-bold focus:outline-none focus:border-blue-500 cursor-pointer min-w-[280px]"
                  >
                    <option value="/">Homepage (/) [Multi-slide]</option>
                    <option value="/nepali-mortgage-broker-in-australia">Nepali Broker Page (/nepali-mortgage-broker-in-australia)</option>
                    <option value="/home-loan-for-nurses">Home Loan for Nurses (/home-loan-for-nurses)</option>
                    <option value="/home-loan-for-doctors">Home Loan for Doctors (/home-loan-for-doctors)</option>
                    <option value="/home-loan-for-accountants">Home Loan for Accountants (/home-loan-for-accountants)</option>
                    <option value="/home-guarantee-scheme">Home Guarantee Scheme (/home-guarantee-scheme)</option>
                    <option value="/no-deposit-home-loans">No Deposit Home Loans (/no-deposit-home-loans)</option>
                    <option value="/home-loan-with-visas">Visa & Non-Resident Home Loans (/home-loan-with-visas)</option>
                    <option value="/refinancing-a-loan">Refinancing a Loan (/refinancing-a-loan)</option>
                    <option value="/self-employed-home-loans">Self-Employed Home Loans (/self-employed-home-loans)</option>
                    <option value="/investing-in-property">Investing in Property (/investing-in-property)</option>
                    <option value="/investing-in-property-nepali-mortgage-broker">Investing in Property (Nepali Broker Slug) (/investing-in-property-nepali-mortgage-broker)</option>
                  </select>
                </div>
                <div className="text-right sm:block hidden">
                  <span className="text-[10px] font-extrabold bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-3 py-1 uppercase tracking-wide">
                    {selectedPagePath === "/" ? "Slider Page" : "Single Hero Page"}
                  </span>
                </div>
              </div>

              {/* Main Configuration Grid */}
              <form onSubmit={handleSavePageSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT PANEL: SEO & METADATA (5 Columns) */}
                <div className="lg:col-span-5 bg-white border border-slate-200/70 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm h-fit">
                  <div className="border-b border-slate-100 pb-3 flex items-center gap-2 text-slate-800">
                    <Globe className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <h2 className="text-sm font-extrabold tracking-tight uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>SEO Metadata Settings</h2>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={currentPageSettings.meta_title || ""}
                      onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, meta_title: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="Enter premium SEO title"
                      required
                    />
                    <p className="text-[10px] text-slate-400 font-medium mt-1.5">Recommended length: 50-60 characters.</p>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Meta Description</label>
                    <textarea
                      rows={4}
                      value={currentPageSettings.meta_description || ""}
                      onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, meta_description: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
                      placeholder="Provide dynamic, key-word rich description of this page..."
                      required
                    />
                    <p className="text-[10px] text-slate-400 font-medium mt-1.5">Recommended length: 150-160 characters.</p>
                  </div>

                  <div>
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Meta Keywords</label>
                    <input
                      type="text"
                      value={currentPageSettings.meta_keywords || ""}
                      onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, meta_keywords: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="comma, separated, key, terms"
                      required
                    />
                    <p className="text-[10px] text-slate-400 font-medium mt-1.5">Separate keywords with commas.</p>
                  </div>
                </div>

                {/* RIGHT PANEL: HERO HEADER SETTINGS (7 Columns) */}
                <div className="lg:col-span-7 bg-white border border-slate-200/70 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
                  
                  {/* Single Hero configuration panel */}
                  {selectedPagePath !== "/" ? (
                    <>
                      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-800">
                          <LayoutDashboard className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                          <h2 className="text-sm font-extrabold tracking-tight uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Hero Content</h2>
                        </div>
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full uppercase">Single Slide</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Hero Tagline/Badge</label>
                          <input
                            type="text"
                            value={currentPageSettings.hero_badge || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_badge: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="e.g. First Home Buyer Specialists"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Hero Headline Title</label>
                          <input
                            type="text"
                            value={currentPageSettings.hero_title || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_title: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="Headline text..."
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Hero Subtitle/Subtext</label>
                          <textarea
                            rows={3}
                            value={currentPageSettings.hero_subtext || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_subtext: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all leading-relaxed"
                            placeholder="Detailed paragraph on the hero banner..."
                            required
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Background Image Url</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={currentPageSettings.hero_image || ""}
                              onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_image: e.target.value }))}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                              placeholder="/images/hero.png"
                            />
                            <div className="relative shrink-0">
                              <input
                                type="file"
                                id="single-hero-upload"
                                onChange={(e) => handlePageHeroImageUpload(e)}
                                className="hidden"
                                accept="image/*"
                              />
                              <label
                                htmlFor="single-hero-upload"
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer block text-center"
                              >
                                Upload
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Primary Button Text</label>
                          <input
                            type="text"
                            value={currentPageSettings.hero_btn1_text || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_btn1_text: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="Get Started"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Primary Button Link</label>
                          <input
                            type="text"
                            value={currentPageSettings.hero_btn1_link || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_btn1_link: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="#calculator"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Secondary Button Text</label>
                          <input
                            type="text"
                            value={currentPageSettings.hero_btn2_text || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_btn2_text: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="Free Call"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Secondary Button Link</label>
                          <input
                            type="text"
                            value={currentPageSettings.hero_btn2_link || ""}
                            onChange={e => setCurrentPageSettings((prev: any) => ({ ...prev, hero_btn2_link: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                            placeholder="#callback"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Homepage Multi-slide configurations */
                    <>
                      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-slate-800">
                          <LayoutDashboard className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                          <h2 className="text-sm font-extrabold tracking-tight uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Homepage Hero Slides</h2>
                        </div>
                        <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase self-start sm:self-auto">5 Slides Configurable</span>
                      </div>

                      {/* Slide tabs selection */}
                      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-200/60">
                        {[0, 1, 2, 3, 4].map((idx) => {
                          let slidesArray = [];
                          try {
                            slidesArray = typeof currentPageSettings.slides === "string" 
                              ? JSON.parse(currentPageSettings.slides) 
                              : (currentPageSettings.slides || []);
                          } catch {
                            slidesArray = [];
                          }
                          const slideData = slidesArray[idx] || {};
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setActiveSlideIndex(idx)}
                              className={`flex-1 min-w-[70px] text-center py-2 px-1 text-[10px] font-black rounded-lg transition-all ${
                                activeSlideIndex === idx
                                  ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                                  : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                              }`}
                            >
                              Slide {idx + 1}
                              <span className="block text-[8px] font-medium text-slate-400 truncate max-w-[80px] mx-auto">
                                {slideData.badge || "No Label"}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Edit Active Slide Fields */}
                      <div className="bg-slate-50/60 border border-slate-200/40 rounded-2xl p-5 space-y-4">
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-slate-100 pb-1.5">
                          Editing Slide Details (Slide {activeSlideIndex + 1})
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Slide Tagline / Badge</label>
                            <input
                              type="text"
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.badge || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].badge = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                              placeholder="e.g. First Home Buyer Specialists"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Slide Main Title</label>
                            <input
                              type="text"
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.title || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].title = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                              placeholder="Slide Headline..."
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Slide Subtext Description</label>
                            <textarea
                              rows={3}
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.subtext || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].subtext = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 leading-relaxed"
                              placeholder="Slide description details..."
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Slide Background Image Url</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={
                                  (
                                    (() => {
                                      try {
                                        const arr = JSON.parse(currentPageSettings.slides || "[]");
                                        return arr[activeSlideIndex]?.image || "";
                                      } catch { return ""; }
                                    })()
                                  )
                                }
                                onChange={(e) => {
                                  try {
                                    const arr = JSON.parse(currentPageSettings.slides || "[]");
                                    if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                    arr[activeSlideIndex].image = e.target.value;
                                    setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                  } catch (err) { console.error(err); }
                                }}
                                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                                placeholder="/images/hero.png"
                              />
                              <div className="relative shrink-0">
                                <input
                                  type="file"
                                  id={`slide-upload-${activeSlideIndex}`}
                                  onChange={(e) => handlePageHeroImageUpload(e, activeSlideIndex)}
                                  className="hidden"
                                  accept="image/*"
                                />
                                <label
                                  htmlFor={`slide-upload-${activeSlideIndex}`}
                                  className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl transition-all cursor-pointer block text-center"
                                >
                                  Upload
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Btn 1 Text</label>
                            <input
                              type="text"
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.btnText1 || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].btnText1 = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                              placeholder="Get Started"
                            />
                          </div>

                          <div>
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Btn 1 Link</label>
                            <input
                              type="text"
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.btnLink1 || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].btnLink1 = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                              placeholder="#calculator"
                            />
                          </div>

                          <div>
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Btn 2 Text</label>
                            <input
                              type="text"
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.btnText2 || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].btnText2 = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                              placeholder="Free Call"
                            />
                          </div>

                          <div>
                            <label className="text-[10.5px] font-extrabold text-slate-500 block mb-1">Btn 2 Link</label>
                            <input
                              type="text"
                              value={
                                (
                                  (() => {
                                    try {
                                      const arr = JSON.parse(currentPageSettings.slides || "[]");
                                      return arr[activeSlideIndex]?.btnLink2 || "";
                                    } catch { return ""; }
                                  })()
                                )
                              }
                              onChange={(e) => {
                                try {
                                  const arr = JSON.parse(currentPageSettings.slides || "[]");
                                  if (!arr[activeSlideIndex]) arr[activeSlideIndex] = { id: activeSlideIndex + 1 };
                                  arr[activeSlideIndex].btnLink2 = e.target.value;
                                  setCurrentPageSettings((prev: any) => ({ ...prev, slides: JSON.stringify(arr) }));
                                } catch (err) { console.error(err); }
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500"
                              placeholder="#callback"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Shared Submit Button for Page Meta / Hero Panel */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={saveLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {saveLoading ? "Saving..." : "Save Page Settings & Hero"}
                    </button>
                  </div>

                </div>

              </form>

            </div>
          )}

          {/* ── TAB 4: BLOGS MANAGER ── */}
          {activeTab === "blogs" && (
            <div className="space-y-4">
              {blogs.length === 0 ? (
                <div className="bg-white border border-slate-200/70 rounded-2xl p-12 text-center text-slate-400 space-y-4 flex flex-col items-center justify-center">
                  <FileText className="w-10 h-10 text-slate-300" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-700">No Published Blogs Found</h3>
                    <p className="text-xs">Create your first educational resource guide to display on the website.</p>
                  </div>
                  <button
                    onClick={handleNewBlog}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create First Blog</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map(blog => (
                    <article key={blog.id} className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all">
                      <div>
                        <div className="relative aspect-[16/10] bg-slate-100">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-extrabold text-xs">NO COVER IMAGE</div>
                          )}
                          <span className="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-wide bg-white/90 backdrop-blur border border-slate-100 px-2.5 py-1 rounded-lg text-blue-600 shadow-sm">
                            {blog.category}
                          </span>
                        </div>
                        
                        <div className="p-5 space-y-2">
                          <h4 className="text-slate-900 text-sm font-extrabold line-clamp-2 leading-snug">{blog.title}</h4>
                          <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed font-medium">{blog.excerpt}</p>
                        </div>
                      </div>

                      <div className="p-5 border-t border-slate-100 flex items-center justify-between">
                        <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                          blog.published === 1
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {blog.published === 1 ? "Active / Live" : "Draft"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="text-slate-500 hover:text-blue-600 p-1.5 hover:bg-slate-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-slate-500 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 5: TESTIMONIALS MANAGER ── */}
          {activeTab === "testimonials" && (
            <div className="space-y-4">
              {testimonials.length === 0 ? (
                <div className="bg-white border border-slate-200/70 rounded-2xl p-12 text-center text-slate-400 space-y-4 flex flex-col items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-slate-300" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-700">No Testimonials Yet</h3>
                    <p className="text-xs">Add dynamic client success reviews to display on client landing sections.</p>
                  </div>
                  <button
                    onClick={handleNewTestimonial}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Testimonial</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map(t => (
                    <div key={t.id} className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden relative shrink-0">
                            <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-slate-900 text-xs font-black">{t.name}</h4>
                            <p className="text-slate-500 text-[10px] font-semibold">{t.role}</p>
                          </div>
                          <span className="ml-auto text-amber-500 text-xs font-bold bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">⭐ {t.rating}/5</span>
                        </div>
                        
                        <p className="text-slate-600 text-xs italic leading-relaxed font-medium">&ldquo;{t.content}&rdquo;</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 mt-4 flex justify-end gap-1.5">
                        <button
                          onClick={() => handleEditTestimonial(t)}
                          className="text-slate-500 hover:text-blue-600 p-1.5 hover:bg-slate-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="text-slate-500 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* ── MODAL: BLOG EDITOR ── */}
      {blogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-slate-950 text-sm font-black uppercase tracking-tight">
                {editingBlog ? "Edit Blog Post" : "Create Blog Post"}
              </h3>
              <button onClick={() => setBlogModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-all">
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveBlog} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Blog Headline</label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={e => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="e.g. How to Save a 5% First Home Deposit"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={e => setBlogForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="how-to-save-deposit"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={e => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="First Home Buyer"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Cover Image File Path</label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={blogForm.coverImage}
                        onChange={e => setBlogForm(prev => ({ ...prev, coverImage: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        placeholder="/images/logo.png"
                      />
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      <label className="bg-slate-100 hover:bg-slate-200 border border-slate-250 cursor-pointer text-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl transition-all inline-block select-none">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBlogCoverImageUpload}
                          className="hidden"
                        />
                      </label>
                      {blogForm.coverImage && (
                        <div className="w-9 h-9 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-0.5 bg-slate-50">
                          <img src={blogForm.coverImage} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Short Excerpt (Intro text)</label>
                  <textarea
                    rows={2}
                    value={blogForm.excerpt}
                    onChange={e => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    placeholder="A brief teaser displayed on resource list grids"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Detailed Content (HTML/Markdown)</label>
                  <textarea
                    rows={10}
                    value={blogForm.content}
                    onChange={e => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed"
                    placeholder="Write the full content description of the guide here..."
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={blogForm.published}
                    onChange={e => setBlogForm(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <label htmlFor="published" className="text-[10px] font-extrabold uppercase tracking-wider cursor-pointer text-slate-600">Publish Immediately</label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-250 text-slate-600 text-xs font-extrabold px-4.5 py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition-all"
                >
                  {saveLoading ? "Saving..." : "Save Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: TESTIMONIAL EDITOR ── */}
      {testimonialModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-slate-950 text-sm font-black uppercase tracking-tight">
                {editingTestimonial ? "Edit Testimonial" : "Create Testimonial"}
              </h3>
              <button onClick={() => setTestimonialModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition-all">
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveTestimonial} className="p-5 space-y-4 text-slate-700">
              <div>
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Client Name</label>
                <input
                  type="text"
                  value={testimonialForm.name}
                  onChange={e => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="e.g. Kunal Bose"
                  required
                />
              </div>

              <div>
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Role / Location tag</label>
                <input
                  type="text"
                  value={testimonialForm.role}
                  onChange={e => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  placeholder="e.g. IT Professional - Melbourne"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Rating (1 to 5 Stars)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={testimonialForm.rating}
                    onChange={e => setTestimonialForm(prev => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Avatar Image Path</label>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={testimonialForm.avatar}
                        onChange={e => setTestimonialForm(prev => ({ ...prev, avatar: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                        placeholder="/images/aakash_new.png"
                      />
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      <label className="bg-slate-100 hover:bg-slate-200 border border-slate-250 cursor-pointer text-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl transition-all inline-block select-none">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleTestimonialAvatarUpload}
                          className="hidden"
                        />
                      </label>
                      {testimonialForm.avatar && (
                        <div className="w-9 h-9 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-0.5 bg-slate-50">
                          <img src={testimonialForm.avatar} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[9.5px] font-extrabold uppercase tracking-wider block mb-1">Review Description</label>
                <textarea
                  rows={4}
                  value={testimonialForm.content}
                  onChange={e => setTestimonialForm(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed"
                  placeholder="Review comments from client..."
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTestimonialModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-250 text-slate-600 text-xs font-extrabold px-4.5 py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4.5 py-2.5 rounded-xl transition-all"
                >
                  {saveLoading ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
