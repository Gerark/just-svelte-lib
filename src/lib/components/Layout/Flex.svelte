<script>
  import flexItems from "./flexItemsLayout.js";

  export let width = "100%";
  export let height = "100%";
  export let gap = "5px";
  export let flex = [];
</script>

<div {...$$restProps}
     class="main {$$restProps.class || ''}"
     style:gap="{gap}"
     style:height="{height}"
     style:width="{width}"
     use:flexItems="{flex}">
  <slot></slot>
</div>

<style lang="scss">
  .main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: var(--tjust-bg-txt-color);
  }

  .component {
    background: var(--tjust-bg-component-color);
  }

  .content {
    background: var(--tjust-bg-content-color);
  }

  .background {
    background: var(--tjust-bg-color);
  }

  .shadow {
    box-shadow: 0 0 10px black;
  }

  .border {
    border: 1px solid var(--tjust-surface);
    box-sizing: border-box;
    overflow: clip;
  }

  .scrollable {
    overflow-y: auto;
    scrollbar-gutter: auto;
  }

  .clip-overflow {
    overflow: clip;
  }

  .thin {
    padding: 1px;
  }

  .thick {
    padding: 5px;
  }

  .vertical {
    display: flex;
    flex-flow: column nowrap;
    align-items: var(--align-items, center);
  }

  .horizontal {
    display: flex;
    flex-flow: row nowrap;
    align-items: var(--align-items, center);
  }
</style>