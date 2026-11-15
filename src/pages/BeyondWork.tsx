import { useState } from "react";
import { PageContainer, SectionHeader } from "@/components/ui";
import { BOOKS, PHOTOS, type Photo } from "@/data";
import { UI_RECIPE_TOKENS } from "@/design";

function PhotoLightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  return <div role="dialog" aria-modal="true" aria-label="Photography preview" className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-5" onClick={onClose}><button type="button" className="focus-ring absolute right-5 top-5 text-white" onClick={onClose}>Close</button><img src={photo.src} alt={photo.alt} className="max-h-[88vh] max-w-full object-contain" /></div>;
}

export default function BeyondWork() {
  const [selected, setSelected] = useState<Photo | null>(null);
  const themes = [...new Set(BOOKS.map(({ theme }) => theme))];
  return <PageContainer variant="wide"><SectionHeader title="BEYOND WORK" description="Photography and a library of useful ideas." />
    <section id="photography" aria-labelledby="photography-title" className="scroll-mt-24 border-t border-[var(--surface-border)] pt-6"><h2 id="photography-title" className="text-3xl">Photography</h2>{PHOTOS.length ? <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">{PHOTOS.map((photo) => <button key={photo.src} type="button" className="focus-ring mb-4 block w-full break-inside-avoid" onClick={() => setSelected(photo)}><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="w-full" /></button>)}</div> : <p className={UI_RECIPE_TOKENS.bodySupport}>Coming soon — real photographs will be added here.</p>}</section>
    <section id="library" aria-labelledby="library-title" className="mt-14 scroll-mt-24 border-t border-[var(--surface-border)] pt-6"><h2 id="library-title" className="text-3xl">Library</h2>{themes.length ? <div className="mt-6 space-y-8">{themes.map((theme) => <div key={theme}><h3 className="text-xl">{theme}</h3><ul className="mt-3 space-y-4">{BOOKS.filter((book) => book.theme === theme).map((book) => <li key={book.title}><p className="font-medium">{book.title} — {book.creator}</p><p className={UI_RECIPE_TOKENS.bodySupport}>{book.takeaway}</p></li>)}</ul></div>)}</div> : <p className={UI_RECIPE_TOKENS.bodySupport}>Coming soon — books and courses with takeaways will be added here.</p>}</section>
    {selected ? <PhotoLightbox photo={selected} onClose={() => setSelected(null)} /> : null}
  </PageContainer>;
}
