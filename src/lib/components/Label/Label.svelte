<script>
    export let text = "";
    export let style = "primary";
    export let align = "center";
</script>

<span
        class:just-label-primary="{style === 'primary'}"
        class:just-label-secondary="{style === 'secondary'}"
        class:just-label-ternary="{style === 'ternary'}"
        style:text-align="{align}"
>{text}</span>

<style lang="scss">
  .just-label-primary {
    color: var(--theme-just-text2);
  }

  .just-label-secondary {
    color: var(--theme-just-text);
  }

  .just-label-ternary {
    color: var(--theme-just-text1);
  }
</style>