### 一、运算符与表达式

### 二、类型转换
|           | Number              | String                | Boolean  | Undifined | Null | Object | Symbol |
| --------- | ------------------- | --------------------- | -------- | --------- | ---- | ------ | ------ |
| Number    | -                   |                       | 0 false  | x         | x    | Boxing | x      |
| String    |                     | -                     | "" false | x         | x    | Boxing | x      |
| Boolean   | true 1<br />false 0 | 'true'<br />'false'   | -        | x         | x    | Boxing | x      |
| Undifined | NaN                 | 'Undefined'           | false    | -         | x    | x      | x      |
| Null      | 0                   | 'null'                | false    | x         | -    | x      | x      |
| Object    | valueOf             | valueOf<br />toString | true     | x         | x    | -      | x      |
| Symbol    | x                   | x                     | x        | x         | x    | Boxing | -      |

### 三、装箱转换

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String("a")         | "a"         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | New Object(Symbol("a")) | Symbol("a") |

### 四、简单语句和复合语句

#### 简单语句

- ExpressionStatement
- EmptyStatement
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

#### 复合语句

- BlockStatement
- IfStatment
- SwitchStatement
- IterationStatement
- WithStatement
- LabelledStatement
- TryStatement

### 五、宏任务和微任务

微任务：js引擎遇到一个Promise，会将整个代码分成两个任务执行，同步任务先执行，then中的回调函数，会在下个任务执行(这个任务需要等待Promise resolve)

宏任务：将拆分后的任务依次执行的过程

#### 事件循环过程

等待（wait） => 获取代码（get code） => 执行代码（execute）

