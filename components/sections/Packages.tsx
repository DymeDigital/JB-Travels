// "use client";
// import { client } from "@/sanity/lib/client";
// import { packagesQuery } from "@/sanity/lib/queries";
// import Image from "next/image";
// // import { useRef } from "react";
// // import { motion, useInView, Variants } from "framer-motion";
// import { urlFor } from "@/sanity/lib/image";
// import { Clock, MapPin, ArrowRight, Star } from "lucide-react";

// type TravelPackage = {
//   _id: string;
//   title: string;
//   slug: {
//     current: string;
//   };
//   destination: string;
//   badge?: string;
//   packageType: "fixed" | "quote";
//   price?: number;
//   duration?: string;
//   includes?: string[];
//   featuredImage: any;
// };


// // const packages = [
// //   {
// //     id: "maldives-escape",
// //     title: "Maldives Ultimate Escape",
// //     subtitle: "Overwater Serenity",
// //     image: "/images/dest-maldives.jpg",
// //     price: 8_900,
// //     duration: "10 Days / 9 Nights",
// //     destinations: ["Malé", "Private Atoll", "Baa Lagoon"],
// //     rating: 4.9,
// //     reviews: 142,
// //     included: ["Private Float Plane Transfer", "Overwater Villa", "All Inclusive Dining", "Spa Credits"],
// //     badge: "Best Seller",
// //     badgeColor: "bg-[#D8B15A] text-[#0B3D5B]",
// //   },
// //   {
// //     id: "santorini-romance",
// //     title: "Santorini Romance",
// //     subtitle: "Aegean Luxury",
// //     image: "/images/dest-santorini.jpg",
// //     price: 6_500,
// //     duration: "7 Days / 6 Nights",
// //     destinations: ["Oia", "Fira", "Akrotiri"],
// //     rating: 4.8,
// //     reviews: 98,
// //     included: ["Cave Suite Accommodation", "Sunset Boat Tour", "Wine Tasting", "Private Transfers"],
// //     badge: "Editor's Choice",
// //     badgeColor: "bg-[#27C7D9]/20 text-[#27C7D9] border border-[#27C7D9]/30",
// //   },
// //   {
// //     id: "swiss-adventure",
// //     title: "Swiss Alpine Luxury",
// //     subtitle: "Mountain Grandeur",
// //     image: "/images/dest-swiss.jpg",
// //     price: 7_200,
// //     duration: "8 Days / 7 Nights",
// //     destinations: ["Zurich", "Zermatt", "Interlaken"],
// //     rating: 4.9,
// //     reviews: 76,
// //     included: ["Swiss Travel Pass", "5-Star Chalet", "Helicopter Tour", "Fondue Experience"],
// //     badge: "Trending",
// //     badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
// //   },
// // ];

// // const containerVariants = {
// //   hidden: {},
// //   visible: { transition: { staggerChildren: 0.15 } },
// // };

// // const cardVariants: Variants = {
// //   hidden: { opacity: 0, y: 50 },
// //   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
// // };

// export default async function Packages() {
//   const packages: TravelPackage[] = await client.fetch(packagesQuery);
//   // const sectionRef = useRef<HTMLElement>(null);
//   // const isInView = useInView(sectionRef, { once: true, margin: "-100px" });


//   return (
//     <section
//       id="packages"
//       // ref={sectionRef}
//       className="py-24 md:py-32 bg-white relative overflow-hidden"
//       aria-labelledby="packages-heading"
//     >
//       {/* Background shapes */}
//       <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#0B3D5B]/3 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

