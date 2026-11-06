/**
 * Matcha menu SVG icons — rendered as data URIs so MacOSDock <img> can consume them.
 * Each icon is a 128×128 SVG string encoded as a data: URI.
 */

const svgToDataUri = (svg: string): string =>
  `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

// Shared helpers
const bg = (color: string) =>
  `<rect width="128" height="128" rx="28" ry="28" fill="${color}"/>`;

// ── 1. Matcha Latte ────────────────────────────────────────────────────────────
export const matchaLatteIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#2ea62e')}
  <!-- cup body -->
  <path d="M38 48 L42 94 Q42 100 50 100 L78 100 Q86 100 86 94 L90 48 Z" fill="#fdf8f0" opacity="0.95"/>
  <!-- handle -->
  <path d="M86 62 Q102 62 102 74 Q102 86 86 86" fill="none" stroke="#fdf8f0" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
  <!-- matcha liquid -->
  <path d="M41 62 L87 62 L86 80 Q86 88 78 88 L50 88 Q42 88 42 80 Z" fill="#4abf4a" opacity="0.9"/>
  <!-- foam / latte art -->
  <ellipse cx="64" cy="62" rx="23" ry="7" fill="#fdf8f0" opacity="0.95"/>
  <path d="M52 62 Q64 56 76 62" fill="none" stroke="#c5e8b0" stroke-width="2" opacity="0.7"/>
  <!-- steam lines -->
  <path d="M52 42 Q50 36 52 30" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M64 40 Q62 34 64 28" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M76 42 Q74 36 76 30" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" stroke-linecap="round"/>
  <!-- label -->
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.8)" text-anchor="middle">Latte</text>
</svg>`);

// ── 2. Matcha Smoothie ─────────────────────────────────────────────────────────
export const matchaSmoothieIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#e83878')}
  <!-- glass -->
  <path d="M40 36 L46 96 Q46 102 56 102 L72 102 Q82 102 82 96 L88 36 Z" fill="rgba(255,255,255,0.25)"/>
  <path d="M40 36 L88 36" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>
  <!-- smoothie fill green -->
  <path d="M42 56 L46 96 Q46 102 56 102 L72 102 Q82 102 82 96 L86 56 Z" fill="#4abf4a" opacity="0.85"/>
  <!-- pink layer top -->
  <path d="M41 44 L87 44 L86 56 L42 56 Z" fill="#ff80b5" opacity="0.85"/>
  <!-- straw -->
  <rect x="70" y="20" width="6" height="78" rx="3" fill="#ff80b5" opacity="0.9"/>
  <rect x="71" y="20" width="2" height="78" rx="1" fill="rgba(255,255,255,0.3)"/>
  <!-- bubbles -->
  <circle cx="52" cy="70" r="4" fill="rgba(255,255,255,0.3)"/>
  <circle cx="62" cy="82" r="3" fill="rgba(255,255,255,0.25)"/>
  <circle cx="74" cy="73" r="3.5" fill="rgba(255,255,255,0.3)"/>
  <!-- highlight -->
  <path d="M44 40 L46 90 Q46 95 48 97" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="3" stroke-linecap="round"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.8)" text-anchor="middle">Smoothie</text>
