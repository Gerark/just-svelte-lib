<script>
    import PropertyInspector from "$lib/components/PropertyInspector/PropertyInspector.svelte";
    import {currentItem, fakeData, configuration} from "../appStore.js";
    import PropertyInspectorValueStore from "$lib/components/PropertyInspector/PropertyInspectorValueStore.svelte";
    import StoreValueLabel from "$lib/components/Utils/StoreValueLabel.svelte";
    import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";
    import Select from "$lib/components/Select/Select.svelte";
    import CheckBox from "$lib/components/CheckBox/CheckBox.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import TextBox from "$lib/components/TextBox/TextBox.svelte";
    import NumberBox from "$lib/components/TextBox/NumberBox.svelte";
    import ButtonIcon from "$lib/components/Buttons/ButtonIcon.svelte";

    $: {
        $currentItem;
        fakeData.update((current) => current);
    }

    let options = [
        {id: 0, label: "Option 1", value: 0},
        {id: 1, label: "Option 2", value: 1},
        {id: 2, label: "Option 3", value: 2},
        {id: 3, label: "Option 4", value: 3},
        {id: 4, label: "Option 5", value: 4}
    ]
    let currentOption = 2;
    let checkboxValue = false;
    let textboxValue = "";
    let numberValue = 0;
</script>

<PropertyInspector height="300px" item="{$configuration}" let:key title="Property Inspector">
    <span slot="name">{$configuration[key].label}</span>
    <PropertyInspectorValueStore item="{$configuration[key]}" slot="value"></PropertyInspectorValueStore>
</PropertyInspector>

<Separator width="{2}"></Separator>

<HeaderBox height="300px" title="Common Components">
    <svelte:fragment slot="content">
        <Label>Label Component</Label>
        <TextBox bind:value={textboxValue} canReset="{true}" defaultIcon="circle"
                 placeHolderText="Textbox Component..."></TextBox>
        <NumberBox bind:value={numberValue} canReset="{false}" placeHolderText="NumberBox Component..."></NumberBox>
        <Separator></Separator>
        <Select bind:value={currentOption} dropdownHeight="50px" items="{options}"></Select>
        <CheckBox bind:value={checkboxValue} label="Checkbox"></CheckBox>
        <ButtonIcon icon="cog" size="m" tooltip="Tooltip!"></ButtonIcon>
    </svelte:fragment>
</HeaderBox>

<Separator width="{2}"></Separator>

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