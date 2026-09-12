'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { DirectContactMeta } from '@/types/duality';
import { DIRECT_CONTACT_META } from '@/data';
import ExpressionPreviewCard from './ExpressionPreviewCard';
import {
  Download,
  Copy,
  Check,
  Mail,
  Github,
  Linkedin,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface DirectActionFooterProps {
  contact?: DirectContactMeta;
}

export default function DirectActionFooter({
  contact = DIRECT_CONTACT_META,
}: DirectActionFooterProps) {
  const [copied, setCopied] = useState(false);
  const email = contact.communicationChannels.directEmail;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer
      aria-labelledby="contact-heading"
      className="w-full pt-12 pb-20 md:pb-28"
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="font-mono text-xs tracking-[0.25em] text-ochre uppercase mb-1">
            05 // FAST-TRACK COMMUNICATION &amp; HIRING
          </div>
          <h2
            id="contact-heading"
            className="font-mono text-2xl sm:text-3xl text-cream font-medium tracking-[0.06em] uppercase"
          >
            {contact.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-ochre bg-ochre/10 px-3 py-1.5 rounded border border-ochre/30">
          <Clock className="w-3.5 h-3.5" />
          <span>SLA: {contact.communicationChannels.responseSla}</span>
        </div>
      </div>

      {/* ================= DIRECT ACTION TILES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Tile 1: Download Resume */}
        <div className="p-6 rounded-lg bg-[#141210] border border-cream/10 flex flex-col justify-between hover:border-cream/25 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[10px] text-cream/40 uppercase tracking-wider">
                DOCUMENTATION
              </span>
              <FileText className="w-4 h-4 text-ochre" />
            </div>
            <h3 className="font-mono text-base font-bold text-cream mb-1">
              Official Resume (PDF)
            </h3>
            <p className="font-sans text-xs text-[#8A847C] leading-relaxed mb-6 text-justify">
              Complete chronological CV, university transcript notes, verified technical proficiencies, and project citations.
            </p>
          </div>

          <a
            href="/documents/Resume_Bagja_Iskandar_Jamil.pdf"
            download="Resume_Bagja_Iskandar_Jamil.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded bg-cream text-charcoal font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume PDF</span>
          </a>
        </div>

        {/* Tile 2: Copy Email */}
        <div className="p-6 rounded-lg bg-[#141210] border border-cream/10 flex flex-col justify-between hover:border-cream/25 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[10px] text-cream/40 uppercase tracking-wider">
                PRIMARY CONTACT
              </span>
              <Mail className="w-4 h-4 text-ochre" />
            </div>
            <h3 className="font-mono text-base font-bold text-cream mb-1">
              Direct Recruiter Inbox
            </h3>
            <div className="font-mono text-xs text-ochre tracking-wider select-all mt-1 mb-2">
              {email}
            </div>
            <p className="font-sans text-xs text-[#8A847C] leading-relaxed mb-6 text-justify">
              Direct inbox monitoring for technical interview invitations and project discussions.
            </p>
          </div>

          <button
            onClick={handleCopyEmail}
            className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
              copied
                ? 'bg-cream text-charcoal font-bold'
                : 'bg-ochre/15 text-ochre border border-ochre/30 hover:bg-ochre/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email Address</span>
              </>
            )}
          </button>
        </div>

        {/* Tile 3: Profiles & Verified Identity */}
        <div className="p-6 rounded-lg bg-[#141210] border border-cream/10 flex flex-col justify-between hover:border-cream/25 transition-colors">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="font-mono text-[10px] text-cream/40 uppercase tracking-wider">
                VERIFIED PROFILES
              </span>
              <ShieldCheck className="w-4 h-4 text-ochre" />
            </div>
            <h3 className="font-mono text-base font-bold text-cream mb-1">
              Online Footprint
            </h3>
            <p className="font-sans text-xs text-[#8A847C] leading-relaxed mb-4 text-justify">
              Explore public repositories, open-source code contributions, and professional network recommendations.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="https://linkedin.com/in/bagja-iskandar-jamil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-2.5 rounded bg-[#181614] border border-cream/10 hover:border-cream/30 text-xs font-mono text-cream transition-colors"
            >
              <span className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-ochre" />
                <span>LinkedIn Profile</span>
              </span>
              <span className="text-cream/40">&rarr;</span>
            </a>

            <a
              href="https://github.com/bagja-iskandar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-2.5 rounded bg-[#181614] border border-cream/10 hover:border-cream/30 text-xs font-mono text-cream transition-colors"
            >
              <span className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-ochre" />
                <span>GitHub Repositories</span>
              </span>
              <span className="text-cream/40">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* ================= CROSS-LENS TRANSITION BANNER (LIGHT/EXPRESSION AMBIENT PREVIEW) ================= */}
      <ExpressionPreviewCard />

      {/* ================= FOOTER TELEMETRY & SIGNATURE ================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-cream/10 font-mono text-[11px] text-cream/40">
        <div>
          BAGJA ISKANDAR JAMIL &bull; INFORMATIKA &bull; UNJANI 2025
        </div>
        <div className="text-center sm:text-right">
          DUALITY PORTFOLIO // §38 SEPARATION // ZERO FABRICATION
        </div>
      </div>
    </footer>
  );
}
