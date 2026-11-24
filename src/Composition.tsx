import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import { useEffect, useState, type ReactNode } from "react";

const ink = "#3c302d";
const paper = "#f8f5e9";
const hues = ["#262654", "#f4cf82", "#b3dfce", "#74609d"];
const files = ["夜景.mp4", "拉面.mp4", "柴犬.mov", "小克蹦迪.mp4"];
const cuts = [0, 2.4, 5.1, 7.6, 10.5];
const tiles = ["旋转", "翻页", "故障", "缩放", "滑动", "溶解"];
const symbols = ["◎", "▤", "▣", "⚲", "▸", "▧"];
const tabs = ["素材", "转场", "字幕"];
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function Box({
  x,
  y,
  w,
  h,
  fill = paper,
  r = 8,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: string;
  r?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={ink}
      strokeWidth={2.4}
    />
  );
}

function Label({
  x,
  y,
  children,
  size = 18,
  fill = ink,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill}>
      {children}
    </text>
  );
}

function Mascot({
  x,
  y,
  scale = 1,
  reach,
  angle = 0,
  dance = false,
}: {
  x: number;
  y: number;
  scale?: number;
  reach?: [number, number];
  angle?: number;
  dance?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}
      stroke={ink}
      strokeWidth={3}
      strokeLinejoin="round"
    >
      <path
        d={
          dance
            ? "M-45 5 Q-62 -2 -70 -31 M44 5 Q62 -1 72 -31"
            : "M-43 9h-12v13h12m86-13h12v13H43"
        }
        fill={dance ? "none" : "#ce785d"}
        strokeWidth={dance ? 9 : 3}
      />
      {reach && (
        <g>
          <path
            d={`M0 10 Q${reach[0] * 0.58} ${reach[1] * 0.59 + 12} ${reach[0]} ${reach[1]}`}
            fill="none"
            strokeWidth={14}
            strokeLinecap="round"
          />
          <path
            d={`M0 10 Q${reach[0] * 0.58} ${reach[1] * 0.59 + 12} ${reach[0]} ${reach[1]}`}
            fill="none"
            stroke="#cb755d"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle cx={reach[0]} cy={reach[1]} r="9" fill="#d9856a" />
        </g>
      )}
      <path d="M-33 31v20h12V31m42 0v20h12V31" fill="#c97159" />
      <path d="M-49-31 48-29 50 32-48 34Z" fill="#cf7b61" />
      <path
        d="M-44-25 44-24M-44 28l88-2"
        stroke="#e79877"
        opacity=".55"
        fill="none"
      />
      {dance ? (
        <path
          d="M-21 0q5-11 11 0m20 0q5-11 11 0"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <>
          <ellipse cx="-16" cy="-4" rx="3.5" ry="7" fill={ink} />
          <ellipse cx="16" cy="-4" rx="3.5" ry="7" fill={ink} />
          <circle cx="-17" cy="-6" r="1.5" fill="#fff" stroke="none" />
          <circle cx="15" cy="-6" r="1.5" fill="#fff" stroke="none" />
        </>
      )}
    </g>
  );
}

