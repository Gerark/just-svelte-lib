<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import ButtonIconToolbar from "$lib/components/Toolbar/ButtonIconToolbar.svelte";

    export let title;
    export let actions;
</script>

<Flex direction="horizontal" flex="{['3']}" width="100%">
    <Label align="left" text="{title}"></Label>
    <ButtonIconToolbar direction="horizontal" items="{actions}"></ButtonIconToolbar>
</Flex>

<style lang="scss">

</style>