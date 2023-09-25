<script>
    import PropertyInspector from "$lib/components/PropertyInspector/PropertyInspector.svelte";
    import {currentItem, fakeData, configuration} from "../appStore.js";
    import PropertyInspectorValueStore from "$lib/components/PropertyInspector/PropertyInspectorValueStore.svelte";
    import StoreValueLabel from "$lib/components/Utils/StoreValueLabel.svelte";
    import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
    import Separator from "$lib/components/Separator/Separator.svelte";

    $: {
        $currentItem;
        fakeData.update((current) => current);
    }
</script>

<PropertyInspector height="300px" item="{$configuration}" let:key title="Property Inspector">
    <span slot="name">{$configuration[key].label}</span>
    <PropertyInspectorValueStore item="{$configuration[key]}" slot="value"></PropertyInspectorValueStore>
</PropertyInspector>

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