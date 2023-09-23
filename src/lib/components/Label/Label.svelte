<script>
    export let text = "";
    export let align = "center";
    export let selectable = false;
    export let look = "primary";
</script>

<span
        style:color="var(--theme-just-txt-default-color)"
        style:text-align="{align}"
        style:user-select="{selectable ? 'default' : 'none'}"
>{text}</span>

<style lang="scss">
</style>