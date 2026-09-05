import React, { useState, useId } from 'react';

interface Slide06ConfiguratorProps {
  onTriggerAlert: (message: string, title?: string) => void;
}

interface DeliverableItem {
  id: string;
  name: string;
  condition: (strat: number, cd: number, exec: number) => boolean;
  reqText: string;
}

const DELIVERABLES: DeliverableItem[] = [
  {
    id: 'd1',
    name: 'Brand Rebranding & Consumer Insights',
    condition: (s) => s >= 40,
    reqText: 'REQ: STRAT >= 40',
  },
  {
    id: 'd2',
    name: 'Multi-Channel Art Direction',
    condition: (_, c) => c >= 35,
    reqText: 'REQ: CD >= 35',
  },
  {
    id: 'd3',
    name: 'Video Compositing & Kinetic Loops',
    condition: (_, __, e) => e >= 40,
    reqText: 'REQ: EXEC >= 40',
  },
  {
    id: 'd4',
    name: 'Camera Shooting & Production Logistics',
    condition: (_, __, e) => e >= 60,
    reqText: 'REQ: EXEC >= 60',
  },
  {
    id: 'd5',
    name: 'Product Innovation & Packaging',
    condition: (s, c) => s >= 50 && c >= 50,
    reqText: 'REQ: STRAT >= 50 & CD >= 50',
  },
  {
    id: 'd6',
    name: 'Content Workflow Calendars',
    condition: (s, _, e) => s >= 30 || e >= 40,
    reqText: 'REQ: STRAT >= 30 | EXEC >= 40',
  },
];

