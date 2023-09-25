<script>
    import {setContext, onMount} from "svelte"
    import {writable} from "svelte/store"
    import updateTheme from "./updateTheme.js"

    export let theme = {};
    export let thisElement = null;

    let themeStore = writable(theme);
    setContext("currentTheme", themeStore);

    let isMounted = false;
    onMount(() => {
        updateTheme(document.documentElement, theme);
        isMounted = true;
    })

    $: themeStore.set(theme);
    $: if (isMounted) {
        updateTheme(document.documentElement, theme);
    }
</script>

<span bind:this={thisElement} class="just-root">
    <slot>
    </slot>
</span>

<style lang="scss">
  .just-root {
    font-family: var(--theme-just-font-family);
    font-size: var(--theme-just-font-default-size);
    color: var(--theme-just-txt-default-color);
  }
</style>