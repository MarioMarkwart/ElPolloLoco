const loadingScreenImages = [
    'assets/img/loadingScreen/loadingScreen_0.png',
    'assets/img/loadingScreen/loadingScreen_10.png',
    'assets/img/loadingScreen/loadingScreen_20.png',
    'assets/img/loadingScreen/loadingScreen_30.png',
    'assets/img/loadingScreen/loadingScreen_40.png',
    'assets/img/loadingScreen/loadingScreen_50.png',
    'assets/img/loadingScreen/loadingScreen_60.png',
    'assets/img/loadingScreen/loadingScreen_70.png',
    'assets/img/loadingScreen/loadingScreen_80.png',
    'assets/img/loadingScreen/loadingScreen_90.png',
    'assets/img/loadingScreen/loadingScreen_100.png',
];
  
  
/**
 * Preloads all the loading screen images. This function is called when the game is started.
 * It iterates through the loadingScreenImages array and creates a new Image object for each
 * image path. The image is then assigned to the src property of the Image object and the
 * image is stored in the loadingScreenImagesCache object.
 */
function preloadLoadingScreenImages() {
    loadingScreenImages.forEach((imagePath) => {
        const image = new Image();
        image.src = imagePath;
        loadingScreenImagesCache[imagePath] = image;
    });
}


/**
 * Updates the loading screen image based on the percentage of images loaded.
 *
 * This function checks if the percentage of images loaded has changed since the last update.
 * If it has, it updates the loading screen with the corresponding image from the cache.
 * Once all images are loaded, the loading screen is hidden and the game state is switched to 'game'.
 */
function setLoadingScreenImage() {
    let loadingScreen = document.getElementById('loading-screen');
    if (totalImagesLoadedPercent !== totalImagesLoadedPercentOld) {
        const imageSrc = loadingScreenImagesCache['assets/img/loadingScreen/loadingScreen_' + totalImagesLoadedPercent + '.png'].src;
        loadingScreen.innerHTML = `<img id="loading-screen-image" src="${imageSrc}">`
        totalImagesLoadedPercentOld = totalImagesLoadedPercent;
    }
    if (totalImagesLoaded == totalImages) {
        loadingScreen.style.display = 'none';
        switchGameState('game');
    }
}