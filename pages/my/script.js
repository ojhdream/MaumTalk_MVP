const out=document.getElementById('loggedOutCard'),inside=document.getElementById('loggedInCard'),signed=document.querySelectorAll('.signed-only'),provider=document.getElementById('profileProvider'),toast=document.getElementById('toast');let timer;
function showToast(msg){clearTimeout(timer);toast.textContent=msg;toast.classList.add('show');timer=setTimeout(()=>toast.classList.remove('show'),1700)}
function renderStats(){
 const data=Storage.stats();
 const values=document.querySelectorAll('.mini-stats strong');
 if(values[0]) values[0].textContent=`${data.count}개`;
 if(values[1]) values[1].textContent=data.latestAt?new Date(data.latestAt).toLocaleDateString('ko-KR',{month:'numeric',day:'numeric'}):`${data.dateCount}일`;
 const labels=document.querySelectorAll('.mini-stats span');
 if(labels[1]) labels[1].textContent=`기록한 날짜 ${data.dateCount}일`;
}
function login(name){out.hidden=true;inside.hidden=false;signed.forEach(x=>x.hidden=false);provider.textContent=`${name} 계정으로 로그인됨`;showToast(`${name} 로그인 상태를 미리 보여드려요.`)}
function logout(){out.hidden=false;inside.hidden=true;signed.forEach(x=>x.hidden=true);showToast('로그아웃했어요.')}
document.getElementById('kakaoLogin').onclick=()=>login('카카오');
document.getElementById('googleLogin').onclick=()=>login('Google');
document.getElementById('logoutButton').onclick=logout;
document.getElementById('accountManage').onclick=()=>showToast('계정 관리 화면으로 연결할 자리예요.');
document.querySelectorAll('.setting-row:not(#logoutButton)').forEach(btn=>btn.onclick=()=>showToast(`${btn.querySelector('.setting-label')?.textContent||'설정'} 화면으로 연결할 자리예요.`));
renderStats();
