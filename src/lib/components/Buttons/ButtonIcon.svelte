<script>
    import {justTooltip} from "$lib/actions/tooltip.js";

    export let icon = "";
    export let size = "m";
    export let tooltip = "";

    $: tooltipAction = tooltip !== "" ? justTooltip : () => {
    };
    $: buttonSize = size === "l" ? 40 : size === "s" ? 24 : size === "xs" ? 16 : 32;
</script>

<button on:click style:font-size="{buttonSize/2}px" style:height="{buttonSize}px" style:width="{buttonSize}px"
        use:tooltipAction={tooltip}>
    <i class="fa fa-{icon}" style:font-size="{buttonSize/2}"></i>
</button>

<style lang="scss">
  button {
    color: var(--theme-just-txt-button-color);
    background: var(--theme-just-bg-button-color);
    border: var(--theme-just-border-width) solid var(--theme-just-border-color);
    border-radius: var(--theme-just-border-radius);
    text-align: center;

    i {
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      background: var(--theme-just-bg-button-hover-color);
      color: var(--theme-just-txt-button-color);
    }

    &:active {
      border: var(--theme-just-border-width) solid var(--theme-just-border-active-color);
      scale: 0.9;
    }
  }
</style>