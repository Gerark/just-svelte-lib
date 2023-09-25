<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Label from "$lib/components/Label/Label.svelte";

    export let height = "100%";
    export let width = "100%";
    export let title = "";
    export let scrollableContent = true;
</script>

<Flex class="component thick" direction="vertical" flex="{['0']}" {height} {width}>
    <slot name="header">
        <Flex direction="horizontal">
            <Label>{title}</Label>
        </Flex>
    </slot>
    <Flex class="content thick {scrollableContent ? 'scrollable' : ''}" direction="vertical">
        <slot name="content"></slot>
    </Flex>
</Flex>

<style lang="scss">

</style>