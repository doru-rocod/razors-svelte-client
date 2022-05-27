import axios from "axios";
import url from "./URL";

// we submit the order to strapi
async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
  // let data = { name, total, items, stripeTokenId };
  console.log("obiectul data este", { name, total, items, stripeTokenId });
  const response = await axios
    .post(
      `${url}/api/orders`,
      { name, total, items, stripeTokenId },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .catch((error) => console.log(error));
  return response;
}

export default submitOrder;
