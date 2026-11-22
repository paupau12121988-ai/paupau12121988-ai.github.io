'use strict';

const ANSWER_CARDS='button[data-answer],button[data-category],button[data-rescue-answer],button[data-seq],button[data-remove],button.memory-card.flipped';
const ANSWER_ICONS={
  '🍎':'蘋果','🍐':'梨子','🍊':'橘子','🌟':'星星','⭐':'星星','🌙':'月亮','🔴':'紅色圓形','🔵':'藍色圓形',
  '🟡':'黃色圓形','🟢':'綠色圓形','🟣':'紫色圓形','🟪':'紫色正方形','🔺':'紅色三角形','🌈':'彩虹',
  '🏠':'房子','🌸':'花朵','🍄':'蘑菇','🐸':'青蛙','🦋':'蝴蝶','🚂':'火車','🐢':'烏龜','🍇':'葡萄',
  '🍉':'西瓜','💧':'水滴','☀':'太陽','🦉':'貓頭鷹','🐱':'貓咪','🐶':'小狗','🌼':'小花','🍓':'草莓'
};
let pendingCardSpeech=null, hoveringCard=null;

function answerSpeechText(raw) {
  const text=raw.trim();
  const exactWord=[...WORDS,...LONG_WORDS,...MORE_ENGLISH].find(([word,icon])=>word===text.toLowerCase() || icon===text);
  if(exactWord) return exactWord[2];
  const withoutVariation=text.replace(/\uFE0F/g,'');
  if(ANSWER_ICONS[withoutVariation]) return ANSWER_ICONS[withoutVariation];
  const phonetic=[...BOPO,...VOWELS].find(row=>row[0]===text);
  if(phonetic) return phonetic[1];
  if(/^[\u3105-\u3129ˊˇˋ˙ ]+$/.test(text)) {
    const match=[...READING_WORDS,...SPELLING_WORDS,...MORE_BOPOMOFO,...SPELLING_SENTENCES,
      ...BOPO.map(row=>[row[2],row[3]])].find(([,sound])=>sound===text);
    if(match) return match[0];
    // Read each symbol with the same sound examples as the listening activities.
    const tones={'ˊ':'二聲','ˇ':'三聲','ˋ':'四聲','˙':'輕聲'};
    return Array.from(text).map(char=>tones[char]||[...BOPO,...VOWELS].find(row=>row[0]===char)?.[1]||char).join('，');
  }
  if(/^[a-z]$/i.test(text)) return (text===text.toUpperCase()?'大寫':'小寫')+text;
  if(/^\d{1,2}:\d{2}$/.test(text)) {
    const [h,m]=text.split(':').map(Number);
    return m?h+'點'+m+'分':h+'點整';
  }
  const readable=text.replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu,'').trim();
  return readable.replace(/×/g,' 乘以 ').replace(/÷/g,' 除以 ').replace(/[−－]/g,' 減 ').replace(/[+＋]/g,' 加 ').replace(/[=＝]/g,' 等於 ');
}

function cancelCardSpeech() {
  clearTimeout(pendingCardSpeech);
  pendingCardSpeech=null;
  hoveringCard=null;
}

function queueCardSpeech(card) {
  if(!card || card.disabled || !state.voice) return;
  cancelCardSpeech();
  hoveringCard=card;
  pendingCardSpeech=setTimeout(()=>{
    if(!card.isConnected||card.disabled||!state.voice||hoveringCard!==card) return;
    const text=answerSpeechText(card.textContent);
    if(text) speak(text,'zh-TW',false,.75);
  },270);
}

document.addEventListener('pointerover',event=>{
  if(event.pointerType!=='mouse' && event.pointerType!=='pen') return;
  const card=event.target.closest(ANSWER_CARDS);
  if(card===hoveringCard) return;
  cancelCardSpeech();
  queueCardSpeech(card);
});
document.addEventListener('pointerout',event=>{
  if(hoveringCard && !hoveringCard.contains(event.relatedTarget)) cancelCardSpeech();
});
document.addEventListener('focusin',event=>{
  const card=event.target.closest(ANSWER_CARDS);
  if(card?.matches(':focus-visible')) queueCardSpeech(card);
});
document.addEventListener('focusout',event=>{
  if(hoveringCard===event.target) cancelCardSpeech();
});
document.addEventListener('pointerdown',cancelCardSpeech,true);
document.addEventListener('keydown',event=>{
  if(event.key==='Enter'||event.key===' ') cancelCardSpeech();
},true);
