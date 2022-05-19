<script>
  import { navigate } from "svelte-routing";
  import loginUser from "../strapi/loginUser";
  import registerUser from "../strapi/registerUser";
  import globalStore from "../stores/globalStore";
  import { globals } from "svelte/internal";
  let email = "";
  let password = "";
  let username = "default username";
  let isMember = false;

  $: isEmpty = !email || !password || !username || $globalStore.alert;

  // togggle member
  function toggleMember() {
    isMember = !isMember;
    if (!isMember) {
      username = "";
    } else {
      username = "default username";
    }
  }

  // handle submit
  async function handleSubmit() {
    globalStore.toggleItem("alert", true, "Loading data ... pls wait");
    let user;
    if (isMember) {
      user = await loginUser({ email, password });
    } else {
      user = await registerUser({ email, password, username });
    }
    console.log("user-ciuciu", user);
    if (user) {
      navigate("/products");
      globalStore.toggleItem(
        "alert",
        true,
        "welcome to shppping madness my friend!"
      );
      return;
    }
    globalStore.toggleItem("alert", true, "Error! Pls try again", true);
  }
</script>

<section class="form">
  <h2 class="section-title">
    {#if isMember}sign in{:else}register{/if}
  </h2>
  <form class="login-form" on:submit|preventDefault={handleSubmit}>
    <!-- single input -->
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <!-- end single input -->
    <!-- single input -->
    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>
    <!-- end single input -->
    {#if !isMember}
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
    {/if}

    {#if isEmpty}
      <!-- content here -->
      <p class="form-empty">Fill out all fields</p>
    {/if}
    <button
      type="submit"
      class="btn btn-block btn-primary"
      disabled={isEmpty}
      class:disabled={isEmpty}>Submit</button
    >

    {#if isMember}
      <p class="register-link">
        need to register?<button type="button" on:click={toggleMember}
          >click here</button
        >
      </p>
    {:else}
      <p class="register-link">
        already a member?<button type="button" on:click={toggleMember}
          >click here</button
        >
      </p>
    {/if}
  </form>
</section>
