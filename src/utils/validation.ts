import { MetadataJsonAttribute } from "@metaplex/js";

export const validateNftAttributes = (
  attributes: Array<MetadataJsonAttribute> | undefined
) => {
  const finalAttributes: Array<MetadataJsonAttribute> = [];
  const errors: Array<String> = [];

  if (attributes && attributes.length > 0) {
    for (let attribute of attributes) {
      if (attribute.trait_type === "" && attribute.value !== "") {
        errors.push(`O atributo de valor '${attribute.value}' está sem nome`);
      }
      if (attribute.trait_type !== "" && attribute.value === "") {
        errors.push(
          `O atributo de nome '${attribute.trait_type}' está sem valor`
        );
      }

      if (attribute.trait_type !== "" && attribute.value !== "") {
        finalAttributes.push({
          trait_type: attribute.trait_type,
          value: attribute.value,
        });
      }
    }
  }

  return { finalAttributes, errors };
};
