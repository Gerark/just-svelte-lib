<script>
  import { justTooltip } from "$lib/actions/tooltip.js";
  import { createEventDispatcher } from "svelte";

  export let tooltip = "";
  export let enabled = true;
  export let highlighted = false;

  const dispatch = createEventDispatcher();

  function onClick(ev) {
    if (enabled) {
      dispatch("click");
    }
  }

  function onDblClick(ev) {
    if (enabled) {
      dispatch("dblclick");
    }
  }

  function onMouseEnter(ev) {
    if (enabled) {
      highlighted = true;
      dispatch("mouseenter");
    }
  }

  function onMouseExit(ev) {
    if (enabled) {
      highlighted = false;
      dispatch("mouseleave");
    }
  }
</script>

<div class="common {$$restProps.class || ''}" class:enabled
     data-highlighted="{highlighted}"
     on:click={onClick}
     on:dblclick={onDblClick}
     on:mouseenter={onMouseEnter}
     on:mouseleave={onMouseExit}
     use:justTooltip={tooltip}>
  <slot></slot>
</div>

<style lang="scss">
  .common {
    width: var(--width, auto);
    height: var(--height, auto);
    display: inline-flex;
    gap: var(--tjust-gap-default);
    font-family: var(--tjust-font-family);
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    user-select: none;

    &:is(.enabled) {
      cursor: pointer;
    }

    color: var(--tjust-on-primary);
    background: var(--tjust-primary);
    border: none;

    transform: scale(1);

    &:not(.flat):is(.enabled) {
      transition: transform var(--tjust-animation-click-duration) ease;
    }

    &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
      background: var(--tjust-primary-l1);
    }

    &:active:is(.enabled) {
      background: var(--tjust-primary-d2);

      &:not(.flat):is(.enabled) {
        transform: scale(0.9);
      }
    }

    &.shadow {
      box-shadow: 0 0 10px black;
    }

    &.primary {
      color: var(--tjust-on-primary);
      background: var(--tjust-primary);

      &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
        background: var(--tjust-primary-l1);
      }

      &:active:is(.enabled) {
        background: var(--tjust-primary-d2);
      }
    }

    &.secondary {
      color: var(--tjust-on-secondary);
      background: var(--tjust-secondary);

      &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
        background: var(--tjust-secondary-l1);
      }

      &:active:is(.enabled) {
        background: var(--tjust-secondary-d2);
      }
    }

    &.flat {
      color: var(--tjust-on-surface);
      background: var(--tjust-surface-d2);

      &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
        background: var(--tjust-surface-d1);
      }

      &:active:is(.enabled) {
        background: var(--tjust-surface-d2);
      }
    }

    &.success {
      color: var(--tjust-on-success);
      background: var(--tjust-success);

      &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
        background: var(--tjust-success-l1);
      }

      &:active:is(.enabled) {
        background: var(--tjust-success-d2);
      }
    }

    &.warning {
      color: var(--tjust-on-warning);
      background: var(--tjust-warning);

      &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
        background: var(--tjust-warning-l1);
      }

      &:active:is(.enabled) {
        background: var(--tjust-warning-d2);
      }
    }

    &.error {
      color: var(--tjust-on-error);
      background: var(--tjust-error);

      &[data-highlighted=false]:hover:is(.enabled), &[data-highlighted=true]:is(.enabled) {
        background: var(--tjust-error-l1);
      }

      &:active:is(.enabled) {
        background: var(--tjust-error-d2);
      }
    }

    &.icon {
      border-radius: 999999px;

      &.sm {
        font-size: var(--tjust-font-size-sm);
        padding: var(--tjust-padding-sm);
        aspect-ratio: 1/1;
      }

      &.md {
        font-size: var(--tjust-font-size-md);
        padding: var(--tjust-padding-md);
        aspect-ratio: 1/1;
      }

      &.lg {
        font-size: var(--tjust-font-size-lg);
        padding: var(--tjust-padding-lg);
        aspect-ratio: 1/1;
      }

      &.xl {
        font-size: var(--tjust-font-size-xl);
        padding: var(--tjust-padding-xl);
        aspect-ratio: 1/1;
      }
    }

    &.btn {
      font-weight: normal;

      &.sm {
        font-size: var(--tjust-font-size-sm);
        padding: 0 var(--tjust-padding-sm);
      }

      &.md {
        font-size: var(--tjust-font-size-md);
        padding: 0 var(--tjust-padding-md);
      }

      &.lg {
        font-size: var(--tjust-font-size-lg);
        padding: 0 var(--tjust-padding-lg);
      }

      &.xl {
        font-size: var(--tjust-font-size-xl);
        padding: 0 var(--tjust-padding-xl);
      }

      &.flat {
        padding: 0;
      }
    }
  }
</style>