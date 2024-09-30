<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import type { Snippet } from 'svelte'
  import { fly } from 'svelte/transition'
  import { fade } from 'svelte/transition'

  type Props = {
    onclickout: () => void
    children: Snippet
  }
  const {
    onclickout,
    children,
  }: Props = $props()

  $effect(() => {
    document.body.style['overflow'] = 'hidden'
    return () => document.body.style['overflow'] = 'auto'
  })
</script>

<div class="fixed inset-0 z-40">
  <div class="relative flex h-screen w-full items-center justify-center">
    <div
      transition:fly={{ y: -500, opacity: 0, duration: 500 }}
      class="max-w-[650px] relative z-50 inline p-4"
    >
      {@render children()}
    </div>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div
      transition:fade={{ duration: 200 }}
      class="absolute left-0 top-0 h-full w-screen bg-base-100 opacity-90"
      on:click={onclickout}
    />
  </div>
</div>
