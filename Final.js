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


// =====================================
// COLOR LAB
// =====================================

let paletteIndex = 0;

const swatchesContainer = document.getElementById("swatches");
const paletteName = document.getElementById("palette-name");
const paletteDescription = document.getElementById("palette-description");
const copyStatus = document.getElementById("copy-status");
const nextPalette = document.getElementById("next-palette");

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


// Only run Color Lab if its elements exist.
if (swatchesContainer && paletteName && paletteDescription && copyStatus && nextPalette) {

    // Display the first palette.
    renderPalette(paletteIndex);

    // Show the next palette.
    nextPalette.addEventListener("click", () => {

        paletteIndex = (paletteIndex + 1) % palettes.length;

        renderPalette(paletteIndex);

        copyStatus.textContent =
            "Showing the " + palettes[paletteIndex].name + " palette.";

    });

    // Copy color codes.
    swatchesContainer.addEventListener("click", async (event) => {

        const button = event.target.closest(".copy-color");

        if (!button) {
            return;
        }

        const color = button.dataset.color;

        try {

            await navigator.clipboard.writeText(color);

            copyStatus.textContent =
                color + " copied to your clipboard.";

        } catch (error) {

            copyStatus.textContent =
                "Your browser could not copy automatically. Select the code and copy it manually: " + color;

        }

    });

}


// =====================================
// COPYRIGHT YEAR
// =====================================

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =====================================
// HAMBURGER MENU
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const pagesMenu = document.getElementById("pages-menu");


// Only run the menu if all three elements exist.
if (menuToggle && menuClose && pagesMenu) {

    // Open menu.
    menuToggle.addEventListener("click", () => {

        pagesMenu.hidden = false;

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close pages menu");

    });

    // Close menu.
    menuClose.addEventListener("click", () => {

        pagesMenu.hidden = true;

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open pages menu");

    });

    // Close menu with Escape key.
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && !pagesMenu.hidden) {

            pagesMenu.hidden = true;

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open pages menu");

            menuToggle.focus();

        }

    });

}

document.addEventListener("DOMContentLoaded", function () {

    const fontChoice = document.getElementById("font-choice");
    const fontSize = document.getElementById("font-size");
    const fontWeight = document.getElementById("font-weight");
    const fontPreview = document.getElementById("font-preview");
    const sampleText = document.getElementById("sample-text");
    const resetButton = document.getElementById("reset-font");

    if (!fontChoice || !fontSize || !fontWeight ||
        !fontPreview || !sampleText || !resetButton) {
        return;
    }

    function updatePreview() {

        fontPreview.style.fontFamily = fontChoice.value;
        fontPreview.style.fontSize = fontSize.value;
        fontPreview.style.fontWeight = fontWeight.value;

        fontPreview.textContent =
            sampleText.value || "Your Text Here!";

    }

    fontChoice.addEventListener("change", updatePreview);
    fontSize.addEventListener("change", updatePreview);
    fontWeight.addEventListener("change", updatePreview);
    sampleText.addEventListener("input", updatePreview);

    resetButton.addEventListener("click", function () {

        fontChoice.value = "'DM Sans', sans-serif";
        fontSize.value = "36px";
        fontWeight.value = "700";
        sampleText.value = "Creativity Starts Here!";

        updatePreview();

    });

    updatePreview();

});
document.addEventListener("DOMContentLoaded", function () {

    const baseColor = document.getElementById("base-color");
    const harmonyChoice = document.getElementById("harmony-choice");
    const harmonyName = document.getElementById("harmony-name");
    const harmonySwatches = document.getElementById("harmony-swatches");
    const labStatus = document.getElementById("lab-status");

    // Only run on the Color Theory page
    if (!baseColor || !harmonyChoice || !harmonySwatches) {
        return;
    }

    // Convert HEX color to HSL
    function hexToHSL(hex) {

        let r = parseInt(hex.substring(1, 3), 16) / 255;
        let g = parseInt(hex.substring(3, 5), 16) / 255;
        let b = parseInt(hex.substring(5, 7), 16) / 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);

        let h = 0;
        let s = 0;
        let l = (max + min) / 2;

        if (max !== min) {

            let d = max - min;

            s = l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

            switch (max) {

                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / d + 2;
                    break;

                case b:
                    h = (r - g) / d + 4;
                    break;

            }

            h *= 60;
        }

        return {
            h: h,
            s: s * 100,
            l: l * 100
        };

    }

    // Create an HSL color
function makeColor(h, s, l) {

    h = ((h % 360) + 360) % 360;

    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));

    return hslToHex(h, s, l);

}

    // Convert HSL to HEX
    function hslToHex(h, s, l) {

        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;

        let r = 0;
        let g = 0;
        let b = 0;

        if (h < 60) {
            r = c;
            g = x;
        } else if (h < 120) {
            r = x;
            g = c;
        } else if (h < 180) {
            g = c;
            b = x;
        } else if (h < 240) {
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            b = c;
        } else {
            r = c;
            b = x;
        }

        const toHex = function (value) {
            return Math.round((value + m) * 255)
                .toString(16)
                .padStart(2, "0");
        };

        return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();

    }

    // Generate the color harmony
    function generateHarmony() {

        const color = hexToHSL(baseColor.value);
        const harmony = harmonyChoice.value;

        let colors = [];

        switch (harmony) {

            case "complementary":

                colors = [
                    makeColor(color.h, color.s, color.l),
                    makeColor(color.h + 180, color.s, color.l)
                ];

                harmonyName.textContent = "Complementary Palette";

                break;

            case "analogous":

                colors = [
                    makeColor(color.h - 30, color.s, color.l),
                    makeColor(color.h, color.s, color.l),
                    makeColor(color.h + 30, color.s, color.l)
                ];

                harmonyName.textContent = "Analogous Palette";

                break;

            case "triadic":

                colors = [
                    makeColor(color.h, color.s, color.l),
                    makeColor(color.h + 120, color.s, color.l),
                    makeColor(color.h + 240, color.s, color.l)
                ];

                harmonyName.textContent = "Triadic Palette";

                break;

            case "monochromatic":

                colors = [
                    makeColor(color.h, color.s, 25),
                    makeColor(color.h, color.s, 42),
                    makeColor(color.h, color.s, 62),
                    makeColor(color.h, color.s, 82)
                ];

                harmonyName.textContent = "Monochromatic Palette";

                break;

        }

        // Clear the previous colors
        harmonySwatches.innerHTML = "";

        // Display the new colors
        colors.forEach(function (colorValue) {

			const hexColor = colorValue;
            const swatch = document.createElement("div");
            swatch.className = "lab-swatch";

            const colorBox = document.createElement("span");
            colorBox.className = "lab-swatch-color";
            colorBox.style.backgroundColor = hexColor;

            const code = document.createElement("code");
            code.textContent = hexColor;

            swatch.appendChild(colorBox);
            swatch.appendChild(code);

            harmonySwatches.appendChild(swatch);

        });

        labStatus.textContent =
            "Your " + harmony + " color palette has been updated.";

    }

    // Update when the starting color changes
    baseColor.addEventListener("input", generateHarmony);

    // Update when the harmony changes
    harmonyChoice.addEventListener("change", generateHarmony);

    // Display the starting palette
    generateHarmony();

});