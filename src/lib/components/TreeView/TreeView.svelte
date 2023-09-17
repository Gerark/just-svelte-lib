<script>
    import TreeViewItem from "./TreeViewItem.svelte";

    export let items = [];
    export let theme = "";
    export let appendItemsCount = false;
    export let showDescription = true;
    export let descriptionText = "";
</script>

<div class="just-tree-view">
    <div class="content">
        {#if showDescription}
            <div class="description">{descriptionText}</div>
            <div class="just-separator"></div>
        {/if}
        <div>
            {#each items as item (item.id)}
                <TreeViewItem items="{item.items}" label="{item.label}" payload="{item.payload}" icon="{item.icon}"
                              folded="{!item.isOpen}"
                              on:leafSelected
                              {appendItemsCount}
                              theme="{theme}"></TreeViewItem>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
  .just-tree-view {
    box-sizing: border-box;
    background: var(--theme-just-primary3);
    padding: 0 5px 10px 0;
    height: 100%;
    overflow: clip;
    overscroll-behavior: none;
    scrollbar-gutter: stable;
    box-shadow: inset 0 5px 5px -5px black, inset 0 -5px 5px -5px black;
    user-select: none;

    .content {
      display: flex;
      flex-flow: column nowrap;
      padding: 5px 5px 0 5px;
      gap: 8px;
      height: 100%;
      overflow: auto;
      scrollbar-gutter: stable;

      .description {
        padding: 2px;
        user-select: none;
      }
    }

    .content::-webkit-scrollbar {
      width: 8px;
      border: 0 solid transparent;
      margin: 5px;
    }

    .content::-webkit-scrollbar-track {
      border: 0 solid transparent;
      box-shadow: none;
      margin: 5px 0 0 0;
    }

    .content::-webkit-scrollbar-track:hover {
      border: 0 solid transparent;
      box-shadow: none;
    }

    .content::-webkit-scrollbar-thumb {
      background-color: var(--theme-just-primary4);
      border: 0 solid transparent;
      box-shadow: none;
    }

    .content::-webkit-scrollbar-thumb:hover {
      background-color: var(--theme-just-primary5);
      border: 0 solid transparent;
      box-shadow: none;
    }

    .just-separator {
      border-bottom: 1px solid var(--theme-just-primary4);
      margin: 0 14px;
    }
  }
</style>