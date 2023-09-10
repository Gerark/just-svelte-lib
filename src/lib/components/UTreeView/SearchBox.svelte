<script>
    export let placeHolderText = "";
    export let value = "";
    export let inputElement;

    $: hasValue = value && value !== "";
    $: icon = hasValue ? "xmark" : "search";

    function reset() {
        value = "";
    }
</script>

<div class="searchBox">
    <input bind:this={inputElement} bind:value={value} class="focusable" on:keydown
           placeholder="{placeHolderText}"
           type="text">
    <i class="fa fa-{icon} searchBoxIcon" class:clickable={hasValue} on:click={reset}></i>
</div>

<style lang="scss">
  .searchBox {
    position: relative;
    display: flex;
    margin: 0 2px;
  }

  .searchBox input {
    background: var(--bg-ternary-color);
    border-radius: 15px;
    color: var(--text-color);
    border: 1px solid transparent;
    text-align: left;
    padding-left: 30px;
    height: 20px;
    width: 100%;
  }

  .searchBox input:hover {
    border: 1px solid var(--text-color);
    box-shadow: none;
  }

  .searchBox input:focus {
    border: 1px solid var(--active-color);
    box-shadow: none;
  }

  .searchBoxIcon {
    position: absolute;
    top: 12.5%;
    left: 8px;
  }

  .clickable:hover {
    color: var(--active-color);
  }
</style>