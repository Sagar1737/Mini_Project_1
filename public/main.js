// main.js - shared small behaviors (set year, highlight nav)

document.addEventListener('DOMContentLoaded', ()=>{
  // set year in footer spans
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // simple nav highlight
  try{
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a=>{
      const href = a.getAttribute('href');
      if(href && href.endsWith(path)){
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    })
  }catch(e){/* ignore in older browsers */}
});
