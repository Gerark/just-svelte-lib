<script>
  import Button from "$lib/components/Button/Button.svelte";
  import Flex from "$lib/components/Layout/Flex.svelte";

  /**
   * @type {("horizontal"|"vertical")}
   * @prop {string} direction
   */
  export let direction;

  /**
   * @typedef {Array<{icon: string, onClick: function(): void}>} items
   */
  export let items = [];
  export let context = {};
</script>

<Flex class="thin {direction}" gap="2px" width="auto">
  {#each items as item (item)}
    <Button class="icon sm" tooltip="{item.description}"
            on:click={() => {item.onClick(context);}}>
      <i class="fa fa-{item.icon}"></i>
    </Button>
  {/each}
</Flex>

<style lang="scss">

</style>