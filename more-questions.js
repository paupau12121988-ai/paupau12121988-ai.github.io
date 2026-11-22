'use strict';

const MORE_LIFE=[
  [['🧼 🖐️','洗手時，哪裡容易忘記洗？','指縫和指尖',['只洗手掌中間','只洗手腕'],'手心、手背、指縫和指尖都要搓洗。'],['🥤 🎒','每天帶出門的水壺，用完要做什麼？','洗乾淨並晾乾',['只蓋緊瓶蓋','只擦瓶身外面'],'水壺和瓶蓋洗好後晾乾，下次使用更乾淨。']],
  [['🚗 🚶','走過停車場，遇到車輛亮起倒車燈時怎麼做？','和大人先停下等車離開',['馬上從車後跑過','躲到車尾旁邊'],'停下來讓車先走，避免走進駕駛難以看見的位置。'],['☔ 🚶','撐傘走在人行道上，要留意什麼？','傘別遮住自己的視線，也別碰到旁人',['把傘壓到眼睛前面','把傘橫著快速揮動'],'保留視線和身邊空間，才能看清腳下與旁人。']],
  [['❔ 🏫','上課聽不懂，想請老師再說一次，怎麼做？','先舉手，等老師請你發言',['一直打斷老師','推同學請他代問'],'等到有發言機會，再清楚說出自己的問題。'],['🧩 🤝','兩人都想玩同一盒拼圖，怎麼辦？','商量一起玩或輪流玩',['把拼圖藏起來','把盒子搶走'],'先聽對方想法，再一起決定順序。']],
  [['🥤 🏡','運動會想喝水，出門前帶什麼能少用一次性杯子？','自己可以重複裝水的水壺',['一疊一次性杯子','空紙袋'],'用自己的水壺補水，可以少用一次性杯子。'],['🧥 🪡','外套只掉了一顆扣子，怎麼做可以繼續穿？','請家人幫忙縫回扣子',['立刻整件丟掉','先弄掉其他扣子'],'小地方能修好，就能繼續使用這件衣服。']],
  [['📚 📦','客廳同時散著書本和積木，怎樣整理最好找？','書回書架，積木回盒子',['全部堆到門口','書和積木混在一袋'],'依東西的種類放回固定位置。'],['🖍️ 🎒','蠟筆盒裡斷掉的蠟筆還能畫圖，怎麼整理？','把可用的短蠟筆集中放好',['全都丟到走道上','放進水壺裡'],'集中收好還能使用的材料，下次創作時容易找。']]
];

const MORE_SCIENCE=[
  [['🐢 🌊','海龜平時在海裡活動，會到哪裡產卵？','沙灘',['海底石頭上','樹枝上'],'海龜會上岸，在沙灘挖洞產卵。'],['🦎 🧱','夜晚牆上的壁虎常在哪裡找食物？','靠近有小蟲出沒的地方',['泡在魚缸裡','躲在冰塊底下'],'壁虎會捕食昆蟲，燈光附近常吸引小蟲。']],
  [['🌰 🌿','種子吸水發芽後，通常先長出哪個部分？','根',['花朵','果實'],'多數種子萌發時先伸出根，再逐漸長出莖和葉。'],['🌿 ☀️','想比較光線對幼苗生長的影響，哪一項應相同？','每盆澆水的量',['兩盆接受的光照時間','一盆種一種完全不同的植物'],'比較光照影響時，水量、植物種類等條件應盡量相同。']],
  [['🌬️ 🎏','風變大時，風向袋通常會怎樣？','被吹得更平、更撐開',['縮成硬球','從地面冒出水'],'風越強，風向袋通常越被氣流撐起。'],['🌧️ 🪣','把直筒容器放在空地接雨，可以觀察什麼？','一段時間累積的雨量',['風往哪邊吹','空氣有多熱'],'比較同一容器的水位，就能觀察雨量的變化。']],
  [['🥄 🪵','把木筷與鋼湯匙輕放水面，比較可能浮起的是？','木筷',['鋼湯匙','兩樣都一定沉底'],'多數乾木材比水的密度小，實心鋼湯匙通常會下沉。'],['🛶 💧','紙船吸進很多水後，為什麼比較容易沉？','水進入船裡，船變重且較難浮住',['水把紙變成金屬','船在水裡會自行變大'],'吸水後船變重，進水也會讓紙船更難維持原來的形狀。']],
  [['🧲 🖇️','把磁鐵靠近同樣大小的鐵迴紋針和木片，哪個會被吸引？','鐵迴紋針',['木片','兩個都一定被吸住'],'磁鐵會吸引鐵等材料，不會吸引普通木頭。'],['🧲 🧲','兩顆磁鐵的同名磁極慢慢靠近，會怎麼樣？','互相排斥',['一定吸在一起','變成透明'],'同名磁極相斥，異名磁極相吸。']],
  [['💡 🖐️','用手擋住照向牆壁的燈，牆上會出現什麼？','手的影子',['彩虹','水滴'],'手擋住一部分光，所以牆上會出現較暗的影子。'],['🏀 🔦','固定燈和牆，把球移近燈，牆上的影通常怎樣？','變大',['變得更亮','一定消失'],'球靠近光源，光線被遮住的範圍通常會變大。']]
];

