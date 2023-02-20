export const setDeleteToken = () => {
  localStorage.setItem("token", "");
  window.location.href = "/";
};
