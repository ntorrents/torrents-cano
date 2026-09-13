function Star({
  className,
  color = "#F0D27A",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 4l2.4 7.4H30l-6 4.4 2.3 7.2L20 18.6l-6.3 4.4 2.3-7.2-6-4.4h7.6L20 4z"
        fill={color}
      />
    </svg>
  );
}

/** Decoraciones suaves de fondo: estrellas, garabatos y puntos. */
export function SoftDoodles({ variant = "page" }: { variant?: "hero" | "page" }) {
  const dense = variant === "hero";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Star
        className={`doodle-drift absolute ${dense ? "left-[6%] top-[18%] h-10 w-10 opacity-55" : "left-[3%] top-[10%] h-8 w-8 opacity-45"}`}
      />
      <Star
        className="doodle-drift-slow absolute right-[8%] top-[12%] h-7 w-7 opacity-40"
        color="#E8A090"
      />
      <Star
        className="doodle-drift absolute left-[22%] top-[38%] h-5 w-5 opacity-35"
        color="#7EB8A2"
      />
      <Star
        className="doodle-drift-slow absolute right-[18%] top-[42%] h-6 w-6 opacity-30"
        color="#F0D27A"
      />
      <Star
        className="doodle-drift absolute left-[8%] bottom-[28%] h-7 w-7 opacity-40"
        color="#9BC4DE"
      />
      <Star
        className="doodle-drift-slow absolute right-[6%] bottom-[20%] h-8 w-8 opacity-35"
        color="#E8A090"
      />
      <Star
        className="doodle-drift absolute left-[48%] top-[8%] h-4 w-4 opacity-30"
        color="#F0D27A"
      />
      <Star
        className="doodle-drift-slow absolute right-[40%] bottom-[12%] h-5 w-5 opacity-28"
        color="#7EB8A2"
      />

      <svg
        className={`doodle-drift-slow absolute ${dense ? "right-[10%] top-[24%] h-12 w-12 opacity-45" : "right-[5%] top-[22%] h-9 w-9 opacity-35"}`}
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M8 28c6-10 14-14 22-10"
          stroke="#E8A090"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M14 34c8-8 16-10 24-6"
          stroke="#7EB8A2"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="doodle-drift absolute bottom-[22%] right-[14%] h-8 w-8 opacity-40"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle cx="10" cy="14" r="3" fill="#7EB8A2" />
        <circle cx="20" cy="10" r="2.2" fill="#E8A090" />
        <circle cx="22" cy="20" r="2.6" fill="#F0D27A" />
      </svg>

      <svg
        className="absolute left-[12%] bottom-[16%] h-7 w-16 opacity-35"
        viewBox="0 0 64 28"
        fill="none"
      >
        <path
          d="M4 18c8-12 16-12 24 0s16 12 24 0"
          stroke="#5a6f66"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>

      <div className="float-a absolute left-[18%] top-[58%] h-3 w-3 rounded-full bg-butter/70" />
      <div className="float-b absolute right-[28%] top-[62%] h-2.5 w-2.5 rounded-full bg-coral/60" />
      <div className="float-c absolute left-[42%] top-[14%] h-2 w-2 rounded-full bg-mint/70" />
      <div className="float-a absolute right-[12%] top-[55%] h-2 w-2 rounded-full bg-sky" />
    </div>
  );
}
