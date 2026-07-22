import { type SchemaTypeDefinition } from 'sanity'
import packageSchema from "./packages";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [packageSchema],
}

// import { packageType } from "./package";

// export const schemaTypes = [packageType];