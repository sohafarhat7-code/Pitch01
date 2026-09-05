import React, { useEffect, useRef } from 'react';
import { SlideIndex } from '../../types';

interface Slide01IndexProps {
  onSelectSlide: (index: SlideIndex) => void;
  onOpenGoogleSlides?: () => void;
}

const DIRECTORY_ITEMS: { id: SlideIndex; num: string; label: string; tag: string }[] = [
  { id: 2, num: '01', label: 'INTERACTIVE ROLES SYSTEM', tag: '[ CAPABILITY_FLOW ]' },
  { id: 3, num: '02', label: 'AUDIENCE & CULTURE STUDY', tag: '[ RADAR_MATRIX ]' },
  { id: 4, num: '03', label: 'CRISIS BLUEPRINT', tag: '[ INTERVENTION_PROTOCOL ]' },
  { id: 5, num: '04', label: 'AI & WORKFLOW LOGISTICS', tag: '[ PRODUCTION_FEASIBILITY ]' },
  { id: 6, num: '05', label: 'CUSTOM SERVICE PACKAGES', tag: '[ CONFIGURATOR_GRID ]' },
  { id: 7, num: '06', label: 'SUBJECT ECOSYSTEM', tag: '[ TOPOLOGY_NETWORK ]' },
];

export const Slide01Index: React.FC<Slide01IndexProps> = ({ onSelectSlide, onOpenGoogleSlides }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background minimalist particle grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 36;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle coordinate grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 64;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(n.x - 1, n.y - 1, 2, 2);

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative w-full h-full min-h-screen bg-[#1B1B1B] text-[#F9F9F9] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Background canvas for architectural particle grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
      />

      {/* Top Header Console */}
      <div className="relative z-10 flex justify-between items-start border-b border-[#2C2C2C] pb-4 text-[9px] sm:text-[10px] tracking-[0.4em] text-neutral-500 font-mono">
        <div>// IDENTITY_MATRIX_INITIALIZATION</div>
        <div className="flex items-center gap-4">
          {onOpenGoogleSlides && (
            <button
              onClick={onOpenGoogleSlides}
              className="text-neutral-400 hover:text-white border border-[#333] hover:border-neutral-400 px-2 py-0.5 tracking-widest cursor-pointer transition-colors"
            >
              [ ⧉ GOOGLE SLIDES DECK ]
            </button>
          )}
          <span>SYS / LOC INITIALIZE</span>
        </div>
      </div>

      {/* Central Core Architecture Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 my-auto w-full items-end py-6">
        {/* Left Panel: Brand Signature & Discipline Vector */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          <div className="flex flex-col relative">
            <div className="text-[9px] tracking-[0.5em] text-neutral-600 mb-4 font-bold uppercase">
              // SYSTEM_CORE_SIGNATURE
            </div>

            {/* Display Typography */}
            <div className="flex flex-col space-y-1 text-white select-none">
              <div className="flex items-baseline space-x-3">
                <span className="text-neutral-600 font-normal text-xl sm:text-2xl lg:text-3xl tracking-tighter">
                  [&Sigma;]
                </span>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter font-black uppercase text-white">
                  SOHA
                </h1>
              </div>

              <div className="flex items-baseline space-x-3 pl-6 sm:pl-10">
                <span className="text-neutral-500 font-normal text-xl sm:text-2xl lg:text-3xl tracking-tighter">
                  &int;
                </span>
                <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F9F9F9] to-neutral-400 uppercase">
                  FARHAT
                </h1>
              </div>
            </div>

            {/* Integration Matrix Requisitions Tagline */}
            <div className="mt-8 pt-4 border-t border-neutral-800 border-dashed max-w-xl text-[9px] md:text-[11px] tracking-[0.3em] text-neutral-400 uppercase leading-relaxed">
              CONCEPT &times; STRATEGY &times; FORM
              <span className="text-neutral-600 block mt-1 text-[8px] tracking-[0.15em]">
                // LINKED_FLOW: CRITICAL_BALANCE_DETERMINISTIC_MODEL
              </span>
            </div>
          </div>

          {/* Strategic Operations Core */}
          <div className="max-w-xl border-l border-neutral-700 pl-5 space-y-3 text-[10px] md:text-[11px] tracking-[0.15em] text-neutral-400 uppercase leading-relaxed">
            <div>
              <span className="text-white font-bold">[ EXECUTION_PROTOCOL ]</span> &equiv;{' '}
              <span className="text-neutral-500 font-normal">IF</span> brief_input{' '}
              <span className="text-neutral-500 font-normal">THEN</span> &empty; bypass_standard_output;
            </div>
            <div>
              <span className="text-white font-bold">[ MATRIX_ALIGNMENT ]</span> &rightleftharpoons;{' '}
              <span className="text-neutral-300">SYNCHRONIZE</span> (insight_data + concept_intuition) &rarr; multi_medium_form;
            </div>

            {/* Cognitive Vector Flow Link */}
            <div className="flex flex-wrap items-center gap-2 text-[8px] tracking-widest text-neutral-500 uppercase pt-3 border-t border-neutral-800 border-dashed">
              <span className="text-white bg-neutral-800 px-2 py-0.5 border border-neutral-700">
                01 / CONCEPT
              </span>
              <span>&longrightarrow;</span>
              <span className="text-neutral-400">02 / STRATEGY</span>
              <span>&longrightarrow;</span>
              <span className="text-neutral-600">03 / FORM</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Integrated Directory Terminal Index */}
        <div className="lg:col-span-5 w-full flex lg:justify-end">
          <div className="text-[9px] text-neutral-500 space-y-4 uppercase tracking-widest font-mono w-full max-w-sm border border-[#2D2D2D] bg-[#141414] p-5 select-none">
            <div className="text-[#F9F9F9] font-normal pb-2 border-b border-neutral-800 flex justify-between items-center text-[8px] tracking-[0.4em] text-neutral-400">
              <span>// OPERATIONAL_INDEX</span>
              <span>[LOG_DIR]</span>
            </div>

            {/* Directory Channels */}
            <div className="space-y-3 pt-1">
              {DIRECTORY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectSlide(item.id)}
                  className="flex items-center justify-between group cursor-pointer py-1 px-1.5 hover:bg-[#1F1F1F] transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-neutral-600 font-normal text-[8px]">{item.num}</span>
                    <span className="text-neutral-400 transition-colors group-hover:text-white text-[10px]">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-600 group-hover:text-neutral-300">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[8px] text-neutral-600 flex justify-between">
              <span>STATE: SYNCHRONIZED</span>
              <span>CLICK_TO_NAVIGATE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 pt-4 border-t border-[#262626] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[10px] text-neutral-600">
        <div className="flex items-center gap-5">
          <a
            href="https://behance.net"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white underline tracking-tight transition-colors"
          >
            BEHANCE // https://behance.net
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white underline tracking-tight transition-colors"
          >
            INSTAGRAM // https://instagram.com
          </a>
        </div>

        <div>// SYSTEM_CORE_PLATFORM_STABLE // RUN_OPERATION_SECURE</div>
      </div>
    </section>
  );
};
