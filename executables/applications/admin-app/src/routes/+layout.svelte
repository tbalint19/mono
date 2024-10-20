<script lang="ts">
  import "../app.css";
  import { initNetworkStore } from "../state/network.svelte";
  import { initUserStore } from "../state/user.svelte";

  const { data, children } = $props()

  initNetworkStore()
  const user = initUserStore()
  user.set(data.session)
</script>

{@render children()}