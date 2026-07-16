const demoRecords=[
 {id:1,date:'2026-07-14T20:41:00',type:'daily',icon:'⌁',text:'퇴근길 하늘이 유난히 예뻤다.\n잠깐 멈춰 사진을 찍었다.\n별일 없던 하루였는데 괜히 오래 기억날 것 같다.',media:'photo',attachments:1},
 {id:2,date:'2026-07-14T15:18:00',type:'spark',icon:'✦',text:'마음은 해결보다 이름이 먼저일지도.\n무엇이 힘든지 이름을 붙이면 아주 조금 멀리서 볼 수 있을 것 같다.\n오늘 떠오른 구조를 손으로 그려두었다.',media:'sketch',attachments:1},
 {id:3,date:'2026-07-14T09:12:00',type:'todo',icon:'✓',text:'엄마에게 전화하기',todos:[['우체국 들르기',true],['엄마에게 전화하기',false],['저녁 먹고 일지 남기기',false],['세탁기 돌리기',true],['화분 물주기',false]]},
 {id:4,date:'2026-07-13T22:06:00',type:'worry',icon:'☁',text:'그 말이 자꾸 마음에 남는다.\n내가 예민한 걸까, 아니면 정말 서운했던 걸까.\n적고 나니 지금 당장 답을 내리지 않아도 될 것 같다.'},
 {id:5,date:'2026-07-13T18:30:00',type:'plain',icon:'◌',text:'오늘 저녁은 카레.\n냉장고에 감자랑 당근이 있다.'},
 {id:6,date:'2026-07-12T11:44:00',type:'daily',icon:'⌁',text:'아이와 동네 한 바퀴.\n느리게 걸으니 평소 못 보던 꽃이 보였다.\n집에 돌아오는 길에는 아이가 주운 돌을 주머니에 넣어줬다.',media:'photos',attachments:3},
 {id:7,date:'2026-07-11T08:23:00',type:'spark',icon:'✦',text:'기록은 정리보다 보관에 가깝다.\n당장 이해하지 못해도 잘 두면 나중에 의미가 생길 수 있다.\n그래서 완벽하게 쓰는 것보다 놓치지 않는 게 먼저다.',media:'link',attachments:1},
 {id:8,date:'2026-07-09T14:02:00',type:'plain',icon:'◌',text:'문득 이 노래가 생각났다.\n오랜만에 플레이리스트에 다시 넣었다.'},
 {id:9,date:'2026-07-07T19:10:00',type:'todo',icon:'✓',text:'택배 보내기',todos:[['택배 포장하기',true],['점심시간에 편의점 들르기',false]]},
 {id:10,date:'2026-07-05T16:18:00',type:'worry',icon:'☁',text:'괜히 조급한 오후.\n아무것도 안 한 것 같아 마음이 바빠졌다.\n해야 할 일보다 잘해야 한다는 생각이 더 무거웠다.\n오늘은 한 가지만 끝내기로 했다.\n그것으로 충분하다고 적어본다.\n내일의 나에게 나머지를 맡긴다.'},
 {id:11,date:'2026-07-03T21:05:00',type:'daily',icon:'⌁',text:'비 냄새가 좋았다.\n창문을 조금 열어두었다.'},
 {id:12,date:'2026-07-01T10:36:00',type:'spark',icon:'✦',text:'작게 시작하면 계속할 수 있다.\n완벽하게 하려는 마음이 시작을 늦춘다.'}
];
function storageRecordToLog(record){
 const type=record.category||'plain';
 const fallback=demoRecords.find(item=>item.type===type)||demoRecords[0];
 return {id:record.id,date:record.createdAt,type,icon:fallback?.icon||'',text:record.content||record.todos?.map(todo=>todo.text||todo[0]).filter(Boolean).join('\n')||'',todos:record.todos?.map(todo=>Array.isArray(todo)?todo:[todo.text,todo.done])||[],attachments:record.attachments?.length||0};
}
const records=Storage.getAll().map(storageRecordToLog);
const meta={plain:{label:'그냥 툭',color:'#FF8556'},daily:{label:'일상',color:'#38A66B'},worry:{label:'고민',color:'#9877D8'},spark:{label:'문득',color:'#D9A700'},todo:{label:'할 일',color:'#69A8EA'}};
const timeline=document.getElementById('timeline'),emptyResult=document.getElementById('emptyResult'),memoryCard=document.getElementById('memoryCard'),logScreen=document.getElementById('logScreen'),fab=document.getElementById('fab');
let currentFilter='all',currentMonth=6,selectedDay=14,isCalendar=false;
const pad=n=>String(n).padStart(2,'0');
function groupLabel(date){const d=new Date(date);if(d.getDate()===14)return '7월 14일 화요일';if(d.getDate()===13)return '7월 13일 월요일';return `${d.getMonth()+1}월 ${d.getDate()}일`}
function timeLabel(date){return new Date(date).toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'}).replace(' ','')}
function escapeHtml(s=''){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function mediaHtml(r){
 if(r.media==='photo')return '<div class="record-media"><div class="photo-strip"><div class="photo-thumb" aria-label="사진 썸네일"></div></div></div>';
 if(r.media==='photos')return '<div class="record-media"><div class="photo-strip"><div class="photo-thumb"></div><div class="photo-thumb second"></div><div class="photo-thumb second more"></div></div></div>';
 if(r.media==='sketch')return `<div class="record-media"><div class="sketch-thumb" aria-label="손그림 썸네일"><svg viewBox="0 0 100 80"><path d="M9 60c13-27 23-4 36-27 8-14 15 19 26 2 8-12 12 8 20 1"/><path d="M20 18c9 8 15 5 22-2M58 59c8-9 17-11 29-7"/><circle cx="26" cy="37" r="6"/><path d="m67 19 8 7 9-13"/></svg></div></div>`;
 if(r.media==='link')return '<div class="record-media"><div class="link-preview"><span class="link-icon">↗</span><div><strong>기록은 정리보다 보관에 가깝다</strong><span>maumtalk.note</span></div></div></div>';
 return '';
}
function todoHtml(r){const visible=r.todos.slice(0,4);return `<div class="todo-preview">${visible.map(([t,d])=>`<div class="todo-line ${d?'done':''}"><span class="todo-box">${d?'✓':''}</span><span>${escapeHtml(t)}</span></div>`).join('')}${r.todos.length>4?`<span class="todo-more">+${r.todos.length-4}</span>`:''}</div>`}
function attachmentLabel(r){if(r.media==='photo')return '사진 1장';if(r.media==='photos')return `사진 ${r.attachments}장`;if(r.media==='sketch')return '손그림';if(r.media==='link')return '링크';return ''}
function recordHtml(r,mini=false){const m=meta[r.type];if(mini)return `<button class="selected-mini" data-record="${r.id}" type="button"><span class="record-emoji" style="--color:${m.color}">${r.icon}</span><p>${escapeHtml(r.text.split('\n')[0])}</p><time>${timeLabel(r.date)}</time></button>`;
 const hasMedia=!!r.media,clamp=hasMedia?'clamp-3':'clamp-5',needsExpand=!hasMedia&&r.text.split('\n').length>5;
 return `<article class="record-entry" data-record="${r.id}" style="--color:${m.color}">
   <div class="record-topline"><span class="record-emoji">${r.icon}</span>${attachmentLabel(r)?`<span class="attachment-meta">${attachmentLabel(r)}</span>`:''}</div>
   ${r.type==='todo'?todoHtml(r):`<p class="record-text clamped ${clamp}"><span class="record-titleline">${escapeHtml(r.text.split('\n')[0])}</span>${escapeHtml(r.text.split('\n').slice(1).join('\n'))}</p>${mediaHtml(r)}`}
   <div class="record-footer"><time class="record-time">${timeLabel(r.date)}</time>${needsExpand?'<button class="expand-button" type="button">계속 읽기 →</button>':''}</div>
 </article>`}
function renderList(filter=currentFilter,query=''){
 const q=query.trim().toLowerCase();const filtered=records.filter(r=>(filter==='all'||r.type===filter)&&(!q||`${r.text} ${meta[r.type].label}`.toLowerCase().includes(q)));
 timeline.innerHTML='';emptyResult.hidden=filtered.length>0;memoryCard.style.display=(q||filter!=='all'||!records.length)?'none':'';
 const groups=[...new Set(filtered.map(r=>groupLabel(r.date)))];
 groups.forEach(label=>{const items=filtered.filter(r=>groupLabel(r.date)===label);const sec=document.createElement('section');sec.className='day-group';sec.innerHTML=`<div class="day-divider"><div></div><div class="day-copy"><strong>${label}</strong><span>${items.length}개의 툭</span></div><div></div></div><div class="record-list">${items.map(r=>recordHtml(r)).join('')}</div>`;timeline.appendChild(sec)});
 bindRecords(timeline)
}
function bindRecords(root){root.querySelectorAll('.record-entry').forEach(el=>{const btn=el.querySelector('.expand-button');if(btn)btn.onclick=e=>{e.stopPropagation();el.classList.toggle('expanded');btn.textContent=el.classList.contains('expanded')?'접어두기':'계속 읽기 →'};el.onclick=e=>{if(e.target.closest('.expand-button'))return;showToast('상세 이동 없이 이 자리에서 읽는 흐름을 유지해요.')}});root.querySelectorAll('.selected-mini').forEach(el=>el.onclick=()=>showToast('선택한 날짜의 기록이에요.'))}
document.querySelectorAll('.filter-chip').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;renderList()});
logScreen.addEventListener('scroll',()=>fab.classList.toggle('show',logScreen.scrollTop>120),{passive:true});
const listView=document.getElementById('listView'),calendarView=document.getElementById('calendarView'),viewToggleBtn=document.getElementById('viewToggleBtn');viewToggleBtn.onclick=()=>{isCalendar=!isCalendar;viewToggleBtn.classList.toggle('is-calendar',isCalendar);viewToggleBtn.setAttribute('aria-pressed',isCalendar);listView.hidden=isCalendar;calendarView.hidden=!isCalendar;if(isCalendar)renderCalendar()};
const monthNames=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
function renderCalendar(){const year=2026,month=currentMonth,days=new Date(year,month+1,0).getDate(),first=new Date(year,month,1).getDay();document.getElementById('monthTitle').textContent=`${year}년 ${monthNames[month]}`;const monthRecords=records.filter(r=>new Date(r.date).getMonth()===month);document.getElementById('monthSummary').textContent=`이번 달 ${monthRecords.length}개의 툭`;const grid=document.getElementById('calendarGrid');grid.innerHTML='';for(let i=0;i<first;i++){const e=document.createElement('div');e.className='calendar-day empty';grid.appendChild(e)}for(let day=1;day<=days;day++){const ds=monthRecords.filter(r=>new Date(r.date).getDate()===day);const b=document.createElement('button');b.type='button';b.className='calendar-day'+(day===14&&month===6?' today':'')+(day===selectedDay?' selected':'');b.innerHTML=`<span>${day}</span><span class="day-emojis">${[...new Set(ds.map(r=>r.icon))].slice(0,3).join('')}</span>`;b.onclick=()=>{selectedDay=day;renderCalendar()};grid.appendChild(b)}renderSelectedDay()}
function renderSelectedDay(){const ds=records.filter(r=>new Date(r.date).getMonth()===currentMonth&&new Date(r.date).getDate()===selectedDay);const d=new Date(2026,currentMonth,selectedDay),weekday=['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][d.getDay()];document.getElementById('selectedDateTitle').textContent=`${currentMonth+1}월 ${selectedDay}일 ${weekday}`;document.getElementById('selectedDateCount').textContent=`${ds.length}개의 기록`;document.getElementById('selectedDayRecords').innerHTML=ds.length?ds.map(r=>recordHtml(r,true)).join(''):'<p style="margin:18px 0;color:#8A929C;font-size:13px">이 날은 아직 남긴 조각이 없어요.</p>';bindRecords(document.getElementById('selectedDayRecords'))}
document.getElementById('prevMonth').onclick=()=>{currentMonth=Math.max(0,currentMonth-1);selectedDay=1;renderCalendar()};document.getElementById('nextMonth').onclick=()=>{currentMonth=Math.min(11,currentMonth+1);selectedDay=1;renderCalendar()};document.getElementById('showDayList').onclick=()=>{isCalendar=false;viewToggleBtn.classList.remove('is-calendar');listView.hidden=false;calendarView.hidden=true;renderList();showToast(`${currentMonth+1}월 ${selectedDay}일 기록을 목록에서 보여드려요.`)};
const searchLayer=document.getElementById('searchLayer'),searchInput=document.getElementById('searchInput'),searchResults=document.getElementById('searchResults'),recentSearches=document.getElementById('recentSearches'),searchCaption=document.getElementById('searchCaption');document.getElementById('searchBtn').onclick=()=>{searchLayer.classList.add('show');searchLayer.setAttribute('aria-hidden','false');setTimeout(()=>searchInput.focus(),180)};document.getElementById('closeSearch').onclick=closeSearch;function closeSearch(){searchLayer.classList.remove('show');searchLayer.setAttribute('aria-hidden','true');searchInput.value='';searchResults.innerHTML='';recentSearches.hidden=false;searchCaption.textContent='최근 검색'}function renderSearch(q){const term=q.trim().toLowerCase();if(!term){searchResults.innerHTML='';recentSearches.hidden=false;searchCaption.textContent='최근 검색';return}recentSearches.hidden=true;const rs=records.filter(r=>`${r.text} ${meta[r.type].label}`.toLowerCase().includes(term));searchCaption.textContent=`검색 결과 ${rs.length}개`;searchResults.innerHTML=rs.length?rs.map(r=>recordHtml(r)).join(''):'<div class="empty-result"><div class="empty-symbol">⌕</div><strong>찾는 기록이 없어요</strong><p>다른 단어로 다시 찾아보세요.</p></div>';bindRecords(searchResults)}searchInput.oninput=e=>renderSearch(e.target.value);recentSearches.querySelectorAll('button').forEach(b=>b.onclick=()=>{searchInput.value=b.textContent;renderSearch(b.textContent)});
const quickSheet=document.getElementById('quickSheet');fab.onclick=()=>{quickSheet.classList.add('show');quickSheet.setAttribute('aria-hidden','false')};document.getElementById('closeQuickSheet').onclick=closeQuick;quickSheet.onclick=e=>{if(e.target===quickSheet)closeQuick()};function closeQuick(){quickSheet.classList.remove('show');quickSheet.setAttribute('aria-hidden','true')}quickSheet.querySelectorAll('[data-type]').forEach(b=>b.onclick=()=>{const type=b.dataset.type;closeQuick();showToast(`${meta[type].label} 입력 화면으로 연결할 자리예요.`)});
const toast=document.getElementById('toast');let toastTimer;function showToast(msg){clearTimeout(toastTimer);toast.textContent=msg;toast.classList.add('show');toastTimer=setTimeout(()=>toast.classList.remove('show'),1700)}
renderList();
