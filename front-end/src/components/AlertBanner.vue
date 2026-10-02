<template>
  <div v-if="message" class="alert alert-danger alert-dismissible" role="alert">
    {{ message }}
    <button
      type="button"
      class="close"
      aria-label="Close"
      @click="$emit('dismiss')"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: { message: { type: String, default: "" } },
  emits: ["dismiss"],
};
</script>
