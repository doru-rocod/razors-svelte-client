<script>
    // cart
    import CartButton from "../Cart/CartButton.svelte";
    // global store
    import { link } from "svelte-routing";
    import globalStore from "../../stores/globalStore";
</script>

<nav class="navbar">
    <div class="nav-center">
        <!-- sidebar toglle -->
        <button
            class="btn-sidebar-toggle"
            on:click={() => {
                globalStore.toggleItem('sidebar', true);
            }}><i class="fas fa-bars" /></button>
        <!-- logo   -->
        <a href="/" use:link class="nav-logo"><img
                src="/assets/images/logo.svg"
                alt="razors logo"
                class="logo" /></a>
        <!-- cart button -->
        <CartButton />
    </div>
</nav>
