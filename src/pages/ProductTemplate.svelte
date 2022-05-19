<script>
  export let id;
  // export let location;
  // global store
  import { addToCart } from "../stores/cart";
  import products from "../stores/products";
  import globalStore from "../stores/globalStore";
  import { link } from "svelte-routing";
  import Loading from "../components/Loading.svelte";

  $: product = $products.find((item) => {
    return item.id === parseInt(id);
  });
</script>

<svelte:head>
  <title>{!product ? "single product" : product.title}</title>
</svelte:head>

{#if !product}
  <Loading />
{:else}
  <section class="single-product">
    <!-- back to products -->
    <a href="/products" class="btn btn-primary" use:link>back to products</a>
    <!-- single product container -->
    <div class="single-product-container">
      <article class="single-product-image">
        <img src={product.image} alt={product.title} />
      </article>
      <article>
        <h1>{product.title}</h1>
        <h2>{product.price}</h2>
        <p>{product.description}</p>
        <button
          class="btn btn-primary btn-block"
          on:click={() => {
            addToCart(product);
            globalStore.toggleItem("cart", true);
          }}>add to cart</button
        >
      </article>
    </div>
  </section>
{/if}
