'use strict';
import anime from 'animejs'
import SimplexNoise from 'simplex-noise';

// console.log(anime)

export const createDotGrid = (selector) => {
  var testArea = document.querySelector(selector);
  testArea.innerHTML = ""

  var shadowWrapperEl = document.createElement('div');
  shadowWrapperEl.className = "dots-shadow-wrapper"

  var dotsWrapperEl = document.createElement('div');
  dotsWrapperEl.className = "dots-wrapper"

  testArea.appendChild(shadowWrapperEl)
  testArea.appendChild(dotsWrapperEl)
  
  
  var dotsFragment = document.createDocumentFragment();
  var shadowFragment = document.createDocumentFragment();
  var grid = [10, 8];
  var numberOfElements = grid[0] * grid[1];
  var noise = []

  var delay = 4000;
  var duration = 2000;

  var totalAnimationTime = delay + duration

  var simplex = new SimplexNoise(Math.random);

  for (var i = 0; i < grid[0]; i++) {
    for (var j = 0; j < grid[1]; j++) {
      var noiseVal = simplex.noise2D(i, j) * totalAnimationTime + totalAnimationTime
      noise.push(Math.round(noiseVal));
      var dotEl = document.createElement('div');
      dotEl.classList.add('dot');
      var shadowEl = document.createElement('div');
      shadowEl.classList.add('dot-shadow');
      dotsFragment.appendChild(dotEl);
      shadowFragment.appendChild(shadowEl);
    }
  }
  console.log(noise)

  dotsWrapperEl.appendChild(dotsFragment);
  shadowWrapperEl.appendChild(shadowFragment);

  for (var i = 0; i < numberOfElements; i++) {
    var anim1 = anime({
      targets: Array.from(dotsWrapperEl.children)[i],
      translateY: [0, -5, -5, 0],
      translateX: [0, -5, -5, 0],
      loop: true,
      delay: delay,
      duration: duration,
      autoplay: false,
      easing: 'easeInOutSine'
    });
    var anim2 = anime({
      targets: Array.from(shadowWrapperEl.children)[i],
      translateY: [0, 5, 5, 0],
      translateX: [0, 5, 5, 0],
      loop: true,
      delay: delay,
      duration: duration,
      autoplay: false,
      easing: 'easeInOutSine'
    });
    console.log('done')
    setTimeout(anim1.play, noise[i])
    setTimeout(anim2.play, noise[i])

  }
}

createDotGrid('.experiment1')