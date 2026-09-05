import React, { useState } from 'react';
import { QrCodeRenderer } from '../QrCodeRenderer';

interface Slide07EcosystemProps {
  onOpenBehance: (title: string) => void;
}

interface FoundationNode {
  id: 'Node A' | 'Node B' | 'Node C';
  title: string;
  tag: string;
  desc: string;
  x: number;
  y: number;
  symbol: string;
}

const FOUNDATION_NODES: FoundationNode[] = [
  {
    id: 'Node A',
    title: 'ANCILLARY FINE ART LOGS',
    tag: '[ANCILLARY FINE ART LOGS]',
    desc: 'Maps structural layout blueprints, font weights, and geometric spatial rules directly to current New Fine Art Deconstruct Collections.',
    x: 25,
    y: 35,
    symbol: 'Σ',
  },
  {
    id: 'Node B',
    title: 'POLYRHYTHMIC DRUMMING TEMPO',
    tag: '[POLYRHYTHMIC DRUMMING TEMPO]',
    desc: 'Maps precision timing and tempo drilling directly to current Commercial Campaign Velocity loops to hit deadlines on the creative beat.',
    x: 75,
    y: 30,
    symbol: '∫',
  },
  {
    id: 'Node C',
    title: 'COMMUNITY NODES',
    tag: '[COMMUNITY NODES]',
    desc: 'Connects directly to trusted pools of professional major acquaintances, providing an underground production house pipeline and rapid portfolio editor network inside Lebanon.',
    x: 50,
    y: 75,
    symbol: '∞',
  },
];

const QR_POSTS = [
  { url: 'https://instagram.com', label: 'POST_01 // EDITORIAL_SERIES' },
  { url: 'https://instagram.com', label: 'POST_02 // KINETIC_LOOP' },
  { url: 'https://instagram.com', label: 'POST_03 // BRAND_DECONSTRUCT' },
  { url: 'https://instagram.com', label: 'POST_04 // MOTION_STUDY' },
];

