const periodButton = document.getElementById('periodButton');
const periodMenu = document.getElementById('periodMenu');
const periodLabel = document.getElementById('periodLabel');
const selectedTopic = document.getElementById('selectedTopic');

periodButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  const open = periodMenu.classList.toggle('show');
  periodButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.period-option').forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.period-option').forEach((item) => item.classList.remove('active'));
    option.classList.add('active');
    periodLabel.textContent = option.textContent.trim();
    periodMenu.classList.remove('show');
    periodButton.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', () => {
  periodMenu?.classList.remove('show');
  periodButton?.setAttribute('aria-expanded', 'false');
});

const topicCopies = {
  '산책': [
    ['daily','퇴근하고 한 바퀴 걸었다. 생각이 조금 정리됐다.','7월 14일 · 오후 8:41'],
    ['moment','걸을 때는 머릿속에 있던 생각들이 천천히 이어지는 것 같다.','7월 12일 · 오후 6:13'],
    ['daily','엄마와 공원을 천천히 걸었다.','7월 9일 · 오후 5:27']
  ],
  '엄마': [
    ['daily','엄마랑 저녁을 먹고 한참 이야기를 나눴다.','7월 13일 · 오후 7:20'],
    ['plain','엄마가 좋아하는 반찬이 갑자기 떠올랐다.','7월 10일 · 오후 4:18'],
    ['worry','괜히 짧게 말한 게 마음에 남았다.','7월 7일 · 오후 9:02']
  ],
  '커피': [
    ['daily','오늘은 커피가 유난히 맛있었다.','7월 14일 · 오전 10:12'],
    ['plain','집에 가는 길에 원두를 사야겠다.','7월 11일 · 오후 6:04'],
    ['moment','커피를 마실 때 짧게라도 멈추는 시간이 생긴다.','7월 8일 · 오후 2:47']
  ],
  '퇴근': [
    ['daily','퇴근길 하늘이 유난히 맑았다.','7월 14일 · 오후 8:41'],
    ['worry','퇴근 후에도 일 생각이 계속 이어졌다.','7월 10일 · 오후 9:11'],
    ['plain','오늘은 바로 집에 가지 말고 조금 걷자.','7월 5일 · 오후 6:39']
  ]
};

function iconMarkup(type){
  return `<span class="mark-icon"><i class="piece-icon ${type}" aria-hidden="true"></i></span>`;
}

function renderTopic(topic){
  selectedTopic.textContent = topic;
  const list = document.getElementById('relatedList');
  list.innerHTML = topicCopies[topic].map(([type, copy, time]) => `
    <article class="related-item">
      ${iconMarkup(type)}
      <div><p>${copy}</p><time>${time}</time></div>
    </article>`).join('');
}

document.querySelectorAll('.topic-line').forEach((line) => {
  line.addEventListener('click', () => {
    document.querySelectorAll('.topic-line').forEach((item) => item.classList.remove('active'));
    line.classList.add('active');
    renderTopic(line.dataset.topic);
  });
});

const calendarData = [
  {n:29, muted:true},{n:30, muted:true},{n:1,m:['daily']},{n:2,m:['plain','moment']},{n:3},{n:4,m:['worry']},{n:5,m:['todo']},
  {n:6,m:['daily']},{n:7,m:['plain']},{n:8},{n:9,m:['daily','worry']},{n:10},{n:11,m:['moment']},{n:12,m:['daily']},{n:13},
  {n:14,m:['plain','daily'],today:true},{n:15},{n:16,m:['moment']},{n:17},{n:18,m:['daily']},{n:19},{n:20,m:['plain']},
  {n:21},{n:22,m:['daily']},{n:23},{n:24,m:['worry']},{n:25},{n:26,m:['plain','moment']},{n:27},{n:28,m:['daily']},
  {n:29},{n:30,m:['todo']},{n:31},{n:1,muted:true},{n:2,muted:true}
];

document.getElementById('calendarGrid').innerHTML = calendarData.map((day) => {
  const classes = [day.muted?'muted':'', day.today?'today-cell':''].filter(Boolean).join(' ');
  const marks = day.m?.length ? `<span class="day-marks">${day.m.slice(0,2).map((type)=>`<i class="piece-icon ${type}" aria-hidden="true"></i>`).join('')}</span>` : '<span class="day-marks"></span>';
  return `<button class="${classes}" type="button"><span>${day.n}</span>${marks}</button>`;
}).join('');

renderTopic('산책');
