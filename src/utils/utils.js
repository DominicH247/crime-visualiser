
const colorGenerator = (arr) => {
    let colors = []
    for (let i = 0; i < arr.length; i++) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        randomColor = `#${randomColor}`;
        colors.push(randomColor);
    }

    return colors;
}

module.exports = {colorGenerator};