export const Slide07Ecosystem: React.FC<Slide07EcosystemProps> = ({ onOpenBehance }) => {
  const [activeNode, setActiveNode] = useState<FoundationNode>(FOUNDATION_NODES[0]);

  return (
    <section className="relative w-full h-full min-h-screen bg-[#1B1B1B] text-[#F3F3F3] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden font-mono">
      {/* Top Header */}
      <div className="flex justify-between items-start border-b border-[#2D2D2D] pb-4 text-[11px] text-[#777777] tracking-wider">
        <div>
          <span>// SECTION_07 // ECOSYSTEM_TOPOLOGY // CREATIVE_FOUNDATIONS</span>
        </div>
        <div className="text-right hidden sm:block text-[#666666]">
          <span>NETWORK_MODEL: MULTI_DISCIPLINARY_SYNAPSE</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-4">
        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#F3F3F3] uppercase mb-4">
          CREATIVE FOUNDATIONS
        </h2>

        {/* Center Grid: Interactive Connectivity Vector Diagram + Monospace Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Monochrome Connectivity Vector Diagram Layout */}
          <div className="lg:col-span-8 border border-[#2F2F2F] bg-[#141414] p-4 relative">
            <div className="flex justify-between text-[10px] text-[#666666] mb-2 border-b border-[#222222] pb-1">
              <span>// TOPOLOGICAL INTERSECTION GRAPH</span>
              <span>CLICK_ANY_NODE_TO_INSPECT</span>
            </div>

            {/* SVG Vector Canvas for Intersecting Branch Lines */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 bg-[#161616] border border-[#262626] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Connecting wireframe lines */}
                <line
                  x1="25%"
                  y1="35%"
                  x2="75%"
                  y2="30%"
                  stroke="#444444"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <line
                  x1="75%"
                  y1="30%"
                  x2="50%"
                  y2="75%"
                  stroke="#444444"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <line
                  x1="50%"
                  y1="75%"
                  x2="25%"
                  y2="35%"
                  stroke="#444444"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* Sub-node secondary vectors */}
                <line x1="25%" y1="35%" x2="15%" y2="20%" stroke="#2D2D2D" strokeWidth="1" />
                <line x1="75%" y1="30%" x2="88%" y2="18%" stroke="#2D2D2D" strokeWidth="1" />
                <line x1="50%" y1="75%" x2="50%" y2="92%" stroke="#2D2D2D" strokeWidth="1" />
                <line x1="50%" y1="75%" x2="70%" y2="85%" stroke="#2D2D2D" strokeWidth="1" />
                <line x1="25%" y1="35%" x2="35%" y2="55%" stroke="#2D2D2D" strokeWidth="1" />

                {/* Ambient Center Focal Circle */}
                <circle cx="50%" cy="47%" r="48" fill="none" stroke="#252525" strokeWidth="1" />
                <circle cx="50%" cy="47%" r="85" fill="none" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 4" />
              </svg>

              {/* Interactive Clickable Nodes */}
              {FOUNDATION_NODES.map((node) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-transform ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center border font-mono text-xs transition-colors ${
                        isSelected
                          ? 'border-[#FFFFFF] bg-[#FFFFFF] text-[#1B1B1B] shadow-lg'
                          : 'border-[#555555] bg-[#1F1F1F] text-[#E0E0E0] group-hover:border-[#999999]'
                      }`}
                    >
                      {node.symbol}
                    </div>
                    <span
                      className={`mt-1.5 px-2 py-0.5 text-[10px] font-mono tracking-tight whitespace-nowrap border ${
                        isSelected
                          ? 'border-[#FFFFFF] bg-[#2A2A2A] text-white'
                          : 'border-[#333333] bg-[#141414] text-[#888888]'
                      }`}
                    >
                      {node.id}: {node.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tiny Monospace Sidebar Data Box */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="border border-[#383838] bg-[#161616] p-4 text-[11px] leading-relaxed">
              <div className="text-[10px] text-[#777777] uppercase tracking-wider mb-2 border-b border-[#282828] pb-1">
                // ACTIVE RELATIONSHIP DATA BOX:
              </div>
              <div className="text-[#FFFFFF] mb-2 font-mono text-[12px] tracking-tight">
                {activeNode.tag} ──&gt;
              </div>
              <p className="font-mono text-[11px] text-[#B5B5B5] leading-relaxed m-0">
                {activeNode.desc}
              </p>
            </div>

            {/* Quick Node Selector Tabs */}
            <div className="space-y-1 text-[11px]">
              {FOUNDATION_NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(n)}
                  className={`w-full text-left px-3 py-1.5 border cursor-pointer transition-colors ${
                    activeNode.id === n.id
                      ? 'border-[#FFFFFF] bg-[#262626] text-white'
                      : 'border-[#262626] text-[#777777] hover:text-[#CCCCCC]'
                  }`}
                >
                  &gt; {n.id} : {n.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Art Grid Scan Matrix: 4 Minimalist Un-bordered Scan Targets Loading QR Codes */}
        <div className="mt-6 border-t border-[#262626] pt-4">
          <div className="text-[10px] text-[#777777] uppercase tracking-wider mb-3">
            // ART GRID SCAN MATRIX // AUTOMATED MOBILE-SCANNABLE NODES
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QR_POSTS.map((item, i) => (
              <QrCodeRenderer
                key={i}
                url={item.url}
                label={item.label}
                index={i + 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Curated References & Authenticity Signature Footer */}
      <div className="pt-4 border-t border-[#2D2D2D] space-y-2">
        {/* Curated Bottom Link References */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[11px]">
          <button
            onClick={() => onOpenBehance('LIVA_INSURANCE_REBRAND')}
            className="text-[#CCCCCC] hover:text-white hover:underline cursor-pointer tracking-tight transition-colors text-left"
          >
            🔗 [ VALIDATE_NODE_02 // LIVA_INSURANCE_REBRAND -&gt; https://behance.net ]
          </button>
          <button
            onClick={() => onOpenBehance('OODI_PRINT_PRODUCTION')}
            className="text-[#CCCCCC] hover:text-white hover:underline cursor-pointer tracking-tight transition-colors text-left"
          >
            🔗 [ VALIDATE_NODE_03 // OODI_PRINT_PRODUCTION -&gt; https://behance.net ]
          </button>
        </div>

        {/* Authenticity Signature Footer */}
        <div className="text-[10px] text-[#777777] pt-1">
          // AUTHENTICITY ASSURED // RE-ENGINEERED BLUEPRINT SYSTEMS FOR COMPREHENSIVE PLATFORM DEPLOYMENT
        </div>
      </div>
    </section>
  );
};