export const Slide06Configurator: React.FC<Slide06ConfiguratorProps> = ({ onTriggerAlert }) => {
  const [strategy, setStrategy] = useState<number>(75);
  const [creativeDir, setCreativeDir] = useState<number>(85);
  const [execution, setExecution] = useState<number>(60);
  const [extraSpecs, setExtraSpecs] = useState<string>('');

  const stratInputId = useId();
  const cdInputId = useId();
  const execInputId = useId();
  const specsInputId = useId();

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerAlert(
      'Configuration Target Profile Matrix successfully logged and transmitted to Soha Farhat device networks.',
      'TARGET_PROFILE_COMMITTED'
    );
  };

  return (
    <section className="relative w-full h-full min-h-screen bg-[#1B1B1B] text-[#F3F3F3] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Top Header */}
      <div className="flex justify-between items-start border-b border-[#2D2D2D] pb-4 text-[11px] text-[#777777] tracking-wider">
        <div>
          <span>// SECTION_06 // SCOPE_CALCULATOR // 3_AXIS_PARAMETER_MATRIX</span>
        </div>
        <div className="text-right hidden sm:block text-[#666666]">
          <span>COORDINATE_SYSTEM: DYNAMIC_DELIVERABLE_RESOLVER</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-4">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#F3F3F3] uppercase mb-4">
          REQUEST CONFIGURATOR
        </h2>

        {/* 2-Column Grid: 3-Axis Slider Block on Left, Live Deliverables Checklist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 3-Axis Slider Input Block */}
          <div className="lg:col-span-6 border border-[#2F2F2F] bg-[#151515] p-5 space-y-5">
            <div className="flex justify-between text-[10px] text-[#777777] border-b border-[#252525] pb-2">
              <span>// 3-AXIS INPUT PARAMETERS</span>
              <span>CALIBRATION: REALTIME</span>
            </div>

            {/* Slider 1: Strategy */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <label htmlFor={stratInputId} className="text-[#CCCCCC]">AXIS 01 // STRATEGY</label>
                <span className="text-[#FFFFFF]">{strategy}%</span>
              </div>
              <input
                id={stratInputId}
                type="range"
                min={0}
                max={100}
                value={strategy}
                onChange={(e) => setStrategy(Number(e.target.value))}
                className="w-full accent-white h-1.5 bg-[#333333] cursor-pointer appearance-none"
              />
              <div className="flex justify-between text-[9px] text-[#666666]">
                <span>0 // BASELINE</span>
                <span>50 // STRUCTURAL</span>
                <span>100 // FULL_TRANSFORMATION</span>
              </div>
            </div>

            {/* Slider 2: Creative Direction */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <label htmlFor={cdInputId} className="text-[#CCCCCC]">AXIS 02 // CREATIVE DIRECTION</label>
                <span className="text-[#FFFFFF]">{creativeDir}%</span>
              </div>
              <input
                id={cdInputId}
                type="range"
                min={0}
                max={100}
                value={creativeDir}
                onChange={(e) => setCreativeDir(Number(e.target.value))}
                className="w-full accent-white h-1.5 bg-[#333333] cursor-pointer appearance-none"
              />
              <div className="flex justify-between text-[9px] text-[#666666]">
                <span>0 // DORMANT</span>
                <span>50 // UNIFIED_ART_GUIDE</span>
                <span>100 // 360_CONCEPT_DOMINANCE</span>
              </div>
            </div>

            {/* Slider 3: Shooting & Content Execution */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <label htmlFor={execInputId} className="text-[#CCCCCC]">AXIS 03 // SHOOTING &amp; EXECUTION</label>
                <span className="text-[#FFFFFF]">{execution}%</span>
              </div>
              <input
                id={execInputId}
                type="range"
                min={0}
                max={100}
                value={execution}
                onChange={(e) => setExecution(Number(e.target.value))}
                className="w-full accent-white h-1.5 bg-[#333333] cursor-pointer appearance-none"
              />
              <div className="flex justify-between text-[9px] text-[#666666]">
                <span>0 // ZERO_MEDIA</span>
                <span>50 // ASSET_DISPATCH</span>
                <span>100 // FULL_PRODUCTION_SET</span>
              </div>
            </div>

            {/* Action Trigger Box: Input + [ COMMIT ] Button */}
            <form onSubmit={handleCommit} className="pt-3 border-t border-[#252525] space-y-2">
              <div className="text-[10px] text-[#777777] uppercase">
                // ACTION TRIGGER // SPECIFICATION_PAYLOAD:
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id={specsInputId}
                  type="text"
                  value={extraSpecs}
                  onChange={(e) => setExtraSpecs(e.target.value)}
                  placeholder="[ EXTRA SPECIFICATIONS // SYSTEM REQS ]"
                  className="flex-1 bg-[#1A1A1A] border border-[#3A3A3A] px-3 py-2 text-[11px] text-[#F3F3F3] placeholder-[#666666] focus:outline-hidden focus:border-[#CCCCCC]"
                />
                <button
                  type="submit"
                  className="bg-[#FFFFFF] text-[#1B1B1B] px-5 py-2 text-[11px] font-mono hover:bg-[#E0E0E0] cursor-pointer transition-colors whitespace-nowrap"
                >
                  [ COMMIT ]
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Monospace Selection Checklist Box */}
          <div className="lg:col-span-6 border border-[#2F2F2F] bg-[#141414] p-5">
            <div className="flex justify-between text-[10px] text-[#777777] border-b border-[#252525] pb-2 mb-3">
              <span>// TERMINAL TABLE: CORE DELIVERABLES</span>
              <span>AUTO_RESOLVED_BY_COORDINATES</span>
            </div>

            <div className="space-y-2">
              {DELIVERABLES.map((item) => {
                const isActive = item.condition(strategy, creativeDir, execution);
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 border transition-colors flex items-center justify-between gap-3 text-[11px] ${
                      isActive
                        ? 'border-[#444444] bg-[#1E1E1E] text-[#FFFFFF]'
                        : 'border-[#222222] bg-[#111111] text-[#555555]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[12px]">{isActive ? '[✓]' : '[ ]'}</span>
                      <span className="tracking-tight">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[9px] text-[#555555] hidden sm:inline">{item.reqText}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 border ${
                          isActive
                            ? 'border-[#555555] bg-[#2A2A2A] text-[#E0E0E0]'
                            : 'border-[#1E1E1E] text-[#444444]'
                        }`}
                      >
                        {isActive ? '[ ACTIVE ]' : '[ DORMANT ]'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#222222] flex justify-between text-[10px] text-[#666666]">
              <span>ACTIVE_PAYLOAD_COUNT: {DELIVERABLES.filter(d => d.condition(strategy, creativeDir, execution)).length} / 6</span>
              <span>SYNCHRONIZATION: LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="pt-3 border-t border-[#2D2D2D] flex justify-between items-center text-[10px] text-[#666666]">
        <span>SLIDE_06 // REQUEST_CONFIGURATOR</span>
        <span>SECURITY_PROTOCOL: CLIENT_DIRECT_TRANSMISSION</span>
      </div>
    </section>
  );
};
