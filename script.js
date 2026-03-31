const API_BASE = 'https://dog.ceo/api';
const DEFAULT_PAGE_SIZE = 12;

async function loadDogs() {
    try {
        // endpoint using your base
        const res = await fetch(`${API_BASE}/breeds/image/random/${DEFAULT_PAGE_SIZE}`);
        const data = await res.json();

        const container = document.querySelector(".boxes");

        if (!container) {
            console.error("Container not found");
            return;
        }

        container.innerHTML = "";

        data.message.forEach(img => {
            const box = document.createElement("div");
            box.classList.add("box");

            const image = document.createElement("img");
            image.src = img;
            image.alt = "Dog Image";

            box.appendChild(image);
            container.appendChild(box);
        });

    } catch (error) {
        console.error("Error fetching dogs:", error);
    }
}

// reload button
function reloadDogs() {
    loadDogs();
}

// initial load
loadDogs();