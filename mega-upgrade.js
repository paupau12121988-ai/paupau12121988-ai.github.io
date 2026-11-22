'use strict';

/* 第七版：加深題庫、收藏、桌遊、畫廊與救援的獨立擴充。 */
if (!LEVELS.includes('大師推理')) LEVELS.push('大師推理');

const upgradeOriginalPracticeTask=practiceTask;
const upgradeOriginalStartGame=startGame;
const upgradeOriginalRenderGame=renderGame;
const upgradeOriginalWorldPage=worldPage;
const upgradeOriginalArcadePage=arcadePage;
const upgradeOriginalRescuePage=rescuePage;
const upgradeOriginalRenderRescue=renderRescue;
const upgradeOriginalDrawingSurface=drawingSurface;
const upgradeOriginalPaintShape=paintShape;
let upgradeRound=0;

const UPGRADE_BOPO_WORDS=[
  ['熊貓','ㄒㄩㄥˊ ㄇㄠ','🐼'],['番茄','ㄈㄢ ㄑㄧㄝˊ','🍅'],['雨衣','ㄩˇ ㄧ','🧥'],['松鼠','ㄙㄨㄥ ㄕㄨˇ','🐿️'],['燈籠','ㄉㄥ ㄌㄨㄥˊ','🏮'],['海邊','ㄏㄞˇ ㄅㄧㄢ','🏖️'],
  ['鉛筆盒','ㄑㄧㄢ ㄅㄧˇ ㄏㄜˊ','✏️'],['櫻桃','ㄧㄥ ㄊㄠˊ','🍒'],['蝸牛','ㄍㄨㄛ ㄋㄧㄡˊ','🐌'],['雪人','ㄒㄩㄝˇ ㄖㄣˊ','⛄'],['郵差','ㄧㄡˊ ㄔㄞ','📮'],['窗戶','ㄔㄨㄤ ㄏㄨˋ','🪟'],
  ['爺爺','ㄧㄝˊ ˙ㄧㄝ','👴'],['餅乾','ㄅㄧㄥˇ ㄍㄢ','🍪'],['彩虹','ㄘㄞˇ ㄏㄨㄥˊ','🌈'],['飛船','ㄈㄟ ㄔㄨㄢˊ','🚀'],['操場','ㄘㄠ ㄔㄤˇ','🏃'],['故事書','ㄍㄨˋ ㄕˋ ㄕㄨ','📚'],
  ['牙刷','ㄧㄚˊ ㄕㄨㄚ','🪥'],['熱氣球','ㄖㄜˋ ㄑㄧˋ ㄑㄧㄡˊ','🎈'],['冰淇淋','ㄅㄧㄥ ㄑㄧˊ ㄌㄧㄣˊ','🍦'],['斑馬線','ㄅㄢ ㄇㄚˇ ㄒㄧㄢˋ','🚸'],['長頸鹿','ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ','🦒'],['博物館','ㄅㄛˊ ㄨˋ ㄍㄨㄢˇ','🏛️'],
  ['企鵝','ㄑㄧˋ ㄜˊ','🐧'],['洗手台','ㄒㄧˇ ㄕㄡˇ ㄊㄞˊ','🚰'],['積木','ㄐㄧ ㄇㄨˋ','🧱'],['鳳梨','ㄈㄥˋ ㄌㄧˊ','🍍'],['蜘蛛網','ㄓ ㄓㄨ ㄨㄤˇ','🕸️'],['望遠鏡','ㄨㄤˋ ㄩㄢˇ ㄐㄧㄥˋ','🔭']
];
const UPGRADE_LOGIC_SHAPES=['🍎','🌙','⭐','🟦','🦋','🍀'];

function upgradeMathTask(mode,level,serial) {
  const hard=level===4, a=hard?6+serial%7:2+serial%6, b=hard?3+(serial*2)%6:2+(serial*3)%5, c=1+serial%5;
  const title='數學挑戰 '+(serial+1)+'／30：';
  if(mode%3===0) {
    const answer=hard?a*b+c*a:a*b;
    return challengeNumber(title+(hard?'每袋有 '+a+' 顆果實，買 '+b+' 袋後又多送 '+c+' 袋的一半（'+a+' 顆），共有幾顆？':'有 '+b+' 組，每組 '+a+' 個點心，共有幾個？'),answer,level,{visual:'🍓 📦',smallVisual:true,explain:hard?a+' × '+b+' ＋ '+a+' ＝ '+answer:a+' × '+b+' ＝ '+answer,hint:'先算每一組，再把額外得到的數量加上。'});
  }
  if(mode%3===1) {
    const total=a*b+c;
    return challengeNumber(title+'把 '+total+' 顆彈珠每 '+b+' 顆裝一袋，可以裝滿幾袋？還會剩幾顆？請輸入「能裝滿的袋數」。',a,level,{visual:'🔵 🛍️',smallVisual:true,explain:total+' ÷ '+b+' ＝ '+a+' … '+c,hint:'先想 '+b+' 的倍數，不能裝滿的留在最後。'});
  }
  const paid=a*b+10, change=hard?paid-(a*b-c):10+c;
  return challengeNumber(title+'買 '+b+' 份小點心，每份 '+a+' 元。拿 '+paid+' 元付款，找回多少元？',change,level,{visual:'🧁 🪙',smallVisual:true,explain:paid+' − ('+a+' × '+b+') ＝ '+change,hint:'先算總價，再用付款金額減掉總價。'});
}