</svg>`);

// ── 3. Matcha Cake ─────────────────────────────────────────────────────────────
export const matchaCakeIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#228522')}
  <!-- cake base -->
  <rect x="26" y="72" width="76" height="30" rx="6" fill="#fdf8f0"/>
  <!-- middle layer -->
  <rect x="30" y="54" width="68" height="20" rx="5" fill="#76d576"/>
  <!-- top layer -->
  <rect x="34" y="38" width="60" height="18" rx="5" fill="#4abf4a"/>
  <!-- frosting drips -->
  <path d="M30 54 Q36 50 42 54 Q48 50 54 54 Q60 50 66 54 Q72 50 78 54 Q84 50 90 54 Q96 50 98 54" fill="none" stroke="#fdf8f0" stroke-width="4" stroke-linecap="round"/>
  <path d="M34 38 Q40 34 46 38 Q52 34 58 38 Q64 34 70 38 Q76 34 82 38 Q88 34 94 38" fill="none" stroke="#ff80b5" stroke-width="3.5" stroke-linecap="round"/>
  <!-- candle -->
  <rect x="60" y="24" width="8" height="16" rx="2" fill="#ff80b5"/>
  <ellipse cx="64" cy="22" rx="5" ry="7" fill="#f75995" opacity="0.7"/>
  <ellipse cx="64" cy="20" rx="2" ry="3" fill="#fff7a0" opacity="0.9"/>
  <!-- sprinkles -->
  <rect x="38" y="76" width="6" height="2.5" rx="1" fill="#ff80b5" transform="rotate(-20,41,77)"/>
  <rect x="52" y="79" width="6" height="2.5" rx="1" fill="#4abf4a" transform="rotate(10,55,80)"/>
  <rect x="68" y="75" width="6" height="2.5" rx="1" fill="#ff80b5" transform="rotate(30,71,76)"/>
  <rect x="82" y="78" width="6" height="2.5" rx="1" fill="#fdf8f0" transform="rotate(-10,85,79)"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.85)" text-anchor="middle">Cake</text>
</svg>`);

// ── 4. Matcha Cookies ──────────────────────────────────────────────────────────
export const matchaCookieIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#c91f5e')}
  <!-- main cookie -->
  <circle cx="64" cy="64" r="36" fill="#76d576"/>
  <!-- cookie texture bumps -->
  <circle cx="64" cy="64" r="36" fill="none" stroke="#4abf4a" stroke-width="2" opacity="0.5"/>
  <!-- chocolate chips = pink blobs -->
  <ellipse cx="52" cy="55" rx="6" ry="5" fill="#c91f5e" opacity="0.85"/>
  <ellipse cx="72" cy="52" rx="5" ry="5.5" fill="#c91f5e" opacity="0.85"/>
  <ellipse cx="58" cy="72" rx="5.5" ry="5" fill="#c91f5e" opacity="0.85"/>
  <ellipse cx="76" cy="70" rx="5" ry="4.5" fill="#c91f5e" opacity="0.85"/>
  <ellipse cx="44" cy="68" rx="4" ry="4.5" fill="#c91f5e" opacity="0.85"/>
  <!-- highlight -->
  <ellipse cx="50" cy="46" rx="8" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-20,50,46)"/>
  <!-- small cookie behind -->
  <circle cx="96" cy="44" r="18" fill="#4abf4a" opacity="0.7"/>
  <ellipse cx="90" cy="40" rx="4" ry="3.5" fill="#a31449" opacity="0.8"/>
  <ellipse cx="100" cy="48" rx="3.5" ry="4" fill="#a31449" opacity="0.8"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.85)" text-anchor="middle">Cookies</text>
</svg>`);

// ── 5. Matcha Ice Cream ────────────────────────────────────────────────────────
export const matchaIceCreamIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#1b6a1b')}
  <!-- cone -->
  <path d="M48 74 L64 106 L80 74 Z" fill="#f7d59c"/>
  <path d="M48 74 L64 106 L80 74" fill="none" stroke="#e8b96a" stroke-width="1.5"/>
  <!-- cone lines -->
  <line x1="64" y1="106" x2="48" y2="74" stroke="#e8b96a" stroke-width="1" opacity="0.5"/>
  <line x1="64" y1="106" x2="80" y2="74" stroke="#e8b96a" stroke-width="1" opacity="0.5"/>
  <line x1="52" y1="87" x2="76" y2="87" stroke="#e8b96a" stroke-width="1" opacity="0.4"/>
  <line x1="56" y1="97" x2="72" y2="97" stroke="#e8b96a" stroke-width="1" opacity="0.4"/>
  <!-- scoop 1 (bottom) -->
  <ellipse cx="64" cy="66" rx="20" ry="16" fill="#76d576"/>
  <!-- scoop 2 (top) -->
  <ellipse cx="64" cy="48" rx="17" ry="15" fill="#4abf4a"/>
  <!-- scoop 3 (top-top pink) -->
  <ellipse cx="64" cy="33" rx="13" ry="12" fill="#ff80b5"/>
  <!-- drips -->
  <path d="M52 68 Q50 76 52 80" fill="none" stroke="#4abf4a" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <path d="M76 66 Q78 74 76 78" fill="none" stroke="#4abf4a" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <!-- cherry on top -->
  <circle cx="64" cy="22" r="6" fill="#e83878"/>
  <path d="M64 22 Q70 14 72 10" fill="none" stroke="#228522" stroke-width="2.5" stroke-linecap="round"/>
  <!-- highlight -->
  <ellipse cx="57" cy="28" rx="4" ry="3" fill="rgba(255,255,255,0.35)" transform="rotate(-20,57,28)"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.85)" text-anchor="middle">Ice Cream</text>
</svg>`);

