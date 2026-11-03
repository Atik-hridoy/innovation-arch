'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ApiProject,
  BookingRequest,
  ContactMessage,
  FAQItem,
  SiteSettings,
  ContentBlock,
  auth,
  login,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage,
  getBookings,
  updateBooking,
  deleteBooking,
  getContacts,
  markContactRead,
  deleteContact,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getSiteSettings,
  updateSiteSettings,
  getContentBlocks,
  createContentBlock,
  updateContentBlock,
  deleteContentBlock,
  resolveMediaUrl,
} from '../../lib/api';

type ViewMode = 'list' | 'create' | 'edit' | 'bookings' | 'messages' | 'faqs' | 'settings' | 'content';

export default function AdminDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Projects State
  const [projectsList, setProjectsList] = useState<ApiProject[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  // Bookings State
  const [bookingsList, setBookingsList] = useState<BookingRequest[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [bookingFilter, setBookingFilter] = useState<string>('all');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');

  // Messages State
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread'>('all');

  // FAQs State
  const [faqsList, setFaqsList] = useState<FAQItem[]>([]);
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
    email_address: '',
    office_address: '',
    map_url: '',
  });
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Content Blocks State
  const [contentList, setContentList] = useState<ContentBlock[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [blockKey, setBlockKey] = useState('');
  const [blockLabel, setBlockLabel] = useState('');
  const [blockValueJson, setBlockValueJson] = useState('{}');
  const [blockPublished, setBlockPublished] = useState(true);
  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);

  // Project Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [impact, setImpact] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricLabel, setMetricLabel] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [isPublished, setIsPublished] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [mockups, setMockups] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ id: number; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const token = auth.getAccessToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      await login(username, password);
      setIsAuthenticated(true);
      showToast('success', 'Logged in successfully!');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid username or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    auth.clearTokens();
    setIsAuthenticated(false);
  };

  // -------------------------------------------------------------
  // Data Fetchers
  // -------------------------------------------------------------

  const fetchProjectsList = async () => {
    setIsLoadingProjects(true);
    try {
      const data = await getProjects();
      setProjectsList(data);
    } catch (err) {
      console.error('Failed to fetch projects list', err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const fetchBookingsList = async () => {
    setIsLoadingBookings(true);
    try {
      const data = await getBookings();
      setBookingsList(data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  const fetchMessagesList = async () => {
    setIsLoadingMessages(true);
    try {
      const data = await getContacts();
      setMessagesList(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const fetchFaqsList = async () => {
    setIsLoadingFaqs(true);
    try {
      const data = await getFaqs();
      setFaqsList(data);
    } catch (err) {
      console.error('Failed to fetch FAQs', err);
    } finally {
      setIsLoadingFaqs(false);
    }
  };

  const fetchSettingsData = async () => {
    setIsLoadingSettings(true);
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (err) {
      console.error('Failed to fetch settings', err);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const fetchContentList = async () => {
    setIsLoadingContent(true);
    try {
      const data = await getContentBlocks();
      setContentList(data);
    } catch (err) {
      console.error('Failed to fetch content blocks', err);
    } finally {
      setIsLoadingContent(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    if (viewMode === 'list') fetchProjectsList();
    else if (viewMode === 'bookings') fetchBookingsList();
    else if (viewMode === 'messages') fetchMessagesList();
    else if (viewMode === 'faqs') fetchFaqsList();
    else if (viewMode === 'settings') fetchSettingsData();
    else if (viewMode === 'content') fetchContentList();
  }, [viewMode, isAuthenticated]);

  // -------------------------------------------------------------
  // Project Management Actions
  // -------------------------------------------------------------

  const resetProjectForm = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setProblem('');
    setSolution('');
    setImpact('');
    setMetricValue('');
    setMetricLabel('');
    setSortOrder('0');
    setIsPublished(true);
    setTags([]);
    setMockups([]);
    setExistingImages([]);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openCreateMode = () => {
    resetProjectForm();
    setViewMode('create');
  };

  const openEditMode = (project: ApiProject) => {
    resetProjectForm();
    setTitle(project.title || '');
    setSubtitle(project.subtitle || '');
    setDescription(project.description || '');
    setProblem(project.problem || '');
    setSolution(project.solution || '');
    setImpact(project.impact || '');
    setMetricValue(project.metric_value || '');
    setMetricLabel(project.metric_label || '');
    setSortOrder((project.sort_order ?? 0).toString());
    setIsPublished(project.is_published ?? true);
    setTags(project.tags || []);

    const images: { id: number; url: string }[] = [];
    if (project.images && project.images.length > 0) {
      project.images.forEach((img) => {
        images.push({ id: img.id, url: resolveMediaUrl(img.image_url || img.image) });
      });
    }
    setExistingImages(images);
    setEditingId(project.id);
    setViewMode('edit');
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMockups(filesArray);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      showToast('success', 'Project deleted successfully.');
      fetchProjectsList();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete project.');
    }
  };

  const handleDeleteExistingImage = async (projectId: number, imageId: number) => {
    if (!confirm('Delete this image from the project?')) return;
    try {
      await deleteProjectImage(projectId, imageId);
      setExistingImages(existingImages.filter((img) => img.id !== imageId));
      showToast('success', 'Image removed.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to remove image.');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      if (title) formData.append('title', title);
      if (subtitle) formData.append('subtitle', subtitle);
      if (description) formData.append('description', description);
      if (problem) formData.append('problem', problem);
      if (solution) formData.append('solution', solution);
      if (impact) formData.append('impact', impact);
      if (metricValue) formData.append('metric_value', metricValue);
      if (metricLabel) formData.append('metric_label', metricLabel);
      formData.append('sort_order', (parseInt(sortOrder, 10) || 0).toString());
      formData.append('is_published', isPublished ? 'true' : 'false');
      formData.append('tags', JSON.stringify(tags));

      mockups.forEach((file, index) => {
        formData.append('images', file);
        if (index < 4) {
          formData.append(`mockup_${index + 1}`, file);
        }
      });

      if (viewMode === 'edit' && editingId) {
        await updateProject(editingId, formData);
        showToast('success', 'Project updated successfully!');
      } else {
        await createProject(formData);
        showToast('success', 'Project created successfully!');
        resetProjectForm();
      }

      fetchProjectsList();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // Booking Management Actions
  // -------------------------------------------------------------

  const handleStatusChange = async (booking: BookingRequest, newStatus: BookingRequest['status']) => {
    try {
      await updateBooking(booking.id, { status: newStatus });
      setBookingsList(bookingsList.map((b) => (b.id === booking.id ? { ...b, status: newStatus } : b)));
      showToast('success', `Booking marked as ${newStatus}`);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update status.');
    }
  };

  const handleSaveInternalNote = async (id: number) => {
    try {
      await updateBooking(id, { internal_note: noteText });
      setBookingsList(bookingsList.map((b) => (b.id === id ? { ...b, internal_note: noteText } : b)));
      setEditingNoteId(null);
      showToast('success', 'Internal note saved.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save note.');
    }
  };

  const handleDeleteBooking = async (id: number) => {
    if (!confirm('Are you sure you want to delete this booking request?')) return;
    try {
      await deleteBooking(id);
      setBookingsList(bookingsList.filter((b) => b.id !== id));
      showToast('success', 'Booking request deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete booking.');
    }
  };

  // -------------------------------------------------------------
  // Messages Management Actions
  // -------------------------------------------------------------

  const handleToggleMessageRead = async (msg: ContactMessage) => {
    try {
      const updated = await markContactRead(msg.id, !msg.is_read);
      setMessagesList(messagesList.map((m) => (m.id === msg.id ? { ...m, is_read: updated.is_read } : m)));
    } catch (err: any) {
      showToast('error', err.message || 'Failed to toggle read state.');
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteContact(id);
      setMessagesList(messagesList.filter((m) => m.id !== id));
      showToast('success', 'Message deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete message.');
    }
  };

  // -------------------------------------------------------------
  // FAQs Management Actions
  // -------------------------------------------------------------

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        question: faqQuestion,
        answer: faqAnswer,
        order: parseInt(faqOrder, 10) || 0,
      };

      if (editingFaqId) {
        await updateFaq(editingFaqId, payload);
        showToast('success', 'FAQ updated.');
      } else {
        await createFaq(payload);
        showToast('success', 'FAQ created.');
      }

      setFaqQuestion('');
      setFaqAnswer('');
      setFaqOrder('0');
      setEditingFaqId(null);
      fetchFaqsList();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save FAQ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFaq = async (id: number) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      await deleteFaq(id);
      setFaqsList(faqsList.filter((f) => f.id !== id));
      showToast('success', 'FAQ deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete FAQ.');
    }
  };

  const editFaq = (faq: FAQItem) => {
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqOrder(faq.order.toString());
    setEditingFaqId(faq.id);
  };

  // -------------------------------------------------------------
  // Settings Management Actions
  // -------------------------------------------------------------

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const updated = await updateSiteSettings(settings);
      setSettings(updated);
      showToast('success', 'Site settings updated successfully!');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // -------------------------------------------------------------
  // Content Blocks Management Actions
  // -------------------------------------------------------------

  const handleContentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let parsedValue: any = {};
    try {
      parsedValue = JSON.parse(blockValueJson);
    } catch {
      parsedValue = blockValueJson;
    }

    try {
      if (editingBlockId) {
        await updateContentBlock(editingBlockId, {
          label: blockLabel,
          value: parsedValue,
          is_published: blockPublished,
        });
        showToast('success', 'Content block updated.');
      } else {
        await createContentBlock({
          key: blockKey.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-'),
          label: blockLabel,
          value: parsedValue,
          is_published: blockPublished,
        });
        showToast('success', 'Content block created.');
      }

      setBlockKey('');
      setBlockLabel('');
      setBlockValueJson('{}');
      setBlockPublished(true);
      setEditingBlockId(null);
      fetchContentList();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save content block.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const editBlock = (block: ContentBlock) => {
    setBlockKey(block.key);
    setBlockLabel(block.label);
    setBlockValueJson(typeof block.value === 'object' ? JSON.stringify(block.value, null, 2) : String(block.value));
    setBlockPublished(block.is_published);
    setEditingBlockId(block.id);
  };

  const handleToggleBlockPublished = async (block: ContentBlock) => {
    try {
      await updateContentBlock(block.id, { is_published: !block.is_published });
      setContentList(contentList.map((c) => (c.id === block.id ? { ...c, is_published: !block.is_published } : c)));
    } catch (err: any) {
      showToast('error', err.message || 'Failed to toggle published state.');
    }
  };

  const handleDeleteBlock = async (id: number) => {
    if (!confirm('Delete this content block?')) return;
    try {
      await deleteContentBlock(id);
      setContentList(contentList.filter((c) => c.id !== id));
      showToast('success', 'Content block deleted.');
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete block.');
    }
  };

  // -------------------------------------------------------------
  // Render Login Form if Unauthenticated
  // -------------------------------------------------------------

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center font-sans relative overflow-hidden px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 blur-[140px] rounded-full" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full" />
        </div>

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 mb-1">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
            <p className="text-xs text-white/50">Innovation Ark Integrated Operations</p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs text-center">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest ml-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                placeholder="admin"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">login</span>
            )}
            {isLoggingIn ? 'Verifying…' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Filtered lists
  // -------------------------------------------------------------

  const filteredBookings = bookingsList.filter((b) => {
    if (bookingFilter === 'all') return true;
    return b.status === bookingFilter;
  });

  const filteredMessages = messagesList.filter((m) => {
    if (messageFilter === 'all') return true;
    return !m.is_read;
  });

  // -------------------------------------------------------------
  // Main Dashboard View
  // -------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#07090d] text-white flex overflow-hidden font-sans selection:bg-blue-600/30">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed top-5 right-5 z-[100] px-5 py-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-semibold shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {statusMessage.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 border-r border-white/10 bg-[#0a0d14] backdrop-blur-xl z-50 flex flex-col transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-bold text-lg tracking-tight">
              ARK <span className="text-blue-400">ADMIN</span>
            </span>
          </div>
          <button className="lg:hidden text-white/50 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5 overflow-y-auto">
          <button
            onClick={() => {
              setViewMode('list');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'list' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">folder</span>
              Projects
            </div>
            <span className="text-[10px] font-mono opacity-60">{projectsList.length}</span>
          </button>

          <button
            onClick={() => {
              setViewMode('bookings');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'bookings' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Bookings
            </div>
            <span className="text-[10px] font-mono opacity-60">{bookingsList.length}</span>
          </button>

          <button
            onClick={() => {
              setViewMode('messages');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'messages' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Messages
            </div>
            {messagesList.filter((m) => !m.is_read).length > 0 && (
              <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">
                {messagesList.filter((m) => !m.is_read).length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setViewMode('faqs');
              setEditingFaqId(null);
              setFaqQuestion('');
              setFaqAnswer('');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'faqs' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">quiz</span>
              FAQs
            </div>
            <span className="text-[10px] font-mono opacity-60">{faqsList.length}</span>
          </button>

          <button
            onClick={() => {
              setViewMode('content');
              setEditingBlockId(null);
              setBlockKey('');
              setBlockLabel('');
              setBlockValueJson('{}');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'content' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px]">widgets</span>
              Content CMS
            </div>
            <span className="text-[10px] font-mono opacity-60">{contentList.length}</span>
          </button>

          <button
            onClick={() => {
              setViewMode('settings');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              viewMode === 'settings' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Site Settings
          </button>

          <div className="pt-3 my-2 border-t border-white/5">
            <button
              onClick={() => {
                openCreateMode();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'create' ? 'bg-white text-slate-950 font-bold' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              New Project
            </button>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 mb-1"
            >
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              Live Website
            </a>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Log Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 flex flex-col">
        {/* Mobile Header Bar */}
        <div className="lg:hidden sticky top-0 w-full h-16 bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-5 z-30">
          <span className="font-bold text-base tracking-tight">
            ARK <span className="text-blue-400">ADMIN</span>
          </span>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        <div className="p-5 sm:p-8 md:p-10 max-w-5xl mx-auto w-full space-y-8 pb-24">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {viewMode === 'list' && 'Projects Showcase'}
                {viewMode === 'create' && 'Create Project'}
                {viewMode === 'edit' && 'Edit Project'}
                {viewMode === 'bookings' && 'Consultation Bookings'}
                {viewMode === 'messages' && 'Contact Inquiries'}
                {viewMode === 'faqs' && 'Frequently Asked Questions'}
                {viewMode === 'settings' && 'Site Global Settings'}
                {viewMode === 'content' && 'Content Blocks CMS'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {viewMode === 'list' && 'Manage portfolio case studies published to the live site.'}
                {viewMode === 'bookings' && 'View schedule requests, update confirmation status, and record notes.'}
                {viewMode === 'messages' && 'Review inquiries submitted through website contact forms.'}
                {viewMode === 'faqs' && 'Add, edit, or reorder public accordion questions and answers.'}
                {viewMode === 'settings' && 'Edit company phone, email, WhatsApp, address, and interactive map embed.'}
                {viewMode === 'content' && 'Dynamic content blocks for Hero, announcement banner, and statistics.'}
                {(viewMode === 'create' || viewMode === 'edit') && 'Fill in complete details, problem/solution/impact, and upload mockups.'}
              </p>
            </div>

            {viewMode === 'list' && (
              <button
                onClick={openCreateMode}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-blue-500 active:scale-98 self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Project
              </button>
            )}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 1. Projects List View */}
          {/* ------------------------------------------------------------- */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {isLoadingProjects ? (
                <div className="text-slate-400 flex items-center gap-2 py-10 justify-center text-sm">
                  <span className="material-symbols-outlined animate-spin">refresh</span> Loading projects…
                </div>
              ) : projectsList.length === 0 ? (
                <div className="border border-white/10 bg-white/[0.02] p-12 rounded-3xl text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">folder_off</span>
                  <p className="text-slate-400 text-sm">No projects in database yet.</p>
                  <button onClick={openCreateMode} className="mt-4 text-xs font-semibold text-blue-400 hover:underline">
                    Create the first project →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectsList.map((project) => (
                    <div
                      key={project.id}
                      className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
                            {project.subtitle || 'Category'}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              project.is_published !== false
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}
                          >
                            {project.is_published !== false ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.description}</p>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {project.tags?.map((t) => (
                            <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                        <button
                          onClick={() => openEditMode(project)}
                          className="flex-1 rounded-lg bg-white/5 hover:bg-white/10 py-2 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[15px]">edit</span> Edit
                        </button>
                        <a
                          href={`/work/${project.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-semibold text-slate-300 flex items-center justify-center"
                          title="Preview case study"
                        >
                          <span className="material-symbols-outlined text-[15px]">visibility</span>
                        </a>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-400 flex items-center justify-center transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 2. Project Create / Edit Form */}
          {/* ------------------------------------------------------------- */}
          {(viewMode === 'create' || viewMode === 'edit') && (
            <form onSubmit={handleProjectSubmit} className="space-y-6">
              <div className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6">
                <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. BoiKhoj"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Subtitle / Category</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. P2P BOOK MARKETPLACE"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Short Summary Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence overview of the project."
                    className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Case Study Deep-Dive Fields */}
                <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 pt-2">
                  Case Study Narrative
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">The Challenge (Problem)</label>
                    <textarea
                      rows={4}
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder="What friction or problem did the client face?"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Our Approach (Solution)</label>
                    <textarea
                      rows={4}
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      placeholder="How did we engineer and design the solution?"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">The Outcome (Impact)</label>
                    <textarea
                      rows={4}
                      value={impact}
                      onChange={(e) => setImpact(e.target.value)}
                      placeholder="What was the measurable outcome or benefit?"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Metrics, Sorting & Tags */}
                <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 pt-2">
                  Metrics & Publishing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Metric Value</label>
                    <input
                      type="text"
                      value={metricValue}
                      onChange={(e) => setMetricValue(e.target.value)}
                      placeholder="e.g. 100K+"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Metric Label</label>
                    <input
                      type="text"
                      value={metricLabel}
                      onChange={(e) => setMetricLabel(e.target.value)}
                      placeholder="e.g. Active Users"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Sort Order</label>
                    <input
                      type="number"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="publish-check"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="h-4 w-4 rounded accent-blue-600"
                    />
                    <label htmlFor="publish-check" className="text-xs font-medium text-slate-300 cursor-pointer">
                      Published on site
                    </label>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Tags (Tech Stack / Focus)</label>
                  <div className="flex flex-wrap gap-2 items-center rounded-xl border border-white/10 bg-white/[0.03] p-3 min-h-[48px]">
                    {tags.map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/20 border border-blue-400/30 px-2.5 py-1 text-xs text-blue-300">
                        {t}
                        <button type="button" onClick={() => removeTag(i)} className="hover:text-white">
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder={tags.length === 0 ? 'Type a tag and press Enter…' : 'Add another…'}
                      className="flex-1 min-w-[140px] bg-transparent text-sm outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Existing Images & Upload */}
                <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 pt-2">Mockup Images</h2>
                {existingImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">Current Images:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {existingImages.map((img) => (
                        <div key={img.id} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/40">
                          <img src={img.url} alt="" className="h-full w-full object-contain p-2" />
                          <button
                            type="button"
                            onClick={() => editingId && handleDeleteExistingImage(editingId, img.id)}
                            className="absolute top-1.5 right-1.5 rounded-md bg-rose-600 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete image"
                          >
                            <span className="material-symbols-outlined text-xs">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.01] hover:bg-white/[0.03] p-6 text-center cursor-pointer transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="material-symbols-outlined text-3xl text-slate-500">cloud_upload</span>
                  <p className="text-xs font-semibold text-white mt-2">
                    {mockups.length > 0 ? `${mockups.length} new image(s) selected` : 'Click to select project mockups'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Accepts multiple PNG, JPG, WEBP</p>
                </div>
              </div>

              {/* Form Controls */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving…' : viewMode === 'edit' ? 'Update Project' : 'Publish Project'}
                </button>
              </div>
            </form>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 3. Bookings Management View */}
          {/* ------------------------------------------------------------- */}
          {viewMode === 'bookings' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                <div className="flex gap-1.5">
                  {(['all', 'new', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                        bookingFilter === st ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-400">{filteredBookings.length} booking request(s)</span>
              </div>

              {isLoadingBookings ? (
                <div className="text-slate-400 flex items-center gap-2 py-10 justify-center text-sm">
                  <span className="material-symbols-outlined animate-spin">refresh</span> Loading bookings…
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="border border-white/10 bg-white/[0.02] p-12 rounded-3xl text-center text-slate-400 text-sm">
                  No booking requests found for this filter.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl flex flex-col gap-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white">{booking.name}</h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                booking.status === 'confirmed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : booking.status === 'completed'
                                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                  : booking.status === 'cancelled'
                                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <a href={`mailto:${booking.email}`} className="text-xs text-blue-400 hover:underline">
                            {booking.email}
                          </a>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-semibold text-white">
                            📅 {booking.preferred_date} at {booking.preferred_time}
                          </p>
                          <p className="text-[10px] text-slate-400">{booking.timezone}</p>
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <p className="text-slate-400">
                          <strong className="text-slate-300">Project Type:</strong> {booking.project_type}
                        </p>
                        {booking.brief && (
                          <div className="rounded-xl bg-black/20 p-3 text-slate-300 border border-white/5 mt-1">
                            {booking.brief}
                          </div>
                        )}
                      </div>

                      {/* Internal Note */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Internal Studio Note:</span>
                          {editingNoteId !== booking.id && (
                            <button
                              onClick={() => {
                                setEditingNoteId(booking.id);
                                setNoteText(booking.internal_note || '');
                              }}
                              className="text-blue-400 hover:underline"
                            >
                              {booking.internal_note ? 'Edit note' : '+ Add note'}
                            </button>
                          )}
                        </div>

                        {editingNoteId === booking.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add private note for this booking…"
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={() => handleSaveInternalNote(booking.id)}
                              className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNoteId(null)}
                              className="rounded-lg px-2 py-1.5 text-xs text-slate-400"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          booking.internal_note && (
                            <p className="text-xs italic text-slate-400 bg-white/[0.01] p-2 rounded-lg">
                              “{booking.internal_note}”
                            </p>
                          )
                        )}
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 uppercase font-mono mr-1">Status:</span>
                          {(['new', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(booking, st)}
                              disabled={booking.status === st}
                              className={`px-2 py-1 rounded text-[10px] font-semibold uppercase transition-colors disabled:opacity-30 ${
                                booking.status === st ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-rose-400 hover:text-rose-300 text-xs p-1"
                          title="Delete booking request"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 4. Messages (Contacts) View */}
          {/* ------------------------------------------------------------- */}
          {viewMode === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setMessageFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      messageFilter === 'all' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    All Messages
                  </button>
                  <button
                    onClick={() => setMessageFilter('unread')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      messageFilter === 'unread' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    Unread Only
                  </button>
                </div>
                <span className="text-xs text-slate-400">{filteredMessages.length} message(s)</span>
              </div>

              {isLoadingMessages ? (
                <div className="text-slate-400 flex items-center gap-2 py-10 justify-center text-sm">
                  <span className="material-symbols-outlined animate-spin">refresh</span> Loading messages…
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="border border-white/10 bg-white/[0.02] p-12 rounded-3xl text-center text-slate-400 text-sm">
                  Inbox is clear. No messages found.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`border p-5 rounded-2xl flex flex-col gap-2.5 transition-all ${
                        msg.is_read
                          ? 'border-white/5 bg-white/[0.01]'
                          : 'border-blue-500/30 bg-blue-500/[0.03] shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white">{msg.name}</h3>
                            {!msg.is_read && (
                              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" title="Unread" />
                            )}
                          </div>
                          <a href={`mailto:${msg.email}`} className="text-xs text-blue-400 hover:underline">
                            {msg.email}
                          </a>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(msg.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="rounded-xl bg-black/20 p-3.5 text-xs leading-relaxed text-slate-300 whitespace-pre-wrap border border-white/5">
                        {msg.message}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <button
                          onClick={() => handleToggleMessageRead(msg)}
                          className="text-slate-400 hover:text-white flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {msg.is_read ? 'mark_email_unread' : 'mark_email_read'}
                          </span>
                          <span>{msg.is_read ? 'Mark Unread' : 'Mark Read'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 5. FAQs View */}
          {/* ------------------------------------------------------------- */}
          {viewMode === 'faqs' && (
            <div className="space-y-6">
              <form
                onSubmit={handleFaqSubmit}
                className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl space-y-4"
              >
                <h2 className="text-base font-bold text-white">
                  {editingFaqId ? 'Edit FAQ Item' : 'Create New FAQ Item'}
                </h2>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Question *</label>
                  <input
                    type="text"
                    required
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    placeholder="e.g. How quickly can we kick off a project?"
                    className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Answer *</label>
                  <textarea
                    rows={3}
                    required
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    placeholder="Provide a clear, direct answer."
                    className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-blue-500 resize-none"
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400">Sort Order Index:</label>
                    <input
                      type="number"
                      value={faqOrder}
                      onChange={(e) => setFaqOrder(e.target.value)}
                      className="w-20 bg-white/[0.03] border border-white/10 text-white rounded-lg px-2.5 py-1 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    {editingFaqId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaqId(null);
                          setFaqQuestion('');
                          setFaqAnswer('');
                          setFaqOrder('0');
                        }}
                        className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                    >
                      {editingFaqId ? 'Update FAQ' : 'Add FAQ'}
                    </button>
                  </div>
                </div>
              </form>

              {isLoadingFaqs ? (
                <div className="text-slate-400 flex items-center gap-2 py-10 justify-center text-sm">
                  <span className="material-symbols-outlined animate-spin">refresh</span> Loading FAQs…
                </div>
              ) : faqsList.length === 0 ? (
                <div className="border border-white/10 bg-white/[0.02] p-12 rounded-3xl text-center text-slate-400 text-sm">
                  No FAQs in database.
                </div>
              ) : (
                <div className="space-y-3">
                  {faqsList.map((faq) => (
                    <div
                      key={faq.id}
                      className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl flex items-start justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase">
                          Order: {faq.order}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5">{faq.question}</h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => editFaq(faq)}
                          className="rounded-lg bg-white/5 hover:bg-white/10 p-2 text-slate-300"
                          title="Edit FAQ"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(faq.id)}
                          className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 p-2 text-rose-400"
                          title="Delete FAQ"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 6. Dynamic Content Blocks CMS View */}
          {/* ------------------------------------------------------------- */}
          {viewMode === 'content' && (
            <div className="space-y-6">
              <form
                onSubmit={handleContentSubmit}
                className="bg-white/[0.02] border border-white/10 p-6 rounded-3xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-base font-bold text-white">
                    {editingBlockId ? 'Edit Content Block' : 'Create Content Block'}
                  </h2>
                  <div className="flex gap-1.5 text-[10px]">
                    <span className="text-slate-400 mr-1">Presets:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBlockKey('announcement');
                        setBlockLabel('Top Announcement Banner');
                        setBlockValueJson(JSON.stringify({ text: 'Accepting client projects for Q4 2026' }, null, 2));
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Announcement
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBlockKey('hero');
                        setBlockLabel('Hero Section Content');
                        setBlockValueJson(
                          JSON.stringify(
                            {
                              eyebrow: 'Product strategy, design and engineering',
                              title: 'Digital products.',
                              subtitle: 'Built to do real work.',
                              description:
                                'We help ambitious teams turn complex ideas into useful, dependable software.',
                              cta_text: 'Discuss a project',
                            },
                            null,
                            2
                          )
                        );
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Hero
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Key (Slug identifier) *</label>
                    <input
                      type="text"
                      required
                      disabled={!!editingBlockId}
                      value={blockKey}
                      onChange={(e) => setBlockKey(e.target.value)}
                      placeholder="e.g. hero, announcement, stats_heading"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 font-mono disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Display Label *</label>
                    <input
                      type="text"
                      required
                      value={blockLabel}
                      onChange={(e) => setBlockLabel(e.target.value)}
                      placeholder="e.g. Main Hero Banner"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Value (JSON or String)</label>
                  <textarea
                    rows={5}
                    value={blockValueJson}
                    onChange={(e) => setBlockValueJson(e.target.value)}
                    placeholder='{"title": "Custom text"}'
                    className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="block-published"
                      checked={blockPublished}
                      onChange={(e) => setBlockPublished(e.target.checked)}
                      className="h-4 w-4 rounded accent-blue-600"
                    />
                    <label htmlFor="block-published" className="text-xs text-slate-300 cursor-pointer">
                      Published (Active on site)
                    </label>
                  </div>

                  <div className="flex gap-2">
                    {editingBlockId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBlockId(null);
                          setBlockKey('');
                          setBlockLabel('');
                          setBlockValueJson('{}');
                        }}
                        className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                    >
                      {editingBlockId ? 'Update Block' : 'Create Block'}
                    </button>
                  </div>
                </div>
              </form>

              {isLoadingContent ? (
                <div className="text-slate-400 flex items-center gap-2 py-10 justify-center text-sm">
                  <span className="material-symbols-outlined animate-spin">refresh</span> Loading content blocks…
                </div>
              ) : contentList.length === 0 ? (
                <div className="border border-white/10 bg-white/[0.02] p-12 rounded-3xl text-center text-slate-400 text-sm">
                  No content blocks configured yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {contentList.map((block) => (
                    <div
                      key={block.id}
                      className="border border-white/10 bg-white/[0.02] p-5 rounded-2xl flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-400">{block.key}</span>
                          <span className="text-xs text-slate-300">({block.label})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleBlockPublished(block)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              block.is_published
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}
                          >
                            {block.is_published ? 'Active' : 'Disabled'}
                          </button>
                          <button
                            onClick={() => editBlock(block)}
                            className="rounded-lg bg-white/5 hover:bg-white/10 p-1.5 text-slate-300"
                          >
                            <span className="material-symbols-outlined text-[15px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 p-1.5 text-rose-400"
                          >
                            <span className="material-symbols-outlined text-[15px]">delete</span>
                          </button>
                        </div>
                      </div>

                      <pre className="text-[11px] font-mono text-slate-400 bg-black/25 p-3 rounded-xl overflow-x-auto border border-white/5 max-h-32">
                        {typeof block.value === 'object' ? JSON.stringify(block.value, null, 2) : String(block.value)}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 7. Site Settings View */}
          {/* ------------------------------------------------------------- */}
          {viewMode === 'settings' && (
            <div className="space-y-6">
              <form
                onSubmit={handleSaveSettings}
                className="bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6"
              >
                <h2 className="text-base font-bold text-white border-b border-white/10 pb-3">Global Contact Channels</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Public Email Address</label>
                    <input
                      type="email"
                      value={settings.email_address || ''}
                      onChange={(e) => setSettings({ ...settings, email_address: e.target.value })}
                      placeholder="hello@innovationark.co"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone_number || ''}
                      onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                      placeholder="+880 1744-807689"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">WhatsApp Number</label>
                    <input
                      type="text"
                      value={settings.whatsapp_number || ''}
                      onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                      placeholder="8801744807689"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Facebook URL</label>
                    <input
                      type="url"
                      value={settings.facebook_url || ''}
                      onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                      placeholder="https://facebook.com/innovationark"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 pt-2">
                  Studio Location & Map Embed
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Office Physical Address</label>
                    <input
                      type="text"
                      value={settings.office_address || ''}
                      onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
                      placeholder="Rangpur & Dhaka, Bangladesh"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Google Maps Embed URL (or output=embed link)
                    </label>
                    <input
                      type="url"
                      value={settings.map_url || ''}
                      onChange={(e) => setSettings({ ...settings, map_url: e.target.value })}
                      placeholder="https://maps.google.com/maps?q=25.817626,89.237485&t=m&z=14&ie=UTF8&iwloc=&output=embed"
                      className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                    <p className="text-[10px] text-slate-500">
                      If left blank, the site uses the default coordinates embed automatically.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 active:scale-98 disabled:opacity-50"
                  >
                    {isSavingSettings ? 'Saving Settings…' : 'Save Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
