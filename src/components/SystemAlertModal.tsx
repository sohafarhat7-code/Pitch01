import React from 'react';

interface SystemAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export const SystemAlertModal: React.FC<SystemAlertModalProps> = ({
  isOpen,
  onClose,
  title = 'SECURITY_NOTIFICATION',
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
    >
      <div className="w-full max-w-lg bg-[#181818] border border-[#3E3E3E] p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center justify-between pb-3 border-b border-[#2C2C2C] text-[11px] font-mono text-[#888888] tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#CCCCCC] inline-block" />
            <span>// {title}</span>
          </div>
          <span>CODE_PROTOCOL: SECURE</span>
        </div>

        <div className="py-6 font-mono text-[13px] leading-relaxed text-[#E5E5E5] tracking-tight">
          {message}
        </div>

        <div className="flex justify-end pt-4 border-t border-[#2C2C2C]">
          <button
            onClick={onClose}
            className="border border-[#4A4A4A] bg-[#222222] hover:bg-[#2F2F2F] text-[#E0E0E0] px-4 py-1.5 text-[11px] font-mono cursor-pointer transition-colors"
          >
            [ ACKNOWLEDGE // CLOSE ]
          </button>
        </div>
      </div>
    </div>
  );
};
