<script>
  import { getContext, onDestroy } from "svelte";

  /**
   *  @type {import("./TabControl.svelte").TabDataObject}
   */
  export let data = {};
  let selected = false;

  let tabControl = getContext("tabControl");
  let dataId = tabControl.register(data);
  const unsubscribe = tabControl.currentTab.subscribe(
    /**
     * @param {String} id
     */
    (id) => {
      selected = id === dataId;
    }
  );

  $: {
    tabControl.updateData(dataId, data);
  }

  onDestroy(() => {
    unsubscribe();
    tabControl.unregister(data);
  });
</script>

{#if selected}
  <slot></slot>
{/if}

<style lang="scss">

</style>