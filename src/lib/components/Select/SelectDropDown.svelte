<script>
    import {quintOut} from "svelte/easing";
    import {slide} from "svelte/transition";
    import {createEventDispatcher} from "svelte";

    export let items = [];
    export let value;
    export let height = "auto";

    const dispatch = createEventDispatcher();
</script>

<div class="dropdown"
     style:height="{height}"
     transition:slide={{ duration: 125, axis: "y", easing: quintOut }}>
    {#each items as item}
        <div class="item" on:click={() => dispatch("itemselect", item)} on:keydown={() => dispatch("itemselect", item)}
             class:selected={item.value === value}>
            <slot {item}>
                <span>{item.label}</span>
            </slot>
        </div>
    {/each}
</div>

<style lang="scss">
  .dropdown {
    padding: 2.5px;
    background: var(--theme-just-bg-content-color);
    color: var(--theme-just-txt-default-color);
    border: var(--theme-just-border-width) solid var(--theme-just-border-default-color);
    border-radius: var(--theme-just-border-radius);

    z-index: 99999;
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    gap: 5px;
    margin-top: 3px;
    width: 100%;
    user-select: none;
    overflow: auto;

    .item {
      box-sizing: border-box;
      padding-left: 5px;
      width: 100%;
      height: 100%;

      &:hover {
        background: var(--theme-just-bg-hover-color);
      }
    }

    .item:first-child {
      border-top-left-radius: var(--theme-just-border-radius);
      border-top-right-radius: var(--theme-just-border-radius);
    }

    .item:last-child {
      border-bottom-left-radius: var(--theme-just-border-radius);
      border-bottom-right-radius: var(--theme-just-border-radius);
    }

    .item.selected {
      background: var(--theme-just-bg-selected-color);
      color: var(--theme-just-txt-selected-color);
    }
  }
</style>