<script setup lang="ts">
import { ref } from 'vue';
import FabricCanvas from './components/FabricCanvas';
import FabricImage from './components/FabricImage';
import FabricRect from './components/FabricRect';
import FabricText from './components/FabricText';
import { useZoom } from './composables/useZoom';

const fabricCanvas = ref<InstanceType<typeof FabricCanvas>>()

const {
  zoom,
  onMousewheel
} = useZoom()

function toJSON() {
  console.log(fabricCanvas.value?.instance.toDatalessJSON());

  // console.log(canvas.value?.toJSON());
  // canvas.value?.loadFromJSON()
}
const text = ref('123')
</script>

<template>
  <header>
    <button
      @click="toJSON"
      class="to_json"
    >toJSON</button>
  </header>
  <section class="container">
    <aside></aside>
    <main>
      <FabricCanvas
        ref="fabricCanvas"
        class="canvasWrap"
        :zoom="zoom"
        @mousewheel="onMousewheel"
      >
        <FabricRect></FabricRect>
        <FabricText v-model="text"></FabricText>
        <FabricImage src="https://place.dog/300/200"></FabricImage>
      </FabricCanvas>
    </main>
    <section class="setup"></section>
  </section>

</template>

<style>
#app {
  display: flex;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
}

.canvasWrap {
  height: 100%;
  width: 500px;
  margin: 0 auto;
  background-color: #fff;
}

.container {
  display: flex;
  flex: 1;
}

aside {
  width: 200px;
  background-color: #fff;
}

main {
  padding: 20px;
  flex: 1;
  background-color: #eee;
}

.setup {
  width: 200px;
}
</style>
