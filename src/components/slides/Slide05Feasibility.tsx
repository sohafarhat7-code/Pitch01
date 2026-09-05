import React, { useState } from 'react';

export const Slide05Feasibility: React.FC = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <section className="relative w-full h-full min-h-screen bg-[#F3F3F3] text-[#1B1B1B] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Top Ledger Bar */}
      <div className="flex justify-between items-start border-b border-[#D8D8D8] pb-4 text-[11px] text-[#666666] tracking-wider">
        <div>
          <span>// SECTION_05 // WORKFLOW_FEASIBILITY // HUMAN_INTEGRITY_INDEX</span>
        </div>
        <div className="text-right hidden sm:block text-[#888888]">
          <span>ALLOCATION_DIAGNOSTICS: RIGID_MONITORING</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-4">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#1B1B1B] uppercase mb-6">
          PRODUCTION FEASIBILITY LOG
        </h2>

        {/* Visual Infographic: Two Stark Graphic Metric Data Bars Stacking Pipeline Mechanics */}
        <div className="space-y-6 max-w-4xl">
          {/* BAR 01: ASSISTANCE LOGISTICS (100% CAPACITY) */}
          <div
            onMouseEnter={() => setHoveredBar(1)}
            onMouseLeave={() => setHoveredBar(null)}
            className="border border-[#1B1B1B] bg-[#FFFFFF] p-5 shadow-xs transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <span className="text-[12px] font-bold text-[#1B1B1B] tracking-tight">
                BAR 01 // ASSISTANCE LOGISTICS / PRODUCTION SCHEDULING PLATFORMS UTILITY
              </span>
              <span className="text-[12px] font-mono text-[#000000] font-bold">
                [ 100% FULL CAPACITY ]
              </span>
            </div>

            {/* Stark 100% Solid/Segmented Bar */}
            <div className="w-full h-10 bg-[#E0E0E0] border border-[#1B1B1B] p-1 flex gap-0.5 overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#1B1B1B] h-full"
                  style={{ opacity: 0.85 + (i % 3) * 0.07 }}
                />
              ))}
            </div>

            <div className="flex justify-between text-[10px] text-[#555555] mt-2 pt-1 border-t border-[#EAEAEA]">
              <span>UTILITY: AUTOMATED_CALENDAR // RESOURCE_ROUTING // ASSET_DISPATCH</span>
              <span>EFFICIENCY_MULTIPLIER: 4.8X</span>
            </div>
          </div>

          {/* BAR 02: AI CONCEPT FORMULATION (0% LOCKDOWN) */}
          <div
            onMouseEnter={() => setHoveredBar(2)}
            onMouseLeave={() => setHoveredBar(null)}
            className="border border-[#1B1B1B] bg-[#FFFFFF] p-5 shadow-xs transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <span className="text-[12px] font-bold text-[#1B1B1B] tracking-tight">
                BAR 02 // AI CONCEPT FORMULATION / CREATIVE IDEATION ART
              </span>
              <span className="text-[12px] font-mono text-[#555555]">
                [ 0% COMPLETE LOCKDOWN GRID ]
              </span>
            </div>

            {/* Stark 0% Lockdown Grid Bar */}
            <div className="relative w-full h-10 bg-[#F0F0F0] border border-[#1B1B1B] overflow-hidden flex items-center justify-center">
              {/* Lockdown diagonal wireframe grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 8px)',
                }}
              />
              <span className="relative z-10 text-[11px] font-mono tracking-widest text-[#1B1B1B] uppercase bg-[#F3F3F3] px-3 py-0.5 border border-[#1B1B1B]">
                // ZERO_AUTHORIZATION // RIGID_HUMAN_LOCKOUT_ZONE //
              </span>
            </div>

            <div className="flex justify-between text-[10px] text-[#555555] mt-2 pt-1 border-t border-[#EAEAEA]">
              <span>CONCEPT_ORIGIN: 100% HUMAN_ART_DIRECTION</span>
              <span>SYNTHETIC_GENERATION: STRICTLY_PROHIBITED</span>
            </div>
          </div>
        </div>

        {/* Technical Monospace Tallies */}
        <div className="mt-8 max-w-4xl border border-[#CCCCCC] bg-[#EAEAEA] p-5 space-y-2 text-[11px] text-[#222222] leading-relaxed">
          <div className="text-[10px] text-[#777777] uppercase tracking-wider mb-1">
            // TECHNICAL MONOSPACE TALLIES:
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#000000]">•</span>
            <p className="m-0 font-mono text-[11px] tracking-tight">
              CREATIVE INTEGRITY: ALL CONCEPT INTUITION, VISUAL IMAGINATION, AND ART DIRECTION REMAIN RIGIDLY HUMAN.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#000000]">•</span>
            <p className="m-0 font-mono text-[11px] tracking-tight">
              AUTOMATION LOOPS: AI IS EMPLOYED EXCLUSIVELY AS A MECHANISM FOR VELOCITY, PLATFORM SCHEDULING, AND TIME SAVINGS.
            </p>
          </div>
        </div>

        {/* Bottom Reference Link */}
        <div className="mt-4 text-[11px]">
          <a
            href="https://pin.it"
            target="_blank"
            rel="noreferrer"
            className="text-[#555555] hover:text-[#000000] underline tracking-tight transition-colors inline-block"
          >
            🔗 [ VISUAL_REF_02 // https://pin.it ]
          </a>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="pt-3 border-t border-[#D8D8D8] flex justify-between items-center text-[10px] text-[#777777]">
        <span>SLIDE_05 // FEASIBILITY_INDEX</span>
        <span>HUMAN_ORIGINATION_COEFFICIENT: 1.0000</span>
      </div>
    </section>
  );
};
