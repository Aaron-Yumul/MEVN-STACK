<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center mb-4">Add New Student</h3>

      <AlertBanner :message="error" @dismiss="error = ''" />

      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.email"
            required
          />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input
            type="number"
            class="form-control"
            v-model.number="student.phone"
            required
          />
        </div>
        <div class="form-group mt-3">
          <button class="btn btn-danger btn-block" :disabled="loading">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm mr-2"
            ></span>
            {{ loading ? "Saving..." : "Create" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AlertBanner from "./AlertBanner.vue";
import { getErrorMessage } from "../utils/getErrorMessage";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default {
  components: { AlertBanner },
  data() {
    return {
      student: { name: "", email: "", phone: "" },
      error: "",
      loading: false,
    };
  },
  methods: {
    handleSubmitForm() {
      if (this.loading) return; // blocks double submits
      this.error = "";
      this.loading = true;
      axios
        .post(`${API}/create-student`, this.student)
        .then(() => {
          this.student = { name: "", email: "", phone: "" };
          this.$router.push("/view");
        })
        .catch((error) => {
          this.error = getErrorMessage(error, "Could not create student.");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
