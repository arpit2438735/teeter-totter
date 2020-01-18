import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    rectangle: {
      weight: Math.floor(Math.random() * 10),
      position: 2
    },
    triangle: {
      weight: 3,
      position: 2
    },
    circle: {
      weight: 2,
      position: 4
    },
    triangleAndCircleWeight: 0,
    rectangleWeight: 0,
    angle: 0
  }
});
