'use strict';

const SCENE_PACKS=[
  {id:'kuromi',character:'庫洛米',name:'月光遊樂園'},
  {id:'melody',character:'美樂蒂',name:'草莓茶會'},
  {id:'dog',character:'大耳狗',name:'雲朵麵包店'},
  {id:'ping',character:'萌可家族',name:'彩虹瀑布花園'}
];
const PIECE_COLS=10, PIECE_ROWS=5, PIECE_COUNT=PIECE_COLS*PIECE_ROWS;
const SECRET_SCENE=SCENE_PACKS.length;
const SECRET_TITLE='福岡家庭旅行';
let pictureGame;
function sceneStyle(index) {
  return '--scene-x:'+(index%2*100)+'%;--scene-y:'+(Math.floor(index/2)*100)+'%';
}
function sceneArt(index,label) {
  if(index===SECRET_SCENE) return '<div class="scene-art secret-picture" role="img" aria-label="'+esc(label)+'"></div>';
  return '<div class="scene-art" style="'+sceneStyle(index)+'" role="img" aria-label="'+esc(label)+'"></div>';
}

function puzzleWasCleared(scene, progress=state) {
  const tiles=progress.puzzleTiles?.[scene];
  return progress.puzzleCleared?.[scene]===true ||
    (Array.isArray(tiles) && tiles.length===PIECE_COUNT && tiles.every((tile,i)=>tile===i));
}

function secretPuzzleUnlocked(progress=state) {
  return SCENE_PACKS.every((_,i)=>puzzleWasCleared(i,progress));
}

function arcadePage() {
  const completed=SCENE_PACKS.filter((_,i)=>puzzleWasCleared(i)).length;
  const secret=secretPuzzleUnlocked()
    ? '<aside class="secret-card"><h3>🔓 隱藏關卡已解鎖</h3><p>'+SECRET_TITLE+' · 50 片拼圖</p><button class="primary" data-puzzle="'+SECRET_SCENE+'">開始隱藏拼圖</button></aside>'
    : '<aside class="secret-card"><h3>🔒 隱藏拼圖</h3><p>完成四張角色拼圖即可解鎖 · 已完成 '+completed+'／4 張</p></aside>';
  shell('<section class="activity-page"><h1>棋類與拼圖</h1><div class="arcade-block"><h2>棋類對弈</h2><div class="arcade-boards">'
    +Object.entries(BOARD_GAMES).map(([key,details])=>'<article><span class="arcade-board-icon" aria-hidden="true">'+(key==='go'?'⚪':'⚫')+'</span><h3>'+details.name+'</h3><p>'+details.description+'</p><div class="arcade-buttons"><button class="primary" data-board="'+key+'" data-bot="true">對電腦</button><button class="secondary" data-board="'+key+'" data-bot="false">雙人輪流</button></div></article>').join('')
    +'</div></div><div class="arcade-block"><h2>角色拼圖與找不同</h2><div class="scene-grid">'
    +SCENE_PACKS.map((scene,i)=>'<article class="scene-card">'+sceneArt(i,scene.character+'的'+scene.name)+'<div><h3>'+scene.character+' · '+scene.name+'</h3>'+(puzzleWasCleared(i)?'<p class="puzzle-done-label">✓ 拼圖已完成</p>':'')+'<div class="arcade-buttons"><button class="primary" data-puzzle="'+i+'">50 片拼圖</button><button class="secondary" data-diff="'+i+'">兩張圖找不同</button></div></div></article>').join('')
    +'</div>'+secret+'</div></section>','arcade');
  $$('[data-board]').forEach(b=>b.onclick=()=>beginMatch(b.dataset.board,b.dataset.bot==='true'));
  $$('[data-puzzle]').forEach(b=>b.onclick=()=>beginPuzzle(+b.dataset.puzzle));
  $$('[data-diff]').forEach(b=>b.onclick=()=>beginDifferences(+b.dataset.diff));
}

function pieceStyle(scene,piece) {
  if(scene===SECRET_SCENE) return 'background-position:'+(piece%PIECE_COLS)/(PIECE_COLS-1)*100+'% '+Math.floor(piece/PIECE_COLS)/(PIECE_ROWS-1)*100+'%';
  const column=(scene%2)*PIECE_COLS+piece%PIECE_COLS;
  const row=Math.floor(scene/2)*PIECE_ROWS+Math.floor(piece/PIECE_COLS);
  return 'background-position:'+column/(PIECE_COLS*2-1)*100+'% '+row/(PIECE_ROWS*2-1)*100+'%';
}

function shuffledPieces() {
  const tiles=Array.from({length:PIECE_COUNT},(_,i)=>i);
  for(let i=tiles.length-1;i>0;i--) {
    const j=rand(0,i);
    [tiles[i],tiles[j]]=[tiles[j],tiles[i]];
  }
  if(tiles.every((tile,i)=>tile===i)) [tiles[0],tiles[1]]=[tiles[1],tiles[0]];
  return tiles;
}

