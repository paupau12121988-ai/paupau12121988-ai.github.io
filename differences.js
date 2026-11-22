'use strict';

// 每個角色有 20 張「原圖構圖變化」關卡；每關固定 10 個差異，包含新增、消失、大小、方向與圖案改變。
const DIFFERENCE_LEVELS=20;
const DIFFERENCE_REGIONS=[
  [
    ['左上氣球',125,55,42,47],['月亮',464,64,47,49],['帳篷屋頂',73,158,60,25],['庫洛米的粉色頭飾',357,217,34,25],['庫洛米的提包',277,365,34,39],
    ['右邊的路燈',713,296,24,28],['右下紫花',678,456,54,37],['入口旗幟',255,121,35,30],['星星燈串',522,149,36,30],['左側糖果車',184,374,43,35]
  ],[
    ['左上玫瑰',62,65,48,35],['美樂蒂的蝴蝶結',323,208,58,35],['草莓籃上的緞帶',120,405,37,32],['茶壺上的草莓',275,392,25,25],['右側門板',591,167,35,58],
    ['桌上的草莓蛋糕',477,377,46,36],['右下玫瑰',707,469,48,32],['桌邊茶杯',390,399,32,30],['窗邊愛心',681,130,29,27],['左側小花',202,294,32,31]
  ],[
    ['麵包店招牌',353,95,39,30],['中間的熱氣球',450,53,38,43],['右邊的熱氣球',689,51,32,39],['屋頂的黃色星星',194,32,21,18],['大耳狗的帽帶',433,224,43,18],
    ['大耳狗的圍裙',464,375,48,33],['右下繡球花',701,452,48,34],['麵包籃',280,398,37,31],['雲朵招牌',127,123,43,30],['左邊窗戶',80,286,38,38]
  ],[
    ['左上垂掛的水晶',65,95,30,40],['萌可頭上的愛心',294,125,36,29],['魔法棒的愛心',445,181,27,24],['害羞萌可的頭髮',658,141,45,31],['左下的紅花',48,441,44,41],
    ['右下的水晶',712,332,32,40],['左邊萌可的四葉草',79,293,27,25],['瀑布泡泡',529,351,36,31],['花園拱門',377,83,40,33],['右側彩虹',689,237,41,35]
  ]
].map(rows=>rows.map(([label,x,y,rx,ry])=>({label,x,y,rx,ry})));
const DIFFERENCE_MUTATIONS=['add','remove','shrink','rotate','pattern','swap','grow','ribbon','tint','sparkle'];

