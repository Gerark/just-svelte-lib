<script>
    import Flex from "$lib/components/Layout/Flex.svelte";
    import HeaderBox from "$lib/components/Layout/HeaderBox.svelte";
    import Button from "$lib/components/Button/Button.svelte";

    let buttonSizes = [
        {n: "sm"}, {n: "md"}, {n: "lg"}, {n: "xl"}
    ];
    let buttonStyles = [
        {n: "primary"}, {n: "secondary"}, {n: "warning"}, {n: "success"}, {n: "error"}, {n: "flat"}
    ];
</script>

<Flex class="horizontal" flex="{['1', '1', '1']}" height="100%" width="100%">
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
    </Flex>
</Flex>

<style lang="scss">
</style>