<script>
  import Label from "$lib/components/Label/Label.svelte";
  import Flex from "$lib/components/Layout/Flex.svelte";

  export let value;

  export let label = "";

  function toggleValue() {
    value = !value;
  }
</script>

<Flex class="thick horizontal" height="auto" width="100%">
  {#if label !== ""}
    <Label>{label}</Label>
  {/if}
  <div class="checkbox" on:keydown={toggleValue} on:mousedown={toggleValue}>
    {#if value}
      <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1 27.2 l7.1 7.2 16.7-16.8" fill="none" />
      </svg>
    {/if}
  </div>
</Flex>

<style lang="scss">
  .checkbox {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: var(--tjust-font-size-xl);
    height: var(--tjust-font-size-xl);
    min-width: var(--tjust-font-size-xl);
    min-height: var(--tjust-font-size-xl);
    background: var(--tjust-bg-content-color);
    border: var(--tjust-border-width) solid var(--tjust-border-default-color);
    stroke: var(--tjust-checkmark-default-color);
    stroke-width: 5;

    &:hover {
      background: var(--tjust-bg-hover-color);
      border: var(--tjust-border-width) solid var(--tjust-border-hover-color);
    }

    &:active {
      background: var(--tjust-bg-hover-color);
      border: var(--tjust-border-width) solid var(--tjust-border-active-color);
    }
  }
</style>