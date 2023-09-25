<script>
    import TextBox from "$lib/components/TextBox/TextBox.svelte";
    import CheckBox from "$lib/components/CheckBox/CheckBox.svelte";
    import NumberBox from "$lib/components/TextBox/NumberBox.svelte";
    import EditableList from "$lib/components/EditableList/EditableList.svelte";
    import {fakeData} from "../../../appStore.js";

    export let item = {};
    $: store = item.store;
</script>

{#if typeof ($store) === "string"}
    <TextBox bind:value={$store} canReset="{false}">
    </TextBox>
{:else if typeof ($store) === "boolean"}
    <CheckBox bind:value={$store}></CheckBox>
{:else if typeof ($store) === "number"}
    <NumberBox bind:value={$store} valueType="number" canReset="{false}">
    </NumberBox>
{:else if Array.isArray($store)}
    <EditableList items="{$store}" on:copy={item.copy} on:create={item.create} on:listUpdated={item.listUpdated}
                  let:index type="{item.listType}">
        <TextBox bind:value={$store[index].label} canReset="{false}"></TextBox>
    </EditableList>
{/if}

<style lang="scss">

</style>