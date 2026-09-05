import React, { useEffect, useRef, useState } from 'react';

interface Slide03AudienceProps {
  onOpenBehance: (title: string) => void;
}

interface GeopoliticalZone {
  id: string;
  name: string;
  subtitle: string;
  angle: number; // in degrees
  distance: number; // 0 to 1 normalized radius
  coords: string;
  demographic: string;
}

const ZONES: GeopoliticalZone[] = [
  {
    id: 'IRAQ',
    name: 'IRAQ',
    subtitle: 'OODI Strategy',
    angle: 35,
    distance: 0.62,
    coords: '33.3152° N, 44.3661° E',
    demographic: 'AGE: 18-34 // TELECOM_PENETRATION: 89%',
  },
  {
    id: 'UAE',
    name: 'UAE',
    subtitle: 'VINFAST Deployment',
    angle: 110,
    distance: 0.78,
    coords: '25.2048° N, 55.2708° E',
    demographic: 'AGE: 22-45 // EV_ADOPTION_CURVE: EXPONENTIAL',
  },
  {
    id: 'KUWAIT',
    name: 'KUWAIT',
    subtitle: 'Multi-Channel Rebranding Architecture',
    angle: 165,
    distance: 0.52,
    coords: '29.3759° N, 47.9774° E',
    demographic: 'AGE: 20-40 // OMNICHANNEL_SURVEY_PULSE',
  },
  {
    id: 'LEBANON',
    name: 'LEBANON',
    subtitle: 'Beirut Identity Art',
    angle: 235,
    distance: 0.38,
    coords: '33.8938° N, 35.5018° E',
    demographic: 'AGE: 18-45 // VISUAL_DECONSTRUCT_RESONANCE',
  },
  {
    id: 'USA',
    name: 'USA',
    subtitle: 'Global Market Trends',
    angle: 310,
    distance: 0.90,
    coords: '40.7128° N, 74.0060° W',
    demographic: 'AGE: 18-35 // GLOBAL_CULTURE_INTERSECT',
  },
];

