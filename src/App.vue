<template>
  <div class="app-container">
    <h1>Equation Editor</h1>
    <EquationEditor />
  </div>
</template>

<script>
import EquationEditor from './components/EquationEditor.vue';

export default {
  components: { EquationEditor },
};
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}
</style>
