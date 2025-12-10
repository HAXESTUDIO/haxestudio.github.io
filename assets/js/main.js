// main.js

// Play click sound
document.addEventListener("click", function(e){
  const el = e.target;
  // play only on buttons/anchors
  if(el.tagName === 'BUTTON' || el.tagName === 'A' || el.closest('button') || el.closest('a')){
    const audio = document.getElementById('clickSound');
    if(audio) {
      try { audio.currentTime = 0; audio.play(); } catch(e){}
    }
  }
}, {capture:true});

// Smooth scroll for local data-scroll
document.querySelectorAll("[data-scroll]").forEach(function (el) {
  el.addEventListener("click", function () {
    const target = document.querySelector(el.getAttribute("data-scroll"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Hero enroll button scroll - if present
const heroEnrollBtn = document.getElementById("heroEnrollBtn");
if(heroEnrollBtn){
  heroEnrollBtn.addEventListener("click", function () {
    const target = document.getElementById("enroll");
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
}

// year filler
document.addEventListener("DOMContentLoaded", function(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
});
