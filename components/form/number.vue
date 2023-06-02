<template>
  <v-text-field
    v-model="text"
    label="Number (Optional)"
    variant="solo"
    type="text"
    @input="onInput"
  ></v-text-field>
</template>

<script>
import { useMainStore } from '~~/stores/mainStore';

export default {
  setup() {
    const store = useMainStore();

    return {
      store,
    };
  },
  name: 'formEmailComponent',
  data() {
    return {
      text: this.origin,
    };
  },
  methods: {
    onInput() {
      this.$emit('onInput', this.text)
    }
  },
  watch: {
    origin() {
      this.text = this.origin
    }
  },
  props: {
    origin: {
      type: String,
      required: true,
    }
  },
  emits: ['onInput']
};
</script>