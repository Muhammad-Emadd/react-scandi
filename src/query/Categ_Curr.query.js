import { client, CombinedField, Query } from "@tilework/opus";
import { BACKEND_QUERIES_URL } from "../util/constants";

export const getCategoriesAndCurrencies = () => {
  const categoriesQuery = new Query("categories", true).addField("name");
  const currenciesQuery = new Query("currencies", true).addField("label");
  client.setEndpoint(BACKEND_QUERIES_URL);

  return client.post(
    new CombinedField().add(categoriesQuery, true).add(currenciesQuery, true)
  );
};
