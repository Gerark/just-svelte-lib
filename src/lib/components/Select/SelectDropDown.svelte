<script>
    import {quintOut} from "svelte/easing";
    import {fly, slide} from "svelte/transition";
    import {createEventDispatcher} from "svelte";
    import Typography from "$lib/components/Typography/Typography.svelte";

    export let items = [];
    export let value;
    export let maxHeight = "auto";

    const dispatch = createEventDispatcher();
</script>

<svelte:options accessors/>

<div class="dropdown"
     style:max-height="{maxHeight}"
     transition:slide|local={{ duration: 125, opacity: 0, axis: 'y', easing: quintOut }}>
    {#each items as item,index}
        <div class="item" on:click={() => dispatch("itemselect", item)} on:keydown={() => dispatch("itemselect", item)}
             class:selected={item.value === value} role="menuitem" tabindex="0">
            <slot {item}>
                <Typography tabindex="{index}">{item.label}</Typography>
            </slot>
        </div>
    {/each}
</div>

<style lang="scss">
  .dropdown {
    padding: 2.5px;
    background: var(--tjust-bg-content-color);
    color: var(--tjust-txt-default-color);
    border: var(--tjust-border-width) solid var(--tjust-border-default-color);
    border-radius: var(--tjust-border-radius);
    box-sizing: border-box;
    box-shadow: 0 0 10px black;

    z-index: 99999;
    display: flex;
    flex-flow: column nowrap;
    align-items: start;
    margin-top: 3px;
    width: 100%;
    font-size: var(--tjust-font-size-sm);
    user-select: none;
    overflow: auto;
    scrollbar-gutter: stable;

    .item {
      box-sizing: border-box;
      padding: var(--tjust-padding-sm);
      width: 100%;
      height: 100%;

      &:hover {
        background: var(--tjust-bg-hover-color);
      }
    }

    .item:first-child {
      border-top-left-radius: var(--tjust-border-radius);
      border-top-right-radius: var(--tjust-border-radius);
    }

    .item:last-child {
      border-bottom-left-radius: var(--tjust-border-radius);
      border-bottom-right-radius: var(--tjust-border-radius);
    }

    .item.selected {
      background: var(--tjust-bg-selected-color);
      color: var(--tjust-txt-selected-color);
    }
  }
</style>