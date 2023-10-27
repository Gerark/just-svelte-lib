<script>
    import {useWrapper} from "$lib/actions/useWrapper.js";

    export let source = "";
    export let alt = "";
    export let actions = [];
</script>

<img alt="{alt}" class="{$$restProps.class || ''}" src="{source}" use:useWrapper={actions}>

<style lang="scss">
  img {
    width: var(--image-width, 100%);
    height: var(--image-height, 100%);
    object-fit: none;
    border: none;
  }

  .shadow {
    box-shadow: 0 0 20px black;
  }

  .fill {
    object-fit: fill;
  }

  .cover {
    object-fit: cover;
  }

  .contain {
    object-fit: contain;
  }

  .scale-down {
    object-fit: scale-down;
  }

  .sm {
    width: 4rem;
  }

  .md {
    width: 8rem;
  }

  .lg {
    width: 16rem;
  }
</style>