function upgradeBopoTask(level,serial) {
  const word=UPGRADE_BOPO_WORDS[serial], options=UPGRADE_BOPO_WORDS.filter((_,i)=>i!==serial).filter((_,i)=>i%5===serial%5).slice(0,3).map(row=>row[1]);
  return quiz('注音拼讀 '+(serial+1)+'／30：看圖選出「'+word[0]+'」的完整注音。',word[1],options,{visual:word[2],smallVisual:true,speech:word[0],hint:'慢慢念出每個字，注意聲調符號。',explain:'「'+word[0]+'」讀作 '+word[1]+'。'});
}

function upgradeLogicTask(level,serial) {
  const seq=Array.from({length:4},(_,i)=>UPGRADE_LOGIC_SHAPES[(serial+i*(serial%2?2:1))%UPGRADE_LOGIC_SHAPES.length]);
  const shown=Array.from({length:6},(_,i)=>seq[i%seq.length]);
  const answer=seq[6%seq.length];
  return quiz('邏輯規律 '+(serial+1)+'／30：下一個圖案是什麼？',answer,UPGRADE_LOGIC_SHAPES.filter(x=>x!==answer),{visual:shown.join(' '),smallVisual:true,hint:'從第一個開始，找出固定重複的一組圖案。',explain:'重複的一組是 '+seq.join(' → ')+'。'});
}

practiceTask=function(world,mode,index) {
  const serial=((game?.upgradeRound??upgradeRound)+index)%30;
  if(world==='math') return upgradeMathTask(mode,state.level,serial);
  if(world==='bopo') return upgradeBopoTask(state.level,serial);
  if(world==='logic') return upgradeLogicTask(state.level,serial);
  return upgradeOriginalPracticeTask(world,mode,index);
};
startGame=function(w,m,daily=null) {
  upgradeRound=(upgradeRound+1)%30;
  upgradeOriginalStartGame(w,m,daily);
  if(game) game.upgradeRound=upgradeRound;
};

function hunterSprite(frame=0,label='獵魔女團') {
  return '<span class="hunter-sprite hunter-'+(frame%3)+'" role="img" aria-label="'+esc(label)+'"><i></i><i></i><i></i></span>';
}
function hunterCompanion(line='獵魔女團在旁邊替你加油！') {
  return '<aside class="hunter-companion">'+hunterSprite(upgradeRound,'卡通獵魔女團')+'<p><b>獵魔女團任務夥伴</b><br>'+esc(line)+'</p></aside>';
}
renderGame=function() {
  upgradeOriginalRenderGame();
  $('.helper')?.insertAdjacentHTML('afterend',hunterCompanion('找線索、慢慢想，一起守護學習樂園！'));
};
worldPage=function() {
  upgradeOriginalWorldPage();
  $('.notice')?.insertAdjacentHTML('beforeend','<br>🛡️ 每個程度都有輪替題庫；數學、注音與邏輯各有 30 題不重複的核心挑戰，第五級加入多步驟推理。');
};

const UPGRADE_STICKER_SPECS=[
  ['kuromi','庫洛米','月影甜點隊','夜光馬卡龍、星星魔杖、黑莓蛋糕、月亮風箏、神祕信封、搖滾耳機、午夜南瓜、蝙蝠披風、紫晶手鍊、星雲旅行箱'],
  ['melody','美樂蒂','草莓朋友會','草莓花籃、櫻花野餐、粉紅雨鞋、愛心茶壺、毛線圍巾、甜甜圈、花園小鏟、月光睡帽、彩帶禮盒、兔耳帽'],
  ['dog','大耳狗','雲朵烘焙隊','雲朵吐司、藍莓塔、星星圍裙、天空郵件、牛奶杯、彩虹餐車、麵包帽、泡泡浴、月亮燈、小小飛機'],
  ['ping','萌可家族','愛心魔法小隊','愛心相框、彩虹藥水、花朵魔杖、雲端日記、閃亮髮夾、幸運四葉草、星星提燈、甜點車、友誼手鍊、花園寶箱'],
  ['hunters','獵魔女團','守護樂園隊','音符護盾、星光麥克風、月牙吉他、彩色耳機、閃電鼓棒、守護徽章、舞台燈、勇氣披風、魔法唱片、彩虹應援棒']
];
UPGRADE_STICKER_SPECS.forEach(([category,character,series,names])=>names.split('、').forEach((name,i)=>{
  const full=character+'・'+name;
  if(!STICKERS.some(item=>item.name===full)) STICKERS.push({name:full,frame:i%12,series,tier:3+(i%2),upgrade:true,hunter:category==='hunters',category,subgroup:category==='kuromi'?'月影甜點隊':category==='ping'?'愛心魔法小隊':series,dog:category==='dog',family:category==='ping'||category==='melody'});
}));

