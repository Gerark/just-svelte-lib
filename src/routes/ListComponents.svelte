<script>
  import Flex from "$lib/components/Layout/Flex.svelte";
  import { fakeData, currentItem } from "../appStore.js";
  import TreeView from "$lib/components/TreeView/TreeView.svelte";
  import TreeViewMenu from "$lib/components/TreeViewMenu/TreeViewMenu.svelte";
  import TextBox from "$lib/components/TextBox/TextBox.svelte";
  import Separator from "$lib/components/Separator/Separator.svelte";
  import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
  import EditableList from "$lib/components/EditableList/EditableList.svelte";

  function onListUpdated(ev) {
    fakeData.set(ev.detail);
  }

  function createListItem(ev) {
    ev.detail.result = { label: "New Item", items: [] };
  }

  function copyListItem(ev) {
    let newItem = structuredClone(ev.detail.item);
    ev.detail.result = newItem;
  }

  function onItemSelected(ev) {
    currentItem.set(ev.detail);
  }

  function onValueChanged(ev, nodeItem) {
    nodeItem.label = ev.detail;
    fakeData.update(x => x);
  }

</script>

<Flex class="horizontal" flex="{['1', '1', '1']}" height="100%" width="100%">
  <Flex class="vertical" gap="10px" width="400px">
    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <TreeViewMenu
        descriptionText="Expand a Folder to see the available items"
        itemsStore="{fakeData}"
        on:folderselected={onItemSelected} on:leafselected={onItemSelected} showDescription="{true}"
        title="TreeViewMenu">
      </TreeViewMenu>
    </div>

    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <HeaderBox title="TreeView">
        <TreeView descriptionText="Description" items="{$fakeData}"
                  on:folderselected={onItemSelected} on:leafselected={onItemSelected} showDescription="{true}"
                  slot="content">
          <svelte:fragment let:nodeItem slot="item">
            <TextBox on:valuechanged={(ev) => onValueChanged(ev, nodeItem)} value={nodeItem.label}>
            </TextBox>
          </svelte:fragment>
        </TreeView>
      </HeaderBox>
    </div>
  </Flex>
  <Flex class="vertical" gap="10px" width="400px">

    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <EditableList dndzone="treeRoots" items="{$fakeData}" let:index
                    on:copy={copyListItem}
                    on:create={createListItem}
                    on:listUpdated={onListUpdated} title="Editable List">
        <TextBox bind:value={$fakeData[index].label} canReset="{false}"></TextBox>
      </EditableList>
    </div>
  </Flex>
  <Flex class="vertical" gap="10px" width="400px">
  </Flex>
</Flex>

<style lang="scss">

</style>