export const Slide03Audience: React.FC<Slide03AudienceProps> = ({ onOpenBehance }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedZone, setSelectedZone] = useState<GeopoliticalZone>(ZONES[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let sweepAngle = 0;

    const render = () => {
      sweepAngle = (sweepAngle + 0.02) % (Math.PI * 2);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) - 24;

      ctx.clearRect(0, 0, w, h);

      // Radar Concentric Circles
      const rings = [0.25, 0.5, 0.75, 1.0];
      rings.forEach((rRatio, idx) => {
        const r = maxR * rRatio;
        ctx.strokeStyle = idx === rings.length - 1 ? '#444444' : '#2A2A2A';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Ring distance label
        ctx.fillStyle = '#555555';
        ctx.font = '9px Courier Prime, monospace';
        ctx.fillText(`RANGE // ${(rRatio * 100).toFixed(0)}%`, cx + 6, cy - r + 12);
      });

      // Crosshairs
      ctx.strokeStyle = '#2D2D2D';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.stroke();

      // Degree Markers around the perimeter
      for (let deg = 0; deg < 360; deg += 30) {
        const rad = (deg * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * maxR;
        const y1 = cy + Math.sin(rad) * maxR;
        const x2 = cx + Math.cos(rad) * (maxR - 8);
        const y2 = cy + Math.sin(rad) * (maxR - 8);

        ctx.strokeStyle = '#3A3A3A';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.fillStyle = '#666666';
        ctx.font = '8px Courier Prime, monospace';
        const lx = cx + Math.cos(rad) * (maxR + 14);
        const ly = cy + Math.sin(rad) * (maxR + 14);
        ctx.fillText(`${deg}°`, lx - 8, ly + 3);
      }

      // Radar Sweep Ray
      ctx.save();
      const sweepX = cx + Math.cos(sweepAngle) * maxR;
      const sweepY = cy + Math.sin(sweepAngle) * maxR;

      // Sweep line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // Faded trailing sector
      const sectorSteps = 24;
      for (let s = 0; s < sectorSteps; s++) {
        const a1 = sweepAngle - (s / sectorSteps) * 0.5;
        const a2 = sweepAngle - ((s + 1) / sectorSteps) * 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.08 * (1 - s / sectorSteps)})`;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, a2, a1);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Draw Zone Nodes
      ZONES.forEach((zone) => {
        const rad = (zone.angle * Math.PI) / 180;
        const r = maxR * zone.distance;
        const zx = cx + Math.cos(rad) * r;
        const zy = cy + Math.sin(rad) * r;

        const isSelected = selectedZone.id === zone.id;

        // Connecting radial ray
        ctx.strokeStyle = isSelected ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(zx, zy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Target Reticle
        ctx.strokeStyle = isSelected ? '#FFFFFF' : '#888888';
        ctx.lineWidth = isSelected ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(zx, zy, isSelected ? 8 : 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = isSelected ? '#FFFFFF' : '#666666';
        ctx.fillRect(zx - 2, zy - 2, 4, 4);

        // Label
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#888888';
        ctx.font = '10px Courier Prime, monospace';
        ctx.fillText(`${zone.name}`, zx + 10, zy - 2);

        ctx.fillStyle = '#666666';
        ctx.font = '8px Courier Prime, monospace';
        ctx.fillText(`[ ${zone.subtitle} ]`, zx + 10, zy + 9);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [selectedZone]);

  return (
    <section className="relative w-full h-full min-h-screen bg-[#1B1B1B] text-[#F3F3F3] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Top Ledger Bar */}
      <div className="flex justify-between items-start border-b border-[#2D2D2D] pb-4 text-[11px] text-[#777777] tracking-wider">
        <div>
          <span>// SECTION_03 // GEOPOLITICAL_FOOTPRINT_RADAR</span>
        </div>
        <div className="text-right hidden sm:block text-[#666666]">
          <span>AZIMUTH_TRACKING: 360_CIRCULAR_LOOP</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-4">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#F3F3F3] uppercase mb-4">
          AUDIENCE × CULTURE STUDY
        </h2>

        {/* Infographic Layout: Radar Chart on Left, Data Tally & Selection on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Pure Geometric Crosshair Radar Target Chart */}
          <div className="lg:col-span-7 flex flex-col items-center border border-[#2B2B2B] bg-[#141414] p-4 relative">
            <div className="w-full flex justify-between text-[10px] text-[#666666] mb-2">
              <span>CIRCULAR_TARGET_MATRIX: ACTIVE</span>
              <span>POLAR_COORDINATES: CONTINUOUS</span>
            </div>

            <div className="w-full max-w-[440px] aspect-square flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full mt-2 pt-2 border-t border-[#222222] flex flex-wrap gap-2 justify-center">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-2 py-1 text-[10px] border cursor-pointer transition-colors ${
                    selectedZone.id === zone.id
                      ? 'border-[#FFFFFF] bg-[#2E2E2E] text-white'
                      : 'border-[#333333] text-[#888888] hover:text-[#CCCCCC]'
                  }`}
                >
                  [{zone.name}]
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Side Monospace Data Tally Block & Zone Inspector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Side Monospace Data Tally Block */}
            <div className="border border-[#2F2F2F] bg-[#171717] p-4 text-[11px] leading-relaxed text-[#B5B5B5] tracking-tight">
              <div className="text-[10px] text-[#777777] mb-2 uppercase tracking-widest">
                // MONOSPACE DATA TALLY:
              </div>
              <p className="font-mono m-0 text-[11px] text-[#B5B5B5]">
                // AUDIENCE PROTOCOLS: EMPLOYING PROACTIVE AI DATA MANAGEMENT PLATFORMS TO RUN FAST PROGRESSIVE BEHAVIOR SURVEYS ACROSS KEY REGIONAL DEMOGRAPHICS AGES (18-45) TO BYPASS GENERIC REPETITIVE PIPELINES.
              </p>
            </div>

            {/* Active Footprint Zone Telemetry Card */}
            <div className="border border-[#2F2F2F] bg-[#151515] p-4 text-[11px] space-y-2">
              <div className="text-[10px] text-[#777777] tracking-wider uppercase border-b border-[#282828] pb-1">
                // TARGET_LOCK_TELEMETRY: {selectedZone.name}
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">SUB_PROGRAM:</span>
                <span className="text-[#CCCCCC]">{selectedZone.subtitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">AZIMUTH_BEARING:</span>
                <span className="text-[#CCCCCC]">{selectedZone.angle}° / DIST: {(selectedZone.distance * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">COORDINATES:</span>
                <span className="text-[#CCCCCC]">{selectedZone.coords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666666]">METRIC_PULSE:</span>
                <span className="text-[#CCCCCC]">{selectedZone.demographic}</span>
              </div>
            </div>

            {/* Bottom Reference Link */}
            <div className="text-[11px]">
              <a
                href="https://pin.it"
                target="_blank"
                rel="noreferrer"
                className="text-[#888888] hover:text-[#FFFFFF] underline tracking-tight transition-colors inline-block"
              >
                🔗 [ VISUAL_REF_00 // https://pin.it ]
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Action Element at Bottom Margin */}
      <div className="pt-3 border-t border-[#2D2D2D] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px]">
        <button
          onClick={() => onOpenBehance('RE_SOCIAL_IDENTITY_BEHANCE')}
          className="text-[#CCCCCC] hover:text-white hover:underline cursor-pointer tracking-tight transition-all text-left"
        >
          🔗 [ VALIDATE_NODE_01 // RE_SOCIAL_IDENTITY_BEHANCE ]
        </button>

        <div className="text-[10px] text-[#666666]">
          TARGET_VALIDATION: BEHANCE_PORTFOLIO_LINK // LAUNCH_IFRAME
        </div>
      </div>
    </section>
  );
};
