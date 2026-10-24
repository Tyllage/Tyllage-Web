import type { ReactElement } from 'react';

/**
 * Illustrated agricultural scenes used wherever an approved photograph is not
 * yet available (see src/data/media.ts). They are clearly artwork, so they
 * never misrepresent a real farm or facility.
 *
 * Every scene is generated from a fixed seed, so server-rendered and
 * client-rendered markup match exactly.
 */
export type SceneVariant = 'greenhouse' | 'leaves' | 'rows' | 'crates' | 'seedlings';

const GREENS = ['#173D32', '#1E4A3D', '#2D6A4F', '#3F8460', '#5E9E6E', '#7DB37F', '#A9C4AE'];
const LIGHT_GREENS = ['#5E9E6E', '#7DB37F', '#8FC28A', '#A6CF8F', '#BCD9A0'];

function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function leafPath(length: number, width: number) {
  const L = r1(length);
  const w = r1(width);
  return `M0 0C${w} ${r1(-L * 0.25)} ${r1(w * 0.85)} ${r1(-L * 0.8)} 0 ${-L}C${r1(-w * 0.85)} ${r1(-L * 0.8)} ${-w} ${r1(-L * 0.25)} 0 0Z`;
}

/** A head of leafy greens: overlapping leaves radiating from a centre. */
function LeafyHead({ x, y, size, rand, palette = LIGHT_GREENS }: { x: number; y: number; size: number; rand: () => number; palette?: string[] }) {
  const leaves = 7 + Math.floor(rand() * 4);
  const items: ReactElement[] = [];
  for (let i = 0; i < leaves; i++) {
    const angle = -90 + (i - (leaves - 1) / 2) * (150 / leaves) + (rand() - 0.5) * 14;
    const len = size * (0.75 + rand() * 0.4);
    const fill = palette[Math.floor(rand() * palette.length)];
    items.push(
      <g key={i} transform={`rotate(${r1(angle + 90)})`}>
        <path d={leafPath(len, len * 0.42)} fill={fill} />
        <path d={`M0 0L0 ${r1(-len * 0.85)}`} stroke="#F7F8F3" strokeOpacity="0.35" strokeWidth={r1(Math.max(0.6, size * 0.025))} />
      </g>,
    );
  }
  return <g transform={`translate(${r1(x)} ${r1(y)})`}>{items}</g>;
}

function Greenhouse() {
  const rand = seeded(11);
  const W = 1600;
  const H = 900;
  const vx = 1060;
  const vy = 400;
  const arches = [0.12, 0.2, 0.3, 0.44, 0.62, 0.86, 1.18];
  const channels = [-3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="gh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4ECDC" />
          <stop offset="0.45" stopColor="#F4EFD9" />
          <stop offset="1" stopColor="#CFDCC4" />
        </linearGradient>
        <radialGradient id="gh-sun" cx="0.72" cy="0.2" r="0.55">
          <stop offset="0" stopColor="#FFF7DA" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFF7DA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gh-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B9C9AE" stopOpacity="0" />
          <stop offset="0.25" stopColor="#B9C9AE" />
          <stop offset="1" stopColor="#5D7B5E" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#gh-sky)" />
      <rect y={vy - 60} width={W} height={H - vy + 60} fill="url(#gh-floor)" />
      <rect width={W} height={H} fill="url(#gh-sun)" />

      {/* Greenhouse frame */}
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
        {arches.map((t) => {
          const hw = 980 * t;
          const floor = vy + 520 * t;
          const wall = floor - 430 * t;
          const top = vy - 560 * t;
          return (
            <path
              key={t}
              d={`M${r1(vx - hw)} ${r1(floor)}L${r1(vx - hw)} ${r1(wall)}C${r1(vx - hw)} ${r1(top + 120 * t)} ${r1(vx - hw * 0.35)} ${r1(top)} ${vx} ${r1(top)}C${r1(vx + hw * 0.35)} ${r1(top)} ${r1(vx + hw)} ${r1(top + 120 * t)} ${r1(vx + hw)} ${r1(wall)}L${r1(vx + hw)} ${r1(floor)}`}
              strokeWidth={r1(1 + 5 * t)}
              strokeOpacity={0.55}
            />
          );
        })}
        {[-0.8, -0.45, 0, 0.45, 0.8].map((k) => (
          <path key={k} d={`M${vx} ${vy - 70}L${r1(vx + k * 1400)} ${-260}`} strokeWidth="2" strokeOpacity="0.28" />
        ))}
      </g>

      {/* Hydroponic channels with plants, drawn far to near */}
      {channels.map((c) => {
        const ex = vx + c * 470;
        const ey = H + 80;
        const plants: ReactElement[] = [];
        for (let k = 0; k < 16; k++) {
          const t = 0.07 * Math.pow(1.24, k);
          if (t > 1.05) break;
          const px = vx + (ex - vx) * t;
          const py = vy + (ey - vy) * t;
          plants.push(<LeafyHead key={k} x={px} y={py - 4 * t} size={10 + 78 * t} rand={rand} />);
        }
        return (
          <g key={c}>
            <path
              d={`M${vx} ${vy}L${r1(ex - 26)} ${ey}L${r1(ex + 26)} ${ey}Z`}
              fill="#F7F8F3"
              fillOpacity="0.75"
            />
            {plants}
          </g>
        );
      })}

      {/* Foreground leaves */}
      {[
        [120, 930, 230],
        [420, 960, 200],
        [1450, 950, 240],
      ].map(([x, y, s], i) => (
        <LeafyHead key={i} x={x} y={y} size={s} rand={rand} palette={GREENS.slice(2)} />
      ))}
    </svg>
  );
}

