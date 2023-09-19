<script>
    import {setContext} from "svelte"
    import {writable} from "svelte/store"
    import updateTheme from "./updateTheme.js"

    export let theme = {};
    export let thisElement = null;

    let themeStore = writable({});

    setContext("currentTheme", themeStore);

    $: themeStore.set(theme);
    $: updateTheme(thisElement, theme);
</script>

<span bind:this={thisElement} class="themeRoot">
    <slot>
    </slot>
</span>

<style lang="scss">
  .themeRoot {
    color: var(--theme-just-text2);
    font-family: "Lucida Sans", serif;
  }
</style>