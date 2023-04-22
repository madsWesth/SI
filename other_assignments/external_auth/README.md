To add google Identity / One Tap

documentation: https://developers.google.com/identity/gsi/web/guides/overview

typings for the client library: https://www.npmjs.com/package/@types/google.accounts

* Go to Google APIs console: https://console.developers.google.com/apis
    * Create a new project
    * Create an OAuth consent screen and add test user (only users that can use use login during testing)
    * Under credentials tab create OAuth 2.0 Client ID
        * add http://localhost and http://localhost:<dev_server_port_number> on both Authorised JavaScript origins and Authorised redirect URIs (add actual URIs for prod)
        * Save client secret and ID
* Add client library by adding script to your index.html
* On load initialize should be called `google.accounts.id.initialize({
        client_id: <your_client_id>,
        callback: <your_credential_response_handler>,
      })`
* There are multiple ways to create the sign in button and Google provide a tool for it here: https://developers.google.com/identity/gsi/web/tools/configurator. You can also just make a div in your app and use the `google.accounts.id.renderButton(parent: HTMLElement, options: GsiButtonConfiguration)` function from the client library. The options agrument is an object where the only property required is type which is either `standard` or `icon`. You can find more info in the typings for the client library
* Additionally `google.accounts.id.prompt()` can be called to show a One Tap dialog window prompting sign in
* To sign a user out call `google.accounts.id.disableAutoSelect()`