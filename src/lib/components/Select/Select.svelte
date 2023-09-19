<script>
    import {clickOutside} from "$lib/actions/clickOutside.js";

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
        <div class="dropdown">
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
    position: relative;
    user-select: none;
    width: 100%;
    border: 2px solid var(--theme-just-primary3);

    .dropdown {
      padding: 2.5px;
      background: var(--theme-just-primary3);
      color: var(--theme-just-text);

      position: absolute;
      z-index: 200;
      display: flex;
      flex-flow: column nowrap;
      align-items: start;
      margin-top: 3px;
      width: 100%;

      .item {
        box-sizing: border-box;
        padding-left: 5px;
        width: 100%;
        height: 100%;

        &:hover {
          background: var(--theme-just-primary2)
        }
      }

      .item.selected {
        background: var(--theme-just-active);
        color: var(--theme-just-textHighlight);
      }
    }

    .header {
      background: var(--theme-just-primary3);
      color: var(--theme-just-text);

      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      padding: 2.5px;

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

        border-top: 5px solid var(--theme-just-text);
      }

      &:hover {
        background: var(--theme-just-primary2)
      }
    }
  }
</style>