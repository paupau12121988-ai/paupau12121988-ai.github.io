'use strict';

const LIFE_LESSONS = [
  {name:'清潔好習慣', description:'刷牙、洗手和照顧自己的用品', questions:[
    ['🍎 🫧','準備吃點心，手剛摸過操場的球，先做什麼？','用肥皂和清水洗手','把手擦在衣服上','直接拿點心','玩耍後先用肥皂和清水洗手，再吃東西。'],
    ['🌙 🪥','睡前要做哪件事來照顧牙齒？','刷牙','再吃一顆糖','只用手摸牙齒','睡前刷牙，把牙齒表面的食物和牙菌斑刷掉。'],
    ['🎒 🥤','自己的水壺喝完了，想再喝水，怎麼做？','用自己的水壺裝飲用水','直接用同學喝過的水壺','到水溝裝水','用各自的水壺裝飲用水，就不必共用瓶口。'],
    ['👕 🧺','運動後的衣服汗濕了，要怎麼處理？','換乾淨衣服，把汗衣放洗衣籃','塞回書包一直放著','跟乾淨衣服一起收進衣櫃','汗濕的衣服放進洗衣籃，等清洗後晾乾。'],
    ['🤧 🏫','在教室突然想打噴嚏，手邊沒有衛生紙，怎麼做？','用手肘內側遮住口鼻','朝同學打噴嚏','用課本蓋住同學的臉','用手肘內側遮住口鼻，可以減少飛沫散到旁邊。']
  ]},
  {name:'出門會觀察', description:'從人行道、斑馬線到搭公車', questions:[
    ['🚦 🚶','走到斑馬線時，行人號誌亮紅燈。接下來怎麼做？','站在路邊等綠燈','跟在別人後面跑過去','只要沒有車就直接走','等行人綠燈，過路口前也要觀察兩邊車輛。'],
    ['🚌 🚏','公車快到站了，要在哪裡等它停好？','站在人行道的候車區','站到車道中央','貼著公車車身走','在候車區等待，等車停穩、車門打開再上車。'],
    ['🚲 🛝','和家人去公園騎腳踏車，出發前哪個動作合適？','戴好並扣緊安全帽','把安全帽掛在車把上','把安全帽拿在手上','安全帽戴在頭上並扣好，才能保護頭部。'],
    ['🚌 🎒','搭公車時，書包擋住走道了。你可以怎麼做？','把書包收在身前或腳邊','推到門口','放在走道正中間','把物品收好，讓其他人有空間通行。'],
    ['☔ 🧱','下雨天走過濕滑的騎樓，怎麼走比較穩？','放慢腳步','用最快速度跑','在濕地上跳來跳去','濕地較滑，放慢腳步可以減少跌倒。']
  ]},
  {name:'校園有禮貌', description:'排隊、借物和照顧公共空間', questions:[
    ['📚 🏫','在圖書館想和朋友說話，怎麼做比較合適？','小聲說話','大聲喊他','敲桌子叫他','放低音量，讓大家可以安靜閱讀。'],
    ['✏️ 🎒','忘了帶鉛筆，想用同學的筆，先做什麼？','先問同學願不願意借','直接從他書包拿','把自己的作業推給他','先問過對方，借用後記得歸還。'],
    ['🍱 🏫','午餐取餐時，同學已排成一列，要從哪裡排？','隊伍最後面','大家的中間','第一個人的前面','從隊伍最後面排起，依序輪到每個人。'],
    ['📘 🎒','借來的圖書看完了，要怎麼做？','照約定日期歸還','在書上畫記號後留著','丟入回收箱','準時還書，下一位讀者就能借閱。'],
    ['🛝 👧','溜滑梯上還有人，你想玩時該怎麼做？','等前面的人滑完並離開','推他快一點','從下方逆向爬上去','留好距離，等滑道清空再滑。']
  ]},
  {name:'愛惜資源', description:'重複使用、打包和節省水電', questions:[
    ['📝 ✂️','一張紙的背面是空白的，可以怎麼利用？','留下來當草稿紙','把空白面也塗滿再丟','撕碎後丟進馬桶','用完紙的兩面，能減少消耗。'],
    ['🪥 🚰','正在刷牙，不需要用水的時候，該怎麼做？','先關水龍頭','把水開到最大','讓水一直流到刷完','需要沖洗時再開水，就能節省水。'],
    ['💡 🚪','白天房間夠亮，離開教室時還開著燈，可以怎麼做？','確認老師同意後關燈','多開一排燈','一直開著到晚上','不需要照明時關燈，可以節省電力。'],
    ['🛍️ 🏪','去買東西時，哪個做法可以少用一個新袋子？','帶家裡可以重複用的購物袋','每樣商品都另外要袋子','把可以用的袋子先扔掉','購物袋可以多用幾次，減少新袋子的使用。'],
    ['🍚 🍽️','自助取餐時，怎麼做可以少剩一些飯菜？','先取吃得完的量，需要再添','一開始裝滿好幾盤','只為了好看就拿很多','先取適量，吃得下再添，有助於減少剩食。']
  ]},
  {name:'整理小幫手', description:'書包、用品和日常家事', questions:[
    ['🎒 📋','明天要上美勞課，整理書包時怎麼確認用品？','看通知或聯絡簿逐項準備','只把最重的東西放進去','等到上課才想','用清單一項一項確認，比只靠記憶更不容易漏帶。'],
    ['🧸 📦','剛玩完積木又想換玩拼圖，先做什麼？','把積木收回原來的盒子','把積木推到走道','把所有玩具混成一堆','用完的玩具放回原位，下次就找得到。'],
    ['👟 🚪','家門口的鞋子擋住通道，怎麼整理？','把鞋放在鞋架或靠邊整齊擺好','把鞋排滿走道','把鞋踢到樓梯上','留出通道，進出才不容易絆倒。'],
    ['🎒 🍌','放學後發現書包裡還有帶回來的水果，該怎麼做？','拿出來交給家人一起處理','放在書包底忘掉它','塞到乾淨衣服裡','回家清一清書包，食物不會一直留在袋子裡。'],
    ['✏️ 📚','鉛筆、尺和橡皮擦放在哪裡，上課最好找？','一起收進鉛筆盒','分別塞在鞋子裡','都夾在不同書的中間','同類物品放在固定位置，會更容易找到。']
  ]}
];
WORLDS.push({id:'life',name:'生活小常識',sub:'在家、上學與出門',icon:'🏡',color:'#e7f1f4',ink:'#496f78',
  desc:'從熟悉的生活情境練習判斷，想想下一步怎麼做。',modes:LIFE_LESSONS.map(lesson=>lesson.name)});

