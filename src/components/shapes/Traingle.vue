<template>
  <div class="shape triangle" v-bind:style="addStyle()"></div>
</template>
<script>
    export default {
        methods: {
            addStyle() {
                return {
                    height: this.$store.state.triangle.weight * 10 + "px",
                    width: this.$store.state.triangle.weight * 10 + "px",
                    left:
                        "calc( " +
                        (50 - this.$store.state.triangle.position * 10) +
                        "% - " +
                        parseInt(this.$store.state.triangle.weight) * 10 +
                        "px )",
                    borderLeft:
                        (this.$store.state.triangle.weight * 10) / 2 + "px solid transparent",
                    borderRight:
                        (this.$store.state.triangle.weight * 10) / 2 + "px solid transparent",
                    borderBottom: this.$store.state.triangle.weight * 10 + "px solid black"
                };
            }
        }
    };
</script>
<style scoped>
  .triangle {
    bottom: 10px;
  }
</style>
