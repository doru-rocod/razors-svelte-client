<script>
  import user from "../stores/user";
  import { link } from "svelte-routing";
  // logout func
  import { logout } from "../strapi/setupUser";
  import globalStore from "../stores/globalStore";
</script>

{#if $user.jwt}
  <a
    href="/"
    use:link
    class="logout-btn"
    on:click={() => {
      logout();
      globalStore.toggleItem("sidebar", false);
    }}>logout</a
  >
{:else}
  <a
    href="/login"
    use:link
    on:click={() => {
      globalStore.toggleItem("sidebar", false);
    }}>login</a
  >
{/if}
