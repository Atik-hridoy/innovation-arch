export interface BookCfg {
  id: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: string;
  desc: string;

  // Procedural cover painters. All optional — omit and supply `images` instead, or omit both for a generated placeholder.
  front?: (x: CanvasRenderingContext2D, w: number, h: number) => void;
  back?: (x: CanvasRenderingContext2D, w: number, h: number) => void;
  spine?: (x: CanvasRenderingContext2D, w: number, h: number) => void;

  // Image-based covers (png/webp/jpg/...). Takes priority over painters when present. Hosts without CORS headers fall back to the procedural/generated cover. 
  images?: {
    front?: string;
    back?: string;
    spine?: string;
  };
  /** @deprecated use images.front */
  coverURL?: string | null;

  // Page-edge trim color.
  edge?: string;
  backBg?: string;
  backInk?: string;
  spineBg?: string;
  spineInk?: string;
  spineFont?: string;
  tags?: string[];
}

export interface BooksShowcaseProps {
  books: BookCfg[];
  heroTitle?: string;
  /** Small heading shown above the books. */
  navTitle?: string;
  showNav?: boolean;
  showDetailPanel?: boolean;
  /** Show prev/next arrows when there are more books than fit on screen (3). Defaults to true. */
  showCarousel?: boolean;
  themeColors?: {
    navy?: string;
    pink?: string;
    cream?: string;
    lav?: string;
    peri?: string;
    /** Backwards-compatible background applied to both color schemes. */
    bg?: string;
    bgLight?: string;
    bgDark?: string;
    foregroundLight?: string;
    foregroundDark?: string;
  };
  className?: string;
  onBookSelect?: (book: BookCfg | null) => void;
}

export class Spring {
  v: number;
  t: number;
  vel: number;
  k: number;
  d: number;
  constructor(v: number, k?: number, d?: number) {
    this.v = v;
    this.t = v;
    this.vel = 0;
    this.k = k || 120;
    this.d = d || 14;
  }
  set(v: number) {
    this.v = v;
    this.t = v;
    this.vel = 0;
    return this;
  }
  update(dt: number) {
    const a = this.k * (this.t - this.v) - this.d * this.vel;
    this.vel += a * dt;
    this.v += this.vel * dt;
    return this.v;
  }
}
