<script>
    import {themes as allThemes, currentTheme} from "../lib/styles/themeStore.js";
    import Flex from "$lib/components/Layout/Flex.svelte";
    import Button from "$lib/components/Button/Button.svelte";
    import Label from "$lib/components/Label/Label.svelte";
    import Select from "$lib/components/Select/Select.svelte";

    function resetTheme() {
        currentTheme.set(($allThemes)[0].value);
    }
</script>

<Flex class="horizontal" height="24px" width="100%">
    <Label>THEME: </Label>
    <Select bind:value="{$currentTheme}" items="{$allThemes}"/>
    <Button class="icon md" on:click={resetTheme}>
        <i class="fa fa-sync"></i>
    </Button>
</Flex>