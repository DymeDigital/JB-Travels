"use client";

import { motion } from "framer-motion";

type FloatingWhatsAppProps = {
    phoneNumber: string; // international format, digits only, e.g. "27786687659"
    message?: string;
};

export default function FloatingWhatsApp({
    phoneNumber,
    message = "Hi JB Travel, I'd like to find out more about planning a trip.",
}: FloatingWhatsAppProps) {
    const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with JB Travel on WhatsApp"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:shadow-2xl transition-shadow duration-300"
        >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-15 animate-ping" />

            <svg
                viewBox="0 0 24 24"
                className="relative w-7 h-7 text-white"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 4.99L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.83 14.13c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.26-5.05-4.46-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.8-.37s.4 0 .58.01c.19.01.44-.07.68.52.25.6.86 2.07.93 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.3-.13.6.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.75-.17 1.45z" />
            </svg>
        </motion.a>
    );
}