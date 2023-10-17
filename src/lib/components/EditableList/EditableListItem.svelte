<script>
  import ButtonToolbar from "$lib/components/Button/ButtonToolbar.svelte";
  import { createEventDispatcher } from "svelte";

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
    <ButtonToolbar context="{item}" direction="horizontal" items="{actions}"></ButtonToolbar>
  </div>
</div>

<style lang="scss">
  .list-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    gap: 2px;
    padding: var(--tjust-padding-thin);

    .grip {
      color: var(--tjust-txt-inactive-color);
      user-select: none;
    }

    .content {
      flex: 2;
    }

    &:hover {
      background: var(--tjust-bg-hover-color);

      .grip {
        color: var(--tjust-txt-default-color);

        &:hover {
          color: var(--tjust-icon-hover-color);
        }
      }
    }
  }
</style>