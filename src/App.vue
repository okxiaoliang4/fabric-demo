<script setup lang="ts">
// import { onMounted, ref, watchEffect } from 'vue';
// import { fabric } from 'fabric';
// import { useMagicKeys } from '@vueuse/core'
// import { useFabricCopyPaste } from './composables/useFabricCopyPaste';
import FabricCanvas from './components/FabricCanvas';
import FabricRect from './components/FabricRect';
import FabricText from './components/FabricText';
// import { useZoom } from './composables/useZoom';

// // const fabricCanvas = ref<InstanceType<typeof FabricCanvas>>()


// // fabricCanvas.value?.fCanvas
// // fabricCanvas

// // const { handleCopy, handlePaste } = useFabricCopyPaste(canvas)

// // const zoom = useZoom(canvas)

// onMounted(() => {
//   const comicSansText = new fabric.Textbox("哈哈", {
//     fontFamily: 'Comic Sans',
//   });
//   const rect = new fabric.Rect({
//     left: 50,
//     top: 50,
//     fill: 'red',
//     width: 20,
//     height: 20
//   });
//   // canvas.value.add(rect);
//   // canvas.value.add(comicSansText);

//   // canvas.value.renderAll();
//   // // console.log(JSON.stringify(canvas.value));
//   // const { command, c, v } = useMagicKeys()
//   // // console.log(res.current);
//   // watchEffect(() => {
//   //   if (canvas.value) {
//   //     if (command.value, c.value) {
//   //       handleCopy()
//   //     }
//   //     if (command.value, v.value) {
//   //       handlePaste()
//   //     }
//   //   }
//   //   // console.log(res.current);
//   // })



// })

// function onMousewheel(opt: any) {
//   const delta = opt.e.deltaY;
//   zoom.value *= 0.999 ** delta;
//   if (zoom.value > 20) zoom.value = 20;
//   if (zoom.value < 0.01) zoom.value = 0.01;
//   opt.e.preventDefault();
//   opt.e.stopPropagation();
// }

function toJSON() {
  // console.log(canvas.value?.toJSON());
  // canvas.value?.loadFromJSON()
}
</script>

<template>
  <FabricCanvas ref="fabricCanvas">
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
