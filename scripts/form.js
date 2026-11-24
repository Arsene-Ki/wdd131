const productSelect = document.querySelector("#product");
const installDate = document.querySelector("#install-date");

// Add one option per product after the placeholder option.
function populateProducts(productList) {
  productList.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    productSelect.appendChild(option);
  });
}

// A product cannot have been installed in the future.
function limitInstallDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  installDate.max = `${today.getFullYear()}-${month}-${day}`;
}

populateProducts(products);
limitInstallDate();
