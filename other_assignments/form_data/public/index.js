const jsFormNameInput = document.getElementById("js-form-data-name-input");
const jsFormFileInput = document.getElementById("js-form-data-file-input");

const handleFormData = () => {
  const formData = new FormData();

  const inputName = jsFormNameInput.value;
  if (inputName) {
    formData.append("givenName", inputName);
  }

  const fileList = jsFormFileInput.files;
  const files = Object.values(fileList);

  if (Array.isArray(files) && files.length > 0) {
    files.forEach((file) => {
      formData.append(`files`, file);
    });
  }

  if (formData.has("givenName") || formData.has("files")) {
    console.log(formData);

    fetch("/file-upload", {
      method: "POST",
      body: formData,
    });
  }
};

document
  .getElementById("js-form-data-submit")
  .addEventListener("click", handleFormData);
