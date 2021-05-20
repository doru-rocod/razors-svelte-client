<script>
  //pages
  import Login from "./pages/Login.svelte";
  import Checkout from "./pages/Checkout.svelte";
  import Products from "./pages/Products.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import ProductTemplate from "./pages/ProductTemplate.svelte";
  // components
  import Navbar from "./components/Navbar/Navbar.svelte";
  import Sidebar from "./components/Navbar/Sidebar.svelte";
  import Cart from "./components/Cart/Cart.svelte";

  // router
  import { Router, Route, Link } from "svelte-routing";

  //stores
  import globalStore from "./stores/globalStore";
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
  <Router>
    <Navbar />
    {#if $globalStore.sidebar}
      <Sidebar />
    {/if}
    {#if $globalStore.cart}
      <Cart />
    {/if}
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/products" component={Products} />
    <Route path="/products/:id" component={ProductTemplate} />
  </Router>
</main>
