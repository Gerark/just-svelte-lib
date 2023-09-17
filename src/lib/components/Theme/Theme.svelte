<script>
    import {setContext, onMount} from "svelte"
    import {writable} from "svelte/store"
    import updateTheme from "./updateTheme.js"

    export let theme = {};
    export let thisElement = null;

    let themeStore = writable({});

    setContext("currentTheme", themeStore);

    $: themeStore.set(theme);
    $: updateTheme(thisElement, theme);
</script>

<span bind:this={thisElement}>
    <slot>
    </slot>
</span>

<style lang="scss">
</style>