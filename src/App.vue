<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fabric } from 'fabric';
import { useWindowSize } from '@vueuse/core'

const canvasEl = ref<HTMLCanvasElement>()

const { width, height } = useWindowSize()

onMounted(() => {
  console.log(canvasEl.value!);
  
  const canvas = new fabric.Canvas(canvasEl.value!)
  const rect = new fabric.Rect({
    left: 50,
    top: 50,
    fill: 'red',
    width: 20,
    height: 20
  });
  canvas.add(rect);
  canvas.renderAll();
})
</script>

<template>
  <div>
    <canvas
      ref="canvasEl"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<style>

</style>