function enrichedChoice([visual,q,answer,options,explain]) {
  return quiz(q,answer,options,{visual,smallVisual:true,explain,hint:'先看圖和題目的條件，再比較各個選項。'});
}

const MORE_ENGLISH=[
  ['kite','🪁','風箏'],['cake','🍰','蛋糕'],['rain','🌧️','下雨'],['leaf','🍃','葉子'],['moon','🌙','月亮'],
  ['nest','🪹','鳥巢'],['sock','🧦','襪子'],['ship','🚢','船'],['brush','🖌️','畫筆'],['crayon','🖍️','蠟筆'],
  ['window','🪟','窗戶'],['bicycle','🚲','腳踏車'],['sandwich','🥪','三明治'],['backpack','🎒','背包'],['butterfly','🦋','蝴蝶']
];
const MORE_BOPOMOFO=[
  ['恐龍','ㄎㄨㄥˇ ㄌㄨㄥˊ','🦖'],['海豚','ㄏㄞˇ ㄊㄨㄣˊ','🐬'],['月餅','ㄩㄝˋ ㄅㄧㄥˇ','🥮'],
  ['氣球','ㄑㄧˋ ㄑㄧㄡˊ','🎈'],['毛巾','ㄇㄠˊ ㄐㄧㄣ','🧺'],['冰箱','ㄅㄧㄥ ㄒㄧㄤ','🧊'],
  ['直升機','ㄓˊ ㄕㄥ ㄐㄧ','🚁'],['消防車','ㄒㄧㄠ ㄈㄤˊ ㄔㄜ','🚒'],['便利商店','ㄅㄧㄢˋ ㄌㄧˋ ㄕㄤ ㄉㄧㄢˋ','🏪'],
  ['太陽出來了','ㄊㄞˋ ㄧㄤˊ ㄔㄨ ㄌㄞˊ ˙ㄌㄜ','☀️'],['一起去公園','ㄧˋ ㄑㄧˇ ㄑㄩˋ ㄍㄨㄥ ㄩㄢˊ','🛝'],
  ['青蛙跳進水裡','ㄑㄧㄥ ㄨㄚ ㄊㄧㄠˋ ㄐㄧㄣˋ ㄕㄨㄟˇ ㄌㄧˇ','🐸']
];
const MORE_DRAWING=[
  ['畫一座住著小動物的夜市。','畫一艘在雲海旅行的船。','畫出你最想做的三種點心。'],
  ['沿線描完後，在圓圈裡加一個笑臉。','描完波浪，在波浪上畫一排小魚。'],
  ['用鏡像畫一張貓咪臉。','用鏡像畫一對葉子與花瓣。'],
  ['用圓形、橢圓和三角形拼出一隻貓。','用方形、圓角長方形和星星拼出夜晚的城市。'],
  ['左邊畫兩朵雲，右邊畫三顆星。','畫一棵樹，在下面放三顆不同顏色的果實。'],
  ['畫出從種下一顆種子到長成一棵樹的故事。','畫出小船遇到風，再平安回到港口的故事。'],
  ['照圖畫小兔，再幫牠畫一條圍巾。','照圖畫小兔，再畫牠喜歡的紅蘿蔔。'],
  ['照圖畫帆船，再加上海浪。','照圖畫帆船，再畫一座遠方的燈塔。'],
  ['照圖畫火箭，再用不同大小的星星裝飾天空。','照圖畫火箭，再畫一顆想去的星球。'],
  ['照圖畫彩虹，試著換一組顏色。','照圖畫彩虹，再加上雨後的小水窪。']
];

