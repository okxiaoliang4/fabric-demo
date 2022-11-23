import { useMagicKeys, useWindowSize } from '@vueuse/core';
import { fabric } from 'fabric';
import { IEvent } from 'fabric/fabric-impl';
import { defineComponent, provide, onMounted, PropType, ref, watchEffect } from 'vue';
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
    const canvasEl = ref<HTMLCanvasElement>()

    // 注入fabric canvas实例
    provide(FABRIC_CANVAS_SYMBOL, instance)

    // 初始化实例
    onMounted(() => {
      instance.initialize(canvasEl.value!)
      instance.on('mouse:wheel', (e) => ctx.emit('mousewheel', e))
    })

    const { width, height } = useWindowSize()
    watchEffect(() => {
      instance.setHeight(height.value)
      instance.setWidth(width.value)
    })

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