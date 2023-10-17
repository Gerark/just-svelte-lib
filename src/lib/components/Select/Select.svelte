<script>
  import { clickOutside } from "$lib/actions/clickOutside.js";
  import SelectDropDown from "$lib/components/Select/SelectDropDown.svelte";

  export let items = [];
  export let value = {};
  export let dropdownMaxHeight = "auto";
  export let placeHolderLabel = "Select...";

  let showDropDown = false;
  let dropDownDiv = null;
  let currentDropDown = null;
  let headerElement = null;

  $: currentItem = items.find((x) => {
    return x.value === value;
  });
  $: if (dropDownDiv && currentDropDown) {
    currentDropDown.value = value;
  }

  function toggleDropDown() {
    updateDropDown(!showDropDown);
  }

  function hideDropDown() {
    updateDropDown(false);
  }

  function selectItem(event) {
    value = event.detail.value;
    hideDropDown();
  }

  function updateDropDown(newShowDropDown) {
    let prevValue = showDropDown;
    showDropDown = newShowDropDown;
    if (showDropDown != prevValue) {
      if (showDropDown) {
        dropDownDiv = document.createElement("div");
        createDropDown();
        document.documentElement.appendChild(dropDownDiv);
        window.addEventListener("scroll", updateDropDownPosition, true);
      } else if (dropDownDiv) {
        document.documentElement.removeChild(dropDownDiv);
        window.removeEventListener("scroll", updateDropDownPosition, true);
        dropDownDiv = null;
        currentDropDown = null;
      }
    }
  }

  function createDropDown() {
    currentDropDown = new SelectDropDown({
      target: dropDownDiv,
      props: {
        items: items,
        value: value,
        maxHeight: dropdownMaxHeight
      }
    });
    currentDropDown.$on("itemselect", selectItem);
    let computedStyle = getComputedStyle(headerElement);
    let boundingRect = headerElement.getBoundingClientRect();
    dropDownDiv.style.setProperty("position", "absolute");
    dropDownDiv.style.setProperty("width", computedStyle.width);
    dropDownDiv.style.setProperty("top", boundingRect.y + boundingRect.height + "px");
    dropDownDiv.style.setProperty("left", boundingRect.x + "px");
    dropDownDiv.style.setProperty("height", computedStyle.height);
    dropDownDiv.style.setProperty("z-index", 9999);
  }

  function updateDropDownPosition() {
    let boundingRect = headerElement.getBoundingClientRect();
    dropDownDiv.style.setProperty("top", boundingRect.y + boundingRect.height + "px");
    dropDownDiv.style.setProperty("left", boundingRect.x + "px");
  }

  function isOutside(node, target) {
    return (!dropDownDiv || !dropDownDiv.contains(target));
  }
</script>

<div class="just-select"
     use:clickOutside={{callback: hideDropDown, isEnabled: () => showDropDown, isOutside }}>
  <div bind:this={headerElement} class="header" on:click={toggleDropDown}
       on:keydown={toggleDropDown}>
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
    width: calc(100% - var(--tjust-padding-thin) * 2);
    margin: 0 var(--tjust-padding-thin);

    .header {
      background: var(--tjust-bg-content-color);
      color: var(--tjust-txt-default-color);
      border-radius: var(--tjust-border-radius);
      border: var(--tjust-border-width) solid var(--tjust-border-default-color);

      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: var(--tjust-font-size-sm);
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

        border-top: 5px solid var(--tjust-txt-default-color);
        transition: rotate var(--tjust-animation-click-duration);
      }

      .rotate {
        rotate: 180deg;
        transition: rotate var(--tjust-animation-click-duration);
      }

      &:hover {
        border: var(--tjust-border-width) solid var(--tjust-border-hover-color);
        background: var(--tjust-bg-hover-color)
      }
    }
  }
</style>