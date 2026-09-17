'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
export default function JourneyGallery({images}: {images:{src:string;alt:string}[]}) {
 const [index,setIndex]=useState(0); const dialog=useRef<HTMLDialogElement>(null); const opener=useRef<HTMLButtonElement>(null); const touch=useRef(0);
 const move=(by:number)=>setIndex(i=>(i+by+images.length)%images.length);
 useEffect(()=>{const el=dialog.current; const restore=()=>{document.body.style.overflow='';opener.current?.focus();}; el?.addEventListener('close',restore); return ()=>{el?.removeEventListener('close',restore);document.body.style.overflow='';};},[]);
 const current=images[index]; if(!current)return null;
 const previewCount=Math.min(2,images.length-1);
 return <section aria-label="Journey photographs" onTouchStart={e=>{touch.current=e.changedTouches[0].clientX;}} onTouchEnd={e=>{const delta=e.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>60)move(delta<0?1:-1);}}>
  <div className={`grid gap-3 ${images.length>1?'md:grid-cols-[2fr_1fr]':''}`}>
   <button ref={opener} type="button" aria-label="Open photo viewer" onClick={()=>{dialog.current?.showModal();document.body.style.overflow='hidden';}} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-warm-100"><Image unoptimized src={current.src} alt={current.alt} fill priority sizes="(max-width:768px) 100vw, 66vw" className="object-cover"/></button>
   {previewCount>0&&<div className={`hidden gap-3 md:grid ${previewCount>1?'md:grid-rows-2':'md:grid-rows-1'}`}>{Array.from({length:previewCount},(_,previewIndex)=>previewIndex+1).map(n=><button key={n} type="button" aria-label={'Show photo '+((index+n)%images.length+1)} onClick={()=>move(n)} className="relative overflow-hidden rounded-xl"><Image unoptimized src={images[(index+n)%images.length].src} alt={images[(index+n)%images.length].alt} fill sizes="33vw" className="object-cover"/></button>)}</div>}
  </div>
  <div className="mt-3 flex items-center justify-between gap-4"><p className="text-sm text-ink-muted" aria-live="polite">{index+1} / {images.length} · {current.alt}</p>{images.length>1&&<div className="flex gap-2"><button type="button" aria-label="Previous photo" onClick={()=>move(-1)} className="h-11 w-11 rounded-full border border-warm-200">←</button><button type="button" aria-label="Next photo" onClick={()=>move(1)} className="h-11 w-11 rounded-full border border-warm-200">→</button></div>}</div>
  <dialog ref={dialog} aria-label="Tour photo viewer" className="w-[95vw] max-w-6xl rounded-xl bg-ink p-4 text-white backdrop:bg-black/80" onKeyDown={e=>{if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1);}}><div className="flex justify-between gap-4"><p>{current.alt}</p><button type="button" autoFocus onClick={()=>dialog.current?.close()} className="min-h-11 px-4">Close ×</button></div><div className="relative h-[65vh]"><Image unoptimized src={current.src} alt={current.alt} fill sizes="95vw" className="object-contain"/></div><div className="flex items-center justify-between"><button type="button" onClick={()=>move(-1)} className="min-h-11 px-4">← Previous</button><span aria-live="polite">{index+1} / {images.length}</span><button type="button" onClick={()=>move(1)} className="min-h-11 px-4">Next →</button></div></dialog>
 </section>;
}
