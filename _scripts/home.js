import RevealFx from './revealFx'
import anime from 'animejs'
import scrollMonitor from 'scrollmonitor'

const colors = {
  sea: "#466681",
  sky: "#CEE2D9",
  grass: "#929965",
  sun: "#E1B129",
  dusk: "#EA805A",
  peach: "#F4D8CD",
}


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

window.addEventListener('load', () => {
  document.querySelector('.load-screen').classList.add('loaded')

anime({
  targets: '.home-colors > div',
  opacity: [0, 1],
  translateY: "-=40",
  delay: anime.stagger(150, {start: 200}),
  complete: (anim) => {
    // apply animations here to aviod weird anime.js bug
    anim.animatables.forEach(({ target }, i) => {
      var anim = anime({
        ...squareAnimations[i],
        targets: target
      })
      target.addEventListener("mouseenter", anim.play);
    })
  }
})

anime({
  targets: '.home-nav',
  opacity: [0, 1],
  translateX: [-100, 0],
  delay: 800
})


var title1 = new RevealFx(document.querySelector('.title-1'), {
  revealSettings: {
    bgcolor: colors.dusk,
    delay: 450,
    onCover: (contentEl, revealerEl) => {
      contentEl.style.opacity = 1;
    }
  }
});

var title2 = new RevealFx(document.querySelector('.title-2'), {
  revealSettings: {
    bgcolor: colors.sky,
    delay: 600,
    onCover: (contentEl, revealerEl) => {
      contentEl.style.opacity = 1;
    }
  }
});
title1.reveal();
title2.reveal();

let aboutTitleEl = document.querySelector('#about > h1');
let aboutScrollMon = scrollMonitor.create(aboutTitleEl, -300);
let aboutTitleAnim = new RevealFx(aboutTitleEl, {
  revealSettings: {
    bgcolor: colors.sun,
    direction: 'tb',
    onCover: (contentEl, revealerEl) => {
      anime({
        targets: contentEl,
        duration: 500,
        delay: 50,
        translateY: [-40, 0],
        opacity: {
          value: [0, 1],
          duration: 300,
          easing: 'linear'
        }
      });
    }
  }
});

let aboutContentAnim = anime({
  targets: document.querySelector('#about > .bio'),
  opacity: [0, 1],
  translateY: [60, 0],
  autoplay: false,
  delay: 500,
  // duration: 1000,
  // easing: 'easeInOutSine'
})


aboutScrollMon.enterViewport(() => {
  aboutTitleAnim.reveal();
  aboutContentAnim.play();
  aboutScrollMon.destroy();
});

let watcher1 = scrollMonitor.create(document.querySelector('.amada'), -300)
let watcher2 = scrollMonitor.create(document.querySelector('.livinghealth'), -300)
let watcher3 = scrollMonitor.create(document.querySelector('.scratch'), -300)

const portfolio_config = [
  {
    section: '.amada',
    titleSettings:  {
      revealSettings : {
        bgcolor: colors.dusk,
        delay: 250,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
          let el = document.querySelector('.amada .portfolio-image-bg')
          console.log(el)
          anime({
            targets: el,
            easing: 'easeOutSine',
            duration: 300,
            translateX: [0, 40],
            translateY: [0, 40],
            scaleX: [0,1]
          })
        }
      }
    },
    descSettings: {
      revealSettings : {
        bgcolor: colors.dusk,
        direction: 'lr',
        delay: 400,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    },
    imgSettings: {
      revealSettings : {
        bgcolor: colors.sea,
        direction: 'rl',
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    },
    bgSettings: {}
  },
  {
    section: '.livinghealth',
    titleSettings:  {
      revealSettings : {
        bgcolor: colors.sun,
        delay: 250,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
          let el = document.querySelector('.livinghealth .portfolio-image-bg')
          console.log(el)
          anime({
            targets: el,
            easing: 'easeOutSine',
            duration: 300,
            translateX: [0, 40],
            translateY: [0, 40],
            scaleX: [0,1]
          })
        }
      }
    },
    descSettings: {
      revealSettings : {
        bgcolor: colors.sky,
        direction: 'lr',
        delay: 400,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    },
    imgSettings: {
      revealSettings : {
        bgcolor: colors.sky,
        direction: 'rl',
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    },
    bgSettings: {}
  },
  {
    section: '.scratch',
    titleSettings:  {
      revealSettings : {
        bgcolor: colors.peach,
        delay: 250,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
          let el = document.querySelector('.scratch .portfolio-image-bg')
          console.log(el)
          anime({
            targets: el,
            easing: 'easeOutSine',
            duration: 300,
            translateX: [0, 40],
            translateY: [0, 40],
            scaleX: [0,1]
          })
        }
      }
    },
    descSettings: {
      revealSettings : {
        bgcolor: colors.peach,
        direction: 'lr',
        delay: 400,
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    },
    imgSettings: {
      revealSettings : {
        bgcolor: colors.sea,
        direction: 'rl',
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        }
      }
    },
    bgSettings: {}
  },
]

portfolio_config.forEach(conf => {
  let wrapper = document.querySelector(conf.section);
  let watcher = scrollMonitor.create(wrapper, -300);

  let imgReveal = new RevealFx(wrapper.querySelector('.portfolio-image-wrap'), conf.imgSettings)
  let titleReveal = new RevealFx(wrapper.querySelector('.portfolio-desc > h1'), conf.titleSettings)
  let descReveal = new RevealFx(wrapper.querySelector('.portfolio-desc > span'), conf.descSettings)

  watcher.enterViewport(() => {
    imgReveal.reveal();
    titleReveal.reveal();
    descReveal.reveal();
    watcher.destroy();
  });
})

})