<script>
    import { createEventDispatcher } from "svelte";

    export let placeHolderText = "";
    export let value = "";
    export let inputElement = null;
    export let canReset = false;
    export let defaultIcon = "";

    const dispatch = createEventDispatcher();

    $: hasValue = value && value !== "";
    $: showIcon = (hasValue && canReset) || (!hasValue && defaultIcon !== "");

    function reset() {
        if (canReset) {
            value = "";
        }
    }

    function onInput(event) {
        dispatch("valuechanged", event.target.value);
    }
</script>

<div class="main {$$restProps.class}">
    <input bind:this={inputElement}
           bind:value={value}
           class="focusable"
           on:click|stopPropagation
           on:input={onInput}
           on:keydown
           on:mousedown|stopPropagation placeholder="{placeHolderText}"
           style:padding-left="{showIcon ? '30px' : '10px'}"
           type="text">
    {#if !hasValue && defaultIcon !== ""}
        <i class="fas fa-{defaultIcon}" class:clickable={hasValue && canReset}></i>
    {:else if hasValue && canReset}
        <i class="fas fa-times clickable" on:click={reset} on:keydown={reset}></i>
    {/if}
</div>

<style lang="scss">
  .main {
    position: relative;
    display: flex;
    width: calc(100% - var(--tjust-padding-thin) * 2);
    margin: 0 var(--tjust-padding-thin);

    i {
      position: absolute;
      text-align: center;
      padding: 6px;
      font-size: var(--tjust-font-size-sm);
      color: var(--tjust-icon-default-color);
    }

    .clickable:hover {
      color: var(--tjust-icon-hover-color);
    }

    input {
      background: var(--tjust-bg-content-color);
      border: var(--tjust-border-width) solid var(--tjust-border-default-color);
      border-radius: var(--tjust-border-radius);
      color: var(--tjust-txt-default-color);
      text-align: left;
      height: 20px;
      width: 100%;
      font-size: var(--tjust-font-size-sm);

      &:hover {
        border: var(--tjust-border-width) solid var(--tjust-border-hover-color);
        background: var(--tjust-bg-hover-color);
        box-shadow: none;
      }

      &:focus {
        border: var(--tjust-border-width) solid var(--tjust-border-focus-color);
        box-shadow: none;
      }

      &:active {
        border: var(--tjust-border-width) solid var(--tjust-border-active-color);
        box-shadow: none;
      }
    }
  }
</style>