function differenceVariant(scene,level) {
  return DIFFERENCE_REGIONS[scene].map((region,index)=>({...region,type:DIFFERENCE_MUTATIONS[(index+level*3)%DIFFERENCE_MUTATIONS.length],variant:level}));
}
function drawDifferenceRegions(scene,level=0) {
  const ids=Array.from({length:DIFFERENCE_REGIONS[scene].length},(_,i)=>i);
  for(let i=ids.length-1;i>0;i--){const j=rand(0,i);[ids[i],ids[j]]=[ids[j],ids[i]];}
  return ids;
}
function beginDifferences(scene,level=0) {
  pictureGame={kind:'differences',scene,level:Math.max(0,level%DIFFERENCE_LEVELS),changed:drawDifferenceRegions(scene,level),found:[],done:false};
  page='differences';paintDifferences();window.scrollTo({top:0,behavior:'instant'});
}
function differenceCoordinates(region) {return {x:region.x/768*100,y:region.y/512*100,rx:region.rx/768*100,ry:region.ry/512*100};}
function objectPatch(scene,region) {
  const {x,y,rx,ry}=differenceCoordinates(region), size=Math.max(rx,ry)*2;
  return '<div class="object-patch patch-'+region.type+'" aria-hidden="true" style="--patch-x:'+x+'%;--patch-y:'+y+'%;--patch-w:'+Math.max(6,rx*2)+'%;--patch-h:'+Math.max(7,ry*2)+'%;--patch-size:'+size+'px;--patch-turn:'+(region.variant%4*90)+'deg"></div>';
}
function objectSpot(region,index,found,right) {
  const {x,y,rx,ry}=differenceCoordinates(region), position='left:'+x+'%;top:'+y+'%;width:'+Math.max(8,rx*2)+'%;height:'+Math.max(10,ry*2)+'%';
  // 兩張圖都可以點選。孩子常會先在原圖發現線索；舊版只有右圖能按，
  // 在觸控裝置上很容易誤以為關卡失效。
  return '<button class="object-spot'+(found?' found':'')+'" data-spot="'+index+'" style="'+position+'" aria-label="'+(found?region.label+'，已找到':(right?'查看變化圖的':'查看原圖的')+region.label)+'" '+(found?'disabled':'')+'>'+(found?'✓':'')+'</button>';
}
function differenceScene(g,right) {
  const regions=differenceVariant(g.scene,g.level), patches=right?g.changed.map(i=>objectPatch(g.scene,regions[i])).join(''):'';
  return '<figure><figcaption>'+(right?'變化圖':'原圖')+'</figcaption><div class="scene-art compare-board object-board level-'+(g.level%5)+'" style="'+sceneStyle(g.scene)+';--scene-variant:'+g.level+'">'+patches+regions.map((region,i)=>objectSpot(region,i,g.found.includes(i),right)).join('')+'</div></figure>';
}
function paintDifferences() {
  const g=pictureGame,title=SCENE_PACKS[g.scene];
  shell('<section class="activity-page"><button class="back" id="picture-back">← 棋類與拼圖</button><h1>'+title.character+' · 找不同</h1><p>第 '+(g.level+1)+'／'+DIFFERENCE_LEVELS+' 張構圖挑戰：兩張圖有 <strong>10 處</strong>不同。除了變色，還藏了新增、消失、縮放、旋轉與圖案改變。</p><div class="diff-levels" aria-label="找不同關卡選擇">'+Array.from({length:DIFFERENCE_LEVELS},(_,i)=>'<button data-diff-level="'+i+'" class="'+(i===g.level?'current':'')+'" aria-label="第 '+(i+1)+' 張">'+(i+1)+'</button>').join('')+'</div><p class="board-status" role="status">找到 '+g.found.length+'／'+g.changed.length+' 處</p><div class="compare-pair">'+differenceScene(g,false)+differenceScene(g,true)+'</div><div id="picture-reward"></div><div class="game-actions"><button class="secondary" id="diff-retry">重看這張</button><button class="primary" id="diff-next">下一張構圖 →</button></div></section>','arcade');
  $('#picture-back').onclick=()=>navigate('arcade');$('#diff-retry').onclick=()=>beginDifferences(g.scene,g.level);$('#diff-next').onclick=()=>beginDifferences(g.scene,(g.level+1)%DIFFERENCE_LEVELS);$$('[data-diff-level]').forEach(button=>button.onclick=()=>beginDifferences(g.scene,+button.dataset.diffLevel));
  const inspect=event=>{if(g.done)return;const spot=event.target.closest('[data-spot]'),index=spot?+spot.dataset.spot:-1;if(index<0||g.found.includes(index))return;if(!g.changed.includes(index)){sound('hint');$('.board-status').textContent='找到 '+g.found.length+'／10 處，這裡相同，再仔細看物件的形狀、數量和方向。';return;}g.found.push(index);g.done=g.found.length===g.changed.length;sound('found');paintDifferences();$('.board-status').textContent+='，找到「'+differenceVariant(g.scene,g.level)[index].label+'」！';if(g.done)pictureWon('10 處不同全部找到！');else $$('[data-spot]').find(button=>!button.disabled)?.focus({preventScroll:true});};
  $$('.object-board').forEach(board=>board.onclick=inspect);
}
