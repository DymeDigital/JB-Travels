"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Calendar, Check, Mail, MessageSquare, Minus, Phone, Plus, Send, User } from "lucide-react";
import type { Destination } from "@/components/sections/Destinations";
import {
  BUDGETS, CABIN_CLASSES, CONTACT_METHODS, CONTACT_TIMES, DATE_FLEXIBILITY, DEPARTURE_CITIES,
  DIETARY, HOTEL_STANDARDS, LIMITS, OCCASIONS, SERVICES, type Option,
} from "@/lib/enquiryOptions";

type Props = {
  destination: Destination;
  onBack: () => void;
  onSubmitted: () => void;
};

type FormState = {
  departureDate: string;
  dateFlexibility: string;
  nights: string;
  departureCity: string;
  departureCityOther: string;
  adults: number;
  children: number;
  childAges: string[];
  infants: number;
  rooms: string;
  servicesRequested: string[];
  cabinClass: string;
  passportNationality: string;
  occasion: string;
  hotelStandard: string;
  budget: string;
  dietary: string[];
  dietaryNotes: string;
  accessibilityNeeds: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
  contactTime: string;
  message: string;
};

const STEPS = ["Your trip", "Services & preferences", "Your details"] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const font = { fontFamily: "Inter, sans-serif" };
const inputBase =
  "w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0B3D5B]/30 focus:border-[#0B3D5B]";
const withIcon = `${inputBase} pl-9`;

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const toInt = (v: string) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
};

function initialState(dest: Destination): FormState {
  return {
    departureDate: "",
    dateFlexibility: "exact",
    nights: "",
    departureCity: "",
    departureCityOther: "",
    adults: 2,
    children: 0,
    childAges: [],
    infants: 0,
    rooms: "",
    servicesRequested: [],
    cabinClass: "economy",
    passportNationality: "",
    occasion: "",
    hotelStandard: "",
    budget: "",
    dietary: [],
    dietaryNotes: "",
    accessibilityNeeds: "",
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    contactTime: "",
    message: `Hi Brandon,\n\nI am interested in the ${dest.name}${dest.country ? ` (${dest.country})` : ""} package.\n\nPlease send me availability and a quote.`,
  };
}

