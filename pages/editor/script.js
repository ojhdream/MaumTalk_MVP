const categories = [
  { id:'plain', name:'그냥 툭', color:'#F58A60', soft:'#FFF0EA', icon:'cloud', placeholder:'생각나는 대로 툭, 적어보세요.' },
  { id:'daily', name:'일상', color:'#38A66B', soft:'#EAF6EE', icon:'leaf', placeholder:'오늘 기억하고 싶은 순간을 적어보세요.' },
  { id:'worry', name:'고민', color:'#9479D3', soft:'#F1ECFA', icon:'bubble', placeholder:'마음을 천천히 풀어놓아도 괜찮아요.' },
  { id:'spark', name:'문득', color:'#D7A81A', soft:'#FFF8DA', icon:'spark', placeholder:'스쳐간 생각을 붙잡아 적어보세요.' },
  { id:'todo', name:'할 일', color:'#67A6E8', soft:'#EAF3FD', icon:'check', placeholder:'잊기 전에 하나씩 적어둘까요?' }
];

const icons = {
  cloud:'<svg viewBox="0 0 24 24"><path d="M7.5 18.5h9.2a4.3 4.3 0 0 0 .8-8.5A5.8 5.8 0 0 0 6.3 8.8 4.9 4.9 0 0 0 7.5 18.5Z"/></svg>',
  leaf:'<svg viewBox="0 0 24 24"><path d="M20 4C12.5 4.3 7.3 8 5.4 14.5c-.8 2.8.9 5.6 3.8 5.4 6.9-.5 10.3-7.2 10.8-15.9Z"/><path d="M5.8 18.3c2.6-3.2 5.7-5.8 9.6-7.8"/></svg>',
  bubble:'<svg viewBox="0 0 24 24"><path d="M20 12a7 7 0 0 1-7 7H8l-4 2 1.2-4A7 7 0 1 1 20 12Z"/><path d="M9.2 10.5h.1M14.7 10.5h.1M9 14c1.7 1.3 4.3 1.3 6 0"/></svg>',
  spark:'<svg viewBox="0 0 24 24"><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4Z"/><path d="m18.5 15 .6 2.4 2.4.6-2.4.6-.6 2.4-.6-2.4-2.4-.6 2.4-.6Z"/></svg>',
  check:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5"/><path d="m8.2 12.3 2.5 2.5 5.4-6"/></svg>'
};

const app = document.getElementById('app');
const categoryPill = document.getElementById('categoryPill');
const categoryIcon = categoryPill.querySelector('.category-icon');
const categoryName = categoryPill.querySelector('.category-name');
const categorySheet = document.getElementById('categorySheet');
const categoryList = document.getElementById('categoryList');
const sheetClose = document.getElementById('sheetClose');
const noteInput = document.getElementById('noteInput');
const characterCount = document.getElementById('characterCount');
const standardEditor = document.getElementById('standardEditor');
const todoEditor = document.getElementById('todoEditor');
const mindNameSection = document.getElementById('mindNameSection');
const mindNameToggle = document.getElementById('mindNameToggle');
const mindNameField = document.getElementById('mindNameField');
const plainNoteToggle = document.getElementById('plainNoteToggle');
const todoNote = document.getElementById('todoNote');
const todoList = document.getElementById('todoList');
const addTodoButton = document.getElementById('addTodoButton');
const attachmentPreview = document.getElementById('attachmentPreview');
const toolToast = document.getElementById('toolToast');
let activeCategory = categories[0];
let editRecord = null;

function formatNow(){
  const now = new Date();
  document.getElementById('dateText').textContent = now.toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long'});
  document.getElementById('timeText').textContent = now.toLocaleTimeString('ko-KR',{hour:'numeric',minute:'2-digit'});
}

function setCategory(category){
  activeCategory = category;
  categoryName.textContent = category.name;
  categoryIcon.innerHTML = icons[category.icon];
  categoryPill.style.setProperty('--category-color',category.color);
  categoryPill.style.setProperty('--category-soft',category.soft);
  standardEditor.hidden = category.id === 'todo';
  todoEditor.hidden = category.id !== 'todo';
  mindNameSection.hidden = category.id !== 'worry';
  noteInput.placeholder = category.placeholder;
  if(category.id === 'todo' && todoList.children.length === 0) addTodoRow(true);
  renderCategoryList();
  closeSheet();
}

function renderCategoryList(){
  categoryList.innerHTML = '';
  categories.forEach(category=>{
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-option' + (category.id === activeCategory.id ? ' selected' : '');
    button.style.setProperty('--option-color',category.color);
    button.style.setProperty('--option-soft',category.soft);
    button.innerHTML = `<span class="dot"></span><span>${category.name}</span>`;
    button.addEventListener('click',()=>setCategory(category));
    categoryList.appendChild(button);
  });
}

function openSheet(){
  categorySheet.classList.add('show');
  categorySheet.setAttribute('aria-hidden','false');
}
function closeSheet(){
  categorySheet.classList.remove('show');
  categorySheet.setAttribute('aria-hidden','true');
}
categoryPill.addEventListener('click',openSheet);
sheetClose.addEventListener('click',closeSheet);
categorySheet.addEventListener('click',e=>{if(e.target===categorySheet) closeSheet();});

