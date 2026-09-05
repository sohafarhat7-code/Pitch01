import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QrCodeRendererProps {
  url: string;
  label: string;
  index: number;
}

export const QrCodeRenderer: React.FC<QrCodeRendererProps> = ({ url, label, index }) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(url, {
      margin: 1,
      width: 140,
      color: {
        dark: '#F3F3F3',
        light: '#1B1B1B',
      },
    })
      .then((res) => {
        if (isMounted) setDataUrl(res);
      })
      .catch((err) => {
        console.error('QR code generation error:', err);
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div className="flex flex-col items-center border border-[#333333] p-3 bg-[#161616]">
      <div className="w-full flex justify-between items-center text-[10px] text-[#888888] font-mono mb-2 pb-1 border-b border-[#2A2A2A]">
        <span>SCAN_TGT_0{index}</span>
        <span>INSTAGRAM_FEED</span>
      </div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-[#1B1B1B] border border-[#262626] overflow-hidden">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={label}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <div className="text-[10px] font-mono text-[#555555] animate-pulse">
            LOADING_QR
          </div>
        )}
      </div>
      <div className="w-full mt-2 text-center">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-mono text-[#AAAAAA] hover:text-[#FFFFFF] underline tracking-tight"
        >
          {label}
        </a>
      </div>
    </div>
  );
};
