<script>
    import Typography from "$lib/components/Typography/Typography.svelte";
    import {popupTarget} from "$lib/actions/popup.js";
    import {fly} from "svelte/transition";
    import {quadOut} from "svelte/easing";

    export let tooltipStore = null;
    export let showDelay = 500;
    export let hideDelay = 250;
    export let offset = 5;
    export let width = "100%";
    export let maxWidth = "100%";
    export let placement = "top";
</script>

<div
        use:popupTarget={{popupId: 'global-tooltip', strategy: 'fixed', placement, delay: { show: showDelay, hide: hideDelay}, offset}}>
    {#if $tooltipStore.visible}
        <div class="panel tooltip panel-shadow"
             style:width="{width}"
             style:max-width="{maxWidth}"
             style:height="auto"
             in:fly|local={{duration: 125, easing: quadOut, opacity: 0}}
             out:fly|local={{duration: 125, easing: quadOut, opacity: 1}}>
            <Typography class="size-sm align-center">{$tooltipStore.content}</Typography>
        </div>
    {/if}
</div>

<style lang="scss">
  .tooltip {
    padding: var(--tjust-padding-xl);
    user-select: none;
  }
</style>