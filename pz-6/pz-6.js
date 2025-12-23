const ALPH_BEGIN = 'а';
const ALPH_END = 'ё';
const ALPH_N = getAlphCode(ALPH_END) + 1;

function printAlphabet() {
    for (let i = ALPH_BEGIN.charCodeAt(0); i <= ALPH_END.charCodeAt(0); i++) {
        let ch = String.fromCharCode(i);
        document.write(`${ch} - ${i} - ${getAlphCode(ch)}<br>`);
    }
}

function getAlphCode(ch) {
    return ch.charCodeAt(0) - ALPH_BEGIN.charCodeAt(0);
}

function getAlphChar(c) {
    return String.fromCharCode(+c + ALPH_BEGIN.charCodeAt(0));
}

function script(orig, key) {
    orig = orig.split('');
    key = key.split('');

    orig.forEach( (el, i) => {
        orig[i] = getAlphChar( (getAlphCode(el) + getAlphCode(key[i % key.length])) % ALPH_N );
    });
        
    return orig.join('');
}

function transcript(text, key) {
    text = text.split('');
    key = key.split('');

    // text.forEach( (el, i) => text[i] = getAlphCode(el));
    // key.forEach( (el, i) => key[i] = getAlphCode(el));

    // document.write(`text: ${text}<br>key: ${key}<br>`);
    
    text.forEach( (el, i) => {
        text[i] = getAlphChar( (getAlphCode(el) - getAlphCode(key[i % key.length]) + ALPH_N) % ALPH_N );
        // a = el - key[i % key.length];
        // a = (a < 0) ? a + ALPH_N : a;
        // text[i] = a % ALPH_N;
    });
    
    // document.write(`cod: ${text}<br>`);

    // document.write(``);

    return text.join('');
}

let cipher = 'ЪЛЖСАЬДФЩЬЫЙЯОЦРТОАЕЬЕЪРЬЭЫМЭЪЕЯЧОЧВЪТЬЪБРЮДЕТЖЭАЦПОЪИАЕ'.toLowerCase();
let keySet = ['геология', 'север', 'ставка', 'победа', 'публикация', 'планета'];

// document.write(script("абвэюя","я"));
// document.write("<br>");
// document.write(transcript("яѐёъыь","я"));

document.write(`Шифр: ${cipher}<br><br>`);

keySet.forEach( (key) => {
    document.write(`Ключ: ${key}<br>Расшифровка: ${transcript(cipher,key)}<br><br>`);
});

// document.write("<br><br>");
// printAlphabet();
