<script>
    import {clickOutside} from "$lib/actions/clickOutside.js";
    import {slide} from "svelte/transition"
    import {quintOut} from "svelte/easing";

    export let items = [];
    export let value = {};
    export let placeHolderLabel = "Select...";

    let showDropDown = false;

    $: currentItem = items.find((x) => {
        return x.value === value;
    });

    function toggleDropDown() {
        showDropDown = !showDropDown;
    }

    function hideDropDown() {
        showDropDown = false;
    }

    function selectItem(item) {
        value = item.value;
        hideDropDown();
    }
</script>

<div class="just-select" use:clickOutside={{callback: hideDropDown}}>
    <div class="header" on:click={toggleDropDown} on:keydown={toggleDropDown}>
        <div class="field">
            {#if currentItem}
                <slot item={currentItem}>
                    <span>{currentItem.label}</span>
                </slot>
            {:else}
                <span>{placeHolderLabel}</span>
            {/if}
        </div>
        <div class="arrow-down">
        </div>
    </div>
    {#if showDropDown}
        <div class="dropdown" transition:slide={{ duration: 125, axis: "y", easing: quintOut }}>
            {#each items as item}
                <div class="item" on:click={() => selectItem(item)} on:keydown={() => selectItem(item)}
                     class:selected={item.value === value}>
                    <slot {item}>
                        <span>{item.label}</span>
                    </slot>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
  .just-select {
    box-sizing: border-box;
    position: relative;
    user-select: none;
    height: 100%;
    width: 100%;

    .dropdown {
      padding: 2.5px;
      background: var(--theme-just-bg-content-color);
      color: var(--theme-just-txt-default-color);
      border: var(--theme-just-border-width) solid var(--theme-just-border-default-color);
      border-radius: var(--theme-just-border-radius);

      position: absolute;
      z-index: 200;
      display: flex;
      flex-flow: column nowrap;
      align-items: start;
      gap: 5px;
      margin-top: 3px;
      width: 100%;

      .item {
        box-sizing: border-box;
        padding-left: 5px;
        width: 100%;
        height: 100%;

        &:hover {
          background: var(--theme-just-bg-hover-color);
        }
      }

      .item:first-child {
        border-top-left-radius: var(--theme-just-border-radius);
        border-top-right-radius: var(--theme-just-border-radius);
      }

      .item:last-child {
        border-bottom-left-radius: var(--theme-just-border-radius);
        border-bottom-right-radius: var(--theme-just-border-radius);
      }

      .item.selected {
        background: var(--theme-just-bg-selected-color);
        color: var(--theme-just-txt-selected-color);
      }
    }

    .header {
      background: var(--theme-just-bg-content-color);
      color: var(--theme-just-txt-default-color);
      border-radius: var(--theme-just-border-radius);
      border: var(--theme-just-border-width) solid var(--theme-just-border-default-color);

      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 2.5px;
      height: 100%;

      .field {
        flex-grow: 2;
        text-align: left;
        margin-left: 5px;
        margin-right: 5px;
      }

      .arrow-down {
        width: 0;
        height: 0;
        margin: auto 5px auto auto;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;

        border-top: 5px solid var(--theme-just-txt-default-color);
      }

      &:hover {
        border: var(--theme-just-border-width) solid var(--theme-just-border-hover-color);
        background: var(--theme-just-bg-hover-color)
      }
    }
  }
</style>