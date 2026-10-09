"use client";

import React, { useEffect, useRef } from "react";

type InfluencerMarketingStoryProps = {
  contactHref?: string;
};

type Point = {
  x: number;
  y: number;
};

function isElement<T>(element: T | null): element is T {
  return element !== null;
}

const services = [
  {
    id: "influencer",
    className: "influencer",
    title: "Influencer Marketing",
    titleTag: "h1",
    image: "https://dingoppc.com/wp-content/uploads/2026/01/Untitled-design.png",
    alt: "Influencer marketing content creators",
    cards: ["Creator match", "UGC content", "+42% reach"],
    text: "Connect your brand with the right influencers and content creators to amplify visibility and build authentic trust with your audience. From identifying ideal partners and coordinating collaborations to overseeing content creation and performance tracking. Our goal is to generate genuine, engaging content that drives awareness, credibility, and sales both on and off Amazon.",
  },
  {
    id: "tiktok",
    className: "reverse tiktok",
    title: "TikTok Shops",
    titleTag: "h2",
    image: "https://dingoppc.com/wp-content/uploads/2026/01/Untitled-design-3.png",
    alt: "TikTok Shops advertising campaigns",
    cards: ["Live sales", "Trend ready", "3.8x ROAS"],
    text: "Reach new audiences through high-performing TikTok ad campaigns designed to drive awareness, engagement, and sales. From creative strategy and influencer collaborations to audience targeting, budgeting, and optimization ensuring your brand connects authentically with users and converts views into measurable results.",
  },
  {
    id: "meli",
    className: "meli",
    title: "Mercado Libre Ads",
    titleTag: "h2",
    image: "https://dingoppc.com/wp-content/uploads/2026/01/Meli-design-web.png",
    alt: "Mercado Libre Ads campaign management",
    cards: ["Top search", "Smart bids", "LATAM growth"],
    text: "Aumenta tus ventas y visibilidad dentro del ecosistema de Mercado Libre Ads. Nuestro equipo gestiona y optimiza tus campanas para que tus productos aparezcan en los primeros resultados, llegando a los compradores mas relevantes en el momento justo. Desde la estrategia de puja y segmentacion hasta el analisis de resultados, nos enfocamos en maximizar tu retorno de inversion y hacer crecer tu marca dentro del marketplace mas grande de LATAM.",
  },
];

