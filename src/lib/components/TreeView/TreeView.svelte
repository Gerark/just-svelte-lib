<script>
    import TreeViewItem from "./TreeViewItem.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";
    import DefaultTreeViewItemContent from "$lib/components/TreeView/DefaultTreeViewItemContent.svelte";
    import { flip } from "svelte/animate";

    export let items = [];
    export let showDescription = true;
    export let descriptionText = "";
</script>

<div class="content">
    {#if showDescription}
        <Label>{descriptionText}</Label>
        <Separator></Separator>
    {/if}
    <div>
        {#each items as item (item.id)}
            <div animate:flip|local={{duration: 125}}>
                <TreeViewItem
                        {item}
                        on:leafselected on:folderselected
                        let:nodeItem>
                    <slot slot="item" name="item" {nodeItem}>
                        <DefaultTreeViewItemContent item="{nodeItem}"></DefaultTreeViewItemContent>
                    </slot>
                </TreeViewItem>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
  .content {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
    width: 100%;
    height: 100%;
  }
</style>