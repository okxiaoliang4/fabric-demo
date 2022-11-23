<script setup lang="ts">
import { ref } from 'vue';
import FabricCanvas from './components/FabricCanvas';
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

</script>

<template>
  <header>
    <button
      @click="toJSON"
      class="to_json"
    >toJSON</button>
  </header>
  <div>
    <aside></aside>
    <main>
      <FabricCanvas
        class="canvasWrap"
        :zoom="zoom"
        @mousewheel="onMousewheel"
        ref="fabricCanvas"
      >
        <FabricText></FabricText>
        <FabricRect></FabricRect>
      </FabricCanvas>
    </main>
    <aside></aside>
  </div>

</template>

<style>
#app {
  width: 100vw;
  height: 100vh;
}

.canvasWrap {
  width: 50vw;
  height: 100vh;
}

.to_json {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
