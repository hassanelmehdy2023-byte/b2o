// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
const leftCat = document.getElementById('leftCat');
const rightCat = document.getElementById('rightCat');
const gifContainer = document.getElementById('gifContainer');
const title = document.querySelector('.title');

// Set canvas size
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Confetti particles
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.width = Math.random() * 10 + 5;
        this.height = Math.random() * 10 + 5;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 5 + 5;
        this.color = ['#ff6b9d', '#ff1744', '#ffeb3b', '#4dd0e1'][Math.floor(Math.random() * 4)];
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1;
        this.opacity -= 0.01;
    }
}

let confettis = [];
let noClickCount = 0;
let yesBtnSize = 1;
let catImageScale = 0.6;

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        confettis.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettis = confettis.filter(c => c.opacity > 0);
    
    confettis.forEach(confetti => {
        confetti.update();
        confetti.draw();
    });

    if (confettis.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// Yes button click
yesBtn.addEventListener('click', function() {
    title.innerHTML = 'LETSGOOOO 🎉';
    response.innerHTML = '🎉 yaay je suis trop content ! la plus belle et la plus magnifique des femmes a accepte d\'etre my valentine !!';
    response.style.color = '#ff1744';
    
    // Clear and show happy dance GIFs on the sides
    leftCat.parentElement.innerHTML = '<div class="tenor-gif-embed" data-postid="14460664" data-share-method="host" data-aspect-ratio="1.23552" data-width="100%"><a href="https://tenor.com/view/happy-dance-baby-gif-14460664">Happy Dance Sticker</a></div>';
    rightCat.parentElement.innerHTML = '<div class="tenor-gif-embed" data-postid="14460664" data-share-method="host" data-aspect-ratio="1.23552" data-width="100%"><a href="https://tenor.com/view/happy-dance-baby-gif-14460664">Happy Dance Sticker</a></div>';
    
    // Show Tenor GIF in center
    gifContainer.style.display = 'block';
    gifContainer.innerHTML = '<div class="tenor-gif-embed" data-postid="24532222" data-share-method="host" data-aspect-ratio="1.13879" data-width="100%"><a href="https://tenor.com/view/hasher-happy-sticker-gif-24532222">Hasher Happy Sticker</a></div>';
    
    // Load Tenor embed script
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    createConfetti();
    animateConfetti();
    
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
});

// No button click with fun interaction
noBtn.addEventListener('click', function() {
    noClickCount++;
    console.log('Click count:', noClickCount);
    
    let message = '';
    
    if (noClickCount === 1) {
        message = 'Are you sure?';
    } else if (noClickCount === 2) {
        message = 'Really sure?';
    } else if (noClickCount === 3) {
        message = 'Think again!!';
    } else if (noClickCount === 4) {
        message = 'You will broke my heart';
    } else {
        message = '😭 ' + '💔'.repeat(noClickCount - 4);
    }
    
    console.log('Message:', message);
    response.innerHTML = message;
    
    // Show and grow cat images (only after first click)
    if (noClickCount === 1) {
        leftCat.src = 'sad-cat.png';
        rightCat.src = 'sad-cat.png';
        leftCat.parentElement.style.display = 'flex';
        rightCat.parentElement.style.display = 'flex';
    }
    
    // Grow cat images: x2 until 3rd click, then slow growth
    if (noClickCount <= 3) {
        catImageScale *= 2;
    } else {
        catImageScale += 0.15;
    }
    
    leftCat.parentElement.style.width = (40 * catImageScale) + 'px';
    leftCat.parentElement.style.height = (40 * catImageScale) + 'px';
    rightCat.parentElement.style.width = (40 * catImageScale) + 'px';
    rightCat.parentElement.style.height = (40 * catImageScale) + 'px';
    
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    
    noBtn.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px) scale(0.9)';
    
    yesBtnSize += 0.15;
    yesBtn.style.transform = 'scale(' + yesBtnSize + ')';
});

// Handle window resize
window.addEventListener('resize', function() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Easter egg: Double click on title
title.addEventListener('dblclick', function() {
    response.innerHTML = '💗 You found the secret! 💗';
    createConfetti();
    animateConfetti();
});
