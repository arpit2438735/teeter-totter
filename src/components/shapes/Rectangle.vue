<template>
  <div
    class="shape rectangle"
    v-bind:style="{height: this.$store.state.rectangle.weight * 10 + 'px' ,
            width: this.$store.state.rectangle.weight * 10 + 'px',
            left:  'calc( ' + (50 + this.$store.state.rectangle.position * 10 )+  '% - ' + this.$store.state.rectangle.weight * 10 +'px )'}"
  ></div>
</template>
<script>
    export default {};
</script>
<style scoped>
  .rectangle {
    background: #80076e;
    bottom: 10px;
  }
</style>
