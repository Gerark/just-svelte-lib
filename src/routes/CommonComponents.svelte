<script>
  import Flex from "$lib/components/Layout/Flex.svelte";
  import Label from "$lib/components/Label/Label.svelte";
  import Select from "$lib/components/Select/Select.svelte";
  import NumberBox from "$lib/components/TextBox/NumberBox.svelte";
  import TextBox from "$lib/components/TextBox/TextBox.svelte";
  import CheckBox from "$lib/components/CheckBox/CheckBox.svelte";
  import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
  import Button from "$lib/components/Button/Button.svelte";
  import TabControl from "$lib/components/TabControl/TabControl.svelte";
  import Tab from "$lib/components/TabControl/Tab.svelte";
  import Card from "$lib/components/Card/Card.svelte";
  import Image from "$lib/components/Image/Image.svelte";
  import Separator from "$lib/components/Separator/Separator.svelte";
  import Grid from "$lib/components/Layout/Grid.svelte";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import Typography from "$lib/components/Typography/Typography.svelte";
  import Panel from "$lib/components/Layout/Panel.svelte";


  let options = [
    { id: 0, label: "Option 1", value: 0 },
    { id: 1, label: "Option 2", value: 1 },
    { id: 2, label: "Option 3", value: 2 },
    { id: 3, label: "Option 4", value: 3 },
    { id: 4, label: "Option 5", value: 4 }
  ];
  let currentOption = 2;
  let checkboxValue = false;
  let textboxValue = "";
  let numberValue = null;

  let buttonSizes = [
    { n: "sm" }, { n: "md" }, { n: "lg" }, { n: "xl" }
  ];
  let buttonStyles = [
    { n: "primary" }, { n: "secondary" }, { n: "warning" }, { n: "success" }, { n: "error" }, { n: "flat" }
  ];

  let cards = writable([
    { src: "https://random.dog/7ed0dec1-43d1-44eb-bb43-909a1298989d.jpg", highlighted: true },
    { src: "https://random.dog/ef01ebc6-501a-4e5f-96f7-23180cdd9f3e.JPG" },
    { src: "https://random.dog/24141-29115-27188.jpg", highlighted: true },
    { src: "https://random.dog/d429e7a3-b215-43e9-ad4f-eca473f52e16.jpg" },
    { src: "https://random.dog/8c7176cb-97d8-4a97-925f-4721ae7aa32c.jpg", highlighted: true },
    { src: "https://random.dog/46be3661-2d29-4119-8841-baa86c4a73ba.jpg" },
    { src: "https://random.dog/7ed0dec1-43d1-44eb-bb43-909a1298989d.jpg", highlighted: true },
    { src: "https://random.dog/ef01ebc6-501a-4e5f-96f7-23180cdd9f3e.JPG" },
    { src: "https://random.dog/24141-29115-27188.jpg", highlighted: true },
    { src: "https://random.dog/d429e7a3-b215-43e9-ad4f-eca473f52e16.jpg" },
    { src: "https://random.dog/8c7176cb-97d8-4a97-925f-4721ae7aa32c.jpg", highlighted: true },
    { src: "https://random.dog/46be3661-2d29-4119-8841-baa86c4a73ba.jpg" }
  ]);

  let texts = [
    "size-2xl align-left",
    "size-xl align-right",
    "size-lg align-center",
    "size-md align-center",
    "size-sm align-center",
    "size-xs align-center"
  ];

  let playAnim = false;
  let h = 300;
  let t = 0;
  const intervalId = setInterval(() => {
    if (playAnim) {
      t += 0.01;
      h = 300 + Math.pow(2, Math.sin(t)) * 200;
    }
  }, 0.01);

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<Flex class="horizontal" flex="{['1', '1', '1']}" height="100%" width="100%">
  <Flex class="vertical" gap="10px">
    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <HeaderBox title="Typography">
        <svelte:fragment slot="content">
          {#each texts as text}
            <Typography class="{text}" width="100%">{text}</Typography>
          {/each}
        </svelte:fragment>
      </HeaderBox>
    </div>

    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <HeaderBox title="Inputs">
        <svelte:fragment slot="content">
          <TextBox bind:value={textboxValue} canReset="{true}" defaultIcon="circle"
                   placeHolderText="Textbox Component..."></TextBox>
          <NumberBox bind:value={numberValue} canReset="{false}"
                     placeHolderText="NumberBox Component..."></NumberBox>
          <Select bind:value={currentOption} dropdownMaxHeight="100px" items="{options}"></Select>
          <CheckBox bind:value={checkboxValue} label="Shadow Checkbox"></CheckBox>
          <Image class="{checkboxValue ? 'shadow' : ''} sm" source="https://shorturl.at/hmnpF"></Image>
          <Image class="{checkboxValue ? 'shadow' : ''} md" source="https://shorturl.at/hmnpF"></Image>
          <Image class="{checkboxValue ? 'shadow' : ''} lg" source="https://shorturl.at/hmnpF"></Image>
        </svelte:fragment>
      </HeaderBox>
    </div>
  </Flex>
  <Flex class="vertical" gap="10px" width="400px">
    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <HeaderBox title="Buttons">
        <Flex --align-items="flex-start" class="horizontal thick" flex="{['1','0.5','0.5','1']}" height="auto"
              slot="content">
          <Flex --align-items="center" class="vertical" height="auto">
            {#each buttonSizes as button}
              <Button --width="100%" class="btn {button.n}" tooltip="Tooltip!">
                <i class="fa fa-cloud"></i>
                <span>size-{button.n}</span>
              </Button>
            {/each}
          </Flex>
          <Flex --align-items="center" class="vertical" height="auto" width="auto">
            {#each buttonSizes as button}
              <Button class="icon {button.n}" tooltip="{button.n}">
                <i class="fa fa-cloud"></i>
              </Button>
            {/each}
          </Flex>
          <Flex --align-items="center" class="vertical" height="auto" width="auto">
            {#each buttonStyles as button}
              <Button class="icon {button.n} md" tooltip="{button.n}">
                <i class="fa fa-cloud"></i>
              </Button>
            {/each}
          </Flex>
          <Flex --align-items="center" class="vertical" height="auto">
            {#each buttonStyles as button}
              <Button --width="100%" class="btn {button.n} md" tooltip="{button.n}">
                <i class="fa fa-cloud"></i>
                <span>{button.n}</span>
              </Button>
            {/each}
          </Flex>
        </Flex>
      </HeaderBox>
    </div>

    <div style:max-height="300px" style:min-height="300px" style:width="100%">
      <HeaderBox title="Tab Control">
        <TabControl slot="content">
          <Tab data="{{header: 'HEADER 1'}}">CONTENT 1</Tab>
          <Tab data="{{header: 'HEADER 2'}}">CONTENT 2</Tab>
          <Tab data="{{header: 'HEADER 3'}}">CONTENT 3</Tab>
        </TabControl>
      </HeaderBox>
    </div>
  </Flex>
  <Flex class="vertical" gap="10px" width="400px">
    <div style:max-height="{h}px" style:min-height="{h}px" style:width="100%">
      <HeaderBox>
        <Flex class="horizontal" flex="{['2 0','1 0']}" slot="header" width="100%">
          <Label align="left">Cards</Label>
          <CheckBox bind:value={playAnim} label="Play Anim"></CheckBox>
        </Flex>
        <Flex class="background vertical" flex="{['1 0', '0 0']}" height="100%"
              slot="content" width="100%">
          <Flex class="vertical clip-overflow">
            <TabControl>
              <Label let:tab slot="header">{tab.header}</Label>
              <Tab data="{{header: 'Cards' + ' (' + $cards.length + ')'}}">
                <Grid columnSize="100px">
                  {#each $cards as card, index}
                    <Flex class="vertical" width="100%" height="100%">
                      <Card height="100%" width="100%">
                        <Typography slot="header" class="size-2xs align-center overflow-ellipsis" width="100%">CARD
                          NUMBER
                          TEST {index + 1}</Typography>
                        <Image class="cover" slot="content" source="{card.src}"></Image>
                      </Card>
                      <Separator class="primary sm"></Separator>
                    </Flex>
                  {/each}
                </Grid>
              </Tab>
              <Tab data="{{header: 'More Cards' + ' (' + $cards.length + ')'}}">
                <Grid columnSize="150px">
                  {#each $cards as card, index}
                    <Flex class="vertical" width="100%" height="100%">
                      <Card height="100%" width="100%" isButtonEnabled="{true}" isHighlighted="{card.highlighted}">
                        <Panel slot="header">
                          <Typography class="size-2xs align-center overflow-ellipsis" width="100%">CARD
                            NUMBER
                            TEST {index + 1}</Typography>
                        </Panel>
                        <Image class="cover" slot="content" source="{card.src}"></Image>
                      </Card>
                      <Separator class="secondary sm"></Separator>
                    </Flex>
                  {/each}
                </Grid>
              </Tab>
            </TabControl>
          </Flex>
          <Flex class="horizontal thick" height="auto">
            <Button --width="100%" class="btn success md">
              CONFIRM
              <i class="fa fa-check"></i>
            </Button>
            <Button --width="100%" class="btn error md">
              CANCEL
              <i class="fa fa-xmark"></i>
            </Button>
          </Flex>
        </Flex>
      </HeaderBox>
    </div>
  </Flex>
</Flex>

<style lang="scss">
  .name {
    width: 100%;
    text-align: center;
    overflow: hidden;
    margin: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>