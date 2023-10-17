<script>
  export let item = null;
</script>

<span class:folderLabel="{Array.isArray(item.items)}" class:leafLabel="{!Array.isArray(item.items)}">
    {@html item.label}
</span>

<style lang="scss">
  span {
    font-size: var(--tjust-font-size-sm);
  }

  .folderLabel {
    font-weight: bold;
    user-select: none;
  }

  .leafLabel {
    font-style: normal;
    user-select: none;
  }
</style>