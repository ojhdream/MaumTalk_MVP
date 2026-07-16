const ICONS={
 plain:'<svg viewBox="0 0 24 24"><path d="M7 17c-2.2 0-4-1.7-4-3.8 0-1.9 1.4-3.5 3.3-3.8C7 6.8 9.3 5 12 5c3.4 0 6.2 2.6 6.4 5.9 1.5.5 2.6 1.9 2.6 3.5 0 2-1.7 3.6-3.8 3.6H7Z"/><circle cx="8" cy="20" r=".8"/><circle cx="12" cy="20.5" r=".8"/></svg>',
 daily:'<svg viewBox="0 0 24 24"><path d="M19 4C11 4 5.5 8.2 5 16c4.2.3 8.3-1.4 10.7-5.2M5.2 16.2 3 20"/><path d="M8 14c2.1-1.6 4.6-2.8 7.5-3.5"/></svg>',
 worry:'<svg viewBox="0 0 24 24"><path d="M7 17c-2.2 0-4-1.7-4-3.8 0-1.9 1.4-3.5 3.3-3.8C7 6.8 9.3 5 12 5c3.4 0 6.2 2.6 6.4 5.9 1.5.5 2.6 1.9 2.6 3.5 0 2-1.7 3.6-3.8 3.6H7Z"/><path d="M9 20h.01M13 21h.01"/></svg>',
 spark:'<svg viewBox="0 0 24 24"><path d="m8 3 1.5 4.5L14 9l-4.5 1.5L8 15l-1.5-4.5L2 9l4.5-1.5L8 3Z"/><path d="m17 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/></svg>',
 todo:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12 2.5 2.5L16 9"/></svg>'
};
const fixedCategories=[
 {id:'plain',name:'\uADF8\uB0E5 \uD22D',color:'#E77760',soft:'#FFF0EB',icon:'plain',friend:'friend-default.svg',hint:'\uC0DD\uAC01\uB098\uB294 \uB300\uB85C',examples:['\uC624\uB298 \uC800\uB141\uC740 \uCE74\uB808.','\uBB38\uB4DD \uC774 \uB178\uB798\uAC00 \uC0DD\uAC01\uB0AC\uB2E4.']},
 {id:'daily',name:'\uC77C\uC0C1',color:'#3D9E69',soft:'#EAF6EE',icon:'daily',friend:'friend-daily.svg',hint:'\uC624\uB298\uC744 \uB2F4\uB2F4\uD558\uAC8C',examples:['\uD1F4\uADFC\uAE38 \uD558\uB298\uC774 \uC720\uB09C\uD788 \uB9D1\uC558\uB2E4.','\uC544\uC774\uAC00 \uD55C \uB9D0\uC774 \uC790\uAFB8 \uC6C3\uAE34\uB2E4.']},
 {id:'worry',name:'\uACE0\uBBFC',color:'#9B6BC2',soft:'#F3ECF8',icon:'worry',friend:'friend-worry.svg',hint:'\uB9C8\uC74C\uC744 \uCC9C\uCC9C\uD788',examples:['\uAD1C\uD788 \uADF8 \uB9D0\uC774 \uC2E0\uACBD \uC4F0\uC778\uB2E4.','\uC774 \uC120\uD0DD\uC774 \uB9DE\uC744\uAE4C.']},
 {id:'spark',name:'\uBB38\uB4DD',color:'#D79A12',soft:'#FFF6DB',icon:'spark',friend:'friend-sudden.svg',hint:'\uC2A4\uCCD0\uAC04 \uC0DD\uAC01',examples:['\uD589\uBCF5\uC740 \uC775\uC219\uD55C \uC21C\uAC04\uC5D0 \uC624\uB294 \uAC78\uC9C0\uB3C4.','\uC544\uCE68 \uC0B0\uCC45\uC744 \uD558\uBA74 \uC0DD\uAC01\uC774 \uB9D1\uC544\uC9C4\uB2E4.']},
 {id:'todo',name:'\uD560 \uC77C',color:'#4F87C7',soft:'#EAF2FB',icon:'todo',friend:'friend-todo.svg',hint:'\uC78A\uAE30 \uC804\uC5D0',examples:['\uD0DD\uBC30 \uBCF4\uB0B4\uAE30.','\uC5C4\uB9C8\uC5D0\uAC8C \uC804\uD654\uD558\uAE30.']}
];
const DEMO_RECORDS=[
 {id:'demo-1',text:'\uD1F4\uADFC\uAE38 \uD558\uB298\uC774 \uC720\uB09C\uD788 \uB9D1\uC558\uB2E4.',category:'\uC77C\uC0C1',categoryId:'daily',color:'#3D9E69',soft:'#EAF6EE',icon:'daily',time:'\uC624\uD6C4 8:41'},
 {id:'demo-2',text:'\uC544\uCE68 \uC0B0\uCC45\uC744 \uD558\uBA74 \uC0DD\uAC01\uC774 \uB9D1\uC544\uC9C4\uB2E4.',category:'\uBB38\uB4DD',categoryId:'spark',color:'#D79A12',soft:'#FFF6DB',icon:'spark',time:'\uC624\uD6C4 7:12'},
 {id:'demo-3',text:'\uC624\uB298 \uC800\uB141\uC740 \uCE74\uB808.',category:'\uADF8\uB0E5 \uD22D',categoryId:'plain',color:'#E77760',soft:'#FFF0EB',icon:'plain',time:'\uC624\uD6C4 6:03'}
];
function storageRecordToHome(record){
 const cat=fixedCategories.find(item=>item.id===record.category)||fixedCategories[0];
 return {id:record.id,text:record.content,category:cat.name,categoryId:cat.id,color:cat.color,soft:cat.soft,icon:cat.icon,time:formatTime(new Date(record.createdAt))};
}
const storedRecords=Storage.getAll();
let isDemoMode=storedRecords.length===0;
let records=isDemoMode?DEMO_RECORDS.slice():storedRecords.map(storageRecordToHome);
let selected=null;
const $=s=>document.querySelector(s);
const els={fixed:$('#fixedCategoryGrid'),label:$('#selectedLabel'),hint:$('#selectedHint'),examples:$('#composerExamples'),cta:null,card:$('#composerCard'),friend:document.querySelector('.friend'),friendImage:$('#friendImage'),friendCta:$('#friendCta'),editor:$('#editorScreen'),editorText:$('#editorText'),editorCategory:$('#editorCategory'),charCount:$('#charCount'),recent:$('#recentList'),clone:$('#expandClone'),toast:$('#toast')};
const CTA_COPY={
 plain:'\uC0DD\uAC01\uB098\uB294 \uB300\uB85C, \uD22D \uAE30\uB85D\uD574\uBCFC\uAE4C?',
 daily:'\uC624\uB298\uC744 \uB2F4\uB2F4\uD558\uAC8C, \uD22D \uAE30\uB85D\uD574\uBCFC\uAE4C?',
 worry:'\uB9C8\uC74C\uC744 \uCC9C\uCC9C\uD788, \uD22D \uAE30\uB85D\uD574\uBCFC\uAE4C?',
 spark:'\uC2A4\uCCD0\uAC04 \uC0DD\uAC01, \uD22D \uAE30\uB85D\uD574\uBCFC\uAE4C?',
 todo:'\uC78A\uAE30 \uC804\uC5D0, \uD22D \uAE30\uB85D\uD574\uBCFC\uAE4C?'
};
function escapeHTML(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function formatDate(d){return `${d.getMonth()+1}\uC6D4 ${d.getDate()}\uC77C ${['\uC77C\uC694\uC77C','\uC6D4\uC694\uC77C','\uD654\uC694\uC77C','\uC218\uC694\uC77C','\uBAA9\uC694\uC77C','\uAE08\uC694\uC77C','\uD1A0\uC694\uC77C'][d.getDay()]}`}
function formatTime(d){return d.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:true})}
function icon(cat,cls='category-icon'){return `<span class="${cls}">${ICONS[cat.icon]||ICONS.plain}</span>`}
function applyDate(){const n=new Date();$('#todayDate').textContent=formatDate(n);$('#homePrompt').textContent='\uC9C0\uAE08 \uB9C8\uC74C\uC5D0 \uAC00\uAE4C\uC6B4 \uC870\uAC01\uC740?';$('#editorDay').textContent=formatDate(n);$('#editorTimestamp').textContent=formatTime(n)}
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
function nudgeComposerCta(){
 if(!els.friendCta || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 els.friendCta.classList.remove('is-nudging');
 void els.friendCta.offsetWidth;
 els.friendCta.classList.add('is-nudging');
}
function setComposerCta(category){
 const label=els.friendCta?.querySelector('span:first-child');
 if(label)label.textContent=CTA_COPY[category?.id]||'\uD22D, \uAE30\uB85D\uD574\uBCFC\uAE4C?';
}
function selectCategory(id){
 selected=fixedCategories.find(cat=>cat.id===id)||null;
 if(!selected)return;
 els.label.style.setProperty('--cat-color',selected.color);els.label.style.setProperty('--cat-soft',selected.soft);
 els.label.innerHTML='';
 els.hint.textContent='';
 els.hint.style.display='none';
 els.examples.innerHTML=selected.examples.slice(0,2).map(text=>`<div class="example-line"><span class="example-quote">“</span><span>${escapeHTML(text)}</span></div>`).join('');
 els.card.style.setProperty('--cat-color',selected.color);
 els.card.style.setProperty('--cat-soft',selected.soft);
 els.card.classList.add('is-ready');
 els.card.setAttribute('aria-label',`${selected.name}으로 기록하기`);
 setComposerCta(selected);
 updateFriend(selected.friend);
 nudgeComposerCta();
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
 const newRecord=storageRecordToHome(Storage.save({category:selected.id,content:text,todos:[],tags:[],attachments:[]}));
 if(isDemoMode){records=[newRecord];isDemoMode=false}else{records.unshift(newRecord)}
 records=records.slice(0,50);
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
 els.hint.style.display='none';
 setComposerCta(null);
 els.examples.innerHTML=examples.slice(0,2).map(text=>`<div class="example-line"><span class="example-quote">“</span><span>${escapeHTML(text)}</span></div>`).join('');
 els.card.classList.remove('is-ready');
 els.card.setAttribute('aria-label','마음에 가까운 하나를 고른 뒤 기록하기');
 updateFriend('friend-idle.svg');
}
renderRecords=function(){
 if(!records.length){els.recent.innerHTML='<div class="empty-state"><strong>?꾩쭅 ?④릿 議곌컖???놁뼱??</strong>?ъ냼??寃껊룄 媛蹂띻쾶 ?④꺼蹂댁꽭??</div>';return}
 els.recent.innerHTML=records.slice(0,3).map(record=>{
  const cat=fixedCategories.find(item=>item.id===record.categoryId)||{name:record.category,color:record.color||'#6B7280',soft:record.soft||'#F1F3F2',icon:record.icon||'plain'};
  const menu=isDemoMode?'':`<button type="button" aria-label="기록 메뉴" data-menu="${escapeHTML(record.id)}">⋯</button><div hidden data-menu-panel="${escapeHTML(record.id)}"><button type="button" data-edit="${escapeHTML(record.id)}">수정</button><button type="button" data-delete="${escapeHTML(record.id)}">삭제</button></div>`;
  return `<article class="record-item" tabindex="0" role="button" aria-label="${escapeHTML(cat.name)} 湲곕줉: ${escapeHTML(record.text)}" data-record="${escapeHTML(record.id)}"><span class="record-icon-wrap" style="--record-color:${cat.color};--record-soft:${cat.soft}">${icon(cat,'record-icon')}</span><div class="record-copy"><p>${escapeHTML(record.text)}</p><span class="record-meta" style="--record-color:${cat.color}">${escapeHTML(cat.name)}</span></div><time>${escapeHTML(record.time||'')}</time>${menu}</article>`;
 }).join('');
};
function refreshStoredRecords(){
 const next=Storage.getAll();
 isDemoMode=next.length===0;
 records=isDemoMode?DEMO_RECORDS.slice():next.map(storageRecordToHome);
 renderRecords();
}
function editStoredRecord(id){MaumTalkRouter.navigate('editor',{edit:id})}
function deleteStoredRecord(id){if(!confirm('삭제할까요?'))return;Storage.remove(id);refreshStoredRecords();showToast('삭제했어요.')}
els.recent.addEventListener('click',event=>{
 const menu=event.target.closest('[data-menu]'),edit=event.target.closest('[data-edit]'),del=event.target.closest('[data-delete]');
 if(menu||edit||del){event.preventDefault();event.stopPropagation()}
 if(menu){const panel=els.recent.querySelector(`[data-menu-panel="${CSS.escape(menu.dataset.menu)}"]`);els.recent.querySelectorAll('[data-menu-panel]').forEach(item=>{if(item!==panel)item.hidden=true});if(panel)panel.hidden=!panel.hidden}
 if(edit)editStoredRecord(edit.dataset.edit);
 if(del)deleteStoredRecord(del.dataset.delete);
});
renderRecords=function(){
 if(!records.length){els.recent.innerHTML='<div class="empty-state"><strong>?꾩쭅 ?④릿 議곌컖???놁뼱??</strong>?ъ냼??寃껊룄 媛蹂띻쾶 ?④꺼蹂댁꽭??</div>';return}
 els.recent.innerHTML=records.slice(0,3).map(record=>{
  const cat=fixedCategories.find(item=>item.id===record.categoryId)||{name:record.category,color:record.color||'#6B7280',soft:record.soft||'#F1F3F2',icon:record.icon||'plain'};
  const menu=isDemoMode?'':`<button type="button" aria-label="record menu" data-menu="${escapeHTML(record.id)}">&#8942;</button><div hidden data-menu-panel="${escapeHTML(record.id)}"><button type="button" data-edit="${escapeHTML(record.id)}">&#49688;&#51221;</button><button type="button" data-delete="${escapeHTML(record.id)}">&#49325;&#51228;</button></div>`;
  return `<article class="record-item" tabindex="0" role="button" aria-label="${escapeHTML(cat.name)} record: ${escapeHTML(record.text)}" data-record="${escapeHTML(record.id)}"><span class="record-icon-wrap" style="--record-color:${cat.color};--record-soft:${cat.soft}">${icon(cat,'record-icon')}</span><div class="record-copy"><p>${escapeHTML(record.text)}</p><span class="record-meta" style="--record-color:${cat.color}">${escapeHTML(cat.name)}</span></div><time>${escapeHTML(record.time||'')}</time>${menu}</article>`;
 }).join('');
};
deleteStoredRecord=function(id){if(!confirm('\uC0AD\uC81C\uD560\uAE4C\uC694?'))return;Storage.remove(id);refreshStoredRecords();showToast('\uC0AD\uC81C\uD588\uC5B4\uC694.')}
applyDate();renderRecords();els.friendCta?.addEventListener('click',(event)=>{event.stopPropagation();startEditor();});
renderCategories();initComposer();
function renderTodayEmptyState(){
 if(Storage.getAll().length>0)return;
 records=[];
 els.recent.innerHTML='<div data-empty-state="today" style="min-height:220px;padding:42px 12px 96px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center;gap:8px"><strong style="font-size:16px;font-weight:600">오늘은 아직 남긴 툭이 없어요.</strong><p style="margin:0;font-size:13px;line-height:1.6;color:#8A929C">생각나는 게 생기면, 가볍게 남겨보세요.</p><button type="button" data-empty-cta="today" style="margin-top:8px;border:0;background:transparent;color:inherit;font:inherit;font-size:14px;font-weight:600">첫 툭 남기기 →</button></div>';
}
els.recent.addEventListener('click',event=>{
 if(event.target.closest('[data-empty-cta="today"]')){event.preventDefault();MaumTalkRouter.navigate('editor')}
});
renderTodayEmptyState();
deleteStoredRecord=function(id){if(!confirm('\uC0AD\uC81C\uD560\uAE4C\uC694?'))return;Storage.remove(id);refreshStoredRecords();renderTodayEmptyState();showToast('\uC0AD\uC81C\uD588\uC5B4\uC694.')}
function openZipEditor(){
 if(!selected){showToast('留덉쓬??媛源뚯슫 ?섎굹瑜?癒쇱? 怨⑤씪蹂댁꽭??');return}
 MaumTalkRouter.navigate('editor',{category:selected.id});
}
els.card.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();openZipEditor()},true);
els.card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();openZipEditor()}},true);
els.friendCta?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();openZipEditor()},true);
