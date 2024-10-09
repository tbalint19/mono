<script lang="ts">
import ENVIRONMENT from "../environment";
const authUrl = new URL(ENVIRONMENT.VITE_TOKEN_URL)
authUrl.searchParams.set('client_id', ENVIRONMENT.VITE_CLIENT_ID)
authUrl.searchParams.set('redirect_uri', ENVIRONMENT.VITE_REDIRECT_URI)
authUrl.searchParams.set('response_type', 'code')
authUrl.searchParams.set('prompt', 'login')
authUrl.searchParams.set('scope', 'openid email')
</script>

<main>
  <a href={authUrl.toString()}>Login</a>
</main>


