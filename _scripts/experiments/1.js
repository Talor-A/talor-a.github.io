'use strict';
import anime from 'animejs'
import SimplexNoise from 'simplex-noise';

export const createDotGrid = (selector, grid, delay, duration) => {
  let totalAnimationTime = delay + duration
  let noise = []
  let simplex = new SimplexNoise(Math.random);
  let numberOfElements = grid[0] * grid[1];


  //--------- Create Wrapper elements
  let wrapper = document.querySelector(selector);
  wrapper.innerHTML = ""

  let shadowWrapperEl = document.createElement('div');
  shadowWrapperEl.className = "dots-shadow-wrapper"

  let dotsWrapperEl = document.createElement('div');
  dotsWrapperEl.className = "dots-wrapper"

  wrapper.appendChild(shadowWrapperEl)
  wrapper.appendChild(dotsWrapperEl)

  let dotsFragment = document.createDocumentFragment();
  let shadowFragment = document.createDocumentFragment();
  


  //--------- Fill the grid  
  for (let i = 0; i < grid[0]; i++) {
    for (let j = 0; j < grid[1]; j++) {
      
      //this will be used as the delay to start the animation
      let noiseVal = simplex.noise2D(i, j) * totalAnimationTime + totalAnimationTime
      noise.push(Math.round(noiseVal));

      //create the dot element and corresponding shadow
      let dotEl = document.createElement('div');
      dotEl.classList.add('dot');
      let shadowEl = document.createElement('div');
      shadowEl.classList.add('dot-shadow');

      //append dot and shadow to their containers
      dotsFragment.appendChild(dotEl);
      shadowFragment.appendChild(shadowEl);
    }
  }

  //add the dot and shadow containers to the page
  dotsWrapperEl.appendChild(dotsFragment);
  shadowWrapperEl.appendChild(shadowFragment);

  //--------- Create controller buttons
  const controls = document.createElement("div")
  controls.className = "controls"
  
  const colors = [
    "#3837D6",
    "#502772",
    "#732752",
    "#257243",
  ]
  //wrapper.style.color will determine the color of all the dots
  wrapper.style.color = colors[0]

  colors.forEach((color) => {

    //create button
    const button = document.createElement("span");
    button.style.backgroundColor = color;
    button.className = "circle-button ";

    // when we click it, animate the dot color and the 'jumping' button
    button.onclick = () => {
      anime({
        targets: ['.dot', '.dot-shadow'],
        color: color,
        delay: anime.stagger(100, {
          grid: grid,
          from: 'center'
        })
      }).play()

      anime({
        targets: button,
        translateY: -8,
        direction: 'alternate',
        duration: 100,
        easing: 'easeInOutQuad'
      })
    }
    // add the button to our controller container
    controls.appendChild(button)
  })
  // add the controls to the page
  wrapper.appendChild(controls)

  // start each dot's animation after a random amount of time
  for (let i = 0; i < numberOfElements; i++) {
    let anim1 = anime({
      targets: Array.from(dotsWrapperEl.children)[i],
      translateY: [0, -5, -5, 0],
      translateX: [0, -5, -5, 0],
      loop: true,
      delay: delay,
      duration: duration,
      autoplay: false,
      easing: 'easeInOutSine'
    });
    let anim2 = anime({
      targets: Array.from(shadowWrapperEl.children)[i],
      translateY: [0, 5, 5, 0],
      translateX: [0, 5, 5, 0],
      loop: true,
      delay: delay,
      duration: duration,
      autoplay: false,
      easing: 'easeInOutSine'
    });
    setTimeout(anim1.play, noise[i])
    setTimeout(anim2.play, noise[i])

  }

  return wrapper
}

let grid = [10, 8]; // grid size (x,y)
let delay = 1200;   // amount of time the dot and shadow will spend 'together'
let duration = 2000; 

const dotGrid = createDotGrid('.experiment1', grid, delay, duration)