export default function InfluencerMarketingStory({
  contactHref = "#contact",
}: InfluencerMarketingStoryProps) {
  const shellRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pinkPathRef = useRef<SVGPathElement | null>(null);
  const yellowPathRef = useRef<SVGPathElement | null>(null);
  const pinkVisualPathRef = useRef<SVGPathElement | null>(null);
  const yellowVisualPathRef = useRef<SVGPathElement | null>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const pageShell = shellRef.current;
    const storySvg = svgRef.current;
    const storyPinkPath = pinkPathRef.current;
    const storyYellowPath = yellowPathRef.current;

    if (!pageShell || !storySvg || !storyPinkPath || !storyYellowPath) return;

    let pinkPathLength = 0;
    let yellowPathLength = 0;
    let totalPathLength = 0;

    function getPoint(element: HTMLDivElement): Point {
      const shellRect = pageShell!.getBoundingClientRect();
      const rect = element.getBoundingClientRect();

      return {
        x: rect.left - shellRect.left + rect.width / 2,
        y: rect.top - shellRect.top + rect.height / 2,
      };
    }

    function buildSegment(previous: Point, current: Point) {
      const midY = previous.y + (current.y - previous.y) * 0.5;

      return [
        `M ${previous.x} ${previous.y}`,
        `C ${previous.x} ${midY}, ${current.x} ${midY}, ${current.x} ${current.y}`,
      ].join(" ");
    }

    function buildMobileSideSegment(
      previous: Point,
      current: Point,
      shellWidth: number,
      side: "left" | "right",
    ) {
      const sideX = side === "right" ? shellWidth + 18 : -18;
      const lift = 34;

      return [
        `M ${previous.x} ${previous.y}`,
        `C ${previous.x} ${previous.y + lift}, ${sideX} ${previous.y + lift}, ${sideX} ${
          previous.y + 92
        }`,
        `L ${sideX} ${current.y - 92}`,
        `C ${sideX} ${current.y - lift}, ${current.x} ${current.y - lift}, ${current.x} ${
          current.y
        }`,
      ].join(" ");
    }

    function updateStoryProgress() {
      if (!totalPathLength) return;

      const shellRect = pageShell!.getBoundingClientRect();
      const scrollableDistance = Math.max(shellRect.height - window.innerHeight, 1);
      const startOffset = -window.innerHeight * 0.85; // Start drawing much earlier
      const drawDistance = scrollableDistance * 0.35; // complete drawing faster
      const rawProgress = (-shellRect.top - startOffset) / drawDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const drawnLength = totalPathLength * progress;
      const pinkDrawn = Math.min(drawnLength, pinkPathLength);
      const yellowDrawn = Math.max(drawnLength - pinkPathLength, 0);

      storyPinkPath!.style.strokeDashoffset = String(pinkPathLength - pinkDrawn);
      storyYellowPath!.style.strokeDashoffset = String(
        yellowPathLength - Math.min(yellowDrawn, yellowPathLength),
      );
      storyPinkPath!.style.setProperty("--story-opacity", progress > 0.015 ? "1" : "0");
      storyYellowPath!.style.setProperty("--story-opacity", yellowDrawn > 1 ? "1" : "0");
    }

    function buildStoryPath() {
      const shellWidth = pageShell!.scrollWidth;
      const shellHeight = pageShell!.scrollHeight;
      const points = imageRefs.current.filter(isElement).map((element) => getPoint(element));
      const isMobile = window.matchMedia("(max-width: 780px)").matches;

      storySvg!.setAttribute("viewBox", `0 0 ${shellWidth} ${shellHeight}`);
      storySvg!.setAttribute("width", String(shellWidth));
      storySvg!.setAttribute("height", String(shellHeight));

      if (points.length < 3) return;

      const pinkCommands = isMobile
        ? buildMobileSideSegment(points[0], points[1], shellWidth, "right")
        : buildSegment(points[0], points[1]);
      const yellowCommands = isMobile
        ? buildMobileSideSegment(points[1], points[2], shellWidth, "left")
        : buildSegment(points[1], points[2]);

      storyPinkPath!.setAttribute("d", pinkCommands);
      storyYellowPath!.setAttribute("d", yellowCommands);
      
      if (pinkVisualPathRef.current) {
        pinkVisualPathRef.current.setAttribute("d", pinkCommands);
      }
      if (yellowVisualPathRef.current) {
        yellowVisualPathRef.current.setAttribute("d", yellowCommands);
      }

      pinkPathLength = storyPinkPath!.getTotalLength();
      yellowPathLength = storyYellowPath!.getTotalLength();
      totalPathLength = pinkPathLength + yellowPathLength;

      storyPinkPath!.style.strokeDasharray = String(pinkPathLength);
      storyYellowPath!.style.strokeDasharray = String(yellowPathLength);
      updateStoryProgress();
    }

    const rebuild = () => window.requestAnimationFrame(buildStoryPath);
    const resizeObserver = new ResizeObserver(rebuild);

    resizeObserver.observe(pageShell);
    imageRefs.current.filter(isElement).forEach((element) => resizeObserver.observe(element));
    window.addEventListener("scroll", updateStoryProgress, { passive: true });
    window.addEventListener("resize", rebuild);
    rebuild();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateStoryProgress);
      window.removeEventListener("resize", rebuild);
    };
  }, []);

  return (
    <main className="im-story page-shell" ref={shellRef}>
      <style>{styles}</style>

      <svg className="story-line" aria-hidden="true" ref={svgRef}>
        <defs>
          <mask id="story-mask">
            {/* White paths use the drawing logic to reveal the visual paths below */}
            <path className="story-line-mask" ref={pinkPathRef} stroke="white" strokeWidth="6" fill="none" />
            <path className="story-line-mask" ref={yellowPathRef} stroke="white" strokeWidth="6" fill="none" />
          </mask>
        </defs>

        <g mask="url(#story-mask)">
          <path className="story-line-path story-line-pink animated-flow" ref={pinkVisualPathRef} />
          <path className="story-line-path story-line-yellow animated-flow" ref={yellowVisualPathRef} />
        </g>
      </svg>

      {services.map((service, index) => {
        const TitleTag = service.titleTag as "h1" | "h2";

        return (
          <section
            className={`service-section ${service.className}`}
            aria-labelledby={`${service.id}-title`}
            key={service.id}
          >
            <div
              className="image-wrap"
              ref={(element) => {
                imageRefs.current[index] = element;
              }}
            >
              <img src={service.image} alt={service.alt} />
              {service.cards.map((card, cardIndex) => (
                <span className={`float-card card-${["a", "b", "c"][cardIndex]}`} key={card}>
                  {card}
                </span>
              ))}
            </div>

            <div className="content-wrap">
              <TitleTag id={`${service.id}-title`}>{service.title}</TitleTag>
              <p>{service.text}</p>
              <a className="consult-button" href={contactHref}>
                Consulta con nosotros
              </a>
            </div>
          </section>
        );
      })}
    </main>
  );
}

