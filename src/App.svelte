<script>
  //pages
  import Login from "./pages/Login.svelte";
  import Checkout from "./pages/Checkout.svelte";
  import Products from "./pages/Products.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import ProductTemplate from "./pages/ProductTemplate.svelte";
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello There!</h1>
</main>
