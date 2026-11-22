'use strict';

const FAMILY_STICKERS = [
  '美樂蒂・愛心禮物', '笑笑萌可・幸運草', '誠實萌可・星星',
  '美樂蒂・花朵招呼', '害羞萌可・蝴蝶結', '愛心萌可・救援隊長'
];
STICKERS.push(...FAMILY_STICKERS.map((name,frame)=>({name,frame,series:'救援夥伴',tier:2,family:true})));
STICKERS.push(
  {name:'大耳狗・星星禮物',frame:0,series:'雲朵夥伴',tier:0,dog:true},
  {name:'大耳狗・愛心抱抱',frame:1,series:'雲朵夥伴',tier:2,dog:true}
);
const BONUS_STICKERS=[
  '美樂蒂・草莓杯子蛋糕','美樂蒂・星星抱枕','美樂蒂・粉紅雨傘',
  '大耳狗・彩虹雲朵','大耳狗・麵包小廚師','大耳狗・月亮晚安'
];
STICKERS.push(...BONUS_STICKERS.map((name,frame)=>({
  name,frame,series:frame<3?'草莓夥伴':'雲朵夥伴',tier:frame%3,bonus:true,dog:frame>=3
})));

function familySprite(frame,label,mini=false) {
  return '<span class="family-sprite'+(mini?' mini':'')+'" role="img" aria-label="'+esc(label)+'" style="--sx:'+(frame%3*50)+'%;--sy:'+(Math.floor(frame/3)*100)+'%"></span>';
}

function rewardSticker(item) {
  if(item.bonus) return '<span class="family-sprite bonus-sticker" role="img" aria-label="'+esc(item.name)+'" style="--sx:'+item.frame%3*50+'%;--sy:'+Math.floor(item.frame/3)*100+'%"></span>';
  if (item.dog) return craftSprite(item.frame,item.name);
  return item.family ? familySprite(item.frame,item.name) : stickerSprite(item.frame,item.name);
}

function unclaimedStickers() {
  return STICKERS.map((_,index)=>index).filter(index=>!state.stickers.includes(index));
}

function awardStickerTurn() {
  state.stickerTurns=Math.min((state.stickerTurns||0)+1,unclaimedStickers().length);
}

function rewardChoices() {
  const remaining=unclaimedStickers();
  const pool=shuffle(remaining);
  const melody=pool.find(i=>stickerCategory(STICKERS[i])==='melody');
  const dog=pool.find(i=>stickerCategory(STICKERS[i])==='dog');
  const others=pool.find(i=>!['dog','melody'].includes(stickerCategory(STICKERS[i])));
  const preferred=[melody,dog,others].filter(Number.isInteger);
  return shuffle([...new Set([...preferred,...pool])].slice(0,3));
}

function rewardBoard() {
  const turns=state.stickerTurns||0;
  if (!turns) return '<p>完成冒險後就能翻牌。</p>';
  state.stickerOptions ||= rewardChoices();
  const options=state.stickerOptions.filter(i=>!state.stickers.includes(i));
  if (!options.length) {
    state.stickerOptions=rewardChoices();
    if (!state.stickerOptions.length) return '<p>角色貼紙全數收集完成！</p>';
    return rewardBoard();
  }
  return '<p>還有 '+turns+' 次翻牌機會。選一張，看看是誰！</p><div class="reward-deck">'+options.map((_,i)=>'<button class="reward-flip" data-reward-choice="'+i+'" aria-label="翻開第 '+(i+1)+' 張獎勵牌"><span aria-hidden="true">✦</span><small>翻牌</small></button>').join('')+'</div>';
}

function bindRewards() {
  const box=$('#reward-board');
  if (!box) return;
  if (state.stickerTurns) save();
  $$('[data-reward-choice]').forEach(button=>button.onclick=()=>{
    const index=state.stickerOptions.filter(i=>!state.stickers.includes(i))[+button.dataset.rewardChoice];
    if (index===undefined || !state.stickerTurns) return;
    const item=STICKERS[index];
    state.stickers.push(index);
    state.stickerTurns--;
    state.stickerOptions=null;
    save();
    sound('card');
    box.innerHTML='<div class="reward-revealed" role="status">'+rewardSticker(item)+'<div><strong>'+esc(item.name)+'</strong><p>已加入收藏！</p></div></div>'+ (state.stickerTurns ? '<button class="secondary" id="more-rewards">翻下一張獎勵</button>' : '');
    $('#more-rewards')?.addEventListener('click',()=>{box.innerHTML=rewardBoard();bindRewards();});
    $('#more-rewards')?.focus();
    if (page==='collection') paintStickerBook();
  });
}

function stickerCategory(sticker) {
  if (sticker.dog) return 'dog';
  if (sticker.name.startsWith('庫洛米')) return 'kuromi';
  if (sticker.name.startsWith('美樂蒂')) return 'melody';
  return 'ping';
}