function extraMath(mode,level) {
  const a=rand(2,level<2?5:12), b=rand(2,level<2?4:8), c=rand(1,5);
  const sweets=pick([['布丁','🍮'],['蛋糕','🍰'],['飯糰','🍙'],['水餃','🥟']]);
  const [food,pic]=sweets;
  const numbered=(q,n,visual,explain)=>challengeNumber(q,n,level,{visual,smallVisual:true,explain,hint:'用圖畫或算式記下已知數量，再一步一步算。'});
  switch(mode) {
    case 0: return numbered('兩盤'+food+'各有 '+a+' 個和 '+b+' 個，共幾個？',a+b,pic.repeat(a)+' 　'+pic.repeat(b),a+' ＋ '+b+' ＝ '+(a+b));
    case 1: return numbered('把 '+a*b+' 個'+food+'等分到 '+b+' 個盤子，每盤幾個？',a,pic+' 🍽️',a*b+' ÷ '+b+' ＝ '+a);
    case 2: return numbered('做 '+b+' 盒點心，每盒 '+a+' 個'+food+'，總共幾個？',a*b,pic+' 📦',a+' × '+b+' ＝ '+a*b);
    case 3: return sequence('把 '+b+' 的倍數從小到大排好。',Array.from({length:level<2?4:6},(_,i)=>String((a+i)*b)),{hint:'每一張比前一張多 '+b+'。'});
    case 4: return numbered('一顆芭樂 '+a+' 元，買 '+b+' 顆要付多少元？',a*b,'🍐 🪙',a+' × '+b+' ＝ '+a*b+' 元。');
    case 5: return numbered('原本有 '+(a+b+c)+' 個'+food+'，送出 '+b+' 個，再加上 '+c+' 個，現在有幾個？',a+c*2,pic+' 🎁',(a+b+c)+' − '+b+' ＋ '+c+' ＝ '+(a+c*2));
    case 6: return numbered('買 '+b+' 份豆花，每份 '+a+' 元，又買一瓶 '+(c+3)+' 元的水。一共花幾元？',a*b+c+3,'🥣 💧',a*b+' ＋ '+(c+3)+' ＝ '+(a*b+c+3)+' 元。');
    case 7: {
      const rest=rand(1,b-1);
      return numbered(a*b+rest+' 顆彈珠，每盒放 '+b+' 顆。裝滿 '+a+' 盒後，剩下幾顆？',rest,'🔵 📦',(a*b+rest)+' − '+(a*b)+' ＝ '+rest);
    }
    default: return numbered('找出空格裡的數字：□ ＋ '+a+' − '+b+' ＝ '+(a+c),b+c,'🔢 🧩',(b+c)+' ＋ '+a+' − '+b+' ＝ '+(a+c));
  }
}

