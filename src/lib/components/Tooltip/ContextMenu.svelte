<script>
    import {popupTarget} from "$lib/actions/popup.js";
    import {clickOutside} from "$lib/actions/clickOutside.js";

    export let contextMenuStore = null;

    let contextMenuStoreVal = $contextMenuStore;
    if (!contextMenuStoreVal.controller) {
        contextMenuStoreVal.controller = (ev) => {
            contextMenuStoreVal.mousePosition.x = ev.clientX;
            contextMenuStoreVal.mousePosition.y = ev.clientY;
        }
        document.addEventListener("mousemove", contextMenuStoreVal.controller);
    }

    function hide() {
        $contextMenuStore.visibilityFlag.set(false);
    }
</script>

<div
        use:clickOutside={{callback: hide}}
        use:popupTarget={{
    popupId: $contextMenuStore.id,
    strategy: 'fixed',
    placement: $contextMenuStore.mousePosition,
    offset: 0,
    noAutoUpdate: true
}}>
    <slot></slot>
</div>

<style lang="scss">

</style>