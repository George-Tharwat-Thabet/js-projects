const inputBox = document.getElementById("input-box");
const imageUpload = document.getElementById("image-upload");
const imageNameDisplay = document.getElementById("image-name");
const listContainer = document.getElementById("list-container");
let selectedImage = null;

// Show the selected image name when the user chooses a file
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    imageNameDisplay.textContent = `Selected image: ${file.name}`;
    selectedImage = file;
  } else {
    imageNameDisplay.textContent = "";
    selectedImage = null;
  }
});

const addTask = () => {
  const taskValue = inputBox.value.trim();
  if (taskValue === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = taskValue;

    // If an image is selected, add it to the task
    if (selectedImage) {
      const img = document.createElement("img");
      const imageUrl = URL.createObjectURL(selectedImage);
      img.src = imageUrl;
      img.alt = selectedImage.name;
      li.appendChild(img);
    }

    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Cross icon (X)
    li.appendChild(span);

    selectedImage = null;
    imageNameDisplay.textContent = ""; // Reset the image name display
  }
  inputBox.value = "";
  imageUpload.value = "";
  saveData();
};

// Event listener for enlarging image when clicked
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    } else if (e.target.tagName === "IMG") {
      // Toggle fullscreen image
      e.target.classList.toggle("fullscreen");
    }
  },
  false
);

const saveData = () => {
  localStorage.setItem("data", listContainer.innerHTML); // Save list data to localStorage
};

const showTask = () => {
  listContainer.innerHTML = localStorage.getItem("data") || ""; // Display saved tasks if available
};

showTask();
