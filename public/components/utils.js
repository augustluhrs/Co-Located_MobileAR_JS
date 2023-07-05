//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomID(length){
  let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      counter ++;
    }
    return result;
}
