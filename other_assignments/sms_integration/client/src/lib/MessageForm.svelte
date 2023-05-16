<script>
  export let apiKey;

  let messageText;
  let recipientNumber;
  let messageSentStatus;

  $: validForm = Boolean(messageText) && Boolean(recipientNumber);

  const handleSubmitMsg = async () => {
    messageSentStatus = null;

    if (messageText && recipientNumber && apiKey) {
      try {
        const response = await fetch("http://localhost:3000/send-sms", {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            user_api_key: apiKey,
            sms_message: messageText,
            sms_to_phone: recipientNumber,
          }),
        });

        if (response.ok) {
          messageSentStatus = "Message successfully sent";
        } else {
          const result = await response.json();
          if (result.info) {
            messageSentStatus = result.info;
          } else {
            messageSentStatus = "Error";
          }
        }
      } catch (e) {
        messageSentStatus = "Error";
      }
    }
  };
</script>

<form on:submit|preventDefault={handleSubmitMsg}>
  <textarea
    required
    name="message"
    cols="40"
    rows="8"
    bind:value={messageText}
  />
  <input
    type="tel"
    required
    bind:value={recipientNumber}
    placeholder="Recipient phone number"
  />
  <button disabled={!validForm} type="submit">Send Message</button>
  {#if messageSentStatus}
    <p>{messageSentStatus}</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    padding: 1em;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.486);
  }
</style>
