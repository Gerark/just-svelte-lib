<script>
    import {createEventDispatcher} from "svelte";

    export let placeHolderText = "";
    export let value = 0;
    export let inputElement = null;
    export let canReset = false;
    export let defaultIcon = "";

    const dispatch = createEventDispatcher();

    $: hasValue = value && value !== "";
    $: showIcon = (hasValue && canReset) || (!hasValue && defaultIcon !== "");

    function reset() {
        if (canReset) {
            value = 0;
        }
    }

    function onInput(event) {
        dispatch("valuechanged", event.target.value)
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
           type="number">
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
    width: calc(100% - 4px);
    margin: 0 2px;

    i {
      position: absolute;
      top: 12.5%;
      left: 8px;
      color: var(--theme-just-icon-default-color);
    }

    .clickable:hover {
      color: var(--theme-just-icon-hover-color);
    }

    input {
      background: var(--theme-just-bg-content-color);
      border: var(--theme-just-border-width) solid var(--theme-just-border-default-color);
      border-radius: var(--theme-just-border-radius);
      color: var(--theme-just-txt-default-color);
      text-align: left;
      height: 20px;
      width: 100%;

      &:hover {
        border: var(--theme-just-border-width) solid var(--theme-just-border-hover-color);
        background: var(--theme-just-bg-hover-color);
        box-shadow: none;
      }

      &:focus {
        border: var(--theme-just-border-width) solid var(--theme-just-border-focus-color);
        box-shadow: none;
      }

      &:active {
        border: var(--theme-just-border-width) solid var(--theme-just-border-active-color);
        box-shadow: none;
      }
    }
    
    input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
</style>