<template>
  <div class="row">
    <div class="col-md-12">
      <AlertBanner :message="error" @dismiss="error = ''" />

      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="text-center text-muted">
              <span class="spinner-border spinner-border-sm mr-2"></span>Loading
              students...
            </td>
          </tr>
          <tr v-for="student in Students" :key="student._id">
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phone }}</td>
            <td>
              <router-link
                :to="{ name: 'edit', params: { id: student._id } }"
                class="btn btn-success btn-sm mr-2"
                >Edit</router-link
              >
              <button
                @click.prevent="deleteStudent(student._id)"
                class="btn btn-danger btn-sm"
                :disabled="deletingId === student._id"
              >
                {{ deletingId === student._id ? "Deleting..." : "Delete" }}
              </button>
            </td>
          </tr>
          <tr v-if="!loading && Students.length === 0 && !error">
            <td colspan="4" class="text-center text-muted">No students yet.</td>
          </tr>
        </tbody>
      </table>
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
      Students: [],
      error: "",
      loading: true,
      deletingId: null,
    };
  },
  created() {
    axios
      .get(API)
      .then((res) => {
        this.Students = res.data;
      })
      .catch((error) => {
        this.error = getErrorMessage(error, "Could not load students.");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    deleteStudent(id) {
      if (!window.confirm("Do you really want to delete?")) return;
      this.error = "";
      this.deletingId = id;
      axios
        .delete(`${API}/delete-student/${id}`)
        .then(() => {
          this.Students = this.Students.filter((s) => s._id !== id);
        })
        .catch((error) => {
          this.error = getErrorMessage(error, "Could not delete student.");
        })
        .finally(() => {
          this.deletingId = null;
        });
    },
  },
};
</script>
