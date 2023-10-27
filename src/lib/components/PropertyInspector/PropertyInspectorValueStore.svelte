<script>
    import TextBox from "$lib/components/TextBox/TextBox.svelte";
    import CheckBox from "$lib/components/CheckBox/CheckBox.svelte";
    import NumberBox from "$lib/components/TextBox/NumberBox.svelte";
    import EditableList from "$lib/components/EditableList/EditableList.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import Select from "$lib/components/Select/Select.svelte";

    export let item = {};
    $: store = item.store;
    $: valuesStore = item.type === "Enum" ? item.values : null;
</script>

{#if item.type === "Text"}
    <TextBox bind:value={$store} canReset="{false}">
    </TextBox>
{:else if typeof ($store) === "boolean"}
    <CheckBox bind:value={$store}></CheckBox>
{:else if item.type === "Number"}
    <NumberBox bind:value={$store} valueType="number" canReset="{false}">
    </NumberBox>
{:else if Array.isArray($store)}
    <EditableList items="{$store}" on:copy={item.copy} on:create={item.create} on:listUpdated={item.listUpdated}
                  let:index dndzone="{item.dndzone}">
        <TextBox bind:value={$store[index].label} canReset="{false}"></TextBox>
    </EditableList>
{:else if item.type === "Enum"}
    <Select items="{$valuesStore}" bind:value="{$store}"></Select>
{:else if item.type === "Function"}
    <Button class="btn primary md" on:click={() => { $store(); }}>
        {item.actionLabel || "Execute"}
    </Button>
{/if}

<style lang="scss">

</style>