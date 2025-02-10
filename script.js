const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const lightbox = document.querySelector(".lightbox");
const downloadImgBtn = lightbox.querySelector(".uil-import");
const closeImgBtn = lightbox.querySelector(".close-icon");

// Sample images (replace with your actual image paths)
const allImages = [
    { src: "images/img-1.jpg", photographer: "Girl" },
    { src: "images/img-2.jpg", photographer: "Simple" },
    { src: "images/img-3.jpg", photographer: "Boy" },
    { src: "images/img-4.jpg", photographer: "Sky" },
    { src: "images/img-5.jpg", photographer: "Vibe" },
    { src: "images/img-6.jpg", photographer: "Random" },
    { src: "images/img-7.jpg", photographer: "Food" },
    { src: "images/img-8.jpg", photographer: "Way" },
    { src: "images/img-9.jpg", photographer: "Path" },
    { src: "images/img-10.jpg", photographer: "Home" },
    { src: "images/img-11.jpg", photographer: "Tree" },
    { src: "images/img-12.jpg", photographer: "Cherry" },
    { src: "images/img-13.jpg", photographer: "Snowy" },
    { src: "images/img-14.jpg", photographer: "Path" },
    { src: "images/img-15.jpg", photographer: "Tree" },
    { src: "images/img-16.jpg", photographer: "Mountain" },
    { src: "images/img-17.jpg", photographer: "Sunset" },
    { src: "images/img-18.jpg", photographer: "Tree" },
    { src: "images/img-19.jpg", photographer: "Flower" },
    { src: "images/img-20.jpg", photographer: "Bird" },

    
];

let displayedImages = [...allImages];

// Function to display images
const generateHTML = (images) => {
    imageWrapper.innerHTML = images.map(img =>
        `<li class="card">
            <img onclick="showLightbox('${img.photographer}', '${img.src}')" src="${img.src}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera"></i>
                    <span>${img.photographer}</span>
                </div>
                <button onclick="downloadImg('${img.src}');">
                    <i class="uil uil-import"></i>
                </button>
            </div>
        </li>`
    ).join("");
};

// Show the lightbox with the selected image
const showLightbox = (name, img) => {
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
};

// Hide the lightbox
const hideLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
};

// Download image functionality
const downloadImg = (imgUrl) => {
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");			
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
};

// Load more functionality
const loadMoreImages = () => {
    displayedImages = [...allImages];  // Reset to all images when "Load More" is clicked.
    generateHTML(displayedImages);
    loadMoreBtn.innerText = "Load More";
    loadMoreBtn.classList.remove("disabled");
};

// Search functionality
const loadSearchImages = (e) => {
    // If search input is empty, reset to all images
    if (e.target.value === "") {
        displayedImages = [...allImages];
        generateHTML(displayedImages);
        return;
    }

    // Filter images based on search term
    displayedImages = allImages.filter(img => img.photographer.toLowerCase().includes(e.target.value.toLowerCase()));
    generateHTML(displayedImages);
};

// Initialize gallery with all images
generateHTML(displayedImages);

// Event listeners
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));
