"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "nouman_splash_seen";
// The brand clip is ~5s. Let it play to its natural end (onEnded); this is only
// a stall-guard so a failed/hung video can never hold the page hostage.
const SAFETY_TIMEOUT_MS = 7000;

export function SplashScreen() {
  const [show, setShow] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Only ever runs in the browser.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Debug/override: `?splash=1` always replays the splash, ignoring session
    // state and reduced-motion, so the clip can be reviewed on demand.
    const forced =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("splash") === "1";

    // Reduced-motion users skip the splash entirely (unless explicitly forced).
    if (reduceMotion && !forced) {
      return;
    }

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage may be unavailable (private mode) — fail open (no splash).
      alreadySeen = true;
    }

    if (alreadySeen && !forced) {
      return;
    }

    // Intentional: splash visibility depends on browser-only sessionStorage /
    // matchMedia / URL, which can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }

    // Stall-guard only — natural dismissal happens on the video's `onEnded`.
    timerRef.current = setTimeout(() => setShow(false), SAFETY_TIMEOUT_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Some browsers ignore the `autoPlay` attribute for programmatically mounted
  // elements; nudge playback and fail open (close splash) if it's rejected.
  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => setShow(false));
    }
  }, [show]);

  // Lock scroll while the splash is on screen.
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  const dismiss = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          // Cover the entire viewport, above everything (header is z-50).
          // Click/tap anywhere skips the intro.
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col items-center justify-center gap-5 bg-[#fbf6ef]"
          onClick={dismiss}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="neo w-[min(76vw,320px)] overflow-hidden rounded-3xl bg-[#fbf6ef]"
            style={{ aspectRatio: "4 / 5" }}
          >
            <video
              ref={videoRef}
              // Centered, fully visible 4:5 clip — `contain` avoids bad cropping.
              className="h-full w-full object-contain"
              src="/brand/nouman-logo-splash.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              controls={false}
              onEnded={dismiss}
              onError={dismiss}
              aria-hidden="true"
            />
          </motion.div>

          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
