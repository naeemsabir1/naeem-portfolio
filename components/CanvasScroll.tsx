"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface CanvasScrollProps {
  folderPath: string;
  frameCount: number;
}

export default function CanvasScroll({ folderPath, frameCount }: CanvasScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  // Gradient overlay opacity — fades in during last 15% of scroll
  const overlayOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  // Preload all images with progress tracking
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      const padded = i.toString().padStart(3, "0");
      img.src = `${folderPath}/ezgif-frame-${padded}.jpg`;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    // Cleanup: release image memory on unmount
    return () => {
      imgs.forEach((img) => {
        img.src = "";
        img.onload = null;
        img.onerror = null;
      });
      imagesRef.current = [];

      // Clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, [folderPath, frameCount]);

  // Draw frame with object-fit: cover
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0) return;

      const validIdx = Math.min(Math.max(1, Math.round(index)), frameCount) - 1;
      const img = images[validIdx];
      if (!img || !img.complete || !img.naturalWidth) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // Object-fit: COVER
      const hRatio = w / img.naturalWidth;
      const vRatio = h / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      const drawW = img.naturalWidth * ratio;
      const drawH = img.naturalHeight * ratio;
      const offsetX = (w - drawW) / 2;
      const offsetY = (h - drawH) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [frameCount]
  );

  // Listen to scroll-driven frame changes
  useMotionValueEvent(frameIndex, "change", (val) => {
    requestAnimationFrame(() => renderFrame(val));
  });

  // Render first frame on load + handle resize
  useEffect(() => {
    if (loaded) {
      renderFrame(1);
      const handleResize = () => renderFrame(frameIndex.get());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [loaded, renderFrame, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: "300vh" }}>
      <div className="sticky top-0 w-screen h-screen overflow-hidden">
        {/* Loading indicator */}
        {!loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black">
            <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-white/40 text-sm font-medium tracking-widest uppercase">
              Loading · {progress}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ width: "100vw", height: "100vh" }}
        />

        {/* Bottom gradient transition overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none"
        />
      </div>
    </div>
  );
}