function Leaves() {
  const rand = seeded(23);
  const items: ReactElement[] = [];
  for (let i = 0; i < 46; i++) {
    const x = rand() * 860 - 30;
    const y = rand() * 560 + 40;
    const len = 120 + rand() * 220;
    const angle = rand() * 360;
    const fill = GREENS[1 + Math.floor(rand() * (GREENS.length - 1))];
    items.push(
      <g key={i} transform={`translate(${r1(x)} ${r1(y)}) rotate(${r1(angle)})`}>
        <path d={leafPath(len, len * 0.38)} fill={fill} />
        <path d={`M0 0L0 ${r1(-len * 0.92)}`} stroke="#F7F8F3" strokeOpacity="0.3" strokeWidth="2" />
        {[0.3, 0.5, 0.7].map((f) => (
          <g key={f} stroke="#F7F8F3" strokeOpacity="0.16" strokeWidth="1.2" fill="none">
            <path d={`M0 ${r1(-len * f)}l${r1(len * 0.18)} ${r1(-len * 0.12)}`} />
            <path d={`M0 ${r1(-len * f)}l${r1(-len * 0.18)} ${r1(-len * 0.12)}`} />
          </g>
        ))}
      </g>,
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <defs>
        <radialGradient id="lv-light" cx="0.25" cy="0.15" r="0.8">
          <stop offset="0" stopColor="#F4EFD9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F4EFD9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="#102D24" />
      {items}
      <rect width="800" height="600" fill="url(#lv-light)" />
    </svg>
  );
}

function Rows() {
  const rand = seeded(5);
  const vx = 420;
  const vy = 230;
  const bands = 18;
  const items: ReactElement[] = [];
  for (let i = 0; i < bands; i++) {
    const a = -1.6 + (i / bands) * 3.6;
    const b = a + 3.6 / bands;
    const fill = i % 2 === 0 ? '#3F8460' : '#8A6F4D';
    items.push(<path key={`b${i}`} d={`M${vx} ${vy}L${r1(vx + a * 900)} 640L${r1(vx + b * 900)} 640Z`} fill={fill} opacity={i % 2 === 0 ? 1 : 0.55} />);
    if (i % 2 === 0) {
      const mid = (a + b) / 2;
      for (let k = 0; k < 11; k++) {
        const t = 0.1 * Math.pow(1.27, k);
        if (t > 1) break;
        items.push(
          <LeafyHead key={`p${i}-${k}`} x={vx + mid * 900 * t} y={vy + 410 * t} size={4 + 34 * t} rand={rand} />,
        );
      }
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="rw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCE6D3" />
          <stop offset="1" stopColor="#F5EED6" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#rw-sky)" />
      <circle cx="610" cy="120" r="54" fill="#FFF4CF" opacity="0.9" />
      <path d="M0 240C140 190 260 210 380 225S640 180 800 215V260H0Z" fill="#A9C4AE" />
      <path d="M0 250C180 220 330 245 470 238S700 225 800 240V270H0Z" fill="#7DA488" />
      {items}
    </svg>
  );
}

function Crates() {
  const rand = seeded(41);
  const crates = [
    { x: 70, y: 330, w: 300 },
    { x: 400, y: 350, w: 320 },
    { x: 230, y: 470, w: 340 },
  ];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <rect width="800" height="600" fill="#EDEBDD" />
      <circle cx="660" cy="110" r="160" fill="#F7F1DA" />
      {crates.map((c, i) => {
        const h = c.w * 0.42;
        const heads: ReactElement[] = [];
        for (let k = 0; k < 6; k++) {
          heads.push(<LeafyHead key={k} x={c.x + 30 + (k * (c.w - 60)) / 5} y={c.y + 12} size={58 + rand() * 18} rand={rand} />);
        }
        return (
          <g key={i}>
            {heads}
            <rect x={c.x} y={c.y} width={c.w} height={h} rx="6" fill="#B8915F" />
            {[0.33, 0.66].map((f) => (
              <rect key={f} x={c.x} y={r1(c.y + h * f - 3)} width={c.w} height="6" fill="#9C774A" />
            ))}
            <rect x={c.x + c.w * 0.42} y={c.y + h * 0.12} width={c.w * 0.16} height={h * 0.18} rx="6" fill="#8C6A41" />
          </g>
        );
      })}
    </svg>
  );
}

function Seedlings() {
  const rand = seeded(77);
  const cells: ReactElement[] = [];
  const cols = 9;
  const rows = 8;
  const cw = 78;
  const ox = 50;
  const oy = 34;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * cw + (r % 2) * 8;
      const y = oy + r * 72;
      const s = 16 + rand() * 16;
      const a = (rand() - 0.5) * 20;
      cells.push(
        <g key={`${r}-${c}`}>
          <rect x={x} y={y} width={cw - 10} height="60" rx="10" fill="#5C4A36" />
          <rect x={x + 6} y={y + 6} width={cw - 22} height="18" rx="6" fill="#74604A" />
          <g transform={`translate(${x + (cw - 10) / 2} ${y + 14}) rotate(${r1(a)})`}>
            <path d={`M0 0L0 ${r1(-s)}`} stroke="#5E9E6E" strokeWidth="3" strokeLinecap="round" />
            <g transform={`translate(0 ${r1(-s)}) rotate(-55)`}>
              <path d={leafPath(s * 0.9, s * 0.36)} fill="#8FC28A" />
            </g>
            <g transform={`translate(0 ${r1(-s)}) rotate(55)`}>
              <path d={leafPath(s * 0.9, s * 0.36)} fill="#7DB37F" />
            </g>
          </g>
        </g>,
      );
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
      <rect width="800" height="600" fill="#E4E7D7" />
      <rect x="20" y="14" width="760" height="600" rx="22" fill="#3B3024" />
      {cells}
    </svg>
  );
}

/** Used by the build (entry-server.tsx) to write each scene to dist/images/scenes/<variant>.svg. */
// eslint-disable-next-line react-refresh/only-export-components -- shared with the build-time renderer
export const sceneComponents: Record<SceneVariant, () => ReactElement> = {
  greenhouse: Greenhouse,
  leaves: Leaves,
  rows: Rows,
  crates: Crates,
  seedlings: Seedlings,
};

interface SceneProps {
  variant: SceneVariant;
  className?: string;
  priority?: boolean;
}

/**
 * In production, scenes are static SVG files loaded as decorative images, so
 * they are cached and kept out of the page HTML. In development they render
 * inline, so edits show up immediately.
 */
export function Scene({ variant, className = '', priority = false }: SceneProps) {
  if (import.meta.env.DEV) {
    const Component = sceneComponents[variant];
    return (
      <div className={`scene scene--${variant} ${className}`} data-placeholder="illustration">
        <Component />
      </div>
    );
  }
  return (
    <div className={`scene scene--${variant} ${className}`} data-placeholder="illustration">
      <img
        src={`/images/scenes/${variant}.svg`}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
