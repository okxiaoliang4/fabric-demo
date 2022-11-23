import { useMagicKeys, useWindowSize } from '@vueuse/core';
import { fabric } from 'fabric';
import { IEvent } from 'fabric/fabric-impl';
import { defineComponent, provide, onMounted, PropType, ref, shallowRef, watchEffect } from 'vue';
import { useFabricCopyPaste } from '../composables/useFabricCopyPaste';

export const FABRIC_CANVAS_SYMBOL = Symbol('fabric-canvas');

export default defineComponent({
  name: 'FabricCanvas',
  props: {
    zoom: {
      type: Number as PropType<number>,
    }
  },
  emits: {
    'mousewheel': (event: IEvent<WheelEvent>) => true,
  },
  setup(props, ctx) {
    const instance = shallowRef<fabric.Canvas>()
    const canvasEl = ref<HTMLCanvasElement>()

    // 注入fabric canvas实例
    provide(FABRIC_CANVAS_SYMBOL, instance)

    // 初始化实例
    onMounted(() => {
      instance.value = new fabric.Canvas(canvasEl.value!)
      instance.value.on('mouse:wheel', (e) => ctx.emit('mousewheel', e))
    })

    const { width, height } = useWindowSize()
    watchEffect(() => {
      instance.value?.setHeight(height.value)
      instance.value?.setWidth(width.value)
    })

    // 更新zoom属性
    watchEffect(() => {
      typeof props.zoom === 'number' && instance.value?.setZoom(props.zoom)
    })

    // 复制粘贴
    const { handleCopy,handlePaste } = useFabricCopyPaste(instance)
    const { command, c, v } = useMagicKeys()
    watchEffect(() => {
      if (instance.value) {
        if (command.value, c.value) {
          handleCopy()
        }
        if (command.value, v.value) {
          handlePaste()
        }
      }
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