function lifeTask(mode) {
  const [visual,q,answer,wrongA,wrongB,explain]=pick(LIFE_LESSONS[mode].questions);
  return quiz(q,answer,[wrongA,wrongB],{visual,smallVisual:true,illustration:false,explain,hint:'看看圖案和題目，想一想這時候怎麼做比較好。'});
}

const COPY_PATTERNS=[
  {name:'粉紅小兔',frame:2,steps:'用圓形畫臉、橢圓畫耳朵，再用畫筆點上眼睛。'},
  {name:'海上小帆船',frame:3,steps:'用三角形畫船帆，再用圓角長方形畫船身。'},
  {name:'星空小火箭',frame:4,steps:'用圓角長方形畫火箭，三角形當箭頭，圓形當窗戶。'},
  {name:'晴天小彩虹',frame:5,steps:'用圓形畫太陽、雲朵印章畫雲，再用畫筆加上彩虹。'}
];
WORLDS.find(world=>world.id==='art').modes.push(...COPY_PATTERNS.map(pattern=>'照圖畫：'+pattern.name));

function copyArtTask(mode) {
  const pattern=COPY_PATTERNS[mode-6];
  return {type:'art',mode,pattern,q:'看看範例，畫出你的'+pattern.name+'。'};
}

function craftSprite(frame,label) {
  return '<span class="craft-sprite" role="img" aria-label="'+esc(label)+'" style="--sx:'+(frame%3*50)+'%;--sy:'+(Math.floor(frame/3)*100)+'%"></span>';
}

function drawingSurface(pattern) {
  const canvas='<div class="canvas-wrap"><canvas id="drawing" width="840" height="480" aria-label="繪圖畫布；使用滑鼠、觸控筆或手指繪畫"></canvas></div>';
  if (!pattern) return canvas;
  return '<div class="copy-workspace"><figure class="copy-reference">'+craftSprite(pattern.frame,pattern.name+'範例')+'<figcaption><strong>'+pattern.name+'</strong><p>'+pattern.steps+'</p></figcaption></figure>'+canvas+'</div>';
}

const DRAW_TOOLS=[
  ['pen','畫筆'],['eraser','橡皮擦'],['circle','圓形'],['square','正方形'],['triangle','三角形'],['star','星星'],
  ['oval','橢圓'],['rectangle','長方形'],['rounded','圓角長方形'],['diamond','菱形'],['hexagon','六邊形'],
  ['heart','愛心'],['crescent','月牙'],['cloud','雲朵'],['flower','花朵']
];

