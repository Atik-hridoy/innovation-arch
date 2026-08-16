export function GlobalOverlays() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] rounded-full bg-radial from-primary/5 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-radial from-emerald-600/5 via-transparent to-transparent blur-3xl" />
    </div>
  );
}
