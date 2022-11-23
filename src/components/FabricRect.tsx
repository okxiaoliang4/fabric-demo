import { fabric } from 'fabric';
import { defineComponent, inject, nextTick, onMounted, onUnmounted, provide, Ref, ShallowRef, shallowRef } from 'vue';
import { FABRIC_CANVAS_SYMBOL } from './FabricCanvas';
import FabricObject from './FabricObject';

export default defineComponent({
  name: 'FabricRect',
  extends: FabricObject,
  setup() {
    const instance = shallowRef() as ShallowRef<fabric.Rect>
    instance.value = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red',
    });
    
    const fabricCanvas = inject(FABRIC_CANVAS_SYMBOL)
    onMounted(() => {
      nextTick(() => {
        fabricCanvas?.value.add(instance.value)
      })
    })

    onUnmounted(() => {
      fabricCanvas?.value.remove(instance.value)
    })

    return {
      instance,
    }
  },
  render: () => null
})
