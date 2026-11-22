'use strict';

const RESCUE_STAGES = [
  {
    name:'花園小徑', guide:5, steps:10, supplies:{'0,2':'food','4,2':'water'},
    map:['S..#..G','.##.#..','...#...','.#.C.#.','...#...','.###.#.','.......'],
    chests:{C:{key:'星星鑰匙', clue:'下一關的門鎖密碼是「星星」。'}},
    objective:'找到寶箱，帶著星星鑰匙前往下一關。'
  },
  {
    name:'星光森林', guide:1, steps:10, supplies:{'2,2':'water','5,4':'food'},
    map:['S...#..','##L##.#','......#','.#.##.#','.#.C..#','.#.#.##','...#..G'],
    gate:{options:['月亮','星星','愛心'], answer:'星星', key:'星星鑰匙'},
    chests:{C:{key:'月亮鑰匙', clue:'下一關的門鎖密碼是「水滴」。'}},
    objective:'用上一關的提示打開森林門，再往深處找寶箱。'
  },
  {
    name:'水滴溪谷', guide:4, steps:16, supplies:{'2,2':'water','6,2':'food'},
    map:['S..#...','##L#.#.','...#.#.','.#...#.','.#.##..','...C##.','.###..G'],
    gate:{options:['水滴','花朵','雲朵'], answer:'水滴', key:'月亮鑰匙'},
    chests:{C:{key:'水滴鑰匙', clue:'下一關的門鎖密碼是「雲朵、星星」。'}},
    objective:'過溪前先補充水，找齊鑰匙與線索。'
  },
  {
    name:'雲朵丘陵', guide:2, steps:9, supplies:{'3,2':'food','6,5':'water'},
    map:['S.L.#..','##..#.#','..#...#','.##.###','....C..','.#####.','......G'],
    gate:{options:['星星、雲朵','愛心、雲朵','雲朵、星星'], answer:'雲朵、星星', key:'水滴鑰匙'},
    chests:{C:{key:'雲朵鑰匙', clue:'最後一關的門鎖密碼是「月亮、愛心」。紫色鑰匙救庫洛米，粉色鑰匙救美樂蒂。'}},
    objective:'在岔路間找寶箱與補給，再前往城堡。'
  },
  {
    name:'雙心城堡', guide:5, steps:20, supplies:{'2,2':'food','2,6':'water','5,6':'food'},
    map:['S.L...#','##.##..','A...#.#','.###...','...#.#K','##.#.#.','B.....M'],
    gate:{options:['愛心、月亮','月亮、愛心','星星、月亮'], answer:'月亮、愛心', key:'月亮鑰匙'},
    chests:{A:{key:'紫色鑰匙', clue:'紫色鑰匙可以救出庫洛米。'},B:{key:'粉色鑰匙', clue:'粉色鑰匙可以救出美樂蒂。'}},
    objective:'找兩個寶箱，分別打開庫洛米和美樂蒂的房門。'
  },
  {
    name:'星光舞台', guide:3, steps:18, supplies:{'1,2':'water','5,2':'food','4,5':'water'},
    map:['S..#...','.##.#.#','...C...','.#.###.','.#...#.','.###.#.','.....HG'],
    chests:{C:{key:'音符鑰匙', clue:'音符鑰匙能打開星光舞台的房門，救出獵魔女團。'}},
    objective:'用音符鑰匙打開舞台房門，救出等待的獵魔女團。'
  },
  {
    name:'彩虹終點站', guide:0, steps:22, supplies:{'1,2':'food','5,2':'water','3,5':'food','6,5':'water'},
    map:['S..#...','.##.#.#','A...#..','.###.##','...#...','.#.###.','D....PB'],
    chests:{A:{key:'雲朵鑰匙', clue:'雲朵鑰匙可以救出大耳狗。'},B:{key:'愛心鑰匙', clue:'愛心鑰匙可以救出愛心萌可。'}},
    objective:'完成最後的兩把鑰匙任務，救出大耳狗與愛心萌可。'
  }
];
const RESCUE_DIRECTIONS = {ArrowUp:[0,-1,'上'],ArrowLeft:[-1,0,'左'],ArrowDown:[0,1,'下'],ArrowRight:[1,0,'右']};
const SUPPLIES={food:{icon:'🍙',name:'飯糰',steps:6},water:{icon:'💧',name:'水',steps:5}};
const RESCUE_FRIENDS={K:{name:'庫洛米',key:'紫色鑰匙'},M:{name:'美樂蒂',key:'粉色鑰匙'},H:{name:'獵魔女團',key:'音符鑰匙'},D:{name:'大耳狗',key:'雲朵鑰匙'},P:{name:'愛心萌可',key:'愛心鑰匙'}};
const RESCUE_FRIEND_STAGE={K:4,M:4,H:5,D:6,P:6};
let rescuePanel = null;
const newRescue = ()=>({edition:5,stage:0,x:0,y:0,keys:[],clues:[],opened:[],gates:[],friends:[],steps:RESCUE_STAGES[0].steps,supplies:[]});