function Artwork({ kind, t }: { kind: number; t: number }) {
  return (
    <g>
      <rect width="200" height="326" fill={hues[kind]} />
      {kind === 0 && (
        <>
          {Array.from({ length: 36 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 73) % 197}
              cy={(i * 47) % 218}
              r={i % 6 === 0 ? 2.2 : 1}
              fill="#ffe9ad"
              opacity={0.4 + 0.5 * Math.sin(i + t * 2) ** 2}
            />
          ))}
          <path
            d="M146 57c-22 2-24 35 3 40 8 1 14-2 18-6-20 5-35-18-21-34Z"
            fill="#f8d475"
            stroke="#d29851"
            strokeWidth="2"
          />
          {Array.from({ length: 18 }, (_, i) => {
            const h = 43 + ((i * 41) % 93);
            return (
              <g key={i} transform={`translate(${i * 12 - 4} ${326 - h})`}>
                <path
                  d={`M0 ${h}V10H3V0h7v10h3v${h - 10}Z`}
                  fill={i % 2 ? "#1a1c3e" : "#30315e"}
                />
                {Array.from({ length: Math.floor(h / 12) }, (_, j) => (
                  <path
                    key={j}
                    d={`M3 ${14 + j * 11}h2v4H3zm5 0h2v4H8z`}
                    fill={(i + j * 3) % 5 < 3 ? "#efcb75" : "#666690"}
                  />
                ))}
              </g>
            );
          })}
        </>
      )}
      {kind === 1 && (
        <>
          <rect y="213" width="200" height="114" fill="#e6ae72" />
          <path
            d="M0 219h200M0 241h200M0 292h200"
            stroke="#9c694e"
            opacity=".4"
          />
          <g stroke={ink} strokeWidth="3.5">
            <path d="M26 201 Q35 258 96 264 Q157 261 173 201Z" fill="#f5a5a2" />
            <path
              d="M38 229Q102 254 162 228M49 245Q101 266 151 245"
              stroke="#fff4d7"
              fill="none"
            />
            <ellipse cx="100" cy="198" rx="75" ry="29" fill="#fff1d6" />
            <ellipse cx="100" cy="200" rx="65" ry="23" fill="#b87c47" />
            <path
              d="M52 206q13-32 55-15q22 13-8 18q-28 3-16-11q13-10 34 4m-49 7q24 13 61-5"
              stroke="#fae4aa"
              strokeWidth="4"
              fill="none"
            />
            <path d="M116 184l22-9 14 20-25 8Z" fill="#3e6c49" />
            <ellipse cx="61" cy="193" rx="13" ry="8" fill="#ffebcf" />
            <circle cx="62" cy="193" r="4" fill="#eabd5c" stroke="none" />
            <path
              d={`M110 190 196 ${103 + Math.sin(t * 5) * 4} M117 193 210 ${112 + Math.sin(t * 5) * 4}`}
              stroke="#6f4c38"
              strokeWidth="5"
            />
          </g>
        </>
      )}
      {kind === 2 && (
        <>
          <path d="M0 275Q100 248 200 275V326H0Z" fill="#91c4aa" />
          <g
            transform={`translate(100 ${218 + Math.sin(t * 5) * 3})`}
            stroke={ink}
            strokeWidth="3"
          >
            <path d="M-62 114Q-67 42-34 26h68q32 20 29 88" fill="#c8804c" />
            <ellipse
              cx="0"
              cy="87"
              rx="35"
              ry="45"
              fill="#fff1d5"
              stroke="none"
            />
            <path d="M-54-20-57-78-16-49m70 29 3-58-41 29" fill="#d9915b" />
            <path
              d="M-48-45l-3-20 17 18m82 2 3-20-17 18"
              fill="#ebaca3"
              stroke="none"
            />
            <ellipse cy="-10" rx="61" ry="52" fill="#dc975e" />
            <path
              d="M-57 7q10-31 38-12Q0 9 19-5q28-19 38 12Q44 43 0 42-44 43-57 7Z"
              fill="#fff3dd"
              stroke="none"
            />
            <path
              d="M-33-13q6-8 13 0m40 0q6-8 13 0"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M-8 7q8-5 16 0l-8 8Z" fill={ink} />
            <path d="M0 15q4 13 17 5M0 15q-4 13-17 5" fill="none" />
            <path d="M-29 40q29 14 58 0" stroke="#a54849" strokeWidth="7" />
            <circle cy="52" r="7" fill="#f5ce76" />
          </g>
          {[34, 161].map((x, i) => (
            <path
              key={x}
              d="M0 6C-20-8-6-16 0-8 6-16 20-8 0 6Z"
              transform={`translate(${x} ${117 + i * 23 + Math.sin(t * 5 + i) * 5})`}
              fill="#e592a4"
              stroke="#8e526c"
              strokeWidth="2"
            />
          ))}
        </>
      )}
      {kind === 3 && (
        <>
          <rect width="200" height="220" fill="url(#purple)" />
          <path d="M0 220H200V326H0Z" fill="#25294d" />
          {Array.from({ length: 35 }, (_, i) => {
            const row = Math.floor(i / 7);
            const col = (i % 7) - 3;
            const y = 221 + row * row * 5;
            const next = 221 + (row + 1) ** 2 * 5;
            const w = 10 + row * 4;
            return (
              <path
                key={i}
                d={`M${100 + col * w} ${y}h${w}L${100 + (col + 1) * (w + 4)} ${next}h${-w - 4}Z`}
                fill={
                  ["#455692", "#566b9a", "#c493a4", "#6d5da2", "#395b79"][
                    (i + Math.floor(t * 3)) % 5
                  ]
                }
              />
            );
          })}
          <path d="M101 0v34" stroke="#454063" strokeWidth="3" />
          <circle
            cx="101"
            cy="54"
            r="22"
            fill="url(#ball)"
            stroke="#3b3457"
            strokeWidth="2"
          />
          <path
            d="M81 46h40m-42 8h44m-42 9h40M95 34q-13 20 0 40m13-40q13 20 0 40"
            fill="none"
            stroke="#a59aca"
            opacity=".8"
          />
          {[22, 61, 156, 178].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={98 + i * 23 + Math.sin(t * 4 + i) * 23}
              r={3 + (i % 3)}
              fill="#e9c9fa"
              opacity=".48"
            />
          ))}
          <Mascot
            x={101 + Math.sin(t * 6) * 9}
            y={200 + Math.sin(t * 12) * 6}
            scale={0.78}
            angle={Math.sin(t * 7) * 12}
            dance
          />
        </>
      )}
    </g>
  );
}

