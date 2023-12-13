let postImage = { myFile: "" };

async function handleFileUpload(event) {
  const file = event.target.files[0];
  const maxSizeInKB = 500;
  console.log(file.size);
  if (file.size > maxSizeInKB * 1024) {
    alert("File size exceeds the limit (500KB). Please choose a smaller file.");
    return;
  }

  const base64 = await resizeAndConvertToBase64(file, maxSizeInKB);
  document.getElementById("previewImage").src = base64;
  postImage = { myFile: base64 };
}

function resizeAndConvertToBase64(file, maxSizeInKB) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    image.onload = () => {
      let width = image.width;
      let height = image.height;
      const aspectRatio = width / height;

      // Calculate new dimensions while maintaining aspect ratio
      const maxSizeInPixels = Math.sqrt((maxSizeInKB * 1024) / (4 / 3)); // Assuming image is in 4:3 aspect ratio
      if (width > maxSizeInPixels) {
        width = maxSizeInPixels;
        height = width / aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      context.drawImage(image, 0, 0, width, height);

      // Convert the canvas to base64
      const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8); // Adjust the format and quality as needed

      resolve(resizedBase64);
    };

    image.onerror = (error) => {
      reject(error);
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}

document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
      const response = await fetch(this.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: document.querySelector('input[name="title"]').value,
          content: document.querySelector('textarea[name="content"]').value,
          myFile: postImage.myFile,
        }),
      });

      if (response.ok) {
        window.location.href = "/announcements";
      } else {
        console.error("Failed to create announcement");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
