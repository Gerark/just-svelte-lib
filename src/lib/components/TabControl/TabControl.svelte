<script>
  import Flex from "$lib/components/Layout/Flex.svelte";
  import { onDestroy, setContext } from "svelte";
  import Button from "$lib/components/Button/Button.svelte";
  import { writable } from "svelte/store";
  import Separator from "$lib/components/Separator/Separator.svelte";
  import { generateQuickGUID } from "$lib/utils/guid.js";
  import { flip } from "svelte/animate";

  /**
   * Tab Data Object
   * @typedef {Object} TabDataObject
   * @property {String} id - internal identifier
   * @property {Object} data - data carried by each tab item
   */

  /**
   * @type {import("svelte/store").Writable<Array<TabDataObject>>}
   */
  let tabs = writable([]);

  /**
   * @type {import("svelte/store").Writable<String>}
   */
  let currentTab = writable("");

  let selections = [];
  const unsubscribe = tabs.subscribe((newVal) => {
    selections = [];
    newVal.forEach((tab, i) => {
      selections.push(i);
    });
  });

  onDestroy(unsubscribe);

  setContext("tabControl", {
    /**
     * @param {TabDataObject} tab
     */
    register: (tab) => {
      let id = generateQuickGUID();
      if ($tabs.length === 0 || $currentTab === "") {
        setCurrentTab(id);
      }
      tabs.update((val) => {
        val.push({ "id": id, "data": tab });
        return val;
      });
      return id;
    },
    /**
     * @param {String} id
     */
    unregister: (id) => {
      let index = $tabs.findIndex(x => {
        return x.id === id;
      });
      if (index !== 1) {
        tabs.update((val) => {
          val.splice(index, 1);
          return val;
        });
        if ($currentTab === id) {
          setCurrentTab("");
        }
      }
    },
    /**
     * @param {String} dataId
     * @param {TabDataObject} data
     */
    updateData: (id, data) => {
      let index = $tabs.findIndex(x => {
        return x.id === id;
      });
      if (index !== -1) {
        tabs.update((val) => {
          val[index].data = data;
          return val;
        });
      }
    },
    currentTab
  });

  /**
   * @param {TabDataObject} tab
   */
  function onHeaderButtonClick(tab) {
    setCurrentTab(tab.id);
  }

  /**
   * @param {String} tabId
   */
  function setCurrentTab(tabId) {
    $currentTab = tabId;

    let tabIndex = $tabs.findIndex(x => {
      return x.id === tabId;
    });

    if (tabIndex !== -1) {
      let currentSelectionIndex = selections.findIndex(x => x === 0);
      if (currentSelectionIndex !== -1) {
        selections[currentSelectionIndex] = selections[tabIndex];
        selections[tabIndex] = 0;
      }
    }
  }
</script>

<Flex class="component vertical" flex="{['0']}" gap="0">
  <Flex class="component vertical" gap="0">
    <Flex class="component horizontal" gap="0">
      {#each $tabs as tab (tab.id)}
        <Button class="btn md flat" --width="100%" --height="100%"
                on:click={() => { onHeaderButtonClick(tab) }}
                enabled="{tab.id !== $currentTab}">
          <Flex class="vertical" gap="0">
            <slot name="header" tab="{tab.data}">
              <span>{tab.data.header}</span>
            </slot>
          </Flex>
        </Button>
      {/each}
    </Flex>
    <Flex class="component horizontal" gap="0">
      {#each selections as selection (selection)}
        <div style="width:100%" animate:flip|local={{duration: 125}}>
          <Separator class="{selection === 0 ? 'secondary' : 'transparent'} sm">
          </Separator>
        </div>
      {/each}
    </Flex>
  </Flex>
  <Separator>
  </Separator>
  <Flex class="content vertical thick scrollable">
    <slot></slot>
  </Flex>
</Flex>

<style lang="scss">

</style>