const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;
const imageSize = 48; // Tamanho das imagens

const imgs = [
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-2.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-3.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-4.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-5.png',
    'https://storage.googleapis.com/mokaly_public/assets/avatars/mokaly-avatar-cup-6.png'
];

const container = document.querySelector('.container');
const imageContainer = document.getElementById('image-container');
const audio = document.getElementById('audio');
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesButton = document.getElementById('accept-cookies');
const repeatButton = document.getElementById('repeat-button');
let imagesDisappeared = 0;

acceptCookiesButton.addEventListener('click', function() {
    cookieBanner.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true'); 
    setTimeout(function() {
        createImages();
        console.log('4.... 3... 2.. 1. Go!');
    }, 4000);
});

repeatButton.addEventListener('click', function() {
    imagesDisappeared = 0;
    imageContainer.innerHTML = '';
    createImages();
});

function createImages() {
    repeatButton.style.display = 'none';
    
    setTimeout(() => {
        imgs.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('image');

            const startX = Math.random() * (maxWidth - imageSize); 
            const startY = (maxWidth > 768) ? maxHeight : -48;

            img.style.left = `${startX}px`;
            img.style.transform = `translateY(${startY}px)`;

            imageContainer.appendChild(img);
            
            setTimeout(() => {
                const endY = (maxWidth > 768) ? -imageSize : maxHeight;
                img.style.transform = `translateY(${endY}px)`;

                setTimeout(() => {
                    img.classList.add('none');
                    imagesDisappeared++;
                    if (imagesDisappeared === imgs.length) {
                        audio.play();
                        repeatButton.style.display = 'block';
                    }
                }, 3000); // 3 segundos para a animação final
            }, index * 2000);
        });
    });
}

function playAudioIfImagesDisappeared() {
    if (imagesDisappeared === imgs.length) {
        audio.play();
    }
}
