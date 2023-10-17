<script>
    import EditableListItem from "$lib/components/EditableList/EditableListItem.svelte";
    import { flip } from "svelte/animate";
    import { createEventDispatcher } from "svelte";
    import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SOURCES, TRIGGERS } from "svelte-dnd-action";

    export let items;
    export let itemActions;
    export let dndzoneType;

    let isDragging = false;
    let dragDisabled = true;

    const dispatch = createEventDispatcher();

    function onGripDown() {
        dragDisabled = false;
        isDragging = true;
    }

    function onGripUp() {
        dragDisabled = false;
        isDragging = false;
    }

    function handleDndConsider(event) {
        const { items: newItems, info: { source, trigger } } = event.detail;
        items = newItems;

        if (trigger === TRIGGERS.DRAG_STARTED) {
            isDragging = true;
        }

        if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
            dragDisabled = true;
            isDragging = false;
        }
    }

    function handleDndFinalize(event) {
        const { items: newItems, info: { source, trigger } } = event.detail;
        items = newItems;
        // Ensure dragging is stopped on drag finish via keyboard
        if (source === SOURCES.POINTER) {
            dragDisabled = true;
            isDragging = false;
        }
        dispatch("itemmoved", items);
    }

    let dropTargetStyle = { outline: "none" };
    let flipDurationMs = 125;
</script>

<div class="content" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}"
     use:dndzone="{{items, flipDurationMs, dropTargetStyle, dragDisabled, type: dndzoneType}}">
    {#each items as item (item.id)}
        <div style:width="100%" animate:flip={{duration: 125}} style:cursor="{isDragging ? 'grabbing' : 'grab'}">
            {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
                <div class="custom-shadow-item">{item.label}</div>
            {:else}
                <EditableListItem {item} actions="{itemActions}" on:gripdown={onGripDown} on:gripup={onGripUp}
                                  {isDragging}>
                    <slot {item} index="{item.index}"></slot>
                </EditableListItem>
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
  .content {
    background: var(--tjust-bg-content-color);
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .custom-shadow-item {
    visibility: visible;
    background: var(--tjust-bg-hover-color);
    color: transparent;
  }
</style>