function upgradeRescue(run) {
  if (run.edition===5) return;
  if (run.stage===2) {
    run.stage=4;
    run.opened=run.opened.map(id=>id.startsWith('2')?'4'+id.slice(1):id);
    run.gates=run.gates.map(id=>id===2?4:id);
  } else if (run.opened.includes('1C')) {
    run.clues[1]=RESCUE_STAGES[1].chests.C.clue;
  }
  run.edition=5;
  run.steps=RESCUE_STAGES[run.stage].steps;
  run.supplies=[];
}

function retryRescueStage() {
  const run=state.rescue, stage=RESCUE_STAGES[run.stage];
  const chests=Object.values(stage.chests);
  run.keys=run.keys.filter(key=>!chests.some(chest=>chest.key===key));
  run.clues=run.clues.filter(clue=>!chests.some(chest=>chest.clue===clue));
  run.opened=run.opened.filter(id=>!id.startsWith(String(run.stage)));
  run.gates=run.gates.filter(id=>id!==run.stage);
  run.friends=(run.friends||[]).filter(friend=>RESCUE_FRIEND_STAGE[friend]!==run.stage);
  run.x=0;
  run.y=0;
  run.steps=stage.steps;
  run.supplies=[];
  save();
  renderRescue();
  $('#rescue-feedback').textContent='回到本關起點，補給也已放回原位。';
  $('[data-rescue-direction]')?.focus({preventScroll:true});
}

function rescuePage() {
  const progress = state.rescue;
  rescuePanel = null;
  shell('<section class="rescue-intro"><div><h1>萌可家族救援迷宮</h1><p>走一格用一步。踩到 🍙 飯糰補 6 步，踩到 💧 水補 5 步。找出寶箱與鑰匙，闖過七關救出庫洛米、美樂蒂、獵魔女團、大耳狗與愛心萌可。</p><button class="primary" id="start-rescue">'+(progress && !progress.done ? '繼續救援' : '開始救援')+' →</button></div>'+familySprite(5,'愛心萌可')+'</section><ol class="rescue-route">'+RESCUE_STAGES.map(stage=>'<li>'+stage.name+'</li>').join('')+'</ol>');
  $('#start-rescue').onclick = ()=>{
    if (!state.rescue || state.rescue.done) state.rescue = newRescue();
    else upgradeRescue(state.rescue);
    save();
    renderRescue();
  };
}

