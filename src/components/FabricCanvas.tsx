import { useWindowSize } from '@vueuse/core';
import { fabric } from 'fabric';
import { defineComponent, provide, onMounted, PropType, ref, shallowRef, onUpdated, watchEffect } from 'vue';

export const FABRIC_CANVAS_SYMBOL = Symbol('fabric-canvas');

export default defineComponent({
  name: 'FabricCanvas',
  props: {
    zoom: {
      type: Number as PropType<number>,
    }
  },
  setup(props) {
    const instance = shallowRef<fabric.Canvas>()
    const canvasEl = ref<HTMLCanvasElement>()

    provide(FABRIC_CANVAS_SYMBOL, instance)

    onMounted(() => {
      instance.value = new fabric.Canvas(canvasEl.value!)
    })

    const { width, height } = useWindowSize()
    watchEffect(() => {
      instance.value?.setHeight(height.value)
      instance.value?.setWidth(width.value)
    })

    return {
      canvasEl,
      instance,
      width,
      height,
    }
  },
  render() {
    return (
      <>
        <canvas
          ref="canvasEl"
          width={this.width}
          height={this.height}
        >
        </canvas>
        {this.$slots.default?.()}
      </>
    )
  }
})



{/* <script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { fabric } from 'fabric';
import type { IEvent } from 'fabric/fabric-impl';
import { onMounted, ref, shallowRef, useAttrs, watchEffect } from 'vue';

const canvasEl = ref<HTMLCanvasElement>()

const fCanvas = shallowRef<fabric.Canvas>()

const { width, height } = useWindowSize()

const attrs = useAttrs()

onMounted(() => {
  fCanvas.value = new fabric.Canvas(canvasEl.value!, {
    backgroundColor: '#eee'
  })

  if (attrs.onMousewheel) {
    fCanvas.value.on('mouse:wheel', attrs.onMousewheel as (e: IEvent<WheelEvent>) => void)
  }
})

watchEffect(() => {
  fCanvas.value?.setHeight(height.value)
  fCanvas.value?.setWidth(width.value)
})

defineExpose({
  fCanvas,
})
</script>

<template>
  <canvas
    ref="canvasEl"
    :width="width"
    :height="height"
  >
  </canvas>
</template> */}