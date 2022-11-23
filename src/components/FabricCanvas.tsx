import { useCurrentElement, useDebounceFn, useElementSize, useMagicKeys, useThrottleFn } from '@vueuse/core';
import { fabric } from 'fabric';
import { IEvent } from 'fabric/fabric-impl';
import { defineComponent, provide, onMounted, PropType, ref, watchEffect, watch, onUpdated } from 'vue';
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
    const instance = new fabric.Canvas(null)
    const currentEl = useCurrentElement<HTMLDivElement>()
    const canvasEl = ref<HTMLCanvasElement>()

    // 注入fabric canvas实例
    provide(FABRIC_CANVAS_SYMBOL, instance)

    // 初始化实例
    onMounted(() => {
      instance.initialize(canvasEl.value!)
      instance.on('mouse:wheel', (e) => ctx.emit('mousewheel', e))
    })

    const { width, height } = useElementSize(currentEl)

    watch([width, height], useDebounceFn(() => {
      instance.setDimensions({ width: width.value, height: height.value })
    }, 500, { maxWait: 5000 }))

    // 更新zoom属性
    watchEffect(() => {
      typeof props.zoom === 'number' && instance.setZoom(props.zoom)
    })

    // 复制粘贴
    const { handleCopy, handlePaste } = useFabricCopyPaste(instance)
    const { command_c, command_v } = useMagicKeys()
    watchEffect(() => {
      if (command_c.value) {
        handleCopy()
      }
      if (command_v.value) {
        handlePaste()
      }
    })

    onUpdated(() => { 
      console.info('fabric canvas: rerender');
      instance.renderAll()
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
      <div>
        <canvas ref="canvasEl">
        </canvas>
        {this.$slots.default?.()}
      </div>
    )
  }
})