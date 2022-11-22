import type { MaybeRef } from "@vueuse/core"
import { IEvent } from "fabric/fabric-impl"
import { ref, unref, watchEffect } from "vue"

export function useZoom(canvas: MaybeRef<fabric.Canvas | undefined>, initinalZoom = 1) {
  const zoom = ref(unref(canvas)?.getZoom() || initinalZoom)

  watchEffect(() => {
    unref(canvas)?.setZoom(zoom.value)
  })

  function onMousewheel(opt: IEvent<WheelEvent>) {
    const delta = opt.e.deltaY;
    zoom.value *= 0.999 ** delta;
    if (zoom.value > 20) zoom.value = 20;
    if (zoom.value < 0.01) zoom.value = 0.01;
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  return {
    zoom,
    onMousewheel,
  }
}
