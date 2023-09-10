<script>
    import TreeView from "./TreeView.svelte";
    import SearchBox from "./SearchBox.svelte";
    import Separator from "./Separator.svelte";
    import {onMount, tick} from "svelte";
    import {derived, writable} from "svelte/store";
    import filterItems from "./ItemFilterer.js";
    import focusNavigation from "./focusNavigationAction.js";
    import "./styles/themes.scss";

    export let title = "";

    /**
     * readable store for handling the list of treeview items.
     * @type {import("svelte/store").Writable<any[]>}
     */
    export let itemsStore;
    export let theme = "";
    export let appendItemsCount = false;
    export let showDescription = false;
    export let descriptionText = "";

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

<div class="just-tree-view-menu" data-theme="{theme}" role="button"
     tabindex="{-1}" use:focusNavigation={{ getInputElement: () => inputElement }}>
    <span class="title">{title}</span>
    <SearchBox bind:inputElement={inputElement} bind:value={$filter}
               placeHolderText="Search"></SearchBox>
    <TreeView {appendItemsCount} {descriptionText} items="{$filteredItems}" on:leafSelected {showDescription}
              theme="{theme}"></TreeView>
</div>

<style lang="scss">
  .just-tree-view-menu {
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-flow: column;
    background-color: var(--bg-primary-color);
    gap: 5px;
    height: 100%;
    width: 100%;
    padding: 5px;
    color: var(--text-color);

    .title {
      text-align: left;
      font-size: 18px;
      border-bottom: 2px solid var(--bg-secondary-color);
      user-select: none;
    }

    .just-separator {
      --thickness: 1px;
      --color: var(--scrollbar-color);
    }
  }
</style>