function beginPuzzle(scene,reset=false) {
  if(!Number.isInteger(scene)||scene<0||scene>SECRET_SCENE||(scene===SECRET_SCENE&&!secretPuzzleUnlocked())) return;
  state.puzzleTiles ||= {};
  state.puzzleCleared ||= {};
  if(puzzleWasCleared(scene)) state.puzzleCleared[scene]=true;
  const tiles=!reset&&state.puzzleTiles[scene] ? [...state.puzzleTiles[scene]] : shuffledPieces();
  pictureGame={scene,tiles,selection:null,preview:false,done:false};
  pictureGame.done=tiles.every((tile,i)=>tile===i);
  state.puzzleTiles[scene]=[...tiles];
  save();
  page='puzzle';
  const title=scene===SECRET_SCENE?SECRET_TITLE+' · 隱藏拼圖':SCENE_PACKS[scene].character+' · '+SCENE_PACKS[scene].name;
  shell('<section class="activity-page"><button class="back" id="picture-back">← 棋類與拼圖</button><h1>'+title+'</h1><p>選一片，再點另一片交換。也可以拖曳拼片。</p><div class="game-actions"><button class="secondary" id="puzzle-preview" aria-expanded="false">看完整圖</button><button class="secondary" id="puzzle-shuffle">重新打散</button></div><div id="puzzle-view"></div><div id="picture-reward"></div></section>','arcade');
  $('#picture-back').onclick=()=>navigate('arcade');
  $('#puzzle-shuffle').onclick=()=>beginPuzzle(scene,true);
  $('#puzzle-preview').onclick=()=>{
    pictureGame.preview=!pictureGame.preview;
    $('#puzzle-preview').setAttribute('aria-expanded',pictureGame.preview);
    $('#puzzle-preview').textContent=pictureGame.preview?'收起完整圖':'看完整圖';
    paintPuzzle();
  };
  paintPuzzle();
  if(pictureGame.done) $('#picture-reward').textContent='這張拼圖已完成！';
  window.scrollTo({top:0,behavior:'instant'});
}

function swapPieces(tiles,from,to) {
  [tiles[from],tiles[to]]=[tiles[to],tiles[from]];
  return tiles.every((tile,i)=>tile===i);
}

function movePiece(from,to) {
  const g=pictureGame;
  if(g.done||from===to||!Number.isInteger(from)||from<0||from>=PIECE_COUNT) return;
  g.selection=null;
  const wasUnlocked=secretPuzzleUnlocked();
  g.done=swapPieces(g.tiles,from,to);
  state.puzzleTiles[g.scene]=[...g.tiles];
  if(g.done) state.puzzleCleared[g.scene]=true;
  save();
  sound('swap');
  paintPuzzle();
  if(g.done) pictureWon('50 片拼圖完成！',!wasUnlocked&&secretPuzzleUnlocked());
  else $('[data-piece="'+to+'"]')?.focus({preventScroll:true});
}

function paintPuzzle() {
  const g=pictureGame;
  const correct=g.tiles.filter((tile,i)=>tile===i).length;
  const secret=g.scene===SECRET_SCENE;
  const title=secret?SECRET_TITLE:SCENE_PACKS[g.scene].name;
  $('#puzzle-view').innerHTML=(g.preview?'<div class="puzzle-reference">'+sceneArt(g.scene,title+'完整圖')+'</div>':'')
    +'<p class="board-status" role="status">'+correct+'／'+PIECE_COUNT+' 片已到位</p>'
    +'<div class="puzzle-grid'+(g.done?' finished':'')+(secret?' secret-grid':'')+'" aria-label="50 片拼圖">'
    +g.tiles.map((tile,i)=>'<button class="puzzle-piece'+(g.selection===i?' selected':'')+'" data-piece="'+i+'" aria-label="第 '+(i+1)+' 格拼片" aria-pressed="'+(g.selection===i)+'" style="'+pieceStyle(g.scene,tile)+'" '+(g.done?'disabled':'')+' draggable="'+!g.done+'"></button>').join('')
    +'</div>';
  for(const piece of $$('[data-piece]')) {
    const index=+piece.dataset.piece;
    piece.onclick=()=>{
      if(g.selection===null||g.selection===index) {
        g.selection=g.selection===index?null:index;
        piece.classList.toggle('selected',g.selection===index);
        piece.setAttribute('aria-pressed',g.selection===index);
        sound('select');
      } else movePiece(g.selection,index);
    };
    piece.ondragstart=e=>e.dataTransfer.setData('text/plain',String(index));
    piece.ondragover=e=>e.preventDefault();
    piece.ondrop=e=>{
      e.preventDefault();
      const from=e.dataTransfer.getData('text/plain');
      if(from!=='') movePiece(Number(from),index);
    };
  }
}

function pictureWon(message,secretUnlocked=false) {
  awardStickerTurn();
  state.sessions++;
  save();
  const panel=$('#picture-reward');
  panel.innerHTML='<section class="reward-box reward-board" aria-label="完成獎勵"><h2>'+message+'</h2><div id="reward-board">'+rewardBoard()+'</div>'
    +(secretUnlocked?'<p>四張角色拼圖全部完成！</p><button class="primary" id="unlock-secret">開始隱藏拼圖 →</button>':'')+'</section>';
  $('#unlock-secret')?.addEventListener('click',()=>beginPuzzle(SECRET_SCENE));
  bindRewards();
  playCartoonCheer('太棒啦！');
}

