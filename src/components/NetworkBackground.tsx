"use client";

const cities = [
  // Europa
  { name: "Madrid", lat: 40.42, lng: -3.7, region: "eu" as const },
  { name: "París", lat: 48.86, lng: 2.35, region: "eu" as const },
  { name: "Roma", lat: 41.9, lng: 12.5, region: "eu" as const },
  { name: "Berlín", lat: 52.52, lng: 13.4, region: "eu" as const },
  { name: "Ámsterdam", lat: 52.37, lng: 4.9, region: "eu" as const },
  { name: "Londres", lat: 51.51, lng: -0.13, region: "eu" as const },
  { name: "Edimburgo", lat: 55.95, lng: -3.19, region: "eu" as const },
  { name: "Dublín", lat: 53.35, lng: -6.26, region: "eu" as const },
  // Asia
  { name: "Tokio", lat: 35.68, lng: 139.69, region: "as" as const },
  { name: "Seúl", lat: 37.57, lng: 126.98, region: "as" as const },
  { name: "Beijing", lat: 39.9, lng: 116.41, region: "as" as const },
  // África / Global
  { name: "Ciudad del Cabo", lat: -33.92, lng: 18.42, region: "af" as const },
  { name: "Nueva York", lat: 40.71, lng: -74.01, region: "na" as const },
  { name: "Toronto", lat: 43.65, lng: -79.38, region: "na" as const },
  // Latinoamérica
  { name: "Ciudad de México", lat: 19.43, lng: -99.13, region: "latam" as const },
  { name: "Bogotá", lat: 4.71, lng: -74.07, region: "latam" as const },
  { name: "Lima", lat: -12.05, lng: -77.04, region: "latam" as const },
  { name: "São Paulo", lat: -23.55, lng: -46.63, region: "latam" as const },
  { name: "Buenos Aires", lat: -34.6, lng: -58.38, region: "latam" as const },
  { name: "Santiago", lat: -33.45, lng: -70.67, region: "latam" as const },
  { name: "Quito", lat: -0.18, lng: -78.47, region: "latam" as const },
  { name: "Caracas", lat: 10.48, lng: -66.9, region: "latam" as const },
  { name: "Montevideo", lat: -34.9, lng: -56.16, region: "latam" as const },
  { name: "Brasilia", lat: -15.79, lng: -47.88, region: "latam" as const },
  { name: "Córdoba", lat: -31.42, lng: -64.18, region: "latam" as const },
  { name: "Lisboa", lat: 38.72, lng: -9.14, region: "eu" as const },
  { name: "Guadalajara", lat: 20.67, lng: -103.35, region: "latam" as const },
  { name: "Medellín", lat: 6.25, lng: -75.56, region: "latam" as const },
];

const connections: [number, number][] = [
  // Europa internas
  [0, 1],   // Madrid - París
  [1, 3],   // París - Berlín
  [3, 4],   // Berlín - Ámsterdam
  [5, 4],   // Londres - Ámsterdam
  [5, 7],   // Londres - Dublín
  [5, 6],   // Londres - Edimburgo
  [0, 2],   // Madrid - Roma
  [0, 25],  // Madrid - Lisboa
  // Asia internas
  [8, 9],   // Tokio - Seúl
  [9, 10],  // Seúl - Beijing
  [10, 8],  // Beijing - Tokio
  // Intercontinental Europa-Asia
  [3, 10],  // Berlín - Beijing
  [5, 8],   // Londres - Tokio
  // Intercontinental Europa-América
  [5, 13],  // Londres - Nueva York
  [13, 14], // Nueva York - Toronto
  [0, 15],  // Madrid - Bogotá
  [0, 5],   // Madrid - Londres (ya existe, pero reforzamos)
  // Intercontinental Europa-África
  [0, 11],  // Madrid - Ciudad del Cabo
  // Intercontinental África-América
  [11, 17], // Ciudad del Cabo - São Paulo
  // Latinoamérica internas
  [15, 16], // Bogotá - Lima
  [15, 21], // Bogotá - Quito
  [16, 19], // Lima - Santiago
  [16, 17], // Lima - São Paulo
  [17, 18], // São Paulo - Buenos Aires
  [18, 20], // Buenos Aires - Montevideo
  [18, 19], // Buenos Aires - Santiago
  [21, 22], // Quito - Caracas
  [22, 14], // Caracas - Ciudad de México
  [14, 26], // Ciudad de México - Guadalajara
  [15, 27], // Bogotá - Medellín
  [17, 23], // São Paulo - Brasilia
  [18, 24], // Buenos Aires - Córdoba
  // Intercontinental global
  [8, 13],  // Tokio - Nueva York
  [13, 17], // Nueva York - São Paulo
];

