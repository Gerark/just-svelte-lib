<script>
  import Flex from "$lib/components/Layout/Flex.svelte";
  import Label from "$lib/components/Label/Label.svelte";
  import ButtonToolbar from "$lib/components/Button/ButtonToolbar.svelte";

  export let title;
  export let actions;
</script>

<Flex class="horizontal" flex="{['3']}" width="100%">
  <Label --label-align="left">{title}</Label>
  <ButtonToolbar direction="horizontal" items="{actions}"></ButtonToolbar>
</Flex>

<style lang="scss">

</style>