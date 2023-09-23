<script>
    import foldClick from "../../actions/foldClick.js"
    import {createEventDispatcher} from "svelte";
    import {justTooltip} from "../../actions/tooltip.js"
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

    export let items = null;
    export let label;
    export let folded = true;
    export let icon = "";
    export let depth = 0;
    export let description = "";
    export let payload
    export let appendItemsCount = false;

    const dispatch = createEventDispatcher();
    let clickState = {};

    let headerElement = null;
    $: foldedIcon = folded ? "caret-right" : "caret-down";
    $: isFolder = Array.isArray(items);
    $: paddingLeft = depth * 10 + (depth === 0 || isFolder ? 0 : 14);
    $: leafIcon = !icon || icon === "" ? "square" : icon;
    $: appendToLabel = items && isFolder && appendItemsCount ? ` [${items.length}]` : "";

    $: tooltipAction = !isFolder ? justTooltip : () => {
    };

    function toggleFold() {
        folded = !folded;
    }

    function leafSelected() {
        dispatch("leafSelected", payload);
    }

    function onKeyDown(ev) {
        const keyCode = ev.keyCode;
        if (keyCode === 39) {
            if (isFolder) {
                if (folded) {
                    folded = false;
                    ev.stopPropagation();
                }
            } else {
                ev.stopPropagation();
            }
        } else if (keyCode === 37) {
            if (isFolder) {
                if (folded) {
                    dispatch("moveToParent");
                } else {
                    folded = true;
                }
            } else {
                dispatch("moveToParent");
            }
            ev.stopPropagation();
        } else if (keyCode === 13) {
            isFolder ? toggleFold() : leafSelected();
            ev.stopPropagation();
        }
    }

    function focus() {
        headerElement.focus();
    }
</script>

<div class="tree-view-item" use:tooltipAction={description}>
    <div bind:this={headerElement} class="header-bkg focusable" on:keydown={onKeyDown} role="button" tabindex="{-1}"
         use:foldClick={[clickState, isFolder ? 2 : 1, isFolder ? toggleFold : leafSelected]}>
        <div class="header" class:leafHeader="{!isFolder}" style:margin-left="{paddingLeft}px">
            {#if isFolder}
                <button class="fa fa-caret-right icon folderIcon" class:unfolded={!folded} class:folded
                        use:foldClick={[clickState, 1, toggleFold]}></button>
            {:else}
                <div class="fa fa-{leafIcon} icon leafIcon"></div>
            {/if}
            <span class:folderLabel="{isFolder}" class:leafLabel="{!isFolder}">{@html label}{appendToLabel}</span>
        </div>
    </div>
    {#if items && !folded}
        <div transition:slide={{ duration: 125, axis: "y", easing: quintOut }}>
            {#each items as item (item.id)}
                <svelte:self items="{item.items}"
                             label="{item.label}"
                             depth="{depth + 1}"
                             description="{item.description}"
                             payload="{item.payload}"
                             icon="{item.icon}"
                             folded="{!item.isOpen}"
                             on:leafSelected
                             on:moveToParent={focus}
                             {appendItemsCount}></svelte:self>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
  .tree-view-item {
    text-align: right;
    color: var(--theme-just-txt-default-color);

    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      gap: 5px;
      height: 18px;

      .icon {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        width: 12px;
        box-shadow: none;
        color: var(--theme-just-txt-default-color);
      }

      .leafIcon {
        width: 16px;
        text-align: center;
        color: var(--theme-just-icon-treeviewitem-color);
      }

      .folded {
        rotate: 0deg;
        transition: rotate var(--theme-just-animation-click-duration);
      }

      .unfolded {
        rotate: 90deg;
        transition: rotate var(--theme-just-animation-click-duration);
      }

      .folderLabel {
        font-weight: bold;
        font-size: 14px;
        user-select: none;
      }

      .leafLabel {
        font-style: normal;
        font-size: 14px;
        user-select: none;
      }
    }

    .leafHeader {
      height: 25px;
    }

    .header-bkg {
      background-color: var(--theme-just-bg-treeviewitem-color);
      width: 100%;
    }

    .header-bkg:hover {
      background-color: var(--theme-just-bg-treeviewitem-hover-color);
    }

    .header-bkg:focus {
      background-color: var(--theme-just-bg-treeviewitem-focus-color);
      color: var(--theme-just-bg-treeviewitem-focus-text-color);
      outline: none;

      .folderIcon {
        color: var(--theme-just-txt-selected-color);
      }
    }
  }
</style>