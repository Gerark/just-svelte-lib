<script>
  import Flex from "$lib/components/Layout/Flex.svelte";
  import Label from "$lib/components/Label/Label.svelte";

  export let height = "100%";
  export let width = "100%";
  export let title = "";
  export let scrollableContent = true;
</script>

<Flex class="component thick vertical" flex="{['0']}" {height} {width}>
  <slot name="header">
    <Flex class="horizontal">
      <Label>{title}</Label>
    </Flex>
  </slot>
  <Flex class="content vertical thick {scrollableContent ? 'scrollable' : ''}">
    <slot name="content"></slot>
  </Flex>
</Flex>

<style lang="scss">

</style>