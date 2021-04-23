### 一、LL算法构建AST
    1、LL算法：从左到右扫描

    2、AST：抽象语法树

    3、实列：四则运算

### 二、四则运算词法分析
    描述：用正则从左到右重复扫描，若匹配到根据返回的位置匹配对应的类型并对匹配的字符进行长度验证。

    code：
    let regexp = /([0-9\.]+)|([ \t])|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;
    let dictionary = ["Number","Whitespace","LineTerminator","*","/","+","-"];
    function* tokenize(source) {
        let result = null;
        let lastIndex = 0;
        while(true) {
            // lastIndex 下一次匹配的起始索引
            lastIndex = regexp.lastIndex;
            result = regexp.exec(source);
            if(!result) 
                break;
            // 匹配到不认识的字符
            if(regexp.lastIndex - lastIndex > result[0].length)
                break;
            
            let token = {
                type: null,
                value: null
            }
            for(let i = 1; i <= dictionary.length; i++) {
                if(result[i])
                    token.type = dictionary[i -1];
            }
            token.value = result[0];
            yield token;
        }
        yield { type: "EOF" }
    }
    for(let token of tokenize("1244 + 20 * 30")) {
        console.log(token);
    }

### 三、语法分析原则
![](https://github.com/codersave/Frontend-09-Template/blob/main/Week_03/grammar.png?raw=true "四则语法原则")

### 四、四则运算语法分析
    描述：根据四则运算词法结果与四则语法分析原则进行语法分析

    code：
    let regexp = /([0-9\.]+)|([ \t])|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

    let dictionary = ["Number","Whitespace","LineTerminator","*","/","+","-"];

    function* tokenize(source) {
        let result = null;
        let lastIndex = 0;
        while(true) {
            // lastIndex 下一次匹配的起始索引
            lastIndex = regexp.lastIndex;
            result = regexp.exec(source);
            if(!result) 
                break;
            // 匹配到不认识的字符
            if(regexp.lastIndex - lastIndex > result[0].length)
                break;

            let token = {
                type: null,
                value: null
            }

            for(let i = 1; i <= dictionary.length; i++) {
                if(result[i])
                    token.type = dictionary[i -1];
            }

            token.value = result[0];
            yield token;
        }
        yield { type: "EOF" }
    }
    
    let source = [];
    for(let token of tokenize("10 + 3 - 5")) {
        if(token.type !== "Whitespace" && token.type !== "LineTerminator")
            source.push(token);
    }

    function Expression(tokens) {
        if(source[0].type === "AdditiveExpression" && source[1].type === "EOF") {
            let node = {
                type: "Expression",
                children: [source.shift(),source.shift()]
            }
            source.unshift(node);
            return node;
        }
        AdditiveExpression(source);
        return Expression(source);
    }
    // 加减
    function AdditiveExpression(source) {
        // 乘法看作特殊的加法
        if(source[0].type === "MultiplicativeExpression") {
            let node = {
                type: "AdditiveExpression",
                children: [source[0]]
            }
            source[0] = node;
            return AdditiveExpression(source);
        }
        if(source[0].type === "AdditiveExpression" && source[1].type === "+") {
            let node = {
                type: "AdditiveExpression",
                operator: "+",
                children: []
            }
            node.children.push(source.shift());
            node.children.push(source.shift());
            MultiplicativeExpression(source);
            node.children.push(source.shift());
            source.unshift(node);
            return AdditiveExpression(source);
        }
        if(source[0].type === "AdditiveExpression" && source[1].type === "-") {
            let node = {
                type: "AdditiveExpression",
                operator: "-",
                children: []
            }
            node.children.push(source.shift());
            node.children.push(source.shift());
            MultiplicativeExpression(source);
            node.children.push(source.shift());
            source.unshift(node);
            return AdditiveExpression(source);
        }
        if(source[0].type === "AdditiveExpression")
            return source[0]
        MultiplicativeExpression(source);
        return AdditiveExpression(source);
    }
    // 乘除
    function MultiplicativeExpression(source) {
        // 特殊的乘法
        if(source[0].type === "Number") {
            let node = {
                type: "MultiplicativeExpression",
                children: [source[0]]
            }
            source[0] = node;
            return MultiplicativeExpression(source);
        }
        if(source[0].type === "MultiplicativeExpression" && source[1].type === "*") {
            let node = {
                type: "MultiplicativeExpression",
                operator: "*",
                children: []
            }
            node.children.push(source.shift());
            node.children.push(source.shift());
            node.children.push(source.shift());
            source.unshift(node);
            return MultiplicativeExpression(source); 
        }
        if(source[0].type === "MultiplicativeExpression" && source[1].type === "/") {
            let node = {
                type: "MultiplicativeExpression",
                operator: "/",
                children: []
            }
            node.children.push(source.shift());
            node.children.push(source.shift());
            node.children.push(source.shift());
            source.unshift(node);
            return MultiplicativeExpression(source); 
        }
        if(source[0].type === "MultiplicativeExpression") 
            return source[0];
    }

    console.log(Expression(source))