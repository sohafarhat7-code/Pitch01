import React, { useState } from 'react';

interface Slide04CrisisProps {
  onTriggerAlert: (message: string, title?: string) => void;
}

interface TimelineStep {
  step: string;
  tag: string;
  arrow: string;
  desc: string;
  time: string;
  metric: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: '01',
    tag: '[DISRUPTION]',
    arrow: '──>',
    desc: 'FINALIZED 4-DAY VIDEO LIFE-CYCLE METRIC COLLAPSED AT 11:30 PM BY CLIENT SHIFT',
    time: '23:30:00',
    metric: 'FAILURE_DELTA: -100%',
  },
  {
    step: '02',
    tag: '[BYPASS]',
    arrow: '──────>',
    desc: 'INFRASTRUCTURE CONSTRAINTS AND COMMUNICATIONS BLACKOUT ON SITE',
    time: '01:15:00',
    metric: 'BANDWIDTH: ZERO_LINK',
  },
  {
    step: '03',
    tag: '[FORMULATION]',
    arrow: '──>',
    desc: 'SHIPPED ALTERNATIVE PAYLOAD DISPATCH AT 04:30 AM / CODED INTERACTIVE APP AT 05:00 AM',
    time: '04:30:00',
    metric: 'DISPATCH_TIME: 5.0_HOURS',
  },
  {
    step: '04',
    tag: '[DATA VALUE]',
    arrow: '──>',
    desc: 'DATA-MINING PUBLIC DEMOGRAPHIC USER EXP STUDY FEED GENERATING LIVE TRICHROMATIC HUES (B/G/R)',
    time: '06:00:00',
    metric: 'ASSET_GENERATED: POSITIVE',
  },
];

