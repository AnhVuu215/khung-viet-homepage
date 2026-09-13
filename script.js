"use strict";
const destinations = [
  {title:"HẠ LONG",region:"QUẢNG NINH / MIỀN BẮC",image:"assets/halong-hero.png",alt:"Vịnh Hạ Long trong ánh bình minh",theme:"Bình minh trên vịnh",headline:"ĐI ĐỂ CẢM.",sub:"KHÔNG CHỈ ĐỂ ĐẾN.",description:"Có những buổi sớm, chỉ cần đứng yên. Để cả một vùng đất bước vào lòng mình.",caption:"Bắt đầu từ một bình minh.",feeling:"Thảnh thơi"},
  {title:"FANSIPAN",region:"LÀO CAI / TÂY BẮC",image:"assets/fansipan.webp",alt:"Đỉnh Fansipan và biển mây",theme:"Phía trên tầng mây",headline:"CHẠM TẦNG MÂY.",sub:"MỞ MỘT CHÂN TRỜI.",description:"Bên dưới là những điều quen thuộc. Phía trên là khoảng trời dành cho một góc nhìn mới.",caption:"Phía trên những tầng mây.",feeling:"Tự do"},
  {title:"HÀ GIANG",region:"CAO NGUYÊN ĐÁ / MIỀN BẮC",image:"assets/hagiang-story.jpg",alt:"Sông Nho Quế giữa hai vách núi Hà Giang",theme:"Một khoảng lặng xanh",headline:"QUA MỘT KHÚC QUANH.",sub:"GẶP MỘT MIỀN NHỚ.",description:"Đường uốn theo núi. Dòng sông ôm lấy đá. Còn ta học cách đi chậm thêm một chút.",caption:"Đường càng xa, lòng càng rộng.",feeling:"Phiêu lưu"},
  {title:"TRÀNG AN",region:"NINH BÌNH / MIỀN BẮC",image:"assets/trang-an.webp",alt:"Thuyền và đình giữa non nước Tràng An",theme:"Theo nhịp mái chèo",headline:"ĐỂ MÌNH TRÔI.",sub:"GIỮA MỘT MIỀN XANH.",description:"Tiếng mái chèo khẽ chạm mặt nước. Những vách núi đứng yên. Một buổi chiều không cần vội.",caption:"Theo nhịp mái chèo bình yên.",feeling:"Bình yên"},
  {title:"SƠN ĐOÒNG",region:"PHONG NHA / MIỀN TRUNG",image:"assets/son-doong.jpg",alt:"Ánh sáng và rừng xanh trong hang Sơn Đoòng",theme:"Ánh sáng trong lòng đất",headline:"BƯỚC VÀO KỲ DIỆU.",sub:"THẤY MÌNH NHỎ LẠI.",description:"Một khu rừng trong lòng hang. Một vệt sáng giữa bóng tối. Thiên nhiên luôn còn điều để kể.",caption:"Một thế giới khác bên trong.",feeling:"Kinh ngạc"},
  {title:"HỘI AN",region:"PHỐ CỔ / MIỀN TRUNG",image:"assets/hoian-story.jpg",alt:"Mái ngói và nhà vàng Hội An bên dòng sông",theme:"Một vệt nắng vàng",headline:"NÁN LẠI MỘT CHÚT.",sub:"ĐỂ NẮNG KỊP VÀNG.",description:"Qua một con hẻm nhỏ, nghe phố cũ thở thật khẽ. Có những nơi càng chậm càng thấy thương.",caption:"Mang về một vệt nắng vàng.",feeling:"Hoài niệm"},
  {title:"ĐÀ NẴNG",region:"MIỀN BIỂN / MIỀN TRUNG",image:"assets/danang.jpg",alt:"Bãi biển xanh trong với hàng dừa tại Đà Nẵng",theme:"Gửi nhịp sống vào biển",headline:"HÍT MỘT HƠI SÂU.",sub:"ĐỂ BIỂN MANG ĐI.",description:"Bỏ lại những lịch hẹn dày đặc. Hôm nay chỉ có nắng, gió và một đường chân trời thật rộng.",caption:"Thả nhịp sống về phía biển.",feeling:"Tươi mới"}
];
const $ = selector => document.querySelector(selector);
const number = n => String(n + 1).padStart(2,"0");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const themeToggle = $("#theme-toggle");
const themeLabel = $("#theme-label");
const themeIcon = $(".theme-icon");
const pageRoot = document.documentElement || document.body;
function renderTheme(){
  const projector=pageRoot.dataset.theme==="projector";
  themeToggle.setAttribute("aria-pressed",String(projector));
  themeToggle.setAttribute("aria-label",projector?"Chuyển về chế độ điện ảnh tối":"Bật chế độ trình chiếu sáng");
  themeIcon.textContent=projector?"◐":"☀";
  themeLabel.textContent=projector?"Màu tối":"Trình chiếu";
}
themeToggle.addEventListener("click",()=>{
  const projector=pageRoot.dataset.theme!=="projector";
  if(projector)pageRoot.dataset.theme="projector";else delete pageRoot.dataset.theme;
  try{localStorage.setItem("khung-viet-theme",projector?"projector":"dark");}catch{}
  renderTheme();
});
renderTheme();
const hero = $(".experience");
const duration = 8500;
let current = 0, changing = false, userPaused = motion.matches, heroVisible = true;
let timer, progressAnimation, activeTransition, flightAnimation, modalIndex = 0, downloadContent = "";
const slides = destinations.map((item,index) => {
  const image = index === 0 ? $("#hero-images img") : new Image();
  if(index !== 0){image.src=item.image;image.alt=item.alt;image.decoding="async";$("#hero-images").append(image);}
  return image;
});
destinations.forEach((item,index) => {
  const thumb = document.createElement("button");
  thumb.type="button";thumb.setAttribute("aria-label",item.title);thumb.dataset.slide=index;
  thumb.innerHTML='<img src="'+item.image+'" alt=""><span>'+number(index)+'</span>';
  thumb.addEventListener("click",()=>goTo(index));
  $("#hero-thumbs").append(thumb);
  const card = document.createElement("button");
  card.type="button";card.className="destination-card";card.setAttribute("aria-label","Khám phá "+item.title);
  card.innerHTML='<img loading="lazy" src="'+item.image+'" alt="'+item.alt+'"><span><small>'+number(index)+'</small><strong>'+item.title+'</strong><b>'+item.feeling+'</b></span>';
  card.addEventListener("click",()=>openDialog(index));
  card.addEventListener("pointerenter",()=>moveRoute(index));
  card.addEventListener("focus",()=>moveRoute(index));
  $("#destination-grid").append(card);
  $("#trip-destination").add(new Option(item.title,String(index)));
});
const thumbs = [...$("#hero-thumbs").children];
function moveRoute(index){$("#route-plane").style.left=(index/(destinations.length-1)*95)+"%";}
function render(index){
  const item=destinations[index], nextIndex=(index+1)%destinations.length, next=destinations[nextIndex];
  slides.forEach((image,i)=>{image.classList.toggle("active",i===index);image.setAttribute("aria-hidden",String(i!==index));});
  thumbs.forEach((button,i)=>{button.classList.toggle("active",i===index);button.setAttribute("aria-current",String(i===index));});
  $("#hero-kicker").textContent=number(index)+" / "+item.title+" · "+item.theme.toUpperCase();
  $("#hero-title").replaceChildren(document.createTextNode(item.headline),document.createElement("br"));
  const subtitle=document.createElement("em");subtitle.textContent=item.sub;$("#hero-title").append(subtitle);
  $("#hero-description").textContent=item.description;
  $("#destination-number").textContent=number(index);
  $("#destination-title").textContent=item.title;
  $("#destination-region").textContent=item.region;
  $("#slide-count").textContent=number(index)+" / 07";
  $("#next-image").src=next.image;$("#next-image").alt=next.alt;
  $("#next-number").textContent=number(nextIndex)+" / 07";
  $("#next-title").textContent=next.title;$("#next-caption").textContent=next.caption;
  $("#preview-card").setAttribute("aria-label","Khám phá điểm đến tiếp theo: "+next.title);
}
function stopTimer(){clearTimeout(timer);progressAnimation?.cancel();}
function schedule(){
  stopTimer();
  const modalOpen=$("#story-dialog").open || $("#film-dialog").open;
  hero.classList.toggle("paused",userPaused || !heroVisible || document.hidden || modalOpen);
  $("#pause").textContent=userPaused?"▷":"Ⅱ";
  $("#pause").setAttribute("aria-label",userPaused?"Tiếp tục trình chiếu":"Tạm dừng trình chiếu");
  $("#pause").setAttribute("aria-pressed",String(userPaused));
  if(userPaused || !heroVisible || document.hidden || modalOpen || changing)return;
  progressAnimation=$("#slide-progress").animate([{transform:"scaleX(0)"},{transform:"scaleX(1)"}],{duration,fill:"forwards"});
  timer=setTimeout(()=>goTo((current+1)%destinations.length),duration);
}
async function goTo(index){
  if(changing || index===current)return;
  changing=true;stopTimer();
  const destination=slides[index];
  try{await destination.decode();}catch{/* A failed decode must not lock navigation. */}
  if(!motion.matches && heroVisible && !document.hidden){
    hero.classList.add("is-changing");
    const rect=hero.getBoundingClientRect();
    const source=index===(current+1)%destinations.length?$("#preview-card"):thumbs[index];
    const sourceRect=source.getBoundingClientRect();
    const clone=destination.cloneNode();clone.className="transition-image";clone.alt="";clone.setAttribute("aria-hidden","true");
    hero.append(clone);
    const start=sourceRect.width?{left:sourceRect.left-rect.left,top:sourceRect.top-rect.top,width:sourceRect.width,height:sourceRect.height}:{left:rect.width*.75,top:rect.height*.25,width:rect.width*.2,height:rect.height*.4};
    activeTransition=clone.animate([{left:start.left+"px",top:start.top+"px",width:start.width+"px",height:start.height+"px",borderRadius:"8px"},{left:"0px",top:"0px",width:rect.width+"px",height:rect.height+"px",borderRadius:"0px"}],{duration:1100,easing:"cubic-bezier(.22,.7,.16,1)",fill:"forwards"});
    flightAnimation=$("#flying-plane").animate([{transform:"translate("+rect.width*.09+"px,"+rect.height*.8+"px) rotate(-15deg)",opacity:0},{opacity:1,offset:.2},{transform:"translate("+rect.width*.52+"px,"+rect.height*.62+"px) rotate(-20deg)",opacity:1,offset:.55},{transform:"translate("+rect.width*.91+"px,"+rect.height*.23+"px) rotate(-30deg)",opacity:0}],{duration:1300,easing:"ease-in-out"});
    try{await activeTransition.finished;}catch{/* Reduced motion or viewport changes can finish the transition early. */}
    current=index;render(index);clone.remove();activeTransition=null;
  }else{current=index;render(index);}
  hero.classList.remove("is-changing");changing=false;schedule();
}
$("#previous").addEventListener("click",()=>goTo((current+6)%7));
$("#next").addEventListener("click",()=>goTo((current+1)%7));
$("#preview-card").addEventListener("click",()=>goTo((current+1)%7));
$("#pause").addEventListener("click",()=>{userPaused=!userPaused;schedule();});
hero.addEventListener("keydown",event=>{
  if(event.key==="ArrowLeft" || event.key==="ArrowRight"){event.preventDefault();goTo((current+(event.key==="ArrowLeft"?6:1))%7);}
});
document.addEventListener("visibilitychange",schedule);
new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(hero);
motion.addEventListener("change",()=>{userPaused=motion.matches;if(motion.matches){activeTransition?.finish();flightAnimation?.cancel();}schedule();});
window.addEventListener("resize",()=>activeTransition?.finish());

