<script>
    export let align = "center";
    export let selectable = false;
</script>

<span
        style:color="var(--theme-just-txt-default-color)"
        style:text-align="{align}"
        style:user-select="{selectable ? 'default' : 'none'}"
>
    <slot></slot>
</span>

<style lang="scss">
</style>