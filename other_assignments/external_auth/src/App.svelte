<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/components/Counter.svelte";
  import { onMount } from "svelte";
  import CredentialsDisplay from "./lib/components/CredentialsDisplay.svelte";
  import { user } from "./lib/stores/user/userStore";
  import jwtDecode from "jwt-decode";
  import type { GoogleAuthUser } from "./lib/stores/user/types";

  onMount(() => {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("google-auth-sign-in"),
        { theme: "outline", size: "large", type: "standard" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  });

  function handleCredentialResponse(
    response: google.accounts.id.CredentialResponse
  ) {
    $user = jwtDecode(response.credential) as GoogleAuthUser;
    document.getElementById("google-auth-sign-in").hidden = true;
  }

  function handleSignOut() {
    google.accounts.id.disableAutoSelect();
    $user = null;
    document.getElementById("google-auth-sign-in").hidden = false;
  }
</script>

<main>
  {#if $user}
    <CredentialsDisplay />
    <div class="g_id_signout" id="signout_button">
      <button on:click={handleSignOut}> Sign Out </button>
    </div>
  {/if}
  <div id="google-auth-sign-in" />
</main>

<style>
</style>
