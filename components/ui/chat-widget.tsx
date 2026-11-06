'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

// ─── Inline Icons ─────────────────────────────────────────────────────────────

const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const IconChat = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconLeafSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ─── AI Brain — keyword-based response engine ─────────────────────────────────

const BOT_NAME = 'Matcha';

interface QARule {
  keywords: string[];
  reply: string | string[];
}

const rules: QARule[] = [
  {
    keywords: ['halo', 'hai', 'hello', 'hi', 'hei', 'selamat'],
    reply: 'Haii! 🌿 Aku Matcha, asisten virtual MatchaChi. Ada yang bisa aku bantu hari ini?\n\nKamu bisa tanya soal menu, harga, jam buka, delivery, atau apa pun tentang MatchaChi! 💚',
  },
  {
    keywords: ['latte', 'matcha latte', 'kopi'],
    reply: '🍵 **Matcha Latte** adalah best seller kami!\n\nDibuat dari ceremonial grade matcha yang di-whisk lembut dengan steamed oat milk. Rasanya smooth, earthy, tidak pahit.\n\n💰 Harga: **Rp 38.000**\n\nMau order? Ketuk tombol WhatsApp di bawah ya! 💬',
  },
  {
    keywords: ['smoothie', 'jus', 'juice', 'blend'],
    reply: '🥤 **Matcha Smoothie** — favorit buat yang suka minuman dingin tebal!\n\nBlended matcha + frozen banana + strawberry + almond milk. Super thick dan refreshing.\n\n💰 Harga: **Rp 45.000**\n\nCocok banget buat siang-siang! ☀️',
  },
  {
    keywords: ['ice cream', 'es krim', 'icecream', 'eskrim', 'cone'],
    reply: '🍦 **Matcha Ice Cream** — triple scoop yang paling Instagrammable!\n\nTiga scoop: matcha, strawberry, dan matcha sorbet. Disajikan di waffle cone renyah.\n\n💰 Harga: **Rp 42.000**\n\nStok terbatas tiap hari, jadi buruan order! 🏃‍♀️',
  },
  {
    keywords: ['mochi', 'mochi matcha', 'japanese'],
    reply: '🍡 **Matcha Mochi** — lembut banget di mulut!\n\nIsi matcha & sakura cream, 3 pieces per serving. Beneran bikin nagih.\n\n💰 Harga: **Rp 28.000** (paling affordable!)\n\nFan favorite MatchaChi! ❤️',
  },
  {
    keywords: ['cake', 'kue', 'chiffon', 'tart'],
    reply: '🎂 **Matcha Cake** — tersedia seasonal!\n\nFluffy chiffon berlapis sakura cream dengan topping ceremonial matcha velvet di atas. Cantik banget buat foto.\n\n💰 Harga: **Rp 55.000**\n\nAvailable weekend only! 📅',
  },
  {
    keywords: ['waffle', 'wafle'],
    reply: '🧇 **Matcha Waffle** — crispy di luar, lembut di dalam!\n\nDisajikan dengan strawberry jam, whipped cream, dan fresh berries.\n\n💰 Harga: **Rp 48.000**\n\nAvailable Sabtu & Minggu saja ya! 📅',
  },
  {
    keywords: ['menu', 'daftar menu', 'apa saja', 'pilihan'],
    reply: '🌿 Ini menu lengkap MatchaChi:\n\n🍵 Matcha Latte — Rp 38.000\n🥤 Matcha Smoothie — Rp 45.000\n🍦 Matcha Ice Cream — Rp 42.000\n🍡 Matcha Mochi — Rp 28.000\n🎂 Matcha Cake — Rp 55.000\n🧇 Matcha Waffle — Rp 48.000\n\nSemua dibuat fresh setiap hari! Mau info lebih detail produk mana? 😊',
  },
  {
    keywords: ['harga', 'price', 'berapa', 'murah', 'mahal', 'promo', 'diskon'],
    reply: '💰 Range harga MatchaChi mulai dari **Rp 28.000** (Mochi) sampai **Rp 55.000** (Cake).\n\nPromo saat ini:\n🎉 **Beli 2 gratis 1 Mochi** setiap Rabu\n🎉 **Gratis upgrade oat milk** setiap weekend\n\nInfo promo terbaru follow @matchachi di Instagram ya! 📸',
  },
  {
    keywords: ['jam', 'buka', 'tutup', 'operasional', 'waktu', 'kapan'],
    reply: '🕐 Jam operasional MatchaChi:\n\n📅 Senin–Jumat: **08.00–21.00**\n📅 Sabtu: **07.00–22.00**\n📅 Minggu: **08.00–20.00**\n📅 Hari Libur: **09.00–19.00**\n\nSekarang sedang buka! 🟢',
  },
  {
    keywords: ['alamat', 'lokasi', 'dimana', 'mana', 'toko', 'tempat', 'cabang'],
    reply: '📍 Lokasi MatchaChi:\n\n**Jl. Matcha Indah No. 12**\nKebayoran Baru, Jakarta Selatan\nDKI Jakarta 12180\n\nMudah ditemukan — parkir luas, dekat halte Busway! 🚌\n\nCek di Google Maps untuk rute ya!',
  },
  {
    keywords: ['delivery', 'kirim', 'antar', 'pesan', 'gofood', 'grabfood', 'ojol'],
    reply: '🛵 Layanan delivery MatchaChi:\n\n✅ **Jabodetabek** via GoFood & GrabFood\n✅ **Same-day delivery** area Jaksel & Jakpus\n✅ **Seluruh Indonesia** untuk produk kering (powder, cookies)\n\nMinimum order: **Rp 30.000** (belum ongkir)\n\nOrder via WhatsApp juga bisa! 💬',
  },
  {
    keywords: ['non dairy', 'nondairy', 'oat', 'almond', 'soy', 'susu', 'lactose', 'intoleran', 'vegan'],
    reply: '🌱 Semua minuman MatchaChi bisa pakai:\n\n✅ **Oat milk** (default)\n✅ **Almond milk**\n✅ **Soy milk**\n\nGanti milk **gratis** tanpa biaya tambahan!\n\nTinggal request saat order ya 😊',
  },
  {
    keywords: ['gula', 'sugar', 'manis', 'less sweet', 'no sugar', 'diabetes', 'diet'],
    reply: '🍃 Bisa custom tingkat kemanisan!\n\n✅ **Extra sweet** (lebih manis)\n✅ **Regular** (standar)\n✅ **Less sweet** (50% gula)\n✅ **No sugar** (tanpa gula)\n\nRequest saja saat order, kami siap sesuaikan! 💚',
  },
  {
    keywords: ['grade', 'kualitas', 'ceremonial', 'culinary', 'jenis', 'origin', 'uji', 'kyoto'],
    reply: '🏆 MatchaChi menggunakan **Ceremonial Grade** dari **Uji, Kyoto**!\n\nIni grade tertinggi dalam hierarki matcha:\n🌿 Warna hijau cerah & vivid\n🍵 Rasa manis alami, tidak pahit\n☁️ Tekstur sangat halus\n\nDi-stone ground langsung dari ladang teh di Uji. Dipilih dengan ketat setiap batch! ✨',
  },
  {
    keywords: ['whatsapp', 'wa', 'chat', 'order', 'pesan', 'beli', 'contact', 'kontak', 'hubungi'],
    reply: '💬 Mau order atau ada pertanyaan lain?\n\nLangsung chat kami di:\n👉 **WhatsApp: 0812-3456-7890**\n👉 **Instagram: @matchachi**\n\nAtau klik tombol "Order via WhatsApp" yang ada di halaman ini!\n\nKami balas dalam 5–10 menit ⚡',
  },
  {
    keywords: ['instagram', 'ig', 'sosmed', 'social media', 'tiktok', 'follow'],
    reply: '📸 Follow MatchaChi di social media!\n\n🟢 **Instagram**: @matchachi\n🎵 **TikTok**: @matchachi\n💬 **WhatsApp**: 0812-3456-7890\n\nDi Instagram kami posting:\n📌 Menu baru & seasonal\n📌 Promo & giveaway\n📌 Behind-the-scenes\n\nJangan sampai ketinggalan promo ya! 💚',
  },
  {
    keywords: ['terima kasih', 'makasih', 'thanks', 'thank you', 'thx', 'tq'],
    reply: 'Sama-sama! 🌿 Senang bisa bantu kamu.\n\nKalau ada pertanyaan lain soal menu, delivery, atau apapun — jangan ragu tanya lagi ya! 💚\n\nSampai jumpa di MatchaChi! 🍵✨',
  },
  {
    keywords: ['bye', 'dadah', 'sampai jumpa', 'selamat tinggal', 'ciao', 'see you'],
    reply: 'Bye bye! 👋🌿 Sampai jumpa lagi!\n\nJangan lupa mampir ke MatchaChi ya. Selalu ada yang baru setiap minggu! 💚',
  },
];