function renderRescue() {
  const run = state.rescue, stage = RESCUE_STAGES[run.stage];
  const stageId = run.stage;
  if (!$('#rescue-content')) {
    shell('<section class="rescue-wrap"><div id="rescue-content"></div><p id="rescue-feedback" class="rescue-feedback" role="status"></p><div class="arrows rescue-controls" aria-label="方向控制">'+Object.entries(RESCUE_DIRECTIONS).map(([key,[,,label]],i)=>'<button data-rescue-direction="'+key+'" aria-label="往'+label+'走">'+['↑','←','↓','→'][i]+'</button>').join('')+'</div><div class="game-actions"><button class="secondary" id="rescue-exit">回救援地圖</button></div></section>');
    $$('[data-rescue-direction]').forEach(button=>button.onclick=()=>moveRescue(button.dataset.rescueDirection));
    $('#rescue-exit').onclick=rescuePage;
  }
  const title = '第 '+(stageId+1)+' 關／共 '+RESCUE_STAGES.length+' 關';
  const currentCell=stage.map[run.y][run.x];
  const pendingChest=stage.chests[currentCell] && !run.opened.includes(stageId+currentCell);
  const icons = {S:'🏁',G:'🚪',C:'🧰',A:'🧰',B:'🧰',K:'🔒',M:'🔒',H:'🔒',D:'🔒',P:'🔒',L:'🔐'};
  const names = {S:'起點',G:'出口',C:'寶箱',A:'紫色寶箱',B:'粉色寶箱',K:'庫洛米的房門',M:'美樂蒂的房門',H:'獵魔女團的房門',D:'大耳狗的房門',P:'愛心萌可的房門',L:'密碼門'};
  const cells = stage.map.flatMap((row,y)=>[...row].map((cell,x)=>{
    const player = x===run.x && y===run.y, wall = cell==='#';
    const opened = run.opened.includes(stageId+cell) || (cell==='L' && run.gates.includes(stageId)) || run.friends.includes(cell);
    const supplyId=x+','+y;
    const supply=run.supplies.includes(supplyId)?null:SUPPLIES[stage.supplies[supplyId]];
    const marker = supply?.icon || (opened ? '✓' : icons[cell] || '');
    const label = (player ? '萌可在這裡。' : '') + (wall ? '牆壁' : supply?.name || names[cell] || '小徑') + (opened ? '，已開啟' : '');
    return '<div class="rescue-cell '+(wall?'wall':'')+(player?' player':'')+'" role="img" aria-label="'+label+'">'+(player ? familySprite(stage.guide,'帶路的萌可',true) : marker)+'</div>';
  })).join('');
  $('#rescue-content').innerHTML = '<header class="rescue-heading"><div><small>'+title+'</small><h1>'+stage.name+'</h1><p>'+stage.objective+'</p></div>'+familySprite(stage.guide,'本關領隊萌可')+'</header><div class="rescue-layout"><div class="rescue-board" role="group" aria-label="七乘七迷宮">'+cells+'</div><aside class="rescue-inventory"><h2>背包</h2><p>'+ (run.keys.length ? '🔑 '+run.keys.join('、') : '還沒有鑰匙') +'</p><h2>寶箱線索</h2>'+ (run.clues.length ? '<ul>'+run.clues.map(msg=>'<li>'+esc(msg)+'</li>').join('')+'</ul>' : '<p>踩到寶箱格，再解開寶箱題。</p>') +'<h2>已救出的朋友</h2><p>'+ (run.friends.map(friend=>RESCUE_FRIENDS[friend]?.name||friend).join('、') || '還在等待救援') +'</p></aside></div>';
  const steps=document.createElement('div');
  steps.className='rescue-steps'+(run.steps<=3?' low':'');
  steps.innerHTML='<strong>👣 剩餘 '+run.steps+' 步</strong><span>🍙 ＋6　💧 ＋5</span>';
  $('.rescue-heading').after(steps);
  if (run.steps===0) {
    const retry=document.createElement('button');
    retry.className='primary rescue-retry';
    retry.textContent='步數用完了，重試本關 ↻';
    retry.onclick=retryRescueStage;
    steps.after(retry);
  }
  $$('[data-rescue-direction]').forEach(button=>button.disabled=run.steps===0);
  if (pendingChest) {
    const button=document.createElement('button');
    button.className='secondary';
    button.textContent='🧰 打開腳下的寶箱';
    button.onclick=()=>openRescueChest(currentCell);
    $('#rescue-content').append(button);
  }
}

function moveRescue(key) {
  if (rescuePanel || page!=='rescue' || !$('#rescue-content')) return;
  const run=state.rescue, stage=RESCUE_STAGES[run.stage], [dx,dy]=RESCUE_DIRECTIONS[key];
  if (run.steps<=0) return;
  const x=run.x+dx, y=run.y+dy, cell=stage.map[y]?.[x];
  if (!cell || cell==='#') {
    $('#rescue-feedback').textContent='這裡走不通，換個方向試試。';
    sound('hint');
    return;
  }
  if (cell==='L' && !run.gates.includes(run.stage)) {
    if (!run.keys.includes(stage.gate.key)) return;
    const question = quiz('根據上一關寶箱的提示，選出門鎖密碼。',stage.gate.answer,stage.gate.options);
    question.clue = run.clues.at(-1);
    return rescueQuestion(question, ()=>{
      run.gates.push(run.stage);
      moveRescue(key);
      $('#rescue-feedback').textContent='密碼正確，門開了！';
    });
  }
  if (cell==='G') {
    if (!Object.keys(stage.chests).every(chest=>run.opened.includes(run.stage+chest))) {
      $('#rescue-feedback').textContent='出口需要寶箱裡的鑰匙，先去找寶箱吧。';
      return;
    }
    const friendsHere=[...stage.map.join('')].filter(mark=>RESCUE_FRIENDS[mark]);
    if (!friendsHere.every(friend=>run.friends.includes(friend))) {
      $('#rescue-feedback').textContent='還有朋友在這一關等待救援，先找到對應房門吧。';
      return;
    }
    run.stage++;
    run.x=0;
    run.y=0;
    run.steps=RESCUE_STAGES[run.stage].steps;
    run.supplies=[];
    save();
    renderRescue();
    $('#rescue-feedback').textContent='進入下一關，記得查看背包裡的線索。';
    sound('door');
    return;
  }
  if (RESCUE_FRIENDS[cell]) {
    const required = RESCUE_FRIENDS[cell].key;
    if (!run.keys.includes(required)) {
      $('#rescue-feedback').textContent='這扇門需要'+required+'，先去找對應的寶箱。';
      return;
    }
    if (!run.friends.includes(cell)) {
      run.friends.push(cell);
      if (run.friends.length===Object.keys(RESCUE_FRIENDS).length) {
        run.done=true;
        return finishRescue();
      }
      sound('correct');
    }
  }
  run.x=x;
  run.y=y;
  run.steps--;
  const supplyId=x+','+y;
  const supply=run.supplies.includes(supplyId)?null:SUPPLIES[stage.supplies[supplyId]];
  if (supply) {
    run.supplies.push(supplyId);
    run.steps+=supply.steps;
  }
  save();
  renderRescue();
  $('#rescue-feedback').textContent = supply ? '獲得'+supply.name+'，補了 '+supply.steps+' 步！' : RESCUE_FRIENDS[cell] ? '救出'+RESCUE_FRIENDS[cell].name+'了！' : '';
  sound(supply?'supplies':'step');
  if (stage.chests[cell]) openRescueChest(cell);
}

