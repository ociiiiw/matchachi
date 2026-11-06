'use client';

import React, { useState, useEffect, useRef } from 'react';

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const IconLeaf = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconCup = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" y1="2" x2="6" y2="4"/>
    <line x1="10" y1="2" x2="10" y2="4"/>
    <line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
);

const IconStar = ({ size = 14, filled = false, color = '#f8c84e' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconMapPin = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconClock = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconWhatsapp = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const IconInstagram = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const IconTiktok = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.19 8.19 0 0 0 4.79 1.52V6.79a4.85 4.85 0 0 1-1.02-.1z"/>
  </svg>
);

const IconChevronDown = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconMenu = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconX = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconDroplet = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);

const IconHeart = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const IconMotorbike = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="2.5"/>
    <circle cx="18.5" cy="17.5" r="2.5"/>
    <path d="M15 6h-5l-3 6h10l-2-6z"/>
    <path d="M9 12l-4 5.5"/>
    <path d="M15 12l3.5 5.5"/>
    <path d="M12 2v4"/>
  </svg>
);

const IconPhone = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconSmoothie = ({ size = 44, color = '#4dc496' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <rect x="13" y="10" width="18" height="24" rx="4" fill={color} opacity="0.15"/>
    <path d="M15 10 L13 34 Q13 38 22 38 Q31 38 31 34 L29 10 Z" fill={color} opacity="0.3"/>
    <path d="M15 18 L29 18" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <rect x="20" y="4" width="4" height="10" rx="2" fill="#ffa4c2"/>
    <circle cx="22" cy="34" r="3" fill={color} opacity="0.5"/>
    <path d="M16 12 L28 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconIceCream = ({ size = 44, color = '#8adab8' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <ellipse cx="22" cy="18" rx="10" ry="10" fill={color}/>
    <ellipse cx="22" cy="14" rx="8" ry="8" fill={color} opacity="0.8"/>
    <ellipse cx="22" cy="11" rx="6" ry="6" fill="#ffa4c2"/>
    <path d="M14 22 L22 40 L30 22 Z" fill="#f8c84e" opacity="0.7"/>
    <path d="M15 26 L29 26" stroke="white" strokeWidth="1" opacity="0.5"/>
    <path d="M16 30 L28 30" stroke="white" strokeWidth="1" opacity="0.5"/>
    <circle cx="22" cy="7" r="2" fill="#f54d8a"/>
  </svg>
);

const IconMochi = ({ size = 44, color = '#ffa4c2' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <ellipse cx="22" cy="24" rx="14" ry="11" fill={color}/>
    <ellipse cx="22" cy="21" rx="12" ry="9" fill="white" opacity="0.5"/>
    <ellipse cx="22" cy="20" rx="8" ry="6" fill="#ffcadd" opacity="0.7"/>
    <path d="M16 18 Q22 12 28 18" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
    <ellipse cx="15" cy="26" rx="6" ry="5" fill={color} opacity="0.6"/>
    <ellipse cx="29" cy="26" rx="6" ry="5" fill={color} opacity="0.6"/>
  </svg>
);

const IconCake = ({ size = 44, color = '#8adab8' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <rect x="8" y="26" width="28" height="12" rx="4" fill={color} opacity="0.25"/>
    <rect x="10" y="18" width="24" height="10" rx="3" fill={color} opacity="0.5"/>
    <rect x="12" y="12" width="20" height="8" rx="3" fill={color}/>
    <path d="M10 26 Q17 22 22 26 Q27 22 34 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M12 18 Q17 14 22 18 Q27 14 32 18" stroke="#ffa4c2" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <rect x="20" y="6" width="4" height="8" rx="2" fill="#ffa4c2"/>
    <ellipse cx="22" cy="5" rx="3" ry="4" fill="#f8c84e" opacity="0.8"/>
  </svg>
);

const IconWaffle = ({ size = 44, color = '#f8c84e' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <rect x="8" y="16" width="28" height="22" rx="5" fill={color} opacity="0.35"/>
    <line x1="8" y1="24" x2="36" y2="24" stroke={color} strokeWidth="2"/>
    <line x1="8" y1="30" x2="36" y2="30" stroke={color} strokeWidth="2"/>
    <line x1="16" y1="16" x2="16" y2="38" stroke={color} strokeWidth="2"/>
    <line x1="24" y1="16" x2="24" y2="38" stroke={color} strokeWidth="2"/>
    <path d="M8 18 Q22 10 36 18" fill="#ffa4c2" opacity="0.8"/>
    <circle cx="22" cy="8" r="4" fill="#f54d8a"/>
    <path d="M20 4 Q18 0 16 2" stroke="#4a7c59" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const IconLatte = ({ size = 44, color = '#4dc496' }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <path d="M12 14 L14 36 Q14 40 22 40 Q30 40 30 36 L32 14 Z" fill={color} opacity="0.2"/>
    <path d="M13 22 L31 22 L30 34 Q30 38 22 38 Q14 38 14 34 Z" fill={color} opacity="0.4"/>
    <ellipse cx="22" cy="22" rx="10" ry="4" fill="white" opacity="0.9"/>
    <path d="M16 22 Q22 18 28 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M30 20 Q38 20 38 27 Q38 34 30 34" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M16 10 Q14 6 16 2" stroke="rgba(77,196,150,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M22 9 Q20 5 22 1" stroke="rgba(77,196,150,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M28 10 Q26 6 28 2" stroke="rgba(77,196,150,0.4)" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const menuItems = [
  {
    id: 'latte',
    name: 'Matcha Latte',
    tag: 'Best Seller',
    tagColor: '#f54d8a',
    price: 'Rp 38.000',
    desc: 'Ceremonial grade matcha whipped with steamed oat milk. Smooth, earthy & comforting.',
    icon: <IconLatte size={44} color="#4dc496" />,
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
    icon: <IconSmoothie size={44} color="#ff7aaa" />,
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
    icon: <IconIceCream size={44} color="#8adab8" />,
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
    icon: <IconMochi size={44} color="#ffa4c2" />,
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
    icon: <IconCake size={44} color="#8adab8" />,
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
    icon: <IconWaffle size={44} color="#f8c84e" />,
    bg: '#fdf6e7',
    accent: '#f8c84e',
  },
];

const steps = [
  { icon: <IconLeaf size={28} color="#4a7c59" />, bg: '#e8f8f0', title: 'Stone-ground', desc: 'Ceremonial-grade tencha leaves stone-ground in Uji, Japan — fresh every batch.' },
  { icon: <IconDroplet size={28} color="#4dc496" />, bg: '#e8f8f0', title: 'Pure Water', desc: 'Filtered at 75°C to unlock the sweetest, most vibrant matcha flavor.' },
  { icon: <IconCup size={28} color="#4a7c59" />, bg: '#e8f8f0', title: 'Hand-whisked', desc: 'Every cup is whisked with a bamboo chasen until silky smooth.' },
  { icon: <IconHeart size={28} color="#f54d8a" />, bg: '#fff5f8', title: 'Served with love', desc: 'Garnished and presented so every sip feels like a little treat.' },
];

const testimonials = [
  { name: 'Ayu S.', loc: 'Jakarta', text: 'The matcha latte here is honestly the best I\'ve had in the city. Creamy, earthy, and not bitter at all!', stars: 5 },
  { name: 'Rafi M.', loc: 'Bandung', text: 'Matcha mochi = heaven. Soft, filled with the perfect amount of cream. I order every weekend 💚', stars: 5 },
  { name: 'Dinda K.', loc: 'Surabaya', text: 'Cute packaging, beautiful color, and the smoothie is so thick & good. MatchaChi never disappoints!', stars: 5 },
];

const faqItems = [
  { q: 'Apakah ada pilihan non-dairy?', a: 'Tentu! Semua minuman bisa diganti dengan oat milk, almond milk, atau soy milk tanpa biaya tambahan.' },
  { q: 'Bisa request less sugar atau sugar-free?', a: 'Bisa! Kamu bisa request less sweet (50%), no sugar, atau extra sweet saat order via WhatsApp.' },
  { q: 'Matcha kalian level grade apa?', a: 'Kami menggunakan ceremonial grade dari Uji, Kyoto — kualitas tertinggi, warna hijau cerah, rasa manis alami tanpa pahit.' },
  { q: 'Delivery ke mana saja?', a: 'Saat ini kami melayani area Jabodetabek via GoFood & GrabFood, dan seluruh Indonesia untuk produk powder & cookies via J&T / JNE.' },
  { q: 'Minimum order berapa?', a: 'Tidak ada minimum order untuk pickup. Untuk delivery, minimal Rp 30.000 (sebelum ongkir).' },
  { q: 'Apakah ada menu seasonal?', a: 'Ada! Kami rutin hadirkan menu seasonal setiap bulan. Follow @matchachi di Instagram untuk info pertama!' },
];

const galleryItems = [
  { alt: 'Matcha Latte Art', bg: 'linear-gradient(135deg,#c5eedd,#8adab8)', label: 'Latte Art', icon: <IconLatte size={52} color="#4a7c59" /> },
  { alt: 'Matcha Mochi Plate', bg: 'linear-gradient(135deg,#ffcadd,#ffa4c2)', label: 'Mochi Plate', icon: <IconMochi size={52} color="#f54d8a" /> },
  { alt: 'Matcha Ice Cream', bg: 'linear-gradient(135deg,#fdf6e7,#f8e7a0)', label: 'Ice Cream', icon: <IconIceCream size={52} color="#4dc496" /> },
  { alt: 'Matcha Cake Slice', bg: 'linear-gradient(135deg,#e8f8f0,#c5eedd)', label: 'Cake Slice', icon: <IconCake size={52} color="#4a7c59" /> },
  { alt: 'Matcha Waffle', bg: 'linear-gradient(135deg,#fdf6e7,#f8c84e44)', label: 'Waffle Stack', icon: <IconWaffle size={52} color="#b88a00" /> },
  { alt: 'Matcha Smoothie', bg: 'linear-gradient(135deg,#fff5f8,#ffcadd)', label: 'Smoothie', icon: <IconSmoothie size={52} color="#f54d8a" /> },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => <IconStar key={i} filled />)}
    </span>
  );
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const fadeIn = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(28px)',
  transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroAnim = useInView(0.05);
  const menuAnim = useInView(0.05);
  const galleryAnim = useInView(0.05);
  const processAnim = useInView(0.05);
  const infoAnim = useInView(0.05);
  const faqAnim = useInView(0.05);
  const reviewAnim = useInView(0.05);
  const ctaAnim = useInView(0.05);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Info', href: '#info' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#fffdf7', color: '#2d3a2e' }}>

      {/* ══════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5"
        style={{ background: 'rgba(255,253,247,0.90)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(143,191,143,0.18)' }}>

        <a href="#" className="flex items-center gap-2.5 select-none">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
            <IconLeaf size={18} color="white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Matcha<span style={{ color: '#f54d8a' }}>Chi</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map(l => (
            <li key={l.label}>
              <a href={l.href} className="text-sm font-medium transition-colors duration-150"
                style={{ color: '#7a9080' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#3a7d3a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7a9080')}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="https://wa.me/6281234567890?text=Hii%20MatchaChi!%20Saya%20mau%20order"
          target="_blank" rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
          <IconWhatsapp size={15} color="white" />
          Order Now
        </a>

        <button className="lg:hidden p-1.5" onClick={() => setMobileOpen(v => !v)}>
          {mobileOpen ? <IconX color="#4a7c59" /> : <IconMenu color="#4a7c59" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className="lg:hidden fixed inset-0 z-40 pt-16 px-6 transition-all duration-300"
        style={{
          background: 'rgba(255,253,247,0.98)', backdropFilter: 'blur(12px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        }}>
        <ul className="flex flex-col gap-5 mt-6">
          {navLinks.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold block" style={{ color: '#2d3a2e' }}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
          <IconWhatsapp size={18} color="white" /> Order via WhatsApp
        </a>
      </div>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-[540px] h-[540px] -translate-y-1/4 translate-x-1/3 blob opacity-55"
          style={{ background: 'radial-gradient(circle,#c5eedd,#e8f8f0)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/3 -translate-x-1/4 blob opacity-45"
          style={{ background: 'radial-gradient(circle,#ffcadd,#fff5f8)' }} />

        {/* Floating bubbles */}
        {[
          { top: '20%', left: '6%', size: 48, bg: '#ffcadd', delay: '0s' },
          { top: '32%', right: '8%', size: 32, bg: '#c5eedd', delay: '0.7s' },
          { bottom: '28%', right: '5%', size: 56, bg: '#fdf6e7', delay: '1.1s' },
          { bottom: '22%', left: '10%', size: 22, bg: '#8adab8', delay: '0.4s' },
          { top: '55%', left: '3%', size: 18, bg: '#ffcadd', delay: '1.5s' },
        ].map((b, i) => (
          <div key={i} className="absolute rounded-full animate-float pointer-events-none opacity-70"
            style={{ ...b, width: b.size, height: b.size, animationDelay: b.delay }} />
        ))}

        <div ref={heroAnim.ref} className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={fadeIn(heroAnim.visible)}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}>
            <IconLeaf size={13} color="#4a7c59" />
            Ceremonial Grade · Uji, Kyoto
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
            style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
            Sip the{' '}
            <span className="relative inline-block">
              <span style={{ color: '#4dc496' }}>Green</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 6 Q25 0 50 6 Q75 0 100 6 Q125 0 150 6 Q175 0 200 6" fill="none" stroke="#ffcadd" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            {' '}Goodness
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: '#7a9080' }}>
            Premium matcha drinks & treats crafted fresh every day.
            Uji-sourced, lovingly made, delivered to your door.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#menu"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)', boxShadow: '0 8px 24px -4px rgba(77,196,150,0.40)' }}>
              <IconCup size={18} color="white" /> Explore Menu
            </a>
            <a href="#story"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold transition-colors"
              style={{ background: '#fff', border: '1.5px solid #c8e6c8', color: '#4a7c59' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e8f8f0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <IconLeaf size={18} color="#4a7c59" /> Our Story
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['#ffcadd','#c5eedd','#fdf6e7'].map((c,i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: c }}>
                    <IconHeart size={12} color={['#f54d8a','#4a7c59','#f8c84e'][i]} />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium" style={{ color: '#7a9080' }}>
                <strong style={{ color: '#2d3a2e' }}>2,400+</strong> happy customers
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Stars n={5} />
              <span className="text-sm font-medium" style={{ color: '#7a9080' }}>4.9 · 1,200 reviews</span>
            </div>
          </div>
        </div>

        {/* Hero floating icon */}
        <div className="absolute right-10 md:right-20 bottom-12 animate-float hidden sm:block pointer-events-none"
          style={{ filter: 'drop-shadow(0 12px 32px rgba(77,196,150,0.25))' }}>
          <IconLatte size={110} color="#4dc496" />
        </div>
        <div className="absolute left-10 md:left-20 bottom-28 animate-float-slow hidden lg:block pointer-events-none"
          style={{ animationDelay: '1s' }}>
          <IconLeaf size={56} color="#c5eedd" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          MENU
      ══════════════════════════════════════════════ */}
      <section id="menu" className="py-24 px-6 md:px-12 lg:px-24">
        <div ref={menuAnim.ref} style={fadeIn(menuAnim.visible)}>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}>
              <IconCup size={13} color="#4a7c59" /> Our Menu
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3"
              style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Something for every <span style={{ color: '#4dc496' }}>matcha</span> mood
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: '#7a9080' }}>
              From cozy lattes to playful mochi — everything handcrafted daily.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {menuItems.map((item) => (
              <div key={item.id} className="card-lift rounded-3xl p-6 cursor-pointer"
                style={{ background: item.bg, border: `1.5px solid ${item.accent}28` }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl mb-4"
                  style={{ background: '#fff', boxShadow: `0 4px 16px -2px ${item.accent}40` }}>
                  {item.icon}
                </div>
                <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2 text-white"
                  style={{ background: item.tagColor }}>
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold mb-1" style={{ color: '#2d3a2e' }}>{item.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#7a9080' }}>{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold" style={{ color: item.accent }}>{item.price}</span>
                  <a href="https://wa.me/6281234567890?text=Saya%20mau%20order%20" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform hover:scale-110"
                    style={{ background: `linear-gradient(135deg,${item.accent},${item.tagColor})` }}>
                    +
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════ */}
      <section id="gallery" className="py-24 px-6 md:px-12 lg:px-24"
        style={{ background: 'linear-gradient(180deg,#fffdf7,#f0fdf4,#fffdf7)' }}>
        <div ref={galleryAnim.ref} style={fadeIn(galleryAnim.visible)}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#fff5f8', color: '#f54d8a', border: '1px solid #ffcadd' }}>
              <IconInstagram size={13} color="#f54d8a" /> Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold"
              style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              As seen on <span style={{ color: '#f54d8a' }}>Instagram</span>
            </h2>
            <p className="mt-3 text-sm" style={{ color: '#7a9080' }}>
              Follow <strong>@matchachi</strong> for daily updates & behind-the-scenes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {galleryItems.map((g, i) => (
              <a key={i} href="https://instagram.com/matchachi" target="_blank" rel="noopener noreferrer"
                className="card-lift rounded-3xl overflow-hidden aspect-square flex flex-col items-center justify-center gap-3 group"
                style={{ background: g.bg }}>
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {g.icon}
                </div>
                <span className="text-xs font-semibold" style={{ color: '#4a7c59' }}>{g.label}</span>
                <div className="absolute inset-0 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <IconInstagram size={28} color="white" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="https://instagram.com/matchachi" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: '#fff', border: '1.5px solid #ffcadd', color: '#f54d8a' }}>
              <IconInstagram size={16} color="#f54d8a" /> Follow @matchachi
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW WE BREW (STORY)
      ══════════════════════════════════════════════ */}
      <section id="story" className="py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#fffdf7 0%,#e8f8f0 50%,#fffdf7 100%)' }} />
        <div ref={processAnim.ref} className="relative z-10 max-w-5xl mx-auto" style={fadeIn(processAnim.visible)}>
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#fff5f8', color: '#f54d8a', border: '1px solid #ffcadd' }}>
              <IconHeart size={13} color="#f54d8a" /> Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-3"
              style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Brewed with <span style={{ color: '#f54d8a' }}>intention</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#7a9080' }}>
              Every MatchaChi cup follows a 4-step ritual to bring you the purest matcha experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="rounded-3xl p-6 text-center card-lift"
                style={{ background: '#fff', border: '1.5px solid #e6f4e6' }}>
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl mb-3"
                  style={{ background: step.bg }}>
                  {step.icon}
                </div>
                <div className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mx-auto mb-2"
                  style={{ background: '#e8f8f0', color: '#4a7c59' }}>
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold mb-1.5" style={{ color: '#2d3a2e' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#7a9080' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Story blurb */}
          <div className="mt-12 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{ background: 'linear-gradient(135deg,#e8f8f0,#fff5f8)' }}>
            <div className="flex-shrink-0 animate-float">
              <IconSmoothie size={72} color="#4dc496" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3"
                style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
                Born from a love of matcha
              </h3>
              <p className="text-base leading-relaxed" style={{ color: '#7a9080' }}>
                MatchaChi started in a tiny kitchen in 2022 — one matcha whisk, one dream.
                We believe good matcha should be accessible, joyful, and never bitter.
                Today we serve thousands of matcha lovers across Indonesia, using only
                ceremonial-grade tencha sourced directly from Uji, Kyoto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INFO — Hours, Location, Delivery
      ══════════════════════════════════════════════ */}
      <section id="info" className="py-24 px-6 md:px-12 lg:px-24">
        <div ref={infoAnim.ref} style={fadeIn(infoAnim.visible)}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}>
              <IconMapPin size={13} color="#4a7c59" /> Find Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold"
              style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Visit or <span style={{ color: '#4dc496' }}>order</span> anytime
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* Location */}
            <div className="rounded-3xl p-7 card-lift" style={{ background: '#e8f8f0', border: '1.5px solid #c5eedd' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: '#fff' }}>
                <IconMapPin size={24} color="#4a7c59" />
              </div>
              <h3 className="font-bold text-base mb-3" style={{ color: '#2d3a2e' }}>Lokasi</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#5a6e60' }}>
                Jl. Matcha Indah No. 12<br />
                Kebayoran Baru, Jakarta Selatan<br />
                DKI Jakarta 12180
              </p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: '#4a7c59' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#3a7d3a')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4a7c59')}>
                <IconMapPin size={13} color="#4a7c59" /> Buka di Google Maps →
              </a>
            </div>

            {/* Hours */}
            <div className="rounded-3xl p-7 card-lift" style={{ background: '#fff5f8', border: '1.5px solid #ffcadd' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: '#fff' }}>
                <IconClock size={24} color="#f54d8a" />
              </div>
              <h3 className="font-bold text-base mb-3" style={{ color: '#2d3a2e' }}>Jam Buka</h3>
              <ul className="space-y-2 text-sm" style={{ color: '#5a6e60' }}>
                {[
                  { day: 'Senin – Jumat', time: '08.00 – 21.00' },
                  { day: 'Sabtu', time: '07.00 – 22.00' },
                  { day: 'Minggu', time: '08.00 – 20.00' },
                  { day: 'Hari Libur Nasional', time: '09.00 – 19.00' },
                ].map((h, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{h.day}</span>
                    <span className="font-semibold" style={{ color: '#f54d8a' }}>{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium" style={{ color: '#4a7c59' }}>Sedang buka</span>
              </div>
            </div>

            {/* Delivery */}
            <div className="rounded-3xl p-7 card-lift" style={{ background: '#fdf6e7', border: '1.5px solid #f8e7a0' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: '#fff' }}>
                <IconMotorbike size={24} color="#b88a00" />
              </div>
              <h3 className="font-bold text-base mb-3" style={{ color: '#2d3a2e' }}>Area Delivery</h3>
              <ul className="space-y-2 text-sm" style={{ color: '#5a6e60' }}>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4dc496' }} />
                  Jabodetabek via GoFood & GrabFood
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4dc496' }} />
                  Seluruh Indonesia (produk kering)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#f8c84e' }} />
                  Same-day delivery Jaksel & Jakpus
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ffa4c2' }} />
                  Min. order Rp 30.000 (belum ongkir)
                </li>
              </ul>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: '#b88a00' }}>
                <IconPhone size={13} color="#b88a00" /> Hubungi kami →
              </a>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-6 max-w-4xl mx-auto rounded-3xl overflow-hidden"
            style={{ border: '1.5px solid #c8e6c8', height: '220px', background: 'linear-gradient(135deg,#e8f8f0,#c5eedd)', position: 'relative' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <IconMapPin size={36} color="#4a7c59" />
              <p className="text-sm font-medium" style={{ color: '#4a7c59' }}>Jl. Matcha Indah No. 12, Jakarta Selatan</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-xs font-semibold text-white transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
                Buka Google Maps
              </a>
            </div>
            {/* Grid lines to simulate map */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 220" preserveAspectRatio="none">
              {[0,40,80,120,160,200].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#4a7c59" strokeWidth="1"/>)}
              {[0,50,100,150,200,250,300,350,400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="#4a7c59" strokeWidth="1"/>)}
            </svg>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section id="faq" className="py-24 px-6 md:px-12 lg:px-24"
        style={{ background: 'linear-gradient(180deg,#fffdf7,#f0fdf4,#fffdf7)' }}>
        <div ref={faqAnim.ref} style={fadeIn(faqAnim.visible)}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}>
              <IconLeaf size={13} color="#4a7c59" /> FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold"
              style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              Pertanyaan yang sering <span style={{ color: '#4dc496' }}>ditanya</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-shadow duration-200"
                style={{
                  background: '#fff',
                  border: '1.5px solid',
                  borderColor: openFaq === i ? '#8adab8' : '#e6f4e6',
                  boxShadow: openFaq === i ? '0 4px 20px -4px rgba(77,196,150,0.2)' : 'none',
                }}>
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold" style={{ color: '#2d3a2e' }}>{item.q}</span>
                  <div style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }}>
                    <IconChevronDown size={16} color="#7a9080" />
                  </div>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#7a9080' }}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm mb-3" style={{ color: '#7a9080' }}>Masih ada pertanyaan lain?</p>
            <a href="https://wa.me/6281234567890?text=Halo%20MatchaChi,%20saya%20mau%20tanya"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)', color: '#fff' }}>
              <IconWhatsapp size={16} color="white" /> Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════ */}
      <section id="reviews" className="py-24 px-6 md:px-12 lg:px-24">
        <div ref={reviewAnim.ref} style={fadeIn(reviewAnim.visible)}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: '#fdf6e7', color: '#b88a00', border: '1px solid #f8e7a0' }}>
              <IconStar size={13} filled color="#f8c84e" /> Reviews
            </span>
            <h2 className="text-4xl md:text-5xl font-bold"
              style={{ color: '#2d3a2e', fontFamily: '"Playfair Display", Georgia, serif' }}>
              What our customers say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl p-7 card-lift"
                style={{ background: '#fff', border: '1.5px solid #e6f4e6' }}>
                <Stars n={t.stars} />
                <p className="mt-4 mb-5 text-sm leading-relaxed" style={{ color: '#5a6e60' }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{ background: i % 2 === 0 ? '#e8f8f0' : '#fff5f8' }}>
                    {i % 2 === 0
                      ? <IconLeaf size={18} color="#4a7c59" />
                      : <IconHeart size={18} color="#f54d8a" />}
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

      {/* ══════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════ */}
      <section id="order" className="px-6 md:px-12 lg:px-24 pb-24">
        <div ref={ctaAnim.ref}
          className="rounded-4xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg,#c5eedd 0%,#8adab8 40%,#ffa4c2 100%)',
            ...fadeIn(ctaAnim.visible),
          }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-15" style={{ background: '#fff' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/2 -translate-x-1/2 opacity-15" style={{ background: '#fff' }} />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <IconCup size={52} color="white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Ready for your first sip?
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Order via WhatsApp atau follow kami di Instagram untuk menu spesial hari ini!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/6281234567890?text=Hii%20MatchaChi!%20Saya%20mau%20order"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-transform hover:scale-105"
                style={{ background: '#fff', color: '#4a7c59', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.12)' }}>
                <IconWhatsapp size={18} color="#25d366" /> Order via WhatsApp
              </a>
              <a href="https://instagram.com/matchachi" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-transform hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)' }}>
                <IconInstagram size={18} color="white" /> @matchachi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="px-6 md:px-12 lg:px-24 pb-24 pt-4">
        <div className="max-w-5xl mx-auto">
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg,transparent,#c8e6c8,transparent)' }} />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#8adab8,#4dc496)' }}>
                <IconLeaf size={16} color="white" />
              </div>
              <span className="font-bold">Matcha<span style={{ color: '#f54d8a' }}>Chi</span></span>
            </div>
            <p className="text-sm text-center" style={{ color: '#7a9080' }}>
              © 2026 MatchaChi · Made with{' '}
              <IconCup size={13} color="#4dc496" style={{ display: 'inline' }} />{' '}
              and{' '}
              <IconHeart size={13} color="#f54d8a" style={{ display: 'inline' }} />{' '}
              in Indonesia
            </p>
            <div className="flex gap-3">
              {[
                { icon: <IconInstagram size={16} color="#f54d8a" />, href: 'https://instagram.com/matchachi', bg: '#fff5f8', border: '#ffcadd' },
                { icon: <IconWhatsapp size={16} color="#25d366" />, href: 'https://wa.me/6281234567890', bg: '#e8f8f0', border: '#c5eedd' },
                { icon: <IconTiktok size={16} color="#2d3a2e" />, href: 'https://tiktok.com/@matchachi', bg: '#f0fdf4', border: '#c8e6c8' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          FLOATING WHATSAPP BUTTON
      ══════════════════════════════════════════════ */}
      <a href="https://wa.me/6281234567890?text=Hii%20MatchaChi!%20Saya%20mau%20order"
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          background: 'linear-gradient(135deg,#4dc496,#25d366)',
          boxShadow: '0 8px 30px -4px rgba(37,211,102,0.50)',
        }}>
        <IconWhatsapp size={20} color="white" />
        <span className="hidden sm:inline">Order Sekarang</span>
      </a>

    </div>
  );
}
