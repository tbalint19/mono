<script lang="ts">
import { client } from "$lib/api";

import ENVIRONMENT from "../environment";
const authUrl = new URL(ENVIRONMENT.VITE_TOKEN_URL)
authUrl.searchParams.set('client_id', ENVIRONMENT.VITE_CLIENT_ID)
authUrl.searchParams.set('redirect_uri', ENVIRONMENT.VITE_REDIRECT_URI)
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('prompt', 'login')
authUrl.searchParams.set('scope', 'openid email profile')

const demo = async () => {
  const response = await client.createDemo({ body: { msg: "Yooo" } })
  console.log(response)
}
</script>

<main>
  <a href={authUrl.toString()}>Login</a>
  <button onclick={demo}>Demo</button>
</main>