function Phone({
  x,
  y,
  scale,
  kind,
  t,
  caption,
  flip,
}: {
  x: number;
  y: number;
  scale: number;
  kind: number;
  t: number;
  caption: string;
  flip: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect
        x="-4"
        y="-3"
        width="218"
        height="344"
        rx="27"
        fill="#373133"
        stroke="#171721"
        strokeWidth="4"
      />
      <svg
        x="5"
        y="5"
        width="200"
        height="326"
        viewBox="0 0 200 326"
        style={{ borderRadius: 20, overflow: "hidden" }}
      >
        <Artwork kind={kind} t={t} />
        {flip > 0 && (
          <path
            d={`M200 90L${200 - 200 * flip} 326H200Z`}
            fill="#fff5d9"
            stroke="#8d7e6b"
            strokeWidth="2"
          />
        )}
      </svg>
      <rect x="86" y="13" width="39" height="10" rx="5" fill="#29232d" />
      {caption && (
        <text
          x="105"
          y={kind === 3 ? 124 : 266}
          textAnchor="middle"
          fontSize="25"
          fontWeight="900"
          fill="#ffdf72"
          stroke="#4a3326"
          strokeWidth="6"
          paintOrder="stroke"
        >
          {caption}
        </text>
      )}
    </g>
  );
}

let fontLoad: Promise<FontFace> | undefined;

