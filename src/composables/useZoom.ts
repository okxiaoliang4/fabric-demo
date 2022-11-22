import { IEvent } from "fabric/fabric-impl"
import { ref } from "vue"

export function useZoom(initinalZoom = 1) {
  const zoom = ref(initinalZoom)

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
