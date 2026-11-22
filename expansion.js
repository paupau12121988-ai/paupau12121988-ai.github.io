'use strict';

const EXTRA_MODES = {
  math: ['夜市算帳', '平均分與剩下', '數字密碼'],
  bopo: ['拼出完整詞語', '聲調小偵探', '句子注音接力'],
  logic: ['座位推理', '路線指令', '重量小天平']
};

for (const world of WORLDS) {
  if (EXTRA_MODES[world.id]) world.modes.push(...EXTRA_MODES[world.id]);
}

const SPELLING_WORDS = [
  ['圖書館', 'ㄊㄨˊ ㄕㄨ ㄍㄨㄢˇ'],
  ['腳踏車', 'ㄐㄧㄠˇ ㄊㄚˋ ㄔㄜ'],
  ['紅綠燈', 'ㄏㄨㄥˊ ㄌㄩˋ ㄉㄥ'],
  ['紅蘿蔔', 'ㄏㄨㄥˊ ㄌㄨㄛˊ ˙ㄅㄛ'],
  ['運動會', 'ㄩㄣˋ ㄉㄨㄥˋ ㄏㄨㄟˋ'],
  ['圖畫書', 'ㄊㄨˊ ㄏㄨㄚˋ ㄕㄨ'],
  ['西瓜汁', 'ㄒㄧ ㄍㄨㄚ ㄓ'],
  ['自來水', 'ㄗˋ ㄌㄞˊ ㄕㄨㄟˇ'],
  ['公車站', 'ㄍㄨㄥ ㄔㄜ ㄓㄢˋ'],
  ['玩具店', 'ㄨㄢˊ ㄐㄩˋ ㄉㄧㄢˋ']
];
const SPELLING_SENTENCES = [
  ['我愛看書', 'ㄨㄛˇ ㄞˋ ㄎㄢˋ ㄕㄨ'],
  ['今天下雨', 'ㄐㄧㄣ ㄊㄧㄢ ㄒㄧㄚˋ ㄩˇ'],
  ['小鳥飛了', 'ㄒㄧㄠˇ ㄋㄧㄠˇ ㄈㄟ ˙ㄌㄜ'],
  ['大家早安', 'ㄉㄚˋ ㄐㄧㄚ ㄗㄠˇ ㄢ'],
  ['我想畫畫', 'ㄨㄛˇ ㄒㄧㄤˇ ㄏㄨㄚˋ ㄏㄨㄚˋ'],
  ['公車來了', 'ㄍㄨㄥ ㄔㄜ ㄌㄞˊ ˙ㄌㄜ'],
  ['明天見面', 'ㄇㄧㄥˊ ㄊㄧㄢ ㄐㄧㄢˋ ㄇㄧㄢˋ'],
  ['小狗跑了', 'ㄒㄧㄠˇ ㄍㄡˇ ㄆㄠˇ ˙ㄌㄜ']
];

