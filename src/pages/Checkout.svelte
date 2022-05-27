<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import cart, { cartTotal } from "../stores/cart";
  import submitOrder from "../strapi/submitOrder";
  import globalStore from "../stores/globalStore";

  let name = "";

  // stripe vars
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  $: isEmpty = !name || $globalStore.alert;
  // if the user in not loggen in redirect to the main page
  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
      return;
    }

    // if we have products in cart we can initialize a stripe card
    if ($cartTotal > 0) {
      stripe = Stripe(
        "pk_test_51L0M3oDU3F2mhyuS8kbjhMv1hWuvhXjxST8hmEp9KzzYRfeMcXkqTGjO1tXW3ut6zd5hXky9obfztnyANf9c0mmj00RZjtZ7UJ"
      );
      elements = stripe.elements();
      card = elements.create("card");
      card.mount(cardElement);
      card.addEventListener("change", function (event) {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = "";
        }
      });
    }
  });

  // we submit the order (togehter with stripeTokenId) to strapi
  async function handleSubmit() {
    globalStore.toggleItem("alert", true, "submitting data... please wait!");
    let response = await stripe
      .createToken(card)
      .catch((error) => console.log("stripe n-a generat tokenul", error));
    console.log("raspunsul este:", response);
    const { token } = response;
    console.log("tokenul inainte de if token", token);
    if (token) {
      const { id } = token;
      console.log("id-ul este:", id);
      const order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt,
      });
      console.log("asta e in order din front-end", order);
      if (order) {
        globalStore.toggleItem("alert", true, "Your order is complete!");
        cart.set([]);
        localStorage.setItem("cart", JSON.stringify([]));
        navigate("/");
        return;
      } else {
        globalStore.toggleItem(
          "alert",
          true,
          "An error has occured. please try again",
          true
        );
      }
      //token.id
      //submit
    } else {
      globalStore.toggleItem(
        "alert",
        true,
        "An error has occured. please try again",
        true
      );
    }
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total: ${$cartTotal}</h3>
      <!-- single input -->
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>
      <!-- end of single input -->
      <!-- stripe stuff -->
      <div class="stripe-input">
        <!-- info -->
        <label for="card-element">Credit or Debit Card</label>
        <p class="stripe-info">
          Test using this credit card:
          <span>4242 4242 4242 4242</span>
          <br />
          enter 5 digits for the zip code
          <br />
          enter aby 3 digits for the CVC
        </p>
        <div id="card-element" bind:this={cardElement}>
          <!-- info -->
        </div>
        <div id="card-errors" bind:this={cardErrors} role="alert">
          <!-- info 2 -->
        </div>
      </div>
      <!-- end of stripe stuff -->
      <!-- error message -->
      {#if isEmpty}
        <p class="form-empty">fill out the name</p>
      {/if}
      <!-- end of error message -->
      <!-- submit button -->
      <button
        type="submit"
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}>submit</button
      >
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empty</h2>
    <a href="/products" use:link class="btn btn-primary">fill it</a>
  </div>
{/if}
