const jsFormInput = document.getElementById("js-form-data-input");

const handleFormData = () => {
  const formData = new FormData();

  const files = Object.values(jsFormInput.files);

  console.log(files);
  if (Array.isArray(files)) {
    files.forEach((file, i) => {
      formData.append(`file${i}`, file);
    });

    fetch("/file-upload", {
      method: "POST",
      body: formData,
    });
  }
};

document
  .getElementById("js-form-data-submit")
  .addEventListener("click", handleFormData);
