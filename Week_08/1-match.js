// for...in循环出的是key
// for...of循环出的是value

// 字符串查找指定字符 a
function match(string) {
	for(let c of string) {
		if(c == "a")
			return true;
	}
	return false;
}
console.log(match("my name is ling"))


// 字符中找字符ab
function match1(string) {
	let foundA = false;
	for(let c of string) {
		if(c == "a")
			foundA = true;
		else if(foundA && c == "b")
			return true;
		else 
			foundA = false;
	}
	return false;
}
console.log(match1("my name is lingab"))

// 字符中找abcdef
function match(string) {
	let foundA = false;
	let foundB = false;
	let foundC = false;
	let foundD = false;
	let foundE = false;
	for(let c of string) {
		if(c == "a") 
			foundA = true;
		else if(foundA && c == "b") 
			foundB = true;
		else if(foundB && c == "c") 
			foundC = true;
		else if(foundC && c == "d") 
			foundD = true;
		else if(foundD && c == "e") 
			foundE = true;
		else if(foundE && c == "f")
		 return true;
		else {
			foundA = false;
			foundB = false;
			foundC = false;
			foundD = false;
			foundE = false;
		}
	}
	return false;
}
console.log(match("my name is lingabcdef"))