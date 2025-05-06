<template>
  <div class="button-panel">
    <div v-for="category in categories" :key="category.title" class="category">
      <details>
        <summary>{{ category.title }}</summary>
        <div class="button-group">
          <button
            v-for="btn in category.buttons"
            :key="btn.label"
            @click="handleClick(btn)"
          >
            {{ btn.label }}
          </button>
        </div>
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonPanel",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(btn) {
      if (btn.event) {
        this.$emit(btn.event);
      } else if (btn.code) {
        this.$emit("button-click", btn.code);
      }
    },
  },
};
</script>

<style scoped>
.button-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
  align-items: flex-start;
}

.category {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  background-color: #f9f9f9;
  min-width: 150px;
}

summary {
  font-weight: bold;
  cursor: pointer;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

button {
  padding: 6px 10px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>