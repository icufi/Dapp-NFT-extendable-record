function wordWrap(str, len) {
  const input = str.trim().split(' ');
  let [index, output] = [0, []];
  output[index] = '';
  input.forEach((word) => {
    const temp = `${output[index]} ${word}`.trim();
    if (temp.length <= len) {
      output[index] = temp;
    } else {
      index += 1;
      output[index] = word;
    }
  });
  return output;
}

module.exports = wordWrap;
