<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import {configuration, fakeData} from "../appStore.js";
    import PropertyInspector from "$lib/components/PropertyInspector/PropertyInspector.svelte";
    import PropertyInspectorValueStore from "$lib/components/PropertyInspector/PropertyInspectorValueStore.svelte";
    import StoreValueLabel from "$lib/components/Utils/StoreValueLabel.svelte";
    import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import ContextMenu from "$lib/components/Tooltip/ContextMenu.svelte";
    import {popupSource} from "$lib/actions/popup.js";
    import {createContextMenuStore} from "$lib/components/Tooltip/contextMenuStore.js";
    import TreeViewMenu from "$lib/components/TreeViewMenu/TreeViewMenu.svelte";

    let contextMenuStore = createContextMenuStore("testContextMenu");

    function onContextMenuButtonClick() {
        contextMenuStore.show();
    }

    let tooltipTest = "CIAONE";
    let i = 0;
    setInterval(() => {
        tooltipTest = "CIAONE" + i;
        i++;
        console.log(tooltipTest);
    }, 500);
</script>

<Flex class="horizontal" flex="{['1', '1', '1']}" height="100%" width="100%">
    <Flex class="vertical" gap="10px">
        <PropertyInspector --columns="auto auto" height="300px" item="{$configuration}"
                           title="Property Inspector">
            <Label let:key slot="name">{$configuration[key].label}</Label>
            <PropertyInspectorValueStore item="{$configuration[key]}" let:key
                                         slot="value"></PropertyInspectorValueStore>
        </PropertyInspector>
    </Flex>
    <Flex class="vertical" gap="10px">
        <div style:max-height="300px" style:min-height="300px" style:width="100%">
            <HeaderBox height="300px" title="Configuration Object">
                <svelte:fragment slot="content">
                    {#each Object.entries($configuration) as [key, value]}
                        <div style:display="flex" style:flex-flow="row nowrap" style:width="100%">
                            {key} :
                            <StoreValueLabel store="{value.store}"></StoreValueLabel>
                        </div>
                    {/each}
                </svelte:fragment>
            </HeaderBox>
        </div>
    </Flex>
    <Flex class="vertical" gap="10px">
        <Button actions="{[{run: popupSource, params: {popupId: 'testContextMenu', flagStore: $contextMenuStore.visibilityFlag}}]}"
                class="btn lg"
                on:click={onContextMenuButtonClick}>Context Menu
        </Button>
        <Button class="btn lg" tooltip="{tooltipTest}">HELLO</Button>
        <ContextMenu {contextMenuStore}>
            <div class="panel shadow-panel" style:min-width="200px" style:padding="5px" style:width="200px">
                <TreeViewMenu
                        descriptionText="Expand a Folder to see the available items"
                        itemsStore="{fakeData}"
                        on:leafselected={() => {contextMenuStore.hide()}}
                        showDescription="{true}"
                        title="TreeViewMenu">
                </TreeViewMenu>
            </div>
        </ContextMenu>
    </Flex>
</Flex>

<style lang="scss">

</style>