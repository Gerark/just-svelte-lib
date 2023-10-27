<script>
    export let rotation = 0;
</script>

<div style:rotate="{rotation}">
</div>

<style lang="scss">
  div {
    width: 0;
    height: 0;
    rotate: 0deg;
    margin: auto 5px auto auto;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;

    border-top: 5px solid var(--tjust-txt-default-color);
    transition: rotate var(--tjust-animation-click-duration);
  }
</style>