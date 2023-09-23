<script>
    import flexItems from "./flexItemsLayout.js"

    export let width = "100%";
    export let height = "100%";
    export let gap = "5px";
    export let flex = [];
    export let direction = "horizontal";
</script>

<div {...$$restProps}
     class="main {$$restProps.class || ''}"
     class:horizontal-layout={direction === "horizontal"}
     class:vertical-layout={direction === "vertical"}
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
    color: var(--theme-just-bg-txt-color);
  }

  .frame {
    background: var(--theme-just-bg-component-color);
  }

  .content {
    background: var(--theme-just-bg-content-color);
  }

  .scrollable {
    overflow: auto;
    scrollbar-gutter: stable;
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

  .vertical-layout {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .horizontal-layout {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
</style>