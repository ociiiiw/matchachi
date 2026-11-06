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
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
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

// ─── Deterministic NLU Engine ─────────────────────────────────────────────────
//
// Each intent has:
//   • `id`       — unique stable identifier
//   • `triggers` — weighted keyword sets; each entry is [keyword, weight]
//   • `reply`    — single canonical answer (deterministic)
//   • `context`  — topic tag stored after match (for follow-up detection)
//
// Scoring: for every trigger in the best matching intent,
//   score += weight * (exact_match ? 1 : partial_bonus)
// Highest score wins. Ties → higher-priority intent (order in array).

interface Intent {
  id: string;
  triggers: [string, number][];
  reply: string;
  context: string;
}

// ── RLHF-expanded intent bank (50 intents) ────────────────────────────────────

const INTENTS: Intent[] = [

  // ── Greetings ───────────────────────────────────────────────────────────────
  {
    id: 'greeting',
    triggers: [
      ['halo', 3], ['hai', 3], ['haii', 3], ['hello', 3], ['hi', 3], ['hei', 3],
      ['selamat pagi', 4], ['selamat siang', 4], ['selamat sore', 4], ['selamat malam', 4],
      ['assalamu', 3], ['pagi', 2], ['siang', 1], ['sore', 1], ['malam', 1],
      ['apa kabar', 3], ['gimana kabar', 3], ['hola', 2], ['hey', 2],
    ],
    reply: 'Haii! 🌿 Aku **Matcha**, asisten virtual MatchaChi.\n\nAda yang bisa aku bantu hari ini? Kamu bisa tanya soal menu, harga, jam buka, delivery, custom order, atau apa pun tentang MatchaChi! 💚',
    context: 'greeting',
  },

  // ── Full menu list ───────────────────────────────────────────────────────────
  {
    id: 'menu_all',
    triggers: [
      ['menu', 4], ['daftar menu', 5], ['apa saja menunya', 5], ['ada menu apa', 5],
      ['list menu', 5], ['semua menu', 5], ['pilihan menu', 4], ['produk apa saja', 4],
      ['jual apa', 4], ['ada apa saja', 3], ['mau lihat menu', 4], ['cek menu', 4],
      ['menu nya', 3], ['menunya', 3], ['katalog', 3], ['produk', 2],
    ],
    reply: '🌿 Menu lengkap MatchaChi:\n\n🍵 **Matcha Latte** — Rp 38.000 ⭐ Best Seller\n🥤 **Matcha Smoothie** — Rp 45.000 🆕 New\n🍦 **Matcha Ice Cream** — Rp 42.000 ☀️ Summer Hit\n🍡 **Matcha Mochi** — Rp 28.000 ❤️ Fan Fav\n🎂 **Matcha Cake** — Rp 55.000 🌸 Seasonal\n🧇 **Matcha Waffle** — Rp 48.000 📅 Weekend\n\nKetik nama menu untuk info detail! Atau langsung order via WhatsApp 💬',
    context: 'menu',
  },

  // ── Matcha Latte ─────────────────────────────────────────────────────────────
  {
    id: 'menu_latte',
    triggers: [
      ['latte', 5], ['matcha latte', 6], ['hot matcha', 4], ['iced latte', 4],
      ['matcha susu', 4], ['susu matcha', 4], ['matcha hot', 3], ['matcha iced', 3],
      ['hot drink', 2], ['minuman panas', 2], ['minuman hangat', 2],
      ['oat milk', 3], ['steamed milk', 3], ['foam matcha', 3],
    ],
    reply: '🍵 **Matcha Latte** — Best Seller kami!\n\nCeremonial grade matcha di-whisk lembut dengan steamed **oat milk**, hasilnya smooth, earthy, dan sama sekali tidak pahit.\n\n💰 Harga: **Rp 38.000**\n🌡️ Tersedia: Hot & Iced\n🥛 Milk: Oat (default) · Almond · Soy\n🍬 Level manis: No sugar · Less · Regular · Extra\n\nMau order? → WhatsApp: **0812-3456-7890** 💬',
    context: 'latte',
  },

  // ── Matcha Smoothie ──────────────────────────────────────────────────────────
  {
    id: 'menu_smoothie',
    triggers: [
      ['smoothie', 5], ['matcha smoothie', 6], ['jus matcha', 4], ['juice matcha', 4],
      ['blend matcha', 4], ['matcha blend', 4], ['minuman dingin', 2], ['thick', 3],
      ['banana matcha', 4], ['strawberry matcha', 4], ['almond milk matcha', 4],
      ['frozen', 3], ['refreshing', 2], ['segar', 2],
    ],
    reply: '🥤 **Matcha Smoothie** — untuk yang suka minuman tebal & dingin!\n\nBlended dari matcha, frozen banana, strawberry, dan almond milk. Hasilnya **thick banget** dan super refreshing.\n\n💰 Harga: **Rp 45.000**\n🌡️ Tersedia: Cold only\n🍬 Level manis: bisa dikurangi sesuai request\n\nCocok banget buat hari-hari panas! ☀️',
    context: 'smoothie',
  },

  // ── Matcha Ice Cream ─────────────────────────────────────────────────────────
  {
    id: 'menu_icecream',
    triggers: [
      ['ice cream', 5], ['es krim', 5], ['icecream', 5], ['eskrim', 5],
      ['cone', 4], ['waffle cone', 4], ['scoop', 4], ['gelato', 3],
      ['sorbet', 4], ['matcha sorbet', 4], ['triple scoop', 4],
      ['es krim matcha', 5], ['matcha es krim', 5], ['frozen dessert', 3],
    ],
    reply: '🍦 **Matcha Ice Cream** — si Instagrammable!\n\nTriple scoop: **matcha**, **strawberry**, dan **matcha sorbet** — disajikan di waffle cone renyah buatan sendiri.\n\n💰 Harga: **Rp 42.000**\n⚠️ Stok terbatas tiap hari (habis sebelum jam 7 malam!)\n\nBuruan order sebelum kehabisan! 🏃‍♀️',
    context: 'icecream',
  },

  // ── Matcha Mochi ─────────────────────────────────────────────────────────────
  {
    id: 'menu_mochi',
    triggers: [
      ['mochi', 5], ['matcha mochi', 6], ['kue mochi', 5], ['japanese mochi', 5],
      ['mochi matcha', 5], ['daifuku', 4], ['sticky rice', 3],
      ['sakura cream', 4], ['cream mochi', 4], ['isi matcha', 3],
      ['per serving', 3], ['3 pieces', 3], ['tiga buah', 3],
    ],
    reply: '🍡 **Matcha Mochi** — lembut banget, bikin nagih!\n\nBola mochi kenyal diisi **matcha cream** + **sakura cream**. Dijual 3 pieces per serving, dikemas cantik.\n\n💰 Harga: **Rp 28.000** (paling affordable!)\n🌡️ Tersedia: Room temp & chilled\n\n✨ Fan Favorite MatchaChi — selalu sold out akhir pekan!',
    context: 'mochi',
  },

  // ── Matcha Cake ──────────────────────────────────────────────────────────────
  {
    id: 'menu_cake',
    triggers: [
      ['cake', 5], ['kue', 4], ['matcha cake', 6], ['chiffon', 4],
      ['layer cake', 4], ['tart matcha', 4], ['kue matcha', 5],
      ['birthday cake', 3], ['kue ulang tahun', 3], ['bolu', 3],
      ['sakura cream', 3], ['frosting', 3], ['slice cake', 4],
    ],
    reply: '🎂 **Matcha Cake** — menu seasonal paling dinantikan!\n\nFluffy chiffon berlapis **sakura cream** dengan topping ceremonial matcha velvet. Foto-able banget!\n\n💰 Harga: **Rp 55.000** per slice\n📅 Tersedia: **Weekend only** (Sabtu–Minggu)\n🎁 Bisa custom untuk birthday — hubungi kami min. 2 hari sebelumnya\n\nPesan duluan sebelum weekend ya! 📲',
    context: 'cake',
  },

  // ── Matcha Waffle ────────────────────────────────────────────────────────────
  {
    id: 'menu_waffle',
    triggers: [
      ['waffle', 5], ['wafle', 5], ['matcha waffle', 6], ['waffle matcha', 6],
      ['belgian waffle', 4], ['crispy waffle', 4], ['waffle stack', 4],
      ['strawberry waffle', 3], ['whipped cream waffle', 3], ['fresh berries', 3],
    ],
    reply: '🧇 **Matcha Waffle** — crispy di luar, lembut di dalam!\n\nDisajikan dengan **strawberry jam** homemade, whipped cream, dan fresh berries import.\n\n💰 Harga: **Rp 48.000**\n📅 Tersedia: **Sabtu & Minggu** saja\n⚡ Dibuat fresh to order — tunggu ~10 menit ya!\n\nPaling enak dimakan hangat-hangat! 🔥',
    context: 'waffle',
  },

  // ── Harga / Price ────────────────────────────────────────────────────────────
  {
    id: 'price',
    triggers: [
      ['harga', 5], ['price', 5], ['berapa harga', 6], ['berapa harganya', 6],
      ['berapa', 3], ['cost', 4], ['biaya', 4], ['tarif', 4],
      ['murah', 3], ['mahal', 3], ['budget', 3], ['paling murah', 4],
      ['range harga', 5], ['harga semua', 5], ['daftar harga', 5],
    ],
    reply: '💰 **Daftar harga MatchaChi:**\n\n🍵 Matcha Latte — **Rp 38.000**\n🥤 Matcha Smoothie — **Rp 45.000**\n🍦 Matcha Ice Cream — **Rp 42.000**\n🍡 Matcha Mochi — **Rp 28.000** ← paling terjangkau!\n🎂 Matcha Cake — **Rp 55.000**\n🧇 Matcha Waffle — **Rp 48.000**\n\nSemua harga sudah include PPN. Tidak ada biaya tambahan untuk penggantian jenis susu! 🌱',
    context: 'price',
  },

  // ── Promo / Diskon ───────────────────────────────────────────────────────────
  {
    id: 'promo',
    triggers: [
      ['promo', 5], ['diskon', 5], ['discount', 5], ['voucher', 4],
      ['kupon', 4], ['potongan', 4], ['cashback', 4], ['gratis', 3],
      ['buy one get one', 4], ['bogo', 4], ['promo hari ini', 5],
      ['ada promo', 5], ['promo minggu ini', 5], ['sale', 3],
    ],
    reply: '🎉 **Promo aktif MatchaChi:**\n\n✅ **Rabu Mochi** — beli 2 serving mochi, gratis 1\n✅ **Weekend Upgrade** — gratis upgrade oat milk setiap Sabtu–Minggu\n✅ **First Order** — diskon 10% untuk pembelian pertama via WhatsApp (kode: MATCHA10)\n✅ **Birthday Treat** — gratis mochi di hari ulang tahunmu! (tunjukkan KTP)\n\n📸 Follow **@matchachi** di Instagram untuk promo terbaru & flash sale! 💚',
    context: 'promo',
  },

  // ── Jam Buka ─────────────────────────────────────────────────────────────────
  {
    id: 'hours',
    triggers: [
      ['jam', 4], ['buka', 4], ['tutup', 4], ['jam buka', 6], ['jam operasional', 6],
      ['jam berapa', 5], ['buka jam', 5], ['tutup jam', 5], ['kapan buka', 5],
      ['hari apa', 4], ['hari operasional', 4], ['libur', 3],
      ['open', 3], ['close', 3], ['opening hours', 4], ['operating hours', 4],
      ['senin', 2], ['selasa', 2], ['rabu', 2], ['kamis', 2], ['jumat', 2], ['sabtu', 2], ['minggu', 2],
    ],
    reply: '🕐 **Jam operasional MatchaChi:**\n\n📅 Senin – Jumat: **08.00 – 21.00 WIB**\n📅 Sabtu: **07.00 – 22.00 WIB**\n📅 Minggu: **08.00 – 20.00 WIB**\n📅 Hari Libur Nasional: **09.00 – 19.00 WIB**\n\n🟢 Saat ini **sedang buka!**\n\nOrder via WhatsApp bisa dilakukan sejak 30 menit sebelum jam tutup ya 📲',
    context: 'hours',
  },

  // ── Lokasi / Alamat ──────────────────────────────────────────────────────────
  {
    id: 'location',
    triggers: [
      ['alamat', 5], ['lokasi', 5], ['dimana', 5], ['di mana', 5], ['where', 4],
      ['toko', 3], ['tempat', 3], ['cabang', 4], ['outlet', 4],
      ['google maps', 4], ['maps', 4], ['gmaps', 4], ['arah', 3],
      ['kebayoran', 4], ['jakarta selatan', 4], ['jaksel', 4],
      ['parkir', 3], ['aksesibel', 2], ['mudah dijangkau', 3],
      ['ada di mana', 5], ['tokonya di mana', 5],
    ],
    reply: '📍 **Lokasi MatchaChi:**\n\nJl. Matcha Indah No. 12\nKebayoran Baru, **Jakarta Selatan**\nDKI Jakarta 12180\n\n🚌 Dekat halte Busway Blok M\n🅿️ Parkir motor & mobil tersedia\n🏪 Buka setiap hari\n\n📲 **Google Maps** → cari "MatchaChi Jakarta"\n\nAda pertanyaan lain soal rute? Hubungi kami via WhatsApp! 💬',
    context: 'location',
  },

  // ── Delivery ─────────────────────────────────────────────────────────────────
  {
    id: 'delivery',
    triggers: [
      ['delivery', 5], ['kirim', 5], ['antar', 4], ['diantar', 4],
      ['gofood', 5], ['grabfood', 5], ['ojol', 4], ['ojek online', 4],
      ['pesan online', 4], ['order online', 4], ['pengiriman', 5],
      ['ongkir', 4], ['ongkos kirim', 4], ['biaya kirim', 4],
      ['jangkauan', 4], ['area', 3], ['wilayah', 3], ['coverage', 3],
      ['jabodetabek', 4], ['jakarta', 2], ['bogor', 3], ['depok', 3], ['tangerang', 3], ['bekasi', 3],
      ['same day', 4], ['same-day', 4], ['hari ini', 3],
    ],
    reply: '🛵 **Layanan delivery MatchaChi:**\n\n✅ **Jabodetabek** — via GoFood & GrabFood (real-time)\n✅ **Jaksel & Jakpus** — same-day delivery via WhatsApp\n✅ **Seluruh Indonesia** — produk kering (powder, cookies) via J&T / JNE\n\n💵 Minimum order: **Rp 30.000** (belum ongkir)\n⏱️ Estimasi delivery: 30–60 menit (Jabodetabek)\n\nOrder via WhatsApp untuk **jadwal khusus** atau **bulk order**! 📦',
    context: 'delivery',
  },

  // ── Minimum Order ────────────────────────────────────────────────────────────
  {
    id: 'min_order',
    triggers: [
      ['minimum order', 5], ['min order', 5], ['minimal order', 5],
      ['minimal beli', 4], ['paling sedikit', 3], ['batas minimum', 4],
      ['ada minimum', 4], ['berapa minimum', 5],
    ],
    reply: '📦 **Minimum order MatchaChi:**\n\n🏪 **Pickup / dine-in**: tidak ada minimum order\n🛵 **Delivery (ojol)**: minimum **Rp 30.000** (sebelum ongkir)\n📬 **Pengiriman luar kota**: minimum **Rp 100.000**\n\nUntuk order besar atau corporate order — hubungi langsung via WhatsApp ya! 💼',
    context: 'delivery',
  },

  // ── Non-dairy / Plant-based ──────────────────────────────────────────────────
  {
    id: 'nondairy',
    triggers: [
      ['non dairy', 5], ['nondairy', 5], ['oat milk', 4], ['almond milk', 4],
      ['soy milk', 4], ['susu kedelai', 4], ['susu nabati', 4],
      ['plant based', 4], ['vegan', 5], ['vegetarian', 4], ['dairy free', 5],
      ['lactose', 4], ['intoleran', 4], ['alergi susu', 5], ['no dairy', 5],
      ['milk alternative', 4], ['pengganti susu', 4],
    ],
    reply: '🌱 **Pilihan susu nabati MatchaChi:**\n\nSemua minuman bisa pakai:\n✅ **Oat milk** (default, creamy & slightly sweet)\n✅ **Almond milk** (nutty, less sweet)\n✅ **Soy milk** (full-bodied, tinggi protein)\n\n💚 Penggantian milk **gratis** tanpa biaya tambahan!\n\nTinggal request saat order, kami akan sesuaikan. Cocok untuk vegan, lactose intolerant, atau yang ingin healthier option 🌿',
    context: 'nondairy',
  },

  // ── Sugar level ──────────────────────────────────────────────────────────────
  {
    id: 'sugar',
    triggers: [
      ['gula', 4], ['sugar', 4], ['manis', 3], ['kemanisan', 3], ['manis banget', 4],
      ['kurang manis', 4], ['less sweet', 5], ['no sugar', 5], ['sugar free', 5],
      ['tanpa gula', 5], ['diet', 3], ['diabetes', 4], ['kencing manis', 4],
      ['terlalu manis', 4], ['extra sweet', 4], ['level manis', 5],
      ['gula berapa', 4], ['bisa dikurangi', 4],
    ],
    reply: '🍃 **Custom level kemanisan MatchaChi:**\n\n🔴 **Extra sweet** (lebih manis dari standard)\n🟡 **Regular** (standard)\n🟢 **Less sweet** (50% gula)\n⚪ **No sugar** (tanpa gula sama sekali)\n\nCukup request tingkat kemanisan saat order — kami sesuaikan tanpa biaya tambahan!\n\nCocok untuk yang sedang diet, diabetes, atau simply prefer less sweet. 💚',
    context: 'sugar',
  },

  // ── Matcha grade / kualitas ──────────────────────────────────────────────────
  {
    id: 'quality',
    triggers: [
      ['grade', 5], ['kualitas', 4], ['ceremonial', 5], ['ceremonial grade', 6],
      ['culinary grade', 4], ['jenis matcha', 4], ['matcha asli', 4],
      ['uji', 4], ['kyoto', 4], ['jepang', 4], ['japan', 4],
      ['teh matcha', 4], ['bubuk matcha', 4], ['powder matcha', 4],
      ['organik', 4], ['organic', 4], ['stone ground', 4], ['stone-ground', 4],
      ['keaslian', 3], ['original', 3], ['genuine', 3], ['authentic', 4],
    ],
    reply: '🏆 **Grade matcha yang kami gunakan:**\n\nMatchaChi eksklusif pakai **Ceremonial Grade** dari **Uji, Kyoto** — grade tertinggi dalam hierarki matcha:\n\n🌿 **Warna**: hijau cerah & vivid (karena tinggi klorofil)\n☁️ **Tekstur**: ultra-halus, stone-ground oleh pengrajin tradisional\n🍵 **Rasa**: manis alami, umami kuat, zero bitterness\n🌱 **Produksi**: dipanen dari daun muda (tencha) yang ditanam di bawah naungan\n\nSetiap batch kami verifikasi keasliannya langsung dari supplier di Uji. ✅',
    context: 'quality',
  },

  // ── Custom order / personalisasi ─────────────────────────────────────────────
  {
    id: 'custom_order',
    triggers: [
      ['custom', 4], ['personalisasi', 4], ['request', 3], ['sesuai keinginan', 4],
      ['bisa custom', 5], ['ada request', 4], ['special request', 5],
      ['modifikasi', 4], ['tambahan', 3], ['extra', 3], ['tambah topping', 4],
      ['topping', 4], ['tambah boba', 3], ['jelly', 3], ['cincau', 3],
    ],
    reply: '✨ **Custom order di MatchaChi:**\n\nBisa banget! Kamu bisa request:\n🍬 Level kemanisan (no sugar / less / regular / extra)\n🥛 Jenis susu (oat / almond / soy)\n🌡️ Suhu (hot / iced / extra cold)\n➕ Extra topping: boba, jelly cincau, whipped cream (+Rp 5.000)\n💪 Extra shot matcha (+Rp 8.000)\n📦 Packaging khusus untuk gift / hampers\n\nCukup tulis request di pesan WhatsApp kamu! 💬',
    context: 'custom',
  },

  // ── Hampers / Gift ───────────────────────────────────────────────────────────
  {
    id: 'hampers',
    triggers: [
      ['hampers', 5], ['gift', 4], ['hadiah', 4], ['kado', 4], ['parcel', 4],
      ['packaging cantik', 4], ['gift box', 5], ['bingkisan', 4],
      ['untuk hadiah', 4], ['mau kasih hadiah', 4], ['lebaran', 3],
      ['natal', 3], ['ulang tahun', 3], ['anniversary', 3],
    ],
    reply: '🎁 **Gift & Hampers MatchaChi:**\n\nKami menyediakan custom hampers matcha yang cantik!\n\n📦 **Isi hampers bisa include:**\n• Matcha powder (30g / 50g)\n• Matcha cookies (1–3 box)\n• Custom mochi box\n• Kartu ucapan personal\n• Packaging premium ribbon\n\n💰 Harga mulai **Rp 150.000**\n📅 Pesan min. **3 hari sebelumnya**\n\nHubungi via WhatsApp untuk diskusi paket! 💬',
    context: 'hampers',
  },

  // ── Bulk / Corporate Order ───────────────────────────────────────────────────
  {
    id: 'bulk_order',
    triggers: [
      ['bulk', 5], ['corporate', 5], ['perusahaan', 4], ['kantor', 4],
      ['event', 4], ['acara', 4], ['wedding', 4], ['pernikahan', 4],
      ['seminar', 4], ['gathering', 4], ['meeting', 3],
      ['banyak', 3], ['ratusan', 4], ['puluhan', 4], ['order besar', 5],
      ['catering', 4], ['vendor', 4],
    ],
    reply: '🏢 **Corporate & Bulk Order MatchaChi:**\n\nKami melayani order dalam jumlah besar untuk:\n✅ Event kantor / gathering\n✅ Wedding & reception\n✅ Seminar & workshop\n✅ Hampers corporate\n\n💡 Minimum bulk: **50 pcs** (dapat harga spesial!)\n📅 Booking min. **5–7 hari sebelumnya**\n\n📞 Hubungi langsung:\n💬 WhatsApp: **0812-3456-7890**\n📧 Email: hello@matchachi.id\n\nKita diskusikan kebutuhan event kamu! 🌿',
    context: 'bulk',
  },

  // ── Cara Order ───────────────────────────────────────────────────────────────
  {
    id: 'how_to_order',
    triggers: [
      ['cara order', 5], ['bagaimana order', 5], ['gimana cara beli', 5],
      ['cara beli', 5], ['cara pesan', 5], ['mau order', 4], ['mau beli', 4],
      ['langkah order', 4], ['prosedur order', 4], ['step order', 4],
      ['bisa order', 4], ['how to order', 4], ['pemesanan', 4],
    ],
    reply: '🛒 **Cara order MatchaChi:**\n\n**1️⃣ Via WhatsApp (paling mudah!)**\nKetik pesanan ke **0812-3456-7890**\nFormat: Nama · Menu · Jumlah · Suhu · Level manis\n\n**2️⃣ Via GoFood / GrabFood**\nCari "MatchaChi" di app\nOrder seperti biasa, langsung diantar! 🛵\n\n**3️⃣ Langsung ke toko (dine-in / pickup)**\nJl. Matcha Indah No. 12, Kebayoran Baru\n\n⏱️ Estimasi ready: 10–15 menit setelah order diterima',
    context: 'order',
  },

  // ── Metode pembayaran ────────────────────────────────────────────────────────
  {
    id: 'payment',
    triggers: [
      ['bayar', 4], ['pembayaran', 5], ['payment', 5], ['metode bayar', 5],
      ['transfer', 4], ['bca', 3], ['mandiri', 3], ['gopay', 4], ['ovo', 4],
      ['dana', 4], ['shopeepay', 4], ['qris', 5], ['tunai', 4], ['cash', 4],
      ['kartu kredit', 4], ['debit', 4], ['credit card', 4],
      ['bisa bayar pakai', 4], ['terima', 3],
    ],
    reply: '💳 **Metode pembayaran MatchaChi:**\n\n✅ **Cash** (dine-in & pickup)\n✅ **QRIS** (semua e-wallet support!)\n✅ **Transfer bank**: BCA, Mandiri, BRI, BNI\n✅ **E-wallet**: GoPay, OVO, DANA, ShopeePay, LinkAja\n✅ **Kartu debit/kredit**: Visa, Mastercard\n\nUntuk order online via GoFood/GrabFood — bayar sesuai metode di app masing-masing ya! 📱',
    context: 'payment',
  },

  // ── Apakah halal ────────────────────────────────────────────────────────────
  {
    id: 'halal',
    triggers: [
      ['halal', 6], ['sertifikat halal', 6], ['mui', 5], ['halal mui', 6],
      ['haram', 5], ['alkohol', 4], ['pork', 4], ['babi', 4],
      ['muslim', 4], ['islami', 4], ['boleh dimakan', 3],
    ],
    reply: '✅ **MatchaChi 100% Halal!**\n\nSeluruh produk kami:\n🌿 Tidak mengandung alkohol\n🚫 Bebas bahan babi (pork-free)\n🏷️ Proses sertifikasi MUI sedang berjalan\n📋 Bahan baku matcha dari supplier bersertifikasi\n\nSemua ingredient bisa kami tunjukkan saat diminta. Silakan tanya lebih detail via WhatsApp ya! 💚',
    context: 'halal',
  },

  // ── Alergi / Intoleransi ─────────────────────────────────────────────────────
  {
    id: 'allergy',
    triggers: [
      ['alergi', 5], ['allergy', 5], ['allergen', 5], ['intoleran', 4],
      ['gluten', 5], ['gluten free', 5], ['nut allergy', 5], ['kacang', 3],
      ['alergi susu', 5], ['alergi kacang', 5], ['alergi telur', 4],
      ['tidak bisa makan', 3], ['pantangan', 4], ['kontraindikasi', 3],
    ],
    reply: '⚠️ **Info alergen MatchaChi:**\n\n📋 Produk kami mengandung:\n• **Susu** (bisa diganti oat/almond/soy)\n• **Gluten** (waffle & cake — tidak GF)\n• **Kacang** (almond milk optional)\n• **Telur** (cake & waffle)\n\n🌱 **Pilihan untuk alergi susu**: oat milk atau almond milk (gratis penggantian)\n\nJika kamu punya alergi serius, **mohon informasikan saat order** via WhatsApp agar kami bisa mempersiapkan dengan hati-hati. Kesehatanmu prioritas kami! 💚',
    context: 'allergy',
  },

  // ── Kalori / Nutrisi ─────────────────────────────────────────────────────────
  {
    id: 'nutrition',
    triggers: [
      ['kalori', 5], ['calories', 5], ['nutrisi', 5], ['nutrition', 5],
      ['sehat', 4], ['healthy', 4], ['diet', 3], ['protein', 3],
      ['karbohidrat', 3], ['lemak', 3], ['fat', 3], ['carbs', 3],
      ['nilai gizi', 5], ['informasi gizi', 5], ['kandungan', 3],
    ],
    reply: '🌿 **Info nutrisi (approx per serving):**\n\n🍵 **Matcha Latte** (oat milk): ~180 kcal, 6g protein\n🥤 **Smoothie**: ~220 kcal, 4g protein\n🍡 **Mochi** (3 pcs): ~150 kcal\n🍦 **Ice Cream**: ~280 kcal\n🎂 **Cake** (1 slice): ~320 kcal\n🧇 **Waffle**: ~350 kcal\n\n💡 Tips: pilih **no sugar + oat milk** untuk opsi paling sehat!\n\nInfo nutrisi detail tersedia di toko atau hubungi kami 📋',
    context: 'nutrition',
  },

  // ── Paket / Bundle ───────────────────────────────────────────────────────────
  {
    id: 'bundle',
    triggers: [
      ['paket', 4], ['bundle', 5], ['set', 3], ['combo', 4], ['hemat', 4],
      ['paket hemat', 5], ['ada paket', 5], ['bundling', 5],
      ['beli banyak', 4], ['diskon bundel', 4],
    ],
    reply: '🎁 **Paket hemat MatchaChi:**\n\n☕ **Paket Chill** (Rp 75.000)\nLatte + Mochi (save Rp 11.000!)\n\n🌿 **Paket Weekend** (Rp 88.000)\nWaffle + Ice Cream (save Rp 2.000 + prioritas antrian)\n\n🧋 **Paket Best of** (Rp 110.000)\nLatte + Smoothie + Mochi (save Rp 11.000!)\n\nOrder paket via WhatsApp untuk dapatkan harganya! 💬',
    context: 'bundle',
  },

  // ── Pickup / Dine-in ─────────────────────────────────────────────────────────
  {
    id: 'pickup',
    triggers: [
      ['pickup', 5], ['pick up', 5], ['dine in', 4], ['dine-in', 4],
      ['makan di tempat', 4], ['ambil sendiri', 4], ['take away', 4],
      ['takeaway', 4], ['to go', 4], ['bawa pulang', 4],
    ],
    reply: '🏪 **Dine-in & Pickup di MatchaChi:**\n\n✅ **Dine-in** tersedia! Seating indoor & outdoor\n✅ **Pickup** bisa langsung ambil di toko\n✅ **Takeaway** dengan packaging eco-friendly\n\n📍 Jl. Matcha Indah No. 12, Kebayoran Baru\n⏱️ Ready dalam 10–15 menit\n💡 Pre-order via WhatsApp untuk langsung ambil tanpa antri! 🚀',
    context: 'pickup',
  },

  // ── Feedback / Komplain ──────────────────────────────────────────────────────
  {
    id: 'feedback',
    triggers: [
      ['komplain', 5], ['saran', 4], ['masukan', 4], ['feedback', 5],
      ['tidak enak', 4], ['kecewa', 4], ['buruk', 3], ['mengecewakan', 4],
      ['salah order', 4], ['order salah', 4], ['tidak sesuai', 4],
      ['complaint', 5], ['refund', 5], ['kembalikan', 4], ['uang kembali', 4],
    ],
    reply: 'Aduh, kami minta maaf banget atas pengalamanmu! 🙏\n\nKami serius menanggapi setiap feedback. Untuk komplain atau refund, langsung hubungi:\n\n💬 **WhatsApp**: 0812-3456-7890\n📧 **Email**: hello@matchachi.id\n\n📋 Mohon sertakan:\n• Nomor order / tanggal beli\n• Foto produk (jika ada masalah)\n• Deskripsi masalah\n\nKami akan merespons dalam **1x24 jam** dan mencari solusi terbaik! 💚',
    context: 'feedback',
  },

  // ── Menu seasonal / limited ──────────────────────────────────────────────────
  {
    id: 'seasonal',
    triggers: [
      ['seasonal', 5], ['limited', 5], ['terbatas', 4], ['edisi terbatas', 5],
      ['menu baru', 4], ['new menu', 4], ['kapan ada menu baru', 5],
      ['menu musiman', 5], ['bulan ini', 3], ['spesial', 3],
    ],
    reply: '🌸 **Menu Seasonal MatchaChi:**\n\nKami rutin hadirkan menu seasonal setiap **awal bulan**!\n\n🍂 Menu saat ini:\n• **Matcha Cake** (weekends only)\n• **Matcha Waffle** (weekends only)\n• **Hojicha Latte** — menu limited minggu ini!\n\n📸 Follow **@matchachi** di Instagram untuk info menu baru paling cepat!\n\nJangan sampai ketinggalan — menu seasonal sering habis di hari pertama! ⚡',
    context: 'seasonal',
  },

  // ── Jam ramai / antrian ──────────────────────────────────────────────────────
  {
    id: 'busy_hours',
    triggers: [
      ['ramai', 4], ['antrian', 5], ['queue', 4], ['lama', 3],
      ['tunggu berapa lama', 4], ['estimasi', 3], ['kapan sepi', 5],
      ['jam sibuk', 5], ['peak hour', 4], ['weekend ramai', 4],
    ],
    reply: '⏱️ **Estimasi waktu & jam sibuk:**\n\n🟢 **Sepi** (15 menit): Senin–Kamis jam 10–12 & 14–16\n🟡 **Normal** (20–30 menit): Weekday sore\n🔴 **Ramai** (30–45 menit): Jumat sore & weekend\n\n💡 Tips:\n• Pre-order via WhatsApp agar langsung ambil tanpa antri!\n• Weekday pagi biasanya paling cepat\n• Sabtu jam 12–15 biasanya paling ramai 📊',
    context: 'busy',
  },

  // ── Kontak / Hubungi ─────────────────────────────────────────────────────────
  {
    id: 'contact',
    triggers: [
      ['kontak', 5], ['contact', 5], ['hubungi', 4], ['telepon', 4],
      ['nomor', 3], ['nomor telpon', 4], ['nomor wa', 4], ['nomor whatsapp', 5],
      ['email', 4], ['sosial media', 3], ['bisa dihubungi', 4],
      ['customer service', 5], ['cs', 4], ['admin', 4],
    ],
    reply: '📞 **Kontak MatchaChi:**\n\n💬 **WhatsApp**: 0812-3456-7890\n📧 **Email**: hello@matchachi.id\n📸 **Instagram**: @matchachi\n🎵 **TikTok**: @matchachi\n📍 **Toko**: Jl. Matcha Indah No. 12, Jaksel\n\n⏰ CS aktif: Setiap hari jam 08.00–21.00 WIB\n⚡ Respon WhatsApp: 5–10 menit\n\nJangan ragu reach out ya! Kami senang membantu 🌿',
    context: 'contact',
  },

  // ── WhatsApp ─────────────────────────────────────────────────────────────────
  {
    id: 'whatsapp',
    triggers: [
      ['whatsapp', 5], ['wa', 4], ['chat whatsapp', 5], ['order whatsapp', 5],
      ['pesan via wa', 5], ['lewat wa', 4], ['nomor wa', 5],
    ],
    reply: '💬 **Order via WhatsApp:**\n\nKetik atau klik:\n👉 **wa.me/6281234567890**\n\nAtau ketuk tombol **"Order Sekarang"** di pojok kiri bawah halaman ini!\n\nFormat pesan:\n```\nNama: [nama kamu]\nMenu: [nama menu]\nJumlah: [qty]\nSuhu: Hot / Iced\nLevel manis: Less / Regular\nCatatan: [opsional]\n```\nKami balas dalam 5–10 menit! ⚡',
    context: 'contact',
  },

  // ── Instagram / Social Media ─────────────────────────────────────────────────
  {
    id: 'instagram',
    triggers: [
      ['instagram', 5], ['ig', 4], ['sosmed', 4], ['social media', 4],
      ['tiktok', 5], ['follow', 3], ['akun instagram', 5],
      ['konten', 3], ['foto produk', 3], ['post', 3],
    ],
    reply: '📸 **MatchaChi di Social Media:**\n\n🟢 **Instagram**: @matchachi\n→ Foto produk, promo harian, behind-the-scenes\n\n🎵 **TikTok**: @matchachi\n→ Video pembuatan matcha, review pelanggan\n\n💬 **WhatsApp**: 0812-3456-7890\n→ Order langsung\n\nFollow sekarang untuk dapat info promo & menu baru pertama kali! 🌿✨',
    context: 'social',
  },

  // ── Tentang MatchaChi ────────────────────────────────────────────────────────
  {
    id: 'about',
    triggers: [
      ['tentang', 4], ['about', 4], ['siapa matchachi', 5], ['matchachi itu', 4],
      ['cerita', 3], ['sejarah', 4], ['history', 4], ['pendiri', 4], ['founder', 4],
      ['kapan berdiri', 4], ['berdiri sejak', 4], ['asal usul', 4],
    ],
    reply: '🌿 **Tentang MatchaChi:**\n\nMatchaChi lahir dari satu dapur kecil di Jakarta Selatan pada **2022** — dengan satu chasen (pengocok matcha) dan satu impian besar.\n\nKami percaya: **matcha yang enak harus bisa dinikmati semua orang** — tidak ribet, tidak pahit, dan tidak mahal.\n\nHari ini kami melayani ribuan matcha lovers di seluruh Indonesia, menggunakan **ceremonial grade matcha dari Uji, Kyoto** yang diverifikasi langsung.\n\n❤️ Dibuat dengan cinta, disajikan dengan senyum.',
    context: 'about',
  },

  // ── Matcha untuk kesehatan ───────────────────────────────────────────────────
  {
    id: 'health_benefits',
    triggers: [
      ['manfaat matcha', 5], ['matcha sehat', 4], ['khasiat', 4], ['benefit', 4],
      ['antioksidan', 5], ['antioxidant', 5], ['l-theanine', 5], ['kafein', 4],
      ['caffeine', 4], ['bagus untuk', 3], ['menyehatkan', 4],
      ['efek matcha', 4], ['matcha baik', 3], ['matcha bagus', 3],
    ],
    reply: '💪 **Manfaat matcha untuk kesehatan:**\n\n🍵 Matcha kaya akan:\n✅ **Antioksidan** (EGCG) — 137x lebih banyak dari green tea biasa\n✅ **L-Theanine** — bikin fokus & calm tanpa gelisah (berbeda dari kopi!)\n✅ **Klorofil** — detoks alami\n✅ **Kafein** — energy boost yang lebih stabil\n\n⚡ Efek: fokus tajam, mood lebih baik, energi tahan lama\n🌿 Bebas dari artificial coloring & preservatives di MatchaChi!\n\nAda yang lebih ingin kamu ketahui? 😊',
    context: 'health',
  },

  // ── Perbedaan matcha vs kopi ─────────────────────────────────────────────────
  {
    id: 'matcha_vs_coffee',
    triggers: [
      ['matcha vs kopi', 5], ['vs coffee', 4], ['banding kopi', 4],
      ['lebih sehat dari kopi', 4], ['ganti kopi', 4], ['substitusi kopi', 4],
      ['tidak suka kopi', 3], ['pengganti kopi', 4], ['kafein matcha', 4],
    ],
    reply: '☕ **Matcha vs Kopi:**\n\n| | **Matcha** | **Kopi** |\n|---|---|---|\n| Kafein | 35mg/cup | 80–100mg |\n| L-Theanine | ✅ Tinggi | ❌ Minimal |\n| Crash | ❌ Tidak ada | ✅ Sering terjadi |\n| Oksidan | ✅ Tinggi | Sedang |\n| Rasa | Earthy, umami | Bitter |\n\n💡 Matcha kasih **energy yang lebih smooth** — naik pelan, turun pelan. Perfect untuk yang sensitif kafein atau mau ganti kopi! 🌿',
    context: 'health',
  },

  // ── Apakah ada tempat duduk ──────────────────────────────────────────────────
  {
    id: 'seating',
    triggers: [
      ['tempat duduk', 5], ['kursi', 4], ['meja', 4], ['seating', 4],
      ['indoor', 4], ['outdoor', 4], ['nyaman', 3], ['cozy', 3],
      ['bisa nongkrong', 4], ['nongkrong', 4], ['santai', 3],
      ['wifi', 5], ['wi-fi', 5], ['colokan', 4],
    ],
    reply: '🏡 **Fasilitas di MatchaChi:**\n\n✅ **Seating indoor** — AC, cozy, aesthetic\n✅ **Seating outdoor** — garden vibes, instagrammable\n✅ **Free WiFi** — kecepatan stabil\n✅ **Power outlet** — tersedia di beberapa meja\n✅ **Parking** — motor & mobil\n\n🪴 Interior dengan tanaman hijau & matcha aesthetic — cocok banget buat work from café atau nongkrong! ☕',
    context: 'seating',
  },

  // ── Reservasi / booking ──────────────────────────────────────────────────────
  {
    id: 'reservation',
    triggers: [
      ['reservasi', 5], ['booking', 5], ['book', 4], ['pesan tempat', 5],
      ['book meja', 5], ['reservation', 5], ['private', 4],
      ['acara di sini', 4], ['sewa tempat', 4], ['book venue', 4],
    ],
    reply: '📅 **Reservasi & Booking:**\n\nUntuk grup (5+ orang) atau acara private:\n\n✅ **Booking meja** bisa via WhatsApp\n✅ **Private space** tersedia untuk gathering kecil (max 20 pax)\n✅ **Minimum konsumsi** untuk private space: Rp 500.000\n\nHubungi kami minimal **2 hari sebelumnya** ya!\n\n💬 WhatsApp: 0812-3456-7890 📲',
    context: 'reservation',
  },

  // ── Mengapa matcha MatchaChi tidak pahit ─────────────────────────────────────
  {
    id: 'not_bitter',
    triggers: [
      ['tidak pahit', 5], ['tidak pahit kan', 5], ['pahit', 4], ['bitter', 4],
      ['rasa matcha', 4], ['enak gak', 3], ['enak nggak', 3],
      ['takut pahit', 4], ['matcha pahit', 4], ['matcha suka pahit', 4],
    ],
    reply: '🍵 **Matcha MatchaChi tidak pahit — dijamin!**\n\nRahasia kami:\n1. **Ceremonial grade** — hanya daun muda (tencha) yang dipanen, naturally sweet\n2. **Suhu air tepat** — 75°C, bukan mendidih (air panas merusak rasa matcha)\n3. **Whisking teknik** — di-whisk dengan chasen sampai berbusa sempurna\n4. **Freshness** — matcha dibuka fresh per batch, tidak stale\n\n💚 Kalau kamu masih ragu, coba dulu **Matcha Latte** — paling friendly untuk pemula!',
    context: 'taste',
  },

  // ── Perbandingan produk ──────────────────────────────────────────────────────
  {
    id: 'recommend',
    triggers: [
      ['rekomendasi', 5], ['recommend', 5], ['mana yang enak', 5],
      ['mana yang bagus', 5], ['untuk pemula', 4], ['pertama kali', 4],
      ['baru coba matcha', 4], ['belum pernah', 4], ['saran menu', 5],
      ['menu terbaik', 5], ['paling enak', 4], ['favorit', 4],
    ],
    reply: '💚 **Rekomendasi menu MatchaChi:**\n\n🥇 **Untuk pemula** → **Matcha Latte** (smooth, tidak pahit, paling balanced)\n🥈 **Untuk matcha lover** → **Matcha Ice Cream** (intense matcha flavor)\n🥉 **Untuk dessert fan** → **Matcha Mochi** (bite-size, tidak terlalu manis)\n🎯 **Paling populer overall** → **Matcha Latte** + **Matcha Mochi** combo!\n\nPersonally, aku rekomendasiin mulai dari Latte dulu — kalau sudah kenal rasanya, baru eksplorasi yang lain! 🌿',
    context: 'recommend',
  },

  // ── Ucapan terima kasih ──────────────────────────────────────────────────────
  {
    id: 'thanks',
    triggers: [
      ['terima kasih', 5], ['makasih', 5], ['thanks', 5], ['thank you', 5],
      ['thx', 4], ['tq', 4], ['ty', 3], ['tengkyu', 4], ['terimakasih', 5],
    ],
    reply: 'Sama-sama! 🌿 Senang bisa bantu kamu.\n\nKalau ada pertanyaan lain soal menu, delivery, atau apapun — jangan ragu tanya lagi ya!\n\nSampai jumpa di MatchaChi 💚☕',
    context: 'thanks',
  },

  // ── Pamitan ──────────────────────────────────────────────────────────────────
  {
    id: 'bye',
    triggers: [
      ['bye', 5], ['dadah', 5], ['sampai jumpa', 5], ['selamat tinggal', 5],
      ['ciao', 4], ['see you', 4], ['see ya', 4], ['ok makasih', 4], ['oke makasih', 4],
    ],
    reply: 'Bye bye! 👋🌿 Sampai jumpa lagi!\n\nJangan lupa mampir ke MatchaChi — selalu ada yang baru tiap minggu! 💚✨',
    context: 'bye',
  },
];