// ── 6. Matcha Mochi ────────────────────────────────────────────────────────────
export const matchaMochiIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#f75995')}
  <!-- main mochi ball -->
  <ellipse cx="64" cy="68" rx="34" ry="28" fill="#aeeaae"/>
  <!-- inner pink filling peek -->
  <ellipse cx="64" cy="72" rx="18" ry="12" fill="#ff80b5" opacity="0.7"/>
  <!-- powder dusting -->
  <ellipse cx="64" cy="56" rx="28" ry="10" fill="rgba(255,255,255,0.35)"/>
  <!-- pinch top -->
  <path d="M55 44 Q64 36 73 44" fill="none" stroke="#76d576" stroke-width="4" stroke-linecap="round"/>
  <!-- highlight -->
  <ellipse cx="50" cy="56" rx="8" ry="5" fill="rgba(255,255,255,0.4)" transform="rotate(-15,50,56)"/>
  <!-- small mochi at back-right -->
  <ellipse cx="94" cy="54" rx="18" ry="14" fill="#4abf4a" opacity="0.75"/>
  <ellipse cx="94" cy="58" rx="9" ry="6" fill="#ff80b5" opacity="0.6"/>
  <ellipse cx="88" cy="47" rx="5" ry="3" fill="rgba(255,255,255,0.35)" transform="rotate(-10,88,47)"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.9)" text-anchor="middle">Mochi</text>
</svg>`);

// ── 7. Matcha Waffle ───────────────────────────────────────────────────────────
export const matchaWaffleIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#175417')}
  <!-- waffle base -->
  <rect x="24" y="42" width="80" height="60" rx="10" fill="#76d576"/>
  <!-- waffle grid horizontal -->
  <line x1="24" y1="62" x2="104" y2="62" stroke="#4abf4a" stroke-width="2.5"/>
  <line x1="24" y1="82" x2="104" y2="82" stroke="#4abf4a" stroke-width="2.5"/>
  <!-- waffle grid vertical -->
  <line x1="44" y1="42" x2="44" y2="102" stroke="#4abf4a" stroke-width="2.5"/>
  <line x1="64" y1="42" x2="64" y2="102" stroke="#4abf4a" stroke-width="2.5"/>
  <line x1="84" y1="42" x2="84" y2="102" stroke="#4abf4a" stroke-width="2.5"/>
  <!-- matcha drizzle on top -->
  <path d="M24 46 Q40 38 56 46 Q72 38 88 46 Q96 42 104 46" fill="none" stroke="#228522" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  <!-- pink cream swirl -->
  <path d="M38 42 Q48 30 64 28 Q80 30 90 42" fill="#ff80b5" opacity="0.85"/>
  <path d="M44 42 Q54 34 64 32 Q74 34 84 42" fill="none" stroke="#fdf8f0" stroke-width="2" opacity="0.5"/>
  <!-- strawberry -->
  <path d="M60 20 Q64 12 68 20 Q72 28 64 32 Q56 28 60 20 Z" fill="#e83878"/>
  <path d="M64 12 Q62 8 60 10" fill="none" stroke="#228522" stroke-width="2" stroke-linecap="round"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.85)" text-anchor="middle">Waffle</text>
</svg>`);

