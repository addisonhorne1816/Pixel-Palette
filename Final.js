const palettes = [
    {
        name: "Vanilla Cream",
        description: "A warm and welcoming palette with soft, natural colors.",
        colors: [
            { name: "Vanilla Cream", hex: "#FFEE76" },
            { name: "Blush Petal", hex: "#F7C8D3" },
            { name: "Rosewood", hex: "#B46A72" },
            { name: "Sage Leaf", hex: "#A8B58A" },
            { name: "Misty Sky", hex: "#A9B7C6" },
            { name: "Midnight Lagoon", hex: "#2D3A47" }
        ]
    },
    {
        name: "Lavender Dreams",
        description: "A soft and calming palette with lavender and blush tones.",
        colors: [
            { name: "Lavender", hex: "#C8B6E2" },
            { name: "Lilac", hex: "#A98CC3" },
            { name: "Blush", hex: "#F3CBDD" },
            { name: "Pearl", hex: "#F8F4F0" },
            { name: "Plum", hex: "#624A72" }
        ]
    },
    {
        name: "Winter Glow",
        description: "A cool winter palette with muted mauve and frosted colors.",
        colors: [
            { name: "Snowberry Mauve", hex: "#86576B" },
            { name: "Winter Mist", hex: "#DBCFD1" },
            { name: "Frosted Lavender", hex: "#8A7C9D" },
            { name: "Glimmer", hex: "#F6E9DA" },
            { name: "Snow", hex: "#D0D7E4" }
        ]
    },
    {
        name: "Bonfire",
        description: "A warm and cozy palette inspired by autumn sunsets and firelight.",
        colors: [
            { name: "Tobi Brown", hex: "#482420" },
            { name: "Apple Blossom", hex: "#B24D37" },
            { name: "Bonfire", hex: "#F78358" },
            { name: "Copper River", hex: "#F59C6A" },
            { name: "Peach", hex: "#FEBF7C" },
            { name: "Buttermilk", hex: "#FFEEB0" }
        ]
    },
    {
        name: "Peaches and Cream",
        description: "A gentle palette with warm peach and muted rose colors.",
        colors: [
            { name: "Concrete", hex: "#525871" },
            { name: "Warm Steel", hex: "#857C91" },
            { name: "Rosewood", hex: "#CD9FA0" },
            { name: "Peaches & Cream", hex: "#F2C1A3" },
            { name: "Dawn", hex: "#F8CCAA" }
        ]
    },
    {
        name: "Cool Horizons",
        description: "A peaceful palette inspired by cool skies and natural stone.",
        colors: [
            { name: "Celeste", hex: "#AFC6D9" },
            { name: "Azure", hex: "#E7EEF5" },
            { name: "Dusty Slate", hex: "#8FA0B2" },
            { name: "Silver Dollar", hex: "#9FB5A8" },
            { name: "Cool Stone", hex: "#6B7280" }
        ]
    }
];

let paletteIndex = 0;

const swatchesContainer = document.getElementById("swatches");
const paletteName = document.getElementById("palette-name");
const paletteDescription = document.getElementById("palette-description");
const copyStatus = document.getElementById("copy-status");

function renderPalette(index) {
    const palette = palettes[index];

    paletteName.textContent = palette.name;
    paletteDescription.textContent = palette.description;

    swatchesContainer.replaceChildren();

    palette.colors.forEach((color) => {
        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.setProperty("--swatch-color", color.hex);

        const colorBlock = document.createElement("span");
        colorBlock.className = "swatch-color";
        colorBlock.setAttribute("aria-hidden", "true");

        const name = document.createElement("span");
        name.className = "swatch-name";
        name.textContent = color.name;

        const code = document.createElement("code");
        code.textContent = color.hex;

        const copyButton = document.createElement("button");
        copyButton.type = "button";
        copyButton.className = "copy-color";
        copyButton.dataset.color = color.hex;
        copyButton.textContent = "Copy code";

        swatch.append(colorBlock, name, code, copyButton);
        swatchesContainer.appendChild(swatch);
    });
}

// Display the first palette when the page loads.
renderPalette(paletteIndex);

// Show the next palette when the button is clicked.
document.getElementById("next-palette").addEventListener("click", () => {
    paletteIndex = (paletteIndex + 1) % palettes.length;

    renderPalette(paletteIndex);

    copyStatus.textContent =
        "Showing the " + palettes[paletteIndex].name + " palette.";
});

// Copy a color code when its button is clicked.
swatchesContainer.addEventListener("click", async (event) => {
    const button = event.target.closest(".copy-color");

    if (!button) {
        return;
    }

    const color = button.dataset.color;

    try {
        await navigator.clipboard.writeText(color);
        copyStatus.textContent = color + " copied to your clipboard.";
    } catch (error) {
        copyStatus.textContent =
            "Your browser could not copy automatically. Select the code and copy it manually: " + color;
    }
});

// Automatically update the copyright year if the element exists.
const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const pagesMenu = document.getElementById("pages-menu");

menuToggle.addEventListener("click", () => {
    pagesMenu.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close pages menu");
});

menuClose.addEventListener("click", () => {
    pagesMenu.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open pages menu");
});