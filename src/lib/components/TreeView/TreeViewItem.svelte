<script>
    import foldClick from "../../actions/foldClick.js";
    import {createEventDispatcher} from "svelte";
    import {justTooltip} from "../../actions/tooltip.js";
    import {slide} from "svelte/transition";
    import {quintOut} from "svelte/easing";
    import DefaultTreeViewItemContent from "$lib/components/TreeView/DefaultTreeViewItemContent.svelte";

    export let item = null;
    export let depth = 0;

    const dispatch = createEventDispatcher();
    let clickState = {};

    let headerElement = null;
    $: isFolder = Array.isArray(item.items);
    $: paddingLeft = depth * 10 + (depth === 0 || isFolder ? 0 : 14);
    $: leafIcon = !item.icon || item.icon === "" ? "square" : item.icon;

    $: tooltipAction = !isFolder ? justTooltip : () => {
    };

    function toggleFold() {
        item.isOpen = !item.isOpen;
    }

    function itemSelected() {
        if (isFolder) {
            dispatch("folderselected", item);
        } else {
            dispatch("leafselected", item);
        }
    }

    function onKeyDown(ev) {
        const keyCode = ev.keyCode;
        if (keyCode === 39) {
            if (isFolder) {
                if (!item.isOpen) {
                    item.isOpen = true;
                    ev.stopPropagation();
                }
            } else {
                ev.stopPropagation();
            }
        } else if (keyCode === 37) {
            if (isFolder) {
                if (!item.isOpen) {
                    dispatch("moveToParent");
                } else {
                    item.isOpen = false;
                }
            } else {
                dispatch("moveToParent");
            }
            ev.stopPropagation();
        } else if (keyCode === 13) {
            isFolder ? toggleFold() : itemSelected();
            ev.stopPropagation();
        }
    }

    function focus() {
        headerElement.focus();
    }
</script>

<div class="tree-view-item" use:tooltipAction={item.description}>
    <div bind:this={headerElement} class="header-bkg focusable" on:keydown={onKeyDown}
         role="button"
         tabindex="{-1}"
         use:foldClick={[clickState, isFolder ? 2 : 1, isFolder ? toggleFold : itemSelected, itemSelected]}>
        <div class="header" class:leafHeader="{!isFolder}" style:margin-left="{paddingLeft}px">
            {#if isFolder}
                <button class="fa fa-caret-right icon folderIcon" class:unfolded={item.isOpen}
                        class:folded={!item.isOpen}
                        use:foldClick={[clickState, 1, toggleFold, null]}></button>
            {:else}
                <div class="fa fa-{leafIcon} icon leafIcon"></div>
            {/if}
            <slot nodeItem="{item}">
                <DefaultTreeViewItemContent {item}></DefaultTreeViewItemContent>
            </slot>
        </div>
    </div>
    {#if item.items && item.isOpen}
        <div transition:slide|local={{ duration: 125, axis: "y", easing: quintOut }}>
            {#each item.items as childItem (childItem.id)}
                <svelte:self
                        item="{childItem}"
                        depth="{depth + 1}"
                        on:leafselected
                        on:folderselected
                        on:moveToParent={focus}
                        let:nodeItem>
                    <slot {nodeItem}>
                        <DefaultTreeViewItemContent item="{nodeItem}"></DefaultTreeViewItemContent>
                    </slot>
                </svelte:self>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
  .tree-view-item {
    text-align: right;
    color: var(--tjust-txt-default-color);

    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      padding: var(--tjust-padding-thin) 0;
      gap: 5px;

      .icon {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        width: 12px;
        box-shadow: none;
        color: var(--tjust-txt-default-color);
      }

      .leafIcon {
        width: 16px;
        text-align: center;
        color: var(--tjust-icon-treeviewitem-color);
      }

      .folded {
        rotate: 0deg;
        transition: rotate var(--tjust-animation-click-duration);
      }

      .unfolded {
        rotate: 90deg;
        transition: rotate var(--tjust-animation-click-duration);
      }
    }

    .leafHeader {
    }

    .header-bkg {
      background-color: var(--tjust-bg-treeviewitem-color);
      width: 100%;
    }

    .header-bkg:hover {
      background-color: var(--tjust-bg-treeviewitem-hover-color);
    }

    .header-bkg:focus {
      background-color: var(--tjust-bg-treeviewitem-focus-color);
      color: var(--tjust-bg-treeviewitem-focus-text-color);
      outline: none;

      .folderIcon {
        color: var(--tjust-txt-selected-color);
      }
    }
  }
</style>