// ── 8. Matcha Powder ───────────────────────────────────────────────────────────
export const matchaPowderIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#4abf4a')}
  <!-- tin container -->
  <rect x="28" y="52" width="72" height="52" rx="8" fill="#fdf8f0"/>
  <!-- tin lid -->
  <rect x="24" y="44" width="80" height="14" rx="7" fill="#2ea62e"/>
  <!-- tin body highlight -->
  <rect x="30" y="66" width="16" height="32" rx="4" fill="rgba(255,255,255,0.3)"/>
  <!-- label -->
  <rect x="40" y="64" width="48" height="32" rx="4" fill="#d6f5d6"/>
  <text x="64" y="76" font-family="sans-serif" font-weight="bold" font-size="9" fill="#175417" text-anchor="middle">MatchaChi</text>
  <text x="64" y="88" font-family="sans-serif" font-size="8" fill="#228522" text-anchor="middle">Ceremonial</text>
  <text x="64" y="98" font-family="sans-serif" font-size="8" fill="#228522" text-anchor="middle">Grade</text>
  <!-- spoon -->
  <path d="M82 36 Q96 28 98 38 Q100 46 86 50 L80 52 Z" fill="#f7d59c" stroke="#e8b96a" stroke-width="1"/>
  <!-- powder particles -->
  <circle cx="44" cy="38" r="2" fill="rgba(255,255,255,0.6)"/>
  <circle cx="52" cy="34" r="1.5" fill="rgba(255,255,255,0.5)"/>
  <circle cx="60" cy="36" r="1.5" fill="rgba(255,255,255,0.6)"/>
  <circle cx="68" cy="33" r="2" fill="rgba(255,255,255,0.5)"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.9)" text-anchor="middle">Powder</text>
</svg>`);

// ── 9. Matcha Crepe ────────────────────────────────────────────────────────────
export const matchaCrepeIcon = svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  ${bg('#a31449')}
  <!-- rolled crepe body -->
  <path d="M28 80 Q28 50 64 38 Q100 50 100 80 Q90 100 64 100 Q38 100 28 80 Z" fill="#76d576"/>
  <!-- matcha layer inside -->
  <path d="M38 82 Q38 60 64 50 Q90 60 90 82 Q82 96 64 96 Q46 96 38 82 Z" fill="#4abf4a"/>
  <!-- cream inside -->
  <path d="M48 84 Q48 66 64 60 Q80 66 80 84 Q74 94 64 94 Q54 94 48 84 Z" fill="#fdf8f0" opacity="0.9"/>
  <!-- strawberry slice -->
  <path d="M58 68 Q64 58 70 68 Q72 76 64 80 Q56 76 58 68 Z" fill="#e83878"/>
  <path d="M63 59 Q60 54 58 56" fill="none" stroke="#228522" stroke-width="2" stroke-linecap="round"/>
  <!-- cream swirl on top -->
  <path d="M46 56 Q54 44 64 42 Q74 44 82 56" fill="#fdf8f0" opacity="0.85"/>
  <path d="M50 56 Q57 46 64 44 Q71 46 78 56" fill="none" stroke="#ff80b5" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
  <text x="64" y="118" font-family="sans-serif" font-size="10" fill="rgba(255,255,255,0.85)" text-anchor="middle">Crepe</text>
</svg>`);

export const matchaMenuIcons = [
  { id: 'latte',     name: 'Matcha Latte',      icon: matchaLatteIcon },
  { id: 'smoothie',  name: 'Matcha Smoothie',   icon: matchaSmoothieIcon },
  { id: 'cake',      name: 'Matcha Cake',        icon: matchaCakeIcon },
  { id: 'cookies',   name: 'Matcha Cookies',     icon: matchaCookieIcon },
  { id: 'icecream',  name: 'Matcha Ice Cream',   icon: matchaIceCreamIcon },
  { id: 'mochi',     name: 'Matcha Mochi',       icon: matchaMochiIcon },
  { id: 'waffle',    name: 'Matcha Waffle',      icon: matchaWaffleIcon },
  { id: 'powder',    name: 'Matcha Powder',      icon: matchaPowderIcon },
  { id: 'crepe',     name: 'Matcha Crepe',       icon: matchaCrepeIcon },
];
