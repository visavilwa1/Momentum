import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

function getTimeLeft(endDate) {
  const diff = endDate - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Segment({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-inner">
        <span className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-200 mt-1.5">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    const tick = setInterval(() => {
      const t = getTimeLeft(endDate);
      setTimeLeft(t);
      if (!t) clearInterval(tick);
    }, 1000);
    return () => clearInterval(tick);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <p className="text-white font-bold text-lg uppercase tracking-widest">
        Sale has ended
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5 text-red-300 text-sm font-semibold uppercase tracking-widest">
        <Clock size={14} />
        <span>Offer ends in</span>
      </div>
      <div className="flex items-end gap-3 sm:gap-4">
        {timeLeft.days > 0 && <Segment value={timeLeft.days} label="Days" />}
        <Segment value={timeLeft.hours}   label="Hours" />
        <div className="text-white text-2xl font-black pb-6 select-none">:</div>
        <Segment value={timeLeft.minutes} label="Mins" />
        <div className="text-white text-2xl font-black pb-6 select-none">:</div>
        <Segment value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
}
