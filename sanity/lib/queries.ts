import { groq } from "next-sanity";

export const packagesQuery = groq`
*[_type == "travelPackage" && active == true] | order(featured desc){

  _id,

  title,

  slug,

  destination,

  duration,

  shortDescription,

  badge,

  featured,

  packageType,

  price,

  currency,

  featuredImage

}
`;