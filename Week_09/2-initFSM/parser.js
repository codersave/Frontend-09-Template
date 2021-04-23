const EOF = Symbol("EOF");

module.exports.parseHTML = function(html) {
    let state = data;
    for(let c of html) {
        state = state(c);
    }
    state = state(EOF);
    console.log(html)
}