const upgradeOriginalRewardSticker=rewardSticker;
const upgradeOriginalStickerCategory=stickerCategory;
rewardSticker=function(item) {
  if(item.hunter) return hunterSprite(item.frame,item.name);
  return upgradeOriginalRewardSticker(item);
};
stickerCategory=function(item) { return item.hunter?'hunters':item.category||upgradeOriginalStickerCategory(item); };
const UPGRADE_COLLECTION_PACKS=[...SCENE_PACKS,{id:'hunters',character:'卡通獵魔女團',name:'守護樂園舞台'}];

function upgradePoster(scene,index) {
  if(scene.id==='hunters') return '<div class="hunters-poster" role="img" aria-label="卡通獵魔女團收藏大圖">'+hunterSprite(0,'獵魔女團成員')+hunterSprite(1,'獵魔女團成員')+hunterSprite(2,'獵魔女團成員')+'<b>守護樂園演唱會</b></div>';
  return sceneArt(index,scene.character+'收藏大圖').replace('scene-art','scene-art award-scene');
}
paintStickerBook=function() {
  const book=$('#sticker-book'); if(!book) return;
  $('#sticker-count').textContent=state.stickers.length+'／'+STICKERS.length;
  book.innerHTML=UPGRADE_COLLECTION_PACKS.map((scene,sceneIndex)=>{
    const cards=STICKERS.map((item,i)=>({item,i})).filter(({item})=>stickerCategory(item)===scene.id);
    const collected=cards.filter(({i})=>state.stickers.includes(i)).length, complete=collected===cards.length;
    const groups=cards.reduce((all,card)=>{const key=card.item.subgroup||card.item.series||'冒險篇';(all[key]??=[]).push(card);return all;},{});
    const groupHTML=Object.entries(groups).map(([name,items])=>'<section class="sticker-subgroup"><h3>'+esc(name)+' <small>'+items.filter(({i})=>state.stickers.includes(i)).length+'／'+items.length+'</small></h3><div class="sticker-grid character-grid">'+items.map(({item,i})=>state.stickers.includes(i)?'<article class="sticker character-card tier-'+item.tier+'">'+rewardSticker(item)+'<b>'+esc(item.name)+'</b><small>'+esc(item.series)+'</small></article>':'<div class="sticker character-card locked" aria-label="尚未收藏的角色牌"><span class="locked-character" aria-hidden="true">?</span><small>'+esc(item.series)+' · 待收藏</small></div>').join('')+'</div></section>').join('');
    const prize=complete?'<details class="set-poster"><summary>✦ 查看隱藏收藏大圖</summary>'+upgradePoster(scene,sceneIndex)+'</details>':'<p class="locked-poster">🔒 再收集 '+(cards.length-collected)+' 張，解鎖這個主題的隱藏大圖。</p>';
    return '<section class="sticker-set" id="set-'+scene.id+'"><header><h2>'+scene.character+'</h2><span>'+collected+'／'+cards.length+' 張'+(complete?' · 已集滿':'')+'</span></header>'+prize+groupHTML+'</section>';
  }).join('');
  $$('.set-poster').forEach(details=>details.ontoggle=()=>{if(details.open)sound('unlock');});
};
collectionPage=function() {
  shell('<section class="welcome"><div><h1>角色貼紙收藏</h1><p>已收藏 <strong id="sticker-count"></strong> 張；收滿一個主題可翻開隱藏大圖。</p></div>'+hunterSprite(0,'卡通獵魔女團')+'</section><section id="reward-board" class="reward-box reward-board">'+rewardBoard()+'</section><nav class="collection-jumps" aria-label="收藏分類">'+UPGRADE_COLLECTION_PACKS.map(scene=>'<a href="#set-'+scene.id+'">'+scene.character+'</a>').join('')+'</nav><div id="sticker-book"></div>');
  bindRewards(); paintStickerBook();
};

