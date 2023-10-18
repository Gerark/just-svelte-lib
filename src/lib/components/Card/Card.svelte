<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Button from "$lib/components/Button/Button.svelte";

    export let width = "auto";
    export let height = "auto";
    export let isButtonEnabled = false;
    export let isHighlighted = false;
</script>

<Button --height="{height}" --width="{width}" class="btn shadow flat sm" enabled="{isButtonEnabled}"
        highlighted="{isHighlighted}"
        on:click
        on:dblclick
        on:mouseenter on:mouseleave>
    <Flex class="vertical thick clip-overflow" {height} {width}>
        <div class="header">
            <slot name="header"></slot>
        </div>
        <slot name="content"></slot>
    </Flex>
</Button>

<style lang="scss">
  .header {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    margin: auto;
    box-sizing: border-box;
  }
</style>