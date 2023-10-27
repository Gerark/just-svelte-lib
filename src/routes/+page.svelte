<script>
    import Theme from "$lib/components/Theme/Theme.svelte";
    import Overlay from "$lib/components/Layout/Overlay.svelte";
    import Panel from "$lib/components/Layout/Panel.svelte";
    import Flex from "$lib/components/Layout/Flex.svelte";
    import HeaderTestColumn from "./HeaderTestColumn.svelte";
    import TabControl from "$lib/components/TabControl/TabControl.svelte";
    import CommonComponents from "./CommonComponents.svelte";
    import Tab from "$lib/components/TabControl/Tab.svelte";
    import ListComponents from "./ListComponents.svelte";
    import SpecialComponents from "./SpecialComponents.svelte";
    import {currentTheme} from '$lib/styles/themeStore.js';
    import '$lib/styles/themes/crimson.scss'
    import '$lib/styles/themes/dark-juice.scss'
    import '$lib/styles/themes/dust.scss'
    import "./global-styles.scss";
    import GenericTooltip from "$lib/components/Tooltip/GenericTooltip.svelte";
    import {genericTooltipStore} from "$lib/components/Tooltip/tooltipStore.js";
</script>

<Theme theme="{$currentTheme}">
    <Overlay>
        <Panel>
            <Flex class="background vertical" gap="10px" height="100%" width="100%">
                <HeaderTestColumn></HeaderTestColumn>
                <TabControl>
                    <Tab data="{{header: 'Basic'}}">
                        <CommonComponents></CommonComponents>
                    </Tab>
                    <Tab data="{{header: 'Lists & TreeView'}}">
                        <ListComponents></ListComponents>
                    </Tab>
                    <Tab data="{{header: 'Special'}}">
                        <SpecialComponents></SpecialComponents>
                    </Tab>
                </TabControl>
            </Flex>
        </Panel>
    </Overlay>
    <GenericTooltip maxWidth="100px" tooltipStore="{genericTooltipStore}">
    </GenericTooltip>
</Theme>