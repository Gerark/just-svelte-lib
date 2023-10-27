<script>
    let width = "100%";
    let height = "100%";
</script>

<div class="{$$restProps.class || ''}" style:height="{height}" style:width="{width}">
    <slot></slot>
</div>

<style lang="scss">
  div {
    box-sizing: border-box;
    padding: var(--tjust-padding-xl);
    background: var(--tjust-surface-d4);
  }

  .scrollable {
    overflow: auto;
  }
</style>