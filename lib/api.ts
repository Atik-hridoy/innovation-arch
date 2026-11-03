import { CONFIG } from './config';

// -------------------------------------------------------------
// Type Definitions reflecting Backend Models
// -------------------------------------------------------------

export interface SiteSettings {
  facebook_url?: string;
  whatsapp_number?: string;
  phone_number?: string;
  email_address?: string;
  office_address?: string;
  map_url?: string;
  updated_at?: string;
}

export interface ProjectImageItem {
  id: number;
  image: string;
  image_url: string;
  caption?: string;
  order?: number;
  created_at?: string;
}

export interface ApiProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  metric_value: string;
  metric_label: string;
  mockup_1?: string | null;
  mockup_2?: string | null;
  mockup_3?: string | null;
  mockup_4?: string | null;
  mockups?: string[];
  images?: ProjectImageItem[];
  sort_order?: number;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BookingRequest {
  id: number;
  name: string;
  email: string;
  project_type: string;
  preferred_date: string;
  preferred_time: string;
  timezone: string;
  brief: string;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  internal_note?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  created_at?: string;
}

export interface ContentBlock {
  id: number;
  key: string;
  label: string;
  value: Record<string, any> | string;
  is_published: boolean;
  updated_at?: string;
}

// -------------------------------------------------------------
// Helper: Resolve Media / Mockup URLs to Absolute
// -------------------------------------------------------------