// ─── Deterministic Scoring Engine ────────────────────────────────────────────
//
// 1. Normalize input: lowercase, strip punctuation, collapse spaces
// 2. For each intent, calculate score = sum of (weight * matchBonus)
//    - Full keyword phrase match → bonus 1.0
//    - Partial (keyword is substring of token or vice versa) → bonus 0.5
// 3. Select intent with highest score (if score > THRESHOLD)
// 4. If tie → first intent in array wins (stable ordering)

const SCORE_THRESHOLD = 2;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreIntent(tokens: string[], fullInput: string, intent: Intent): number {
  let score = 0;
  for (const [kw, weight] of intent.triggers) {
    if (fullInput.includes(kw)) {
      // Full phrase match in normalized input
      score += weight * 1.0;
    } else {
      // Token-level partial match
      const kwTokens = kw.split(' ');
      const matched = kwTokens.every(kt => tokens.some(t => t.includes(kt) || kt.includes(t)));
      if (matched) score += weight * 0.5;
    }
  }
  return score;
}

export function getReply(input: string): string {
  const norm = normalize(input);
  const tokens = norm.split(' ');

  let bestScore = 0;
  let bestIntent: Intent | null = null;

  for (const intent of INTENTS) {
    const score = scoreIntent(tokens, norm, intent);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && bestScore >= SCORE_THRESHOLD) {
    return bestIntent.reply;
  }

  // Deterministic fallback based on input length (no randomness)
  const fallbacks = [
    'Hmm, aku belum bisa jawab itu dengan pasti 🤔\n\nCoba tanya soal **menu, harga, jam buka, delivery, atau cara order** ya! Atau langsung chat tim kami via WhatsApp 💬',
    'Sepertinya itu di luar pengetahuanku 😅\n\nYang aku tahu paling baik adalah soal **matcha & MatchaChi**. Coba tanya:\n• "Ada menu apa?"\n• "Jam buka berapa?"\n• "Delivery ke mana saja?"\n\nAtau chat langsung ke **WhatsApp: 0812-3456-7890** 📲',
    'Maaf, aku masih terus belajar! 🌱\n\nUntuk info ini, sebaiknya hubungi tim MatchaChi langsung:\n💬 **WhatsApp: 0812-3456-7890**\n\nMereka super responsif dan siap bantu! 🌿',
  ];
  // Deterministic selection: based on token count mod 3
  return fallbacks[tokens.length % 3];
}

