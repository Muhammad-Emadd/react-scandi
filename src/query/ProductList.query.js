import { Query, Field, client } from "@tilework/opus";
import { BACKEND_QUERIES_URL } from "../util/constants";

export const getProductListAPI = (category) => {
  const productsQuery = new Query("category")
    .addArgument("input", "CategoryInput", { title: category })
    .addField("name")
    .addField(
      new Field("products")
        .addFieldList(["id", "name", "inStock", "gallery", "brand"])
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
        )
    );
  client.setEndpoint(BACKEND_QUERIES_URL);
  return client.post(productsQuery);
};
