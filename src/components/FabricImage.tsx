import { useImage } from '@vueuse/core';
import { fabric } from 'fabric';
import { defineComponent, inject, nextTick, onMounted, onUnmounted, provide, ref, Ref, ShallowRef, shallowRef, watchEffect } from 'vue';
import { FABRIC_CANVAS_SYMBOL } from './FabricCanvas';
import FabricObject from './FabricObject';

export default defineComponent({
  name: 'FabricImage',
  extends: FabricObject,
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const instance = shallowRef() as ShallowRef<fabric.Image>

    fabric.Image.fromURL(props.src, (result) => {
      instance.value = result
      fabricCanvas.add(instance.value)
    });

    const fabricCanvas = inject(FABRIC_CANVAS_SYMBOL) as fabric.Canvas
    // onMounted(() => {
    //   nextTick(() => {
    //     fabricCanvas.add(instance.value)
    //   })
    // })

    onUnmounted(() => {
      fabricCanvas.remove(instance.value)
    })

    return {
      instance,
    }
  },
  render: () => null
})
