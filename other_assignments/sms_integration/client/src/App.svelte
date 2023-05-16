<script lang="ts">
  import LoginForm from "./lib/LoginForm.svelte";
  import MessageForm from "./lib/MessageForm.svelte";
  let apiKey;
  let isShowApiKey = false;

  const handleApiKey = (event: CustomEvent<{ apiKey: string }>) => {
    apiKey = event.detail.apiKey;
  };
</script>

<main>
  {#if apiKey}
    <div class="api-key-container">
      <div>
        <button on:click={() => (isShowApiKey = !isShowApiKey)}
          >{isShowApiKey ? "Hide API key" : "Show API key"}
        </button>
        <p hidden={!isShowApiKey}>{apiKey}</p>
      </div>
    </div>
    <MessageForm {apiKey} />
  {:else}
    <LoginForm on:apiKeySubmit={handleApiKey} />
  {/if}
</main>

<style>
  .api-key-container {
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 1em;
    margin-right: 1em;
  }
</style>
