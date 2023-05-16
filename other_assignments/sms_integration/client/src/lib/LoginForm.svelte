<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{
    apiKeySubmit: { apiKey: string };
  }>();

  let user_email: string;
  let user_password: string;

  let errorMsg: string;

  const handleLogin = async () => {
    errorMsg = null;

    if (user_email && user_password) {
      const response = await fetch("http://localhost:3000/login", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          user_email,
          user_password,
        }),
      });

      const { info, user_api_key } = await response.json();

      if (user_api_key) {
        dispatch("apiKeySubmit", { apiKey: user_api_key });
      } else if (info) {
        errorMsg = info;
      } else {
        errorMsg = "internal server error";
      }
    }
  };

  $: validForm = Boolean(user_email) && Boolean(user_password);
</script>

<div class="form-container">
  <h2>fiotext login</h2>

  {#if errorMsg}
    <p>{errorMsg}</p>
  {/if}

  <label>
    Email:
    <input bind:value={user_email} type="text" name="user_email" required />
  </label>
  <label>
    Password:
    <input
      bind:value={user_password}
      type="password"
      name="user_password"
      required
    />
  </label>

  <button type="button" disabled={!validForm} on:click={handleLogin}
    >Login</button
  >
</div>

<style>
  .form-container {
    width: 20em;
    height: 12em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
