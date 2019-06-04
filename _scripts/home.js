import RevealFx from './revealFx'
import anime from 'animejs'
import scrollMonitor from 'scrollmonitor'

window.addEventListener('load', function () {

  const defaultAnim = {
    // translateY:"40px",
    autoplay: false
  }
  const squareAnimations = [
    {
      ...defaultAnim,
      rotate: 180,
    },
    {
      ...defaultAnim,
      rotateX: 360,
    },
    {
      ...defaultAnim,
      rotateY: 360,
      easing: 'easeInOutSine'
    },
    {
      ...defaultAnim,
      rotateY: 360,
      easing: 'easeInOutSine'
    },
    {
      ...defaultAnim,
      rotate: 180,
    },
    {
      ...defaultAnim,

      rotateX: 360,
    }
  ]

  anime({
    targets: '.home-colors > div',
    opacity: [0, 1],
    translateY: "-=40",
    delay: anime.stagger(150),
    complete: (anim)=> {
      // apply animations here to aviod weird anime.js bug
      anim.animatables.forEach(({target}, i) => {
        var anim = anime({
          ...squareAnimations[i],
          targets: target
        })
        target.addEventListener("mouseenter", anim.play);
      })
    }
  })



    
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
    bgcolor: '#CEE2D9',
    delay: 400,
    onCover: function (contentEl, revealerEl) {
      contentEl.style.opacity = 1;
    }
  }
});
rev1.reveal();
rev2.reveal();


anime({
  targets: '.home-nav',
  opacity: [0, 1],
  translateX: [-100, 0],
  delay: 600
})