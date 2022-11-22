import { MaybeRef } from "@vueuse/core";
import { ref, unref } from "vue";

export function useFabricCopyPaste(canvas: MaybeRef<fabric.Canvas | undefined>) {
  type CopyData = Record<string, any>
  const cloned = ref<null | CopyData>(null)

  function handleCopy() {
    unref(canvas)?.getActiveObject().clone((_cloned: any) => {
      cloned.value = _cloned
    });
  }

  function handlePaste() {
    unref(canvas)?.discardActiveObject();
    if (!cloned.value) return
    cloned.value.clone((cloneObj: fabric.ActiveSelection) => {
      cloneObj.set({
        left: cloneObj.left! + 10,
        top: cloneObj.top! + 10,
        evented: true,
      });
      if (cloneObj.type === 'activeSelection') {
        // active selection needs a reference to the canvas.
        cloneObj.canvas = unref(canvas)
        cloneObj.forEachObject((obj: fabric.Object) => {
          unref(canvas)?.add(obj);
        });
        // this should solve the unselectability
        cloneObj.setCoords();
      } else {
        unref(canvas)?.add(cloneObj);
      }
      cloned.value!.top += 10;
      cloned.value!.left += 10;
      unref(canvas)?.setActiveObject(cloneObj);
      unref(canvas)?.requestRenderAll();
    })
  }

  return {
    handleCopy,
    handlePaste
  }
}
