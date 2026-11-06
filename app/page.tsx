'use client';

import React, { useState, useEffect, useRef } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const menuItems = [
  {
    id: 'latte',
    name: 'Matcha Latte',
    tag: 'Best Seller',
    tagColor: '#f54d8a',
    price: 'Rp 38.000',
    desc: 'Ceremonial grade matcha whipped with steamed oat milk. Smooth, earthy & comforting.',
    emoji: '🍵',
    bg: '#e8f8f0',
    accent: '#4dc496',
  },
  {
    id: 'smoothie',
    name: 'Matcha Smoothie',
    tag: 'New',
    tagColor: '#74bc74',
    price: 'Rp 45.000',
    desc: 'Blended matcha with frozen banana, strawberry & almond milk. Thick and refreshing.',
    emoji: '🥤',
    bg: '#fff5f8',
    accent: '#ff7aaa',
  },
  {
    id: 'icecream',
    name: 'Matcha Ice Cream',
    tag: 'Summer Hit',
    tagColor: '#4dc496',
    price: 'Rp 42.000',
    desc: 'Triple-scoop matcha, strawberry & sorbet. Served in a crispy waffle cone.',
    emoji: '🍦',
    bg: '#fdf6e7',
    accent: '#f8c84e',
  },
  {
    id: 'mochi',
    name: 'Matcha Mochi',
    tag: 'Fan Fav',
    tagColor: '#ff7aaa',
    price: 'Rp 28.000',
    desc: 'Soft pillowy mochi filled with matcha & sakura cream. 3 pieces per serving.',
    emoji: '🍡',
    bg: '#fff5f8',
    accent: '#ffa4c2',
  },
  {
    id: 'cake',
    name: 'Matcha Cake',
    tag: 'Seasonal',
    tagColor: '#74bc74',
    price: 'Rp 55.000',
    desc: 'Fluffy chiffon layered with sakura cream & a velvety ceremonial matcha top.',
    emoji: '🎂',
    bg: '#e8f8f0',
    accent: '#8adab8',
  },
  {
    id: 'waffle',
    name: 'Matcha Waffle',
    tag: 'Weekend',
    tagColor: '#f8c84e',
    price: 'Rp 48.000',
    desc: 'Crispy matcha waffle with strawberry jam, whipped cream & fresh berries.',
    emoji: '🧇',
    bg: '#fdf6e7',
    accent: '#f8c84e',
  },
];

const steps = [
  { emoji: '🌿', title: 'Stone-ground', desc: 'We source ceremonial-grade tencha leaves stone-ground in Uji, Japan.' },
  { emoji: '💧', title: 'Pure Water', desc: 'Filtered at 75°C to unlock the sweetest, most vibrant matcha flavor.' },
  { emoji: '🫧', title: 'Hand-whisked', desc: 'Every cup is whisked with a bamboo chasen until silky smooth.' },
  { emoji: '🩷', title: 'Served with love', desc: 'Garnished and presented so every sip feels like a little treat.' },
];

