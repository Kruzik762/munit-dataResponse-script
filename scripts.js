'use strict';



// HTML ELEMENTS
const inputTextarea = document.querySelector('.input');
const outputTextarea = document.querySelector('.output');
const convertBtn = document.querySelector('.converter');
const selector = document.querySelector('#select');




//Event Listeners
convertBtn.addEventListener('click', () => {
    let outputText;
    if(!inputTextarea.value) {
        outputTextarea.value = '';
        return;    
    }
    if(selector.value === 'stacked') {
        outputText = formatStacked(inputTextarea);
        outputTextarea.classList.add('output-shake');
    }else {
        outputText = formatOneline(inputTextarea);        
        outputTextarea.classList.add('output-shake');
    }
   
    
})
outputTextarea.addEventListener('animationend', () => {
    outputTextarea.classList.remove('output-shake');
    outputTextarea.classList.add('green-shadow');
});

selector.addEventListener('change', (e) => {
    
    if(e.currentTarget.value === 'one-line') {
        outputTextarea.value =  formatOneline(outputTextarea);
    } else if (e.currentTarget.value === 'stacked'){
        outputTextarea.value = formatStacked(outputTextarea);
    }
})


function formatOneline(textareaElement) {
   const text = textareaElement.value.replaceAll(/(\n|\s+)/g, ' ').replaceAll(/(?=#\[)/g, '').replaceAll(/\B\s{2,}/g, '');
   outputTextarea.value = text
   return addOutputWrapper(text);
}
function formatStacked(textareaElement) {        
    return addOutputWrapper(textareaElement.value)
    .replaceAll(/(?<=\{)/g, "\n\t") //Finds all { characters then apply  newline & tab after
    .replaceAll(/(?<=,)/g, '\n\t\t') //Finds all commas (,) then apply  newline & tab after
    .replaceAll(/(?<=[^#]\[)/g, '\n\t') //Find all [ characters that don't include a # then apply newline & tab
    .replaceAll(/(?<=\w\}|" \})/g, '\n') //Find all } characters then apply newline, only if follows a alphabet char
    .replaceAll(/(?<=\w\]|" \])/g, '\n') //Find all ] character then apply newline
    
}
function addOutputWrapper(text) {
    if(!text.includes('#[') && inputTextarea.value){
        let prependedString = new String('#[output application/json --- ' + text);    
        if(prependedString[prependedString.length-1] != ']') {
            prependedString = new String(prependedString + ']')
        }
        outputTextarea.value = prependedString;
        return prependedString;
        // Removes duplicate #[output application/json]
    }
    return text.replaceAll(/\n /g, ' ').replaceAll(/\s+/g, ' ');
}

inputTextarea.addEventListener('click', () => outputTextarea.classList.remove('green-shadow'));
outputTextarea.addEventListener('click', () => outputTextarea.classList.remove('green-shadow'));