const styles = `
.im-story {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #19212a;
  background: #ffffff;
  --pink: #ff3f8f;
  --tiktok-cyan: #25f4ee;
  --tiktok-red: #fe2c55;
  --meli-yellow: #ffe600;
  --meli-blue: #2d3277;
}

.im-story *,
.im-story *::before,
.im-story *::after {
  box-sizing: border-box;
}

.page-shell {
  display: flex;
  flex-direction: column;
  gap: clamp(72px, 10vw, 132px);
  min-height: 100vh;
  padding: clamp(44px, 7vw, 96px) 20px;
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.story-line {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.story-line-path {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.story-line-mask {
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: var(--story-opacity, 0);
  transition: opacity 180ms ease;
}

.animated-flow {
  stroke-dasharray: 20 20;
  animation: flowLine 1.5s linear infinite;
}

@keyframes flowLine {
  to {
    stroke-dashoffset: -40;
  }
}

.story-line-pink {
  stroke: #ff00b8;
  filter: drop-shadow(0 0 8px rgba(255, 0, 184, 0.62)) drop-shadow(0 0 18px rgba(255, 0, 184, 0.36));
}

.story-line-yellow {
  stroke: #ffff00;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.78)) drop-shadow(0 0 12px rgba(255, 255, 0, 0.76)) drop-shadow(0 0 26px rgba(210, 255, 0, 0.46));
}

.service-section {
  display: grid;
  width: min(1120px, 100%);
  grid-template-columns: minmax(280px, 0.98fr) minmax(300px, 1.02fr);
  align-items: center;
  gap: clamp(28px, 6vw, 72px);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.service-section.reverse .image-wrap {
  order: 2;
}

.image-wrap {
  background: transparent;
  position: relative;
  z-index: 1;
}

.image-wrap::before {
  content: "";
  position: absolute;
  inset: 8%;
  border-radius: 50%;
  background: rgba(255, 63, 143, 0.24);
  filter: blur(34px);
  transform-origin: 50% 50%;
  animation: imageOrbitGlow 7.5s ease-in-out infinite;
  z-index: -1;
}

.tiktok .image-wrap::before {
  background: linear-gradient(135deg, rgba(37, 244, 238, 0.28), rgba(254, 44, 85, 0.24));
}

.meli .image-wrap::before {
  background: rgba(255, 230, 0, 0.34);
}

.image-wrap img {
  display: block;
  width: 100%;
  max-height: 520px;
  height: auto;
  object-fit: contain;
}

.float-card {
  position: absolute;
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.36), inset 0 -1px 0 rgba(255, 255, 255, 0.08), 0 18px 42px rgba(25, 33, 42, 0.08);
  color: #16202a;
  font-size: clamp(0.76rem, 1.1vw, 0.92rem);
  font-weight: 800;
  letter-spacing: 0;
  padding: 9px 13px;
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  animation: floatCard 5.8s ease-in-out infinite;
  pointer-events: none;
  white-space: nowrap;
}

.card-a {
  left: 2%;
  top: 14%;
}

.card-b {
  right: 0;
  top: 38%;
  animation-delay: -1.8s;
}

.card-c {
  left: 14%;
  bottom: 10%;
  animation-delay: -3.2s;
}

.tiktok .float-card {
  background: linear-gradient(135deg, rgba(17, 24, 32, 0.2), rgba(17, 24, 32, 0.04));
  border-color: rgba(255, 255, 255, 0.28);
  color: #ffffff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(255, 255, 255, 0.06), 0 18px 44px rgba(254, 44, 85, 0.08);
}

.meli .float-card {
  background: linear-gradient(135deg, rgba(255, 230, 0, 0.14), rgba(255, 230, 0, 0.03));
  border-color: rgba(180, 180, 180, 0.46);
  color: var(--meli-blue);
}

.content-wrap {
  max-width: 620px;
  position: relative;
  z-index: 2;
}

.content-wrap h1,
.content-wrap h2 {
  margin: 0 0 22px;
  color: #111820;
  line-height: 0.94;
  letter-spacing: 0;
  text-wrap: balance;
}

.content-wrap h1 {
  font-size: clamp(2.55rem, 7vw, 5.55rem);
}

.content-wrap h2 {
  font-size: clamp(2.3rem, 6vw, 4.75rem);
}

.content-wrap p {
  margin: 0;
  max-width: 58ch;
  color: #3f4d59;
  font-size: clamp(1rem, 1.5vw, 1.16rem);
  line-height: 1.72;
}

.consult-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  margin-top: 28px;
  border-radius: 8px;
  background: #ff00b8;
  box-shadow: 0 14px 32px rgba(255, 0, 184, 0.24);
  color: #ffffff;
  font-size: 0.96rem;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
  padding: 0 20px;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.consult-button:hover {
  box-shadow: 0 18px 38px rgba(255, 0, 184, 0.32);
  transform: translateY(-2px);
}

.consult-button:focus-visible {
  outline: 3px solid rgba(255, 0, 184, 0.28);
  outline-offset: 3px;
}

.influencer h1 {
  color: var(--pink);
}

.influencer::before {
  background: rgba(255, 63, 143, 0.08); /* changed from .influencer::before to match original styling */
}

.tiktok h2 {
  color: #111820;
  text-shadow: 
    -3px -3px 0 var(--tiktok-cyan), 
    3px 3px 0 var(--tiktok-red),
    -6px 0 16px rgba(37, 244, 238, 0.6),
    6px 0 16px rgba(254, 44, 85, 0.6);
}

.tiktok::before {
  background: linear-gradient(135deg, rgba(37, 244, 238, 0.08), rgba(254, 44, 85, 0.08));
}

.tiktok .consult-button {
  background: #111820;
  box-shadow: -4px -4px 0 rgba(37, 244, 238, 0.75), 4px 4px 0 rgba(254, 44, 85, 0.75), 0 16px 34px rgba(17, 24, 32, 0.18);
}

.tiktok .consult-button:hover {
  box-shadow: -5px -5px 0 rgba(37, 244, 238, 0.85), 5px 5px 0 rgba(254, 44, 85, 0.85), 0 20px 40px rgba(17, 24, 32, 0.22);
}

.meli h2 {
  color: var(--meli-blue);
  display: inline;
  background: linear-gradient(transparent 58%, var(--meli-yellow) 58%);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.meli .content-wrap p {
  margin-top: 26px;
}

.meli .consult-button {
  background: var(--meli-yellow);
  color: var(--meli-blue);
  box-shadow: inset 0 -3px 0 rgba(45, 50, 119, 0.18), 0 14px 30px rgba(255, 230, 0, 0.36);
}

.meli .consult-button:hover {
  box-shadow: inset 0 -3px 0 rgba(45, 50, 119, 0.2), 0 18px 38px rgba(255, 230, 0, 0.44);
}

.meli::before {
  background: rgba(255, 230, 0, 0.1);
}

.service-section::before {
  content: "";
  position: absolute;
  inset: auto auto -34px -42px;
  width: min(44vw, 360px);
  height: min(44vw, 360px);
  border-radius: 50%;
  filter: blur(18px);
  z-index: 0;
  animation: backgroundGlow 8s ease-in-out infinite alternate;
}

.service-section.reverse::before {
  right: -42px;
  left: auto;
}

@keyframes backgroundGlow {
  0% { transform: translate3d(-12px, 10px, 0) scale(0.96); }
  50% { transform: translate3d(22px, -18px, 0) scale(1.06); }
  100% { transform: translate3d(-4px, -28px, 0) scale(1.01); }
}

@keyframes floatCard {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -14px, 0); }
}

@keyframes imageOrbitGlow {
  0% {
    transform: translate3d(-18%, -12%, 0) scale(0.82);
    border-radius: 45% 55% 58% 42%;
  }
  25% {
    transform: translate3d(22%, -18%, 0) scale(1.08);
    border-radius: 58% 42% 46% 54%;
  }
  50% {
    transform: translate3d(24%, 20%, 0) scale(1.16);
    border-radius: 50% 50% 42% 58%;
  }
  75% {
    transform: translate3d(-22%, 18%, 0) scale(1);
    border-radius: 42% 58% 54% 46%;
  }
  100% {
    transform: translate3d(-18%, -12%, 0) scale(0.82);
    border-radius: 45% 55% 58% 42%;
  }
}

@media (max-width: 780px) {
  .page-shell {
    align-items: start;
    gap: 76px;
    padding: 32px 18px 48px;
  }

  .service-section {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .service-section.reverse .image-wrap {
    order: 0;
  }

  .image-wrap img {
    max-height: 44vh;
    margin: 0 auto;
  }

  .float-card {
    min-height: 32px;
    padding: 7px 10px;
    font-size: 0.74rem;
  }

  .card-a {
    left: 0;
    top: 8%;
  }

  .card-b {
    right: 0;
    top: auto;
    bottom: 18%;
  }

  .card-c {
    display: none;
  }

  .content-wrap h1,
  .content-wrap h2 {
    margin-bottom: 16px;
  }

  .content-wrap p {
    max-width: none;
    font-size: 1rem;
    line-height: 1.65;
  }

  .consult-button {
    min-height: 44px;
    margin-top: 22px;
    padding: 0 16px;
  }

  .service-section::before {
    width: 280px;
    height: 280px;
    inset: 4vh -96px auto auto;
    opacity: 0.8;
  }
}

@media (max-width: 460px) {
  .page-shell {
    padding-inline: 16px;
  }

  .image-wrap img {
    max-height: 38vh;
  }

  .float-card {
    max-width: 42vw;
    white-space: normal;
  }

  .content-wrap h1 {
    font-size: clamp(2.25rem, 14vw, 3.5rem);
  }

  .content-wrap h2 {
    font-size: clamp(2rem, 13vw, 3.1rem);
  }
}
`;
