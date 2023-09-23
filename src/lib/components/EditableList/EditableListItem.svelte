<script>
    import ButtonIconToolbar from "$lib/components/Toolbar/ButtonIconToolbar.svelte";
    import {createEventDispatcher} from "svelte";

    export let item;
    export let actions = [];
    export let isDragging = false;

    const dispatch = createEventDispatcher();

    function dispatchGripDown(event) {
        dispatch("gripdown");
    }

    function dispatchGripUp(event) {
        dispatch("gripup");
    }
</script>

<div class="list-item">
    <div class="fa fa-grip-vertical grip" on:mousedown={dispatchGripDown} on:mouseup={dispatchGripUp}
         style:cursor="{isDragging ? 'grabbing' : 'grab'}"></div>
    <div class="content">
        <slot></slot>
    </div>
    <div>
        <ButtonIconToolbar context="{item}" direction="horizontal" items="{actions}"></ButtonIconToolbar>
    </div>
</div>

<style lang="scss">
  .list-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    gap: var(--theme-just-gap-default);

    .grip {
      color: var(--theme-just-txt-default-color);
      user-select: none;
    }

    .content {
      flex: 2;
    }

    &:hover {
      background: var(--theme-just-bg-hover-color);

      .grip {
        color: var(--theme-just-txt-default-color);
      }
    }
  }
</style>