<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import EditableListHeader from "$lib/components/EditableList/EditableListHeader.svelte";
    import EditableListContent from "$lib/components/EditableList/EditableListContent.svelte";

    export let title = "";
    export let items = [];
    export let height = "auto";

    let headerActions = [
        {
            icon: "plus",
            onClick: () => {
                addAtIndex(0, createItem());
            }
        }
    ];

    let itemActions = [
        {
            icon: "plus",
            onClick: item => {
                addAfterItem(item, createItem());
            }
        },
        {
            icon: "copy",
            onClick: item => {
                addAfterItem(item, copyItem(item));
            }
        },
        {
            icon: "trash",
            onClick: item => {
                removeAtIndex(items.indexOf(item));
            }
        }
    ];

    const dispatch = createEventDispatcher();

    updateIndices();
    onMount(() => {
        updateIndices();
    });

    function addAfterItem(item, itemToAdd) {
        const index = items.indexOf(item);
        if (index > -1) {
            addAtIndex(index + 1, itemToAdd);
        }
    }

    function addAtIndex(index, item) {
        items.splice(index, 0, item);
        dispatchListUpdated();
    }

    function removeAtIndex(index) {
        if (index > -1) {
            items.splice(index, 1);
            dispatchListUpdated();
        }
    }

    function dispatchListUpdated() {
        updateIndices();
        dispatch("listUpdated", items);
    }

    function onItemMoved(event) {
        items = event.detail;
        dispatchListUpdated();
    }

    function updateIndices() {
        let index = 0;
        items.forEach(x => {
            x.index = index;
            index++;
        });
    }

    function createItem() {
        let detail = {result: null};
        dispatch("create", detail);
        return detail.result;
    }

    function copyItem(item) {
        let detail = {item, result: null};
        dispatch("copy", detail);
        return detail.result;
    }
</script>

<Flex class="frame thick clip-overflow" direction="vertical" flex="{['0', '3']}" {height} width="100%">
    <EditableListHeader actions="{headerActions}" {title}></EditableListHeader>
    <EditableListContent {itemActions} {items} let:index let:item on:itemmoved={onItemMoved}>
        <slot {index} {item}></slot>
    </EditableListContent>
</Flex>

<style lang="scss">
</style>