const UPGRADE_COPY_PATTERNS=[
  ['草莓小屋','🍓🏠','用圓形畫草莓窗戶，再畫三角形屋頂。'],['睡覺小熊','🐻🌙','用圓形畫耳朵和月亮，替小熊加被子。'],['花朵盆栽','🌷🪴','先畫長方形花盆，再用花朵工具種花。'],['彩虹熱氣球','🌈🎈','用橢圓畫氣球，下面加小小籃子。'],['海底小魚','🐠🫧','用橢圓當身體，三角形當尾巴。'],
  ['太陽獅子','☀️🦁','用圓形畫臉，四周加上鬃毛線條。'],['森林小狐狸','🦊🌲','用三角形耳朵和愛心鼻子完成狐狸。'],['雪人朋友','⛄🧣','用三個不同大小圓形堆出雪人。'],['星星獨角獸','🦄⭐','用圓形、三角形和星星畫出側臉。'],['蛋糕派對','🎂🎉','用長方形堆出蛋糕層，再加蠟燭。'],
  ['小小恐龍','🦕🌿','用橢圓身體、三角背刺和長尾巴。'],['雲端飛船','☁️🚀','用雲朵和圓角長方形組出飛船。'],['愛心冰淇淋','🍦💗','畫三角形甜筒，疊上愛心冰淇淋。'],['夜空貓咪','🐱✨','用三角耳朵、月牙和星星畫夜景。'],['西瓜野餐','🍉🧺','用半圓西瓜和方格野餐墊。'],
  ['魔法城堡','🏰🪄','用長方形城牆、三角塔頂和星星。'],['大海章魚','🐙🌊','先畫圓頭，再用波浪線畫八隻腳。'],['生日禮物','🎁🎀','用正方形禮盒和蝴蝶結裝飾。'],['小火車','🚂💨','用長方形車廂和圓形車輪。'],['花園蝴蝶','🦋🌸','用四片愛心當翅膀，中心畫身體。']
].map(([name,emoji,steps],i)=>({name,emoji,steps,frame:i%6,reference:true}));
UPGRADE_COPY_PATTERNS.forEach(pattern=>{if(!COPY_PATTERNS.some(old=>old.name===pattern.name)){COPY_PATTERNS.push(pattern);WORLDS.find(world=>world.id==='art').modes.push('照圖畫：'+pattern.name);}});
MORE_DRAWING.push(...UPGRADE_COPY_PATTERNS.map(pattern=>['照著 '+pattern.name+' 畫，再加上一個自己想出的故事角色。','用兩種不同筆刷完成 '+pattern.name+'，比較線條的感覺。']));
DRAW_TOOLS.push(['watercolor','水彩暈染'],['marker','麥克筆'],['spray','噴點'],['rainbow','彩虹'],['leaf','葉子'],['butterfly','蝴蝶'],['sparkle','閃亮'],['smiley','笑臉']);
drawingSurface=function(pattern) {
  if(pattern?.reference) return '<div class="copy-workspace"><figure class="copy-reference copy-reference-emoji"><div class="copy-emoji">'+pattern.emoji+'</div><figcaption><strong>'+esc(pattern.name)+'</strong><p>'+esc(pattern.steps)+'</p></figcaption></figure><div class="canvas-wrap"><canvas id="drawing" width="840" height="480" aria-label="繪圖畫布；使用滑鼠、觸控筆或手指繪畫"></canvas></div></div>';
  return upgradeOriginalDrawingSurface(pattern);
};
paintShape=function(ctx,tool,x,y,r,color) {
  if(['rainbow','leaf','butterfly','sparkle','smiley'].includes(tool)) {
    ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=Math.max(2,r*.16);ctx.lineCap='round';
    if(tool==='rainbow'){for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(x,y+r*.55,r*(1-i*.18),Math.PI,Math.PI*2);ctx.strokeStyle=['#ef899c','#f0bc59','#83b889','#6daed0'][i];ctx.stroke();}}
    if(tool==='leaf'){ctx.beginPath();ctx.ellipse(x,y,r*.55,r,Math.PI/4,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff8';ctx.beginPath();ctx.moveTo(x-r*.42,y+r*.45);ctx.lineTo(x+r*.42,y-r*.45);ctx.stroke();}
    if(tool==='butterfly'){ctx.beginPath();ctx.ellipse(x-r*.42,y-r*.22,r*.42,r*.6,-.45,0,Math.PI*2);ctx.ellipse(x+r*.42,y-r*.22,r*.42,r*.6,.45,0,Math.PI*2);ctx.fill();ctx.fillStyle='#4c4058';ctx.fillRect(x-r*.06,y-r*.55,r*.12,r*1.1);}
    if(tool==='sparkle'){ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.25:r;ctx.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr);}ctx.closePath();ctx.fill();}
    if(tool==='smiley'){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();ctx.fillStyle=color;ctx.beginPath();ctx.arc(x-r*.35,y-r*.2,r*.1,0,7);ctx.arc(x+r*.35,y-r*.2,r*.1,0,7);ctx.fill();ctx.beginPath();ctx.arc(x,y+r*.05,r*.46,0,Math.PI);ctx.stroke();}
    ctx.restore();return;
  }
  upgradeOriginalPaintShape(ctx,tool,x,y,r,color);
};

