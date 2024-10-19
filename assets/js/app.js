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
    imagesDisappeared = 0; // Resetar o contador de imagens desaparecidas
    imageContainer.innerHTML = ''; // Limpar imagens anteriores
    createImages();
});

function createImages() {
    repeatButton.style.display = 'none'; // Esconder o botão de repetir enquanto a sequência acontece
    
    // Atraso inicial de 2 segundos antes de mostrar as imagens
    setTimeout(() => {
        imgs.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('image');

            // Definindo a posição inicial dentro dos limites da tela
            const startX = Math.random() * (maxWidth - imageSize); // Garante que a imagem comece na largura da tela
            const startY = (maxWidth > 768) ? maxHeight : -48; // Sobe do fundo ou desce do topo

            img.style.left = `${startX}px`;
            img.style.transform = `translateY(${startY}px)`; // Começa de baixo ou de cima

            imageContainer.appendChild(img);

            setTimeout(() => {
                // Define a posição final da animação
                const endY = (maxWidth > 768) ? -imageSize : maxHeight; // Sobe até o topo ou desce até o fundo
                img.style.transform = `translateY(${endY}px)`; // Animação

                setTimeout(() => {
                    img.classList.add('none');
                    imagesDisappeared++;
                    if (imagesDisappeared === imgs.length) {
                        audio.play(); // Tocar o áudio ao final
                        repeatButton.style.display = 'block'; // Mostrar o botão de repetir após a sequência
                    }
                }, 3000); // 3 segundos para a animação final
            }, index * 2000);
        });
    });
}

function playAudioIfImagesDisappeared() {
    // Verifica se as imagens já desapareceram antes de tocar o áudio
    if (imagesDisappeared === imgs.length) {
        audio.play();
    }
}