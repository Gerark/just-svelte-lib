<script>
   import foldClick from "../../actions/foldClick.js"
   import { createEventDispatcher } from "svelte";
   import { justTooltip } from "../../actions/tooltip.js"

   export let items = null;
   export let label;
   export let folded = true;
   export let icon = "";
   export let depth = 0;
   export let description = "";
   export let payload
   export let theme = "";
   export let appendItemsCount = false;

   const dispatch = createEventDispatcher();
   let clickState = {};

   let headerElement = null;
   $: foldedIcon = folded ? "caret-right" : "caret-down";
   $: isFolder = Array.isArray(items);
   $: paddingLeft = depth * 10 + ( depth === 0 || isFolder ? 0 : 14 );
   $: leafIcon = !icon || icon === "" ? "square" : icon;
   $: appendToLabel = items && isFolder && appendItemsCount ? ` [${items.length}]` : "";

   $: tooltipAction = !isFolder ? justTooltip : () => {};

   function toggleFold()
   {
      folded = !folded;
   }

   function leafSelected()
   {
      dispatch("leafSelected", payload);
   }

   function onKeyDown(ev)
   {
      const keyCode = ev.keyCode;
      if(keyCode === 39) {
         if(isFolder) {
            if(folded) {
               folded = false;
               ev.stopPropagation();
            }
         } else {
            ev.stopPropagation();
         }
      }
      else if(keyCode === 37) {
         if(isFolder) {
            if(folded) {
               dispatch("moveToParent");
            } else {
               folded = true;
            }
         } else {
            dispatch("moveToParent");
         }
         ev.stopPropagation();
      }
      else if(keyCode === 13) {
         isFolder ? toggleFold() : leafSelected();
         ev.stopPropagation();
      }
   }

   function focus() {
      headerElement.focus();
   }
</script>

<div class="tree-view-item" style="--padding-left : {paddingLeft}px" use:tooltipAction={description}>
   <div class="header-bkg focusable" tabindex="{-1}" role="button" on:keydown={onKeyDown}  bind:this={headerElement}
        use:foldClick={[clickState, isFolder ? 2 : 1, isFolder ? toggleFold : leafSelected]}>
      <div class="header" class:leafHeader="{!isFolder}">
         {#if isFolder}
            <button class="fa fa-{foldedIcon} icon" use:foldClick={[clickState, 1, toggleFold]}></button>
         {:else}
            <div class="fa fa-{leafIcon} icon leafIcon"></div>
         {/if}
         <span class:folderLabel="{isFolder}" class:leafLabel="{!isFolder}">{@html label}{appendToLabel}</span>
      </div>
   </div>
   {#if items && !folded}
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
                      {appendItemsCount}
                      theme="{theme}"></svelte:self>
      {/each}
   {/if}
</div>

<style lang="scss">
  .tree-view-item {
    text-align: right;

    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      align-content: flex-start;
      gap: 5px;
      height: 18px;
      padding-left: var(--padding-left);

       :global(.highlightedLabel) {
          background: var(--theme-just-highlight);
          color: var(--theme-just-highlight-text);
       }

       .icon {
          background: none;
          border: none;
          margin: 0;
          padding: 0;
          color: var(--theme-just-text2);
          width: 12px;
          box-shadow: none;
       }

       .leafIcon {
          width: 16px;
          text-align: center;
          color: var(--theme-just-icon);
       }

       .folderLabel {
          color: var(--theme-just-text2);
          font-weight: bold;
          font-size: 14px;
          user-select: none;
       }

       .leafLabel {
          color: var(--theme-just-text2);
          font-style: normal;
          font-size: 14px;
          user-select: none;
       }
    }

    .leafHeader {
      height: 25px;
    }

    .header-bkg:hover {
      background-color: var(--theme-just-primary2)
    }

    .header-bkg:focus {
      background-color: var(--theme-just-active);
      outline: none;
    }
  }
</style>