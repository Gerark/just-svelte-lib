<script>
    import {setContext} from "svelte"
    import {writable} from "svelte/store"
    import updateTheme from "./updateTheme.js"

    export let theme = {};
    export let thisElement = null;

    let themeStore = writable(theme);

    setContext("currentTheme", themeStore);

    $: themeStore.set(theme);
    $: updateTheme(thisElement, theme);
</script>

<span bind:this={thisElement} class="just-root">
    <slot>
    </slot>
</span>

<style lang="scss">
  .just-root {
    font-family: var(--theme-just-font-family);
  }
</style>