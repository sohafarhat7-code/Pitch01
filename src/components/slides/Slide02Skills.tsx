import React, { useEffect, useRef, useState } from 'react';

interface Slide02SkillsProps {
  onOpenBehance: (title: string) => void;
}

type Mode = 'BALANCED' | 'STRATEGY' | 'CREATIVE' | 'EXECUTION';

export const Slide02Skills: React.FC<Slide02SkillsProps> = ({ onOpenBehance }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<Mode>('BALANCED');

  // Animation values for smooth morphing between graph coordinate states
  const animProgress = useRef<{
    strat: number;
    cd: number;
    exec: number;
  }>({
    strat: 0.82,
    cd: 0.94,
    exec: 0.78,
  });

  const targetWeights = useRef<{
    strat: number;
    cd: number;
    exec: number;
  }>({
    strat: 0.82,
    cd: 0.94,
    exec: 0.78,
  });

  const handleToggleMode = (mode: Mode) => {
    setActiveMode(mode);
    if (mode === 'STRATEGY') {
      targetWeights.current = { strat: 0.98, cd: 0.65, exec: 0.45 };
    } else if (mode === 'CREATIVE') {
      targetWeights.current = { strat: 0.58, cd: 0.99, exec: 0.62 };
    } else if (mode === 'EXECUTION') {
      targetWeights.current = { strat: 0.42, cd: 0.70, exec: 0.96 };
    } else {
      targetWeights.current = { strat: 0.82, cd: 0.94, exec: 0.78 };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const render = () => {
      t += 0.02;

      // Smooth interpolation toward target weights
      const p = animProgress.current;
      const tg = targetWeights.current;
      p.strat += (tg.strat - p.strat) * 0.08;
      p.cd += (tg.cd - p.cd) * 0.08;
      p.exec += (tg.exec - p.exec) * 0.08;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw subtle technical graph grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      const cols = 8;
      const rows = 6;
      for (let i = 0; i <= cols; i++) {
        const x = (w / cols) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const y = (h / rows) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw coordinate axis markers
      ctx.fillStyle = '#888888';
      ctx.font = '10px Courier Prime, monospace';
      ctx.fillText('Y // CAPACITY_YIELD (0 - 100%)', 10, 16);
      ctx.fillText('X // TIMELINE_DISPATCH_NODES [T0 → T7]', w - 240, h - 10);

      // Helper function to draw dynamic intersecting line path
      const drawPath = (
        amplitude: number,
        freq: number,
        phase: number,
        weight: number,
        style: 'solid' | 'dashed' | 'dotted',
        label: string,
        strokeColor: string
      ) => {
        ctx.save();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        if (style === 'dashed') ctx.setLineDash([6, 4]);
        if (style === 'dotted') ctx.setLineDash([2, 3]);

        ctx.beginPath();
        const points: { x: number; y: number }[] = [];
        const stepCount = 50;

        for (let i = 0; i <= stepCount; i++) {
          const x = (w / stepCount) * i;
          const normalizedX = i / stepCount;
          const baseY = h * 0.85 - h * 0.65 * weight;
          const wave =
            Math.sin(normalizedX * freq * Math.PI * 2 + phase + t) * amplitude * h * 0.12 +
            Math.cos(normalizedX * (freq * 0.5) * Math.PI + t * 0.5) * 12;
          const y = baseY + wave;
          points.push({ x, y });
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw coordinate keypoint intersections
        ctx.setLineDash([]);
        for (let i = 5; i < points.length; i += 12) {
          const pt = points[i];
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(pt.x - 3, pt.y - 3, 6, 6);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(pt.x - 3, pt.y - 3, 6, 6);

          // Numeric node coordinates
          ctx.fillStyle = '#333333';
          ctx.font = '9px Courier Prime, monospace';
          ctx.fillText(`(${Math.round(pt.x)}, ${Math.round(pt.y)})`, pt.x + 6, pt.y - 4);
        }

        // Label on the right edge
        const lastPt = points[points.length - 1];
        ctx.fillStyle = strokeColor;
        ctx.font = '11px Courier Prime, monospace';
        ctx.fillText(`[ ${label}: ${Math.round(weight * 100)}% ]`, w - 210, lastPt.y - 6);

        ctx.restore();
      };

      // 1. STRATEGY (Solid black)
      drawPath(0.35, 1.2, 0.4, p.strat, 'solid', 'STRATEGY', '#1B1B1B');

      // 2. CREATIVE DIRECTION (Dashed charcoal)
      drawPath(0.45, 1.6, 1.8, p.cd, 'dashed', 'CREATIVE DIRECTION', '#444444');

      // 3. SHOOTING & CONTENT EXECUTION (Dotted slate)
      drawPath(0.55, 2.1, 3.2, p.exec, 'dotted', 'SHOOTING & EXECUTION', '#777777');

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative w-full h-full min-h-screen bg-[#F3F3F3] text-[#1B1B1B] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Top Header / Spec Tracker */}
      <div className="flex justify-between items-start border-b border-[#D8D8D8] pb-4 text-[11px] text-[#666666] tracking-wider">
        <div>
          <span className="text-[#999999]">// SECTION_02 // </span>
          <span>CAPACITY MATRIX // INTERSECTING DISCIPLINE PATHS</span>
        </div>
        <div className="text-right hidden sm:block text-[#888888]">
          <span>CANVAS_PROJECTION: DYNAMIC_COORDINATE_RECALCULATION</span>
        </div>
      </div>

      {/* Main Title & Action Boxes */}
      <div className="my-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#1B1B1B] uppercase">
              CAPACITY MATRIX
            </h2>
            <div className="text-[11px] text-[#555555] tracking-tight mt-1">
              LIVE SYSTEM COEFFICIENTS TRACKING MULTI-ROLE REBALANCING PER CLIENT PIPELINE
            </div>
          </div>

          {/* 3 Clean, Border-only Monospace Action Boxes */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <button
              onClick={() => handleToggleMode(activeMode === 'STRATEGY' ? 'BALANCED' : 'STRATEGY')}
              className={`border px-3 py-1.5 cursor-pointer transition-colors ${
                activeMode === 'STRATEGY'
                  ? 'border-[#1B1B1B] bg-[#1B1B1B] text-[#F3F3F3]'
                  : 'border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#E5E5E5]'
              }`}
            >
              [VOID: STRATEGY DESIGN]
            </button>

            <button
              onClick={() => handleToggleMode(activeMode === 'CREATIVE' ? 'BALANCED' : 'CREATIVE')}
              className={`border px-3 py-1.5 cursor-pointer transition-colors ${
                activeMode === 'CREATIVE'
                  ? 'border-[#1B1B1B] bg-[#1B1B1B] text-[#F3F3F3]'
                  : 'border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#E5E5E5]'
              }`}
            >
              [VOID: CREATIVE DIRECTION]
            </button>

            <button
              onClick={() => handleToggleMode(activeMode === 'EXECUTION' ? 'BALANCED' : 'EXECUTION')}
              className={`border px-3 py-1.5 cursor-pointer transition-colors ${
                activeMode === 'EXECUTION'
                  ? 'border-[#1B1B1B] bg-[#1B1B1B] text-[#F3F3F3]'
                  : 'border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#E5E5E5]'
              }`}
            >
              [VOID: SHOOTING &amp; EXECUTION]
            </button>
          </div>
        </div>

        {/* Interactive HTML5 Canvas Coordinate Line Graph */}
        <div className="w-full h-72 sm:h-80 md:h-96 border border-[#CCCCCC] bg-[#FFFFFF] relative shadow-xs">
          <div className="absolute top-2 right-3 text-[10px] text-[#888888] tracking-widest pointer-events-none">
            MODE: {activeMode} // RECALCULATING_LIVE
          </div>
          <canvas
            ref={canvasRef}
            width={1200}
            height={480}
            className="w-full h-full object-fill"
          />
        </div>

        {/* Deliverables Monospace Ledger */}
        <div className="mt-5 border border-[#CCCCCC] bg-[#EAEAEA] p-4 text-[11px] text-[#222222] space-y-1.5">
          <div className="text-[10px] text-[#777777] uppercase tracking-wider mb-1">
            // DELIVERABLES MONOSPACE LEDGER:
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#555555]">&lt;CD&gt;</span>
            <span className="tracking-tight">Social Multi-Channel Creative Direction &amp; Shooting Direction</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#555555]">&lt;STRAT&gt;</span>
            <span className="tracking-tight">Brand Strategy &amp; Structural Rebranding</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#555555]">&lt;EXECUTION&gt;</span>
            <span className="tracking-tight">Video Editing, Motion Graphics &amp; Animation Loops</span>
          </div>
        </div>
      </div>

      {/* Action Element Link at Bottom Margin */}
      <div className="pt-3 border-t border-[#D8D8D8] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px]">
        <button
          onClick={() => onOpenBehance('OODI_RAMADAN_360_CAMPAIGN_BEHANCE')}
          className="text-[#1B1B1B] hover:underline cursor-pointer tracking-tight transition-all text-left"
        >
          🔗 [ VALIDATE_NODE_00 // OODI_RAMADAN_360_CAMPAIGN_BEHANCE ]
        </button>

        <div className="text-[10px] text-[#888888]">
          EMBED_STATE: VERIFIED // CLIENT_ID: OODI_TELECOM
        </div>
      </div>
    </section>
  );
};
