<script>
  export let width = "auto";
</script>

<p class="{$$restProps.class || ''}" style:width="{width}">
  <slot></slot>
</p>

<style lang="scss">
  p {
    margin-block-start: 0;
    margin-block-end: 0;
    color: var(--tjust-txt-default-color);
  }

  .overflow-ellipsis {
    overflow: hidden;
    margin: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .size-2xs, .note {
    font-size: var(--tjust-font-size-2xs);
  }

  .size-xs, .note {
    font-size: var(--tjust-font-size-xs);
  }

  .size-sm, .label-1 {
    font-size: var(--tjust-font-size-sm);
  }

  .size-md, .label-2 {
    font-size: var(--tjust-font-size-md);
  }

  .size-lg, .sub-header {
    font-size: var(--tjust-font-size-lg);
  }

  .size-xl, .header {
    font-size: var(--tjust-font-size-xl);
  }

  .size-2xl, .header {
    font-size: var(--tjust-font-size-2xl);
  }

  .color-on-surface {
    color: var(--tjust-on-surface);
  }

  .color-on-primary {
    color: var(--tjust-on-primary);
  }

  .color-on-secondary {
    color: var(--tjust-on-secondary);
  }

  .color-on-tertiary {
    color: var(--tjust-on-tertiary);
  }

  .color-on-success {
    color: var(--tjust-on-success);
  }

  .color-on-warning {
    color: var(--tjust-on-warning);
  }

  .color-on-error {
    color: var(--tjust-on-error);
  }

  .align-center {
    text-align: center;
  }

  .align-left {
    text-align: left;
  }

  .align-right {
    text-align: right;
  }
</style>