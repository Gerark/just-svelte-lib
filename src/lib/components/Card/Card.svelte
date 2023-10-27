<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import {useWrapper} from "$lib/actions/useWrapper.js";

    export let width = "auto";
    export let height = "auto";
    export let isButtonEnabled = false;
    export let isHighlighted = false;
    export let actions = [];
</script>

<div style:height="{height}" style:width="{width}" use:useWrapper={actions}>
    <Button class="btn shadow surface no-padding sm" enabled="{isButtonEnabled}" {height} highlighted="{isHighlighted}"
            on:click
            on:dblclick
            on:mouseenter
            on:mouseleave {width}>
        <Flex class="vertical thick clip-overflow">
            <div class="header">
                <slot name="header"></slot>
            </div>
            <slot name="content"></slot>
        </Flex>
    </Button>
</div>

<style lang="scss">
  .header {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
  }
</style>