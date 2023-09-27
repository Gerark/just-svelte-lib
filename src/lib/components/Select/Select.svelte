<script>
    import {clickOutside} from "$lib/actions/clickOutside.js";
    import {scrollOutside} from "$lib/actions/scrollOutside.js";
    import SelectDropDown from "$lib/components/Select/SelectDropDown.svelte";

    export let items = [];
    export let value = {};
    export let dropdownHeight = "auto";
    export let placeHolderLabel = "Select...";

    let showDropDown = false;
    let dropDownDiv = null;
    let headerElement = null;

    $: currentItem = items.find((x) => {
        return x.value === value;
    });

    function toggleDropDown() {
        showDropDown = !showDropDown;
        updateDropDown();
    }

    function hideDropDown() {
        showDropDown = false;
        updateDropDown();
    }

    function selectItem(event) {
        value = event.detail.value;
    }

    function updateDropDown() {
        if (showDropDown) {
            dropDownDiv = document.createElement('div');
            createDropDown();
            document.documentElement.appendChild(dropDownDiv);
        } else if (dropDownDiv) {
            document.documentElement.removeChild(dropDownDiv);
        }
    }

    function createDropDown() {
        let dropDown = new SelectDropDown({
            target: dropDownDiv,
            props: {
                items: items,
                value: value,
                height: dropdownHeight
            }
        });
        dropDown.$on("itemselect", selectItem);
        let computedStyle = getComputedStyle(headerElement);
        let boundingRect = headerElement.getBoundingClientRect();
        dropDownDiv.style.setProperty("position", "absolute");
        dropDownDiv.style.setProperty("width", computedStyle.width);
        dropDownDiv.style.setProperty("top", boundingRect.y + boundingRect.height + "px");
        dropDownDiv.style.setProperty("left", boundingRect.x + "px");
        dropDownDiv.style.setProperty("height", computedStyle.height);
        dropDownDiv.style.setProperty("z-index", 9999);
    }
</script>

<div class="just-select"
     use:clickOutside={{callback: hideDropDown, isEnabled: () => showDropDown}}
     use:scrollOutside={{callback: hideDropDown, isEnabled: () => showDropDown}}>
    <div bind:this={headerElement} class="header" on:click={toggleDropDown} on:keydown={toggleDropDown}>
        <div class="field">
            {#if currentItem}
                <slot item={currentItem}>
                    <span>{currentItem.label}</span>
                </slot>
            {:else}
                <span>{placeHolderLabel}</span>
            {/if}
        </div>
        <div class="arrow-down" class:rotate="{showDropDown}">
        </div>
    </div>
</div>

<style lang="scss">
  .just-select {
    box-sizing: border-box;
    position: relative;
    user-select: none;
    width: 100%;

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
        rotate: 0deg;
        margin: auto 5px auto auto;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;

        border-top: 5px solid var(--theme-just-txt-default-color);
        transition: rotate var(--theme-just-animation-click-duration);
      }

      .rotate {
        rotate: 180deg;
        transition: rotate var(--theme-just-animation-click-duration);
      }

      &:hover {
        border: var(--theme-just-border-width) solid var(--theme-just-border-hover-color);
        background: var(--theme-just-bg-hover-color)
      }
    }
  }
</style>