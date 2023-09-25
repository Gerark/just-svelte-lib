<script>
    import {fakeData} from "../appStore.js";
    import EditableList from "$lib/components/EditableList/EditableList.svelte";
    import TreeView from "$lib/components/TreeView/TreeView.svelte";
    import TreeViewMenu from "$lib/components/TreeViewMenu/TreeViewMenu.svelte";
    import TextBox from "$lib/components/TextBox/TextBox.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";
    import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";

    function onValueChanged(ev, nodeItem) {
        nodeItem.label = ev.detail;
        fakeData.update(x => x);
    }
</script>

<div style:max-height="300px" style:min-height="300px" style:width="100%">
    <TreeViewMenu
            descriptionText="Expand a Folder to see the available items"
            itemsStore="{fakeData}"
            on:folderselected on:leafselected showDescription="{true}" title="TreeViewMenu">
    </TreeViewMenu>
</div>

<Separator width="{2}"></Separator>

<div style:max-height="300px" style:min-height="300px" style:width="100%">
    <HeaderBox title="TreeView">
        <TreeView descriptionText="Description" items="{$fakeData}"
                  on:folderselected on:leafselected showDescription="{true}" slot="content">
            <svelte:fragment let:nodeItem slot="item">
                <TextBox on:valuechanged={(ev) => onValueChanged(ev, nodeItem)} value={nodeItem.label}>
                </TextBox>
            </svelte:fragment>
        </TreeView>
    </HeaderBox>
</div>

<Separator width="{2}"></Separator>

<div style:max-height="300px" style:min-height="300px" style:width="100%">
    <EditableList items="{$fakeData}" let:index on:copy
                  on:create
                  on:listUpdated
                  title="Editable List" type="treeRoots">
        <TextBox bind:value={$fakeData[index].label} canReset="{false}"></TextBox>
    </EditableList>
</div>