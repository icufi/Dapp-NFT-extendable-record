

function wordWrap(str, len) {
    let input = str.trim().split(' ');
    let [index, output] = [0, []]
    output[index] = '';
    input.forEach(word => {
        let temp = `${output[index]} ${word}`.trim()
        if (temp.length <= len) {
            output[index] = temp;
        } else {
            index++;
            output[index] = word;
        }
    })
    return output
}

module.exports = wordWrap;