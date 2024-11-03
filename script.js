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

// マウスダウン時に選択を防ぐ
const startDragging = (event) => {
    event.preventDefault();
    isDragging = true;
    window.addEventListener("mousemove", updateSlider);
    window.addEventListener("touchmove", updateSlider); // タッチ移動イベントを追加
};

// マウスアップ時にドラッグを終了
const stopDragging = () => {
    if (isDragging) {
        isDragging = false;
        window.removeEventListener("mousemove", updateSlider);
        window.removeEventListener("touchmove", updateSlider); // タッチ移動イベントを削除
    }
};

sliderHandle.addEventListener("mousedown", startDragging);
window.addEventListener("mouseup", stopDragging);

// タッチイベントの追加
sliderHandle.addEventListener("touchstart", startDragging);
window.addEventListener("touchend", stopDragging);

function updateSlider(event) {
    if (!isDragging) return;

    const rect = comparisonSlider.getBoundingClientRect();
    const offsetX = (event.clientX || event.touches[0].clientX) - rect.left; // タッチ位置を取得
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

    overlay.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    sliderHandle.style.left = `${percentage}%`;
}
