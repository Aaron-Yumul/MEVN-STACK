// Turns any Axios error into one friendly message
export function getErrorMessage(error, fallback = "Something went wrong.") {
  // No response at all = server offline or network problem
  if (!error.response) {
    return "Cannot reach the server. Check that the backend is running on port 4000.";
  }
  const data = error.response.data;
  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors.join(" • ");
  }
  return data?.message || fallback;
}
