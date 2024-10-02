<script lang="ts">
  import { Modal, clickText, copyOnClick } from '@ui/lib'

  let isOpen = $state(false)
</script>

<main>
  <button onclick={() => isOpen = true}>Open</button>
  {#if isOpen}
  <Modal onclickout={() => isOpen = false}>
    <div class="card bg-primary text-primary-content">
      <p>Hello lib!</p>
      <p use:copyOnClick use:clickText={{ text: "Copied!", durationInMillis: 3000 }}>
        Demo text to copy
      </p>
    </div>
  </Modal>
  {/if}
</main>


