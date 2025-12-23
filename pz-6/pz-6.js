const ALPH = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const ALPH_N = ALPH.length;

function getAlphCode(char) {
    return ALPH.indexOf(char[0]);
}

function getAlphChar(code) {
    return ALPH[code];
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
    
    text.forEach( (el, i) => {
        text[i] = getAlphChar( (getAlphCode(el) - getAlphCode(key[i % key.length]) + ALPH_N) % ALPH_N );
    });

    return text.join('');
}

let cipher = 'ЪЛЖСАЬДФЩЬЫЙЯОЦРТОАЕЬЕЪРЬЭЫМЭЪЕЯЧОЧВЪТЬЪБРЮДЕТЖЭАЦПОЪИАЕ'.toLowerCase();
let keySet = ['геология', 'север', 'ставка', 'победа', 'публикация', 'планета'];

document.write(`Шифр: ${cipher}<br><br>`);

keySet.forEach( (key) => {
    document.write(`Ключ: ${key}<br>Расшифровка: ${transcript(cipher,key)}<br><br>`);
});
