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
/* =========================================
   MAKE YOUR OWN PALETTE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const wheel = document.getElementById("color-wheel-picker");

    // Only run this section on the Make Your Own Palette page.
    if (!wheel) {
        return;
    }

    const marker = document.getElementById("color-wheel-marker");
    const colorInput = document.getElementById("color-input");
    const hexInput = document.getElementById("hex-input");
    const brightnessInput = document.getElementById("brightness-input");
    const brightnessValue = document.getElementById("brightness-value");
    const colorNameInput = document.getElementById("color-name-input");
    const selectedColorBox = document.getElementById("selected-color-box");
    const selectedColorName = document.getElementById("selected-color-name");
    const selectedColorHex = document.getElementById("selected-color-hex");
    const addColorButton = document.getElementById("add-color-button");
    const paletteDisplay = document.getElementById("palette-display");
    const paletteNameInput = document.getElementById("palette-name");
    const colorCount = document.getElementById("color-count");
    const studioStatus = document.getElementById("studio-status");

    const copyPaletteButton = document.getElementById("copy-palette-button");
    const downloadPaletteButton = document.getElementById("download-palette-button");
    const resetPaletteButton = document.getElementById("reset-palette-button");

    let selectedColor = "#F47C6B";
    let selectedHue = 10;
    let selectedSaturation = 90;
    let selectedLightness = 50;

    let palette = [];
    const maximumColors = 12;
    const storageKey = "pixelPaletteCustomPalette";

    // Convert HEX into RGB.
    function hexToRgb(hex) {

        const cleanHex = hex.replace("#", "");

        return {
            r: parseInt(cleanHex.substring(0, 2), 16),
            g: parseInt(cleanHex.substring(2, 4), 16),
            b: parseInt(cleanHex.substring(4, 6), 16)
        };
    }

    // Convert RGB into HSL.
    function rgbToHsl(r, g, b) {

        r /= 255;
        g /= 255;
        b /= 255;

        const maximum = Math.max(r, g, b);
        const minimum = Math.min(r, g, b);

        let h = 0;
        let s = 0;
        let l = (maximum + minimum) / 2;

        if (maximum !== minimum) {

            const difference = maximum - minimum;

            s = l > 0.5
                ? difference / (2 - maximum - minimum)
                : difference / (maximum + minimum);

            switch (maximum) {

                case r:
                    h = (g - b) / difference + (g < b ? 6 : 0);
                    break;

                case g:
                    h = (b - r) / difference + 2;
                    break;

                case b:
                    h = (r - g) / difference + 4;
                    break;
            }

            h *= 60;
        }

        return {
            h: Math.round(h),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    // Convert HSL into HEX.
    function hslToHex(h, s, l) {

        s /= 100;
        l /= 100;

        const chroma = (1 - Math.abs(2 * l - 1)) * s;
        const section = h / 60;
        const x = chroma * (1 - Math.abs(section % 2 - 1));
        const m = l - chroma / 2;

        let r = 0;
        let g = 0;
        let b = 0;

        if (section >= 0 && section < 1) {
            r = chroma;
            g = x;
        } else if (section < 2) {
            r = x;
            g = chroma;
        } else if (section < 3) {
            g = chroma;
            b = x;
        } else if (section < 4) {
            g = x;
            b = chroma;
        } else if (section < 5) {
            r = x;
            b = chroma;
        } else {
            r = chroma;
            b = x;
        }

        const toHex = function (value) {
            return Math.round((value + m) * 255)
                .toString(16)
                .padStart(2, "0");
        };

        return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
    }

    // Update the selected color and its controls.
    function updateSelectedColor(hex, updateWheelPosition) {

        selectedColor = hex.toUpperCase();

        const rgb = hexToRgb(selectedColor);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

        selectedHue = hsl.h;
        selectedSaturation = hsl.s;
        selectedLightness = hsl.l;

        colorInput.value = selectedColor;
        hexInput.value = selectedColor;
        brightnessInput.value = selectedLightness;
        brightnessValue.textContent = selectedLightness + "%";

        selectedColorBox.style.backgroundColor = selectedColor;
        selectedColorHex.textContent = selectedColor;

        if (!colorNameInput.value.trim()) {
            colorNameInput.value = "Custom Color";
        }

        selectedColorName.textContent = colorNameInput.value.trim();

        if (updateWheelPosition) {

            const angle = selectedHue * Math.PI / 180;
            const radius = selectedSaturation / 100;

            const x = 50 + Math.sin(angle) * radius * 50;
            const y = 50 - Math.cos(angle) * radius * 50;

            marker.style.left = x + "%";
            marker.style.top = y + "%";
        }

        marker.style.backgroundColor = selectedColor;
    }

    // Read a selected color from the wheel.
    function chooseWheelColor(event) {

        const bounds = wheel.getBoundingClientRect();

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const pointerX = event.clientX - bounds.left;
        const pointerY = event.clientY - bounds.top;

        const differenceX = pointerX - centerX;
        const differenceY = pointerY - centerY;

        const distance = Math.sqrt(
            differenceX * differenceX +
            differenceY * differenceY
        );

        const radius = Math.min(
            distance / (Math.min(bounds.width, bounds.height) / 2),
            1
        );

        let angle = Math.atan2(differenceX, -differenceY) * 180 / Math.PI;

        if (angle < 0) {
            angle += 360;
        }

        selectedHue = angle;
        selectedSaturation = Math.round(radius * 100);

        selectedColor = hslToHex(
            selectedHue,
            selectedSaturation,
            selectedLightness
        );

        marker.style.left = (pointerX / bounds.width * 100) + "%";
        marker.style.top = (pointerY / bounds.height * 100) + "%";

        updateSelectedColor(selectedColor, false);
    }

    wheel.addEventListener("click", chooseWheelColor);

    // Allow keyboard users to adjust the color wheel.
    wheel.setAttribute("tabindex", "0");

    wheel.addEventListener("keydown", function (event) {

        let changed = false;

        if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            selectedHue = (selectedHue + 5) % 360;
            changed = true;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            selectedHue = (selectedHue - 5 + 360) % 360;
            changed = true;
        }

        if (changed) {

            event.preventDefault();

            selectedColor = hslToHex(
                selectedHue,
                selectedSaturation,
                selectedLightness
            );

            updateSelectedColor(selectedColor, true);
        }
    });

    // Change color using the regular color picker.
    colorInput.addEventListener("input", function () {
        updateSelectedColor(colorInput.value, true);
    });

    // Change color by entering a HEX code.
    hexInput.addEventListener("input", function () {

        const value = hexInput.value.trim();

        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            updateSelectedColor(value, true);
        }
    });

    hexInput.addEventListener("change", function () {

        const value = hexInput.value.trim();

        if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {

            studioStatus.textContent =
                "Please enter a valid HEX code, such as #F47C6B.";

            hexInput.value = selectedColor;
        }
    });

    // Change the brightness.
    brightnessInput.addEventListener("input", function () {

        selectedLightness = Number(brightnessInput.value);

        brightnessValue.textContent = selectedLightness + "%";

        selectedColor = hslToHex(
            selectedHue,
            selectedSaturation,
            selectedLightness
        );

        updateSelectedColor(selectedColor, false);
    });

    // Update the selected color name.
    colorNameInput.addEventListener("input", function () {
        selectedColorName.textContent =
            colorNameInput.value.trim() || "Custom Color";
    });

    // Save palette data in the browser.
    function savePalette() {

        try {

            localStorage.setItem(storageKey, JSON.stringify({
                name: paletteNameInput.value,
                colors: palette
            }));

        } catch (error) {

            studioStatus.textContent =
                "Your palette could not be saved in this browser.";
        }
    }

    // Draw the palette on the page.
    function renderPalette() {

        paletteDisplay.innerHTML = "";

        colorCount.textContent =
            palette.length + (palette.length === 1 ? " Color" : " Colors");

        if (palette.length === 0) {

            paletteDisplay.innerHTML = `
                <div class="empty-palette">
                    <i class="fa fa-paint-brush fa-3x" aria-hidden="true"></i>
                    <h4>Your palette starts here!</h4>
                    <p>Choose a color from the wheel and add it to see your palette appear.</p>
                </div>
            `;

            savePalette();
            return;
        }

        palette.forEach(function (color, index) {

            const card = document.createElement("article");
            card.className = "palette-color-card";

            const swatch = document.createElement("div");
            swatch.className = "palette-color-swatch";
            swatch.style.backgroundColor = color.hex;
            swatch.setAttribute("aria-label", color.name + " color swatch");

            const details = document.createElement("div");
            details.className = "palette-color-details";

            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = color.name;
            nameInput.maxLength = 30;
            nameInput.setAttribute("aria-label", "Name for color " + (index + 1));

            nameInput.addEventListener("change", function () {
                palette[index].name = nameInput.value.trim() || "Custom Color";
                savePalette();
            });

            const hexText = document.createElement("span");
            hexText.textContent = color.hex;

            const colorEditor = document.createElement("input");
            colorEditor.type = "color";
            colorEditor.value = color.hex;
            colorEditor.setAttribute("aria-label", "Change " + color.name);

            colorEditor.addEventListener("change", function () {
    palette[index].hex = colorEditor.value.toUpperCase();
    renderPalette();
});

            const actions = document.createElement("div");
            actions.className = "palette-color-actions";

            const copyButton = document.createElement("button");
            copyButton.type = "button";
            copyButton.innerHTML = '<i class="fa fa-copy" aria-hidden="true"></i>';
            copyButton.setAttribute("aria-label", "Copy " + color.hex);

            copyButton.addEventListener("click", function () {
                copyText(color.hex, "Color code copied!");
            });

            const upButton = document.createElement("button");
            upButton.type = "button";
            upButton.innerHTML = '<i class="fa fa-arrow-up" aria-hidden="true"></i>';
            upButton.setAttribute("aria-label", "Move " + color.name + " up");
            upButton.disabled = index === 0;

            upButton.addEventListener("click", function () {
                moveColor(index, -1);
            });

            const downButton = document.createElement("button");
            downButton.type = "button";
            downButton.innerHTML = '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            downButton.setAttribute("aria-label", "Move " + color.name + " down");
            downButton.disabled = index === palette.length - 1;

            downButton.addEventListener("click", function () {
                moveColor(index, 1);
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
            deleteButton.setAttribute("aria-label", "Remove " + color.name);

            deleteButton.addEventListener("click", function () {

                palette.splice(index, 1);

                renderPalette();

                studioStatus.textContent =
                    color.name + " was removed from your palette.";
            });

            details.appendChild(nameInput);
            details.appendChild(hexText);
            details.appendChild(colorEditor);

            actions.appendChild(copyButton);
            actions.appendChild(upButton);
            actions.appendChild(downButton);
            actions.appendChild(deleteButton);

            details.appendChild(actions);

            card.appendChild(swatch);
            card.appendChild(details);

            paletteDisplay.appendChild(card);
        });

        savePalette();
    }

    // Move a color up or down in the palette.
    function moveColor(index, direction) {

        const newIndex = index + direction;

        if (newIndex < 0 || newIndex >= palette.length) {
            return;
        }

        const selected = palette[index];

        palette[index] = palette[newIndex];
        palette[newIndex] = selected;

        renderPalette();
    }

    // Add a selected color.
    addColorButton.addEventListener("click", function () {

        if (palette.length >= maximumColors) {

            studioStatus.textContent =
                "You can add up to 12 colors to your palette.";

            return;
        }

        const colorName =
            colorNameInput.value.trim() || "Custom Color";

        palette.push({
            name: colorName,
            hex: selectedColor.toUpperCase()
        });

        renderPalette();

        studioStatus.textContent =
            colorName + " was added to your palette!";

        colorNameInput.value = "Custom Color";
    });

    // Copy text to the clipboard.
    async function copyText(text, message) {

        try {

            await navigator.clipboard.writeText(text);

            studioStatus.textContent = message;

        } catch (error) {

            studioStatus.textContent =
                "Clipboard access was unavailable. Please copy the text manually.";
        }
    }

    // Copy all HEX codes.
    copyPaletteButton.addEventListener("click", function () {

        if (palette.length === 0) {

            studioStatus.textContent =
                "Add colors to your palette before copying.";

            return;
        }

        const codes = palette.map(function (color) {
            return color.name + ": " + color.hex;
        }).join("\n");

        copyText(codes, "Your palette HEX codes were copied!");
    });

    // Download the palette as a CSS file.
    downloadPaletteButton.addEventListener("click", function () {

        if (palette.length === 0) {

            studioStatus.textContent =
                "Add colors to your palette before downloading.";

            return;
        }

        const safeName = paletteNameInput.value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "my-palette";

        let css = ":root {\n";

        palette.forEach(function (color, index) {

            const variableName = color.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "") || "color-" + (index + 1);

            css += "    --" + variableName + ": " + color.hex + ";\n";
        });

        css += "}\n";

        const file = new Blob([css], {
            type: "text/css"
        });

        const downloadUrl = URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = safeName + ".css";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(downloadUrl);

        studioStatus.textContent =
            "Your CSS palette file is ready!";
    });

    // Reset the palette.
    resetPaletteButton.addEventListener("click", function () {

        const confirmReset = window.confirm(
            "Are you sure you want to clear your entire palette?"
        );

        if (!confirmReset) {
            return;
        }

        palette = [];

        paletteNameInput.value = "My Custom Palette";

        renderPalette();

        studioStatus.textContent =
            "Your palette has been reset.";
    });

    // Save changes to the palette name.
    paletteNameInput.addEventListener("input", savePalette);

    // Restore the last saved palette.
    function loadPalette() {

        try {

            const savedPalette = localStorage.getItem(storageKey);

            if (!savedPalette) {
                return;
            }

            const savedData = JSON.parse(savedPalette);

            if (savedData && Array.isArray(savedData.colors)) {

                palette = savedData.colors
                    .filter(function (color) {
                        return color &&
                            typeof color.name === "string" &&
                            /^#[0-9A-Fa-f]{6}$/.test(color.hex);
                    })
                    .slice(0, maximumColors);

                if (typeof savedData.name === "string") {
                    paletteNameInput.value = savedData.name;
                }
            }

        } catch (error) {

            palette = [];
        }
    }

    // Start the color studio.
    loadPalette();

    updateSelectedColor(selectedColor, true);
    renderPalette();

});
/* =================================
   GET INSPIRATION PAGE
================================= */

