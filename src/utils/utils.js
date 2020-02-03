
const colorGenerator = (arr) => {
    // let randomColor = Math.floor(Math.random()*16777215).toString(16);
    let arrLength = arr.length;
    let colors = []
    for (let i = 0; i < arrLength; i++) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        randomColor = `#${randomColor}`;
        colors.push(randomColor);
    }

    return colors;
}

module.exports = {colorGenerator};