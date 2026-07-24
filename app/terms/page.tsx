"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

/* -------------------------------------------------------------------------
   Shared typography helpers — matches the site's existing Poppins / Inter
   pairing and navy / gold / muted-gray palette used across the homepage.
------------------------------------------------------------------------- */

function Clause({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    
    <p
      className="text-sm sm:text-[15px] leading-relaxed text-[#4B5563] mb-4"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {n && <span className="font-semibold text-[#0B3D5B] mr-2">{n}</span>}
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm sm:text-[15px] leading-relaxed text-[#4B5563]" style={{ fontFamily: "Inter, sans-serif" }}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D8B15A]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-gray-100 py-9 sm:py-11">
      <div className="flex items-baseline gap-3 mb-5">
        <span
          className="text-xs font-semibold tracking-widest text-[#D8B15A]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {num}
        </span>
        <h2
          className="text-lg sm:text-xl font-bold text-[#111827] leading-snug"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
    
  );
}

/* -------------------------------------------------------------------------
   Table of contents data — anchors match each <Section id="...">
------------------------------------------------------------------------- */

const toc = [
  { id: "application", num: "1", title: "Application and Acceptance" },
  { id: "role", num: "2", title: "JB Travel's Role" },
  { id: "quotations", num: "3", title: "Quotations and Availability" },
  { id: "prices", num: "4", title: "Prices and Currency Fluctuations" },
  { id: "deposits", num: "5", title: "Deposits and Payments" },
  { id: "fees", num: "6", title: "Service and Administration Fees" },
  { id: "traveller-info", num: "7", title: "Traveller Information and Names" },
  { id: "passports", num: "8", title: "Passports, Visas and Entry Requirements" },
  { id: "health", num: "9", title: "Health and Medical Requirements" },
  { id: "advisories", num: "10", title: "Travel Advisories and Safety" },
  { id: "client-changes", num: "11", title: "Changes Requested by the Client" },
  { id: "cancellation", num: "12", title: "Cancellation by the Client" },
  { id: "airline-refunds", num: "13", title: "Airline Ticket Refunds" },
  { id: "land-refunds", num: "14", title: "Accommodation, Tours and Land-Service Refunds" },
  { id: "refund-procedure", num: "15", title: "Refund Procedure" },
  { id: "credits", num: "16", title: "Travel Credits and Vouchers" },
  { id: "supplier-changes", num: "17", title: "Supplier Cancellations and Significant Changes" },
  { id: "force-majeure", num: "18", title: "Force Majeure" },
  { id: "insurance", num: "19", title: "Travel Insurance" },
  { id: "conduct", num: "20", title: "Client Conduct" },
  { id: "liability", num: "21", title: "Risk, Responsibility and Limitation of Liability" },
  { id: "indemnity", num: "22", title: "Client Indemnity" },
  { id: "complaints", num: "23", title: "Complaints and Assistance While Travelling" },
  { id: "chargebacks", num: "24", title: "Chargebacks and Payment Disputes" },
  { id: "popia", num: "25", title: "Personal Information and POPIA" },
  { id: "electronic", num: "26", title: "Electronic Communications" },
  { id: "groups", num: "27", title: "Group Bookings" },
  { id: "minors", num: "28", title: "Minors" },
  { id: "ip", num: "29", title: "Intellectual Property" },
  { id: "governing-law", num: "30", title: "Governing Law and Dispute Resolution" },
  { id: "general", num: "31", title: "General Provisions" },
  { id: "acceptance", num: "", title: "Client Acceptance" },
];

export default function TermsPage() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <main className="bg-white">
                <Navbar />
      
      {/* ---------------------------------------------------------------
          Header banner — matches the navy/gold header treatment used
          across the site's other sections
      --------------------------------------------------------------- */}
      <div className="relative overflow-hidden bg-[#0B3D5B] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#27C7D9]/10 blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#D8B15A]/10 blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D8B15A]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              JB Travel
            </span>
          </div>
          <h1
            className="text-[clamp(2rem,5vw,3.25rem)] font-bold text-white leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Standard Terms &amp; Conditions
          </h1>
          <p
            className="mt-4 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            These Terms and Conditions apply to every quotation, itinerary, reservation, booking,
            invoice and travel service arranged or supplied by JB Travel. Please read them
            carefully before confirming a booking.
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------------------
          Body — sidebar TOC (desktop) + scrollable content
      --------------------------------------------------------------- */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Mobile TOC toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setTocOpen((v) => !v)}
              className="w-full flex items-center justify-between rounded-2xl border border-gray-200 bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#0B3D5B]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Jump to a section
              <span className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}>&#9662;</span>
            </button>
            {tocOpen && (
              <nav className="mt-2 max-h-80 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-3 shadow-md">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setTocOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0B3D5B]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {item.num && <span className="font-semibold text-[#D8B15A] mr-1.5">{item.num}.</span>}
                    {item.title}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Desktop sticky TOC */}
          <nav className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <p
                className="text-xs font-semibold uppercase tracking-widest text-[#D8B15A] mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                On this page
              </p>
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-lg px-2.5 py-1.5 text-xs leading-relaxed text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0B3D5B] transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.num && <span className="font-semibold text-[#D8B15A] mr-1.5">{item.num}.</span>}
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* ------------------------------------------------------------
              Main content
          ------------------------------------------------------------ */}
          <div>
            {/* Intro / definitions */}
            <div className="mb-10 rounded-2xl border border-gray-100 bg-[#F8FAFC] p-6 sm:p-7">
              <Clause>
                In these Terms and Conditions, &ldquo;JB Travel&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer
                to JB TRAVELZ KZN trading as JB TRAVEL.
              </Clause>
              <Clause>
                &ldquo;Client&rdquo;, &ldquo;customer&rdquo;, &ldquo;traveller&rdquo;, &ldquo;passenger&rdquo;, &ldquo;you&rdquo; and
                &ldquo;your&rdquo; refer to the person making the booking and every person for whom the
                booking is made.
              </Clause>
              <Clause>
                &ldquo;Supplier&rdquo; includes any airline, hotel, lodge, cruise line, tour operator,
                destination management company, transport provider, car-rental company, rail
                operator, attraction, guide, visa service provider, insurance provider or other
                independent travel-service provider.
              </Clause>
            </div>

            {/* 1. APPLICATION AND ACCEPTANCE */}
            <Section id="application" num="1" title="Application and Acceptance">
              <Clause n="1.1">These Terms and Conditions apply to every quotation, itinerary, reservation, booking, invoice and travel service arranged or supplied by JB Travel.</Clause>
              <Clause n="1.2">These Terms apply to bookings made in person, by telephone, email, WhatsApp, social media, website, electronic booking system or any other communication method.</Clause>
              <Clause n="1.3">You accept these Terms when you sign or electronically accept them; instruct us to proceed with a booking; pay a deposit, service fee or any portion of the booking price; accept a quotation or itinerary in writing; or use any travel service arranged by JB Travel.</Clause>
              <Clause n="1.4">The person making a booking on behalf of other travellers confirms that he or she has authority to act for every traveller, has provided every traveller with these Terms, has obtained their acceptance of these Terms, and accepts responsibility for communicating all booking information to them.</Clause>
              <Clause n="1.5">If there is a conflict between these Terms and a specific written quotation, booking confirmation or disclosed Supplier condition, the more specific condition will apply to that component of the booking, subject always to applicable South African law.</Clause>
              <Clause n="1.6">Nothing in these Terms is intended to exclude or restrict any right that cannot lawfully be excluded under the Consumer Protection Act 68 of 2008 or other applicable legislation.</Clause>
            </Section>

            {/* 2. JB TRAVEL'S ROLE */}
            <Section id="role" num="2" title="JB Travel's Role">
              <Clause n="2.1">Except where we expressly state in writing that JB Travel is supplying a service as principal, JB Travel acts as a travel agent and intermediary between the Client and independent Suppliers.</Clause>
              <Clause n="2.2">JB Travel arranges and facilitates travel services, including flights, accommodation, transfers, tours, cruises, rail travel, car rental and other travel-related services.</Clause>
              <Clause n="2.3">The actual travel services are generally provided by independent Suppliers whose own terms, fare rules, tariffs, conditions of carriage and cancellation policies apply.</Clause>
              <Clause n="2.4">By instructing us to make a booking, you authorise JB Travel to enter into the relevant Supplier contracts on your behalf and to accept reasonable Supplier conditions relating to the services requested.</Clause>
              <Clause n="2.5">Copies or summaries of material Supplier conditions will be supplied on request where they are available to JB Travel.</Clause>
              <Clause n="2.6">JB Travel remains responsible for performing its own travel-agency services with the degree of care and skill reasonably expected of a travel agency. Nothing in these Terms excludes liability for JB Travel's own fraud, gross negligence, wilful misconduct or any other liability that may not lawfully be excluded.</Clause>
            </Section>

            {/* 3. QUOTATIONS AND AVAILABILITY */}
            <Section id="quotations" num="3" title="Quotations and Availability">
              <Clause n="3.1">All quotations are subject to availability at the time the booking is confirmed and payment is received.</Clause>
              <Clause n="3.2">A quotation does not constitute a confirmed reservation unless JB Travel has received the required payment and has issued written confirmation.</Clause>
              <Clause n="3.3">Airfares, hotel rates, exchange rates, taxes, fuel surcharges, park fees, entrance fees and other Supplier charges may change without notice before confirmation and payment.</Clause>
              <Clause n="3.4">A quotation is valid only for the period stated in it. Where no validity period is stated, it remains subject to availability and price reconfirmation.</Clause>
              <Clause n="3.5">Prices are based on the number of travellers, rooming arrangements, travel dates, routing, services and exchange rates stated in the quotation. A change to any of these may result in a revised price.</Clause>
              <Clause n="3.6">Quotations may exclude visas and passport costs; travel insurance; vaccinations and medical expenses; meals not specifically listed; optional excursions; resort fees, city taxes or tourism levies payable locally; baggage fees; seat-reservation fees; gratuities; personal expenses; and services not expressly described as included.</Clause>
              <Clause n="3.7">JB Travel may correct a genuine clerical, calculation, system or typographical error. We will notify you promptly and provide the option to accept the corrected price or cancel the affected unconfirmed service without penalty.</Clause>
            </Section>

            {/* 4. PRICES AND CURRENCY FLUCTUATIONS */}
            <Section id="prices" num="4" title="Prices and Currency Fluctuations">
              <Clause n="4.1">Prices will be quoted in South African Rand unless otherwise stated.</Clause>
              <Clause n="4.2">International travel services may be priced in foreign currency and converted to Rand using the exchange rate available to JB Travel when payment is processed.</Clause>
              <Clause n="4.3">Until the booking has been paid and confirmed, the Client bears the risk of any increase caused by exchange-rate movements, airline or Supplier price changes, fuel surcharges, changes in taxes, levies or government charges, or changes to the requested itinerary.</Clause>
              <Clause n="4.4">After confirmation, an additional amount will be charged only where permitted by the applicable Supplier contract or law. JB Travel will provide a reasonable explanation or breakdown of the increase.</Clause>
              <Clause n="4.5">Any refund received in foreign currency will be converted at the exchange rate applied by the bank or payment provider when the refund is processed. Exchange-rate differences may result in the Rand refund being different from the original Rand payment.</Clause>
            </Section>

            {/* 5. DEPOSITS AND PAYMENTS */}
            <Section id="deposits" num="5" title="Deposits and Payments">
              <Clause n="5.1">The required deposit, payment schedule and final payment date will be stated in the quotation, invoice or booking confirmation.</Clause>
              <Clause n="5.2">Deposits secure the booking only after cleared funds have been received, availability has been reconfirmed, and JB Travel or the relevant Supplier has issued confirmation.</Clause>
              <Clause n="5.3">Certain services require immediate full payment and may be non-refundable from the time of booking. These may include promotional airfares, low-cost airline tickets, special hotel rates, cruise fares, event tickets and peak-season services.</Clause>
              <Clause n="5.4">The Client must pay the full balance by the stated due date. Failure to do so may result in cancellation of the booking and the application of reasonable Supplier and cancellation charges.</Clause>
              <Clause n="5.5">JB Travel is not required to issue tickets, vouchers or final documents until full cleared payment has been received.</Clause>
              <Clause n="5.6">The Client is responsible for ensuring that payment is made into JB Travel's verified bank account. Any change in banking details should be confirmed directly with JB Travel using a known telephone number before payment.</Clause>
              <Clause n="5.7">JB Travel will not be responsible for payments made into a fraudulent or incorrect account where the Client failed to verify suspicious or changed banking instructions, except to the extent that the loss resulted from JB Travel's negligence or unlawful conduct.</Clause>
              <Clause n="5.8">The Client warrants that he or she is authorised to use the payment card or bank account from which payment is made.</Clause>
            </Section>

            {/* 6. SERVICE AND ADMINISTRATION FEES */}
            <Section id="fees" num="6" title="Service and Administration Fees">
              <Clause n="6.1">JB Travel may charge disclosed service, consultation, booking, ticketing, amendment, cancellation, after-hours or administration fees.</Clause>
              <Clause n="6.2">These fees relate to work performed by JB Travel and are separate from Supplier charges.</Clause>
              <Clause n="6.3">A service or booking fee is generally non-refundable once the relevant work has been substantially performed, unless JB Travel failed to provide the agreed agency service, the charge is prohibited by law, or JB Travel agrees otherwise in writing.</Clause>
              <Clause n="6.4">All applicable fees will be disclosed in the quotation, invoice, booking confirmation or at the time the additional service is requested.</Clause>
            </Section>

            {/* 7. TRAVELLER INFORMATION AND NAMES */}
            <Section id="traveller-info" num="7" title="Traveller Information and Names">
              <Clause n="7.1">The Client must provide accurate, complete and up-to-date information for every traveller.</Clause>
              <Clause n="7.2">Names must be provided exactly as they appear in the traveller's passport or other required identity document.</Clause>
              <Clause n="7.3">The Client must carefully check all quotations, confirmations, tickets, vouchers and itineraries immediately upon receipt and report any error without delay.</Clause>
              <Clause n="7.4">JB Travel will not be responsible for costs caused by incorrect information supplied or approved by the Client.</Clause>
              <Clause n="7.5">A correction or name change may be treated by an airline or Supplier as a cancellation and new booking. The Client will be responsible for the resulting fare difference and reasonable Supplier and administration fees.</Clause>
              <Clause n="7.6">The Client must advise JB Travel of children or infants travelling; mobility or accessibility requirements; medical or dietary requirements relevant to the booking; pregnancy where relevant to Supplier restrictions; special-assistance requirements; and any other circumstance that could materially affect the booking.</Clause>
              <Clause n="7.7">Special requests are not guaranteed unless confirmed in writing by the relevant Supplier.</Clause>
            </Section>

            {/* 8. PASSPORTS, VISAS AND ENTRY REQUIREMENTS */}
            <Section id="passports" num="8" title="Passports, Visas and Entry Requirements">
              <Clause n="8.1">Each traveller is responsible for ensuring that he or she has the correct passport, visa, transit visa, residence permit, parental consent or minor-travel documents, health certificate, vaccination documentation, travel authorisation and other entry, transit or exit documents.</Clause>
              <Clause n="8.2">Passports must comply with the validity, blank-page and condition requirements of every destination and transit country.</Clause>
              <Clause n="8.3">Visa information supplied by JB Travel is general assistance based on information available at the time. Immigration rules may change without notice.</Clause>
              <Clause n="8.4">The issuing of a visa or permission to enter a country is determined solely by the relevant government, embassy, consulate or immigration authority. JB Travel does not guarantee that a visa will be issued or that entry will be permitted.</Clause>
              <Clause n="8.5">The refusal, delay or cancellation of a visa does not automatically entitle the Client to a refund from an airline or other Supplier. Normal cancellation terms will apply, subject to applicable law.</Clause>
              <Clause n="8.6">The Client is responsible for checking immigration requirements applicable to the traveller's nationality, residence status, travel history and itinerary.</Clause>
              <Clause n="8.7">JB Travel is not responsible for denied boarding, deportation, detention, fines or additional costs caused by inadequate or invalid travel documents, except where directly caused by incorrect written advice negligently supplied by JB Travel.</Clause>
            </Section>

            {/* 9. HEALTH AND MEDICAL REQUIREMENTS */}
            <Section id="health" num="9" title="Health and Medical Requirements">
              <Clause n="9.1">Travellers are responsible for determining whether they are medically fit to travel.</Clause>
              <Clause n="9.2">Travellers should obtain appropriate professional medical advice regarding vaccinations, medication, pregnancy, mobility, pre-existing conditions and destination-specific health risks.</Clause>
              <Clause n="9.3">The Client must disclose any condition or requirement that may affect the Supplier's ability to provide the booked service, where such disclosure is reasonably necessary.</Clause>
              <Clause n="9.4">Airlines, cruise lines, tour operators and other Suppliers may require medical clearance or impose their own health and fitness conditions.</Clause>
              <Clause n="9.5">A Supplier may refuse participation where a traveller's condition creates a material safety risk or where required medical documentation has not been supplied.</Clause>
            </Section>

            {/* 10. TRAVEL ADVISORIES AND SAFETY */}
            <Section id="advisories" num="10" title="Travel Advisories and Safety">
              <Clause n="10.1">The Client is responsible for reviewing official travel advisories, local laws, security conditions, weather conditions and health notices applicable to the destination.</Clause>
              <Clause n="10.2">Travel may involve risks arising from crime, political unrest, natural events, disease, transport disruption, remote locations and adventurous activities.</Clause>
              <Clause n="10.3">JB Travel will communicate material safety information known to it that directly affects the booking but does not guarantee that any destination or activity is risk-free.</Clause>
              <Clause n="10.4">The Client must comply with all lawful instructions, safety rules and local laws while travelling.</Clause>
            </Section>

            {/* 11. CHANGES REQUESTED BY THE CLIENT */}
            <Section id="client-changes" num="11" title="Changes Requested by the Client">
              <Clause n="11.1">Any request to amend a confirmed booking must be submitted to JB Travel in writing.</Clause>
              <Clause n="11.2">Changes are subject to availability and the relevant Supplier's rules.</Clause>
              <Clause n="11.3">The Client will be responsible for any increase in fare or price, Supplier amendment or reissue fees, JB Travel's disclosed administration fee, exchange-rate differences, and any loss caused by cancelling and replacing an existing service.</Clause>
              <Clause n="11.4">Reducing the number of travellers may result in the remaining travellers paying a higher per-person price.</Clause>
              <Clause n="11.5">A change of traveller, destination, routing or travel date may be treated as a cancellation and new booking.</Clause>
            </Section>

            {/* 12. CANCELLATION BY THE CLIENT */}
            <Section id="cancellation" num="12" title="Cancellation by the Client">
              <h3 className="text-sm font-bold text-[#0B3D5B] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>12.1 How to cancel</h3>
              <Clause>A cancellation must be submitted to JB Travel in writing by email or another recorded communication method.</Clause>
              <Clause>A cancellation takes effect when it is received and acknowledged by JB Travel during normal business hours. A notice received after business hours may be treated as received on the next business day.</Clause>

              <h3 className="text-sm font-bold text-[#0B3D5B] mb-2 mt-6" style={{ fontFamily: "Poppins, sans-serif" }}>12.2 Reasonable cancellation charges</h3>
              <Clause>The Client has the right to cancel an advance booking, subject to reasonable cancellation charges and any applicable Supplier terms.</Clause>
              <Clause>The total cancellation charge may include:</Clause>
              <Bullets
                items={[
                  "non-refundable amounts already paid or committed to Suppliers;",
                  "airline, hotel, tour operator, cruise or other Supplier penalties;",
                  "reasonable losses resulting from the cancellation;",
                  "fare differences relating to partially used services;",
                  "non-recoverable transaction or foreign-exchange costs;",
                  "work already performed by JB Travel; and",
                  "a reasonable disclosed cancellation or administration fee.",
                ]}
              />
              <Clause>Cancellation charges will not exceed a fair amount in the circumstances, taking account of:</Clause>
              <Bullets
                items={[
                  "the nature of the booked service;",
                  "how much notice was provided;",
                  "the possibility of reselling or rebooking the service;",
                  "actual costs and losses incurred;",
                  "savings resulting from the cancellation; and",
                  "the normal practices of the relevant travel sector.",
                ]}
              />

              <h3 className="text-sm font-bold text-[#0B3D5B] mb-2 mt-6" style={{ fontFamily: "Poppins, sans-serif" }}>12.3 Supplier-specific rules</h3>
              <Clause>Supplier-specific fare rules and cancellation conditions disclosed before confirmation will apply to the relevant booking component.</Clause>
              <Clause>A service described as &ldquo;non-refundable&rdquo;, &ldquo;non-changeable&rdquo;, &ldquo;instant purchase&rdquo; or similar may carry a cancellation charge of up to 100%, where lawful and fairly disclosed.</Clause>

              <h3 className="text-sm font-bold text-[#0B3D5B] mb-2 mt-6" style={{ fontFamily: "Poppins, sans-serif" }}>12.4 Default graduated cancellation guide</h3>
              <Clause>Where no specific Supplier cancellation policy was disclosed, the following may be used as an operational guide, subject to the requirement that the final charge remain fair and reasonably related to the loss suffered:</Clause>

              <div className="my-5 overflow-hidden rounded-2xl border border-gray-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B3D5B]">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#D8B15A]" style={{ fontFamily: "Inter, sans-serif" }}>
                        Written notice before the first travel service
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#D8B15A]" style={{ fontFamily: "Inter, sans-serif" }}>
                        Indicative maximum cancellation charge
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["60 calendar days or more", "Up to 25%"],
                      ["30-59 calendar days", "Up to 50%"],
                      ["15-29 calendar days", "Up to 75%"],
                      ["0-14 calendar days", "Up to 100%"],
                      ["No-show or cancellation after travel begins", "Up to 100%"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                        <td className="px-4 py-3 text-sm text-[#4B5563] border-t border-gray-100" style={{ fontFamily: "Inter, sans-serif" }}>{row[0]}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#0B3D5B] border-t border-gray-100" style={{ fontFamily: "Inter, sans-serif" }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Clause>This scale is not an automatic penalty. JB Travel will take account of any amount recovered, saved, resold or refunded by a Supplier.</Clause>

              <h3 className="text-sm font-bold text-[#0B3D5B] mb-2 mt-6" style={{ fontFamily: "Poppins, sans-serif" }}>12.5 Death or hospitalisation</h3>
              <Clause>Where applicable law prohibits a cancellation fee because the booking cannot be honoured due to the death or hospitalisation of the person for whom, or for whose benefit, the booking was made, JB Travel will not impose its own cancellation fee.</Clause>
              <Clause>Reasonable documentary evidence, such as a death certificate or hospital confirmation, may be required.</Clause>
              <Clause>Any Supplier deductions or refund limitations will be addressed in accordance with the applicable law and Supplier contract, and JB Travel will reasonably assist the Client in applying for available waivers or refunds.</Clause>

              <h3 className="text-sm font-bold text-[#0B3D5B] mb-2 mt-6" style={{ fontFamily: "Poppins, sans-serif" }}>12.6 No-shows and unused services</h3>
              <Clause>Failure to arrive, check in, board or participate at the required time is regarded as a no-show.</Clause>
              <Clause>No refund is ordinarily available for no-shows; late arrivals; missed flights or transfers; unused accommodation nights; voluntarily unused tours, meals or services; removal from a service due to misconduct; or early return from a trip, unless the relevant Supplier approves a refund or applicable law requires one.</Clause>
            </Section>

            {/* 13. AIRLINE TICKET REFUNDS */}
            <Section id="airline-refunds" num="13" title="Airline Ticket Refunds">
              <Clause n="13.1">Airline tickets are governed by the airline's fare rules and conditions of carriage.</Clause>
              <Clause n="13.2">Some tickets are fully refundable, some are partially refundable and others are completely non-refundable.</Clause>
              <Clause n="13.3">Where a ticket is refundable, deductions may include airline cancellation fees, no-show fees, booking-system charges, Supplier fees, JB Travel's disclosed administration fee and non-recoverable payment or currency-conversion costs.</Clause>
              <Clause n="13.4">For a non-refundable ticket, certain unused government or airport taxes may be refundable where permitted by the airline and applicable law.</Clause>
              <Clause n="13.5">Fuel surcharges, carrier-imposed charges and booking fees may be non-refundable, depending on the fare rules.</Clause>
              <Clause n="13.6">Once any flight sector has been used, the value of the remaining ticket may be recalculated. A partially used ticket may have little or no refundable value.</Clause>
              <Clause n="13.7">Missing one flight may result in the airline automatically cancelling the remaining flights on the same ticket.</Clause>
              <Clause n="13.8">Refund applications are subject to airline approval and processing times. JB Travel does not control the airline's processing period.</Clause>
            </Section>

            {/* 14. ACCOMMODATION, TOURS AND LAND-SERVICE REFUNDS */}
            <Section id="land-refunds" num="14" title="Accommodation, Tours and Land-Service Refunds">
              <Clause n="14.1">Accommodation, tour, transfer, cruise, rail, car-rental and other land arrangements are subject to the applicable Supplier's cancellation policy.</Clause>
              <Clause n="14.2">Special rates, promotional rates, peak-season bookings, villas, apartments, groups, events, cruises and private tours may require non-refundable deposits or full prepayment.</Clause>
              <Clause n="14.3">A Supplier may charge for shortening a stay, early departure, unused services or failure to arrive.</Clause>
              <Clause n="14.4">Security deposits, local taxes, resort fees, cleaning charges, parking and incidental charges may be payable directly to the Supplier.</Clause>
              <Clause n="14.5">The Client is responsible for complying with the Supplier's check-in, identification, credit-card and security-deposit requirements.</Clause>
            </Section>

            {/* 15. REFUND PROCEDURE */}
            <Section id="refund-procedure" num="15" title="Refund Procedure">
              <Clause n="15.1">All refund requests must be submitted to JB Travel in writing with the relevant booking reference and supporting documents.</Clause>
              <Clause n="15.2">Refunds are subject to the applicable Supplier's approval, receipt of the refund from the Supplier, final reconciliation of the booking, the original payment method, and applicable banking and payment-provider requirements.</Clause>
              <Clause n="15.3">JB Travel will keep the Client reasonably informed regarding the progress of a refund application.</Clause>
              <Clause n="15.4">Unless applicable law requires otherwise, JB Travel is not ordinarily required to advance a Supplier refund from its own funds before the Supplier has returned the money to JB Travel.</Clause>
              <Clause n="15.5">After cleared refund funds are received from the Supplier and the account has been reconciled, JB Travel will ordinarily initiate payment to the Client within seven business days.</Clause>
              <Clause n="15.6">Additional time may be required for the Client's bank, card issuer or payment provider to reflect the refund.</Clause>
              <Clause n="15.7">Refunds will ordinarily be paid to the original payer, through the original payment method, and in the currency received by JB Travel, unless another method is required by law or agreed in writing.</Clause>
              <Clause n="15.8">No interest will accrue on money awaiting a Supplier refund, except where required by law.</Clause>
              <Clause n="15.9">JB Travel will provide a reasonable breakdown of material deductions upon request.</Clause>
            </Section>

            {/* 16. TRAVEL CREDITS AND VOUCHERS */}
            <Section id="credits" num="16" title="Travel Credits and Vouchers">
              <Clause n="16.1">Where a Supplier offers a travel credit, voucher or date change instead of a cash refund, the Supplier's terms will apply.</Clause>
              <Clause n="16.2">The Client must check the expiry date, permitted travellers, route or destination restrictions, blackout dates, fare differences, whether the credit is transferable, and whether any unused balance is forfeited.</Clause>
              <Clause n="16.3">Acceptance of a credit or voucher may constitute full settlement of the affected Supplier service.</Clause>
              <Clause n="16.4">JB Travel will not be responsible if a credit expires because the Client failed to use it within the permitted period after being informed of the expiry date.</Clause>
            </Section>

            {/* 17. SUPPLIER CANCELLATIONS AND SIGNIFICANT CHANGES */}
            <Section id="supplier-changes" num="17" title="Supplier Cancellations and Significant Changes">
              <Clause n="17.1">Airlines and other Suppliers may change schedules, aircraft, routes, hotels, room types, ports, vehicles, tour sequences or other arrangements.</Clause>
              <Clause n="17.2">JB Travel will notify the Client of a material change when JB Travel receives notice from the Supplier.</Clause>
              <Clause n="17.3">Where a Supplier cancels or significantly changes a service, the available remedies may include an alternative service, a change of date, a travel credit, a partial refund or a full refund of the affected service.</Clause>
              <Clause n="17.4">The remedy will depend on applicable law, the Supplier contract and the circumstances of the cancellation.</Clause>
              <Clause n="17.5">JB Travel will reasonably assist the Client in obtaining the remedy offered or legally due from the Supplier.</Clause>
              <Clause n="17.6">JB Travel is not responsible for a Supplier's independent failure to process a refund, except to the extent that JB Travel failed to exercise reasonable care in performing its own obligations.</Clause>
              <Clause n="17.7">A change affecting one service does not automatically create a right to cancel unrelated services without charge.</Clause>
            </Section>

            {/* 18. FORCE MAJEURE */}
            <Section id="force-majeure" num="18" title="Force Majeure and Events Beyond Reasonable Control">
              <Clause n="18.1">&ldquo;Force majeure&rdquo; includes events beyond the reasonable control of JB Travel or a Supplier, including severe weather or natural disasters; war, terrorism, civil unrest or political instability; epidemics, pandemics or public-health emergencies; border closures or government restrictions; strikes or industrial action; airport or airspace closures; transport, utility or communications failures; Supplier insolvency; fire, flood or other major emergencies; and changes in law or government action.</Clause>
              <Clause n="18.2">Where travel is affected by force majeure, JB Travel will assist with available rebooking, credits, insurance claims or refund applications.</Clause>
              <Clause n="18.3">The Client remains responsible for additional expenses not recovered from a Supplier or insurer, including accommodation, meals, transport, testing and replacement travel.</Clause>
              <Clause n="18.4">Nothing in this clause removes any refund or other right that the Client has under applicable law.</Clause>
            </Section>

            {/* 19. TRAVEL INSURANCE */}
            <Section id="insurance" num="19" title="Travel Insurance">
              <Clause n="19.1">Comprehensive travel insurance is strongly recommended from the date the first payment is made.</Clause>
              <Clause n="19.2">Cover should be considered for trip cancellation and curtailment; medical expenses and evacuation; pre-existing medical conditions; baggage and personal belongings; missed connections and travel delays; Supplier insolvency where available; passport loss; personal liability; and activities planned during the trip.</Clause>
              <Clause n="19.3">The Client is responsible for reading the policy wording, exclusions, excesses and claims procedure.</Clause>
              <Clause n="19.4">Where JB Travel refers the Client to an insurance provider, the insurance contract remains between the Client and the insurer.</Clause>
              <Clause n="19.5">JB Travel does not provide financial advice unless expressly authorised and legally permitted to do so.</Clause>
              <Clause n="19.6">A rejected or limited insurance claim does not make JB Travel responsible for the loss unless the loss resulted from JB Travel's own unlawful or negligent conduct.</Clause>
            </Section>

            {/* 20. CLIENT CONDUCT */}
            <Section id="conduct" num="20" title="Client Conduct">
              <Clause n="20.1">Travellers must behave responsibly and comply with reasonable Supplier instructions.</Clause>
              <Clause n="20.2">A Supplier may remove or refuse to carry a traveller whose behaviour threatens safety, causes serious disruption, is abusive, unlawful or discriminatory, damages property, or materially interferes with other travellers.</Clause>
              <Clause n="20.3">No refund will ordinarily be due where a service is refused or terminated because of the traveller's misconduct.</Clause>
              <Clause n="20.4">The Client is responsible for damage, fines or losses caused by the Client or a traveller in the Client's party.</Clause>
            </Section>

            {/* 21. IMPORTANT NOTICE — RISK, RESPONSIBILITY, LIMITATION OF LIABILITY */}
            <Section id="liability" num="21" title="Important Notice: Risk, Responsibility and Limitation of Liability">
              <div className="mb-5 rounded-2xl border border-[#D8B15A]/30 bg-[#D8B15A]/10 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#0B3D5B] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  Important Notice
                </p>
                <p className="text-sm leading-relaxed text-[#4B5563]" style={{ fontFamily: "Inter, sans-serif" }}>
                  This clause may limit JB Travel&rsquo;s liability, require the Client to assume certain risks or require the Client to accept responsibility for certain costs. Please read it carefully.
                </p>
              </div>
              <Clause n="21.1">Travel inherently involves risks, including delays, cancellations, accidents, illness, crime, weather disruption, lost baggage and changes by independent Suppliers.</Clause>
              <Clause n="21.2">Except where JB Travel acts as the principal Supplier, JB Travel does not operate, manage or control the airlines, hotels, transport companies, tour operators or other independent Suppliers.</Clause>
              <Clause n="21.3">JB Travel will not be liable for an independent Supplier's act, omission, insolvency, delay, cancellation, overbooking, service failure or negligence unless JB Travel failed to exercise reasonable care in selecting or arranging the Supplier, JB Travel made a material misrepresentation, JB Travel was independently negligent, or liability is imposed on JB Travel by law.</Clause>
              <Clause n="21.4">JB Travel is not liable for loss caused by incorrect information supplied by the Client; invalid or missing travel documents; failure to comply with check-in or boarding deadlines; conduct of the Client or another traveller; refusal of a visa or entry permission; failure to follow lawful safety instructions; an event beyond JB Travel's reasonable control; or a service independently changed or cancelled by a Supplier, except to the extent that JB Travel's own negligence or unlawful conduct contributed to the loss.</Clause>
              <Clause n="21.5">JB Travel will not be responsible for indirect or consequential loss, loss of enjoyment, loss of business, loss of profit or emotional distress except where such liability cannot lawfully be excluded.</Clause>
              <Clause n="21.6">The Client must take reasonable steps to minimise any loss, including promptly contacting JB Travel, the Supplier and the insurer.</Clause>
              <Clause n="21.7">Nothing in these Terms excludes or limits liability for fraud; gross negligence or wilful misconduct; death or personal injury where exclusion is prohibited; breach of a statutory duty that cannot be excluded; or any other liability that may not lawfully be limited.</Clause>
            </Section>

            {/* 22. CLIENT INDEMNITY */}
            <Section id="indemnity" num="22" title="Client Indemnity">
              <Clause n="22.1">To the extent permitted by law, the Client indemnifies JB Travel against third-party claims, fines, losses and reasonable costs resulting directly from false or inaccurate information supplied by the Client; the Client's breach of these Terms; unlawful conduct by the Client or a traveller; damage caused by the Client or a traveller; or the Client's unauthorised use of another person's payment method.</Clause>
              <Clause n="22.2">This indemnity does not apply to loss caused by JB Travel's fraud, negligence, gross negligence, wilful misconduct or breach of law.</Clause>
            </Section>

            {/* 23. COMPLAINTS AND ASSISTANCE WHILE TRAVELLING */}
            <Section id="complaints" num="23" title="Complaints and Assistance While Travelling">
              <Clause n="23.1">A traveller who experiences a problem must, where reasonably possible, report it immediately to the relevant Supplier, allow the Supplier a reasonable opportunity to correct it, contact JB Travel for assistance, and retain photographs, receipts, reports and other supporting evidence.</Clause>
              <Clause n="23.2">Failure to report a problem during the trip may reduce the possibility of resolving it or establishing what occurred.</Clause>
              <Clause n="23.3">A formal complaint should be submitted to JB Travel in writing as soon as reasonably possible, preferably within 30 days after completion of the trip.</Clause>
              <Clause n="23.4">The complaint should include the booking reference, traveller details, a clear description of the complaint, the remedy requested, relevant correspondence and supporting documents.</Clause>
              <Clause n="23.5">JB Travel will acknowledge and investigate the complaint and aims to provide a substantive response within 15 business days, where reasonably possible.</Clause>
              <Clause n="23.6">The 30-day period does not remove any statutory right or legally prescribed complaint period.</Clause>
              <Clause n="23.7">If the complaint is not resolved, the Client may approach an appropriate consumer body, including the National Consumer Commission, the Consumer Goods and Services Ombud where it has jurisdiction, or the KwaZulu-Natal Office of the Consumer Protector.</Clause>
            </Section>

            {/* 24. CHARGEBACKS AND PAYMENT DISPUTES */}
            <Section id="chargebacks" num="24" title="Chargebacks and Payment Disputes">
              <Clause n="24.1">The Client should first contact JB Travel regarding any disputed payment so that the matter can be investigated.</Clause>
              <Clause n="24.2">Nothing in these Terms prevents the Client from exercising a lawful chargeback or other payment-dispute right.</Clause>
              <Clause n="24.3">A chargeback should not be used to avoid a valid, fairly disclosed cancellation charge or payment obligation.</Clause>
              <Clause n="24.4">Where a chargeback is found to be fraudulent, unauthorised or without lawful basis, JB Travel may recover the outstanding amount and reasonable recovery costs, subject to applicable law.</Clause>
            </Section>

            {/* 25. PERSONAL INFORMATION AND POPIA */}
            <Section id="popia" num="25" title="Personal Information and POPIA">
              <Clause n="25.1">JB Travel processes personal information for legitimate travel and business purposes, including preparing quotations; making and managing bookings; issuing tickets and travel documents; processing payments and refunds; providing travel assistance; complying with legal obligations; preventing fraud; handling complaints; and communicating relevant service information.</Clause>
              <Clause n="25.2">Information processed may include names and contact details; identity and passport information; dates of birth and nationality; payment information; travel preferences; visa information; dietary or accessibility requirements; and health information voluntarily provided where necessary for travel arrangements.</Clause>
              <Clause n="25.3">The Client authorises JB Travel to provide necessary information to relevant Suppliers and service providers, including airlines, hotels, tour operators, visa providers, insurers, payment processors and government authorities.</Clause>
              <Clause n="25.4">Travel arrangements may require information to be transferred to countries outside South Africa. JB Travel will take reasonable steps to ensure that information is transferred and processed in accordance with applicable data-protection requirements.</Clause>
              <Clause n="25.5">JB Travel will take reasonable technical and organisational measures to protect personal information against unauthorised access, loss, misuse or disclosure.</Clause>
              <Clause n="25.6">Personal information will be retained only for as long as reasonably necessary for the purpose for which it was collected, contractual requirements and applicable legal or accounting obligations.</Clause>
              <Clause n="25.7">A person may request access to or correction of personal information held by JB Travel by contacting JB Travel at the email address stated in this document.</Clause>
              <Clause n="25.8">Marketing communications will include a reasonable method to opt out. Service communications relating to an existing booking are not marketing communications.</Clause>
              <Clause n="25.9">JB Travel's separate Privacy Policy, where published, forms part of these Terms.</Clause>
            </Section>

            {/* 26. ELECTRONIC COMMUNICATIONS */}
            <Section id="electronic" num="26" title="Electronic Communications">
              <Clause n="26.1">The Client agrees that JB Travel may communicate through email, telephone, SMS, WhatsApp or other electronic channels supplied by the Client.</Clause>
              <Clause n="26.2">Electronic communications, confirmations and acceptances are valid and binding to the extent permitted by law.</Clause>
              <Clause n="26.3">The Client is responsible for monitoring the contact details supplied and notifying JB Travel of any change.</Clause>
              <Clause n="26.4">JB Travel is not responsible for a Client's failure to receive a communication because of an incorrect address, full mailbox, spam filter, blocked number or failure to check messages.</Clause>
              <Clause n="26.5">Any statutory cooling-off or direct-marketing cancellation right will apply despite these Terms. The Client should not assume that a general cooling-off right applies to confirmed, fixed-date transport, accommodation or leisure bookings.</Clause>
            </Section>

            {/* 27. GROUP BOOKINGS */}
            <Section id="groups" num="27" title="Group Bookings">
              <Clause n="27.1">The person identified as the group organiser or group leader is authorised to communicate instructions on behalf of the group unless JB Travel is informed otherwise in writing.</Clause>
              <Clause n="27.2">The organiser is responsible for providing payment deadlines, these Terms and all travel information to group members.</Clause>
              <Clause n="27.3">Group prices are based on the stated minimum number of travellers. If the group size decreases, the price may be recalculated.</Clause>
              <Clause n="27.4">Group deposits may be committed to Suppliers and may become non-refundable earlier than individual bookings.</Clause>
              <Clause n="27.5">A cancellation by one group member does not automatically cancel or reduce the obligations of the remaining members.</Clause>
              <Clause n="27.6">Rooming lists, passport details and final traveller information must be provided by the stated deadline.</Clause>
            </Section>

            {/* 28. MINORS */}
            <Section id="minors" num="28" title="Minors">
              <Clause n="28.1">A parent or legal guardian must authorise a booking for a person under 18 years of age.</Clause>
              <Clause n="28.2">The Client is responsible for obtaining all required birth certificates, consent affidavits, court orders and parental or guardian documentation.</Clause>
              <Clause n="28.3">Suppliers may impose minimum-age requirements or require minors to be accompanied by an adult.</Clause>
              <Clause n="28.4">JB Travel is not responsible for a minor being refused travel because required documents or supervision arrangements were not in place.</Clause>
            </Section>

            {/* 29. INTELLECTUAL PROPERTY */}
            <Section id="ip" num="29" title="Intellectual Property">
              <Clause n="29.1">JB Travel's branding, logos, original itineraries, website content, marketing material and documents remain protected by applicable intellectual-property laws.</Clause>
              <Clause n="29.2">The Client may use booking documents for personal travel purposes but may not reproduce or commercially distribute JB Travel's material without written permission.</Clause>
              <Clause n="29.3">Supplier photographs, trademarks and descriptions remain the property of their respective owners.</Clause>
            </Section>

            {/* 30. GOVERNING LAW AND DISPUTE RESOLUTION */}
            <Section id="governing-law" num="30" title="Governing Law and Dispute Resolution">
              <Clause n="30.1">These Terms and every booking arranged by JB Travel are governed by the laws of the Republic of South Africa.</Clause>
              <Clause n="30.2">The parties will first attempt to resolve a dispute through good-faith written negotiation.</Clause>
              <Clause n="30.3">Where appropriate, the parties may agree to mediation before commencing court proceedings.</Clause>
              <Clause n="30.4">Subject to the Client's statutory rights to approach a consumer body, tribunal or other competent forum, the courts of South Africa will have jurisdiction.</Clause>
              <Clause n="30.5">The parties consent to the jurisdiction of a Magistrates' Court having jurisdiction, even where the amount claimed may exceed that court's ordinary monetary jurisdiction, without preventing either party from approaching a competent High Court.</Clause>
            </Section>

            {/* 31. GENERAL PROVISIONS */}
            <Section id="general" num="31" title="General Provisions">
              <Clause n="31.1">These Terms, together with the quotation, invoice, booking confirmation, itinerary and applicable Supplier terms, constitute the agreement relating to the booking.</Clause>
              <Clause n="31.2">No verbal amendment or promise will be binding unless confirmed in writing by an authorised representative of JB Travel.</Clause>
              <Clause n="31.3">If any provision is found to be invalid or unenforceable, the remaining provisions will continue to apply.</Clause>
              <Clause n="31.4">A failure or delay by JB Travel to enforce a right is not a waiver of that right.</Clause>
              <Clause n="31.5">Headings are included for convenience and do not affect interpretation.</Clause>
              <Clause n="31.6">Words in the singular include the plural and vice versa where the context permits.</Clause>
              <Clause n="31.7">JB Travel may update these Terms for future bookings. The version accepted when a booking is confirmed will continue to apply to that booking unless a change is required by law or agreed with the Client.</Clause>
            </Section>

            {/* CLIENT ACCEPTANCE */}
            <section id="acceptance" className="scroll-mt-28 pt-10">
              <div className="rounded-3xl border border-[#0B3D5B]/10 bg-[#F8FAFC] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-px bg-[#D8B15A]" />
                  <span className="text-xs tracking-[0.3em] uppercase text-[#D8B15A] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                    Please Read Before Signing
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Client Acceptance
                </h2>

                <p className="text-sm leading-relaxed text-[#4B5563] mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                  By signing or accepting electronically, the Client confirms that the Terms and Conditions have been read, understood and accepted on behalf of all travellers included in the booking.
                </p>

                <p className="text-sm font-semibold text-[#0B3D5B] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                  I confirm that:
                </p>
                <ul className="mb-8 space-y-2.5">
                  {[
                    "I have read and understood these Terms and Conditions;",
                    "I have been given an opportunity to ask questions;",
                    "I understand the cancellation and refund conditions;",
                    "I understand that JB Travel generally acts as an intermediary for independent Suppliers;",
                    "I have authority to accept these Terms for every traveller included in the booking; and",
                    'I specifically acknowledge the clauses headed "Important Notice: Risk, Responsibility and Limitation of Liability."',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#4B5563]" style={{ fontFamily: "Inter, sans-serif" }}>
                      <CheckCircle2 className="mt-0.5 w-4 h-4 text-[#D8B15A] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {[
                    "Booking reference",
                    "Lead traveller / group organiser",
                    "Identity / passport number",
                    "Signature",
                    "Date",
                    "Accepted electronically by",
                    "Date and time of electronic acceptance",
                  ].map((label) => (
                    <div key={label}>
                      <div className="h-9 border-b border-gray-300" />
                      <p className="mt-1.5 text-xs text-[#6B7280]" style={{ fontFamily: "Inter, sans-serif" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-center text-xs text-[#9CA3AF]" style={{ fontFamily: "Inter, sans-serif" }}>
                JB TRAVELZ KZN t/a JB TRAVEL — Travel Agency Terms and Conditions | South Africa
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}