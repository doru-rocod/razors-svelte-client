import url from "./URL";

export default async () => {
  const response = await fetch(`${url}/api/products?populate=%2A`).catch(
    (error) => console.error("eroare din ftch products", error)
  );
  const products = await response.json();
  if (products.error) {
    console.log("eroare din ftch products", products.error);
    return null;
  }
  return products;
};
