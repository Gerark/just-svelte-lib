<script>
    import Label from "$lib/components/Label/Label.svelte";
    import Flex from "$lib/components/Layout/Flex.svelte";

    export let value;

    export let label = "";

    function toggleValue() {
        value = !value;
    }
</script>

<Flex direction="horizontal" height="auto">
    {#if label !== ""}
        <Label>{label}</Label>
    {/if}
    <div class="checkbox" on:keydown={toggleValue} on:mousedown={toggleValue}>
        {#if value}
            <svg class="checkmark" viewBox="6 6 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none"/>
            </svg>
        {/if}
    </div>
</Flex>

<style>
    .checkbox {
        width: 16px;
        height: 16px;
        background: var(--theme-just-bg-content-color);
        border: var(--theme-just-border-width) solid var(--theme-just-border-default-color);
        stroke: var(--theme-just-checkmark-default-color);
        stroke-width: 5;

        &:hover {
            background: var(--theme-just-bg-hover-color);
            border: var(--theme-just-border-width) solid var(--theme-just-border-hover-color);
        }

        &:active {
            background: var(--theme-just-bg-hover-color);
            border: var(--theme-just-border-width) solid var(--theme-just-border-active-color);
        }
    }
</style>