function migrateCollection(progress) {
  if(progress.expandedStickerSets) return false;
  progress.posterUnlocks ||= {};
  for(const scene of ['dog','melody']) {
    const legacy=STICKERS.map((item,index)=>({item,index}))
      .filter(({item})=>!item.bonus&&stickerCategory(item)===scene);
    if(legacy.every(({index})=>progress.stickers.includes(index))) progress.posterUnlocks[scene]=true;
  }
  progress.expandedStickerSets=true;
  return true;
}

function paintStickerBook() {
  const book=$('#sticker-book');
  if (!book) return;
  $('#sticker-count').textContent=state.stickers.length+'／'+STICKERS.length;
  book.innerHTML=SCENE_PACKS.map((scene,sceneIndex)=>{
    const cards=STICKERS.map((item,i)=>({item,i})).filter(({item})=>stickerCategory(item)===scene.id);
    const collected=cards.filter(({i})=>state.stickers.includes(i)).length;
    const complete=collected===cards.length;
    const milestone=complete||state.posterUnlocks?.[scene.id]
      ? '<details class="set-poster"><summary>✦ 查看'+scene.character+'的收藏大圖</summary><div class="scene-art award-scene" style="'+sceneStyle(sceneIndex)+'" role="img" aria-label="'+scene.character+'收藏大圖"></div></details>'
      : '<p class="locked-poster">🔒 再收集 '+(cards.length-collected)+' 張，即可解鎖'+scene.character+'的收藏大圖。</p>';
    const stickerCards=cards.map(({item,i})=>{
      if (state.stickers.includes(i)) return '<article class="sticker character-card tier-'+item.tier+'">'+rewardSticker(item)+'<b>'+esc(item.name)+'</b><small>'+item.series+'</small></article>';
      return '<div class="sticker character-card locked" aria-label="尚未收藏的角色牌"><span class="locked-character" aria-hidden="true">?</span><small>'+item.series+' · 待收藏</small></div>';
    }).join('');
    return '<section class="sticker-set" id="set-'+scene.id+'"><header><h2>'+scene.character+'</h2><span>'+collected+'／'+cards.length+' 張'+(complete?' · 已集滿':'')+'</span></header>'+milestone+'<div class="sticker-grid character-grid">'+stickerCards+'</div></section>';
  }).join('');
  $$('.set-poster').forEach(details=>details.ontoggle=()=>{if(details.open) sound('unlock');});
}

function collectionPage() {
  shell('<section class="welcome"><div><h1>角色貼紙收藏</h1><p>已收藏 <strong id="sticker-count"></strong> 張</p></div></section><section id="reward-board" class="reward-box reward-board">'+rewardBoard()+'</section><nav class="collection-jumps" aria-label="收藏分類">'+SCENE_PACKS.map(scene=>'<a href="#set-'+scene.id+'">'+scene.character+'</a>').join('')+'</nav><div id="sticker-book"></div>');
  bindRewards();
  paintStickerBook();
}

function celebrationPage(title,subtitle,rescued=false) {
  sessionToken++;
  page='complete';
  game=null;
  const line=rescued ? '救援成功！' : pick(['太棒啦！','你過關啦！','耶，成功啦！']);
  const friends=rescued ? [['庫洛米',stickerSprite(4,'庫洛米')],['萌可',familySprite(5,'愛心萌可')],['美樂蒂',familySprite(3,'美樂蒂')],['獵魔女團',typeof hunterSprite==='function'?hunterSprite(1,'獵魔女團'):stickerSprite(2,'獵魔女團')],['大耳狗',craftSprite(1,'大耳狗')]]
    : [['庫洛米',stickerSprite(4,'庫洛米')],['萌可',familySprite(5,'愛心萌可')]];
  shell('<section class="celebrate character-celebration"><div id="cheer-stage" class="cheer-stage playing'+(rescued?' rescued':'')+'"><div class="cheer-spark spark-a" aria-hidden="true">✦</div><div class="cheer-spark spark-c" aria-hidden="true">♡</div>'+friends.map(([name,art],i)=>'<div class="cheer-friend '+(i%2?'heartsping':'kuromi')+'">'+art+'<span>'+name+'</span></div>').join('')+'</div><h1>'+esc(title)+'</h1><p>'+esc(subtitle)+'</p><button class="soft-btn replay-cheer" id="replay-cheer">♬ 再聽一次「'+esc(line)+'」</button><section class="reward-box reward-board" id="reward-board">'+rewardBoard()+'</section><div class="game-actions"><button class="secondary" id="see-collection">看看角色收藏</button><button class="primary" id="return-map">回冒險地圖 →</button></div></section>');
  bindRewards();
  $('#see-collection').onclick=()=>navigate('collection');
  $('#return-map').onclick=()=>navigate('home');
  $('#replay-cheer').onclick=()=>playCartoonCheer(line,true);
  window.scrollTo({top:0,behavior:'instant'});
  playCartoonCheer(line);
}

function playCartoonCheer(line,replay=false) {
  if (replay) {
    const stage=$('#cheer-stage');
    stage.classList.remove('playing');
    void stage.offsetWidth;
    stage.classList.add('playing');
  }
  sound('win');
  confetti();
  if (state.voice) speak(line,'zh-TW',false,1.28,1.65);
}
