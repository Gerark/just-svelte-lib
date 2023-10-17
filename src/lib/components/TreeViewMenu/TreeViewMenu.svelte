<script>
  import TreeView from "../TreeView/TreeView.svelte";
  import SearchBox from "./SearchBox.svelte";
  import Label from "../Label/Label.svelte";
  import { onMount, tick } from "svelte";
  import { derived, writable } from "svelte/store";
  import filterItems from "./ItemFilterer.js";
  import focusNavigation from "./focusNavigationAction.js";
  import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
  import Flex from "$lib/components/Layout/Flex.svelte";
  import DefaultTreeViewItemContent from "$lib/components/TreeView/DefaultTreeViewItemContent.svelte";
  import TreeViewItem from "$lib/components/TreeView/TreeViewItem.svelte";

  export let title = "";

  /**
   * readable store for handling the list of treeview items.
   * @type {import("svelte/store").Writable<any[]>}
   */
  export let itemsStore;
  export let showDescription = false;
  export let descriptionText = "";
  export let height = "100%";

  let inputElement;

  const filterStore = writable("");
  const filteredItems = derived([filterStore, itemsStore], ([filter, items]) => {
    if (filter === "") {
      return items;
    }
    return filterItems(items, filter);
  });

  onMount(async () => {
    await tick();
    focusInputElement();
  });

  function focusInputElement() {
    inputElement.focus();
  }
</script>

<HeaderBox {height} {title}>
  <svelte:fragment slot="header">
    <Flex class="horizontal">
      <Label --label-align="left">{title}</Label>
    </Flex>
    <SearchBox bind:inputElement={inputElement} bind:value={$filterStore} placeHolderText="Search"></SearchBox>
  </svelte:fragment>
  <div class="just-tree-view-menu" slot="content" use:focusNavigation={{ getInputElement: () => inputElement }}>
    <TreeView {descriptionText} items="{$filteredItems}" let:nodeItem on:folderselected
              on:leafselected {showDescription}>
      <slot name="item" {nodeItem} slot="item">
        <DefaultTreeViewItemContent item="{nodeItem}"></DefaultTreeViewItemContent>
      </slot>
    </TreeView>
  </div>
</HeaderBox>

<style lang="scss">
  .just-tree-view-menu {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: var(--tjust-gap-default);
  }

  .title {
    text-align: left;
    font-size: 18px;
    user-select: none;
  }
</style>