function Label({ children, htmlFor, required }: { children: ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-700 mb-1" style={font}>
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}

function Select({ id, value, onChange, options, placeholder }: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
}) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputBase}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Counter({ label, hint, value, min, max, onChange }: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const btn =
    "w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#0B3D5B] cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed";
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div style={font}>
        <p className="text-xs sm:text-sm font-semibold text-gray-700">{label}</p>
        {hint && <p className="text-[11px] text-gray-500">{hint}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className={btn} aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-[#0B3D5B]" aria-live="polite">
          {value}
        </span>
        <button type="button" className={btn} aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function Chips({ options, selected, onToggle, label }: {
  options: Option[];
  selected: string[];
  onToggle: (v: string) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(o.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors cursor-pointer ${
              on ? "bg-[#0B3D5B] border-[#0B3D5B] text-white" : "bg-white border-gray-300 text-gray-700 hover:border-[#0B3D5B]"
            }`}
            style={font}
          >
            {on && <Check className="w-3 h-3" />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function PackageEnquiryForm({ destination, onBack, onSubmitted }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(() => initialState(destination));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const toggle = (key: "servicesRequested" | "dietary", value: string) =>
    update(key, form[key].includes(value) ? form[key].filter((v) => v !== value) : [...form[key], value]);

  const setChildren = (n: number) =>
    setForm((prev) => ({ ...prev, children: n, childAges: Array.from({ length: n }, (_, i) => prev.childAges[i] ?? "") }));

  const validateStep = (s: number): string | null => {
    if (s === 0) {
      if (form.adults < 1) return "At least one adult must travel.";
      if (form.childAges.some((a) => a === "")) return "Please select each child's age.";
      if (form.departureCity === "other" && !form.departureCityOther.trim()) return "Please tell us which city you're departing from.";
    }
    if (s === 2) {
      if (!form.name.trim()) return "Please enter your name.";
      if (!EMAIL_RE.test(form.email.trim())) return "Please enter a valid email address.";
    }
    return null;
  };

  const submit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          packageId: destination.packageId,
          packageName: destination.name,
          country: destination.country,
          message: form.message.trim(),
          departureDate: form.departureDate || undefined,
          dateFlexibility: form.departureDate ? form.dateFlexibility : undefined,
          nights: toInt(form.nights),
          departureCity: form.departureCity || undefined,
          departureCityOther: form.departureCity === "other" ? form.departureCityOther.trim() : undefined,
          adults: form.adults,
          children: form.children,
          childAges: form.childAges.map(toInt),
          infants: form.infants,
          rooms: toInt(form.rooms),
          servicesRequested: form.servicesRequested,
          cabinClass: form.servicesRequested.includes("flights") ? form.cabinClass : undefined,
          passportNationality: form.servicesRequested.includes("visa") ? form.passportNationality.trim() : undefined,
          occasion: form.occasion || undefined,
          hotelStandard: form.hotelStandard || undefined,
          budget: form.budget || undefined,
          dietary: form.dietary,
          dietaryNotes: form.dietaryNotes.trim(),
          accessibilityNeeds: form.accessibilityNeeds.trim(),
          contactMethod: form.contactMethod || undefined,
          contactTime: form.contactTime || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to send your enquiry. Please try again.");
        return;
      }
      onSubmitted();
    } catch (err) {
      console.error("Submission error:", err);
      setError("Couldn't reach our server. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const problem = validateStep(step);
    if (problem) return setError(problem);
    if (step < STEPS.length - 1) return setStep(step + 1);
    void submit();
  };

  const back = () => {
    setError(null);
    if (step === 0) onBack();
    else setStep(step - 1);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-between h-full">
      <div>
        {/* Header + step indicator */}
        <div className="mb-4 pb-3 border-b border-gray-100">
          <h4 className="text-lg font-bold text-[#0B3D5B]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Enquire: {destination.name} Package
          </h4>
          <ol className="mt-3 flex items-center gap-2" aria-label="Enquiry steps">
            {STEPS.map((label, i) => (
              <li key={label} className="flex-1" aria-current={i === step ? "step" : undefined}>
                <div className={`h-1 rounded-full ${i <= step ? "bg-[#D8B15A]" : "bg-gray-200"}`} />
                <p className={`mt-1 text-[11px] ${i === step ? "text-[#0B3D5B] font-semibold" : "text-gray-400"}`} style={font}>
                  {i + 1}. {label}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {step === 0 && (
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="enq-date">Departure date</Label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="enq-date"
                    type="date"
                    min={todayIso()}
                    value={form.departureDate}
                    onChange={(e) => update("departureDate", e.target.value)}
                    className={withIcon}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="enq-flex">How flexible?</Label>
                <Select id="enq-flex" value={form.dateFlexibility} onChange={(v) => update("dateFlexibility", v)} options={DATE_FLEXIBILITY} />
              </div>
              <div>
                <Label htmlFor="enq-nights">Nights</Label>
                <input
                  id="enq-nights"
                  type="number"
                  inputMode="numeric"
                  min={LIMITS.nights.min}
                  max={LIMITS.nights.max}
                  placeholder="e.g. 7"
                  value={form.nights}
                  onChange={(e) => update("nights", e.target.value)}
                  className={inputBase}
                />
              </div>
              <div>
                <Label htmlFor="enq-from">Departing from</Label>
                <Select id="enq-from" value={form.departureCity} onChange={(v) => update("departureCity", v)} options={DEPARTURE_CITIES} placeholder="Select…" />
              </div>
            </div>
            {form.departureCity === "other" && (
              <div>
                <Label htmlFor="enq-from-other" required>Which city?</Label>
                <input
                  id="enq-from-other"
                  type="text"
                  maxLength={100}
                  placeholder="e.g. Bloemfontein"
                  value={form.departureCityOther}
                  onChange={(e) => update("departureCityOther", e.target.value)}
                  className={inputBase}
                />
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 px-3 py-1 divide-y divide-gray-100">
              <Counter label="Adults" value={form.adults} min={LIMITS.adults.min} max={LIMITS.adults.max} onChange={(v) => update("adults", v)} />
              <Counter label="Children" hint="Ages 2–17" value={form.children} min={LIMITS.children.min} max={LIMITS.children.max} onChange={setChildren} />
              <Counter label="Infants" hint="Under 2" value={form.infants} min={LIMITS.infants.min} max={LIMITS.infants.max} onChange={(v) => update("infants", v)} />
            </div>

            {form.children > 0 && (
              <div>
                <Label required>Children&apos;s ages (on the day of travel)</Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {form.childAges.map((age, i) => (
                    <select
                      key={i}
                      aria-label={`Child ${i + 1} age`}
                      value={age}
                      onChange={(e) => update("childAges", form.childAges.map((a, j) => (j === i ? e.target.value : a)))}
                      className={inputBase}
                    >
                      <option value="">Age</option>
                      {Array.from({ length: LIMITS.childAge.max - 1 }, (_, n) => n + 2).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  ))}
                </div>
              </div>
            )}

            <div className="sm:w-1/2">
              <Label htmlFor="enq-rooms">Rooms needed</Label>
              <input
                id="enq-rooms"
                type="number"
                inputMode="numeric"
                min={LIMITS.rooms.min}
                max={LIMITS.rooms.max}
                placeholder="Not sure? Leave blank"
                value={form.rooms}
                onChange={(e) => update("rooms", e.target.value)}
                className={inputBase}
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 mb-4">
            <div>
              <Label>Which services do you need?</Label>
              <Chips label="Services" options={SERVICES} selected={form.servicesRequested} onToggle={(v) => toggle("servicesRequested", v)} />
            </div>
            {(form.servicesRequested.includes("flights") || form.servicesRequested.includes("visa")) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.servicesRequested.includes("flights") && (
                  <div>
                    <Label htmlFor="enq-cabin">Flight class</Label>
                    <Select id="enq-cabin" value={form.cabinClass} onChange={(v) => update("cabinClass", v)} options={CABIN_CLASSES} />
                  </div>
                )}
                {form.servicesRequested.includes("visa") && (
                  <div>
                    <Label htmlFor="enq-passport">Passport nationality</Label>
                    <input
                      id="enq-passport"
                      type="text"
                      maxLength={100}
                      placeholder="e.g. South African"
                      value={form.passportNationality}
                      onChange={(e) => update("passportNationality", e.target.value)}
                      className={inputBase}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="enq-occasion">Occasion</Label>
                <Select id="enq-occasion" value={form.occasion} onChange={(v) => update("occasion", v)} options={OCCASIONS} placeholder="Select…" />
              </div>
              <div>
                <Label htmlFor="enq-hotel">Hotel standard</Label>
                <Select id="enq-hotel" value={form.hotelStandard} onChange={(v) => update("hotelStandard", v)} options={HOTEL_STANDARDS} placeholder="Select…" />
              </div>
              <div>
                <Label htmlFor="enq-budget">Budget per person</Label>
                <Select id="enq-budget" value={form.budget} onChange={(v) => update("budget", v)} options={BUDGETS} placeholder="Select…" />
              </div>
            </div>
            <div>
              <Label>Dietary or religious needs</Label>
              <Chips label="Dietary needs" options={DIETARY} selected={form.dietary} onToggle={(v) => toggle("dietary", v)} />
              <input
                type="text"
                aria-label="Other dietary notes"
                maxLength={500}
                placeholder="Anything else? e.g. nut allergy"
                value={form.dietaryNotes}
                onChange={(e) => update("dietaryNotes", e.target.value)}
                className={`${inputBase} mt-2`}
              />
            </div>
            <div>
              <Label htmlFor="enq-access">Accessibility or mobility needs</Label>
              <input
                id="enq-access"
                type="text"
                maxLength={500}
                placeholder="e.g. wheelchair access, ground-floor room"
                value={form.accessibilityNeeds}
                onChange={(e) => update("accessibilityNeeds", e.target.value)}
                className={inputBase}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="enq-name" required>Your name</Label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input id="enq-name" type="text" autoComplete="name" maxLength={100} placeholder="e.g. Sarah Jenkins" value={form.name} onChange={(e) => update("name", e.target.value)} className={withIcon} />
                </div>
              </div>
              <div>
                <Label htmlFor="enq-email" required>Email address</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input id="enq-email" type="email" autoComplete="email" maxLength={200} placeholder="e.g. sarah@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={withIcon} />
                </div>
              </div>
              <div>
                <Label htmlFor="enq-phone">Phone / WhatsApp</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input id="enq-phone" type="tel" autoComplete="tel" maxLength={40} placeholder="e.g. +27 82 123 4567" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={withIcon} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="enq-contact">Contact me via</Label>
                  <Select id="enq-contact" value={form.contactMethod} onChange={(v) => update("contactMethod", v)} options={CONTACT_METHODS} placeholder="Any" />
                </div>
                <div>
                  <Label htmlFor="enq-time">Best time</Label>
                  <Select id="enq-time" value={form.contactTime} onChange={(v) => update("contactTime", v)} options={CONTACT_TIMES} placeholder="Any" />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="enq-message">Anything else we should know?</Label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <textarea id="enq-message" rows={3} maxLength={5000} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${withIcon} resize-none`} />
              </div>
            </div>
            <p className="text-[11px] text-gray-500" style={font}>
              We only use these details to prepare your quote. Passport and payment details are never requested on this form.
            </p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
        {error && (
          <p className="text-xs text-red-500 text-center" role="alert">
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={back}
            className="px-4 py-3 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm cursor-pointer hover:bg-gray-100"
            style={font}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0B3D5B] hover:bg-[#D8B15A] text-white hover:text-[#0B3D5B] font-semibold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={font}
          >
            {step < STEPS.length - 1 ? (
              `Next: ${STEPS[step + 1]}`
            ) : (
              <>
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
