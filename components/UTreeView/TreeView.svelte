<script>
    import TreeViewItem from "./TreeViewItem.svelte";

    export let items = [];
    export let theme = "";
    export let appendItemsCount = false;
</script>

<div>
    {#each items as item (item.id)}
        <TreeViewItem items="{item.items}" label="{item.label}" payload="{item.payload}" icon="{item.icon}"
                      folded="{!item.isOpen}"
                      on:leafSelected
                      {appendItemsCount}
                      theme="{theme}"></TreeViewItem>
    {/each}
</div>

<style lang="scss">
</style>