<script setup lang="ts">
import { computed, onMounted, ref, ShallowRef, shallowRef, unref, watch, watchEffect } from 'vue';
import { fabric } from 'fabric';
import { MaybeRef, useMagicKeys, useWindowSize } from '@vueuse/core'

const canvasEl = ref<HTMLCanvasElement>()

const { width, height } = useWindowSize()

const canvas = shallowRef<fabric.Canvas>()

watchEffect(() => {
  canvas.value?.setHeight(height.value)
  canvas.value?.setWidth(width.value)
})

const { handleCopy, handlePaste } = useFabricCopyPaste(canvas)

function useFabricCopyPaste(canvas: MaybeRef<fabric.Canvas | undefined>) {
  type CopyData = Record<string, any>
  const cloned = ref<null | CopyData>(null)

  function handleCopy() {
    unref(canvas)?.getActiveObject().clone((_cloned: any) => {
      cloned.value = _cloned
    });
  }

  function handlePaste() {
    unref(canvas)?.discardActiveObject();
    if (!cloned.value) return
    cloned.value.clone((cloneObj: fabric.ActiveSelection) => {
      cloneObj.set({
        left: cloneObj.left! + 10,
        top: cloneObj.top! + 10,
        evented: true,
      });
      if (cloneObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        cloneObj.canvas = unref(canvas)
        cloneObj.forEachObject((obj: fabric.Object) => {
          unref(canvas)?.add(obj);
        });
        // this should solve the unselectability
        cloneObj.setCoords();
      } else {
        unref(canvas)?.add(cloneObj);
      }
      cloned.value!.top += 10;
      cloned.value!.left += 10;
      unref(canvas)?.setActiveObject(cloneObj);
      unref(canvas)?.requestRenderAll();
    })
  }

  return {
    handleCopy,
    handlePaste
  }
}


const zoom = useZoom(canvas)


onMounted(() => {

  canvas.value = new fabric.Canvas(canvasEl.value!, {
    backgroundColor: '#eee'
  })
  // canvas.value.loadFromJSON(`{"version":"5.2.4","objects":[{"type":"rect","version":"5.2.4","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"textbox","version":"5.2.4","originX":"left","originY":"top","left":0,"top":0,"width":400,"height":45.2,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Comic Sans","fontWeight":"normal","fontSize":40,"text":"I'm in Comic Sans","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","minWidth":20,"splitByGrapheme":false}],"background":"#eee"}`, () => {
  //   console.log(1);
  // })

  const comicSansText = new fabric.Textbox("哈哈", {
    fontFamily: 'Comic Sans',
  });
  const rect = new fabric.Rect({
    left: 50,
    top: 50,
    fill: 'red',
    width: 20,
    height: 20
  });
  canvas.value.add(rect);
  canvas.value.add(comicSansText);

  canvas.value.renderAll();
  // console.log(JSON.stringify(canvas.value));
  const { command, c, v } = useMagicKeys()
  // console.log(res.current);
  watchEffect(() => {
    if (canvas.value) {
      if (command.value, c.value) {
        handleCopy()
      }
      if (command.value, v.value) {
        handlePaste()
      }
    }
    // console.log(res.current);
  })

  canvas.value.on('mouse:wheel', function (opt) {
    const delta = opt.e.deltaY;
    zoom.value *= 0.999 ** delta;
    if (zoom.value > 20) zoom.value = 20;
    if (zoom.value < 0.01) zoom.value = 0.01;
    opt.e.preventDefault();
    opt.e.stopPropagation();
  })
})

function useZoom(canvas: MaybeRef<fabric.Canvas | undefined>) {
  const zoom = ref(unref(canvas)?.getZoom() || 1)

  watchEffect(() => {
    unref(canvas)?.setZoom(zoom.value)
  })

  return zoom
}


</script>

<template>
  <canvas
    ref="canvasEl"
    :width="width"
    :height="height"
  ></canvas>
</template>

<style>

</style>