export const Slide04Crisis: React.FC<Slide04CrisisProps> = ({ onTriggerAlert }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleSecuredClick = () => {
    onTriggerAlert(
      'Protected Asset Architecture. Blueprint repository running under restricted simulation layer.',
      'RESTRICTED_ASSET_REPOSITORY'
    );
  };

  return (
    <section className="relative w-full h-full min-h-screen bg-[#E2E2E2] text-[#1B1B1B] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Top Header */}
      <div className="flex justify-between items-start border-b border-[#CCCCCC] pb-4 text-[11px] text-[#555555] tracking-wider">
        <div>
          <span>// SECTION_04 // CRITICAL_INCIDENT_TIMELINE // ZERO_LATENCY_ENGINEERING</span>
        </div>
        <div className="text-right hidden sm:block text-[#666666]">
          <span>PALETTE: LIGHT_SILVER_BLEED [#E2E2E2]</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-4">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#1B1B1B] uppercase mb-4">
          PROACTIVE INTERVENTION PROTOCOLS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Asymmetric Numeric Flowchart Timeline */}
          <div className="lg:col-span-8 border border-[#BDBDBD] bg-[#D8D8D8] p-5 space-y-4">
            <div className="flex justify-between items-center text-[10px] text-[#666666] border-b border-[#C0C0C0] pb-2">
              <span>FLOWCHART_MAPPING: ASYMMETRIC_INCIDENT_RESOLVER</span>
              <span>STATE: SYNCHRONIZED</span>
            </div>

            <div className="space-y-3">
              {TIMELINE_STEPS.map((item, idx) => (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 border transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'border-[#1B1B1B] bg-[#EFEFEF] shadow-xs'
                      : 'border-[#CCCCCC] bg-[#DFDFDF] hover:bg-[#E5E5E5]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 text-[11px]">
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[#000000] font-bold text-[12px]">{item.step}</span>
                      <span className="text-[#333333]">{item.tag}</span>
                      <span className="text-[#666666] hidden md:inline">{item.arrow}</span>
                    </div>

                    <div className="flex-1 text-[#222222] tracking-tight leading-relaxed">
                      {item.desc}
                    </div>

                    <div className="shrink-0 text-[10px] text-[#666666] flex sm:flex-col sm:items-end justify-between">
                      <span>TIME: {item.time}</span>
                      <span>{item.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trichromatic Signal Data Stream Preview (B/G/R Channel Wave Monitor) */}
            <div className="border border-[#BFBFBF] bg-[#CCCCCC] p-3 text-[10px]">
              <div className="flex justify-between text-[#444444] mb-2">
                <span>// LIVE DEMOGRAPHIC STUDY FEED [TRICHROMATIC HUES: B/G/R]</span>
                <span>MONOCHROME_LUMINANCE_STREAM</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-[#AAAAAA] bg-[#E2E2E2] p-2">
                  <div className="flex justify-between text-[#333333] mb-1">
                    <span>CHANNEL_B</span>
                    <span>240 / 255</span>
                  </div>
                  <div className="w-full bg-[#B8B8B8] h-2 overflow-hidden">
                    <div className="bg-[#1B1B1B] h-full w-[94%]" />
                  </div>
                </div>
                <div className="border border-[#AAAAAA] bg-[#E2E2E2] p-2">
                  <div className="flex justify-between text-[#333333] mb-1">
                    <span>CHANNEL_G</span>
                    <span>215 / 255</span>
                  </div>
                  <div className="w-full bg-[#B8B8B8] h-2 overflow-hidden">
                    <div className="bg-[#1B1B1B] h-full w-[84%]" />
                  </div>
                </div>
                <div className="border border-[#AAAAAA] bg-[#E2E2E2] p-2">
                  <div className="flex justify-between text-[#333333] mb-1">
                    <span>CHANNEL_R</span>
                    <span>198 / 255</span>
                  </div>
                  <div className="w-full bg-[#B8B8B8] h-2 overflow-hidden">
                    <div className="bg-[#1B1B1B] h-full w-[78%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Side Case Ledger & Interactive Token */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Side Case Ledger */}
            <div className="border border-[#BDBDBD] bg-[#D8D8D8] p-5 text-[11px] leading-relaxed text-[#222222]">
              <div className="text-[10px] text-[#555555] uppercase tracking-wider mb-2">
                // OPERATIONAL_CASE_LEDGER
              </div>
              <p className="font-mono m-0 text-[11px] text-[#222222]">
                • OPERATIONAL VALUE: DEPLOYING MINIMAL ZERO-LATENCY SETUP TO BYPASS MIDDLE LAYERS AND CONVERT CRISIS INTO ASSET-MINING DATA FOR THE BRAND.
              </p>
            </div>

            {/* Interactive Token Button */}
            <div className="border border-[#BDBDBD] bg-[#D8D8D8] p-4 text-[11px] flex flex-col gap-3">
              <div className="text-[10px] text-[#555555] uppercase">
                // ARCHITECTURAL_VERIFICATION_TOKEN
              </div>
              <button
                onClick={handleSecuredClick}
                className="w-full border border-[#1B1B1B] bg-[#EAEAEA] hover:bg-[#1B1B1B] hover:text-[#FFFFFF] text-[#1B1B1B] py-2 px-3 text-[11px] font-mono cursor-pointer transition-colors text-center tracking-tight"
              >
                [ CODE SIMULATION DATA SECURED ]
              </button>
              <div className="text-[9px] text-[#666666]">
                TRIGGER_ALERT // VALIDATE_RESTRICTED_REPOSITORIES
              </div>
            </div>

            {/* Bottom Reference Link */}
            <div className="text-[11px]">
              <a
                href="https://pin.it"
                target="_blank"
                rel="noreferrer"
                className="text-[#333333] hover:text-[#000000] underline tracking-tight transition-colors inline-block"
              >
                🔗 [ VISUAL_REF_01 // https://pin.it ]
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Margin Status */}
      <div className="pt-3 border-t border-[#CCCCCC] flex justify-between items-center text-[10px] text-[#666666]">
        <span>SLIDE_04 // TIMELINE_DELTA: CRITICAL_EXECUTION</span>
        <span>LATENCY: ZERO_LAYER_PIPELINE</span>
      </div>
    </section>
  );
};
