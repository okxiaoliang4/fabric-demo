import { fabric } from 'fabric';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FabricObject',
  props: {
  },
  setup(props) {
    const instance = new fabric.Object({})

    return {
      instance,
    }
  },
  render: () => null,
})
