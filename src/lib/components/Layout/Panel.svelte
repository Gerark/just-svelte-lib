<script>
  let width = "100%";
  let height = "100%";
</script>

<div class="{$$restProps || ''}" style:height="{height}" style:width="{width}">
  <slot></slot>
</div>

<style lang="scss">
  div {
    box-sizing: border-box;
    padding: var(--tjust-padding-xl);
    background: var(--tjust-surface-d4);
    overflow: auto;
  }

  .surface-d4 {
    background: var(--tjust-surface-d4);
  }

  .surface-d3 {
    background: var(--tjust-surface-d3);
  }

  .surface-d2 {
    background: var(--tjust-surface-d2);
  }

  .surface-d1 {
    background: var(--tjust-surface-d1);
  }

  .surface {
    background: var(--tjust-surface);
  }

  .surface-l1 {
    background: var(--tjust-surface-l1);
  }

  .surface-l2 {
    background: var(--tjust-surface-l2);
  }

  .surface-l3 {
    background: var(--tjust-surface-l3);
  }

  .surface-l4 {
    background: var(--tjust-surface-l4);
  }
</style>