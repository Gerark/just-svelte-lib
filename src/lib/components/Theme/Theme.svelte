<script>
    import { setContext, onMount } from "svelte";
    import { writable } from "svelte/store";

    export let theme = "";

    let themeStore = writable(theme);
    setContext("currentTheme", themeStore);

    let isMounted = false;
    onMount(() => {
        updateTheme(document.documentElement);
        isMounted = true;
    });

    $: {
        themeStore.set(theme);
        if (isMounted) {
            updateTheme(document.documentElement);
        }
    }

    function updateTheme(element) {
        if (element && theme) {
            element.setAttribute("data-just-theme", theme);
            element.setAttribute("data-just-theme-mode", "dark");
        }
    }
</script>

<div data-just-theme="{theme}" data-just-theme-mode="dark" style:height="100%" style:width="100%">
    <slot>
    </slot>
</div>

<style lang="scss">
</style>