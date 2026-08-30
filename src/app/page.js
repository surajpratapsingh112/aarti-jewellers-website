"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const WHATSAPP_NUMBER = "917007307829"; // TODO: confirm with owner, currently from Google Maps listing
const PHONE_DISPLAY = "070073 07829";
const ADDRESS = "538A, 103A, Triveni Nagar 1st, Triveni Nagar, Lucknow, Uttar Pradesh 226020";
const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Aarti+Fashion+Triveni+Nagar+Lucknow&output=embed";
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(ADDRESS);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.86 9.86 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm5.85 14.13c-.25.7-1.25 1.28-1.87 1.4-.5.1-1.15.18-3.35-.72-2.8-1.16-4.6-4.02-4.74-4.2-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.3.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.63.48.25.6.84 2.06.91 2.21.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.25 1.62 2.03 1.12 1 2.06 1.31 2.35 1.46.3.15.47.13.64-.08.17-.2.72-.85.92-1.14.2-.29.4-.24.66-.14.27.1 1.72.81 2.01.96.3.15.49.22.56.35.08.13.08.72-.17 1.42Z" />
    </svg>
  );
}
function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02L6.6 10.8Z" />
    </svg>
  );
}
function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function QuoteMark(props) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" {...props}>
      <path d="M0 24V14.2C0 6.3 4.9.9 12.8 0l1 3.4C8.3 4.6 5.9 7.2 5.6 11H12v13H0Zm18 0V14.2C18 6.3 22.9.9 30.8 0l1 3.4c-5.5 1.2-7.9 3.8-8.2 7.6H30v13H18Z" />
    </svg>
  );
}

// ---------- Animated logo: Aarti Jewellers & Fashions ----------
function AartiLogo({ withText = true, size = 40, onDark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
        <defs>
          <linearGradient id="ajGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d4af37" />
            <stop offset="0.5" stopColor="#f1d688" />
            <stop offset="1" stopColor="#b8860b" />
          </linearGradient>
          <clipPath id="ajClip">
            <polygon points="32,6 56,19 56,45 32,58 8,45 8,19" />
          </clipPath>
        </defs>
        {/* rotating bezel dots */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          style={{ transformOrigin: "32px 32px" }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const r = 30;
            return (
              <circle
                key={i}
                cx={32 + r * Math.cos(angle)}
                cy={32 + r * Math.sin(angle)}
                r="1.3"
                fill="#5b1220"
                opacity="0.55"
              />
            );
          })}
        </motion.g>
        <polygon points="32,6 56,19 56,45 32,58 8,45 8,19" fill="#5b1220" />
        <polygon points="32,10 52,21 52,43 32,54 12,43 12,21" fill="url(#ajGold)" stroke="#3d0c15" strokeWidth="1" />
        <text x="32" y="38" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="19" fontWeight="700" fill="#3d0c15">
          AJ
        </text>
        {/* shimmer sweep */}
        <g clipPath="url(#ajClip)">
          <motion.rect
            x="-40"
            y="0"
            width="24"
            height="64"
            fill="white"
            opacity="0.35"
            animate={{ x: [-40, 90] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", repeatDelay: 1.4 }}
            style={{ transform: "skewX(-20deg)" }}
          />
        </g>
      </svg>
      {withText && (
        <span
          className={`font-display text-lg font-semibold tracking-wide ${
            onDark ? "text-[color:var(--gold-pale)]" : "text-[color:var(--maroon)]"
          }`}
        >
          Aarti <span className="font-script italic text-[color:var(--gold)]">Jewellers &amp; Fashions</span>
        </span>
      )}
    </div>
  );
}

// ---------- Animated logo: Suraj Digital Works (site credit) ----------
// 20 rays, evenly spaced, alternating short/long like real sun rays.
// All short rays pulse outward together, then all long rays pulse outward
// together, then back to short - one wave at a time, not per-ray random.
const SUN_RAY_COUNT = 20;
const SUN_RAYS = Array.from({ length: SUN_RAY_COUNT }).map((_, i) => {
  const angle = (i / SUN_RAY_COUNT) * Math.PI * 2;
  const isLong = i % 2 === 0;
  const inner = 17;
  const outer = isLong ? 29 : 22;
  return {
    key: i,
    isLong,
    x1: 32 + inner * Math.cos(angle),
    y1: 32 + inner * Math.sin(angle),
    x2: 32 + outer * Math.cos(angle),
    y2: 32 + outer * Math.sin(angle),
    width: isLong ? 2.4 : 1.6,
  };
});

const RAY_PULSE_DURATION = 0.8;
const RAY_PULSE_GAP = 1.0;
const RAY_PULSE_PERIOD = RAY_PULSE_DURATION + RAY_PULSE_GAP;

function SurajLogo({ withText = true, size = 34 }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0 overflow-visible">
        <defs>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb347" />
            <stop offset="1" stopColor="#ff7a30" />
          </linearGradient>
        </defs>
        {SUN_RAYS.map((r) => (
          <motion.line
            key={r.key}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke="url(#sunGrad)"
            strokeWidth={r.width}
            strokeLinecap="round"
            initial={{ opacity: 0.18, pathLength: 0.55 }}
            animate={{ opacity: [0.18, 1, 0.18], pathLength: [0.55, 1, 0.55] }}
            transition={{
              repeat: Infinity,
              duration: RAY_PULSE_DURATION,
              ease: "easeInOut",
              repeatDelay: RAY_PULSE_GAP,
              delay: r.isLong ? RAY_PULSE_PERIOD / 2 : 0,
            }}
          />
        ))}
        <motion.circle
          cx="32"
          cy="32"
          r="14"
          fill="#1f2937"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          style={{ transformOrigin: "32px 32px" }}
        />
        <circle cx="32" cy="32" r="14" fill="none" stroke="url(#sunGrad)" strokeWidth="1.5" />
        <text x="32" y="36.5" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="10" fontWeight="700" fill="#ffb347">
          SDW
        </text>
      </svg>
      {withText && (
        <span className="text-[9px] font-medium leading-tight tracking-wide text-[#e8e2d8]/90">
          Suraj Digital Works
        </span>
      )}
    </div>
  );
}