function extraBopo(mode,level) {
  const pool=MORE_BOPOMOFO.slice(0,level<2?6:mode===8?12:9);
  const [word,sounds,visual]=pick(mode===8&&level>=2?MORE_BOPOMOFO.slice(9):pool);
  const parts=sounds.split(' '), toneFree=part=>part.replace(/[ˊˇˋ˙]/g,'');
  const info={speech:word,visual,smallVisual:true,hint:'慢慢念出每個字，留意開頭的符號和聲調。',explain:word+' 的注音是 '+sounds+'。'};
  if(mode===0) {
    const initial=parts[0][0];
    return quiz('聽詞語，找出第一個注音符號。',initial,['ㄅ','ㄇ','ㄏ','ㄒ','ㄑ','ㄎ','ㄩ'].filter(c=>c!==initial),{...info,visual:'👂',listenOnly:true});
  }
  if(mode===1) return quiz('「'+word+'」第一個字的完整注音是哪一個？',parts[0],pool.filter(row=>row[0]!==word).map(row=>row[1].split(' ')[0]),info);
  if(mode===2||mode===7) {
    const index=rand(0,parts.length-1),answer=parts[index],base=toneFree(answer);
    return quiz('「'+word+'」第 '+(index+1)+' 個字的注音是哪個？',answer,[base,base+'ˊ',base+'ˇ',base+'ˋ','˙'+base],info);
  }
  if(mode===3||mode===6||mode===8) return sequence(mode===8?'聽完整一段話，再依序排好注音。':'依序排好「'+word+'」的注音。',parts,{...info,visual:mode===8?'👂':visual,listenOnly:mode===8});
  if(mode===4) return memory(shuffle(pool).slice(0,level<2?3:5).map(([w,s])=>[w,s]),'翻牌找出詞語與注音的配對。');
  return quiz('「'+sounds+'」是哪個詞語？',word,pool.filter(row=>row[0]!==word).map(row=>row[0]),{hint:'從第一個音節開始拼讀。',explain:info.explain});
}

function extraEnglish(mode,level) {
  const pool=MORE_ENGLISH.slice(0,level<2?8:15);
  const [word,icon,zh]=pick(pool), others=pool.filter(row=>row[0]!==word);
  const info={speech:word,lang:'en-US',visual:icon,explain:word+' 是「'+zh+'」。',hint:'想一想發音和圖案。'};
  if(mode===0) {
    const start=word[0];
    return quiz('找出小寫 '+start+' 的大寫。',start.toUpperCase(),['K','C','R','L','M','N','S','B'].filter(letter=>letter!==start.toUpperCase()),{...info,speech:start,visual:start});
  }
  if(mode===1) return quiz('聽英文，找出符合的圖案。',icon,others.map(row=>row[1]),{...info,visual:'👂',listenOnly:true});
  if(mode===2) {
    const index=rand(0,word.length-1);
    return quiz('補上 '+word.slice(0,index)+'＿'+word.slice(index+1)+' 的字母。',word[index],['a','e','i','o','t','r','h','s'],info);
  }
  if(mode===3) return memory(shuffle(pool).slice(0,level<2?3:5).map(([w,p])=>[w,p]),'翻牌，把英文單字和圖片配成一對。');
  if(mode===4) return sequence('把字母排成「'+zh+'」的英文。',Array.from(word),info);
  return quiz('「'+zh+'」的英文是哪個？',word,others.map(row=>row[0]),info);
}

function extraClock(mode,level) {
  const hour=rand(1,11), minutes=level===0?0:level===1?30:rand(1,11)*5;
  const digital=timeText(hour,minutes), display=digital+' 🕰️';
  const readable=(h,m)=>h+' 點'+(m?' '+m+' 分':'整');
  if(mode===0) return quiz('公園的時鐘現在顯示幾點？',digital,[timeText(hour+1,minutes),timeText(hour,(minutes+30)%60)],{clock:{h:hour,m:minutes},hint:'短針看小時，長針看分鐘。'});
  if(mode===1) return {type:'clock',q:'幫圖書館把指針調到 '+readable(hour,minutes)+'。',target:{h:hour,m:minutes},visual:'📚 🕰️',hint:'先調時針，再看分針。'};
  if(mode===2) return sequence('把放學後的事情從早到晚排好。',['下午 4 點放學','傍晚 6 點吃晚餐','晚上 8 點刷牙','晚上 9 點睡覺'],{visual:'🏫 🍽️ 🌙',hint:'放學、吃飯、刷牙，再上床。'});
  if(mode===3) return quiz('哪個數字時鐘顯示 '+readable(hour,minutes)+'？',digital,[timeText(hour+1,minutes),timeText(hour,(minutes+30)%60)],{hint:'冒號左邊是小時，右邊是分鐘。'});
  const wait=level<2?60:rand(2,7)*5, absolute=hour*60+minutes+wait;
  if(mode===4) {
    const next=timeText(Math.floor(absolute/60),absolute%60);
    return quiz('現在 '+digital+'，再過 '+wait+' 分鐘是幾點？',next,[digital,timeText(Math.floor(absolute/60)+1,absolute%60)],{visual:display,hint:'加分鐘時，一滿 60 分鐘就要加一小時。'});
  }
  return challengeNumber('活動從 '+digital+' 到 '+timeText(Math.floor(absolute/60),absolute%60)+'，過了幾分鐘？',wait,level,{visual:'🎈 🕰️',hint:'先看到下一個整點還有幾分鐘，再加上整點後的分鐘。'});
}

