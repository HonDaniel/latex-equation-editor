<template>
  <div class="popup">
    <h3>{{ title }}</h3>
    <form @submit.prevent="submitValues">
      <div v-for="(field, index) in fields" :key="index">
        <label :for="`input-${index}`">{{ field.label }}</label>
        <input
          type="text"
          :id="`input-${index}`"
          v-model="field.value"
          :placeholder="field.placeholder"
        />
      </div>
      <button type="submit">Submit</button>
      <button type="button" @click="$emit('close-popup')">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    fields: Array,
  },
  methods: {
    submitValues() {
      const values = this.fields.map((field) => field.value.trim());
      this.$emit("submit", values);
    },
  },
};
</script>
