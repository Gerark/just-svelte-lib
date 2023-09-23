<script>
</script>

<div>
    <slot></slot>
</div>

<style lang="scss">
  div {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: var(--theme-just-bg-color);
    overflow: auto;
    scrollbar-gutter: stable;
  }
</style>