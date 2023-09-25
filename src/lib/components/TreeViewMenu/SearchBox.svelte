<script>
    import TextBox from "$lib/components/TextBox/TextBox.svelte";

    export let placeHolderText = "";
    export let value = "";
    export let inputElement;
</script>

<TextBox bind:inputElement={inputElement} bind:value={value} canReset="{true}" class="{$$restProps.class}"
         defaultIcon="search"
         {placeHolderText}></TextBox>

<style lang="scss">
</style>