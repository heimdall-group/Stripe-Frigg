<template>
  <v-text-field
    v-model="text"
    label="Repeat Password"
    variant="solo"
    type="password"
    :disabled="disabled"
    :rules="[
      this.store.verify_requiredRule, 
      () => {return this.store.verify_pwdMatchRule(this.pwd_2, this.pwd_1)}, 
      this.store.verify_LengthRule
    ]"
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
  name: 'formPasswordRepeatComponent',
  data() {
    return {
      text: this.pwd_2,
    };
  },
  methods: {
    onInput() {
      this.$emit('onInput', this.text)
    }
  },
  watch: {
    origin() {
      this.text = this.pwd_2
    }
  },
  props: {
    pwd_1: {
      type: String,
      required: true,
    },
    pwd_2: {
      type:  String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
    }
  },
  emits: ['onInput']
};
</script>