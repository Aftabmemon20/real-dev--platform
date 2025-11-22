"use client";
import { useState } from "react";
import Link from "next/link";


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-linear-to-r from-slate-900 via-slate-950 to-slate-900 text-white shadow">
        <div>
            <h1 className="text-white font-bold text-center text-xl pt-3.5">WELCOME TO REAL DEVELOPERS</h1>
        </div>
           <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">Real Developers</Link>
        
        <div className="flex items-center gap-3">
          <button className="hidden md:inline-block px-3 py-1 rounded-md font-semibold bg-emerald-400 text-slate-900">Sign in</button>
           
          
        
        </div>
      </div>

      
     
    </header>
  );
}
