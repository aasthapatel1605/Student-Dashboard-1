function showContent(sectionId){
  const sections=document.querySelectorAll('.quiz-container,.progress-container,.rankings-container,.tasks-container');
  const activeSection=document.querySelector('.quiz-container.active,.progress-container.active,.rankings-container.active,.tasks-container.active');
  const currentSection=document.getElementById(sectionId);
  if(activeSection&&activeSection.id===sectionId){
    sections.forEach(section=>{
      section.classList.remove('active');
      section.querySelectorAll('.quiz-card,.card,.entry,.no-tasks,.overall-score').forEach(element=>element.classList.remove('show'));
    });
    document.querySelectorAll('.dash-btn').forEach(btn=>btn.classList.remove('active'));
    document.querySelector('.section-title').style.display='block';
    document.querySelector('.section-subtitle').style.display='block';
    document.querySelector('.carousel-container').style.display='block';
    return;
  }
  sections.forEach(section=>{
    section.classList.remove('active');
    section.querySelectorAll('.quiz-card,.card,.entry,.no-tasks,.overall-score').forEach(element=>element.classList.remove('show'));
  });
  document.querySelectorAll('.dash-btn').forEach(btn=>btn.classList.remove('active'));
  if(currentSection){
    currentSection.classList.add('active');
    if(sectionId==='quiz'){
      const elements=currentSection.querySelectorAll('.quiz-card');
      elements.forEach((element,index)=>setTimeout(()=>{element.classList.add('show');},index*300));
    }else if(sectionId==='progress'){
      const elements=currentSection.querySelectorAll('.card,.overall-score');
      elements.forEach((element,index)=>setTimeout(()=>{element.classList.add('show');},index*300));
    }else if(sectionId==='rankings'||sectionId==='tasks'){
      const elements=currentSection.querySelectorAll('.entry,.no-tasks');
      elements.forEach((element,index)=>setTimeout(()=>{element.classList.add('show');},index*300));
    }
  }
  const button=document.querySelector(`.dash-btn[onclick="showContent('${sectionId}')"]`);
  if(button)button.classList.add('active');
  document.querySelector('.section-title').style.display='none';
  document.querySelector('.section-subtitle').style.display='none';
  document.querySelector('.carousel-container').style.display='none';
}
function selectOption(element){
  const card=element.closest('.quiz-card');
  card.querySelectorAll('.option').forEach(opt=>opt.classList.remove('selected'));
  element.classList.add('selected');
}
function resetOptions(){
  document.querySelectorAll('.option').forEach(opt=>opt.classList.remove('selected'));
}
document.querySelectorAll('.entry,.no-tasks').forEach(element=>{
  element.addEventListener('mouseenter',()=>{
    element.style.transition='transform 0.2s ease,box-shadow 0.3s ease';
    element.style.transform='translateY(-4px) scale(1.03)';
  });
  element.addEventListener('mouseleave',()=>{
    element.style.transition='transform 0.4s ease,box-shadow 0.3s ease';
    element.style.transform='translateY(0) scale(1)';
  });
});
const slider=document.getElementById('slider');
const hoverLeft=document.getElementById('hoverLeft');
const hoverRight=document.getElementById('hoverRight');
const carousel=document.getElementById('carousel');
const totalOriginalTestimonials=6;
let currentIndex=1;
let isDragging=false;
let startX,currentTranslate,prevTranslate=0;
function updateSliderPosition(animate=true){
  const testimonialWidth=slider.children[0].offsetWidth;
  const gap=16;
  const containerWidth=carousel.offsetWidth;
  const offset=(containerWidth-testimonialWidth)/2-10;
  currentTranslate=-(currentIndex*(testimonialWidth+gap))+offset;
  slider.style.transition=animate?'transform 0.4s ease-in-out':'none';
  slider.style.transform=`translateX(${currentTranslate}px)`;
  prevTranslate=currentTranslate;
}
function handleLoop(){
  const testimonialWidth=slider.children[0].offsetWidth;
  const gap=16;
  const containerWidth=carousel.offsetWidth;
  const offset=(containerWidth-testimonialWidth)/2-10;
  if(currentIndex===0){
    currentIndex=totalOriginalTestimonials;
    slider.style.transition='none';
    currentTranslate=-(currentIndex*(testimonialWidth+gap))+offset;
    slider.style.transform=`translateX(${currentTranslate}px)`;
    prevTranslate=currentTranslate;
  }else if(currentIndex===totalOriginalTestimonials+1){
    currentIndex=1;
    slider.style.transition='none';
    currentTranslate=-(currentIndex*(testimonialWidth+gap))+offset;
    slider.style.transform=`translateX(${currentTranslate}px)`;
    prevTranslate=currentTranslate;
  }
}
hoverLeft.addEventListener('mouseenter',()=>{
  if(!isDragging){
    currentIndex--;
    updateSliderPosition();
    setTimeout(handleLoop,400);
  }
});
hoverRight.addEventListener('mouseenter',()=>{
  if(!isDragging){
    currentIndex++;
    updateSliderPosition();
    setTimeout(handleLoop,400);
  }
});
carousel.addEventListener('touchstart',e=>{
  isDragging=true;
  startX=e.touches[0].clientX;
  slider.style.transition='none';
});
carousel.addEventListener('touchmove',e=>{
  if(isDragging){
    const currentX=e.touches[0].clientX;
    const diffX=currentX-startX;
    currentTranslate=prevTranslate+diffX;
    slider.style.transform=`translateX(${currentTranslate}px)`;
  }
});
carousel.addEventListener('touchend',()=>{
  isDragging=false;
  slider.style.transition='transform 0.4s ease-in-out';
  const testimonialWidth=slider.children[0].offsetWidth;
  const gap=16;
  const movedBy=prevTranslate-currentTranslate;
  if(movedBy>(testimonialWidth+gap)*0.2){
    currentIndex++;
  }else if(movedBy<-(testimonialWidth+gap)*0.2){
    currentIndex--;
  }
  updateSliderPosition();
  setTimeout(handleLoop,400);
});
carousel.addEventListener('touchmove',e=>{
  if(isDragging)e.preventDefault();
},{passive:false});
window.addEventListener('resize',()=>updateSliderPosition(false));
window.onload=()=>updateSliderPosition(false);
