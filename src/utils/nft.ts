import { MetadataJson } from "@metaplex/js";

export const defaultNftMetadata: MetadataJson = {
  name: "",
  symbol: "",
  description: "",
  seller_fee_basis_points: 0,
  image: "",
  external_url: "",
  attributes: [
    {
      trait_type: "",
      value: "",
    },
  ],
  collection: {
    family: "",
    name: "",
  },
  properties: {
    files: [],
    category: "image",
    creators: [],
  },
};