//       <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
//         {/* Header */}
//         <div
//         // initial={{ opacity: 0, y: 30 }}
//         // animate={isInView ? { opacity: 1, y: 0 } : {}}
//         // transition={{ duration: 0.7 }}
//         // className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
//         >
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-8 h-px bg-[#D8B15A]" />
//               <span
//                 className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
//                 style={{ fontFamily: "Inter, sans-serif" }}
//               >
//                 Curated Journeys
//               </span>
//             </div>
//             <h2
//               id="packages-heading"
//               className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#111827] leading-tight"
//               style={{ fontFamily: "Poppins, sans-serif" }}
//             >
//               Featured{" "}
//               <span className="text-[#0B3D5B]">Packages</span>
//             </h2>
//           </div>
//           <p
//             className="text-[#6B7280] max-w-sm text-sm leading-relaxed"
//             style={{ fontFamily: "Inter, sans-serif" }}
//           >
//             All-inclusive luxury packages designed to exceed every expectation, from arrival to departure.
//           </p>
//           {/* </motion.div> */}
//         </div>

//         {/* Package Cards */}
//         <div
//           // variants={containerVariants}
//           // initial="hidden"
//           // animate={isInView ? "visible" : "hidden"}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
//         >
//           {packages.map((pkg) => (
//             <article
//               key={pkg._id}
//               // variants={cardVariants}
//               data-cursor="card"
//               className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 hover:-translate-y-3"
//               style={{ willChange: "transform, box-shadow" }}
//             >
//               {/* Image */}
//               <div className="relative h-56 overflow-hidden">
//                 <Image
//                   src={urlFor(pkg.featuredImage).url()}
//                   alt={pkg.title ?? ""}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-700"
//                   sizes="(max-width: 1024px) 100vw, 33vw"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                 {/* Badge */}
//                 <div className="absolute top-4 left-4">
//                   <span
//                     // className={`text-xs font-semibold px-3 py-1 rounded-full ${pkg.badgeColor}`}
//                     className="text-xs font-semibold px-3 py-1 rounded-full bg-[#D8B15A]/20 text-[#D8B15A]"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     {pkg.badge}
//                   </span>
//                 </div>

//                 {/* Rating */}
//                 {/* <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
//                   <div className="flex">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         className="w-3 h-3"
//                         fill={i < Math.floor(pkg.rating) ? "#D8B15A" : "transparent"}
//                         stroke="#D8B15A"
//                       />
//                     ))}
//                   </div>
//                   <span className="text-xs text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
//                     {pkg.rating} ({pkg.reviews})
//                   </span>
//                 </div> */}
//               </div>

//               {/* Content */}
//               <div className="p-6">
//                 <div className="mb-4">
//                   <p
//                     className="text-xs text-[#27C7D9] font-medium uppercase tracking-wider mb-1"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     {pkg.destination}
//                   </p>
//                   <h3
//                     className="text-xl font-bold text-[#111827] leading-snug"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     {pkg.title}
//                   </h3>
//                 </div>

//                 {/* Meta */}
//                 <div className="flex items-center gap-4 mb-4 text-xs text-[#6B7280]" style={{ fontFamily: "Inter, sans-serif" }}>
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     {pkg.duration}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <MapPin className="w-3 h-3" />
//                     {pkg.destination}
//                   </span>
//                 </div>

//                 {/* Destinations */}
//                 <div className="flex flex-wrap gap-1.5 mb-4">
//                   {/* {pkg.destinations.map((dest) => (
//                     <span
//                       key={dest}
//                       className="text-xs px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-gray-200 text-[#6B7280]"
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     >
//                       {dest}
//                     </span>
//                   ))} */}
//                   <span
//                     className="text-xs px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-gray-200 text-[#6B7280]"
//                   >
//                     {pkg.destination}
//                   </span>

//                 </div>

//                 {/* Included */}
//                 <ul className="mb-5 space-y-1.5">
//                   {/* {pkg.included.slice(0, 3).map((item) => (
//                     <li
//                       key={item}
//                       className="flex items-center gap-2 text-xs text-[#6B7280]"
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#D8B15A] shrink-0" />
//                       {item}
//                     </li>
//                   ))} */}
//                   {pkg.includes?.slice(0, 3).map((item: string) => (
//                     <li
//                       key={item}
//                       className="flex items-center gap-2 text-xs text-[#6B7280]"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#D8B15A]" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Divider */}
//                 <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
//                   <div>
//                     <span
//                       className="text-xs text-[#6B7280]"
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     >
//                       From
//                     </span>
//                     <div
//                       className="text-2xl font-bold text-[#0B3D5B]"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     >
//                       {/* ${pkg.price.toLocaleString()} */}
//                       {pkg.packageType === "fixed"
//                         ? `R${pkg.price?.toLocaleString()}`
//                         : "Request Quote"}
//                       <span className="text-sm font-normal text-[#6B7280] ml-1">pp</span>
//                     </div>
//                   </div>

//                   <button
//                     className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3D5B] hover:bg-[#0a3350] text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     {pkg.packageType === "fixed"
//                       ? "Book Now"
//                       : "Request Quote"}
//                     <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
//                   </button>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Clock, MapPin, ArrowRight, Star } from "lucide-react";

const packages = [
  {
    id: "maldives-escape",
    title: "Maldives Ultimate Escape",
    subtitle: "Overwater Serenity",
    image: "/images/Bali.jpeg",
    price: 8_900,
    duration: "10 Days / 9 Nig4hts",
    destinations: ["Malé", "Private Atoll", "Baa Lagoon"],
    rating: 4.9,
    reviews: 142,
    included: ["Private Float Plane Transfer", "Overwater Villa", "All Inclusive Dining", "Spa Credits"],
    badge: "Best Seller",
    badgeColor: "bg-[#D8B15A] text-[#0B3D5B]",
  },
  {
    id: "santorini-romance",
    title: "Santorini Romance",
    subtitle: "Aegean Luxury",
    image: "/images/India.jpeg",
    price: 6_500,
    duration: "7 Days / 6 Nights",
    destinations: ["Oia", "Fira", "Akrotiri"],
    rating: 4.8,
    reviews: 98,
    included: ["Cave Suite Accommodation", "Sunset Boat Tour", "Wine Tasting", "Private Transfers"],
    badge: "Editor's Choice",
    badgeColor: "bg-[#27C7D9]/20 text-[#27C7D9] border border-[#27C7D9]/30",
  },
  {
    id: "swiss-adventure",
    title: "Swiss Alpine Luxury",
    subtitle: "Mountain Grandeur",
    image: "/images/Turkey.jpeg",
    price: 7_200,
    duration: "8 Days / 7 Nights",
    destinations: ["Zurich", "Zermatt", "Interlaken"],
    rating: 4.9,
    reviews: 76,
    included: ["Swiss Travel Pass", "5-Star Chalet", "Helicopter Tour", "Fondue Experience"],
    badge: "Trending",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });


  return (
    <section
      id="packages"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      aria-labelledby="packages-heading"
    >
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#0B3D5B]/3 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#D8B15A]" />
              <span
                className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Curated Journeys
              </span>
            </div>
            <h2
              id="packages-heading"
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[#111827] leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Featured{" "}
              <span className="text-[#0B3D5B]">Packages</span>
            </h2>
          </div>
          <p
            className="text-[#6B7280] max-w-sm text-sm leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            All-inclusive luxury packages designed to exceed every expectation, from arrival to departure.
          </p>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {packages.map((pkg) => (
            <motion.article
              key={pkg.id}
              variants={cardVariants}
              data-cursor="card"
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 hover:-translate-y-3"
              style={{ willChange: "transform, box-shadow" }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${pkg.badgeColor}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {pkg.badge}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3"
                        fill={i < Math.floor(pkg.rating) ? "#D8B15A" : "transparent"}
                        stroke="#D8B15A"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/90" style={{ fontFamily: "Inter, sans-serif" }}>
                    {pkg.rating} ({pkg.reviews})
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <p
                    className="text-xs text-[#27C7D9] font-medium uppercase tracking-wider mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {pkg.subtitle}
                  </p>
                  <h3
                    className="text-xl font-bold text-[#111827] leading-snug"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {pkg.title}
                  </h3>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-4 text-xs text-[#6B7280]" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {pkg.destinations.length} Locations
                  </span>
                </div>

                {/* Destinations */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.destinations.map((dest) => (
                    <span
                      key={dest}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-gray-200 text-[#6B7280]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {dest}
                    </span>
                  ))}
                </div>

                {/* Included */}
                <ul className="mb-5 space-y-1.5">
                  {pkg.included.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[#6B7280]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8B15A] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                  <div>
                    <span
                      className="text-xs text-[#6B7280]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      From
                    </span>
                    <div
                      className="text-2xl font-bold text-[#0B3D5B]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      ${pkg.price.toLocaleString()}
                      <span className="text-sm font-normal text-[#6B7280] ml-1">pp</span>
                    </div>
                  </div>

                  <button
                    className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B3D5B] hover:bg-[#0a3350] text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Book Now
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
