import { groq } from "next-sanity";

export const packagesQuery = groq`
*[_type == "travelPackage" && active == true] | order(featured desc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  destination,
  duration,
  shortDescription,
  "overview": pt::text(overview),
  includes,
  badge,
  featured,
  packageType,
  price,
  featuredImage,
  bookingButtonText
}
`;