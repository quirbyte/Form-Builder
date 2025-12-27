const addBtn = document.querySelector(".addBtn");
const formPreview = document.querySelector(".preview-area");
const fieldType = document.querySelector("#fieldType");
const optionsInput = document.querySelector("#field-options");
const optionsTitle = document.querySelector("#optionsTitle");

const fields = [];

// show options input only when needed
fieldType.addEventListener("change", () => {
  if (fieldType.value === "radio" || fieldType.value === "checkbox") {
    optionsInput.style.display = "block";
    optionsTitle.style.display = "block";
  } else {
    optionsInput.style.display = "none";
    optionsTitle.style.display = "none";
  }
});

addBtn.addEventListener("click", () => {
  const type = fieldType.value;
  const label = document.querySelector("#field-label").value.trim();
  const optionsValue = optionsInput.value.trim();

  if (!label) {
    alert("Enter field label");
    return;
  }

  const field = { label, type };

  if (type === "radio" || type === "checkbox") {
    if (!optionsValue) {
      alert("Enter options like: male,female");
      return;
    }
    field.options = optionsValue.split(",").map(o => o.trim());
  }

  fields.push(field);
  renderForm();

  // reset
  fieldType.value = "text";
  document.querySelector("#field-label").value = "";
  optionsInput.value = "";
  optionsInput.style.display = "none";
  optionsTitle.style.display = "none";
});

function renderForm() {
  formPreview.innerHTML = "";

  fields.forEach((field, index) => {
    const div = document.createElement("div");
    div.className = "field";

    if (field.type === "text") {
      div.innerHTML = `
        <label>${field.label}</label><br/>
        <input type="text" />
      `;
    }

    if (field.type === "checkbox") {
      div.innerHTML = `<strong>${field.label}</strong><br/>`;
      field.options.forEach(opt => {
        div.innerHTML += `
          <label>
            <input type="checkbox" /> ${opt}
          </label><br/>
        `;
      });
    }

    if (field.type === "radio") {
      div.innerHTML = `<strong>${field.label}</strong><br/>`;
      field.options.forEach(opt => {
        div.innerHTML += `
          <label>
            <input type="radio" name="radio-${index}" /> ${opt}
          </label><br/>
        `;
      });
    }

    formPreview.appendChild(div);
  });
}
