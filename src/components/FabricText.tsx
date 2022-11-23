import { fabric } from 'fabric';
import { defineComponent, inject, nextTick, onMounted, onUnmounted, provide, Ref, ShallowRef, shallowRef } from 'vue';
import { FABRIC_CANVAS_SYMBOL } from './FabricCanvas';
import FabricObject from './FabricObject';

export default defineComponent({
  name: 'FabricText',
  extends: FabricObject,
  setup() {
    const instance = shallowRef() as ShallowRef<fabric.Text>
    instance.value = new fabric.Textbox("哈哈", {
      fontFamily: 'Comic Sans',
    });

    const fabricCanvas = inject(FABRIC_CANVAS_SYMBOL) as fabric.Canvas

    onMounted(() => {
      nextTick(() => {
        fabricCanvas.add(instance.value)
      })
    })

    onUnmounted(() => {
      fabricCanvas.remove(instance.value)
    })

    return {
      instance,
    }
  },
  render: () => null
})
