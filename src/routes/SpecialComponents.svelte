<script>
  import Flex from "$lib/components/Layout/Flex.svelte";
  import Label from "$lib/components/Label/Label.svelte";
  import Separator from "$lib/components/Separator/Separator.svelte";
  import { configuration } from "../appStore.js";
  import PropertyInspector from "$lib/components/PropertyInspector/PropertyInspector.svelte";
  import PropertyInspectorValueStore from "$lib/components/PropertyInspector/PropertyInspectorValueStore.svelte";
  import StoreValueLabel from "$lib/components/Utils/StoreValueLabel.svelte";
  import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
</script>

<Flex class="horizontal" flex="{['1', '1', '1']}" height="100%" width="100%">
  <Flex class="vertical" gap="10px">
    <PropertyInspector --columns="auto auto" height="300px" item="{$configuration}" let:key
                       title="Property Inspector">
      <Label slot="name">{$configuration[key].label}</Label>
      <PropertyInspectorValueStore item="{$configuration[key]}" slot="value"></PropertyInspectorValueStore>
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
  </Flex>
</Flex>

<style lang="scss">

</style>