const testimonials = [
  { name: 'Ayu S.', loc: 'Jakarta', text: 'The matcha latte here is honestly the best I\'ve had in the city. Creamy, earthy, and not bitter at all!', stars: 5 },
  { name: 'Rafi M.', loc: 'Bandung', text: 'Matcha mochi = heaven. Soft, filled with the perfect amount of cream. I order every weekend 💚', stars: 5 },
  { name: 'Dinda K.', loc: 'Surabaya', text: 'Cute packaging, beautiful color, and the smoothie is so thick & good. MatchaChi never disappoints!', stars: 5 },
];

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f8c84e"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
    </span>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroAnim = useInView(0.1);
  const menuAnim = useInView(0.1);
  const processAnim = useInView(0.1);
  const reviewAnim = useInView(0.1);
  const ctaAnim = useInView(0.1);

  const navLinks = ['Menu', 'Story', 'Reviews', 'Order'];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#fffdf7' }}>

      {/* ═══════════════════════════════════════════════════════
          NAV
      ═══════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{
          background: 'rgba(255,253,247,0.88)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(143,191,143,0.20)',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 select-none">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold shadow-sm"
            style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)', color: '#fff' }}>
            M
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ color: '#2d3a2e' }}>
            Matcha<span style={{ color: '#f54d8a' }}>Chi</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className="text-sm font-medium transition-colors duration-150 hover:text-sage-600"
                style={{ color: '#7a9080' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#3a7d3a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7a9080')}
              >{l}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#order"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
          Order Now ✨
        </a>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)}>
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 rounded" style={{ background: '#4a7c59', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : undefined, transition: 'transform 0.2s' }} />
            <span className="block w-6 h-0.5 rounded" style={{ background: '#4a7c59', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span className="block w-6 h-0.5 rounded" style={{ background: '#4a7c59', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : undefined, transition: 'transform 0.2s' }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 md:hidden"
          style={{ background: 'rgba(255,253,247,0.97)', backdropFilter: 'blur(12px)' }}>
          <ul className="flex flex-col gap-6 mt-4">
            {navLinks.map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold" style={{ color: '#2d3a2e' }}>{l}</a></li>
            ))}
          </ul>
          <a href="#order" onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white shadow"
            style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
            Order Now ✨
          </a>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[520px] h-[520px] -translate-y-1/4 translate-x-1/4 blob opacity-60"
          style={{ background: 'radial-gradient(circle,#c5eedd,#e8f8f0)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/4 -translate-x-1/4 blob opacity-50"
          style={{ background: 'radial-gradient(circle,#ffcadd,#fff5f8)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl opacity-30"
          style={{ background: '#c5eedd' }} />

        {/* Floating decoration circles */}
        <div className="absolute top-32 left-16 w-12 h-12 rounded-full animate-float opacity-70" style={{ background: '#ffcadd' }} />
        <div className="absolute top-48 right-24 w-8 h-8 rounded-full animate-float-slow opacity-60" style={{ background: '#c5eedd', animationDelay: '0.8s' }} />
        <div className="absolute bottom-40 right-16 w-14 h-14 rounded-full animate-float opacity-50" style={{ background: '#fdf6e7', animationDelay: '1.2s' }} />
        <div className="absolute bottom-32 left-32 w-6 h-6 rounded-full animate-float-slow opacity-60" style={{ background: '#8adab8', animationDelay: '0.4s' }} />

        <div
          ref={heroAnim.ref}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          style={{ opacity: heroAnim.visible ? 1 : 0, transform: heroAnim.visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}>
            🌿 Ceremonial Grade Matcha
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6" style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
            Sip the{' '}
            <span className="relative inline-block">
              <span style={{ color: '#4dc496' }}>Green</span>
              {/* underline squiggle */}
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 6 Q25 0 50 6 Q75 0 100 6 Q125 0 150 6 Q175 0 200 6" fill="none" stroke="#ffcadd" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            {' '}Goodness
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: '#7a9080' }}>
            Premium matcha drinks & treats crafted fresh every day.
            Uji-sourced, lovingly made, delivered to your door. 🍵
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#menu"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white shadow-lg transition-transform duration-150 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#8adab8 0%,#4dc496 100%)', boxShadow: '0 8px 24px -4px rgba(77,196,150,0.40)' }}>
              Explore Menu 🍵
            </a>
            <a href="#story"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-colors duration-150"
              style={{ background: '#fff', border: '1.5px solid #c8e6c8', color: '#4a7c59' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e8f8f0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
            >
              Our Story 🌿
            </a>
          </div>

          {/* Social proof mini */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#ffcadd','#c5eedd','#fdf6e7'].map((c,i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-sm" style={{ background: c }}>
                    {['😊','🌿','💚'][i]}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: '#7a9080' }}>
                <strong style={{ color: '#2d3a2e' }}>2,400+</strong> happy customers
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Stars n={5} />
              <span className="text-sm font-medium" style={{ color: '#7a9080' }}>4.9 rating</span>
            </div>
          </div>
        </div>

        {/* Big hero visual — matcha cup illustration */}
        <div className="absolute right-8 md:right-16 bottom-8 md:bottom-16 text-8xl md:text-9xl animate-float select-none pointer-events-none hidden sm:block"
          style={{ filter: 'drop-shadow(0 12px 32px rgba(77,196,150,0.3))' }}>
          🍵
        </div>
        <div className="absolute left-8 md:left-20 bottom-24 text-5xl animate-float-slow select-none pointer-events-none hidden lg:block"
          style={{ animationDelay: '1s', filter: 'drop-shadow(0 8px 16px rgba(255,164,194,0.35))' }}>
          🌸
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MENU
      ═══════════════════════════════════════════════════════ */}
      <section id="menu" className="py-24 px-6 md:px-12 lg:px-24">
        <div
          ref={menuAnim.ref}
          style={{ opacity: menuAnim.visible ? 1 : 0, transform: menuAnim.visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}>
              🍵 Our Menu
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Something for every <span style={{ color: '#4dc496' }}>matcha</span> mood
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#7a9080' }}>
              From cozy lattes to playful mochi — everything handcrafted daily.
            </p>
          </div>

          {/* Menu grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {menuItems.map((item, i) => (
              <div
                key={item.id}
                className="card-lift rounded-3xl p-6 cursor-pointer"
                style={{
                  background: item.bg,
                  border: `1.5px solid ${item.accent}30`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Emoji */}
                <div className="text-5xl mb-4 w-16 h-16 flex items-center justify-center rounded-2xl"
                  style={{ background: '#fff', boxShadow: `0 4px 16px -2px ${item.accent}40` }}>
                  {item.emoji}
                </div>

                {/* Tag */}
                <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 text-white"
                  style={{ background: item.tagColor }}>
                  {item.tag}
                </span>

                <h3 className="text-lg font-bold mb-1" style={{ color: '#2d3a2e' }}>{item.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#7a9080' }}>{item.desc}</p>

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold" style={{ color: item.accent }}>{item.price}</span>
                  <button
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform duration-150 hover:scale-110"
                    style={{ background: `linear-gradient(135deg,${item.accent},${item.tagColor})` }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW WE BREW (STORY / PROCESS)
      ═══════════════════════════════════════════════════════ */}
      <section id="story" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Soft bg */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#fffdf7 0%,#e8f8f0 50%,#fffdf7 100%)' }} />

        <div
          ref={processAnim.ref}
          className="relative z-10 max-w-5xl mx-auto"
          style={{ opacity: processAnim.visible ? 1 : 0, transform: processAnim.visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#fff5f8', color: '#f54d8a', border: '1px solid #ffcadd' }}>
              🌸 Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Brewed with <span style={{ color: '#f54d8a' }}>intention</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#7a9080' }}>
              Every cup of MatchaChi follows a 4-step ritual to bring you the purest, most vibrant matcha experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i}
                className="rounded-3xl p-6 text-center card-lift"
                style={{ background: '#fff', border: '1.5px solid #e6f4e6', transitionDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4 w-16 h-16 mx-auto flex items-center justify-center rounded-2xl"
                  style={{ background: i % 2 === 0 ? '#e8f8f0' : '#fff5f8' }}>
                  {step.emoji}
                </div>
                <div className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mx-auto mb-3"
                  style={{ background: '#e8f8f0', color: '#4a7c59' }}>
                  {i + 1}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#2d3a2e' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7a9080' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Story blurb */}
          <div className="mt-14 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{ background: 'linear-gradient(135deg,#e8f8f0,#fff5f8)' }}>
            <div className="text-7xl flex-shrink-0 animate-float">🧋</div>
            <div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
                Born from a love of matcha
              </h3>
              <p className="text-base leading-relaxed" style={{ color: '#7a9080' }}>
                MatchaChi started in a tiny kitchen in 2022 — one matcha whisk, one dream.
                We believe good matcha should be accessible, joyful, and never bitter.
                Today we serve thousands of matcha lovers across Indonesia, using only
                ceremonial-grade tencha sourced directly from Uji, Kyoto. 🌿
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          REVIEWS
      ═══════════════════════════════════════════════════════ */}
      <section id="reviews" className="py-24 px-6 md:px-12 lg:px-24">
        <div
          ref={reviewAnim.ref}
          style={{ opacity: reviewAnim.visible ? 1 : 0, transform: reviewAnim.visible ? 'translateY(0)' : 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
        >
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#fdf6e7', color: '#b88a00', border: '1px solid #f8e7a0' }}>
              ⭐ Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              What our customers say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl p-7 card-lift" style={{ background: '#fff', border: '1.5px solid #e6f4e6' }}>
                <Stars n={t.stars} />
                <p className="mt-4 mb-5 text-sm leading-relaxed" style={{ color: '#5a6e60' }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-base"
                    style={{ background: i % 2 === 0 ? '#e8f8f0' : '#fff5f8', color: i % 2 === 0 ? '#4a7c59' : '#f54d8a' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#2d3a2e' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: '#7a9080' }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ORDER CTA BANNER
      ═══════════════════════════════════════════════════════ */}
      <section id="order" className="px-6 md:px-12 lg:px-24 pb-24">
        <div
          ref={ctaAnim.ref}
          className="rounded-4xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,#c5eedd 0%,#8adab8 40%,#ffa4c2 100%)',
            opacity: ctaAnim.visible ? 1 : 0,
            transform: ctaAnim.visible ? 'scale(1)' : 'scale(0.97)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" style={{ background: '#fff' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20" style={{ background: '#fff' }} />

          <div className="relative z-10">
            <div className="text-5xl mb-4">🍵✨</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Ready for your first sip?
            </h2>
            <p className="text-base md:text-lg mb-8 text-white/80 max-w-md mx-auto">
              Order via WhatsApp or follow us on Instagram to see today's specials!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/6281234567890?text=Hii%20MatchaChi!%20Saya%20mau%20order%20🍵"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-transform duration-150 hover:scale-105"
                style={{ background: '#fff', color: '#4a7c59', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.15)' }}
              >
                💬 Order via WhatsApp
              </a>
              <a
                href="https://instagram.com/matchachi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-transform duration-150 hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.25)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)' }}
              >
                📸 @matchachi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="px-6 md:px-12 lg:px-24 pb-10 pt-4">
        <div className="max-w-5xl mx-auto">
          {/* Divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg,transparent,#c8e6c8,transparent)' }} />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)', color: '#fff' }}>
                M
              </div>
              <span className="font-bold" style={{ color: '#2d3a2e' }}>
                Matcha<span style={{ color: '#f54d8a' }}>Chi</span>
              </span>
            </div>

            <p className="text-sm text-center" style={{ color: '#7a9080' }}>
              © 2026 MatchaChi · Made with 🍵 and 🩷 in Indonesia
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              {[
                { label: 'IG', href: 'https://instagram.com/matchachi', bg: '#fff5f8', color: '#f54d8a' },
                { label: 'WA', href: 'https://wa.me/6281234567890', bg: '#e8f8f0', color: '#4a7c59' },
                { label: 'TK', href: 'https://tiktok.com/@matchachi', bg: '#e8f8f0', color: '#4dc496' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-150 hover:scale-110"
                  style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}30` }}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
