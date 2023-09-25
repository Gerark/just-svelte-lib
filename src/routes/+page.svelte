<script>
    import Theme from "$lib/components/Theme/Theme.svelte";
    import Panel from "$lib/components/Layout/Panel.svelte";
    import Overlay from "$lib/components/Layout/Overlay.svelte";
    import FirstTestColumn from "./FirstTestColumn.svelte";
    import SecondTestColumn from "./SecondTestColumn.svelte";
    import HeaderTestColumn from "./HeaderTestColumn.svelte";

    import {currentTheme, fakeData, currentItem} from "../appStore.js";
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";

    function onListUpdated(ev) {
        fakeData.set(ev.detail);
    }

    function createListItem(ev) {
        ev.detail.result = {label: "New Item", items: []};
    }

    function copyListItem(ev) {
        let newItem = structuredClone(ev.detail.item);
        ev.detail.result = newItem;
    }

    function onItemSelected(ev) {
        currentItem.set(ev.detail);
    }
</script>

<div>
    <Overlay>
        <Theme theme="{$currentTheme}">
            <Panel>
                <Flex class="background" direction="vertical" gap="10px" height="100%" width="100%">
                    <HeaderTestColumn></HeaderTestColumn>
                    <Separator width="{2}"></Separator>
                    <Flex direction="horizontal" height="100%" width="100%">
                        <Flex direction="vertical" gap="10px" width="400px">
                            <FirstTestColumn on:copy={copyListItem} on:create={createListItem}
                                             on:folderselected={onItemSelected} on:leafselected={onItemSelected}
                                             on:listUpdated={onListUpdated}>
                            </FirstTestColumn>
                        </Flex>
                        <Flex direction="vertical" gap="10px" width="400px">
                            <SecondTestColumn>
                            </SecondTestColumn>
                        </Flex>
                    </Flex>
                </Flex>
            </Panel>
        </Theme>
    </Overlay>
</div>

<style lang="scss">
</style>