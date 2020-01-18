<template>
  <div class="container">
    <div class="inputs">
      <div>
        <p>Circle</p>
        <label>
          Weight :
          <input
            type="number"
            v-model="$store.state.circle.weight"
            @change="()=> {
                  if($store.state.circle.weight>10 ) {
                      $store.state.circle.weight = parseInt($store.state.circle.weight) - 1;
                  } else if ($store.state.circle.weight < 1 ) {
                    $store.state.circle.weight = parseInt($store.state.circle.weight) + 1;
                  }
            }"
          />
        </label>
        <label for>
          Position:
          <input
            type="text"
            v-model="$store.state.circle.position"
            v-on:keyup.37="(e)=>$store.state.circle.position =  validateDecrementLimit(e,$store.state.circle.position)"
            v-on:keyup.38="(e)=>$store.state.circle.position =  validateUpperLimit(e,$store.state.circle.position)"
            v-on:keyup.39="(e)=>$store.state.circle.position =  validateUpperLimit(e,$store.state.circle.position)"
            v-on:keyup.40="(e)=>$store.state.circle.position =  validateDecrementLimit(e,$store.state.circle.position)"
          />
        </label>
      </div>
      <div>
        <p>Triangle</p>
        <label>
          Weight :
          <input type="number" v-model="$store.state.triangle.weight" />
        </label>
        <label for>
          Position:
          <input
            type="text"
            v-model="$store.state.triangle.position"
            v-on:keyup.37="(e)=>$store.state.triangle.position =  validateDecrementLimit(e,$store.state.triangle.position)"
            v-on:keyup.38="(e)=>$store.state.triangle.position =  validateUpperLimit(e,$store.state.triangle.position)"
            v-on:keyup.39="(e)=>$store.state.triangle.position =  validateUpperLimit(e,$store.state.triangle.position)"
            v-on:keyup.40="(e)=>$store.state.triangle.position =  validateDecrementLimit(e,$store.state.triangle.position)"
          />
        </label>
      </div>
      <div>
        <p>Rectangle</p>
        <label>
          Weight :
          <input type="number" v-model="$store.state.rectangle.weight" />
        </label>
        <label for>
          Position:
          <input
            type="text"
            v-model="$store.state.rectangle.position"
            v-on:keyup.37="(e)=>$store.state.rectangle.position =  validateDecrementLimit(e,$store.state.rectangle.position)"
            v-on:keyup.38="(e)=>$store.state.rectangle.position =  validateUpperLimit(e,$store.state.rectangle.position)"
            v-on:keyup.39="(e)=>$store.state.rectangle.position =  validateUpperLimit(e,$store.state.rectangle.position)"
            v-on:keyup.40="(e)=>$store.state.rectangle.position =  validateDecrementLimit(e,$store.state.rectangle.position)"
          />
        </label>
      </div>
    </div>
    <div class="shape-container">
      <app-triangle></app-triangle>
      <app-circle></app-circle>
      <app-rectangle></app-rectangle>
    </div>
    <div class="line" :style="{ transform: 'rotate('+ this.angle() * (180/100) + 'deg)' }"></div>

    <div
      class="shape triangle center balance-rectangle"
    ></div>
    <div class="weights">
      <span>Weight * Position : {{ triangleAndCircleWeight }}</span>
      <span
        :style="{color : anglePercentage() < 0  ? 'red':'green'}"
        style="font-weight:bold;font-size:20px"
      >{{ anglePercentage() }}</span>
      <span>Weight * Position : {{ rectangleWeight }}</span>
    </div>
    <br />
  </div>
</template>

<script>
    import Triangle from "./components/shapes/Traingle";
    import Circle from "./components/shapes/Circle";
    import Rectangle from "./components/shapes/Rectangle";

    export default {

        watch: {
            triangleAndCircleWeight(newVal) {
                if (newVal > 20 || (this.angle() > 3 || this.angle() < -3)) {
                    this.showError();
                }
            },
            rectangleWeight() {
                if (this.triangleAndCircleWeight > 20 || (this.angle() > 3 || this.angle() < -3)) {
                    this.showError();
                }
            }
        },
        computed: {
            triangleAndCircleWeight() {
                const { triangle, circle } = this.$store.state;
                return (
                    parseInt(triangle.weight * triangle.position) +
                    parseInt(circle.weight * circle.position)
                );
            },
            rectangleWeight() {
                const { rectangle } = this.$store.state;

                return parseInt(rectangle.weight * rectangle.position);
            }
        },
        methods: {

            angle() {
                return this.rectangleWeight - this.triangleAndCircleWeight;
            },

            anglePercentage() {
                return (this.$store.state.angle =
                    this.angle() > 3 || this.angle() < -3
                        ? 0
                        : this.angle() * 10 + "%");
            },

            validateDecrementLimit(e, val) {
                e.stopPropagation();

                if (val <= 0) {
                    return val;
                }

                return (val -= 1);
            },

            validateUpperLimit(e, val) {
                e.stopPropagation();

                if (val >= 5) {
                    return val;
                }

                return (val += 1);
            },

            showError() {
                if (window.confirm("Not Balanced.You lost :(")) {
                    return false;
                } else {
                    window.close();
                }
            }
        },
        components: {
            appTriangle: Triangle,
            appRectangle: Rectangle,
            appCircle: Circle
        }
    };
</script>

<style>
  .container {
    width: 50%;
    margin: 0 auto;
  }
  .shape-container {
    height: 100px;
    position: relative;
  }
  .inputs {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 100px;
  }
  .inputs div {
    padding: 10px;
    width: 25%;
    margin: 5px;
  }

  .inputs input {
    transition: all 0.30s ease-in-out;
    outline: none;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    color: #555;
    margin-bottom: 10px;
  }
  .line {
    width: 100%;
    height: 2px;
    background: black;
    position: relative;
    margin-top: 20px;
    transition: 0.3s;
  }
  .shape {
    position: absolute;
    transition: 0.6s;
  }

  .triangle.center {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .weights {
    display: flex;
    justify-content: space-between;
  }

  .balance-rectangle {
    height: 100px;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid black;
    position:relative;
    width:100px;
  }
</style>