export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return CONFIG.FALLBACK_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const baseUrl = CONFIG.API_BASE_URL.replace(/\/api\/?$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanPath}`;
}

// -------------------------------------------------------------
// Authentication Token Management
// -------------------------------------------------------------

export const auth = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  },
  setTokens: (access: string, refresh?: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
  },
  clearTokens: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  getHeaders: (): Record<string, string> => {
    const token = auth.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// -------------------------------------------------------------
// Base Fetch Wrapper with JWT Auto-Refresh
// -------------------------------------------------------------

async function request<T>(
  path: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  const url = `${CONFIG.API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = new Headers(options.headers || {});

  // Add auth header if we have token and not explicitly set
  const token = auth.getAccessToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // If body is not FormData, ensure Content-Type is json
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle token expired (401)
  if (response.status === 401 && !isRetry && auth.getRefreshToken()) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return request<T>(path, options, true);
    }
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (typeof errJson === 'object' && errJson !== null) {
        errorMessage = Object.entries(errJson)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join(' | ') || errorMessage;
      }
    } catch {
      // Keep default error message
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// -------------------------------------------------------------
// 1. JWT Authentication API (/api/token/)
// -------------------------------------------------------------

export async function login(username: string, password: string) {
  const data = await request<{ access: string; refresh: string }>('/token/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  auth.setTokens(data.access, data.refresh);
  return data;
}

export async function refreshToken(): Promise<boolean> {
  const refresh = auth.getRefreshToken();
  if (!refresh) return false;
  try {
    const res = await fetch(`${CONFIG.API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (res.ok) {
      const data = await res.json();
      auth.setTokens(data.access);
      return true;
    }
  } catch (err) {
    console.error('Failed to refresh token:', err);
  }
  auth.clearTokens();
  return false;
}

// -------------------------------------------------------------
// 2. Site Settings API (/api/settings/)
// -------------------------------------------------------------

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  facebook_url: 'https://facebook.com',
  whatsapp_number: '+8801744807689',
  phone_number: '+880 1744-807689',
  email_address: 'hello@innovationark.co',
  office_address: 'Rangpur & Dhaka, Bangladesh',
  map_url: 'https://maps.google.com/maps?q=25.817626,89.237485&t=m&z=14&ie=UTF8&iwloc=&output=embed',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settings = await request<SiteSettings>('/settings/');
    return { ...DEFAULT_SITE_SETTINGS, ...settings };
  } catch (err) {
    console.warn('Using default site settings:', err);
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  return request<SiteSettings>('/settings/', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// -------------------------------------------------------------
// 3. Projects API (/api/projects/)
// -------------------------------------------------------------

export async function getProjects(): Promise<ApiProject[]> {
  const projects = await request<ApiProject[]>('/projects/');
  return projects.map((p) => {
    // Collect all image URLs
    const rawMockups: string[] = [];
    if (Array.isArray(p.mockups) && p.mockups.length > 0) {
      rawMockups.push(...p.mockups);
    } else if (Array.isArray(p.images) && p.images.length > 0) {
      p.images.forEach((img) => {
        if (img.image_url) rawMockups.push(img.image_url);
        else if (img.image) rawMockups.push(img.image);
      });
    }

    [p.mockup_1, p.mockup_2, p.mockup_3, p.mockup_4].forEach((m) => {
      if (m && !rawMockups.includes(m)) rawMockups.push(m);
    });

    const mockups = rawMockups.map(resolveMediaUrl);
    if (mockups.length === 0) mockups.push(CONFIG.FALLBACK_IMAGE);

    return {
      ...p,
      mockups,
    };
  });
}

export async function getProject(id: string | number): Promise<ApiProject> {
  const p = await request<ApiProject>(`/projects/${id}/`);
  const rawMockups: string[] = [];
  if (Array.isArray(p.mockups) && p.mockups.length > 0) {
    rawMockups.push(...p.mockups);
  } else if (Array.isArray(p.images) && p.images.length > 0) {
    p.images.forEach((img) => {
      if (img.image_url) rawMockups.push(img.image_url);
      else if (img.image) rawMockups.push(img.image);
    });
  }
  [p.mockup_1, p.mockup_2, p.mockup_3, p.mockup_4].forEach((m) => {
    if (m && !rawMockups.includes(m)) rawMockups.push(m);
  });
  const mockups = rawMockups.map(resolveMediaUrl);
  if (mockups.length === 0) mockups.push(CONFIG.FALLBACK_IMAGE);

  return {
    ...p,
    mockups,
  };
}

export async function createProject(formData: FormData): Promise<ApiProject> {
  return request<ApiProject>('/projects/', {
    method: 'POST',
    body: formData,
  });
}

export async function updateProject(id: number, formData: FormData): Promise<ApiProject> {
  return request<ApiProject>(`/projects/${id}/`, {
    method: 'PATCH',
    body: formData,
  });
}

export async function deleteProject(id: number): Promise<void> {
  return request<void>(`/projects/${id}/`, {
    method: 'DELETE',
  });
}

export async function deleteProjectImage(projectId: number, imageId: number): Promise<void> {
  return request<void>(`/projects/${projectId}/delete-image/`, {
    method: 'POST',
    body: JSON.stringify({ image_id: imageId }),
  });
}

// -------------------------------------------------------------
// 4. Booking Requests API (/api/bookings/)
// -------------------------------------------------------------

export interface BookingPayload {
  name: string;
  email: string;
  project_type: string;
  preferred_date: string; // YYYY-MM-DD
  preferred_time: string;
  timezone?: string;
  brief?: string;
}

export async function createBooking(payload: BookingPayload): Promise<BookingRequest> {
  return request<BookingRequest>('/bookings/', {
    method: 'POST',
    body: JSON.stringify({
      timezone: 'Asia/Dhaka',
      brief: '',
      ...payload,
    }),
  });
}

export async function getBookings(): Promise<BookingRequest[]> {
  return request<BookingRequest[]>('/bookings/');
}

export async function updateBooking(
  id: number,
  data: Partial<Pick<BookingRequest, 'status' | 'internal_note'>>
): Promise<BookingRequest> {
  return request<BookingRequest>(`/bookings/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteBooking(id: number): Promise<void> {
  return request<void>(`/bookings/${id}/`, {
    method: 'DELETE',
  });
}

// -------------------------------------------------------------
// 5. Contact Messages API (/api/contacts/)
// -------------------------------------------------------------

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function createContact(payload: ContactPayload): Promise<ContactMessage> {
  return request<ContactMessage>('/contacts/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getContacts(): Promise<ContactMessage[]> {
  return request<ContactMessage[]>('/contacts/');
}

export async function markContactRead(id: number, is_read: boolean): Promise<ContactMessage> {
  return request<ContactMessage>(`/contacts/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify({ is_read }),
  });
}

export async function deleteContact(id: number): Promise<void> {
  return request<void>(`/contacts/${id}/`, {
    method: 'DELETE',
  });
}

// -------------------------------------------------------------
// 6. FAQs API (/api/faqs/)
// -------------------------------------------------------------

export async function getFaqs(): Promise<FAQItem[]> {
  const faqs = await request<FAQItem[]>('/faqs/');
  return faqs.sort((a, b) => a.order - b.order);
}

export async function createFaq(data: { question: string; answer: string; order?: number }): Promise<FAQItem> {
  return request<FAQItem>('/faqs/', {
    method: 'POST',
    body: JSON.stringify({ order: 0, ...data }),
  });
}

export async function updateFaq(
  id: number,
  data: Partial<Pick<FAQItem, 'question' | 'answer' | 'order'>>
): Promise<FAQItem> {
  return request<FAQItem>(`/faqs/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteFaq(id: number): Promise<void> {
  return request<void>(`/faqs/${id}/`, {
    method: 'DELETE',
  });
}

// -------------------------------------------------------------
// 7. Dynamic Content Blocks API (/api/content/)
// -------------------------------------------------------------

export async function getContentBlocks(): Promise<ContentBlock[]> {
  return request<ContentBlock[]>('/content/');
}

export async function createContentBlock(data: {
  key: string;
  label: string;
  value: any;
  is_published?: boolean;
}): Promise<ContentBlock> {
  return request<ContentBlock>('/content/', {
    method: 'POST',
    body: JSON.stringify({ is_published: true, ...data }),
  });
}

export async function updateContentBlock(
  id: number,
  data: Partial<Pick<ContentBlock, 'label' | 'value' | 'is_published'>>
): Promise<ContentBlock> {
  return request<ContentBlock>(`/content/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteContentBlock(id: number): Promise<void> {
  return request<void>(`/content/${id}/`, {
    method: 'DELETE',
  });
}