/* INSPIRATION SLIDESHOW */

const slides = document.querySelectorAll(".slide");
const previousButton = document.querySelector("#previous-slide");
const nextButton = document.querySelector("#next-slide");
const slideIndicator = document.querySelector("#slide-indicator");

let currentSlide = 0;

function showSlide(index) {

    if (!slides.length) return;

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");

    if (slideIndicator) {
        slideIndicator.textContent =
            `${currentSlide + 1} / ${slides.length}`;
    }
}

if (slides.length) {

    showSlide(0);

    previousButton?.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    nextButton?.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

}


/* =================================
   COMMUNITY ARTWORK SUBMISSIONS
================================= */

const submissionForm = document.querySelector("#submit-work-form");
const communityGallery = document.querySelector("#community-gallery");

if (submissionForm && communityGallery) {

    submissionForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const artistName =
            document.querySelector("#artist-name").value.trim();

        const workTitle =
            document.querySelector("#work-title").value.trim();

        const category =
            document.querySelector("#work-category").value;

        const imageURL =
            document.querySelector("#work-image").value.trim();

        const socialMedia =
            document.querySelector("#artist-social").value.trim();

        const description =
            document.querySelector("#work-description").value.trim();

        // Create artwork card

        const card = document.createElement("article");
        card.className = "community-card";

        // Artwork image

        const image = document.createElement("img");
        image.src = imageURL;
        image.alt = `${workTitle} by ${artistName}`;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.alt = "Artwork image could not be loaded";
            image.style.display = "none";
        });

        card.appendChild(image);

        // Card information

        const content = document.createElement("div");
        content.className = "community-card-content";

        const title = document.createElement("h3");
        title.textContent = workTitle;

        const artist = document.createElement("p");
        artist.textContent = `Created by: ${artistName}`;

        const categoryText = document.createElement("p");
        categoryText.textContent = `Category: ${category}`;

        const descriptionText = document.createElement("p");
        descriptionText.textContent = description;

        content.append(title, artist, categoryText, descriptionText);

        // Social media link

        if (socialMedia) {

            const socialLink = document.createElement("a");

            socialLink.href = socialMedia;
            socialLink.textContent = "Visit Artist's Social Media";
            socialLink.className = "artist-social";
            socialLink.target = "_blank";
            socialLink.rel = "noopener noreferrer";

            content.appendChild(socialLink);
        }

        // Critique section

        const critiqueArea = document.createElement("div");
        critiqueArea.className = "critique-area";

        const critiqueHeading = document.createElement("h4");
        critiqueHeading.textContent = "Leave Constructive Feedback";

        const critiqueInput = document.createElement("textarea");
        critiqueInput.placeholder =
            "Share something you like or a helpful suggestion...";
        critiqueInput.setAttribute(
            "aria-label",
            `Feedback for ${workTitle}`
        );

        const critiqueButton = document.createElement("button");
        critiqueButton.type = "button";
        critiqueButton.textContent = "Post Feedback";

        const feedbackList = document.createElement("div");
        feedbackList.className = "feedback-list";

        critiqueButton.addEventListener("click", () => {

            const feedback = critiqueInput.value.trim();

            if (!feedback) {
                alert("Please enter some feedback first.");
                return;
            }

            const feedbackItem = document.createElement("p");
            feedbackItem.className = "feedback-item";
            feedbackItem.textContent = feedback;

            feedbackList.appendChild(feedbackItem);

            critiqueInput.value = "";

        });

        critiqueArea.append(
            critiqueHeading,
            critiqueInput,
            critiqueButton,
            feedbackList
        );

        content.appendChild(critiqueArea);
        card.appendChild(content);

        // Add artwork to gallery

        communityGallery.prepend(card);

        // Reset form

        submissionForm.reset();

        alert("Your artwork has been added to the gallery!");

    });

}
/* Inspiration Page Slideshows */

document.querySelectorAll("[data-slideshow]").forEach(function (slideshow) {

    const slides = slideshow.querySelectorAll(".inspiration-slide");
    const previousButton = slideshow.querySelector(".previous-slide");
    const nextButton = slideshow.querySelector(".next-slide");

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    showSlide(currentSlide);

    previousButton.addEventListener("click", function () {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    });

    nextButton.addEventListener("click", function () {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    });

});