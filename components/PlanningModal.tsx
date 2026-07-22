"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type PlanningModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormData = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional leading +, digits, spaces, dashes, parentheses — 7 to 15 digits total
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};

    if (!data.name.trim()) {
        errors.name = "Please enter your name.";
    } else if (data.name.trim().length < 2) {
        errors.name = "Name looks too short.";
    }

    if (!data.email.trim()) {
        errors.email = "Please enter your email.";
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    if (!data.phone.trim()) {
        errors.phone = "Please enter your cell number.";
    } else if (!PHONE_REGEX.test(data.phone.trim())) {
        errors.phone = "Enter a valid phone number.";
    } else {
        const digitCount = data.phone.replace(/\D/g, "").length;
        if (digitCount < 7 || digitCount > 15) {
            errors.phone = "Phone number should be 7–15 digits.";
        }
    }

    if (data.message.trim().length > 1000) {
        errors.message = "Message is too long (max 1000 characters).";
    }

    return errors;
}

export default function PlanningModal({ isOpen, onClose }: PlanningModalProps) {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear the field's error as soon as the person starts fixing it
        if (fieldErrors[name as keyof FormData]) {
            setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleClose = () => {
        if (status === "submitting") return;
        onClose();
        setTimeout(() => {
            setStatus("idle");
            setErrorMsg("");
            setFieldErrors({});
            setFormData({ name: "", email: "", phone: "", message: "" });
        }, 300);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const errors = validate(formData);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setStatus("submitting");
        setErrorMsg("");
        setFieldErrors({});

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    message: formData.message.trim(),
                    // No specific package for a general "Start Planning" enquiry
                    packageName: null,
                    country: null,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || "Something went wrong. Please try again.");
            }

            setStatus("success");
        } catch (err) {
            setStatus("error");
            setErrorMsg(
                err instanceof Error ? err.message : "Something went wrong. Please try again."
            );
        }
    };

    const inputClass = (hasError: boolean) =>
        `w-full px-4 py-2.5 rounded-xl border text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 transition-colors duration-200 ${hasError
            ? "border-red-300 focus:ring-red-100 focus:border-red-400"
            : "border-gray-200 focus:ring-[#0B3D5B]/20 focus:border-[#0B3D5B]"
        }`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-[#0B3D5B]/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="planning-modal-heading"
                        className="relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label="Close dialog"
                            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#0B3D5B] hover:bg-[#F8FAFC] transition-colors duration-200 z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6 sm:p-8 md:p-10">
                            {status === "success" ? (
                                <div className="text-center py-6">
                                    <div className="w-14 h-14 rounded-full bg-[#0B3D5B]/8 flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="w-7 h-7 text-[#0B3D5B]" strokeWidth={1.5} />
                                    </div>
                                    <h2
                                        className="text-xl sm:text-2xl font-bold text-[#111827] mb-2"
                                        style={{ fontFamily: "Poppins, sans-serif" }}
                                    >
                                        Message sent
                                    </h2>
                                    <p
                                        className="text-sm text-[#6B7280] leading-relaxed mb-6 max-w-xs mx-auto"
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                        Thanks for reaching out. Our team will be in touch shortly to start planning your journey.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="px-6 py-2.5 rounded-full bg-[#0B3D5B] hover:bg-[#0a3350] text-white text-sm font-semibold transition-colors duration-300"
                                        style={{ fontFamily: "Inter, sans-serif" }}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Header */}
                                    <div className="mb-6 sm:mb-8 pr-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-6 h-px bg-[#D8B15A]" />
                                            <span
                                                className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#D8B15A] font-medium"
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                            >
                                                Start Planning
                                            </span>
                                        </div>
                                        <h2
                                            id="planning-modal-heading"
                                            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111827] leading-tight"
                                            style={{ fontFamily: "Poppins, sans-serif" }}
                                        >
                                            Let&apos;s plan your{" "}
                                            <span className="text-[#0B3D5B]">next journey</span>
                                        </h2>
                                        <p
                                            className="mt-2 text-sm text-[#6B7280] leading-relaxed"
                                            style={{ fontFamily: "Inter, sans-serif" }}
                                        >
                                            Share a few details and one of our travel consultants will reach out to get started.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-xs font-semibold text-[#111827] mb-1.5"
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                            >
                                                Full name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Jane Doe"
                                                aria-invalid={!!fieldErrors.name}
                                                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                                                className={inputClass(!!fieldErrors.name)}
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                            />
                                            {fieldErrors.name && (
                                                <p id="name-error" className="mt-1 text-xs text-red-500">
                                                    {fieldErrors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-xs font-semibold text-[#111827] mb-1.5"
                                                    style={{ fontFamily: "Inter, sans-serif" }}
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="jane@email.com"
                                                    aria-invalid={!!fieldErrors.email}
                                                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                                                    className={inputClass(!!fieldErrors.email)}
                                                    style={{ fontFamily: "Inter, sans-serif" }}
                                                />
                                                {fieldErrors.email && (
                                                    <p id="email-error" className="mt-1 text-xs text-red-500">
                                                        {fieldErrors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="block text-xs font-semibold text-[#111827] mb-1.5"
                                                    style={{ fontFamily: "Inter, sans-serif" }}
                                                >
                                                    Cell number
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+27 82 000 0000"
                                                    aria-invalid={!!fieldErrors.phone}
                                                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                                                    className={inputClass(!!fieldErrors.phone)}
                                                    style={{ fontFamily: "Inter, sans-serif" }}
                                                />
                                                {fieldErrors.phone && (
                                                    <p id="phone-error" className="mt-1 text-xs text-red-500">
                                                        {fieldErrors.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-xs font-semibold text-[#111827] mb-1.5"
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                            >
                                                Tell us about your trip
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Where are you dreaming of going? Any dates, group size, or special occasions we should know about?"
                                                aria-invalid={!!fieldErrors.message}
                                                aria-describedby={fieldErrors.message ? "message-error" : undefined}
                                                className={`${inputClass(!!fieldErrors.message)} resize-none`}
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                            />
                                            <div className="flex items-center justify-between mt-1">
                                                {fieldErrors.message ? (
                                                    <p id="message-error" className="text-xs text-red-500">
                                                        {fieldErrors.message}
                                                    </p>
                                                ) : (
                                                    <span />
                                                )}
                                                <span className="text-[11px] text-[#9CA3AF]">
                                                    {formData.message.length}/1000
                                                </span>
                                            </div>
                                        </div>

                                        {status === "error" && (
                                            <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-100">
                                                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                                <p
                                                    className="text-xs text-red-600 leading-relaxed"
                                                    style={{ fontFamily: "Inter, sans-serif" }}
                                                >
                                                    {errorMsg}
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0B3D5B] hover:bg-[#0a3350] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors duration-300 mt-2"
                                            style={{ fontFamily: "Inter, sans-serif" }}
                                        >
                                            {status === "submitting" ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send message
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>

                                        <p
                                            className="text-[11px] text-[#9CA3AF] text-center leading-relaxed pt-1"
                                            style={{ fontFamily: "Inter, sans-serif" }}
                                        >
                                            By submitting, you agree to be contacted by JB Travel regarding your enquiry.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}