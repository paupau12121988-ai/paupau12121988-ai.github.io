'use strict';

const BOARD_GAMES = {
  gomoku:{name:'五子棋', size:13, description:'橫、直或斜線連成五顆棋子即可獲勝。'},
  go:{name:'九路圍棋', size:9, description:'用棋子圍地並提掉沒有氣的棋子。雙方連續停一手後數地。'}
};
const FOUR_DIRECTIONS=[[1,0],[0,1],[1,1],[1,-1]];
let match=null, botTimer;

function boardNeighbors(index,size) {
  const x=index%size,y=Math.floor(index/size);
  return [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]
    .filter(([a,b])=>a>=0&&b>=0&&a<size&&b<size).map(([a,b])=>b*size+a);
}

function groupAndLiberties(board,index,size) {
  const color=board[index], stones=new Set([index]), liberties=new Set();
  for (const stone of stones) {
    for(const neighbor of boardNeighbors(stone,size)) {
      if (!board[neighbor]) liberties.add(neighbor);
      else if (board[neighbor]===color) stones.add(neighbor);
    }
  }
  return {stones,liberties};
}

function goPlace(board,index,color,size,previous) {
  if (board[index]) return {error:'這裡已經有棋子。'};
  const next=[...board];
  next[index]=color;
  let captured=0;
  for(const neighbor of boardNeighbors(index,size)) {
    if(next[neighbor]!==3-color) continue;
    const group=groupAndLiberties(next,neighbor,size);
    if(group.liberties.size) continue;
    for(const stone of group.stones) next[stone]=0;
    captured+=group.stones.size;
  }
  if(!groupAndLiberties(next,index,size).liberties.size) return {error:'這顆棋會沒有氣，請換一個位置。'};
  if(next.join('')===previous) return {error:'打劫時要先下在別處，才能再提回來。'};
  return {board:next,captured};
}

function goArea(board,size) {
  const totals=[0,0,0], seen=new Set();
  for(let i=0;i<board.length;i++) {
    const color=board[i];
    if(color) {totals[color]++;continue;}
    if(seen.has(i)) continue;
    const area=new Set([i]), borders=new Set();
    for(const point of area) {
      seen.add(point);
      for(const adjacent of boardNeighbors(point,size)) {
        if(board[adjacent]) borders.add(board[adjacent]);
        else area.add(adjacent);
      }
    }
    if(borders.size===1) totals[borders.values().next().value]+=area.size;
  }
  // Beginner area scoring: keep every stone on the board and give white 6.5 points.
  return [totals[1],totals[2]+6.5];
}

function gomokuLine(board,index,color,size) {
  const x=index%size,y=Math.floor(index/size);
  let best=[];
  for(const [dx,dy] of FOUR_DIRECTIONS) {
    const line=[index];
    for(const sign of [-1,1]) {
      for(let step=1;step<size;step++) {
        const a=x+dx*step*sign,b=y+dy*step*sign;
        if(a<0||a>=size||b<0||b>=size||board[b*size+a]!==color) break;
        line.push(b*size+a);
      }
    }
    if(line.length>best.length) best=line;
  }
  return best;
}

function beginMatch(kind,computer) {
  clearTimeout(botTimer);
  const {size}=BOARD_GAMES[kind];
  match={kind,computer,size,board:Array(size*size).fill(0),turn:1,captures:[0,0,0],
    previous:null,passes:0,count:0,last:-1,winners:[],result:'',notice:''};
  page='boardgame';
  boardGamePage();
  window.scrollTo({top:0,behavior:'instant'});
}

