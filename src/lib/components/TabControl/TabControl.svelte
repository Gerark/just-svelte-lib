<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import {onDestroy, setContext} from "svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import {writable} from "svelte/store";
    import Separator from "$lib/components/Separator/Separator.svelte";
    import {flip} from "svelte/animate";
    import {ElementCollection} from "$lib/utils/elementCollection.js";

    let selections = [];

    let tabCollection = new ElementCollection();
    const preAddItemUnsubscribe = tabCollection.onPreAddItem((id) => {
        if (tabCollection.length === 0 || $currentTab === "") {
            setCurrentTab(id);
        }
    });
    const postRemoveItemUnsubscribe = tabCollection.onPostRemoveItem((id) => {
        if ($currentTab === id) {
            setCurrentTab('');
        }
    });
    const collectionChangedUnsubscribe = tabCollection.subscribe((newVal) => {
        selections = [];
        newVal.forEach((tab, i) => {
            selections.push(i);
        });
    });

    onDestroy(() => {
        preAddItemUnsubscribe();
        collectionChangedUnsubscribe();
        postRemoveItemUnsubscribe();
    })

    /**
     * @type {import("svelte/store").Writable<String>}
     */
    let currentTab = writable("");

    setContext("tabControl", {
        tabCollection,
        currentTab
    });

    /**
     * @param {TabDataObject} tab
     */
    function onHeaderButtonClick(tab) {
        setCurrentTab(tab.id);
    }

    /**
     * @param {String} tabId
     */
    function setCurrentTab(tabId) {
        $currentTab = tabId;

        let tabIndex = tabCollection.getIndex(tabId);
        if (tabIndex !== -1) {
            let currentSelectionIndex = selections.findIndex(x => x === 0);
            if (currentSelectionIndex !== -1) {
                selections[currentSelectionIndex] = selections[tabIndex];
                selections[tabIndex] = 0;
            }
        }
    }
</script>

<Flex class="component vertical" flex="{['0']}" gap="0">
    <Flex class="component vertical" gap="0">
        <Flex class="component horizontal" gap="0">
            {#each $tabCollection as tab (tab.id)}
                <Button class="btn md flat" width="100%" height="100%"
                        on:click={() => { onHeaderButtonClick(tab) }}
                        enabled="{tab.id !== $currentTab}">
                    <Flex class="vertical" gap="0">
                        <slot name="header" tab="{tab.data}">
                            <span>{tab.data.header}</span>
                        </slot>
                    </Flex>
                </Button>
            {/each}
        </Flex>
        <Flex class="component horizontal" gap="0">
            {#each selections as selection (selection)}
                <div style="width:100%" animate:flip|local={{duration: 125}}>
                    <Separator class="{selection === 0 ? 'secondary' : 'transparent'} sm">
                    </Separator>
                </div>
            {/each}
        </Flex>
    </Flex>
    <Separator>
    </Separator>
    <Flex class="content vertical thick scrollable">
        <slot></slot>
    </Flex>
</Flex>

<style lang="scss">

</style>