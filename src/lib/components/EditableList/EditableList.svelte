<script>
   export let title = "";
   export let items = [];
</script>

<div class="just-editable-list">
   <div class="header">
      <div class="title">{title}</div>
      <button class="fa fa-plus"></button>
      <button class="fa fa-trash"></button>
   </div>
   <div class="list">
      {#each items as item}
         <div class="list-item">
            <div class="fa fa-grip-vertical grip"></div>
            <div class="content">
               <slot {item}></slot>
            </div>
            <button class="fa fa-copy"></button>
            <button class="fa fa-trash"></button>
            <button class="fa fa-add"></button>
         </div>
      {/each}
   </div>
   <footer class="expanders">
      <button class="fa fa-caret-up contract-list"></button>
      <button class="fa fa-caret-down expand-list"></button>
   </footer>
</div>

<style lang="scss">
   .just-editable-list {
      display: flex;
      flex-flow: column nowrap;
      gap: 5px;

      .header {
         display: flex;
         flex-flow: row nowrap;

         .title {
            text-align: left;
            flex: 2;
         }

         button {
            width: auto;
            font-size: 12px;
         }
      }

      .list {
         display: flex;
         flex-flow: column nowrap;
         gap: 5px;

         .list-item {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 2px;
            border-left: 2px solid white;
            border-right: 2px solid white;
            border-radius: 5px;
            padding: 0 5px;

            .grip {
            }

            .content {
               border: 1px solid white;
               flex: 2;
            }

            button {
               width: 14px;
               text-align: center;
               margin: 0;
               padding: 1px;
               font-size: 12px;
            }
         }
      }

      .expanders {
         display: flex;
         flex-flow: column nowrap;

         .expand-list {

         }

         .contract-list {

         }
      }
   }
</style>