function openRescueChest(cell) {
  const run=state.rescue, chest=RESCUE_STAGES[run.stage].chests[cell], chestId=run.stage+cell;
  if (rescuePanel || !chest || run.opened.includes(chestId)) return;
  const subject=cell==='A'?'logic':run.stage===1 || run.stage===3?'bopo':'math';
  const mode=cell==='B'?8:7, level=Math.min(state.level,2);
  const question=run.stage===2 ? (Math.random()<.5?lifeTask(3):extraTask('life',3,level))
    : (Math.random()<.5?expansionTask(subject,mode,level):extraTask(subject,mode,level));
  rescueQuestion(question, ()=>{
    sound('chest');
    run.keys.push(chest.key);
    run.clues.push(chest.clue);
    run.opened.push(chestId);
    save();
    renderRescue();
    $('#rescue-feedback').textContent='找到'+chest.key+'！'+chest.clue;
    speak('找到'+chest.key+'！'+chest.clue);
  });
}

function rescueQuestion(task, onCorrect) {
  const trigger = document.activeElement;
  const wrap = document.createElement('div');
  wrap.className='modal-backdrop';
  wrap.innerHTML='<section class="modal rescue-question" role="dialog" aria-modal="true" aria-labelledby="rescue-question-title"><h2 id="rescue-question-title">'+esc(task.q)+'</h2>'+ questionPicture(task,'rescue') +'<div class="options">'+task.options.map((option,i)=>'<button class="answer" data-rescue-answer="'+i+'">'+esc(option)+'</button>').join('')+'</div><p id="rescue-answer-feedback" role="status"></p>'+ (task.clue?'<details><summary>查看背包線索</summary><p>'+esc(task.clue)+'</p></details>':'') +'<div class="game-actions"><button class="secondary" id="rescue-read">♬ 聽題目</button><button class="secondary" id="rescue-cancel">先回迷宮</button></div></section>';
  rescuePanel=wrap;
  document.body.append(wrap);
  function close() {
    stopVoice();
    wrap.remove();
    rescuePanel=null;
    document.removeEventListener('keydown', keys);
    trigger?.focus({preventScroll:true});
  }
  function keys(event) {
    if (event.key==='Escape') close();
    if (event.key!=='Tab') return;
    const controls=[...wrap.querySelectorAll('button,summary')], first=controls[0], last=controls.at(-1);
    if (event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
    if (!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
  }
  document.addEventListener('keydown',keys);
  const read = ()=>speak(task.speech ? task.q+'。'+task.speech : task.q, task.lang||'zh-TW', true, .75);
  $('#rescue-read').onclick=read;
  $('#rescue-cancel').onclick=close;
  $$('[data-rescue-answer]').forEach(button=>button.onclick=()=>{
    if (task.options[+button.dataset.rescueAnswer]!==task.answer) {
      sound('hint');
      $('#rescue-answer-feedback').textContent=task.hint||'再看一下背包裡的線索。';
      return;
    }
    close();
    sound('correct');
    onCorrect();
  });
  wrap.querySelector('button').focus();
  if (state.voice) read();
}

function finishRescue() {
  state.sessions++;
  awardStickerTurn();
  save();
  celebrationPage('救援成功！', '庫洛米、美樂蒂、獵魔女團、大耳狗和愛心萌可都平安回來了！', true);
}

document.addEventListener('keydown',event=>{
  if (page!=='rescue' || $('.modal-backdrop') || !$('#rescue-content') || !RESCUE_DIRECTIONS[event.key] || event.altKey || event.ctrlKey || event.metaKey) return;
  event.preventDefault();
  moveRescue(event.key);
});
