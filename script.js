const sliderHandle = document.getElementById("slider-handle");
const overlay = document.querySelector(".overlay");
const comparisonSlider = document.getElementById("comparison-slider");
const topLayer = document.getElementById("top-layer");
const bottomLayer = document.getElementById("bottom-layer");
const topImageSelect = document.getElementById("top-image");
const bottomImageSelect = document.getElementById("bottom-image");

let isDragging = false;

// 画像選択の変更に応じて表示を更新
topImageSelect.addEventListener("change", (event) => {
    topLayer.src = event.target.value;
});

bottomImageSelect.addEventListener("change", (event) => {
    bottomLayer.src = event.target.value;
});

// スライダーのドラッグ機能
sliderHandle.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isDragging = true;
    window.addEventListener("mousemove", updateSlider);
});

window.addEventListener("mouseup", () => {
    if (isDragging) {
        isDragging = false;
        window.removeEventListener("mousemove", updateSlider);
    }
});

function updateSlider(event) {
    if (!isDragging) return;

    const rect = comparisonSlider.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

    overlay.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    sliderHandle.style.left = `${percentage}%`;
}