function extraLogic(mode,level) {
  if(mode===0) {
    const pattern=shuffle(['🍊','🌟','🍎','🌙']).slice(0,3);
    const repeat=level<2?[...pattern.slice(0,2)]:[pattern[0],pattern[1],pattern[1],pattern[2]];
    const length=rand(6,9);
    return quiz('接著會出現哪個圖案？',repeat[length%repeat.length],['🍊','🌟','🍎','🌙'],{visual:Array.from({length},(_,i)=>repeat[i%repeat.length]).join(' '),smallVisual:true,hint:'找出重複出現的一小組。'});
  }
  if(mode===1) return quiz('哪一樣和其他都是交通工具這個規則不合？','🍐 梨子',['🚌 公車','🚲 腳踏車','🚆 火車'],{visual:'🗂️',explain:'梨子是水果。'});
  if(mode===2) return sequence('借書這件事怎麼做？把步驟依序排好。',['選一本想借的書','到櫃臺辦借書','帶回家閱讀','到期前歸還'],{visual:'📚 🏫',hint:'先選書、後借書，閱讀完再還。'});
  if(mode===3) return memory(shuffle(['🦋','🚂','🌈','🐢','🌼','🪁','🍇']).slice(0,level<2?3:5).map(icon=>[icon,icon]));
  if(mode===4) return challengeMaze(level);
  if(mode===5) return quiz('哪個圖形同時有四條一樣長的邊和四個直角？','正方形',['長方形（長寬不同）','三角形','圓形'],{visual:'🔺 🟪 🟢',hint:'要同時比邊長和角。'});
  if(mode===6) {
    const names=shuffle(['小晴','小安','米米','阿樂']).slice(0,3);
    return sequence(names[2]+' 坐最右邊，'+names[0]+' 在 '+names[1]+' 左邊。從左排到右。',names,{visual:'🪑 🪑 🪑',hint:'先固定最右邊的位置。'});
  }
  if(mode===7) {
    const a=rand(2,5),b=rand(1,a-1);
    return quiz('往北 '+a+' 格，再往南 '+b+' 格。終點在起點哪一邊？','北方 '+(a-b)+' 格',['南方 '+(a-b)+' 格','北方 '+(a+b)+' 格','原地'],{visual:'🧭',hint:'往南和往北的格數會互相抵銷。'});
  }
  const unit=rand(2,6),count=rand(2,4);
  return challengeNumber('一顆大積木等於 '+unit+' 顆小積木的重量。'+count+' 顆大積木等於幾顆小積木？',unit*count,level,{visual:'⚖️ 🧱',hint:'每顆大的都換成同樣數量的小積木。'});
}

function extraTask(world,mode,level) {
  switch(world) {
    case 'math':return extraMath(mode,level);
    case 'bopo':return extraBopo(mode,level);
    case 'english':return extraEnglish(mode,level);
    case 'clock':return extraClock(mode,level);
    case 'logic':return extraLogic(mode,level);
    case 'science':return enrichedChoice(pick(MORE_SCIENCE[mode]));
    case 'life':return enrichedChoice(pick(MORE_LIFE[mode]));
    case 'art':return {type:'art',mode,pattern:COPY_PATTERNS[mode-6],q:pick(MORE_DRAWING[mode])};
  }
}

function practiceTask(world,mode,index) {
  if(world==='art') return Math.random()<.65 ? extraTask(world,mode,state.level) : makeTask(world,mode);
  return index%2===0 ? extraTask(world,mode,state.level) : makeTask(world,mode);
}
