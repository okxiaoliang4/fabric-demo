import type { MaybeRef } from "@vueuse/core"
import { ref, unref, watchEffect } from "vue"

export function useZoom(canvas: MaybeRef<fabric.Canvas | undefined>) {
  const zoom = ref(unref(canvas)?.getZoom() || 1)

  watchEffect(() => {
    unref(canvas)?.setZoom(zoom.value)
  })

  return zoom
}