function paintShape(ctx,tool,x,y,r,color) {
  ctx.fillStyle=color;
  ctx.beginPath();
  switch (tool) {
    case 'circle': ctx.arc(x,y,r,0,Math.PI*2); break;
    case 'oval': ctx.ellipse(x,y,r*.65,r*1.15,0,0,Math.PI*2); break;
    case 'square': ctx.rect(x-r,y-r,r*2,r*2); break;
    case 'rectangle': ctx.rect(x-r*1.22,y-r*.68,r*2.44,r*1.36); break;
    case 'rounded': ctx.roundRect(x-r*1.2,y-r*.65,r*2.4,r*1.3,r*.34); break;
    case 'triangle': ctx.moveTo(x,y-r);ctx.lineTo(x+r,y+r);ctx.lineTo(x-r,y+r);break;
    case 'diamond': ctx.moveTo(x,y-r);ctx.lineTo(x+r,y);ctx.lineTo(x,y+r);ctx.lineTo(x-r,y);break;
    case 'star':
    case 'hexagon': {
      const sides=tool==='star'?10:6;
      for (let i=0;i<sides;i++) {
        const angle=-Math.PI/2+i*2*Math.PI/sides, radius=tool==='star'&&i%2?r*.45:r;
        ctx.lineTo(x+Math.cos(angle)*radius,y+Math.sin(angle)*radius);
      }
      break;
    }
    case 'heart':
      ctx.moveTo(x,y+r);
      ctx.bezierCurveTo(x-r*2,y-r*.2,x-r*.8,y-r*1.45,x,y-r*.5);
      ctx.bezierCurveTo(x+r*.8,y-r*1.45,x+r*2,y-r*.2,x,y+r);
      break;
    case 'crescent':
      ctx.moveTo(x+r*.36,y-r);
      ctx.bezierCurveTo(x-r*1.45,y-r*1.3,x-r*1.45,y+r*1.28,x+r*.72,y+r*.8);
      ctx.bezierCurveTo(x-r*.48,y+r*.3,x-r*.46,y-r*.58,x+r*.36,y-r);
      break;
    case 'cloud':
      ctx.roundRect(x-r*1.2,y-r*.15,r*2.4,r*.83,r*.415);
      for (const [dx,dy,k] of [[-.55,-.22,.44],[0,-.43,.58],[.55,-.21,.44]]) {
        ctx.moveTo(x+r*(dx+k),y+r*dy);
        ctx.arc(x+r*dx,y+r*dy,r*k,0,Math.PI*2);
      }
      break;
    case 'flower':
      for (let i=0;i<6;i++) {
        const angle=i*Math.PI/3, cx=x+Math.cos(angle)*r*.57, cy=y+Math.sin(angle)*r*.57;
        ctx.moveTo(cx+r*.42,cy);
        ctx.arc(cx,cy,r*.42,0,Math.PI*2);
      }
      break;
    default: return;
  }
  ctx.closePath();
  ctx.fill();
  if (tool==='flower') {
    ctx.fillStyle='#ffc961';
    ctx.beginPath();
    ctx.arc(x,y,r*.32,0,Math.PI*2);
    ctx.fill();
  }
}

const SCENE_CUES=[
  [/飯糰|米糕|夜市|豆漿/,'🍙 🥤'],[/找回|付.+元|折扣/,'🛍️ 🪙'],
  [/草莓|餅乾|糖果|裝滿|每盒/,'🍬 📦'],[/鉛筆|橡皮擦|文具/,'✏️ 📏'],
  [/蘿蔔|西瓜|蝴蝶|雨傘|圖書館|腳踏車|紅綠燈|運動會|圖畫書|自來水|公車|玩具|雨|看書|小狗|小鳥/,'💬 🖼️'],
  [/座位|最左|正右/,'🪑 🪑 🪑'],[/原點|往東|向東|向北|向南|向西/,'🧭 🗺️'],
  [/天平|同重|等重|顆月亮/,'⚖️'],[/時鐘|時間|幾點|小時|分鐘/,'🕰️'],
  [/迷宮|密碼門|門鎖/,'🗝️ 🚪'],[/磁鐵|磁力/,'🧲'],[/影子|手電筒|光線/,'🔦'],
  [/種子|發芽|植物/,'🌱'],[/沉浮|水面|漂浮/,'💧 🛶'],[/分組|平均|分給/,'🍎 🧺']
];
const WORLD_CUES={math:'🔢 🧮',bopo:'👂 💬',english:'🔤 💬',clock:'🕰️',art:'🎨 ✏️',logic:'🧩 💭',science:'🌿 🔍',life:'🏠 🧺',rescue:'🧰 🔍'};
const WORD_PICTURES=[
  ['紅蘿蔔','🥕'],['圖書館','📚'],['腳踏車','🚲'],['紅綠燈','🚦'],['運動會','🏃'],['圖畫書','📖'],
  ['西瓜汁','🍉 🥤'],['自來水','🚰'],['公車站','🚌 🚏'],['玩具店','🧸'],['看書','📖'],['下雨','☔'],
  ['小鳥','🐦'],['小狗','🐶'],['畫畫','🎨'], ...BOPO.map(entry=>[entry[2],entry[4]]).filter(([word])=>word.length>1)
];

function questionPicture(task,world) {
  const visual=task.visual;
  if (visual) {
    const kind=task.smallVisual?' small':'';
    const scene=task.illustration===false || /\p{Extended_Pictographic}/u.test(visual);
    const cue=scene?'':questionCue(task,world);
    return cue+'<div class="q-visual'+kind+'">'+esc(visual)+'</div>';
  }
  return task.clock||task.pattern ? '' : questionCue(task,world);
}

function questionCue(task,world) {
  if (!/[\u3400-\u9fff]/.test(task.q)) return '';
  const relatedWord=world==='bopo'||world==='rescue' ? WORD_PICTURES.find(([word])=>task.q.includes(word))?.[1] : null;
  const context=task.listenOnly?'👂 💬':relatedWord||SCENE_CUES.find(([match])=>match.test(task.q))?.[1];
  return '<div class="question-cue" aria-hidden="true">'+(context||WORLD_CUES[world]||'🖼️')+'</div>';
}
