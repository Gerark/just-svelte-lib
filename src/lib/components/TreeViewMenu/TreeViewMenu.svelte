<script>
    import TreeView from "../TreeView/TreeView.svelte";
    import SearchBox from "./SearchBox.svelte";
    import Label from "../Label/Label.svelte";
    import {onMount, tick} from "svelte";
    import {derived, writable} from "svelte/store";
    import filterItems from "./ItemFilterer.js";
    import focusNavigation from "./focusNavigationAction.js";

    export let title = "";

    /**
     * readable store for handling the list of treeview items.
     * @type {import("svelte/store").Writable<any[]>}
     */
    export let itemsStore;
    export let appendItemsCount = false;
    export let showDescription = false;
    export let descriptionText = "";
    export let maxHeight = "100%";

    let inputElement;

    const filter = writable("");
    const filteredItems = derived([filter, itemsStore], ([depFilter, depActions]) => {
        if (depFilter === "") {
            return depActions;
        }
        return filterItems(depActions, depFilter);
    });

    onMount(async () => {
        await tick();
        focusInputElement();
    });

    function focusInputElement() {
        inputElement.focus();
    }
</script>

<div class="just-tree-view-menu" role="button" style:max-height="{maxHeight}"
     tabindex="{-1}" use:focusNavigation={{ getInputElement: () => inputElement }}>
    <Label align="left" selectable="{false}" text="{title}"></Label>
    <SearchBox bind:inputElement={inputElement} bind:value={$filter}
               placeHolderText="Search"></SearchBox>
    <TreeView {appendItemsCount} {descriptionText} items="{$filteredItems}" on:leafSelected
              {showDescription}></TreeView>
</div>

<style lang="scss">
  .just-tree-view-menu {
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-flow: column;
    background-color: var(--theme-just-bg-component-color);
    gap: 5px;
    height: 100%;
    width: 100%;
    padding: 5px;
    color: var(--theme-just-txt-default-color);

    .title {
      text-align: left;
      font-size: 18px;
      user-select: none;
    }
  }
</style>