renderArt=function() {
  const t=game.task, colors=[['#5c4968','深紫'],['#ae83c4','淺紫'],['#e6a0b6','粉紅'],['#dc8d6e','橘色'],['#e8bd55','黃色'],['#76a68e','綠色'],['#79a8c4','藍色'],['#65b9b4','湖水綠'],['#ff8ca3','莓果紅'],['#ffffff','白色']];
  $('#interaction').innerHTML='<div class="art-toolbar" aria-label="顏色選擇">'+colors.map(([c,n],i)=>'<button class="swatch '+(i===0?'chosen':'')+'" data-color="'+c+'" style="background:'+c+'" aria-label="'+n+'"></button>').join('')+'<label class="brush-label">筆粗 <input id="brush-size" aria-label="畫筆粗細" type="range" min="2" max="32" value="7"></label></div><div class="art-toolbar art-tools-wide">'+DRAW_TOOLS.map(([id,label])=>'<button class="art-tool '+(id===(t.mode===3||t.pattern?'circle':'pen')?'chosen':'')+'" data-art-tool="'+id+'">'+label+'</button>').join('')+'<button class="art-tool" id="undo-art">復原 ↶</button><button class="art-tool" id="clear-art">清空</button></div>'+drawingSurface(t.pattern)+'<div class="game-actions"><button class="secondary" id="save-art">儲存到畫廊</button><button class="primary" id="finish-art">完成我的創作 ✓</button></div><p class="art-help">水彩暈染會疊出透明顏色；噴點與印章適合替作品加小細節。</p>';
  const canvas=$('#drawing'),ctx=canvas.getContext('2d');let color='#5c4968',tool=(t.mode===3||t.pattern)?'circle':'pen',size=7,drawing=false,last,changed=false;const history=[];
  ctx.fillStyle='#fff';ctx.fillRect(0,0,840,480);
  function snap(){history.push(ctx.getImageData(0,0,840,480));if(history.length>18)history.shift();}
  function point(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*840,y:(e.clientY-r.top)/r.height*480};}
  function drawLine(a,b,mirror=false){const ax=mirror?840-a.x:a.x,bx=mirror?840-b.x:b.x;if(tool==='spray'){ctx.fillStyle=color;ctx.globalAlpha=.5;for(let i=0;i<20;i++){const x=bx+(Math.random()-.5)*size*3,y=b.y+(Math.random()-.5)*size*3;ctx.fillRect(x,y,1.5,1.5);}ctx.globalAlpha=1;return;} if(tool==='watercolor'){ctx.save();ctx.globalAlpha=.09;for(let i=0;i<5;i++){const g=ctx.createRadialGradient(bx+(Math.random()-.5)*size,b.y+(Math.random()-.5)*size,1,bx,b.y,size*3);g.addColorStop(0,color);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(bx,b.y,size*3,0,7);ctx.fill();}ctx.restore();return;}ctx.strokeStyle=tool==='eraser'?'#fff':color;ctx.lineWidth=tool==='marker'?size*2.1:tool==='crayon'?size*1.35:tool==='eraser'?size*4:size;ctx.globalAlpha=tool==='marker'?.72:1;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(ax,a.y);ctx.lineTo(bx,b.y);ctx.stroke();ctx.globalAlpha=1;}
  function stamp(p,mirror=false){paintShape(ctx,tool,mirror?840-p.x:p.x,p.y,size*3+12,color);}
  const continuous=()=>['pen','eraser','watercolor','marker','spray','crayon'].includes(tool);
  canvas.onpointerdown=e=>{if(game.answered)return;e.preventDefault();canvas.setPointerCapture(e.pointerId);snap();changed=true;game.artSaved=false;drawing=true;last=point(e);if(continuous()){drawLine(last,{x:last.x+.1,y:last.y+.1});if(t.mode===2)drawLine(last,{x:last.x+.1,y:last.y+.1},true);}else{stamp(last);if(t.mode===2)stamp(last,true);}};
  canvas.onpointermove=e=>{if(!drawing||!continuous())return;const p=point(e);drawLine(last,p);if(t.mode===2)drawLine(last,p,true);last=p;};canvas.onpointerup=canvas.onpointercancel=()=>drawing=false;
  $$('[data-color]').forEach(b=>b.onclick=()=>{color=b.dataset.color;$$('[data-color]').forEach(x=>x.classList.toggle('chosen',x===b));});$$('[data-art-tool]').forEach(b=>b.onclick=()=>{tool=b.dataset.artTool;$$('[data-art-tool]').forEach(x=>x.classList.toggle('chosen',x===b));});$('#brush-size').oninput=e=>size=+e.target.value;
  $('#undo-art').onclick=()=>{if(history.length){ctx.putImageData(history.pop(),0,0);game.artSaved=false;}};$('#clear-art').onclick=()=>{snap();ctx.fillStyle='#fff';ctx.fillRect(0,0,840,480);changed=false;game.artSaved=false;};
  function saveDrawing(){if(game.artSaved)return true;if(!changed){toast('先在畫布上留下你的創意吧！');return false;}if(state.drawings.length>=36){toast('畫廊已滿（36 幅），請先下載作品。');return false;}state.drawings.unshift({url:canvas.toDataURL('image/png'),title:WORLDS.find(w=>w.id==='art').modes[t.mode],date:localDate()});game.artSaved=true;save();toast('作品已加入創作畫廊！');return true;}
  $('#save-art').onclick=()=>saveDrawing();$('#finish-art').onclick=()=>{if(!saveDrawing())return;addStat('attempts');finishTask('作品已儲存。水彩、噴點和印章都能畫出不同的故事。');canvas.style.pointerEvents='none';};
};

