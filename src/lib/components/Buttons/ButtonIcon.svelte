<script>
    export let icon = "";
    export let size = "m";

    $: buttonSize = size === "l" ? 40 : size === "s" ? 24 : 32;
</script>

<button on:click style:--font-size="{buttonSize/2}px" style:--size="{buttonSize}px">
    <i class="fa fa-{icon}"></i>
</button>

<style lang="scss">
  button {
    color: var(--theme-just-text);
    background: var(--theme-just-primary3);
    border: 2px solid var(--theme-just-primary3);
    width: var(--size);
    height: var(--size);
    font-size: var(--font-size);
    text-align: center;

    i {
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      background: var(--theme-just-primary2);
      color: var(--theme-just-text2);

      i {
        animation: zoomIn 0.25s ease-out 0s 1 normal forwards;
      }
    }

    &:active {
      border: 2px solid var(--theme-just-active);
      scale: 0.9;
    }
  }

  @keyframes zoomIn {
    from {
      scale: 1;
    }
    to {
      scale: 1.1;
    }
  }
</style>