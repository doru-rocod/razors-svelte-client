<script>
    import { onDestroy, onMount } from "svelte";
    import About from "../../pages/About.svelte";
    import products from "../../stores/defaultProducts";
    import Loading from "../Loading.svelte";
    import Product from "./Product.svelte";

    export let title = "";

    // let localProducts = [];
    // let unsubscribe;
    // // lifecycle methods
    // onMount(() => {
    //     unsubscribe = products.subscribe((value) => {
    //         console.log("subscribed");
    //         localProducts = value;
    //     });
    // });
    // onDestroy(() => {
    //     unsubscribe();
    // });
</script>

{#if $products.length === 0}
    <Loading />
{:else}
    <section class="section">
        <h2 class="section-title">{title}</h2>
        <div class="products-center">
            {#each $products as product (product.id)}
                <Product {product} />
            {/each}
        </div>
    </section>
{/if}
