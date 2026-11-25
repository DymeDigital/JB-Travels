import "server-only";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { packagesQuery } from "@/sanity/lib/queries";
import type { Destination } from "@/components/sections/Destinations";

type SanityPackage = {
  _id: string;
  title: string;
  destination?: string;
  duration?: string;
  shortDescription?: string;
  overview?: string;
  includes?: string[];
  badge?: string;
  packageType?: "fixed" | "quote";
  price?: number;
  featuredImage?: { asset?: { _ref?: string } };
  bookingButtonText?: string;
};

const FALLBACK_IMAGE = "/images/hero-island01.jpg";

// Pages using this re-fetch at most once a minute, so Studio edits go live within ~60s.
export const PACKAGES_REVALIDATE_SECONDS = 60;

/**
 * Active packages from Sanity, shaped for the Destinations carousel.
 * Returns [] if Sanity is unreachable so the page still renders.
 */
export async function getPackages(): Promise<Destination[]> {
  try {
    const docs = await client.fetch<SanityPackage[]>(
      packagesQuery,
      {},
      { next: { revalidate: PACKAGES_REVALIDATE_SECONDS } }
    );

    return docs.map((pkg) => {
      const fixed = pkg.packageType !== "quote" && typeof pkg.price === "number" && pkg.price > 0;
      return {
        id: pkg._id,
        packageId: pkg._id,
        name: pkg.title,
        country: pkg.destination ?? "",
        description: pkg.shortDescription ?? "",
        longDescription: pkg.overview || pkg.shortDescription || "",
        highlights: pkg.includes ?? [],
        image: pkg.featuredImage?.asset?._ref
          ? urlFor(pkg.featuredImage).width(1600).auto("format").url()
          : FALLBACK_IMAGE,
        duration: pkg.duration,
        badge: pkg.badge,
        pricePerPerson: fixed ? pkg.price : undefined,
        buttonText: pkg.bookingButtonText,
      };
    });
  } catch (err) {
    console.error("Failed to load packages from Sanity:", err);
    return [];
  }
}
