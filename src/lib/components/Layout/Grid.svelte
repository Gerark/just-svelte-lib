<script>
  export let columnSize = "auto";
  export let rowSize = "auto";
</script>

<div class="grid"
     style:grid-template-columns="repeat(auto-fill, {columnSize})"
     style:grid-template-rows="repeat(auto-fill, {rowSize})">
  <slot></slot>
</div>

<style lang="scss">
  .grid {
    box-sizing: border-box;
    width: var(--grid-width, 100%);
    height: var(--grid-height, 100%);
    padding: var(--tjust-padding-thin);
    display: grid;
    grid-row-gap: var(--tjust-gap-default);
    grid-column-gap: var(--tjust-gap-default);
    justify-content: center;
    user-select: none;
  }
</style>