const FALLBACK_REPLIES = [
  'Hmm, aku belum bisa jawab itu dengan pasti 🤔\n\nCoba tanya soal **menu, harga, jam buka, delivery**, atau langsung chat tim kami via WhatsApp ya! 💬',
  'Wah, itu pertanyaan yang menarik! Tapi sepertinya di luar kemampuanku 😅\n\nBuat info lebih lengkap, chat langsung ke **WhatsApp: 0812-3456-7890** ya!',
  'Maaf, aku masih belajar nih! 🌱\n\nYang aku tahu paling baik adalah soal **matcha, menu MatchaChi, dan cara order**. Coba tanya seputar itu ya! 🍵',
];

function getReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const rule of rules) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      const r = rule.reply;
      return Array.isArray(r) ? r[Math.floor(Math.random() * r.length)] : r;
    }
  }
  return FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
}

const QUICK_PROMPTS = [
  'Menu apa saja?',
  'Berapa harganya?',
  'Jam buka?',
  'Area delivery?',
  'Ada pilihan non-dairy?',
  'Cara order?',
];

const GREETING: Message = {
  id: 'greeting',
  role: 'bot',
  text: 'Haii! 👋 Aku **Matcha**, asisten virtual MatchaChi.\n\nAda yang bisa aku bantu? Kamu bisa tanya soal menu, harga, delivery, jam buka, dan masih banyak lagi! 🍵',
  time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
};

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
// Converts **bold**, newlines → spans

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split('\n').map((line, j, arr) => (
      <React.Fragment key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, typing]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate bot thinking delay (600–1200ms)
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: getReply(text),
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, delay);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Chat window ─────────────────────────────────────────────── */}
      <div
        className="fixed z-40 flex flex-col"
        style={{
          bottom: '88px',
          right: '24px',
          width: '360px',
          maxWidth: 'calc(100vw - 48px)',
          height: '520px',
          maxHeight: 'calc(100dvh - 140px)',
          borderRadius: '20px',
          background: '#fffdf7',
          border: '1.5px solid #c5eedd',
          boxShadow: '0 24px 64px -8px rgba(74,124,89,0.20), 0 8px 32px -4px rgba(0,0,0,0.08)',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#4dc496,#8adab8)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          {/* Bot avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.25)' }}>
            <IconLeafSmall />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-tight">{BOT_NAME}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.80)' }}>
              MatchaChi Assistant · Online 🟢
            </p>
          </div>
          <button onClick={() => setOpen(false)}
            className="text-white opacity-80 hover:opacity-100 transition-opacity p-1">
            <IconChevronDown />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#c5eedd transparent' }}>
          {messages.map((msg) => (
            <div key={msg.id}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {msg.role === 'bot' && (
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'linear-gradient(135deg,#4dc496,#8adab8)' }}>
                  <span style={{ color: 'white' }}><IconLeafSmall /></span>
                </div>
              )}

              <div className={`flex flex-col gap-0.5 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg,#4dc496,#8adab8)'
                      : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#2d3a2e',
                    border: msg.role === 'bot' ? '1px solid #e6f4e6' : 'none',
                    borderRadius: msg.role === 'user'
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    boxShadow: '0 2px 8px -2px rgba(0,0,0,0.06)',
                  }}>
                  {renderText(msg.text)}
                </div>
                <span className="text-[10px]" style={{ color: '#aab8b0' }}>{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#4dc496,#8adab8)' }}>
                <span style={{ color: 'white' }}><IconLeafSmall /></span>
              </div>
              <div className="px-4 py-3 rounded-2xl" style={{ background: '#fff', border: '1px solid #e6f4e6', borderRadius: '18px 18px 18px 4px' }}>
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: '#8adab8',
                        animation: 'bounce 1.2s ease infinite',
                        animationDelay: `${i * 0.2}s`,
                      }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="px-4 pb-2 flex gap-2 flex-wrap flex-shrink-0">
          {QUICK_PROMPTS.slice(0, 3).map(p => (
            <button key={p} onClick={() => sendMessage(p)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full transition-colors duration-150"
              style={{ background: '#e8f8f0', color: '#4a7c59', border: '1px solid #c5eedd' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#c5eedd')}
              onMouseLeave={e => (e.currentTarget.style.background = '#e8f8f0')}>
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 pb-3 flex-shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
            style={{
              background: '#f4faf4',
              border: '1.5px solid #c5eedd',
              color: '#2d3a2e',
              fontSize: '14px',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = '#4dc496')}
            onBlur={e => (e.currentTarget.style.borderColor = '#c5eedd')}
          />
          <button type="submit" disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150"
            style={{
              background: input.trim() ? 'linear-gradient(135deg,#4dc496,#8adab8)' : '#e6f4e6',
              color: input.trim() ? 'white' : '#a3d4a3',
            }}>
            <IconSend />
          </button>
        </form>
      </div>

      {/* ── Trigger button ───────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed z-50 flex items-center justify-center transition-all duration-200"
        style={{
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: open ? '#fff' : 'linear-gradient(135deg,#4dc496,#8adab8)',
          color: open ? '#4a7c59' : '#fff',
          border: open ? '2px solid #c5eedd' : 'none',
          boxShadow: open
            ? '0 4px 20px -4px rgba(74,124,89,0.25)'
            : '0 8px 30px -4px rgba(77,196,150,0.50)',
          transform: open ? 'rotate(0deg)' : 'rotate(0deg) scale(1)',
        }}
        aria-label="Chat dengan Matcha"
      >
        {open ? <IconX /> : <IconChat />}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ background: '#f54d8a' }}>
            {unread}
          </span>
        )}
      </button>

      {/* Bouncing dots keyframe — injected inline */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
