import { client, Field, Query } from "@tilework/opus";
import { BACKEND_QUERIES_URL } from "../util/constants";

export const getChosenProduct = (product_id) => {
  const productQuery = new Query("product", false)
    .addArgument("id", "String!", product_id)
    .addFieldList(["id", "name", "inStock", "gallery", "description", "brand"])
    .addField(
      new Field("prices")
        .addFieldList(["amount"])
        .addField(new Field("currency").addFieldList(["label"]))
    )
    .addField(
      new Field("attributes")
        .addFieldList(["id", "name", "type"])
        .addField(
          new Field("items").addFieldList(["id", "value", "displayValue"])
        )
    );
  client.setEndpoint(BACKEND_QUERIES_URL);
  return client.post(productQuery);
};
