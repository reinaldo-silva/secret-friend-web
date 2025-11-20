"use client";
import clsx from "clsx";
import { SquareDashedMousePointer, Smartphone } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Text } from "./ui/Text";

const w = 300;
const h = 100;

export default function ScratchReveal({ name }: { name: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const isDrawing = useRef(false);
  const texture = "/image.png";

  const resizeText = useEffectEvent(() => {
    const span = textRef.current;
    const container = containerRef.current;
    if (!span || !container) return;

    const maxWidth = w * 0.9;
    let fontSize = 48;
    span.style.fontSize = `${fontSize}px`;

    while (span.offsetWidth > maxWidth && fontSize > 10) {
      fontSize -= 2;
      span.style.fontSize = `${fontSize}px`;
    }
  });

  const handleCanvaInit = useEffectEvent(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = w;
    canvas.height = h;

    const img = new Image();
    img.src = texture;

    img.onload = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(img, 0, 0, w, h);

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 35;
      ctx.lineCap = "round";
    };

    const startDraw = () => {
      isDrawing.current = true;
      ctx.beginPath();
    };

    const stopDraw = () => {
      isDrawing.current = false;
      checkRevealPercentage();
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;

      const rect = canvas.getBoundingClientRect();
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const clientY =
        e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchend", stopDraw);
    canvas.addEventListener("touchmove", draw);

    const checkRevealPercentage = () => {
      const imgData = ctx.getImageData(0, 0, w, h);
      let transparentPixels = 0;

      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) transparentPixels++;
      }

      const percent = (transparentPixels / (w * h)) * 100;

      if (percent > 70 && !isRevealed) {
        setIsRevealed(true);
        ctx.clearRect(0, 0, w, h);
      }
    };

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("mousemove", draw);

      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchend", stopDraw);
      canvas.removeEventListener("touchmove", draw);
    };
  });

  const revealImmediately = () => {
    setIsRevealed(true);
  };

  useEffect(() => {
    resizeText();
    handleCanvaInit();
  }, [name]);

  // Detecta se o dispositivo tem entrada por toque e atualiza a interface
  useEffect(() => {
    if (typeof window === "undefined") return;

    const detect = () => {
      const hasTouch =
        "ontouchstart" in window ||
        (typeof navigator !== "undefined" &&
          (navigator as Navigator & { maxTouchPoints?: number })
            .maxTouchPoints > 0) ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(!!hasTouch);
    };

    detect();
  }, []);

  useEffect(() => {
    if (!isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
  }, [isRevealed]);

  return (
    <div className="space-y-2">
      <section
        className={clsx(
          "flex flex-col items-center p-1 rounded-2xl shadow bg-zinc-50 animate-fade-in",
          `w-[300px] h-[100px]`
        )}
      >
        <div
          ref={containerRef}
          className="relative size-full flex rounded-xl border-2 border-dashed border-zinc-400 items-center justify-center overflow-hidden"
        >
          {/* TEXTO COM AUTO AJUSTE */}
          <span
            ref={textRef}
            className="absolute uppercase font-bold text-gray-900 select-none pointer-events-none z-0 whitespace-nowrap"
          >
            {name}
          </span>

          {/* CAMADA RASPÁVEL */}
          <canvas ref={canvasRef} className="absolute rounded-lg z-10" />
        </div>
      </section>
      <section className="flex justify-center items-center gap-2">
        <Text>
          {isTouchDevice
            ? "Toque e arraste para revelar"
            : "Passe o mouse para revelar"}
        </Text>
        {isTouchDevice ? <Smartphone /> : <SquareDashedMousePointer />}
      </section>
      <button
        className="flex justify-center items-center w-full hover:text-zinc-950 font-semibold underline text-sm text-zinc-700 cursor-pointer"
        type="button"
        onClick={revealImmediately}
        aria-label="Revelar sem raspar"
      >
        Ou clique aqui para revelar!
      </button>
    </div>
  );
}
