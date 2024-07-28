// Function to validate and display the selected image as a preview
function displaySelectedImage() {
    const fileInput = document.getElementById('fileInput');
    const selectedImage = document.getElementById('selectedImage');

    if (fileInput.files && fileInput.files[0]) {
        const selectedFile = fileInput.files[0];

        // Check if the selected file is an image
        if (isImageFile(selectedFile)) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Reset any previous styles
                selectedImage.style.width = 'auto';
                selectedImage.style.height = 'auto';

                // Set the max width and height for the preview
                selectedImage.style.maxWidth = '500px';
                selectedImage.style.maxHeight = '500px';

                selectedImage.src = e.target.result;
            };

            reader.readAsDataURL(selectedFile);
        } else {
            // Clear the file input if the selected file is not an image
            fileInput.value = '';
            alert('Please select a valid image file.');
        }
    }
}

// Function to check if a file is an image
function isImageFile(file) {
    const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp']; // Add more image types if needed
    return imageTypes.includes(file.type);
}

// Add an event listener to the file input
document.getElementById('fileInput').addEventListener('change', displaySelectedImage);
