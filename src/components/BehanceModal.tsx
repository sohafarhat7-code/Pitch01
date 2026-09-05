import React from 'react';

interface BehanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const BehanceModal: React.FC<BehanceModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6"
    >
      <div className="w-full max-w-5xl h-[85vh] bg-[#161616] border border-[#3A3A3A] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1B1B1B] border-b border-[#2E2E2E] text-[11px] font-mono tracking-wider">
          <div className="flex items-center space-x-3 text-[#A0A0A0]">
            <span className="w-2 h-2 rounded-full bg-[#888888] inline-block" />
            <span className="text-[#E0E0E0]">{title}</span>
            <span className="text-[#666666]">{'//'} EMBED_TARGET: BEHANCE.NET</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#999999] hover:text-[#FFFFFF] border border-[#3A3A3A] px-2 py-0.5 text-[11px] font-mono cursor-pointer transition-colors"
          >
            [ × CLOSE_VIEW ]
          </button>
        </div>

        {/* Iframe Viewport */}
        <div className="relative flex-1 w-full h-full bg-[#111111]">
          <iframe
            src="https://behance.net"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
            title="Behance Validation Embed"
          />
        </div>

        {/* Bottom Status Tally */}
        <div className="px-4 py-2 bg-[#1B1B1B] border-t border-[#2E2E2E] flex justify-between items-center text-[10px] font-mono text-[#777777]">
          <span>STATUS: SECURE_SANDBOX_LOADED</span>
          <span>SRC: HTTPS://BEHANCE.NET</span>
        </div>
      </div>
    </div>
  );
};
