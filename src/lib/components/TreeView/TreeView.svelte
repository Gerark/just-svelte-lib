<script>
    import TreeViewItem from "./TreeViewItem.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";

    export let items = [];
    export let appendItemsCount = false;
    export let showDescription = true;
    export let descriptionText = "";
    export let height = "100%";
</script>

<div class="just-tree-view" style:height="{height}">
    <div class="content">
        {#if showDescription}
            <Label text="{descriptionText}"></Label>
            <Separator></Separator>
        {/if}
        <div>
            {#each items as item (item.id)}
                <TreeViewItem items="{item.items}" label="{item.label}" payload="{item.payload}" icon="{item.icon}"
                              folded="{!item.isOpen}"
                              on:leafSelected
                              {appendItemsCount}></TreeViewItem>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
  .just-tree-view {
    box-sizing: border-box;
    background: var(--theme-just-bg-content-color);
    color: var(--theme-just-txt-default-color);
    padding: 0 5px 10px 0;
    height: 100%;
    width: 100%;
    overflow: clip;
    user-select: none;

    .content {
      display: flex;
      flex-flow: column nowrap;
      padding: 5px 5px 0 5px;
      gap: 8px;
      height: 100%;
      overflow: auto;
      scrollbar-gutter: stable;
    }
  }
</style>