rescuePage=function(){upgradeOriginalRescuePage();$('.rescue-intro')?.insertAdjacentHTML('beforeend',hunterCompanion('獵魔女團已加入救援隊，等你一起找到所有朋友！'));};
renderRescue=function(){upgradeOriginalRenderRescue();$('#rescue-content')?.insertAdjacentHTML('beforeend',hunterCompanion('救援隊在遠方守望，注意寶箱線索與剩餘步數。'));};

Object.assign(BOARD_GAMES,{
  checkers:{name:'小小跳棋',description:'斜著走、跳過對手的棋子，先讓對方沒有棋子就贏。',icon:'🔴'},
  snakes:{name:'蛇棋與梯子',description:'擲骰子前進，爬梯子、避開滑下去的蛇。',icon:'🐍'},
  tictactoe:{name:'井字圈圈叉叉',description:'先在橫、直或斜線連成三個記號就贏。',icon:'⭕'},
  raft:{name:'動物泛舟',description:'和動物夥伴划過河灣，補給與順流會改變旅程。',icon:'🛶'},
  colorpath:{name:'彩色小徑賽',description:'擲骰前進，走到同色格可以再走一步。',icon:'🎨'},
  treasuretrail:{name:'寶箱數字路',description:'走到寶箱答一個小數字題，答對就得到加速。',icon:'🗺️'},
  shapehop:{name:'形狀跳跳棋',description:'找到指定形狀，跳到下一個安全石頭。',icon:'🔺'},
  weatherway:{name:'天氣準備賽',description:'看天氣選適合的用品，準備好就能向前。',icon:'🌦️'},
  animalmemory:{name:'動物記憶桌遊',description:'翻開牌卡，找出相同動物好朋友。',icon:'🐾'}
});
const upgradeOriginalBeginMatch=beginMatch;
let upgradeMini=null, upgradeMiniTimer;
beginMatch=function(kind,computer) {
  if(kind==='gomoku'||kind==='go') return upgradeOriginalBeginMatch(kind,computer);
  clearTimeout(upgradeMiniTimer);
  if(kind==='checkers') {
    const board=Array(64).fill(0);
    for(let y=0;y<3;y++)for(let x=0;x<8;x++)if((x+y)%2)board[y*8+x]=1;
    for(let y=5;y<8;y++)for(let x=0;x<8;x++)if((x+y)%2)board[y*8+x]=2;
    upgradeMini={kind,computer,board,turn:1,selected:null,result:'',notice:''};
  } else if(kind==='tictactoe') upgradeMini={kind,computer,board:Array(9).fill(''),turn:'X',result:'',notice:''};
  else if(kind==='animalmemory') upgradeMini={kind,computer,deck:shuffle(['🐶','🐱','🐰','🐼','🦊','🐸'].flatMap(x=>[x,x])),open:[],matched:[],result:'',notice:''};
  else upgradeMini={kind,computer,positions:[0,0],turn:0,result:'',notice:'擲骰子，和朋友一起出發！',lastRoll:0,round:0};
  page='boardgame'; upgradeMiniPage(); window.scrollTo({top:0,behavior:'instant'});
};

