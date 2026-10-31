    const palettes = [
        {
            name: "Fresh Pop",
            description: "A lively mix of teal, coral, gold, and periwinkle.",
            colors: [
                { name: "Deep Teal", hex: "#176B67" },
                { name: "Coral Pop", hex: "#F47C6B" },
                { name: "Golden Glow", hex: "#F4C95D" },
                { name: "Periwinkle", hex: "#8E9AE6" },
                { name: "Warm Cream", hex: "#FFF8EF" }
            ]
        },
        {
            name: "Ocean Breeze",
            description: "Cool ocean-inspired colors balanced with a warm neutral.",
            colors: [
                { name: "Deep Teal", hex: "#176B67" },
                { name: "Sea Glass", hex: "#77C9C2" },
                { name: "Coastal Blue", hex: "#4267AC" },
                { name: "Pale Sky", hex: "#DCEAF5" },
                { name: "Warm Cream", hex: "#FFF8EF" }
            ]
        },
        {
            name: "Sunset Studio",
            description: "Warm, energetic shades for eye-catching graphics and websites.",
            colors: [
                { name: "Coral Pop", hex: "#F47C6B" },
                { name: "Tangerine", hex: "#F29E4C" },
                { name: "Golden Glow", hex: "#F4C95D" },
                { name: "Berry", hex: "#9B3A62" },
                { name: "Ink Navy", hex: "#24243E" }
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

    document.getElementById("next-palette").addEventListener("click", () => {
        paletteIndex = (paletteIndex + 1) % palettes.length;
        renderPalette(paletteIndex);
        copyStatus.textContent = "Showing the " + palettes[paletteIndex].name + " palette.";
    });

    swatchesContainer.addEventListener("click", async (event) => {
        const button = event.target.closest(".copy-color");
        if (!button) return;

        const color = button.dataset.color;
        try {
            await navigator.clipboard.writeText(color);
            copyStatus.textContent = color + " copied to your clipboard.";
        } catch (error) {
            copyStatus.textContent = "Your browser could not copy automatically. Select the code and copy it manually: " + color;
        }
    });

    document.getElementById("current-year").textContent = new Date().getFullYear();