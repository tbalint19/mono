<script lang="ts">
import { onMount } from "svelte";
import { client } from "$lib/api";

onMount(async () => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  const code = params.get('code')
  if (!code)
    return
  const response = await client.login({ body: { code } })
  if (response.status !== 200)
    return
  console.log(response.body.token)
})
</script>

<main>
  <h1>Logging in...</h1>
</main>