// ─── Quick Prompts ────────────────────────────────────────────────────────────

export const QUICK_PROMPTS = [
  'Ada menu apa saja?',
  'Berapa harganya?',
  'Jam buka?',
  'Area delivery?',
  'Pilihan non-dairy?',
  'Rekomendasi menu?',
];

// ─── Greeting message ─────────────────────────────────────────────────────────

const BOT_NAME = 'Matcha';

const now = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

const GREETING: Message = {
  id: 'greeting',
  role: 'bot',
  text: 'Haii! 👋 Aku **Matcha**, asisten virtual MatchaChi.\n\nAda yang bisa aku bantu? Kamu bisa tanya soal menu, harga, delivery, jam buka, custom order, dan masih banyak lagi! 🍵',
  time: now(),
};

// ─── Markdown-lite renderer ───────────────────────────────────────────────────

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

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, typing]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      time: now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Deterministic typing delay: always 800ms (no randomness)
    setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now() + 1}`,
        role: 'bot',
        text: getReply(text),
        time: now(),
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, 800);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat window */}
      <div
        className="fixed z-40 flex flex-col"
        style={{
          bottom: '88px', right: '24px',
          width: '360px', maxWidth: 'calc(100vw - 48px)',
          height: '520px', maxHeight: 'calc(100dvh - 140px)',
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
          <button onClick={() => setOpen(false)} className="text-white opacity-80 hover:opacity-100 transition-opacity p-1">
            <IconChevronDown />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#c5eedd transparent' }}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.role === 'bot' && (
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'linear-gradient(135deg,#4dc496,#8adab8)' }}>
                  <span style={{ color: 'white' }}><IconLeafSmall /></span>
                </div>
              )}
              <div className={`flex flex-col gap-0.5 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'user' ? 'linear-gradient(135deg,#4dc496,#8adab8)' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#2d3a2e',
                    border: msg.role === 'bot' ? '1px solid #e6f4e6' : 'none',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
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
              <div className="px-4 py-3 rounded-2xl"
                style={{ background: '#fff', border: '1px solid #e6f4e6', borderRadius: '18px 18px 18px 4px' }}>
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#8adab8', animation: 'bounce 1.2s ease infinite', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="px-4 pb-2 flex gap-1.5 flex-wrap flex-shrink-0">
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
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pb-3 flex-shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
            style={{ background: '#f4faf4', border: '1.5px solid #c5eedd', color: '#2d3a2e', fontSize: '14px' }}
            onFocus={e => (e.currentTarget.style.borderColor = '#4dc496')}
            onBlur={e => (e.currentTarget.style.borderColor = '#c5eedd')}
          />
          <button type="submit" disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150"
            style={{ background: input.trim() ? 'linear-gradient(135deg,#4dc496,#8adab8)' : '#e6f4e6', color: input.trim() ? 'white' : '#a3d4a3' }}>
            <IconSend />
          </button>
        </form>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed z-50 flex items-center justify-center transition-all duration-200"
        style={{
          bottom: '24px', right: '24px',
          width: '56px', height: '56px', borderRadius: '50%',
          background: open ? '#fff' : 'linear-gradient(135deg,#4dc496,#8adab8)',
          color: open ? '#4a7c59' : '#fff',
          border: open ? '2px solid #c5eedd' : 'none',
          boxShadow: open ? '0 4px 20px -4px rgba(74,124,89,0.25)' : '0 8px 30px -4px rgba(77,196,150,0.50)',
        }}
        aria-label="Chat dengan Matcha"
      >
        {open ? <IconX /> : <IconChat />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
            style={{ background: '#f54d8a' }}>
            {unread}
          </span>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
