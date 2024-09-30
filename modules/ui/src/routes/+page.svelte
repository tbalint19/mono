<script lang="ts">
  import Modal from "../lib/components/Modal.svelte";

  let isOpen = $state(false)
</script>

<main>
  <button onclick={() => isOpen = true} class="btn btn-primary">Modal demo</button>

  {#if isOpen}
  <Modal onclickout={() => isOpen = false}>
    <div class="card card-body bg-secondary text-secondary-content">
      Demo content
    </div>
  </Modal>
  {/if}
</main>