<script lang="ts">
import { getNetworkStore } from "../state/network.svelte";
import { getUserStore } from "../state/user.svelte";

const network = getNetworkStore()
const user = getUserStore()
</script>

<main>
  {#if user.data}
    <p>{ user.data.id }</p>
    <button class="btn btn-error" onclick={user.logout}>Logout</button>
  {:else}
    <p>No user</p>
    <button class="btn btn-primary" onclick={user.auth}>Auth</button>
  {/if}

  {#if network.state === 'online'}
    <p>Online</p>
  {:else if network.state === 'connecting'}
    <p>Connecting...</p>
  {:else}
    <p>Offline</p>
  {/if}
</main>


