'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../../lib/config';

type ViewMode = 'list' | 'create' | 'edit' | 'messages' | 'faqs' | 'settings';

interface AdminProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metric_value: string;
  metric_label: string;
  mockup_1: string | null;
  mockup_2: string | null;
  mockup_3: string | null;
  mockup_4: string | null;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  created_at: string;
}

interface SiteSettings {
  facebook_url: string;
  whatsapp_number: string;
  phone_number: string;
  email_address: string;
}

export default function AdminDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setIsAuthenticated(true);
      } else {
        setLoginError('Invalid username or password.');
      }
    } catch (err) {
      setLoginError('Failed to connect to the server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  // List State
  const [projectsList, setProjectsList] = useState<AdminProject[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);

  // Messages State
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // FAQs State
  const [faqsList, setFaqsList] = useState<FAQ[]>([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqOrder, setFaqOrder] = useState('0');
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    facebook_url: '',
    whatsapp_number: '',
    phone_number: '',
    email_address: ''
  });
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricLabel, setMetricLabel] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [mockups, setMockups] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch Projects List
  const fetchProjects = async () => {
    setIsLoadingList(true);
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/projects/`);
      if (res.ok) {
        const data = await res.json();
        setProjectsList(data);
      }
    } catch (err) {
      console.error("Failed to fetch projects list", err);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Fetch Messages List
  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/contacts/`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        setMessagesList(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Fetch FAQs List
  const fetchFaqs = async () => {
    setIsLoadingFaqs(true);
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/faqs/`);
      if (res.ok) {
        const data = await res.json();
        setFaqsList(data.sort((a: FAQ, b: FAQ) => a.order - b.order));
      }
    } catch (err) {
      console.error("Failed to fetch FAQs", err);
    } finally {
      setIsLoadingFaqs(false);
    }
  };

  // Fetch Settings
  const fetchSettings = async () => {
    setIsLoadingSettings(true);
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/settings/`);
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  useEffect(() => {
    if (viewMode === 'list') {
      fetchProjects();
    } else if (viewMode === 'messages') {
      fetchMessages();
    } else if (viewMode === 'faqs') {
      fetchFaqs();
    } else if (viewMode === 'settings') {
      fetchSettings();
    }
  }, [viewMode]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 4); 
      setMockups(filesArray);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setMetricValue('');
    setMetricLabel('');
    setTags([]);
    setMockups([]);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openCreateMode = () => {
    resetForm();
    setSubmitSuccess(false);
    setSubmitError('');
    setViewMode('create');
  };

  const openEditMode = (project: AdminProject) => {
    resetForm();
    setSubmitSuccess(false);
    setSubmitError('');
    setTitle(project.title || '');
    setSubtitle(project.subtitle || '');
    setDescription(project.description || '');
    setMetricValue(project.metric_value || '');
    setMetricLabel(project.metric_label || '');
    setTags(project.tags || []);
    setEditingId(project.id);
    setViewMode('edit');
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/projects/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting project.");
    }
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingFaqId 
        ? `${CONFIG.API_BASE_URL}/faqs/${editingFaqId}/` 
        : `${CONFIG.API_BASE_URL}/faqs/`;
      const method = editingFaqId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify({
          question: faqQuestion,
          answer: faqAnswer,
          order: parseInt(faqOrder, 10) || 0
        }),
      });

      if (res.ok) {
        setFaqQuestion('');
        setFaqAnswer('');
        setFaqOrder('0');
        setEditingFaqId(null);
        fetchFaqs();
      } else {
        alert("Failed to save FAQ.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving FAQ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFaq = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/faqs/${id}/`, { method: 'DELETE', headers: getAuthHeaders() });
      if (res.ok) fetchFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  const editFaq = (faq: FAQ) => {
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqOrder(faq.order.toString());
    setEditingFaqId(faq.id);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/settings/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      if (title) formData.append('title', title);
      if (subtitle) formData.append('subtitle', subtitle);
      if (description) formData.append('description', description);
      if (metricValue) formData.append('metric_value', metricValue);
      if (metricLabel) formData.append('metric_label', metricLabel);
      if (tags.length > 0) formData.append('tags', JSON.stringify(tags));
      
      mockups.forEach((file, index) => {
        formData.append(`mockup_${index + 1}`, file);
      });

      const url = viewMode === 'edit' && editingId 
        ? `${CONFIG.API_BASE_URL}/projects/${editingId}/` 
        : `${CONFIG.API_BASE_URL}/projects/`;
      
      const method = viewMode === 'edit' ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to save project. Ensure backend is running.');
      }

      setSubmitSuccess(true);
      if (viewMode === 'create') resetForm();
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center font-sans">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1D9E75]/10 blur-[150px] mix-blend-screen rounded-full" />
        </div>
        
        <form onSubmit={handleLogin} className="relative z-10 w-full max-w-sm bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Login</h1>
            <p className="text-sm text-white/50">Enter your credentials to continue</p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50" />
            </div>
          </div>

          <button type="submit" disabled={isLoggingIn} className="w-full bg-primary text-black py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            {isLoggingIn ? <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span> : <span className="material-symbols-outlined text-[18px]">login</span>}
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden font-sans selection:bg-primary/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1D9E75]/10 blur-[150px] mix-blend-screen rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/[0.05] bg-black/50 backdrop-blur-xl z-20 flex-col hidden lg:flex">
        <div className="h-20 flex items-center px-8 border-b border-white/[0.05]">
          <span className="font-bold text-xl tracking-tight">ARK <span className="text-primary">ADMIN</span></span>
        </div>
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          <button onClick={() => setViewMode('list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/[0.05] text-primary border border-white/5 font-medium' : 'text-white/50 hover:text-white hover:bg-white/[0.02]'}`}>
            <span className="material-symbols-outlined text-[20px]">folder</span>
            All Projects
          </button>
          <button onClick={() => setViewMode('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${viewMode === 'messages' ? 'bg-white/[0.05] text-primary border border-white/5 font-medium' : 'text-white/50 hover:text-white hover:bg-white/[0.02]'}`}>
            <span className="material-symbols-outlined text-[20px]">mail</span>
            Messages
          </button>
          <button onClick={() => { setViewMode('faqs'); setEditingFaqId(null); setFaqQuestion(''); setFaqAnswer(''); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${viewMode === 'faqs' ? 'bg-white/[0.05] text-primary border border-white/5 font-medium' : 'text-white/50 hover:text-white hover:bg-white/[0.02]'}`}>
            <span className="material-symbols-outlined text-[20px]">quiz</span>
            Manage FAQs
          </button>
          <button onClick={() => setViewMode('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${viewMode === 'settings' ? 'bg-white/[0.05] text-primary border border-white/5 font-medium' : 'text-white/50 hover:text-white hover:bg-white/[0.02]'}`}>
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Site Settings
          </button>
          <button onClick={openCreateMode} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${viewMode === 'create' ? 'bg-white/[0.05] text-primary border border-white/5 font-medium' : 'text-white/50 hover:text-white hover:bg-white/[0.02]'}`}>
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Add Project
          </button>
          <div className="mt-auto">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-bold">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {viewMode === 'list' ? 'All Projects' : viewMode === 'edit' ? 'Edit Project' : viewMode === 'messages' ? 'Inbox Messages' : viewMode === 'faqs' ? 'Manage FAQs' : viewMode === 'settings' ? 'Site Settings' : 'Create New Project'}
            </h1>
            <p className="text-white/40 mt-2 font-light">
              {viewMode === 'list' ? 'Manage your portfolio showcase.' : viewMode === 'messages' ? 'Read messages from the contact form.' : viewMode === 'faqs' ? 'Update Frequently Asked Questions.' : viewMode === 'settings' ? 'Update global site configuration.' : 'Update your project details and case study.'}
            </p>
          </div>

          {viewMode === 'faqs' ? (
            <div className="space-y-8 relative z-10">
              <form onSubmit={handleFaqSubmit} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl space-y-4">
                <h2 className="text-lg font-bold">{editingFaqId ? 'Edit FAQ' : 'Add New FAQ'}</h2>
                <div className="space-y-2">
                  <input type="text" placeholder="Question" value={faqQuestion} onChange={e => setFaqQuestion(e.target.value)} required className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50" />
                </div>
                <div className="space-y-2">
                  <textarea rows={3} placeholder="Answer" value={faqAnswer} onChange={e => setFaqAnswer(e.target.value)} required className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50 resize-none"></textarea>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 space-y-1">
                    <label className="text-xs text-white/50 pl-1">Order Index</label>
                    <input type="number" value={faqOrder} onChange={e => setFaqOrder(e.target.value)} className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-primary/50" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="mt-5 bg-primary text-black px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">{editingFaqId ? 'save' : 'add'}</span>
                    {editingFaqId ? 'Update FAQ' : 'Add FAQ'}
                  </button>
                  {editingFaqId && (
                    <button type="button" onClick={() => { setEditingFaqId(null); setFaqQuestion(''); setFaqAnswer(''); setFaqOrder('0'); }} className="mt-5 px-4 py-2.5 rounded-xl text-white/50 hover:bg-white/5 transition-all">Cancel</button>
                  )}
                </div>
              </form>

              {isLoadingFaqs ? (
                <div className="text-white/50">Loading FAQs...</div>
              ) : faqsList.length === 0 ? (
                <div className="text-white/50 text-center py-10 border border-white/5 rounded-2xl">No FAQs found.</div>
              ) : (
                <div className="space-y-3">
                  {faqsList.map(faq => (
                    <div key={faq.id} className="border border-white/5 bg-white/[0.02] p-5 rounded-2xl flex justify-between items-start gap-4">
                      <div>
                        <div className="text-xs text-primary mb-1">Order: {faq.order}</div>
                        <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                        <p className="text-sm text-white/70">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => editFaq(faq)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                        <button onClick={() => handleDeleteFaq(faq.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-all"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : viewMode === 'messages' ? (
            <div className="space-y-4 relative z-10">
              {isLoadingMessages ? (
                <div className="text-white/50 flex items-center gap-2"><span className="material-symbols-outlined animate-spin">refresh</span> Loading...</div>
              ) : messagesList.length === 0 ? (
                <div className="border border-white/5 bg-white/[0.02] p-10 rounded-3xl text-center backdrop-blur-md">
                  <p className="text-white/50">Inbox is empty. No messages yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messagesList.map(msg => (
                    <div key={msg.id} className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-6 rounded-2xl flex flex-col gap-2 transition-all group backdrop-blur-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white">{msg.name}</h3>
                          <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                        </div>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="mt-3 p-4 bg-black/20 rounded-xl border border-white/[0.02]">
                        <p className="text-sm text-white/70 whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : viewMode === 'settings' ? (
            <div className="space-y-8 relative z-10">
              <form onSubmit={handleSaveSettings} className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl backdrop-blur-md space-y-6">
                <h2 className="text-xl font-bold border-b border-white/10 pb-4">Global Contact Links</h2>
                {isLoadingSettings ? (
                  <div className="text-white/50">Loading settings...</div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Facebook URL</label>
                        <input type="url" value={settings.facebook_url} onChange={e => setSettings({...settings, facebook_url: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">WhatsApp Number</label>
                        <input type="text" value={settings.whatsapp_number} onChange={e => setSettings({...settings, whatsapp_number: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Phone Number</label>
                        <input type="text" value={settings.phone_number} onChange={e => setSettings({...settings, phone_number: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" value={settings.email_address} onChange={e => setSettings({...settings, email_address: e.target.value})} className="w-full bg-white/[0.02] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors" />
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button type="submit" disabled={isSavingSettings} className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">{isSavingSettings ? 'refresh' : 'save'}</span>
                        {isSavingSettings ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          ) : viewMode === 'list' ? (
            <div className="space-y-4 relative z-10">
              {isLoadingList ? (
                <div className="text-white/50 flex items-center gap-2"><span className="material-symbols-outlined animate-spin">refresh</span> Loading...</div>
              ) : projectsList.length === 0 ? (
                <div className="border border-white/5 bg-white/[0.02] p-10 rounded-3xl text-center backdrop-blur-md">
                  <p className="text-white/50">No projects found. Create one to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectsList.map(project => (
                    <div key={project.id} className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-6 rounded-2xl flex flex-col justify-between gap-4 transition-all group backdrop-blur-md">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{project.subtitle}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title || 'Untitled'}</h3>
                        <p className="text-sm text-white/50 line-clamp-2">{project.description || 'No description.'}</p>
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-white/5">
                        <button onClick={() => openEditMode(project)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                          <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                          <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {submitSuccess && (
                <div className="bg-[#1D9E75]/20 border border-[#1D9E75]/50 text-[#1D9E75] px-6 py-4 rounded-xl flex items-center gap-3">
                  <span className="material-symbols-outlined">check_circle</span>
                  Project successfully {viewMode === 'edit' ? 'updated' : 'saved'} in the database!
                </div>
              )}

              {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  {submitError}
                </div>
              )}

              {/* Form Container */}
              <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl space-y-10 relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                {/* Section 1: Basic Info */}
                <div className="space-y-6 relative z-10">
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">info</span> Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Project Title</label>
                      <input type="text" placeholder="e.g. Mettro Bazar" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 focus:border-primary/50 text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder-white/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Subtitle</label>
                      <input type="text" placeholder="e.g. E-Commerce Platform" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 focus:border-primary/50 text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder-white/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Full Description</label>
                    <textarea rows={4} placeholder="Describe the project goals and achievements..." value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 focus:border-primary/50 text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder-white/20 resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"></textarea>
                  </div>
                </div>

                {/* Section 2: Metrics & Tags */}
                <div className="space-y-6 relative z-10">
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">analytics</span> Metrics & Tags
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Metric Value</label>
                      <input type="text" placeholder="e.g. 150K+" value={metricValue} onChange={e => setMetricValue(e.target.value)} className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 focus:border-primary/50 text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder-white/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Metric Label</label>
                      <input type="text" placeholder="e.g. Active Users" value={metricLabel} onChange={e => setMetricLabel(e.target.value)} className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 focus:border-primary/50 text-white rounded-2xl px-5 py-4 outline-none transition-all placeholder-white/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Tech Stack Tags</label>
                    <div className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus-within:bg-white/[0.06] border border-white/10 focus-within:border-primary/50 rounded-2xl px-4 py-3 transition-all flex flex-wrap gap-2 items-center min-h-[60px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
                      {tags.map((tag, i) => (
                        <span key={i} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5">
                          {tag}
                          <button type="button" onClick={() => removeTag(i)} className="hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
                        </span>
                      ))}
                      <input type="text" placeholder={tags.length === 0 ? "Type a tag and press Enter..." : "Add another tag..."} value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} onKeyDown={handleAddTag} className="bg-transparent outline-none text-white text-sm flex-1 min-w-[200px] py-1 placeholder-white/30" />
                    </div>
                    <p className="text-[10px] text-white/30 ml-2 mt-1">Press enter to add a tag.</p>
                  </div>
                </div>

                {/* Section 3: Media Upload */}
                <div className="space-y-6 relative z-10">
                  <h2 className="text-sm font-semibold text-primary uppercase tracking-widest border-b border-white/10 pb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">imagesmode</span> Project Mockups
                  </h2>
                  <div className="w-full h-56 border-2 border-dashed border-white/10 hover:border-primary/40 bg-white/[0.01] hover:bg-primary/[0.02] rounded-2xl flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] relative overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    {mockups.length > 0 ? (
                      <div className="text-center z-10">
                        <span className="material-symbols-outlined text-primary text-4xl mb-2">check_circle</span>
                        <p className="text-white font-bold">{mockups.length} file(s) selected</p>
                        <p className="text-xs text-white/50 mt-1">Click to replace files (old files will be overwritten if you select new ones)</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-primary/20 flex items-center justify-center transition-all z-10">
                          <span className="material-symbols-outlined text-white/40 group-hover:text-primary text-3xl">cloud_upload</span>
                        </div>
                        <div className="text-center z-10">
                          <p className="text-base text-white/80 font-medium">{viewMode === 'edit' ? 'Select new images to replace old ones' : 'Click to upload images'}</p>
                          <p className="text-xs text-white/40 mt-1">Upload up to 4 mockups (PNG, JPG, WEBP)</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-white/10 flex justify-end gap-4 relative z-10">
                  <button type="button" onClick={() => setViewMode('list')} className="px-8 py-4 rounded-2xl text-white/50 hover:text-white hover:bg-white/5 font-bold transition-all disabled:opacity-50" disabled={isSubmitting}>Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="bg-white hover:bg-gray-200 text-black px-10 py-4 rounded-2xl font-extrabold tracking-wide flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0">
                    {isSubmitting ? (
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    ) : (
                      <span className="material-symbols-outlined text-[20px]">save</span>
                    )}
                    {isSubmitting ? 'SAVING...' : viewMode === 'edit' ? 'UPDATE PROJECT' : 'SAVE PROJECT'}
                  </button>
                </div>

              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