export function EditingMotion() {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [fontHandle] = useState(() => delayRender("Loading Chinese typeface"));
  useEffect(() => {
    fontLoad ??= new FontFace(
      "Motion Serif",
      `url("${staticFile("noto-serif-sc.woff2")}")`,
    ).load();
    fontLoad
      .then((font) => {
        document.fonts.add(font);
        continueRender(fontHandle);
      })
      .catch(cancelRender);
  }, [cancelRender, continueRender, fontHandle]);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const opening = interpolate(t, [0.77, 1.27], [0, 1], clamp);
  const terminal = interpolate(
    t,
    [0.04, 0.21, 0.73, 1.02],
    [0, 1, 1, 0],
    clamp,
  );
  const finale = interpolate(t, [25.3, 26.4], [0, 1], clamp);
  const stage = t < 7.8 ? 0 : t < 10.35 ? 1 : 2;
  const kind =
    t < 5.55
      ? 0
      : t < 10.55
        ? 1
        : t < 11.9
          ? 2
          : t < 26.1
            ? 3
            : t < 27.15
              ? 0
              : t < 27.8
                ? 1
                : t < 28.4
                  ? 2
                  : 3;
  const time = interpolate(
    t,
    [1.3, 5, 7, 9, 11.9, 20, 25.3],
    [0, 3, 4.1, 5.7, 7.9, 9, 11.8],
    clamp,
  );
  const cameraTimes = [
    0, 4.8, 5.25, 7.4, 8, 10, 12, 13.1, 13.8, 14.6, 15.35, 18, 18.65, 22.7,
    23.4, 25, 26,
  ];
  const zoom = interpolate(
    t,
    cameraTimes,
    [
      1, 1, 1.14, 1.14, 1.15, 1.22, 1.24, 1.18, 1.12, 1.12, 1.29, 1.29, 1, 1,
      1.23, 1.23, 1,
    ],
    clamp,
  );
  const pan = interpolate(
    t,
    cameraTimes,
    [
      12, 12, 63, 63, 95, 175, 173, 142, 52, 42, -252, -252, 0, 0, -183, -183,
      0,
    ],
    clamp,
  );
  const guideX = 110 + time * 90;
  const mascotX = interpolate(
    t,
    [0, 1.7, 4.6, 6.5, 11.5, 13.5, 17, 20, 23.2, 25.4],
    [90, 205, 275, 246, 258, 430, 468, 809, 932, 1015],
    clamp,
  );
  const mascotY = interpolate(
    t,
    [1, 4.8, 6, 11.9, 13.5, 17, 20, 24, 25.4],
    [481, 477, 451, 465, 505, 575, 576, 635, 573],
    clamp,
  );
  const drag = Math.floor((t - 1.65) / 0.65);
  const dragProgress = interpolate(
    t - 1.65 - drag * 0.65,
    [0.07, 0.44],
    [0, 1],
    clamp,
  );
  const dragging = drag >= 0 && drag < 4;
  const dragX = dragging
    ? interpolate(
        dragProgress,
        [0, 1],
        [98 + (drag % 2) * 130, 160 + cuts[drag] * 90],
        clamp,
      )
    : 0;
  const dragY = dragging
    ? interpolate(
        dragProgress,
        [0, 1],
        [156 + Math.floor(drag / 2) * 94, 553],
        clamp,
      )
    : 0;
  const reach: [number, number] | undefined = dragging
    ? [dragX, dragY]
    : t > 5.1 && t < 6.5
      ? [590, 626]
      : t > 8 && t < 11.6
        ? [131, 171]
        : t > 13.7 && t < 17.9
          ? [1103, 157 + Math.min(3, Math.floor((t - 13.7) / 0.95)) * 56]
          : t > 23.2 && t < 25.4
            ? [1130, 285]
            : undefined;
  const phoneX = interpolate(finale, [0, 1], [538, 470], clamp);
  const playhead = 108 + time * 90;
  const fadeUI = 1 - finale * 0.65;

  return (
    <AbsoluteFill
      style={{
        background: "#f3f0e5",
        fontFamily: '"Motion Serif","KaiTi","Kaiti SC",serif',
      }}
    >
      <Audio src={staticFile("soundtrack.wav")} />
      <svg viewBox="0 0 1280 720" width="1280" height="720">
        <defs>
          <linearGradient id="purple" x2="0" y2="1">
            <stop stopColor="#6e679c" />
            <stop offset="1" stopColor="#a9799e" />
          </linearGradient>
          <radialGradient id="ball" cx=".35" cy=".3">
            <stop stopColor="#fff9e9" />
            <stop offset="1" stopColor="#8379bb" />
          </radialGradient>
          <pattern
            id="paper"
            width="23"
            height="19"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M2 4h1m7 11h2m9-8h1m-5 10h1M5 10h1"
              stroke="#70665b"
              strokeWidth=".6"
              opacity=".18"
            />
          </pattern>
          {[0, 1, 2, 3].map((i) => (
            <symbol
              key={i}
              id={`art-${i}`}
              viewBox="0 0 200 326"
              preserveAspectRatio="xMidYMid slice"
            >
              <Artwork kind={i} t={t} />
            </symbol>
          ))}
        </defs>
        <g opacity={interpolate(t, [0.75, 1], [0, 1], clamp)}>
          <Box x={8} y={8} w={1264} h={704} r={14} />
          <Box x={16} y={15} w={1247} h={44} fill="#fffaf1" />
          <Label x={29} y={44} size={16}>
            {"◉ ◉ ◉\u3000小克剪辑台 / 30秒剪片练习.mp4"}
          </Label>
          <Box x={570} y={23} w={140} h={27} fill="#3d3637" />
          <Label
            x={588}
            y={42}
            size={16}
            fill="#fff8e7"
          >{`00:00:${String(Math.floor(t)).padStart(2, "0")}:${String(frame % fps).padStart(2, "0")}`}</Label>
          <Box x={1070} y={23} w={65} h={27} fill="#fffaf1" />
          <Label x={1085} y={42} size={14}>
            1080P
          </Label>
          <Box
            x={1142}
            y={23}
            w={111}
            h={27}
            fill={t > 23.4 ? "#f4d373" : "#86beb1"}
          />
          <Label x={1161} y={42} size={16}>
            {t > 25.6
              ? "✓ 完成"
              : t > 23.4
                ? `导出 ${Math.min(99, Math.round((t - 23.4) * 45))}%`
                : "↗ 导出"}
          </Label>
        </g>
        <g
          transform={`translate(${(1 - zoom) * 640 + pan} ${(1 - zoom) * 455}) scale(${zoom})`}
        >
          <g opacity={opening * fadeUI}>
            <Box x={22} y={70} w={284} h={336} fill="#fdfaf1" r={13} />
            {tabs.map((tab, i) => (
              <g key={tab}>
                <Box
                  x={32 + i * 90}
                  y={79}
                  w={84}
                  h={29}
                  fill={stage === i ? "#f3d275" : "#eeeae0"}
                />
                <Label x={53 + i * 90} y={100}>
                  {tab}
                </Label>
              </g>
            ))}
            {stage === 0 &&
              files.map((file, i) => (
                <g key={file}>
                  <Box
                    x={37 + (i % 2) * 130}
                    y={122 + Math.floor(i / 2) * 94}
                    w={120}
                    h={68}
                    fill={hues[i]}
                  />
                  <use
                    href={`#art-${i}`}
                    x={40 + (i % 2) * 130}
                    y={125 + Math.floor(i / 2) * 94}
                    width={114}
                    height={62}
                  />
                  <Label
                    x={43 + (i % 2) * 130}
                    y={205 + Math.floor(i / 2) * 94}
                    size={15}
                  >
                    {file}
                  </Label>
                </g>
              ))}
            {stage === 1 &&
              tiles.map((tile, i) => (
                <g key={tile}>
                  <Box
                    x={37 + (i % 2) * 130}
                    y={122 + Math.floor(i / 2) * 91}
                    w={120}
                    h={64}
                    fill={
                      [
                        "#ddd5eb",
                        "#d2efdf",
                        "#f3dce5",
                        "#cde8ed",
                        "#ffecbd",
                        "#eae4d5",
                      ][i]
                    }
                  />
                  <Label
                    x={83 + (i % 2) * 130}
                    y={166 + Math.floor(i / 2) * 91}
                    size={32}
                  >
                    {symbols[i]}
                  </Label>
                  <Label
                    x={78 + (i % 2) * 130}
                    y={201 + Math.floor(i / 2) * 91}
                    size={14}
                  >
                    {tile}
                  </Label>
                </g>
              ))}
            {stage === 2 &&
              ["前方高能", "好耶～", "霓虹 NEON"].map((word, i) => (
                <g key={word}>
                  <Box
                    x={40}
                    y={126 + i * 85}
                    w={247}
                    h={65}
                    fill={["#ffe6a4", "#ffe5ee", "#36304d"][i]}
                  />
                  <Label
                    x={81}
                    y={168 + i * 85}
                    size={28}
                    fill={["#6e502e", "#b76987", "#f9d9ff"][i]}
                  >
                    {word}
                  </Label>
                </g>
              ))}
            <Box x={984} y={70} w={272} h={336} fill="#fffdf3" r={13} />
            <Label x={1005} y={109} size={29}>
              调整 +
            </Label>
            {["曝光", "饱和度", "高光", "速度"].map((name, i) => {
              const p = interpolate(
                t,
                [13.7 + i * 0.78, 14.35 + i * 0.78],
                [0.28 + i * 0.11, [0.76, 0.86, 0.35, 0.65][i]],
                clamp,
              );
              const y = 157 + i * 56;
              return (
                <g key={name}>
                  <Label x={1008} y={y - 10} size={16}>
                    {name}
                  </Label>
                  <Label x={1190} y={y - 10} size={15}>
                    {i === 3
                      ? `${(1 + p * 0.55).toFixed(2)}×`
                      : `${Math.round(100 + (p - 0.5) * 38)}%`}
                  </Label>
                  <path d={`M1013 ${y}h214`} stroke="#81756a" strokeWidth="3" />
                  <path
                    d={`M1013 ${y}h${214 * p}`}
                    stroke="#78ae9f"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <circle
                    cx={1013 + 214 * p}
                    cy={y}
                    r="7"
                    fill="#f9f6e9"
                    stroke={ink}
                    strokeWidth="2"
                  />
                </g>
              );
            })}
            <Box x={22} y={420} w={1234} h={282} fill="#fbf8ee" r={12} />
            <path
              d="M100 458H1240M96 520H1240M96 600H1240M96 656H1240"
              stroke="#bfb6a6"
              strokeWidth="1.4"
            />
            {Array.from({ length: 13 }, (_, i) => (
              <g key={i}>
                <path d={`M${108 + i * 90} 449v9`} stroke="#897a72" />
                {i % 2 === 0 && (
                  <Label
                    x={97 + i * 90}
                    y={443}
                    size={15}
                  >{`0:${String(i).padStart(2, "0")}`}</Label>
                )}
              </g>
            ))}
            {["T", "▶", "♪"].map((label, i) => (
              <g key={label}>
                <Box
                  x={35}
                  y={[473, 523, 608][i]}
                  w={44}
                  h={[37, 72, 44][i]}
                  fill={["#fff1c7", "#d5efe4", "#e5dff7"][i]}
                />
                <Label x={49} y={[499, 567, 638][i]} size={23}>
                  {label}
                </Label>
              </g>
            ))}
            {files.map((file, i) => {
              const x = 108 + cuts[i] * 90,
                w = (cuts[i + 1] - cuts[i]) * 90;
              return (
                <g
                  key={file}
                  opacity={interpolate(
                    t,
                    [2.06 + i * 0.65, 2.22 + i * 0.65],
                    [0, 1],
                    clamp,
                  )}
                >
                  <Box x={x} y={526} w={w - 3} h={67} fill={hues[i]} />
                  {Array.from({ length: 4 }, (_, j) => (
                    <use
                      key={j}
                      href={`#art-${i}`}
                      x={x + 3 + (j * (w - 8)) / 4}
                      y={529}
                      width={(w - 8) / 4}
                      height={61}
                    />
                  ))}
                  <rect
                    x={x + 6}
                    y={533}
                    width={i === 3 ? 97 : 71}
                    height={18}
                    rx="5"
                    fill="#fff6df"
                  />
                  <Label x={x + 10} y={547} size={12}>
                    {file}
                  </Label>
                </g>
              );
            })}
            {t > 5.7 &&
              cuts.slice(1, 4).map((cut, i) => (
                <g
                  key={cut}
                  opacity={interpolate(
                    t,
                    [5.7 + i * 0.7, 6 + i * 0.7],
                    [0, 1],
                    clamp,
                  )}
                >
                  <circle
                    cx={108 + cut * 90}
                    cy="560"
                    r="15"
                    fill="#e6f4d9"
                    stroke={ink}
                    strokeWidth="2"
                  />
                  <Label x={100 + cut * 90} y={566} size={18}>
                    {symbols[i]}
                  </Label>
                </g>
              ))}
            {t > 10.8 && (
              <>
                <Box x={599} y={480} w={193} h={27} fill="#f5d77b" />
                <Label x={624} y={499} size={15}>
                  前方高能预警
                </Label>
              </>
            )}
            {t > 4.1 && (
              <>
                <Box x={108} y={608} w={1129} h={44} fill="#dfd4ee" />
                <Label x={118} y={624} size={12}>
                  ♪ bgm_小克.wav
                </Label>
                {Array.from({ length: 278 }, (_, i) => {
                  const h =
                    4 + Math.abs(Math.sin(i * 2.43) * Math.cos(i * 0.13)) * 20;
                  return (
                    <path
                      key={i}
                      d={`M${116 + i * 4} ${637 - h / 2}v${h}`}
                      stroke={i % 3 ? "#9d80be" : "#74699e"}
                      opacity=".7"
                    />
                  );
                })}
              </>
            )}
            {t > 18.1 &&
              Array.from({ length: 36 }, (_, i) => (
                <path
                  key={i}
                  d={`M${112 + i * 23} 658l4 8 4-8Z`}
                  fill={i % 4 ? "#efcf76" : "#d58781"}
                  stroke={ink}
                  strokeWidth=".8"
                  opacity={interpolate(
                    t,
                    [18.1 + i * 0.105, 18.28 + i * 0.105],
                    [0, 1],
                    clamp,
                  )}
                />
              ))}
            <path d={`M${playhead} 449V681`} stroke="#c96268" strokeWidth="2" />
            <path
              d={`M${playhead - 9} 435h18v11l-9 9-9-9Z`}
              fill="#d36f72"
              stroke={ink}
              strokeWidth="1.4"
            />
            {t > 6.1 && t < 7.25 && (
              <text
                x={guideX + 14}
                y={516}
                fontSize="36"
                fontWeight="900"
                fill="#f0a8b5"
                stroke={ink}
                strokeWidth="4"
                paintOrder="stroke"
                transform={`rotate(-13 ${guideX} 516)`}
              >
                啪！
              </text>
            )}
            {t > 12.65 && t < 13.55 && (
              <g>
                <Box x={mascotX - 50} y={510} w={105} h={44} fill="#fffcf0" />
                <Label x={mascotX - 35} y={540} size={24}>
                  Ctrl+Z
                </Label>
              </g>
            )}
          </g>
          <g
            opacity={opening}
            style={{
              filter:
                t > 5.75 && t < 6.36
                  ? `grayscale(${Math.sin((Math.PI * (t - 5.75)) / 0.61)})`
                  : undefined,
            }}
          >
            <Phone
              x={phoneX}
              y={interpolate(finale, [0, 1], [76, 110], clamp)}
              scale={interpolate(finale, [0, 1], [0.91, 1.22], clamp)}
              kind={kind}
              t={t}
              caption={
                t > 28.45
                  ? "拿捏了！"
                  : kind === 2 && t > 10.8 && t < 13.75
                    ? "前方高能"
                    : ""
              }
              flip={Math.max(0, 1 - Math.abs(t - 10.28) * 3.1)}
            />
            {t < 2.15 && (
              <rect
                x="542.5"
                y="80.5"
                width="182"
                height="296.7"
                rx="18"
                fill="#262427"
                opacity={interpolate(t, [1.91, 2.15], [1, 0], clamp)}
              />
            )}
            {t < 25.5 && (
              <Label x={582} y={402} size={20}>
                {"▮◂\u3000\u3000⊙\u3000\u3000▸▮"}
              </Label>
            )}
          </g>
          {t > 12.9 && t < 13.75 && (
            <g transform="rotate(-18 828 274)">
              <Box x={810} y={245} w={111} h={43} fill="#e4f0df" />
              <Label x={826} y={274} size={24} fill="#52866c">
                已修正
              </Label>
            </g>
          )}
          <g opacity={opening}>
            <Mascot
              x={mascotX}
              y={mascotY + Math.sin(t * 9) * 2.5}
              scale={0.91}
              angle={reach ? 0 : Math.sin(t * 6) * 2.5}
              reach={
                reach && [
                  (reach[0] - mascotX) / 0.91,
                  (reach[1] - mascotY) / 0.91,
                ]
              }
            />
            {dragging && dragProgress > 0 && dragProgress < 1 && (
              <g
                transform={`translate(${dragX} ${dragY}) rotate(${Math.sin(dragProgress * Math.PI) * 23})`}
              >
                <Box x={-43} y={-28} w={86} h={56} fill={hues[drag]} />
                <use
                  href={`#art-${drag}`}
                  x={-40}
                  y={-25}
                  width={80}
                  height={50}
                />
              </g>
            )}
          </g>
          <g
            opacity={terminal}
            transform={`translate(${interpolate(t, [0.7, 1], [0, -265], clamp)} ${interpolate(t, [0.7, 1], [0, -175], clamp)})`}
          >
            <Box x={313} y={235} w={654} h={220} fill="#fffcf3" r={6} />
            <path d="M313 266H967" stroke="#a89985" strokeWidth="1.5" />
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={328 + i * 12}
                cy={250}
                r="3.5"
                fill={["#c8786c", "#e3bb65", "#88ad99"][i]}
              />
            ))}
            <Label x={570} y={255} size={13}>
              小克 · 剪辑练习
            </Label>
            <Label x={336} y={302} size={24} fill="#548377">
              &gt; {"导入素材 _".slice(0, Math.ceil(t * 26))}
            </Label>
            {t > 0.27 && (
              <Label x={336} y={337} size={23} fill="#9b794c">
                &gt;{" "}
                {"把四段素材放进时间轴".slice(0, Math.ceil((t - 0.27) * 31))}
              </Label>
            )}
            {t > 0.48 && (
              <Label x={336} y={373} size={23}>
                &gt; {"开始剪辑".slice(0, Math.ceil((t - 0.48) * 36))}
              </Label>
            )}
          </g>
        </g>
        <g
          opacity={finale}
          transform={`translate(${(1 - finale) * -65} 0) rotate(-2 330 358)`}
        >
          <Box x={59} y={231} w={424} h={261} fill="#fffdf2" r={10} />
          <path d="M207 217l107 2-2 27-107-2Z" fill="#edcf79" opacity=".75" />
          {t > 27.05 && (
            <Label x={102} y={306} size={38}>
              30 秒看完，
            </Label>
          )}
          {t > 27.85 && (
            <>
              <text
                x="107"
                y="408"
                fontFamily="Segoe Print, cursive"
                fontSize="66"
                fontWeight="700"
                fill={ink}
              >
                Opus 5.5
              </text>
              <path
                d="M108 431q124-15 277-5"
                fill="none"
                stroke="#d02f33"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </>
          )}
        </g>
        <rect
          width="1280"
          height="720"
          fill="url(#paper)"
          pointerEvents="none"
        />
      </svg>
    </AbsoluteFill>
  );
}
