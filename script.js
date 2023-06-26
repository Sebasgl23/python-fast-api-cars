function getProducts() {
  fetch("http://127.0.0.1:8000/products")
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";

      products.forEach((product) => {
        const row = document.createElement("tr");

        const imageCell = document.createElement("td");
        const image = document.createElement("img");
        image.src = product.image;
        imageCell.appendChild(image);
        image.classList.add("product-image");
        row.appendChild(imageCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        const stockCell = document.createElement("td");
        stockCell.textContent = product.stock;
        row.appendChild(stockCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const actionsCell = document.createElement("td");
        actionsCell.classList.add("actions-cell");

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("btn", "btn-success", "mr-2");
        editButton.addEventListener("click", () => {
          showEditProductModal(product);
        });
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Borrar";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.addEventListener("click", () => {
          showDeleteConfirmation(product.id);
        });
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        productList.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
    });
}

function showEditProductModal(product) {
  const modal = document.getElementById("editProductModal");
  const updateButton = document.getElementById("updateProductButton");
  const cancelAddButton = document.getElementById("editProductCancel");

  document.getElementById("productId").value = product.id;
  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editProductDescription").value = product.description;
  document.getElementById("editProductImage").value = product.image;
  document.getElementById("editProductStock").value = product.stock;

  updateButton.addEventListener("click", () => {
    const updatedProduct = {
      id: document.getElementById("productId").value,
      name: document.getElementById("editProductName").value,
      price: document.getElementById("editProductPrice").value,
      description: document.getElementById("editProductDescription").value,
      image: document.getElementById("editProductImage").value,
      stock: document.getElementById("editProductStock").value,
    };

    updateProduct(updatedProduct);
    windows.reload(true);
  });

  cancelAddButton.addEventListener("click", () => {
    windows.reload(true);
  });

  $(modal).modal("show");
}

function showDeleteConfirmation(productId) {
  const modal = document.getElementById("confirmDeleteModal");
  const deleteButton = document.getElementById("deleteProductButton");
  const cancelButton = document
    .getElementById("confirmDeleteModal")
    .querySelector(".btn-secondary");

  deleteButton.addEventListener("click", () => {
    deleteProduct(productId);
    windows.reload(true);
  });

  cancelButton.addEventListener("click", () => {
    windows.reload(true);
  });

  $(modal).modal("show");
}

function deleteProduct(productId) {
  const url = `http://127.0.0.1:8000/products/${productId}`;
  fetch(url, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        location.reload(true);
      } else {
        console.error("Error al eliminar el producto");
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el producto:", error);
    });
}

function updateProduct(product) {
  const url = `http://127.0.0.1:8000/products/${product.id}`;
  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (response.ok) {
        location.reload(true);
      } else {
        console.error("Error al actualizar el producto");
      }
    })
    .catch((error) => {
      console.error("Error al actualizar el producto:", error);
    });
}

function saveProduct(product) {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productImage = document.getElementById("productImage").value;
  const productStock = document.getElementById("productStock").value;

  const newProduct = {
    name: productName,
    price: productPrice,
    description: productDescription,
    image: productImage,
    stock: productStock,
  };

  fetch("http://127.0.0.1:8000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (response.ok) {
        location.reload(true);
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productDescription").value = "";
        document.getElementById("productImage").value = "";
        document.getElementById("productStock").value = "";
        
      } else {
        console.error("Error al crear el producto");
      }
    })
    .catch((error) => {
      console.error("Error al crear el producto:", error);
    });
}

function showAddProductModal() {
  const modal = document.getElementById("addProductModal");
  const saveButton = document.getElementById("saveProductButton");
  const cancelButton = modal.querySelector(".btn-secondary");

  saveButton.addEventListener("click", () => {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productImage = document.getElementById("productImage").value;
    const productStock = document.getElementById("productStock").value;

    const newProduct = {
      name: productName,
      price: productPrice,
      description: productDescription,
      image: productImage,
      stock: productStock,
    };

    saveProduct(newProduct);
    windows.reload(true);
  });

  cancelButton.addEventListener("click", () => {
    windows.reload(true);
  });

  $(modal).modal("show");
}

window.addEventListener("load", getProducts);

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", showAddProductModal);
