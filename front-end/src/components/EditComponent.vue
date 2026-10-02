<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center mb-4">Update Student</h3>

      <AlertBanner :message="error" @dismiss="error = ''" />

      <div v-if="loadFailed" class="text-center">
        <router-link to="/view" class="btn btn-outline-secondary"
          >Back to students</router-link
        >
      </div>

      <form v-else @submit.prevent="handleUpdateForm">
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
            {{ loading ? "Saving..." : "Update" }}
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
      loadFailed: false,
    };
  },
  created() {
    axios
      .get(`${API}/edit-student/${this.$route.params.id}`)
      .then((res) => {
        this.student = res.data;
      })
      .catch((error) => {
        this.loadFailed = true; // invalid id or student not found
        this.error = getErrorMessage(error, "Could not load student.");
      });
  },
  methods: {
    handleUpdateForm() {
      if (this.loading) return;
      this.error = "";
      this.loading = true;
      const { name, email, phone } = this.student; // send only editable fields
      axios
        .put(`${API}/update-student/${this.$route.params.id}`, {
          name,
          email,
          phone,
        })
        .then(() => {
          this.$router.push("/view");
        })
        .catch((error) => {
          this.error = getErrorMessage(error, "Could not update student.");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
