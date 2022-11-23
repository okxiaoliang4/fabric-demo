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
  <FabricCanvas
    :zoom="zoom"
    @mousewheel="onMousewheel"
    ref="fabricCanvas"
  >
    <FabricText></FabricText>
    <FabricRect></FabricRect>
  </FabricCanvas>
  <button
    @click="toJSON"
    class="to_json"
  >toJSON</button>
</template>

<style>
.to_json {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
