### 一、浏览器工作原理总论
![](https://github.com/codersave/Frontend-09-Template/raw/main/Week_08/browser.png?raw=true "浏览器原理图")

### 二、状态机
+ 每一个状态都是一个机器（每个机器是相互解耦的，因此可忽略其它状态机的逻辑）
    - 在每一个机器里，可以做计算、存储、输出...
    - 所有机器接受的输入是一致的
    - 状态机的每一个机器本身没有状态，如果用函数表示，应该是纯函数（无副作用）
+ 每一个机器知道下一个状态
    - 每个机器都有确定的下一个状态（Moore 状态机）
    - 每个机器根据输入决定下一个状态（Mealy 状态机，用途较广）
  
#### 1、查找字符（使用状态机前后对比）
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

    
    // 使用状态机
    function match1(string) {
        let state = start;
        for(let c of string) {
            state = state(c);
        }
        return state === end;
    }

    function start(c) {
        if(c === "a") {
            return foundA;
        } else {
            return start;
        }
    }

    function end(c) {
        return end;
    }

    function foundA(c) {
        if(c === "b") {
            return foundB;
        } else {
            return start(c);
        }
    }

    function foundB(c) {
        if(c === "c") {
            return foundC;
        } else {
            return start(c);
        }
    }

    function foundC(c) {
        if(c === "d") {
            return foundD;
        } else {
            return start(c);
        }
    }

    function foundD(c) {
        if(c === "e") {
            return foundE;
        } else {
            return start(c);
        }
    }

    function foundE(c) {
        if(c === "f") {
            return end;
        } else {
            return start(c);
        }
    }
    console.log(match1('I abvabcdef'));

### 三、http请求

#### 1、网络模型
![](https://github.com/codersave/Frontend-09-Template/raw/main/Week_08/slice.png?raw=true "网络分层")  

#### 2、TCP 与 IP
+ 流
+ 端口
+ require('net')
+ 包
+ IP 地址
+ libnet/libpcap
  
### 3、http
+ resquest
+ response
  


