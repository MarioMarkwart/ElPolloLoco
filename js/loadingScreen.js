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
  
  
  function preloadLoadingScreenImages() {
      loadingScreenImages.forEach((imagePath) => {
          const image = new Image();
          image.src = imagePath;
          loadingScreenImagesCache[imagePath] = image;
      });
  }
  
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