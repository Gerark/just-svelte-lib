<script>
    import TreeViewMenu from "$lib/components/TreeViewMenu/TreeViewMenu.svelte"
    import TreeView from "$lib/components/TreeView/TreeView.svelte";
    import EditableList from "../lib/components/EditableList/EditableList.svelte";
    import Select from "$lib/components/Select/Select.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import Theme from "$lib/components/Theme/Theme.svelte";
    import Panel from "$lib/components/Layout/Panel.svelte";
    import ButtonIcon from "$lib/components/Buttons/ButtonIcon.svelte";
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Overlay from "$lib/components/Layout/Overlay.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";
    import TextBox from "$lib/components/TextBox/TextBox.svelte";

    import {currentTheme, allThemes, fakeData} from "../appStore.js";

    function resetTheme() {
        currentTheme.set(($allThemes)[0].value);
    }

    function onListUpdated(ev) {
        fakeData.set(ev.detail);
    }

    function createListItem(ev) {
        ev.detail.result = {label: "New Item", id: generateQuickGUID(), items: []};
    }

    function copyListItem(ev) {
        let newItem = structuredClone(ev.detail.item);
        newItem.id = generateQuickGUID();
        ev.detail.result = newItem;
    }

    function generateQuickGUID() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }
</script>

<div>
    <Overlay>
        <Theme theme="{$currentTheme}">
            <Panel>
                <Flex direction="vertical" gap="10px" width="400px">
                    <Flex direction="horizontal" height="24px" width="100%">
                        <Label text="THEME: "></Label>
                        <Select bind:value="{$currentTheme}" items="{$allThemes}"/>
                        <ButtonIcon icon="sync" on:click={resetTheme} size="s"></ButtonIcon>
                    </Flex>
                    <Separator width="{2}"></Separator>
                    <TreeViewMenu
                            descriptionText="Expand a Folder to see the available items"
                            itemsStore="{fakeData}"
                            maxHeight="300px"
                            showDescription="{true}"
                            title="Test TreeViewMenu"></TreeViewMenu>

                    <Separator width="{2}"></Separator>
                    <TreeView appendItemsCount="{false}" descriptionText="Description" height="300px"
                              items="{$fakeData}" showDescription="{true}"></TreeView>
                    <Separator width="{2}"></Separator>
                    <EditableList height="1400px" items="{$fakeData}" let:index on:copy="{copyListItem}"
                                  on:create="{createListItem}"
                                  on:listUpdated={onListUpdated}
                                  title="Editable List">
                        <TextBox bind:value={$fakeData[index].label} canReset="{false}"></TextBox>
                    </EditableList>
                </Flex>
            </Panel>
        </Theme>
    </Overlay>
</div>

<style lang="scss">
</style>