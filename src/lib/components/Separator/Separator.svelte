<script>
    export let width = 1;
</script>

<div class="just-separator ...{$$restProps}"
     style:border-width="{width}px">
</div>

<style lang="scss">
  div {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid var(--theme-just-sep-color);
  }
</style>