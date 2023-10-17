<script>
  import Theme from "$lib/components/Theme/Theme.svelte";
  import Panel from "$lib/components/Layout/Panel.svelte";
  import Overlay from "$lib/components/Layout/Overlay.svelte";
  import HeaderTestColumn from "./HeaderTestColumn.svelte";
  import { currentTheme } from "$lib/styles/themeStore.js";
  import Flex from "$lib/components/Layout/Flex.svelte";
  import Separator from "$lib/components/Separator/Separator.svelte";
  import "$lib/styles/themes/dark-juice.scss";
  import "$lib/styles/themes/crimson.scss";
  import "$lib/styles/themes/dust.scss";
  import TabControl from "$lib/components/TabControl/TabControl.svelte";
  import Tab from "$lib/components/TabControl/Tab.svelte";
  import CommonComponents from "./CommonComponents.svelte";
  import ListComponents from "./ListComponents.svelte";
  import SpecialComponents from "./SpecialComponents.svelte";
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
</Theme>

<style lang="scss">
</style>