function upgradeMiniFinish(message) {
  upgradeMini.result=message; state.sessions++; awardStickerTurn(); save(); sound('win'); if(state.motion)confetti();
}
function upgradeMiniHeader() {
  const info=BOARD_GAMES[upgradeMini.kind];
  return '<button class="back" id="mini-back">← 棋類與拼圖</button><h1>'+info.icon+' '+info.name+'</h1><p>'+info.description+'</p><div class="board-status" role="status">'+esc(upgradeMini.result||upgradeMini.notice||'輪到玩家 '+(upgradeMini.turn+1||upgradeMini.turn))+'</div>';
}
function upgradeMiniPage() {
  const g=upgradeMini; if(!g)return;
  let play='';
  if(g.kind==='checkers') play=upgradeCheckersHTML(g);
  else if(g.kind==='tictactoe') play=upgradeTicHTML(g);
  else if(g.kind==='animalmemory') play=upgradeMemoryHTML(g);
  else play=upgradeRaceHTML(g);
  shell('<section class="activity-page mini-board-page">'+upgradeMiniHeader()+play+(g.result?'<section class="reward-box reward-board"><div id="reward-board">'+rewardBoard()+'</div></section>':'')+'<div class="game-actions"><button class="secondary" id="mini-restart">重新開局</button></div>'+hunterCompanion('獵魔女團在桌遊旁擔任規則小隊長！')+'</section>','arcade');
  $('#mini-back').onclick=()=>navigate('arcade');$('#mini-restart').onclick=()=>beginMatch(g.kind,g.computer);
  if(g.result){bindRewards();return;}
  if(g.kind==='checkers')$$('[data-mini-square]').forEach(b=>b.onclick=()=>upgradeCheckersClick(+b.dataset.miniSquare));
  else if(g.kind==='tictactoe')$$('[data-mini-ttt]').forEach(b=>b.onclick=()=>upgradeTicClick(+b.dataset.miniTtt));
  else if(g.kind==='animalmemory')$$('[data-mini-card]').forEach(b=>b.onclick=()=>upgradeMemoryClick(+b.dataset.miniCard));
  else $('#mini-roll').onclick=upgradeRaceRoll;
}
function upgradeCheckersHTML(g) {
  return '<div class="checkers-board" aria-label="小小跳棋棋盤">'+g.board.map((piece,i)=>'<button class="checkers-cell '+((i%8+Math.floor(i/8))%2?'dark':'light')+' '+(g.selected===i?'selected':'')+'" data-mini-square="'+i+'" '+(g.result?'disabled':'')+' aria-label="第 '+(Math.floor(i/8)+1)+' 行第 '+(i%8+1)+' 列">'+(piece?'<i class="checker checker-'+(piece%10===1?'red':'blue')+' '+(piece>2?'king':'')+'">'+(piece>2?'♛':'')+'</i>':'')+'</button>').join('')+'</div><p class="mini-rule">紅色先走。點自己的棋子，再點斜前方空格；跳過對手可以吃掉一顆。</p>';
}
function upgradeCheckerMoves(board,index) {
  const piece=board[index],color=piece%10,king=piece>2,x=index%8,y=Math.floor(index/8),dirs=king?[[-1,-1],[1,-1],[-1,1],[1,1]]:color===1?[[-1,1],[1,1]]:[[-1,-1],[1,-1]],moves=[];
  dirs.forEach(([dx,dy])=>{const nx=x+dx,ny=y+dy,near=ny*8+nx,jx=x+dx*2,jy=y+dy*2,jump=jy*8+jx;if(nx>=0&&nx<8&&ny>=0&&ny<8&&!board[near])moves.push({to:near});if(jx>=0&&jx<8&&jy>=0&&jy<8&&board[near]&&board[near]%10!==color&&!board[jump])moves.push({to:jump,over:near});});return moves;
}
function upgradeCheckersClick(index) {
  const g=upgradeMini;if(g.turn===2&&g.computer)return;const piece=g.board[index];
  if(piece&&piece%10===g.turn){g.selected=index;g.notice='選好棋子，找一個斜前方的空格。';return upgradeMiniPage();}
  if(g.selected===null)return;const move=upgradeCheckerMoves(g.board,g.selected).find(x=>x.to===index);if(!move){g.notice='這一步不能這樣走，試試斜前方的空格。';return upgradeMiniPage();}
  const from=g.selected, moving=g.board[from];g.board[index]=moving;g.board[from]=0;if(move.over)g.board[move.over]=0;const row=Math.floor(index/8);if((moving===1&&row===7)||(moving===2&&row===0))g.board[index]=moving+10;g.selected=null;g.turn=3-g.turn;
  if(!g.board.some(p=>p&&p%10===g.turn))upgradeMiniFinish((g.turn===1?'藍色':'紅色')+'棋沒有棋子了，'+(g.turn===1?'紅色':'藍色')+'獲勝！');else {g.notice=move.over?'漂亮的跳吃！':'換下一位。';upgradeMiniPage();if(g.computer&&g.turn===2)upgradeMiniTimer=setTimeout(upgradeCheckersBot,480);}
  upgradeMiniPage();
}
function upgradeCheckersBot(){const g=upgradeMini;if(!g||g.kind!=='checkers'||g.result||g.turn!==2)return;const choices=[];g.board.forEach((p,i)=>{if(p&&p%10===2)upgradeCheckerMoves(g.board,i).forEach(move=>choices.push({i,move}));});const pickMove=pick(choices);if(!pickMove)return;g.selected=pickMove.i;upgradeCheckersClick(pickMove.move.to);}
function upgradeTicHTML(g){return '<div class="tic-board">'+g.board.map((cell,i)=>'<button data-mini-ttt="'+i+'" '+(cell||g.result?'disabled':'')+'>'+cell+'</button>').join('')+'</div><p class="mini-rule">圈圈先走，連成三個就是勝利。</p>';}
function upgradeTicWinner(board){for(const line of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]])if(board[line[0]]&&line.every(i=>board[i]===board[line[0]]))return board[line[0]];return board.every(Boolean)?'平手':'';}
function upgradeTicClick(i){const g=upgradeMini;if(g.board[i]||g.result)return;g.board[i]=g.turn;const winner=upgradeTicWinner(g.board);if(winner)return upgradeMiniFinish(winner==='平手'?'棋盤填滿，這局平手！':winner+' 連成三個，獲勝！'),upgradeMiniPage();g.turn=g.turn==='X'?'O':'X';g.notice='換下一位。';upgradeMiniPage();if(g.computer&&g.turn==='O')upgradeMiniTimer=setTimeout(()=>{const empty=g.board.map((v,i)=>v?null:i).filter(Number.isInteger),center=empty.includes(4)?4:pick(empty);upgradeTicClick(center);},380);}
function upgradeMemoryHTML(g){return '<div class="mini-memory-board">'+g.deck.map((v,i)=>'<button data-mini-card="'+i+'" class="'+(g.open.includes(i)||g.matched.includes(i)?'open':'')+'" '+(g.matched.includes(i)?'disabled':'')+'>'+((g.open.includes(i)||g.matched.includes(i))?v:'✦')+'</button>').join('')+'</div><p class="mini-rule">一次翻兩張，找到六對動物朋友。</p>';}
function upgradeMemoryClick(i){const g=upgradeMini;if(g.open.includes(i)||g.matched.includes(i)||g.open.length===2)return;g.open.push(i);sound('card');upgradeMiniPage();if(g.open.length===2){const [a,b]=g.open;if(g.deck[a]===g.deck[b]){g.matched.push(a,b);g.open=[];if(g.matched.length===g.deck.length)upgradeMiniFinish('所有動物朋友都找到彼此了！');upgradeMiniPage();}else upgradeMiniTimer=setTimeout(()=>{if(upgradeMini===g){g.open=[];upgradeMiniPage();}},700);}}
const UPGRADE_RACE_META={snakes:{length:100,token:['🐰','🐢'],special:{4:14,9:31,20:38,28:84,17:7,54:34,62:19,87:24,95:75}},raft:{length:30,token:['🦊','🦦'],special:{5:10,12:18,21:27,16:11,25:19}},colorpath:{length:30,token:['🟣','🟢'],special:{4:7,12:15,21:25}},treasuretrail:{length:30,token:['🧭','💎'],special:{6:10,14:18,23:28}},shapehop:{length:28,token:['🔺','🔵'],special:{3:6,10:14,18:22}},weatherway:{length:28,token:['☂️','🧢'],special:{5:9,13:17,20:25}}};
function upgradeRaceHTML(g){const meta=UPGRADE_RACE_META[g.kind],cells=Array.from({length:meta.length},(_,i)=>{const n=i+1,players=g.positions.map((p,j)=>p===i?'<i>'+meta.token[j]+'</i>':'').join(''),special=meta.special[n],marker=special?(special>n?'🪜':'🐍'):g.kind==='raft'&&n%6===0?'🌊':g.kind==='treasuretrail'&&n%6===0?'🧰':g.kind==='shapehop'&&n%5===0?'⭐':g.kind==='weatherway'&&n%5===0?'🌧️':'';return '<div class="race-cell '+(special?'special':'')+'"><small>'+n+'</small><span>'+marker+'</span>'+players+'</div>';}).join('');return '<div class="race-board race-'+g.kind+'">'+cells+'</div><div class="game-actions"><button class="primary" id="mini-roll">🎲 擲骰子</button></div><p class="mini-rule">玩家 '+(g.turn+1)+' 的回合。'+(g.lastRoll?'剛剛擲到 '+g.lastRoll+' 點。':'')+'</p>';}
function upgradeRaceRoll(){const g=upgradeMini,meta=UPGRADE_RACE_META[g.kind],roll=rand(1,6),player=g.turn;g.lastRoll=roll;let next=Math.min(meta.length-1,g.positions[player]+roll),number=next+1;if(meta.special[number]){next=meta.special[number]-1;g.notice=meta.special[number]>number?'遇到好幫手，向前跳！':'哎呀，沿著蛇滑回去。';}else g.notice='前進 '+roll+' 格！';if(g.kind==='treasuretrail'&&number%6===0){next=Math.min(meta.length-1,next+2);g.notice='找到寶箱，額外前進 2 格！';}if(g.kind==='weatherway'&&number%5===0){next=Math.min(meta.length-1,next+1);g.notice='準備好雨具，額外前進 1 格！';}g.positions[player]=next;if(next===meta.length-1){upgradeMiniFinish('玩家 '+(player+1)+' 抵達終點，獲勝！');return upgradeMiniPage();}g.turn=1-player;upgradeMiniPage();if(g.computer&&g.turn===1)upgradeMiniTimer=setTimeout(upgradeRaceRoll,520);}

arcadePage=function(){upgradeOriginalArcadePage();$$('.arcade-boards article').forEach((card,i)=>{const gameInfo=Object.values(BOARD_GAMES)[i];const icon=card.querySelector('.arcade-board-icon');if(icon&&gameInfo?.icon)icon.textContent=gameInfo.icon;});$('.activity-page')?.insertAdjacentHTML('beforeend',hunterCompanion('獵魔女團挑戰你：桌遊要先看規則，再慢慢想下一步！'));};

render();
