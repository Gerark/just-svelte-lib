<script>
    import {getContext, onDestroy} from "svelte";

    export let data = {};
    let selected = false;

    let tabControl = getContext("tabControl");
    let dataId = tabControl.tabCollection.addItem(data);
    const unsubscribe = tabControl.currentTab.subscribe((id) => selected = id === dataId);

    $: tabControl.tabCollection.updateItem(dataId, data);

    onDestroy(() => {
        unsubscribe();
        tabControl.tabCollection.removeItem(dataId);
    });
</script>

{#if selected}
    <slot></slot>
{/if}

<style lang="scss">

</style>