function boardGamePage() {
  const g=match, info=BOARD_GAMES[g.kind];
  const turn=g.turn===1?'黑棋':'白棋';
  const handicaps=g.kind==='go'
    ? '<p>入門數地採「棋子＋圍住的空點」，白棋加 6.5 點。終局保留盤上棋子，不另判死活。</p><p>黑棋提 '+g.captures[1]+' 子，白棋提 '+g.captures[2]+' 子</p>'
    : '<p>自由規則，連成五顆或更多即勝。</p>';
  shell('<section class="activity-page"><button class="back" id="board-back">← 棋類與拼圖</button><h1>'+info.name+'</h1><p>'+info.description+'</p>'
    +'<div class="board-status" role="status">'+esc(g.result||g.notice||(g.computer&&g.turn===2?'電腦正在思考…':'輪到'+turn))+'</div>'
    +'<div class="game-board" style="--size:'+g.size+'" aria-label="'+info.name+'棋盤">'
    +g.board.map((stone,i)=>'<button class="intersection'+(i===g.last?' last':'')+(g.winners.includes(i)?' win':'')+'" data-intersection="'+i+'" aria-label="第 '+(Math.floor(i/g.size)+1)+' 行第 '+(i%g.size+1)+' 列，'+(stone?stone===1?'黑棋':'白棋':'空位')+'" '+(stone||g.result||g.computer&&g.turn===2?'disabled':'')+'><i class="stone stone-'+stone+'"></i></button>').join('')
    +'</div><div class="game-actions">'+(g.kind==='go'?'<button class="secondary" id="pass-go" '+(g.result||g.computer&&g.turn===2?'disabled':'')+'>停一手</button>':'')
    +'<button class="secondary" id="new-match">重新開局</button></div><div class="game-rules">'+handicaps+'</div>'
    +(g.result?'<div id="reward-board" class="reward-box reward-board">'+rewardBoard()+'</div>':'')+'</section>','arcade');
  $('#board-back').onclick=()=>{clearTimeout(botTimer);navigate('arcade');};
  $('#new-match').onclick=()=>beginMatch(g.kind,g.computer);
  $('#pass-go')?.addEventListener('click',()=>playMove(-1));
  $$('[data-intersection]').forEach(button=>button.onclick=()=>playMove(+button.dataset.intersection));
  if(g.result) bindRewards();
}

function finishMatch(result) {
  match.result=result;
  awardStickerTurn();
  state.sessions++;
  save();
  sound('win');
  if(state.motion) confetti();
}

function playMove(index) {
  const g=match;
  if(page!=='boardgame'||g.result) return;
  g.notice='';
  const color=g.turn;
  if(g.kind==='go') {
    if(index<0) {
      g.passes++;
      g.previous=g.board.join('');
      sound('pass');
      if(g.passes===2) {
        const [black,white]=goArea(g.board,g.size);
        finishMatch((black>white?'黑棋':'白棋')+'獲勝！黑棋 '+black+' 點，白棋 '+white+' 點。');
      }
    } else {
      const result=goPlace(g.board,index,color,g.size,g.previous);
      if(result.error) {g.notice=result.error;sound('hint');boardGamePage();return;}
      g.previous=g.board.join('');
      g.board=result.board;
      g.captures[color]+=result.captured;
      g.passes=0;
      g.last=index;
      sound(result.captured?'capture':'stone');
    }
  } else {
    if(g.board[index]) return;
    g.board[index]=color;
    g.last=index;
    const line=gomokuLine(g.board,index,color,g.size);
    sound('stone');
    if(line.length>=5) {g.winners=line;finishMatch((color===1?'黑棋':'白棋')+'連成五子，獲勝！');}
    else if(g.board.every(Boolean)) finishMatch('棋盤已滿，這局是和棋。');
  }
  if(index>=0) g.count++;
  g.turn=3-color;
  boardGamePage();
  if(g.result||!g.computer||g.turn!==2) return;
  clearTimeout(botTimer);
  botTimer=setTimeout(()=>{
    if(page==='boardgame'&&match===g&&!g.result&&g.turn===2) playMove(computerMove(g));
  },420);
}

function computerMove(g) {
  const center=(g.size-1)/2;
  if(g.kind==='go'&&(g.count>=g.size*g.size*.80 || g.passes&&g.count>=16)) return -1;
  let choice=-1,best=-Infinity;
  for(let i=0;i<g.board.length;i++) {
    if(g.board[i]) continue;
    const distance=Math.abs(i%g.size-center)+Math.abs(Math.floor(i/g.size)-center);
    let score=-distance*.25+Math.random()*.2;
    if(g.kind==='gomoku') {
      const own=gomokuLine(g.board,i,2,g.size).length;
      const opponent=gomokuLine(g.board,i,1,g.size).length;
      score+=own>=5?10000:opponent>=5?9000:Math.pow(7,own)+Math.pow(6,opponent);
    } else {
      const res=goPlace(g.board,i,2,g.size,g.previous);
      if(res.error) continue;
      const group=groupAndLiberties(res.board,i,g.size);
      const near=boardNeighbors(i,g.size).filter(point=>g.board[point]===1).length;
      score+=res.captured*16+Math.min(group.liberties.size,5)+near*1.8;
      if(group.liberties.size===1) score-=13;
    }
    if(score>best) {choice=i;best=score;}
  }
  return choice;
}