// Elegant placeholder used until real product photos are added.
// Swap any <PlaceholderPanel .../> for a real <img src="/photos/xyz.jpg" .../>
function PlaceholderPanel({ label, className = "" }) {
  return (
    <div
      className={`group relative flex items-center justify-center overflow-hidden rounded-[1.75rem] border border-[color:var(--gold-light)]/40 bg-gradient-to-br from-[#efe2c8] via-[#f6ecd9] to-[#e2c98d] transition-transform duration-500 ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="motif" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.1" fill="#5b1220" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#motif)" />
      </svg>
      <div className="absolute inset-3 rounded-[1.4rem] border border-[color:var(--gold)]/30" />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-[color:var(--maroon)]/40" fill="currentColor">
          <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v9.5l4.5-4.2 3 2.7 3.7-4L19 15V7H5Zm3 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="font-display text-xs italic tracking-wide text-[color:var(--maroon)]/60">{label}</span>
      </div>
    </div>
  );
}

const collections = [
  { title: "Sarees & Suits", desc: "Silk, cotton and designer sarees - for everyday wear and festive occasions." },
  { title: "Lehenga & Bridal Wear", desc: "Lehengas, gowns and bridal outfits for weddings and functions, in every budget." },
  { title: "Jewellery & Accessories", desc: "Traditional and artificial jewellery to complete every outfit." },
];

const trustItems = ["5.0 ★ Google Rating", "Triveni Nagar's Own Store", "100% 5-Star Reviews", "Sarees • Lehenga • Jewellery"];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[color:var(--maroon)] via-[color:var(--gold)] to-[color:var(--maroon)]"
    />
  );
}

function Section({ id, className = "", children }) {
  return (
    <motion.section id={id} className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {children}
    </motion.section>
  );
}

function StarIcon({ filled, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 2.5l2.9 6.3 6.9.7-5.1 4.7 1.5 6.8L12 17.6l-6.2 3.4 1.5-6.8-5.1-4.7 6.9-.7L12 2.5Z" />
    </svg>
  );
}

// Approved visitor-submitted reviews, fetched from /api/reviews/list.
// Renders nothing extra until the database + email are configured -
// the seed Google reviews above always show regardless.
const REVIEWS_PAGE_SIZE = 10;

function VisitorReviews() {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews/list")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.ok) setReviews(data.reviews);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <>
      {visibleReviews.map((r) => (
        <motion.blockquote
          key={r.id}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative rounded-[1.75rem] border border-[color:var(--gold-light)]/30 bg-white/70 p-7 text-[#4a2f22]"
        >
          {r.featured ? (
            <span className="absolute -top-3 right-6 rounded-full bg-[color:var(--gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
              Top Review
            </span>
          ) : null}
          <QuoteMark className="h-7 w-10 text-[color:var(--gold)]/50" />
          {r.rating ? (
            <div className="mt-2 flex gap-0.5 text-[color:var(--gold)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < r.rating} className="h-3.5 w-3.5" />
              ))}
            </div>
          ) : null}
          <p className="font-display mt-2 text-xl italic">&ldquo;{r.review_text}&rdquo;</p>
          <footer className="mt-4 text-sm font-medium text-[color:var(--maroon)]">{r.name}</footer>
        </motion.blockquote>
      ))}
      {hasMore ? (
        <div className="col-span-full mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + REVIEWS_PAGE_SIZE)}
            className="rounded-full border border-[color:var(--gold)] px-6 py-2.5 text-sm font-medium text-[color:var(--maroon)] transition hover:bg-[color:var(--gold)] hover:text-white"
          >
            See More Reviews
          </button>
        </div>
      ) : null}
    </>
  );
}

// "Leave a review" form - submits to /api/reviews/submit, which emails the
// owner an Approve link. The review only appears above once approved.
function ReviewForm() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, review, rating, website: "" }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
        setName("");
        setReview("");
        setRating(5);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto mt-14 max-w-xl rounded-[1.75rem] border border-[color:var(--gold-light)]/30 bg-white/70 p-7"
    >
      <h3 className="font-display text-xl font-semibold text-[color:var(--maroon)]">Leave a Review</h3>
      <p className="mt-1 text-sm text-[#5a4638]">
        Visited the store? Share your experience - it goes to the owner first and appears here once approved.
      </p>

      {status === "success" ? (
        <p className="mt-5 rounded-2xl bg-[#e9f5e9] px-4 py-3 text-sm text-[#215c2b]">
          Thank you! Your review has been sent for approval.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#5a4638]">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
              className="w-full rounded-xl border border-[color:var(--gold-light)]/40 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--maroon)]"
              placeholder="e.g. Priya Sharma"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#5a4638]">Rating</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className="text-[color:var(--gold)]"
                  aria-label={`${i + 1} star`}
                >
                  <StarIcon filled={i < rating} className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#5a4638]">Your review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              maxLength={1000}
              rows={4}
              className="w-full rounded-xl border border-[color:var(--gold-light)]/40 bg-white px-4 py-2.5 text-sm outline-none focus:border-[color:var(--maroon)]"
              placeholder="Tell others about your experience..."
            />
          </div>
          {/* Honeypot field - hidden from real visitors, bots often fill every field */}
          <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" />

          {status === "error" && (
            <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-[color:var(--maroon)] px-6 py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Submit Review"}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <ScrollProgress />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--gold-light)]/25 bg-[color:var(--cream)]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <AartiLogo />
          <div className="hidden gap-8 text-sm font-medium text-[#4a2f22] sm:flex">
            <a href="#collections" className="transition hover:text-[color:var(--maroon)]">Collections</a>
            <a href="#reviews" className="transition hover:text-[color:var(--maroon)]">Reviews</a>
            <a href="#visit" className="transition hover:text-[color:var(--maroon)]">Visit Us</a>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </motion.a>
        </nav>
      </header>

      {/* HERO */}
      <div ref={heroRef} className="relative">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[color:var(--gold-pale)]/30 blur-3xl" />
        <div className="pointer-events-none absolute top-40 left-[-8%] h-[320px] w-[320px] rounded-full bg-[color:var(--maroon)]/10 blur-3xl" />

        <motion.section
          style={{ y: heroY, opacity: heroFade }}
          className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--maroon)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--maroon)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
              Triveni Nagar, Lucknow
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-semibold leading-[1.1] text-[#2a1a12] sm:text-6xl">
              Sarees, Lehengas &amp; <br />
              <span className="font-script italic text-gradient-gold">Jewellery</span> - All Under One Roof
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-md text-base text-[#5a4638] sm:text-lg">
              Aarti Jewellers &amp; Fashions is Triveni Nagar&apos;s trusted local store, where fashion
              and jewellery come together - for every budget.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[color:var(--maroon)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--maroon)]/20"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={MAPS_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[color:var(--maroon)]/40 px-6 py-3 text-sm font-semibold text-[color:var(--maroon)]"
              >
                <PinIcon className="h-4 w-4" />
                Get Directions
              </motion.a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 text-sm text-[#5a4638]">
              <div>
                <span className="font-display block text-3xl font-semibold text-[color:var(--maroon)]">5.0 ★</span>
                Google Rating
              </div>
              <div className="h-9 w-px bg-[color:var(--gold-light)]/40" />
              <div>
                <span className="font-display block text-3xl font-semibold text-[color:var(--maroon)]">100%</span>
                5-Star Reviews
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="animate-floaty">
              <PlaceholderPanel label="Shop photo coming soon" className="aspect-[4/3] w-full shadow-2xl shadow-[color:var(--maroon)]/15" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 rotate-3 rounded-2xl border border-[color:var(--gold-light)]/40 bg-white px-5 py-3 shadow-xl"
            >
              <p className="font-display text-sm italic text-[color:var(--maroon)]">&ldquo;Good jeweller&rdquo;</p>
              <p className="mt-0.5 text-[11px] text-[#8a7663]">- Google review</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* MARQUEE TRUST BAND */}
        <div className="relative overflow-hidden border-y border-[color:var(--gold-light)]/30 bg-[color:var(--maroon)] py-3">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((t, i) => (
              <span key={i} className="flex items-center gap-3 font-display text-sm italic tracking-wide text-[color:var(--gold-pale)]">
                {t}
                <span className="text-[color:var(--gold)]/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* COLLECTIONS */}
      <Section id="collections" className="bg-white/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.p variants={fadeUp} className="font-script text-lg italic text-[color:var(--gold)]">Our Collection</motion.p>
          <motion.h2 variants={fadeUp} className="font-display mt-1 text-3xl font-semibold text-[#2a1a12] sm:text-4xl">
            What We Offer
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-xl text-[#5a4638]">
            Three categories under one roof - visit the store to see the full range in person.
          </motion.p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {collections.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -8, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex flex-col gap-4 rounded-[1.75rem] bg-[color:var(--cream)] p-5 shadow-sm ring-1 ring-[color:var(--gold-light)]/20"
              >
                <PlaceholderPanel label="Product photo" className="aspect-square w-full" />
                <div>
                  <h3 className="font-display font-semibold text-[color:var(--maroon)]">{c.title}</h3>
                  <p className="mt-1 text-sm text-[#5a4638]">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.p variants={fadeUp} className="font-script text-lg italic text-[color:var(--gold)]">Testimonials</motion.p>
          <motion.h2 variants={fadeUp} className="font-display mt-1 text-3xl font-semibold text-[#2a1a12] sm:text-4xl">
            What Our Customers Say
          </motion.h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <motion.blockquote variants={fadeUp} className="relative rounded-[1.75rem] border border-[color:var(--gold-light)]/30 bg-white/70 p-7 text-[#4a2f22]">
              <QuoteMark className="h-7 w-10 text-[color:var(--gold)]/50" />
              <p className="font-display mt-2 text-xl italic">&ldquo;Best&rdquo;</p>
              <footer className="mt-4 text-sm font-medium text-[color:var(--maroon)]">Google reviewer</footer>
            </motion.blockquote>
            <motion.blockquote variants={fadeUp} className="relative rounded-[1.75rem] border border-[color:var(--gold-light)]/30 bg-white/70 p-7 text-[#4a2f22]">
              <QuoteMark className="h-7 w-10 text-[color:var(--gold)]/50" />
              <p className="font-display mt-2 text-xl italic">&ldquo;Good jeweller&rdquo;</p>
              <footer className="mt-4 text-sm font-medium text-[color:var(--maroon)]">Anchal Rastogi</footer>
            </motion.blockquote>
            <VisitorReviews />
          </div>

          <ReviewForm />
        </div>
      </Section>

      {/* CTA BAND */}
      <Section className="bg-[color:var(--maroon)] py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center">
          <motion.h3 variants={fadeUp} className="font-display text-2xl font-semibold text-[color:var(--gold-pale)] sm:text-3xl">
            Ask us about your perfect saree or lehenga today
          </motion.h3>
          <motion.a
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Message on WhatsApp
          </motion.a>
        </div>
      </Section>

      {/* VISIT / CONTACT */}
      <Section id="visit" className="bg-white/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <p className="font-script text-lg italic text-[color:var(--gold)]">Find Us</p>
            <h2 className="font-display mt-1 text-3xl font-semibold text-[#2a1a12] sm:text-4xl">Visit Our Store</h2>
            <div className="mt-7 space-y-4 text-[#4a2f22]">
              <div className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--maroon)]" />
                <span>{ADDRESS}</span>
              </div>
              <a href={`tel:+91${PHONE_DISPLAY.replace(/\s/g, "")}`} className="flex items-center gap-3 transition hover:text-[color:var(--maroon)]">
                <PhoneIcon className="h-5 w-5 shrink-0 text-[color:var(--maroon)]" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--maroon)]" />
                <span>Open daily until 9 PM</span>
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Message on WhatsApp
            </motion.a>
          </motion.div>
          <motion.div variants={fadeUp} className="overflow-hidden rounded-[1.75rem] shadow-lg ring-1 ring-[color:var(--gold-light)]/30">
            <iframe
              title="Aarti Jewellers & Fashions - Google Map"
              src={MAPS_EMBED_SRC}
              className="h-72 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--gold-light)]/30 bg-[color:var(--maroon-deep)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center">
          <AartiLogo size={34} onDark />
          <span className="text-sm text-[#e8e2d8]/80">Triveni Nagar, Lucknow</span>
          <div className="mt-2 flex items-center gap-1.5 rounded-full border border-[color:var(--gold-light)]/20 px-3 py-1.5">
            <span className="text-[9px] uppercase tracking-wide text-[#e8e2d8]/60">Designed &amp; Developed by</span>
            <SurajLogo size={38} />
          </div>
        </div>
      </footer>
    </main>
  );
}