const chapterDestinations=[2,4,5];
chapterDestinations.forEach((index,i)=>{const img=new Image();img.src=destinations[index].image;img.alt=destinations[index].alt;img.loading="lazy";img.classList.toggle("active",i===0);$("#story-photos").append(img);});
const chapters=[...document.querySelectorAll(".chapter")];
let scrollQueued=false;
function updateChapter(){
  scrollQueued=false;
  const focusLine=innerHeight*.55;
  let closest=0,distance=Infinity;
  chapters.forEach((chapter,i)=>{const box=chapter.getBoundingClientRect();const delta=Math.abs((box.top+box.bottom)/2-focusLine);if(delta<distance){distance=delta;closest=i;}});
  chapters.forEach((chapter,i)=>chapter.classList.toggle("active",i===closest));
  [...$("#story-photos").children].forEach((img,i)=>img.classList.toggle("active",i===closest));
  $("#story-photo-number").textContent=number(closest)+" / 03";
  $("#story-photo-title").textContent=destinations[chapterDestinations[closest]].title;
}
window.addEventListener("scroll",()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateChapter);}},{passive:true});

const dialog=$("#story-dialog");
function renderDialog(){
  const item=destinations[modalIndex];
  $("#dialog-image").src=item.image;$("#dialog-image").alt=item.alt;
  $("#dialog-title").textContent=item.title;$("#dialog-description").textContent=item.description;
  $("#dialog-count").textContent=number(modalIndex)+" / 07";
}
function openDialog(index){modalIndex=index;renderDialog();dialog.showModal();document.body.style.overflow="hidden";schedule();}
$("#open-story").addEventListener("click",()=>openDialog(current));
$("#close-dialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("close",()=>{document.body.style.overflow="";schedule();});
dialog.addEventListener("click",event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
function changeDialog(step){modalIndex=(modalIndex+step+7)%7;renderDialog();}
$("#dialog-prev").addEventListener("click",()=>changeDialog(-1));
$("#dialog-next").addEventListener("click",()=>changeDialog(1));
dialog.addEventListener("keydown",event=>{if(event.key==="ArrowLeft"||event.key==="ArrowRight"){event.preventDefault();changeDialog(event.key==="ArrowLeft"?-1:1);}});

const filmDialog=$("#film-dialog"),filmFrame=$("#film-frame"),filmStage=filmDialog.querySelector?.(".film-stage") || $(".film-stage");
let filmIndex=0,filmTimer,filmAnimation,filmPaused=false;
function stopFilm(){clearTimeout(filmTimer);filmAnimation?.cancel();}
function renderFilm(){
  const item=destinations[filmIndex];
  filmStage.classList.add("is-changing");
  setTimeout(()=>{filmFrame.src=item.image;filmFrame.alt=item.alt;$("#film-count").textContent=number(filmIndex)+" / 07";$("#film-caption").textContent=item.caption;filmStage.classList.remove("is-changing");},180);
  stopFilm();
  if(filmPaused)return;
  filmAnimation=$("#film-progress").animate([{width:"0%"},{width:"100%"}],{duration:3200,easing:"linear",fill:"forwards"});
  filmTimer=setTimeout(()=>{filmIndex=(filmIndex+1)%destinations.length;renderFilm();},3200);
}
function openFilm(){filmIndex=0;filmPaused=false;$("#film-toggle").textContent="Ⅱ";$("#film-toggle").setAttribute("aria-label","Tạm dừng phim");filmDialog.showModal();document.body.style.overflow="hidden";renderFilm();schedule();}
$("#open-film").addEventListener("click",openFilm);
$("#close-film").addEventListener("click",()=>filmDialog.close());
$("#film-next").addEventListener("click",()=>{filmIndex=(filmIndex+1)%destinations.length;renderFilm();});
$("#film-toggle").addEventListener("click",()=>{filmPaused=!filmPaused;$("#film-toggle").textContent=filmPaused?"▶":"Ⅱ";$("#film-toggle").setAttribute("aria-label",filmPaused?"Tiếp tục phim":"Tạm dừng phim");if(filmPaused)stopFilm();else renderFilm();});
filmDialog.addEventListener("close",()=>{stopFilm();document.body.style.overflow="";schedule();});
filmDialog.addEventListener("click",event=>{if(event.target===filmDialog){const box=filmDialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)filmDialog.close();}});

const today=new Date();const localDate=today.getFullYear()+"-"+String(today.getMonth()+1).padStart(2,"0")+"-"+String(today.getDate()).padStart(2,"0");
$("#trip-date").min=localDate;
document.querySelectorAll("[data-choose]").forEach(link=>link.addEventListener("click",()=>{$("#trip-destination").value=link.dataset.choose;$("#trip-result").hidden=true;}));
$("#trip-name").addEventListener("input",()=>$("#trip-name").setCustomValidity(""));
$("#trip-form").addEventListener("input",()=>{$("#trip-result").hidden=true;});
$("#trip-form").addEventListener("submit",event=>{
  event.preventDefault();
  const name=$("#trip-name").value.trim();
  if(!name){$("#trip-name").setCustomValidity("Nhập tên của bạn, không chỉ khoảng trắng.");$("#trip-name").reportValidity();return;}
  const item=destinations[Number($("#trip-destination").value)];
  const date=new Intl.DateTimeFormat("vi-VN",{dateStyle:"long"}).format(new Date($("#trip-date").value+"T12:00:00"));
  const summary=name+" · "+item.title+" · "+date+" · "+$("#trip-guests").value+" người.";
  $("#ticket-code").textContent=String(Number($("#trip-destination").value)+1).padStart(2,"0")+$("#trip-date").value.slice(5,7)+$("#trip-date").value.slice(8,10);
  const note=item.title==="SƠN ĐOÒNG"?" Sơn Đoòng là cảm hứng khám phá; cần tìm hiểu điều kiện tham gia với đơn vị tổ chức chuyên biệt.":"";
  $("#trip-summary").textContent=summary+note;
  downloadContent="KHUNG VIỆT — THẺ HÀNH TRÌNH\nViệt Nam qua từng khung hình\n\n"+summary+"\n"+item.caption+"\n"+note+"\n\nBẢN DEMO HỌC TẬP — Đây là danh sách mong muốn, không phải vé hoặc xác nhận đặt chỗ. Không có thông tin được gửi đi.";
  $("#trip-result").hidden=false;
});
$("#download-trip").addEventListener("click",()=>{
  if(!downloadContent)return;
  const url=URL.createObjectURL(new Blob(["\uFEFF"+downloadContent],{type:"text/plain;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="khung-viet-hanh-trinh.txt";document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
render(0);updateChapter();schedule();
