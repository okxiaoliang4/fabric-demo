import { fabric } from 'fabric';
import { defineComponent, inject, nextTick, onMounted, onUnmounted, provide, Ref, ShallowRef, shallowRef } from 'vue';
import { FABRIC_CANVAS_SYMBOL } from './FabricCanvas';

export default defineComponent({
  name: 'FabricText',
  setup() {
    const instance = shallowRef() as ShallowRef<fabric.Text>

    instance.value = new fabric.Textbox("哈哈", {
      fontFamily: 'Comic Sans',
    });

    const fabricCanvas = inject<Ref<fabric.Canvas>>(FABRIC_CANVAS_SYMBOL)

    onMounted(() => {
      nextTick(() => { 
        fabricCanvas!.value.add(instance.value)
      })
    })

    onUnmounted(() => {
      fabricCanvas!.value.remove(instance.value)
    })

    return {
      instance,
    }
  },
  render: () => null
})
