const homeTitle = document.querySelector('.home-title')
window.addEventListener('load',()=> {
  var content = homeTitle.innerHTML
  var arr = [...content]
    .map((char,i) => {

    return `<span class="letter letter${i}">${char}</span>`

  })
  
  homeTitle.innerHTML = arr.join("")
  anime({
    targets: '.home-content',
    keyframes: [
      {value:0, opacity:0, translateY: -40},
      {value: 1, opacity:1, translateY:0}
    ],
    // delay: 1000,
    duration: 2000,
    easing: 'easeOutCubic'
  })
  anime({
    targets: homeTitle.childNodes,
    delay: anime.stagger(15),
    opacity:[0,1]
  })

  

})

