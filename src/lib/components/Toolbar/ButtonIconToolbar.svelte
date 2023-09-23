<script>
    import ButtonIcon from "$lib/components/Buttons/ButtonIcon.svelte";
    import Flex from "$lib/components/Layout/Flex.svelte";

    /**
     * @type {("horizontal"|"vertical")}
     * @prop {string} direction
     */
    export let direction;

    /**
     * @typedef {Array<{icon: string, onClick: function(): void}>} items
     */
    export let items = [];
    export let context = {};
</script>

<Flex class="thin" {direction} gap="2px" width="auto">
    {#each items as item}
        <ButtonIcon icon="{item.icon}" size="s" on:click={() => {item.onClick(context);}}></ButtonIcon>
    {/each}
</Flex>

<style lang="scss">

</style>