noteInput.addEventListener('input',()=>{characterCount.textContent = noteInput.value.length.toLocaleString();});

mindNameToggle.addEventListener('click',()=>{
  mindNameField.hidden = !mindNameField.hidden;
  if(!mindNameField.hidden) setTimeout(()=>document.getElementById('mindNameInput').focus(),50);
});

plainNoteToggle.addEventListener('click',()=>{
  todoNote.hidden = !todoNote.hidden;
  plainNoteToggle.textContent = todoNote.hidden ? '메모도 함께 남기기' : '메모 접기';
});

function addTodoRow(focus=false){
  const row = document.createElement('div');
  row.className = 'todo-row';
  row.innerHTML = `<button type="button" class="todo-check" aria-label="완료 표시"></button><input class="todo-input" placeholder="할 일을 적어보세요."/><button type="button" class="todo-remove" aria-label="항목 삭제">×</button>`;
  const check = row.querySelector('.todo-check');
  const input = row.querySelector('.todo-input');
  const remove = row.querySelector('.todo-remove');
  check.addEventListener('click',()=>check.classList.toggle('checked'));
  remove.addEventListener('click',()=>{if(todoList.children.length>1) row.remove();});
  input.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      e.preventDefault();
      addTodoRow(true);
    }
  });
  todoList.appendChild(row);
  if(focus) setTimeout(()=>input.focus(),30);
}
addTodoButton.addEventListener('click',()=>addTodoRow(true));

function showToast(message){
  toolToast.textContent = message;
  toolToast.classList.remove('show');
  void toolToast.offsetWidth;
  toolToast.classList.add('show');
  setTimeout(()=>toolToast.classList.remove('show'),1300);
}

document.querySelectorAll('.tool-button').forEach(button=>{
  button.addEventListener('click',()=>{
    const label = button.querySelector('span').textContent;
    attachmentPreview.innerHTML = `<div class="attachment-chip">${button.querySelector('svg').outerHTML}<span>${label} 도구 자리입니다.</span></div>`;
    showToast(`${label} 도구는 프로토타입 상태예요.`);
  });
});

document.getElementById('saveButton').addEventListener('click',()=>showToast('툭, 남겨지는 흐름만 확인해요.'));
function collectTodos(){
  return Array.from(todoList.querySelectorAll('.todo-row')).map(row=>({
    text: row.querySelector('.todo-input')?.value.trim() || '',
    done: row.querySelector('.todo-check')?.classList.contains('checked') || false
  })).filter(todo=>todo.text);
}

function saveRecord(){
  const todos = activeCategory.id === 'todo' ? collectTodos() : [];
  const content = activeCategory.id === 'todo' ? (todoNote.value.trim() || todos.map(todo=>todo.text).join('\n')) : noteInput.value.trim();
  if(content || todos.length){
    const data = {
      category: activeCategory.id,
      content,
      todos,
      tags: [],
      attachments: attachmentPreview.children.length ? [{ type: 'tool' }] : []
    };
    if(editRecord) Storage.update(editRecord.id,data);
    else Storage.save(data);
    noteInput.value = '';
    todoNote.value = '';
    todoList.innerHTML = '';
    characterCount.textContent = '0';
    if(activeCategory.id === 'todo') addTodoRow(false);
  }
}

document.getElementById('saveButton').addEventListener('click',saveRecord,true);
document.getElementById('backButton').addEventListener('click',()=>{
  if(history.length > 1) history.back();
  else showToast('홈으로 돌아갈 수 있도록 연결해 주세요.');
});

function initialCategory(){
  const params = new URLSearchParams(location.search);
  const requested = params.get('category');
  return categories.find(category=>category.id===requested) || categories[0];
}

function loadEditMode(){
  const id = new URLSearchParams(location.search).get('edit');
  if(!id) return;
  editRecord = Storage.get(id);
  if(!editRecord) return;
  const category = categories.find(item=>item.id===editRecord.category) || categories[0];
  setCategory(category);
  if(category.id === 'todo'){
    todoList.innerHTML = '';
    (editRecord.todos.length ? editRecord.todos : [{text:editRecord.content,done:false}]).forEach((todo)=>{
      addTodoRow(false);
      const row = todoList.lastElementChild;
      row.querySelector('.todo-input').value = todo.text || '';
      if(todo.done) row.querySelector('.todo-check').classList.add('checked');
    });
    todoNote.value = editRecord.content || '';
  } else {
    noteInput.value = editRecord.content || '';
    characterCount.textContent = noteInput.value.length.toLocaleString();
  }
}

formatNow();
renderCategoryList();
setCategory(initialCategory());
loadEditMode();


(function(){
 const footer=document.querySelector('.editor-footer');
 const input=document.getElementById('noteInput');
 if(input && footer){
   input.addEventListener('focus',()=>footer.classList.add('keyboard-open'));
   input.addEventListener('blur',()=>footer.classList.remove('keyboard-open'));
 }
})();