const WIDTH = 1000;
const HEIGHT = 500;

function toSvg(lat: number, lng: number): [number, number] {
  const x = ((lng + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return [x, y];
}

function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.min(80, dist * 0.25);
  const my = Math.min(y1, y2) - lift;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

const continentPaths = [
  // Norteamérica
  "M 33,69 L 83,89 L 158,114 L 172,156 L 208,194 L 264,222 L 278,181 L 292,153 L 333,125 L 339,97 L 311,56 L 139,56 Z",
  // Sudamérica
  "M 292,222 L 314,221 L 370,244 L 403,264 L 394,311 L 367,328 L 338,346 L 311,403 L 292,300 L 286,283 L 278,264 Z",
  // Europa
  "M 472,150 L 486,133 L 500,117 L 486,89 L 500,78 L 528,78 L 542,83 L 583,83 L 583,100 L 597,117 L 583,133 L 569,150 Z",
  // África
  "M 453,208 L 486,178 L 528,147 L 569,150 L 589,161 L 625,189 L 639,217 L 625,264 L 611,292 L 578,347 L 539,342 L 458,319 Z",
  // Asia
  "M 578,133 L 597,139 L 639,144 L 667,161 L 694,189 L 717,228 L 750,217 L 792,189 L 833,167 L 861,153 L 889,128 L 903,111 L 833,83 L 750,67 L 625,69 Z",
  // Australia
  "M 819,292 L 875,283 L 917,292 L 925,328 L 903,347 L 889,356 L 847,350 L 819,342 Z",
];

export default function NetworkBackground() {
  const cityPositions = cities.map((c) => ({
    ...c,
    svg: toSvg(c.lat, c.lng),
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#060b18]">
      <svg
        className="pointer-events-none h-full w-full"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {continentPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="0.5"
            opacity="0.35"
          />
        ))}

        {connections.map(([fromIdx, toIdx], i) => {
          const [x1, y1] = cityPositions[fromIdx].svg;
          const [x2, y2] = cityPositions[toIdx].svg;
          const d = arcPath(x1, y1, x2, y2);
          const duration = 4 + (i % 4) * 1.2;
          return (
            <g key={`conn-${i}`}>
              <path
                d={d}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.5"
                opacity="0.12"
              />
              <circle r="2" fill="#22d3ee" opacity="0.8" filter="url(#glow)">
                <animateMotion
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  path={d}
                  begin={`${(i * 0.5) % 4}s`}
                />
              </circle>
            </g>
          );
        })}

        {cityPositions.map((city, i) => {
          const [cx, cy] = city.svg;
          const pulseDur = 2.5 + (i % 5) * 0.4;
          return (
            <g key={city.name}>
              <circle
                cx={cx}
                cy={cy}
                r="10"
                fill="url(#nodeGlow)"
                opacity="0.25"
              >
                <animate
                  attributeName="r"
                  values="10;20;10"
                  dur={`${pulseDur}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.25;0.03;0.25"
                  dur={`${pulseDur}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                />
              </circle>
              <circle
                cx={cx}
                cy={cy}
                r="2.5"
                fill="#22d3ee"
                opacity="0.85"
                filter="url(#glow)"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
