'use strict';
// Level 2 builds understanding; level 3 asks learners to produce answers and combine steps.
const READING_WORDS=[['電腦','ㄉㄧㄢˋ ㄋㄠˇ'],['學校','ㄒㄩㄝˊ ㄒㄧㄠˋ'],['書包','ㄕㄨ ㄅㄠ'],['朋友','ㄆㄥˊ ㄧㄡˇ'],['公園','ㄍㄨㄥ ㄩㄢˊ'],['雨傘','ㄩˇ ㄙㄢˇ'],['鉛筆','ㄑㄧㄢ ㄅㄧˇ'],['蝴蝶','ㄏㄨˊ ㄉㄧㄝˊ'],['彩虹','ㄘㄞˇ ㄏㄨㄥˊ'],['月亮','ㄩㄝˋ ㄌㄧㄤˋ'],['早餐','ㄗㄠˇ ㄘㄢ'],['圖書館','ㄊㄨˊ ㄕㄨ ㄍㄨㄢˇ'],['腳踏車','ㄐㄧㄠˇ ㄊㄚˋ ㄔㄜ'],['溜滑梯','ㄌㄧㄡ ㄏㄨㄚˊ ㄊㄧ'],['紅綠燈','ㄏㄨㄥˊ ㄌㄩˋ ㄉㄥ']];
const LONG_WORDS=[['rabbit','🐰','兔子'],['turtle','🐢','烏龜'],['monkey','🐵','猴子'],['tiger','🐯','老虎'],['elephant','🐘','大象'],['banana','🍌','香蕉'],['orange','🍊','柳橙'],['grape','🍇','葡萄'],['carrot','🥕','紅蘿蔔'],['flower','🌸','花朵'],['pencil','✏️','鉛筆'],['school','🏫','學校'],['house','🏠','房子'],['train','🚆','火車'],['cloud','☁️','雲'],['star','⭐','星星']];
const SCIENCE_REASONING=[
 [
 ['鯨魚生活在海裡，為什麼仍要浮上水面？','用肺呼吸空氣',['只為了曬太陽','用鰓呼吸'],'鯨魚是哺乳類，用肺呼吸，必須浮上水面換氣。'],
 ['池塘被填平後，哪個變化最可能直接影響青蛙繁殖？','缺少產卵和蝌蚪生活的水域',['青蛙不再需要食物','青蛙會變成魚'],'許多青蛙需要水域產卵，蝌蚪也生活在水中。'],
 ['花園裡的花變少了，蜜蜂最可能面臨什麼問題？','花蜜和花粉來源減少',['不能呼吸空氣','翅膀一定會變短'],'花朵提供花蜜和花粉，食物來源變少會影響蜜蜂。']
 ],
 [
 ['想比較「水分是否影響綠豆發芽」，哪種安排較公平？','同種種子、相同環境，只改變水量',['一組綠豆一組紅豆，水也不同','兩組種子、溫度和水量都不同'],'一次只改變水量，其他條件盡量相同，才容易比較水分的影響。'],
 ['綠豆有水卻整顆泡在水中，為何可能不易發芽？','可能缺少足夠的空氣',['種子完全不需要空氣','水越多一定長得越快'],'種子發芽需要適量的水、空氣和合適溫度；過多水可能減少空氣。'],
 ['兩盆同種幼苗，一盆長期放暗處，哪個解釋較合理？','長期缺光會影響製造養分和成長',['植物只喝水就能永遠健康','放暗處一定開更多花'],'植物需要光進行光合作用，長期缺光會影響健康。']
 ],
 [
 ['昨天和今天氣溫不同，想比較哪天較冷，該怎麼做？','在相同地點和時段量測氣溫',['只看穿外套的人數','一次量室內、一次量陽光下的地面'],'比較條件盡量一致，量測才有意義。'],
 ['連續豪雨後山區有落石風險，哪個決定較合適？','避開山區，先確認天氣和道路資訊',['雨小一點就去溪邊','只要帶傘就一定安全'],'雨停後仍可能有土石和水位風險，應避開危險地點。'],
 ['陽光強烈時，哪一組做法最能一起減少曝曬和缺水？','戴帽、補水並安排陰涼處休息',['只喝含糖飲料並一直跑','只穿厚外套不喝水'],'遮陽、補水和休息能共同照顧身體。']
 ],
 [
 ['同一塊黏土，捏成實心球會沉；捏成不漏水的小船可能浮。原因是？','形狀改變了排開水的體積與整體平均密度',['黏土變成木頭','只有顏色決定沉浮'],'船形能排開更多水，包含空氣的整體平均密度也不同；太重或進水仍會沉。'],
 ['空的密封瓶會浮，打開並裝滿水後可能下沉。最合理的原因是？','瓶內空氣減少，整體重量與平均密度增加',['水把塑膠變成鐵','瓶子顏色改變了'],'沉浮與整體平均密度有關，裝滿水和裝空氣的情況不同。'],
 ['小石頭會沉，大木塊會浮。哪個結論較合理？','不能只靠大小判斷沉浮',['所有小物品都浮','所有大物品都沉'],'材質、形狀和整體平均密度都會影響沉浮。']
 ],
 [
 ['磁鐵吸起鐵釘卻吸不起銅片，可以推論什麼？','不是所有金屬都會被磁鐵吸引',['所有金屬都會被吸引','只有大的金屬會被吸引'],'鐵可被磁鐵吸引，銅通常不會；不能把所有金屬當成一樣。'],
 ['隔著一張薄紙，磁鐵仍吸起鐵製迴紋針，代表什麼？','磁力可以隔著某些材料作用',['紙也變成磁鐵了','磁鐵只會吸紙'],'磁力能隔著薄紙等某些材料作用，距離增加時效果可能變弱。'],
 ['比較兩顆磁鐵的吸引能力，哪種方法較公平？','用相同迴紋針、相同距離測試',['一顆吸鐵釘，一顆吸木塊','用不同物品和不同距離'],'改變磁鐵，其他測試條件相同，才較容易比較。']
 ],
 [
 ['手電筒、積木和牆都不動，只把手電筒關掉，影子會如何？','該手電筒造成的影子會消失',['變得更黑更大','變成彩虹'],'影子需要光源與遮擋物；關掉光源後，該光源造成的影子也消失。'],
 ['固定手電筒和牆，把積木移向牆，影子通常會？','變小',['變大','一定消失'],'其他條件相同，物體離光源較遠、靠近牆時，影子通常變小。'],
 ['想研究物體距離如何影響影子大小，應保持什麼不變？','光源、物體和牆面，只改變物體位置',['同時換光源和物體','每次改變所有條件'],'保持光源、物體和牆面相同，只改變物體與光源的距離。']
 ]
];
function challengeNumber(q,n,l,extra={}){return l===3?{type:'number',q,answer:String(n),...extra}:numberQuiz(q,n,extra);}
function challengeTask(id,m,l){
 if(id==='math')return challengeMath(m,l);
 if(id==='bopo')return challengeBopo(m,l);
 if(id==='english')return challengeEnglish(m,l);
 if(id==='clock')return challengeClock(m,l);
 if(id==='logic')return challengeLogic(m,l);
 if(id==='science'){if(l===2&&m===1)return sequence('把綠豆的成長過程依序排好。',['乾燥種子','吸水膨脹','種皮裂開、根伸出','嫩芽向上長','長出葉片'],{hint:'根通常先伸出，幫助吸水；再觀察嫩芽和葉片。',explain:'這是綠豆常見的發芽成長過程，需適量水、空氣與合適溫度。'});const x=pick(SCIENCE_REASONING[m]);return quiz(x[0],x[1],x[2],{explain:x[3],hint:l===3?'找出題目改變了什麼、哪些條件相同，再比較每個說法。':x[3],experiment:true});}
 const prompts=[['用至少三種顏色，畫出有前景和遠景的公園。','用不同線條畫出心情，再加上代表心情的形狀。'],['沿虛線描完後，延伸成有規律的波浪和圓形圖案。','描完曲線，再補上重複的「大圓、小圓、小圓」規律。'],['利用鏡像畫出左右對稱的蝴蝶，翅膀至少有三種圖案。','利用對稱線畫出城堡，再用不同顏色安排重複花紋。'],['用圓、方、三角形拼出交通工具，再加上場景。','用至少三種形狀拼出城市，安排近大遠小的建築。'],['畫兩棵樹，左邊比右邊高；畫三朵花，其中兩朵是黃色。','畫一個大圓，裡面有三個小三角形；圓右邊有兩個藍色方形。'],['把畫面分成前後兩格，畫出種子發芽的故事。','把畫面分成三格，畫出「遇到問題、嘗試方法、解決問題」。']];return {type:'art',q:pick(prompts[m]),mode:m};
}
function challengeMath(m,l){const a=rand(l===3?4:2,9),b=rand(3,9),n=a*b;
 if(m===0){const left=rand(1,a-1),gone=rand(1,b-1);return challengeNumber(`有 ${a} 盤餅乾，每盤 ${b} 片。吃掉 ${l===3?left+' 盤':gone+' 片'}後，還有幾片？`,l===3?(a-left)*b:n-gone,l,{explain:l===3?`先算剩 ${a-left} 盤，再算 ${a-left} × ${b} ＝ ${(a-left)*b}。`:`先算 ${a} × ${b} ＝ ${n}，再減 ${gone}，剩 ${n-gone} 片。`,hint:'先求總數，再減去吃掉的數量；也可以先算剩幾盤。'});}
 if(m===1)return challengeNumber(`${n} 顆草莓平均分給 ${a} 個人，每人幾顆？`,b,l,{explain:`${n} ÷ ${a} ＝ ${b}，可以用 ${a} × ${b} ＝ ${n} 檢查。`,hint:`想想 ${a} 乘以幾會等於 ${n}？`});
 if(m===2)return challengeNumber(`找出空格：${a} × □ ＝ ${n}`,b,l,{visual:`${a} × □ ＝ ${n}`,explain:`${n} ÷ ${a} ＝ ${b}，所以空格填 ${b}。`,hint:`用 ${a} 的倍數慢慢找，也可以用除法。`});
 if(m===3){const start=rand(1,4)*a;return sequence(`每次增加 ${a}，${l===3?'從大到小':'從小到大'}排好。`,Array.from({length:l===3?6:5},(_,i)=>start+i*a)[l===3?'reverse':'slice']().map(String),{explain:`相鄰兩數相差 ${a}。${l===3?'這次要由大到小！':''}`,hint:`先找${l===3?'最大':'最小'}的數，再每次${l===3?'減去':'加上'} ${a}。`});}
 if(m===4){const eraser=rand(3,12),cost=n+eraser,pay=Math.ceil(cost/50)*50;return challengeNumber(`鉛筆每支 ${a} 元，買 ${b} 支，再買 ${eraser} 元的橡皮擦。付 ${pay} 元，應找回幾元？`,pay-cost,l,{explain:`鉛筆 ${a} × ${b} ＝ ${n} 元；總共 ${cost} 元。${pay} − ${cost} ＝ ${pay-cost} 元。`,hint:'先算鉛筆總價，加上橡皮擦，再用付的錢減去總價。'});}
 const k=rand(2,8);return challengeNumber(`算式偵探：${a} × ${b} ${l===3?'−':'＋'} ${k} ＝ ？`,l===3?n-k:n+k,l,{explain:`先乘除、後加減：先算 ${a} × ${b} ＝ ${n}，再${l===3?'減':'加'} ${k}。`,hint:'先算乘法，再處理加減，注意運算順序。'});
}
function challengeBopo(m,l){const pool=l===3?READING_WORDS:READING_WORDS.slice(0,11),x=pick(pool);
 if(m===0)return quiz('聽完整詞語，找出正確的注音。',x[1],shuffle(pool.filter(z=>z!==x)).slice(0,3).map(z=>z[1]),{speech:x[0],listenOnly:true,explain:`${x[0]}：${x[1]}。`,hint:'先聽第一個音節，再聽第二個；注意聲調。'});
 if(m===1){const p=pick(BOPO),others=shuffle(BOPO.filter(z=>z[0]!==p[0])).slice(0,3);return quiz(`找出第一個字聲母是「${p[0]}」的詞語。`,p[2],others.map(z=>z[2]),{explain:`${p[2]}開頭的聲母是 ${p[0]}。`,hint:'先取第一個字，慢慢念出它開頭的聲音。'});}
 if(m===2){const tones=[['書','ㄕㄨ','一聲'],['鼠','ㄕㄨˇ','三聲'],['樹','ㄕㄨˋ','四聲'],['魚','ㄩˊ','二聲'],['雨','ㄩˇ','三聲'],['玉','ㄩˋ','四聲'],['媽媽第二個媽','˙ㄇㄚ','輕聲']];const p=pick(tones);return quiz(`「${p[0]}」正確的注音是哪一個？`,p[1],shuffle(tones.filter(z=>z!==p)).slice(0,3).map(z=>z[1]),{speech:p[0]==='媽媽第二個媽'?'媽媽':p[0],explain:`${p[0]}：${p[1]}，${p[2]}。`,hint:'聽字音的高低變化，注意聲調位置。'});}
 if(m===3){const chunks=x[1].split(' ');return sequence(`把「${x[0]}」的完整音節依序排好。`,chunks,{explain:`${x[0]}：${x[1]}。`,hint:'一張卡片是一個字的完整注音，先想第一個字。'});}
 if(m===4)return memory(shuffle(pool).slice(0,l===3?6:5).map(z=>[z[0],z[1]]),'讓生活詞語找到注音朋友，記住更多張卡片。');
 return quiz(`拼讀「${x[1]}」，找出正確詞語。`,x[0],shuffle(pool.filter(z=>z!==x)).slice(0,3).map(z=>z[0]),{explain:`${x[1]}，就是${x[0]}。`,hint:'先逐字拼讀，再把音節連起來；這一題沒有圖片提示。'});
}
function challengeEnglish(m,l){const pool=l===3?LONG_WORDS:[...WORDS,...LONG_WORDS.slice(0,8)],w=pick(pool);
 if(m===0){const len=l===3?4:3,start=rand(0,25-len),text=LETTERS.slice(start,start+len);return quiz(`選出「${text}」完整的小寫字母組。`,text.toLowerCase(),[text.toLowerCase().split('').reverse().join(''),text.slice(0,-1).toLowerCase()+LETTERS[start+len].toLowerCase(),text.toLowerCase().slice(1)+text[0].toLowerCase()],{explain:`${text} 對應 ${text.toLowerCase()}，字母順序也要相同。`,hint:'逐一檢查每個字母和位置，不只看第一個。'});}
 if(m===1)return quiz('聽英文單字，選出正確的中文意思。',w[2],shuffle(pool.filter(z=>z!==w)).slice(0,3).map(z=>z[2]),{speech:w[0],lang:'en-US',listenOnly:true,explain:`${w[0]} 是${w[2]}。`,hint:'可以重聽，留意開頭和結尾的聲音。'});
 if(m===2){const at=rand(0,w[0].length-2),answer=w[0].slice(at,at+2);return quiz(`補上連續兩個字母：${w[0].slice(0,at)}＿＿${w[0].slice(at+2)}（${w[2]}）`,answer,[answer.split('').reverse().join(''),answer[0]+pick(LETTERS.toLowerCase().split('').filter(c=>c!==answer[1])),pick(LETTERS.toLowerCase().split('').filter(c=>c!==answer[0]))+answer[1]],{speech:w[0],lang:'en-US',explain:`完整拼字是 ${w[0]}，缺少 ${answer}。`,hint:`先回想 ${w[2]} 的完整拼字，可以重聽英文。`});}
 if(m===3)return memory(shuffle(pool).slice(0,l===3?6:5).map(z=>[z[0],z[2]]),'翻開卡片，配對英文單字與中文意思。');
 if(m===4)return sequence(`排好字母，拼出「${w[2]}」。`,w[0].split(''),{explain:`${w[0]} 是${w[2]}。`,hint:`開頭字母是 ${w[0][0]}，共 ${w[0].length} 個字母。`,speech:w[0],lang:'en-US'});
 const clues=[['It is yellow. Monkeys like to eat it.','banana',['rabbit','pencil','cloud'],'黃色、猴子喜歡吃：banana，香蕉。'],['It has long ears. It can hop.','rabbit',['turtle','flower','school'],'長耳朵、會蹦跳：rabbit，兔子。'],['We use it to write and draw.','pencil',['tiger','banana','train'],'用來書寫和畫畫：pencil，鉛筆。'],['It has a shell. It walks slowly.','turtle',['monkey','orange','cloud'],'有殼、走得慢：turtle，烏龜。'],['It is in the sky. It can bring rain.','cloud',['house','carrot','book'],'在天空中，可能帶來雨：cloud，雲。']];const c=pick(clues);return quiz(c[0],c[1],c[2],{speech:c[0],lang:'en-US',explain:c[3],hint:'圈出你認識的字，再結合描述推理。'});
}
function challengeClock(m,l){const h=rand(1,12),min=l===3?rand(1,59):pick([5,10,15,20,25,35,40,45,50,55]);
 if(m===0||m===1){if(m===0)return quiz('讀出指針時鐘，留意短針也在移動。',timeText(h,min),[timeText(h%12+1,min),timeText(h,(min+5)%60),timeText((h+10)%12+1,min)],{clock:{h,m:min},explain:`現在 ${h} 點 ${min} 分。長針每一小格是 1 分鐘，短針隨分鐘往下一個小時移動。`,hint:'先確認短針剛走過哪個數字，再數長針的小格。'});return {type:'clock',q:`把時鐘撥到 ${h} 點 ${min} 分。`,target:{h,m:min},explain:`正確時間是 ${h} 點 ${min} 分，長針走 ${min} 小格。`,hint:l===3?'每個小刻度是 1 分鐘；用按鈕可以精確調整。':'每大格是 5 分鐘，長針和短針都要檢查。'};}
 if(m===2){const start=rand(7,9)*60,items=Array.from({length:l===3?6:5},(_,i)=>start+i*pick([10,15,20]));items.sort((a,b)=>a-b);const unique=[...new Set(items)];while(unique.length<(l===3?6:5))unique.push(unique.at(-1)+15);return sequence('把上午的活動時間，從早到晚排好。',unique.map((n,i)=>`${timeText(Math.floor(n/60),n%60)} ${['整理書包','出門','到校','閱讀','下課','運動'][i]}`),{hint:'先比較小時，小時相同再比較分鐘。',explain:'先看小時，再看分鐘，就能把時間按先後排列。'});}
 if(m===3){const hour=rand(13,22),mi=l===3?rand(1,59):pick([15,30,45]);return quiz(`24 小時制 ${timeText(hour,mi)}，是下午或晚上的幾點？`,timeText(hour-12,mi),[timeText(hour-11,mi),timeText(hour-12,(mi+15)%60),timeText(hour,mi)],{explain:`${hour} − 12 ＝ ${hour-12}，所以是下午或晚上 ${hour-12} 點 ${mi} 分。`,hint:'13 點之後，用小時減去 12，分鐘不變。'});}
 if(m===4){const delta=l===3?rand(35,115):pick([25,35,45,75,90]);const total=(h*60+min+delta)%720,nh=Math.floor(total/60)||12,nm=total%60;return quiz(`現在 ${h} 點 ${min} 分，活動持續 ${delta} 分鐘，結束時幾點？`,timeText(nh,nm),[timeText(nh%12+1,nm),timeText(nh,(nm+10)%60),timeText(h,min)],{clock:{h,m:min},explain:`${h} 點 ${min} 分加 ${delta} 分鐘，得到 ${nh} 點 ${nm} 分。每滿 60 分進 1 小時。`,hint:'可以先走到下一個整點，再加上剩下的分鐘。'});}
 const begin=rand(8,10)*60+pick([10,20,35,45]),duration=pick([25,35,45,65,80]),end=begin+duration;return challengeNumber(`上午 ${timeText(Math.floor(begin/60),begin%60)} 開始閱讀，到 ${timeText(Math.floor(end/60),end%60)} 結束，共讀了幾分鐘？`,duration,l,{explain:`把結束時間減去開始時間，共 ${duration} 分鐘。可先算到整點，再加剩下時間。`,hint:'一小時是 60 分鐘，跨整點時要分段計算。'});
}
function challengeLogic(m,l){
 if(m===0){const a=rand(1,5),step=rand(2,5),len=l===3?6:5,nums=Array.from({length:len},(_,i)=>l===3?a+step*i*(i+1)/2:a+step*i);return numberQuiz('觀察數字規律，下一個數字是多少？',l===3?a+step*len*(len+1)/2:a+step*len,{visual:nums.join('、')+'、？',smallVisual:true,explain:l===3?`相鄰差依序是 ${Array.from({length:len},(_,i)=>step*(i+1)).join('、')}。`:`每次增加 ${step}。`,hint:l===3?'先算相鄰兩個數的差，再看差的變化。':`比較前後兩數相差多少。`});}
 if(m===1){const nums=shuffle(Array.from({length:24},(_,i)=>i+1)).slice(0,l===3?8:6);return {type:'sort',q:'同時看兩個條件：是否大於 10，以及單數或雙數。',categories:['大於10・單數','大於10・雙數','不大於10・單數','不大於10・雙數'],items:nums.map(n=>[String(n),(n>10?'大於10':'不大於10')+'・'+(n%2?'單數':'雙數')]),explain:'先比較是否大於 10，再看除以 2 是否能剛好分完。10 屬於不大於 10。',hint:'尾數 0、2、4、6、8 是雙數，其餘是單數。'};}
 if(m===2)return sequence('小小實驗員，讓製作冰塊的步驟合理又安全。',['準備乾淨的製冰盒','將飲用水倒入格子','平放進冷凍庫','等待水結成冰','請大人協助取出冰塊'],{hint:'先準備、再操作，最後取出成果。',explain:'把複雜任務拆成準備、操作、等待、完成，更容易依序進行。'});
 if(m===3){const p=shuffle(['🐱','🐶','🐸','🌸','🌈','🍎','🦋','🌙']).slice(0,l===3?6:5);return {...memory(p.map((v,i)=>[v,String(i+1)]),'記住每個圖案對應的數字，再找出配對。'),preview:true};}
 if(m===4)return challengeMaze(l);
 const cases=[['甲比乙高，丙比甲高，丁比乙矮。誰最高？','丙',['甲','乙','丁'],'丙比甲高，甲比乙高，而丁比乙矮，所以丙最高。'],['紅盒不在最左邊，也不在最右邊。三個盒子排成一列，紅盒在哪？','中間',['最左邊','最右邊'],'排除兩端，剩下中間。'],['每隻兔子有 2 隻耳朵。看見 10 隻耳朵，有幾隻兔子？','5',['10','2','8'],'10 ÷ 2 ＝ 5。'],['四個人排隊，小安前面有 1 人，後面有幾人？','2',['1','3','4'],'扣掉前面 1 人和小安自己，4 − 1 − 1 ＝ 2。'],['今天是星期三，再過 9 天是星期幾？','星期五',['星期四','星期六','星期日'],'9 天是 1 星期再加 2 天，星期三加 2 天是星期五。']];const c=pick(l===2?cases.slice(0,4):cases);return quiz(c[0],c[1],c[2],{explain:c[3],hint:'把關係畫成位置或箭頭，逐一排除不符合的選項。'});
}
function challengeMaze(l){let walls,best=0;for(let tries=0;tries<40;tries++){const open=new Set([0]),seen=new Set([0]);function visit(p){for(const d of shuffle([-10,10,-2,2])){const n=p+d;if(n<0||n>24||Math.abs(n%5-p%5)+Math.abs(Math.floor(n/5)-Math.floor(p/5))!==2||seen.has(n))continue;seen.add(n);open.add(n);open.add(p+d/2);visit(n);}}visit(0);walls=Array.from({length:25},(_,i)=>i).filter(i=>!open.has(i));const q=[[0,0]],checked=new Set([0]);while(q.length){const [p,dist]=q.shift();if(p===24){best=dist;break;}for(const d of [-5,5,-1,1]){const n=p+d;if(n<0||n>24||(d===1&&p%5===4)||(d===-1&&p%5===0)||walls.includes(n)||checked.has(n))continue;checked.add(n);q.push([n,dist+1]);}}if(best>=(l===3?14:10))break;}return {type:'maze',q:'觀察岔路，帶小兔子繞過樹木找到星星！',walls,start:0,target:24,hint:'有些路是死路。試著記住岔路，走不通就退回來。',explain:`這張迷宮至少需要 ${best} 步可以到達。你也可以再找找自己的路線。`};}
