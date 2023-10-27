<script>
    import {createEventDispatcher, onMount} from "svelte";
    import EditableListHeader from "$lib/components/EditableList/EditableListHeader.svelte";
    import EditableListContent from "$lib/components/EditableList/EditableListContent.svelte";
    import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
    import {generateQuickGUID} from "$lib/utils/guid.js";

    export let title = "";
    export let items = [];
    export let height = "100%";
    export let dndzone = "";

    let headerActions = [
        {
            icon: "plus",
            description: "Create Item",
            onClick: () => {
                addAtIndex(0, createItem());
            }
        }
    ];

    let itemActions = [
        {
            icon: "plus",
            description: "Insert Item",
            onClick: item => {
                addAfterItem(item, createItem());
            }
        },
        {
            icon: "copy",
            description: "Duplicate Item",
            onClick: item => {
                addAfterItem(item, copyItem(item));
            }
        },
        {
            icon: "trash",
            description: "Remove Item",
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
        if (items) {
            let index = 0;
            items.forEach(x => {
                x.index = index;
                index++;
            });
        }
    }

    function createItem() {
        let detail = {result: null};
        dispatch("create", detail);
        detail.result.id = generateQuickGUID();
        return detail.result;
    }

    function copyItem(item) {
        let detail = {item, result: null};
        dispatch("copy", detail);
        detail.result.id = generateQuickGUID();
        return detail.result;
    }
</script>

<HeaderBox {height} {title}>
    <EditableListHeader actions="{headerActions}" slot="header" {title}></EditableListHeader>
    <svelte:fragment slot="content">
        <EditableListContent dndzoneType="{dndzone}" {itemActions} {items} let:index let:item
                             on:itemmoved={onItemMoved}>
            <slot {index} {item}></slot>
        </EditableListContent>
    </svelte:fragment>
</HeaderBox>

<style lang="scss">
</style>