<script>
    import {clickOutside} from "$lib/actions/clickOutside.js";
    import {popupSource, popupTarget} from "$lib/actions/popup.js";
    import SelectDropDown from "$lib/components/Select/SelectDropDown.svelte";
    import {generateQuickGUID} from "$lib/utils/guid.js";
    import {writable} from "svelte/store";
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Typography from "$lib/components/Typography/Typography.svelte";
    import ArrowTip from "$lib/components/Utils/ArrowTip.svelte";

    export let items = [];
    export let value = {};
    export let width = "100%";
    export let dropdownMaxHeight = "auto";
    export let placeHolderLabel = "Select...";

    let showDropDown = writable(false);
    let dropDownDiv = null;

    let selectId = 'select-' + generateQuickGUID();
    let popupSettings = {
        popupId: selectId,
        flagStore: showDropDown
    };

    $: currentItem = items.find((x) => {
        return x.value === value;
    });

    function toggleDropDown() {
        showDropDown.update((value) => {
            return !value
        });
    }

    function hideDropDown() {
        showDropDown.set(false);
    }

    function selectItem(event) {
        value = event.detail.value;
        hideDropDown();
    }

    function isOutside(node, target) {
        return (!dropDownDiv || !dropDownDiv.contains(target));
    }
</script>

<div style:position="relative" style:width="{width}"
     use:clickOutside="{{callback: hideDropDown, isEnabled: () => $showDropDown, isOutside }}">
    <div class="panel panel-hover padding" on:click={toggleDropDown} on:keydown={toggleDropDown} role="button"
         style:height="100%" style:width="100%"
         tabindex="0"
         use:popupSource={popupSettings}>
        <Flex class="horizontal">
            {#if currentItem}
                <slot item={currentItem}>
                    <Typography class="size-md">{currentItem.label}</Typography>
                </slot>
            {:else}
                <Typography class="size-md">{placeHolderLabel}</Typography>
            {/if}
            <ArrowTip rotation="{$showDropDown ? '180deg' : '0deg'}"></ArrowTip>
        </Flex>
    </div>
    <div style:box-sizing="border-box" style:width="100%" style:z-index="9999"
         use:popupTarget={{popupId: selectId, placement: 'bottom', delay: { show: 100, hide: 150 }, offset: 5}}>
        {#if $showDropDown}
            <SelectDropDown
                    bind:value={value}
                    {items}
                    maxHeight="{dropdownMaxHeight}" on:itemselect={selectItem} let:item>
                <slot {item}>
                    <Typography class="size-md">{item.label}</Typography>
                </slot>
            </SelectDropDown>
        {/if}
    </div>
</div>

<style lang="scss">
  .padding {
    box-sizing: border-box;
    padding: 0 var(--tjust-padding-xl);
  }
</style>