import { type SchemaTypeDefinition } from 'sanity'
import packageSchema from "./packages";
import bookingSchema from "./booking";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [packageSchema, bookingSchema],
}