function expansionTask(world, mode, level) {
  const advanced = level >= 2;
  if (world === 'math') {
    const price = rand(advanced ? 12 : 2, advanced ? 25 : 8);
    const count = rand(2, advanced ? 7 : 4);
    const extra = rand(3, 9);
    const total = price * count + extra;
    if (mode === 6) {
      if (!advanced) return numberQuiz('一份米糕 ' + price + ' 元，一杯豆漿 ' + extra + ' 元。各買一份共幾元？', price + extra, {hint:'把兩樣東西的價錢加起來。', explain:price + ' ＋ ' + extra + ' ＝ ' + (price + extra) + ' 元。'});
      const discount = rand(5, 12);
      const pay = Math.ceil(total / 100) * 100;
      return challengeNumber('飯糰每個 ' + price + ' 元，買 ' + count + ' 個，再買 ' + extra + ' 元的飲料。結帳折 ' + discount + ' 元，付 ' + pay + ' 元，找回幾元？', pay - total + discount, level, {
        hint:'先算飯糰總價，加飲料再扣折扣，最後用付的錢減去實付金額。',
        explain:price + ' × ' + count + ' ＋ ' + extra + ' − ' + discount + ' ＝ ' + (total - discount) + ' 元，找回 ' + (pay - total + discount) + ' 元。'
      });
    }
    if (mode === 7) {
      const perBox = rand(3, advanced ? 9 : 5), boxes = rand(2, advanced ? 12 : 4);
      const remainder = rand(1, perBox - 1), supply = boxes * perBox + remainder;
      const question = supply + ' 顆糖果，每盒放 ' + perBox + ' 顆。';
      return challengeNumber(question + (level === 3 ? '要把糖果全部裝進盒子，最少用幾盒？' : '最多能裝滿幾盒？'), level === 3 ? boxes + 1 : boxes, level, {
        visual:advanced ? '' : Array.from({length:boxes},()=> '🍬'.repeat(perBox)).concat('🍬'.repeat(remainder)).join('　'),
        smallVisual:!advanced, hint:'先找可以裝滿的盒數，再看看有沒有剩下。',
        explain:supply + ' ÷ ' + perBox + ' ＝ ' + boxes + ' 餘 ' + remainder + '。' + (level === 3 ? '剩下的糖果還要一盒。' : '有 ' + boxes + ' 盒裝滿。')
      });
    }
    const a = rand(2, 9), b = rand(2, 9);
    return challengeNumber(advanced ? '（□ ＋ ' + a + '）× ' + b + ' ＝ ' + ((count + a) * b) : '□ ＋ ' + a + ' ＝ ' + (count + a), count, level, {
      hint:advanced ? '先除以括號外的數，再減去括號裡已知的數。' : '用右邊的總數減去已知的數。',
      explain:advanced ? ((count + a) * b) + ' ÷ ' + b + ' − ' + a + ' ＝ ' + count + '。' : (count + a) + ' − ' + a + ' ＝ ' + count + '。'
    });
  }

  if (world === 'bopo') {
    const pool = advanced ? SPELLING_WORDS : READING_WORDS.slice(0, 11);
    const [word, pronunciation] = pick(pool);
    if (mode === 6) {
      return sequence('聽一聽，把「' + word + '」的注音卡排好。', pronunciation.split(' '), {
        speech:word, hint:'每張卡片是一個字，從第一個字開始。', explain:word + '：' + pronunciation
      });
    }
    if (mode === 7) {
      const parts = pronunciation.split(' '), selected = rand(0, parts.length - 1);
      const answer = parts[selected], base = answer.replace(/[ˊˇˋ˙]/g,'');
      const variants = [base, base + 'ˊ', base + 'ˇ', base + 'ˋ', '˙' + base].filter(option=>option!==answer);
      parts[selected] = '□';
      return quiz('聽「' + word + '」，選出第 ' + (selected + 1) + ' 個字的正確注音。', answer, variants, {
        visual:parts.join('　'), speech:word, hint:'每個選項的聲音接近，請留意聲調。', explain:word + '：' + pronunciation
      });
    }
    const [sentence, sounds] = pick(advanced ? SPELLING_SENTENCES : READING_WORDS.slice(0,11));
    if (level === 3) {
      const [first,...rest] = sounds.split(' ');
      return sequence('聽句子，把缺少的注音音節依序補上。', rest, {
        visual:first + '　' + rest.map(()=> '□').join('　'), speech:sentence, listenOnly:true,
        hint:'第一個音節已放好。從第二個字開始聽。', explain:sentence + '：' + sounds
      });
    }
    return sequence('把「' + sentence + '」依序排成完整注音。', sounds.split(' '), {
      speech:sentence, hint:'先聽完，再逐字找出音節。', explain:sentence + '：' + sounds
    });
  }

  if (mode === 6) {
    const names = shuffle(['小安','小晴','阿澤','米米']).slice(0, advanced ? 4 : 3);
    const [a,b,c,d] = names;
    const firstClue = a + ' 在 ' + b + ' 的正左邊，' + c + ' 在 ' + b + ' 的正右邊。';
    const wording = '座位從左排到右。' + firstClue + (d ? d + ' 坐在最左邊。' : '');
    return sequence(wording + ' 請排出座位。', d ? [d,a,b,c] : names, {hint:'先排出相鄰的三人，再放入剩下的人。', explain:'從左到右是 ' + (d ? [d,a,b,c] : names).join('、') + '。'});
  }
  if (mode === 7) {
    const commands = shuffle([['向東',1,0],['向西',-1,0],['向北',0,1],['向南',0,-1]]).slice(0, advanced ? 3 : 2);
    const moves = commands.map(([direction,x,y])=>[direction,x,y,rand(1,3)]);
    const east = moves.reduce((sum,[,x,,n])=>sum+x*n,0), north = moves.reduce((sum,[,,y,n])=>sum+y*n,0);
    const describe = (x,y)=>[x ? (x>0?'東':'西')+' '+Math.abs(x)+' 格' : '',y ? (y>0?'北':'南')+' '+Math.abs(y)+' 格' : ''].filter(Boolean).join('、') || '原點';
    return quiz('從原點' + moves.map(([d,,,n])=>d+n+'格').join('，再') + '。終點相對原點在哪？', describe(east,north),
      [describe(east+1,north),describe(east,north-1),describe(east-1,north+1)], {
        hint:'東和西互相抵銷，南和北也互相抵銷。可用紙畫方格。', explain:'東西與南北分開計算，終點在' + describe(east,north) + '。'
      });
  }
  const units = rand(2, 5), balls = rand(2, 4);
  if (!advanced) return quiz('天平平衡。' + units + ' 顆一樣的星星和 1 顆月亮同重。哪一邊比較重？', (units+1) + ' 顆星星', ['1 顆月亮','一樣重'], {hint:'把月亮想成題目說的星星數量。', explain:'1 顆月亮等於 ' + units + ' 顆星星，所以 ' + (units+1) + ' 顆星星較重。'});
  const stars = rand(1, 4);
  return challengeNumber('1 顆月亮等於 ' + units + ' 顆星星。' + balls + ' 顆月亮和 ' + stars + ' 顆星星，合計相當於幾顆星星？', units*balls+stars, level, {
    hint:'先把月亮換成等重的星星，再把兩邊合起來。', explain:units + ' × ' + balls + ' ＋ ' + stars + ' ＝ ' + (units*balls+stars) + ' 顆星星。'
  });
}
