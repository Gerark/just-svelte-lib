<script>
  import Label from "$lib/components/Label/Label.svelte";
  import Flex from "$lib/components/Layout/Flex.svelte";
  import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";

  export let item = "";
  export let title;
  export let height = "100%";
  export let width = "100%";
</script>

<HeaderBox {height} {title} {width}>
  <div class="grid" slot="content">
    <div class="element header">
      <Label>Property</Label>
    </div>
    <div class="element header">
      <Label>Value</Label>
    </div>
    {#each Object.entries(item) as item, index}
      <div class="element propertyName">
        <div class="name">
          <slot name="name" key="{item[0]}"></slot>
        </div>
      </div>
      <div class="element propertyValue">
        <slot name="value" key="{item[0]}" {index} value="{item[1]}"></slot>
      </div>
    {/each}
  </div>
</HeaderBox>

<style lang="scss">
  .grid {
    box-sizing: border-box;
    width: 100%;
    padding: var(--tjust-padding-thin);
    display: grid;
    column-gap: 1px;
    grid-template-columns: var(--columns, 40% 60%);
    user-select: none;

    .element {
      box-sizing: border-box;
      background: var(--tjust-bg-table-odd);
      display: flex;
      flex-flow: row nowrap;
      justify-content: left;
      align-items: center;
      padding: 2px 5px;

      .name {
        width: 100%;
      }
    }

    .element:nth-child(4n), div:nth-child(4n-1) {
      background: var(--tjust-bg-table-even);
    }

    .propertyName:hover {
      background: var(--tjust-bg-hover-color);

      &:hover + .propertyValue {
        background: var(--tjust-bg-hover-color);
      }
    }

    .propertyName:has(+ .propertyValue:hover) {
      background: var(--tjust-bg-hover-color);
    }

    .propertyValue:hover {
      background: var(--tjust-bg-hover-color);
    }

    .header {
      background: var(--tjust-bg-table-odd);
      border: 1px solid var(--tjust-border-default-color);
      justify-content: center;
      position: sticky;
      z-index: 1;
      top: 2px;
      left: 0;
    }
  }
</style>