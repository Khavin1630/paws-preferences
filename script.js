const total = 12;  // Total number of cats to show
const liked = [];  // Store liked images
const swiperWrapper = document.querySelector('.swiper-wrapper');

async function fetchCats(n) {
  for (let i = 0; i < n; i++) {
    const res = await fetch('https://cataas.com/cat?json=true');
    const obj = await res.json();

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<img src="https://cataas.com${obj.url}" />`;

    swiperWrapper.appendChild(slide);
  }
}

fetchCats(total).then(initSwiper);

function initSwiper() {
  const swiper = new Swiper('.cat-swiper', {
    spaceBetween: 10,
    grabCursor: true,
    effect: 'slide',
    allowSlidePrev: false,
    allowSlideNext: true,
  });

  swiper.slides.forEach((slide, index) => {
    slide.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touch.pageX;

      
      if (dx < -30) markLiked(index);

      
      if (index === total - 1) showSummary();
    });
  });
}

function markLiked(i) {
  const img = swiperWrapper.children[i].querySelector('img');
  if (img && !liked.includes(img.src)) liked.push(img.src);
}

function showSummary() {
  document.querySelector('.swiper').classList.add('hidden');

  const s = document.getElementById('summary');
  document.getElementById('likeCount').textContent = liked.length;

  const grid = document.getElementById('likedGrid');
  liked.forEach(src => {
    const im = document.createElement('img');
    im.src = src;
    grid.appendChild(im);
  });

  s.classList.remove('hidden');
}
