### 学习笔记

### 一、第一周脑图
![](https://github.com/codersave/Frontend-09-Template/raw/main/Week_01/week1.png?raw=true "第一周脑图")

### 二、异步编程
#### 1、callback：回调函数实现的异步会形成回调地狱，不易管理、维护。

    function run() {
        green()
        setTimeout(()=>{
            yellow()
            setTimeout(()=>{
                red()
                setTimeout(()=>{
                    run()
                },5000)
            },2000)
        },10000)
    }

#### 2、Promise: 链式调用

    function sleep(time) {
        return new Promise((resolve, reject)=> {
            setTimeout(resolve, t);
        })
    }

    function run() {
        green()
        sleep(1000).then(()=> {
            yellow();
            return sleep(200);
        }).then(()=> {
            red();
            return sleep(500);
        }).then(run)
    }

#### 3、async / await：基于Promise实现

    async function run() {
        while(true) {
            green();
            await sleep(1000);
            yellow();
            await sleep(200);
            red();
            await sleep(500);
        }
    }

    

