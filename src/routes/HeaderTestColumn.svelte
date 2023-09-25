<script>
    import {allThemes, currentTheme} from "../appStore.js";
    import Flex from "$lib/components/Layout/Flex.svelte";
    import ButtonIcon from "$lib/components/Buttons/ButtonIcon.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import Select from "$lib/components/Select/Select.svelte";

    function resetTheme() {
        currentTheme.set(($allThemes)[0].value);
    }
</script>

<Flex direction="horizontal" height="24px" width="100%">
    <Label>THEME: </Label>
    <Select bind:value="{$currentTheme}" items="{$allThemes}"/>
    <ButtonIcon icon="sync" on:click={resetTheme} size="s"></ButtonIcon>
</Flex>