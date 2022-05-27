import { writable, derived } from "svelte/store";
import url from "../strapi/URL";
import getProducts from "../strapi/getProducts";

const store = writable([], () => {
  setProducts();
  return () => {};
});

async function setProducts() {
  let productsObj = await getProducts();
  const { data } = productsObj;
  let products = data;
  if (products) {
    console.log("produse", products);
    products = flattenProducts(products);
    console.log("produse aplatizate", products);
    store.set(products);
  }
}
// subscribe
// set
// update
function flattenProducts(data) {
  return data.map((item) => {
    let image = item.attributes.image.data.attributes.url;
    // let image = item.image.url;
    // let image = `${url}${item.attributes.image.data.attributes.url}`;
    console.log("image", image);
    return { ...item, image };
  });
}

export const featuredStore = derived(store, ($featured) => {
  return $featured.filter((item) => item.attributes.featured === true);
});
export default store;
