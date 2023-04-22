<script lang="ts">
  import jwt_decode from "jwt-decode";
  import { user } from "../stores/user/userStore";
</script>

<div>
  <img src={$user.picture} alt="profile avatar" />
  <p>{`Logged in as: ${$user.name}\nWith email: ${$user.email}`}</p>
</div>
