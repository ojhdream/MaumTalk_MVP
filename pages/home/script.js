const ICONS={
 plain:'<svg viewBox="0 0 24 24"><path d="M7 17c-2.2 0-4-1.7-4-3.8 0-1.9 1.4-3.5 3.3-3.8C7 6.8 9.3 5 12 5c3.4 0 6.2 2.6 6.4 5.9 1.5.5 2.6 1.9 2.6 3.5 0 2-1.7 3.6-3.8 3.6H7Z"/><circle cx="8" cy="20" r=".8"/><circle cx="12" cy="20.5" r=".8"/></svg>',
 daily:'<svg viewBox="0 0 24 24"><path d="M19 4C11 4 5.5 8.2 5 16c4.2.3 8.3-1.4 10.7-5.2M5.2 16.2 3 20"/><path d="M8 14c2.1-1.6 4.6-2.8 7.5-3.5"/></svg>',
 worry:'<svg viewBox="0 0 24 24"><path d="M7 17c-2.2 0-4-1.7-4-3.8 0-1.9 1.4-3.5 3.3-3.8C7 6.8 9.3 5 12 5c3.4 0 6.2 2.6 6.4 5.9 1.5.5 2.6 1.9 2.6 3.5 0 2-1.7 3.6-3.8 3.6H7Z"/><path d="M9 20h.01M13 21h.01"/></svg>',
 spark:'<svg viewBox="0 0 24 24"><path d="m8 3 1.5 4.5L14 9l-4.5 1.5L8 15l-1.5-4.5L2 9l4.5-1.5L8 3Z"/><path d="m17 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/></svg>',
 todo:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16 9"/></svg>'
};
const fixedCategories=[
 {id:'plain',name:'그냥 툭',color:'#E77760',soft:'#FFF0EB',icon:'plain',friend:'friend-default.svg',hint:'생각나는 대로',examples:['오늘 저녁은 카레.','문득 이 노래가 생각났다.']},
 {id:'daily',name:'일상',color:'#3D9E69',soft:'#EAF6EE',icon:'daily',friend:'friend-daily.svg',hint:'오늘을 담담하게',examples:['퇴근길 하늘이 유난히 맑았다.','아이가 한 말이 자꾸 웃긴다.']},
 {id:'worry',name:'고민',color:'#9B6BC2',soft:'#F3ECF8',icon:'worry',friend:'friend-worry.svg',hint:'마음을 천천히',examples:['괜히 그 말이 신경 쓰인다.','이 선택이 맞을까.']},
 {id:'spark',name:'문득',color:'#D79A12',soft:'#FFF6DB',icon:'spark',friend:'friend-sudden.svg',hint:'스쳐간 생각',examples:['행복은 익숙한 순간에 오는 걸지도.','아침 산책을 하면 생각이 맑아진다.']},
 {id:'todo',name:'할 일',color:'#4F87C7',soft:'#EAF2FB',icon:'todo',friend:'friend-todo.svg',hint:'잊기 전에',examples:['택배 보내기.','엄마에게 전화하기.']}
];
const DEMO_RECORDS=[
 {id:'demo-1',text:'퇴근길 하늘이 유난히 맑았다.',category:'일상',categoryId:'daily',color:'#3D9E69',soft:'#EAF6EE',icon:'daily',time:'오후 8:41'},
 {id:'demo-2',text:'아침 산책을 하면 생각이 맑아진다.',category:'문득',categoryId:'spark',color:'#D79A12',soft:'#FFF6DB',icon:'spark',time:'오후 7:12'},
 {id:'demo-3',text:'오늘 저녁은 카레.',category:'그냥 툭',categoryId:'plain',color:'#E77760',soft:'#FFF0EB',icon:'plain',time:'오후 6:03'}
];
const storedRecords=safeParse('maumtalk.records',null);
let isDemoMode=storedRecords===null;
let records=isDemoMode?DEMO_RECORDS.slice():storedRecords;
let selected=null;
const $=s=>document.querySelector(s);
const els={fixed:$('#fixedCategoryGrid'),label:$('#selectedLabel'),hint:$('#selectedHint'),examples:$('#composerExamples'),cta:null,card:$('#composerCard'),friend:document.querySelector('.friend'),friendImage:$('#friendImage'),friendCta:$('#friendCta'),editor:$('#editorScreen'),editorText:$('#editorText'),editorCategory:$('#editorCategory'),charCount:$('#charCount'),recent:$('#recentList'),clone:$('#expandClone'),toast:$('#toast')};
function safeParse(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function escapeHTML(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function formatDate(d){return `${d.getMonth()+1}월 ${d.getDate()}일 ${['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][d.getDay()]}`}
function formatTime(d){return d.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:true})}
function icon(cat,cls='category-icon'){return `<span class="${cls}">${ICONS[cat.icon]||ICONS.plain}</span>`}
function applyDate(){const n=new Date();$('#todayDate').textContent=formatDate(n);$('#editorDay').textContent=formatDate(n);$('#editorTimestamp').textContent=formatTime(n)}
function chipMarkup(cat){const isSelected=selected?.id===cat.id;const name=`<span class="category-name">${escapeHTML(cat.name)}</span>`;return `<button type="button" role="option" aria-selected="${isSelected}" class="category-chip ${cat.id==='plain'?'plain-chip':''} ${isSelected?'selected':''}" data-id="${cat.id}" style="--cat-color:${cat.color};--cat-soft:${cat.soft}">${icon(cat)}${name}</button>`}
function renderCategories(){
 els.fixed.innerHTML=fixedCategories.map(chipMarkup).join('');
 els.fixed.querySelectorAll('[data-id]').forEach(button=>button.addEventListener('click',()=>selectCategory(button.dataset.id)));
}
function updateFriend(filename='friend-idle.svg'){
 if(!els.friendImage)return;
 const next=`../../assets/friend/${filename}`;
 if(els.friendImage.getAttribute('src')===next)return;
 els.friend?.classList.add('is-changing');
 setTimeout(()=>{
   els.friendImage.src=next;
   els.friendImage.onload=()=>els.friend?.classList.remove('is-changing');
   setTimeout(()=>els.friend?.classList.remove('is-changing'),180);
 },70);
}
function selectCategory(id){
 selected=fixedCategories.find(cat=>cat.id===id)||null;
 if(!selected)return;
 els.label.style.setProperty('--cat-color',selected.color);els.label.style.setProperty('--cat-soft',selected.soft);
 els.label.innerHTML=`${icon(selected,'label-icon')}<span>${escapeHTML(selected.name)}</span>`;
 els.hint.textContent=selected.hint||'';
 els.examples.innerHTML=selected.examples.map(text=>`<div class="example-line"><span class="example-quote">“</span><span>${escapeHTML(text)}</span></div>`).join('');
 els.card.style.setProperty('--cat-color',selected.color);
 els.card.classList.add('is-ready');
 els.card.setAttribute('aria-label',`${selected.name}으로 기록하기`);
 updateFriend(selected.friend);
 renderCategories();
}
function startEditor(){
 if(!selected){showToast('마음에 가까운 하나를 먼저 골라보세요.');return}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 els.editorCategory.style.setProperty('--cat-color',selected.color);els.editorCategory.style.setProperty('--cat-soft',selected.soft);
 els.editorCategory.innerHTML=`${icon(selected,'label-icon')}<span>${escapeHTML(selected.name)}</span>`;
 applyDate();
 if(reduced){showEditor();return}
 const rect=els.card.getBoundingClientRect(),appRect=$('#app').getBoundingClientRect();
 Object.assign(els.clone.style,{left:`${rect.left-appRect.left}px`,top:`${rect.top-appRect.top}px`,width:`${rect.width}px`,height:`${rect.height}px`,opacity:'1',borderRadius:'26px'});
 els.clone.classList.add('run');
 requestAnimationFrame(()=>requestAnimationFrame(()=>Object.assign(els.clone.style,{left:'0px',top:'0px',width:`${appRect.width}px`,height:`${appRect.height}px`,borderRadius:'0px'})));
 setTimeout(()=>{showEditor();els.clone.style.opacity='0';setTimeout(()=>{els.clone.classList.remove('run');els.clone.removeAttribute('style')},170)},210);
}
function showEditor(){els.editor.classList.add('show');els.editor.setAttribute('aria-hidden','false');setTimeout(()=>els.editorText.focus(),60)}
function closeEditor(){els.editor.classList.remove('show');els.editor.setAttribute('aria-hidden','true');els.editorText.blur()}
function saveEditor(){
 const text=els.editorText.value.trim();
 if(!text){showToast('한 글자만 남겨도 괜찮아요.');return}
 const newRecord={id:Date.now(),text,category:selected.name,categoryId:selected.id,color:selected.color,soft:selected.soft,icon:selected.icon,time:formatTime(new Date())};
 if(isDemoMode){records=[newRecord];isDemoMode=false}else{records.unshift(newRecord)}
 records=records.slice(0,50);localStorage.setItem('maumtalk.records',JSON.stringify(records));
 els.editorText.value='';els.charCount.textContent='0';renderRecords();closeEditor();showToast('잘 두었어요.');
}
function renderRecords(){
 if(!records.length){els.recent.innerHTML='<div class="empty-state"><strong>아직 남긴 조각이 없어요.</strong>사소한 것도 가볍게 남겨보세요.</div>';return}
 els.recent.innerHTML=records.slice(0,3).map(record=>{const cat=fixedCategories.find(item=>item.id===record.categoryId)||{name:record.category,color:record.color||'#6B7280',soft:record.soft||'#F1F3F2',icon:record.icon||'plain'};return `<article class="record-item" tabindex="0" role="button" aria-label="${escapeHTML(cat.name)} 기록: ${escapeHTML(record.text)}"><span class="record-icon-wrap" style="--record-color:${cat.color};--record-soft:${cat.soft}">${icon(cat,'record-icon')}</span><div class="record-copy"><p>${escapeHTML(record.text)}</p><span class="record-meta" style="--record-color:${cat.color}">${escapeHTML(cat.name)}</span></div><time>${escapeHTML(record.time||'')}</time></article>`}).join('');
}
let toastTimer;function showToast(message){clearTimeout(toastTimer);els.toast.textContent=message;els.toast.classList.add('show');toastTimer=setTimeout(()=>els.toast.classList.remove('show'),1800)}
els.card.addEventListener('click',startEditor);
els.card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();startEditor()}});
$('#closeEditor').addEventListener('click',closeEditor);
$('#saveEditor').addEventListener('click',saveEditor);
els.editorText.addEventListener('input',()=>els.charCount.textContent=String(els.editorText.value.length));
$('#viewAllBtn').addEventListener('click',()=>showToast('전체 기록 화면은 다음 단계에서 연결해요.'));
$('#profileBtn').addEventListener('click',()=>showToast('나 화면은 앱 통합 단계에서 연결해요.'));
function initComposer(){
 const examples=fixedCategories[0].examples;
 els.label.innerHTML='';
 els.hint.textContent='';
 els.examples.innerHTML=examples.map(text=>`<div class="example-line"><span class="example-quote">“</span><span>${escapeHTML(text)}</span></div>`).join('');
 els.card.classList.remove('is-ready');
 els.card.setAttribute('aria-label','마음에 가까운 하나를 고른 뒤 기록하기');
 updateFriend('friend-idle.svg');
}
applyDate();renderRecords();els.friendCta?.addEventListener('click',(event)=>{event.stopPropagation();startEditor();});
renderCategories();initComposer();
