export function mkCanvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function drawSpaced(x: CanvasRenderingContext2D, text: string, cx: number, y: number, ls: number) {
  const prev = x.textAlign;
  x.textAlign = 'left';
  const chars = [...text];
  let tot = 0;
  const ws = chars.map((ch) => {
    const w = x.measureText(ch).width;
    tot += w;
    return w;
  });
  tot += ls * (chars.length - 1);
  let px = cx - tot / 2;
  chars.forEach((ch, i) => {
    x.fillText(ch, px, y);
    px += ws[i] + ls;
  });
  x.textAlign = prev;
}

export function rr(x: CanvasRenderingContext2D, px: number, py: number, w: number, h: number, r: number) {
  x.beginPath();
  x.moveTo(px + r, py);
  x.arcTo(px + w, py, px + w, py + h, r);
  x.arcTo(px + w, py + h, px, py + h, r);
  x.arcTo(px, py + h, px, py, r);
  x.arcTo(px, py, px + w, py, r);
  x.closePath();
}

export function paintDefaultFront(x: CanvasRenderingContext2D, w: number, h: number, o: { title: string; subtitle: string; bg: string }) {
  x.fillStyle = o.bg;
  x.fillRect(0, 0, w, h);
  x.fillStyle = 'rgba(255,255,255,0.06)';
  for (let i = 0; i < 40; i++) x.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  x.fillStyle = '#ffffff';
  x.textAlign = 'center';
  x.font = '700 76px Georgia';
  const words = o.title.split(' ');
  let line = '';
  const lines: string[] = [];
  words.forEach((word) => {
    const test = line ? line + ' ' + word : word;
    if (x.measureText(test).width > w * 0.8 && line) {
      lines.push(line);
      line = word;
    } else line = test;
  });
  if (line) lines.push(line);
  const startY = h * 0.42 - ((lines.length - 1) * 88) / 2;
  lines.forEach((l, i) => x.fillText(l, w / 2, startY + i * 88));
  x.globalAlpha = 0.85;
  x.font = 'italic 40px Georgia';
  x.fillText(o.subtitle, w / 2, startY + lines.length * 88 + 60);
  x.globalAlpha = 1;
  x.strokeStyle = 'rgba(255,255,255,0.4)';
  x.lineWidth = 3;
  x.strokeRect(60, 60, w - 120, h - 120);
}

export function paintBack(x: CanvasRenderingContext2D, w: number, h: number, o: { backBg: string; backInk: string }) {
  x.fillStyle = o.backBg;
  x.fillRect(0, 0, w, h);
  const ink = o.backInk;
  x.fillStyle = 'rgba(' + ink + ',.5)';
  rr(x, 150, 190, w - 460, 28, 14);
  x.fill();
  for (let i = 0; i < 9; i++) {
    const lw = i === 8 ? w - 560 : w - 300 - Math.random() * 180;
    x.fillStyle = 'rgba(' + ink + ',.2)';
    rr(x, 150, 300 + i * 56, lw, 15, 7);
    x.fill();
  }
  x.fillStyle = 'rgba(' + ink + ',.45)';
  x.beginPath();
  x.arc(178, h - 186, 26, 0, 6.2832);
  x.fill();
  x.fillStyle = '#fff';
  rr(x, w - 330, h - 262, 236, 152, 8);
  x.fill();
  x.fillStyle = '#111';
  let bx = w - 310;
  while (bx < w - 118) {
    const bw = 2 + Math.random() * 6;
    if (Math.random() > 0.42) x.fillRect(bx, h - 242, bw, 96);
    bx += bw + 2 + Math.random() * 4;
  }
  x.font = '500 21px Arial';
  x.textAlign = 'center';
  x.fillText('9 781234 567890', w - 212, h - 124);
  x.textAlign = 'left';
}

export function paintSpine(
  x: CanvasRenderingContext2D,
  w: number,
  h: number,
  o: { spineBg: string; spineInk: string; spineFont: string; title: string; subtitle: string },
) {
  x.fillStyle = o.spineBg;
  x.fillRect(0, 0, w, h);
  x.save();
  x.translate(w / 2, h / 2);
  x.rotate(Math.PI / 2);
  x.fillStyle = o.spineInk;
  x.font = o.spineFont;
  drawSpaced(x, o.title.toUpperCase(), -h * 0.1, 15, 6);
  x.globalAlpha = 0.85;
  x.font = '600 25px Arial';
  drawSpaced(x, o.subtitle.toUpperCase(), h * 0.325, 9, 4);
  x.globalAlpha = 1;
  x.restore();
  x.fillStyle = o.spineInk;
  x.globalAlpha = 0.6;
  x.fillRect(w / 2 - 26, 92, 52, 3);
  x.fillRect(w / 2 - 26, h - 95, 52, 3);
  x.globalAlpha = 1;
}

export function trimToWidth(x: CanvasRenderingContext2D, text: string, maxW: number) {
  if (x.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && x.measureText(t + '...').width > maxW) t = t.slice(0, -1);
  return t + '...';
}

export function makeIndexPageTex(tags?: string[]) {
  const w = 1024,
    h = 1536,
    c = mkCanvas(w, h),
    x = c.getContext('2d')!;
  x.fillStyle = '#f4efdf';
  x.fillRect(0, 0, w, h);
  x.fillStyle = 'rgba(130,110,80,0.07)';
  for (let i = 0; i < 1600; i++) x.fillRect(Math.random() * w, Math.random() * h, 1.1, 1.1);
  x.fillStyle = '#2f2a23';
  x.textAlign = 'center';
  x.font = '700 84px Georgia';
  x.fillText('INDEX', w / 2, 190);
  x.globalAlpha = 0.26;
  x.fillRect(220, 225, w - 440, 3);
  x.globalAlpha = 1;

  const list = tags && tags.length
    ? tags
    : ['Introduction', 'Main Ideas', 'Practical Lessons', 'Case Studies', 'Takeaways', 'Final Notes'];
  x.textAlign = 'left';
  x.font = '500 46px Georgia';
  let py = 350;
  list.forEach((item) => {
    x.fillStyle = 'rgba(160,140,110,0.5)';
    for (let i = 240; i < w - 240; i += 28) x.fillText('.', i, py);
    x.fillStyle = '#f4efdf';
    x.fillRect(210, py - 60, x.measureText(item).width + 30, 80);
    x.fillStyle = '#2f2a23';
    x.fillText(trimToWidth(x, item, w - 580), 220, py);
    const pnum = Math.floor(Math.random() * 200 + 1).toString();
    x.fillStyle = '#f4efdf';
    x.fillRect(w - 220 - x.measureText(pnum).width - 10, py - 60, 200, 80);
    x.fillStyle = '#8f806a';
    x.fillText(pnum, w - 220 - x.measureText(pnum).width, py);
    py += 86;
  });
  return c;
}
