import RevealFx from './revealFx'
import anime from 'animejs'
import scrollMonitor from 'scrollmonitor'

window.addEventListener('load', function () {

  console.log(scrollMonitor)

  var col1 = document.querySelector('.col1');
  var col2 = document.querySelector('.col2');
  var col3 = document.querySelector('.col3');
  var col4 = document.querySelector('.col4');
  var col5 = document.querySelector('.col5');
  var col6 = document.querySelector('.col6');

  var ani1 = anime({
    targets: col1,
    rotate: 180,
    autoplay: false
  })

  col1.addEventListener("mouseenter", ani1.play);

  var ani2 = anime({
    targets: col2,
    rotateX: 360,
    autoplay: false,
  })
  col2.addEventListener("mouseenter", ani2.play);

  var ani3 = anime({
    targets: col3,
    rotateY: 360,
    autoplay: false,
    easing: 'easeInOutSine'
  })
  col3.addEventListener("mouseenter", ani3.play);

  var ani4 = anime({
    targets: col4,
    rotateY: 360,
    autoplay: false,
    easing: 'easeInOutSine'
  })
  col4.addEventListener("mouseenter", ani4.play);

  var ani5 = anime({
    targets: col5,
    rotate: 180,
    autoplay: false
  })

  col5.addEventListener("mouseenter", ani5.play);

  var ani6 = anime({
    targets: col6,
    rotateX: 360,
    autoplay: false,
  })
  col6.addEventListener("mouseenter", ani6.play);
})

var rev1 = new RevealFx(document.querySelector('.title-1'), {
  revealSettings: {
    bgcolor: '#EA805A',
    delay: 250,
    onCover: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});

var rev2 = new RevealFx(document.querySelector('.title-2'), {
  revealSettings: {
    bgcolor: '#466681',
    delay: 400,
    onCover: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});
rev1.reveal();
rev2.reveal();

anime({
  targets:'.home-colors > div',
  opacity:[0,1],
  translateY: [40,0],
  delay: anime.stagger(150)
})
anime({
  targets: '.home-nav',
  opacity:[0,1],
  translateX: [-100,0],
  delay: 600
})