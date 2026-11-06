'use client';

import React, { useState } from 'react';
import MacOSDock from '@/components/ui/mac-os-dock';
import { matchaMenuIcons } from '@/components/ui/matcha-icons';

// Menu details for modal/panel display
const menuDetails: Record<
  string,
  { price: string; desc: string; tag: string }
> = {
  latte:    { price: 'Rp 38.000', desc: 'Ceremonial grade matcha whipped with steamed oat milk. Smooth, earthy, and comforting.', tag: 'Best Seller' },
  smoothie: { price: 'Rp 45.000', desc: 'Blended matcha with frozen banana, strawberry, and almond milk. Refreshingly thick.', tag: 'New' },
  cake:     { price: 'Rp 55.000', desc: 'Fluffy matcha chiffon layered with sakura cream and a dusting of ceremonial matcha.', tag: 'Seasonal' },
  cookies:  { price: 'Rp 32.000', desc: 'Crispy matcha butter cookies with pink chocolate chips. 6 pieces per box.', tag: 'Popular' },
  icecream: { price: 'Rp 42.000', desc: 'Triple-scoop: matcha, strawberry, and matcha sorbet. Waffle cone included.', tag: 'Summer Hit' },
  mochi:    { price: 'Rp 28.000', desc: 'Soft mochi filled with matcha & sakura cream. 3 pieces per serving.', tag: 'Fan Fav' },
  waffle:   { price: 'Rp 48.000', desc: 'Crispy matcha waffle with pink strawberry jam, whipped cream, and fresh berries.', tag: 'Weekend Only' },
  powder:   { price: 'Rp 125.000', desc: 'Premium ceremonial-grade matcha powder, 30g. Stone-ground in Uji, Japan.', tag: 'Premium' },
  crepe:    { price: 'Rp 40.000', desc: 'Thin matcha crepe filled with strawberry compote and Chantilly cream.', tag: 'Light Bite' },
};

export default function MatchaChiPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleDockClick = (appId: string) => {
    setSelected((prev) => (prev === appId ? null : appId));
  };

  const handleOrder = (appId: string) => {
    const item = matchaMenuIcons.find((a) => a.id === appId);
    if (!item) return;
    setOrderedItems((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
    showToast(
      orderedItems.includes(appId)
        ? `${item.name} removed from order 🍵`
        : `${item.name} added to order! 🎋`
    );
  };

  const selectedItem = matchaMenuIcons.find((a) => a.id === selected);
  const detail = selected ? menuDetails[selected] : null;

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0f3318 0%, #175417 30%, #1b6a1b 60%, #3d1030 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #4abf4a 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #e83878 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #76d576 0%, transparent 60%)' }}
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex flex-col items-center pt-12 pb-4 px-4 select-none">
        <div className="flex items-center gap-3 mb-2">
          {/* Logo mark */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="24" fill="#2ea62e" />
            <path d="M24 10 C14 10 10 20 10 28 C10 38 17 42 24 42 C31 42 38 38 38 28 C38 20 34 10 24 10Z" fill="#4abf4a" />
            <path d="M18 24 Q24 16 30 24" fill="none" stroke="#fdf8f0" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="30" r="5" fill="#fdf8f0" opacity="0.9" />
          </svg>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white leading-none">
              Matcha<span style={{ color: '#ff80b5' }}>Chi</span>
            </h1>
            <p className="text-xs tracking-widest uppercase" style={{ color: '#76d576' }}>
              Matcha Brewer &amp; Café
            </p>
          </div>
        </div>
        <p className="mt-3 text-center text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Hover the dock below to explore our menu. Click any item to see details.
        </p>
      </header>

      {/* ── Detail card ────────────────────────────────────────────────── */}
      <section className="relative z-10 flex justify-center px-4 min-h-[164px]">
        {selectedItem && detail ? (
          <div
            className="w-full max-w-md rounded-2xl p-5 flex gap-4 items-start"
            style={{
              background: 'rgba(20,60,30,0.82)',
              border: '1px solid rgba(74,191,74,0.30)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}
          >
            {/* icon preview */}
            <img
              src={selectedItem.icon}
              alt={selectedItem.name}
              width={72}
              height={72}
              className="rounded-2xl flex-shrink-0"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h2 className="text-lg font-semibold text-white leading-tight">
                  {selectedItem.name}
                </h2>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: '#e83878', color: '#fff' }}
                >
                  {detail.tag}
                </span>
              </div>
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {detail.desc}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-base font-bold" style={{ color: '#ff80b5' }}>
                  {detail.price}
                </span>
                <button
                  onClick={() => handleOrder(selectedItem.id)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150"
                  style={{
                    background: orderedItems.includes(selectedItem.id)
                      ? 'rgba(232,56,120,0.25)'
                      : '#2ea62e',
                    color: orderedItems.includes(selectedItem.id) ? '#ff80b5' : '#fff',
                    border: orderedItems.includes(selectedItem.id)
                      ? '1px solid #e83878'
                      : '1px solid transparent',
                  }}
                >
                  {orderedItems.includes(selectedItem.id) ? '✓ In Order' : '+ Order'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full max-w-md rounded-2xl p-5 flex items-center justify-center"
            style={{
              background: 'rgba(20,60,30,0.45)',
              border: '1px dashed rgba(74,191,74,0.25)',
            }}
          >
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.40)' }}>
              Select a menu item from the dock ↓
            </p>
          </div>
        )}
      </section>

      {/* ── Order summary badge ─────────────────────────────────────────── */}
      {orderedItems.length > 0 && (
        <div className="relative z-10 flex justify-center mt-3 px-4">
          <div
            className="rounded-full px-4 py-1.5 flex items-center gap-2"
            style={{
              background: 'rgba(20,60,30,0.75)',
              border: '1px solid rgba(74,191,74,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="text-sm" style={{ color: '#76d576' }}>
              🎋 Order:
            </span>
            <span className="text-sm text-white">
              {orderedItems
                .map((id) => matchaMenuIcons.find((a) => a.id === id)?.name)
                .join(', ')}
            </span>
          </div>
        </div>
      )}

      {/* ── Dock ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center items-end pb-10 mt-6 px-4">
        <MacOSDock
          apps={matchaMenuIcons}
          onAppClick={handleDockClick}
          openApps={orderedItems}
        />
      </div>

      {/* ── Menu labels below dock ──────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-6 px-4">
        <p className="text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {matchaMenuIcons.length} menu items · hover to magnify · click to explore
        </p>
      </div>

      {/* ── Toast notification ─────────────────────────────────────────── */}
      {toast && (
        <div
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full text-sm font-medium text-white shadow-lg transition-all duration-300"
          style={{
            background: 'rgba(20,60,30,0.92)',
            border: '1px solid rgba(74,191,74,0.4)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {toast}
        </div>
      )}
    </main>
  );
}
