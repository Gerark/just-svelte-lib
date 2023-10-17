<script>
  export let align = "center";
  export let selectable = false;
</script>

<span class="main {$$restProps.class || 'sm'}"
      style:color="var(--tjust-txt-default-color)"
      style:text-align="{align}"
      style:user-select="{selectable ? 'default' : 'none'}">
    <slot></slot>
</span>

<style lang="scss">
  .xs, .note {
    font-size: var(--tjust-font-size-xs);
  }

  .sm, .label-1 {
    font-size: var(--tjust-font-size-sm);
  }

  .md, .label-2 {
    font-size: var(--tjust-font-size-md);
  }

  .lg, .sub-header {
    font-size: var(--tjust-font-size-lg);
  }

  .xl, .header {
    font-size: var(--tjust-font-size-xl);
  }
</style>