import { useVModel } from '@vueuse/core';
import { fabric } from 'fabric';
import { defineComponent, inject, nextTick, onMounted, onUnmounted, provide, Ref, ShallowRef, shallowRef, watchEffect } from 'vue';
import { FABRIC_CANVAS_SYMBOL } from './FabricCanvas';
import FabricObject from './FabricObject';

export default defineComponent({
  name: 'FabricText',
  extends: FabricObject,
  props: {
    modelValue: {
      type: String,
      defualt: ''
    },
  },
  emits: {
    'update:modelValue': (value: string) => true,
  },
  setup(props, ctx) {
    const modelValue = useVModel(props, 'modelValue', ctx.emit);
    const instance = shallowRef() as ShallowRef<fabric.Text>
    instance.value = new fabric.Textbox(modelValue.value!, {
      fontFamily: 'Comic Sans',
    });

    // add & remove
    const fabricCanvas = inject(FABRIC_CANVAS_SYMBOL)
    onMounted(() => {
      nextTick(() => {
        fabricCanvas?.value.add(instance.value)
      })
    })
    onUnmounted(() => {
      fabricCanvas?.value.remove(instance.value)
    })

    // binding modelValue
    watchEffect(() => instance.value.text = modelValue.value)
    instance.value.on('changed', () => modelValue.value = instance.value.text);

    return {
      instance,
    }
  },
  render: () => null
})
