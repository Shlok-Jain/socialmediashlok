function snackBar(text, duration) {
    const div = document.getElementById('snackbar-js')
    const loader = document.getElementById('snackbar-js-loader')
    if (window.getComputedStyle(div).bottom == "-100px"){
    document.getElementById('snackbar-js-text').innerText = text ;
    div.style.animation = `show 0.5s ease-in forwards`
    loader.style.animation = `snackbarloader ${duration/1000}s linear forwards`
    div.addEventListener('touchstart',function(){
        loader.style.animationPlayState = 'paused'
    })
    div.addEventListener('touchend',function(){
        loader.style.animationPlayState = 'running'
    })
    div.addEventListener('mouseenter',function(){
        loader.style.animationPlayState = 'paused'
    })
    div.addEventListener('mouseleave',function(){
        loader.style.animationPlayState = 'running'
    })
    Promise.all(
        loader.getAnimations().map(animation => animation.finished)
      ).then(() => {
        div.style.animation = "hide 0.5s ease-out forwards"
        loader.style.animation = ""
      });
    }
    else {
        document.getElementById('snackbar-js-text').innerText = text ;
    }
  }
 
export default snackBar;