###  一、语义分类
+ 非形式语义
  + 中文、英文
+ 形式语言（乔姆斯基谱系分类 -> 包含关系）
  - 0型文法（无限制文法或短语结构文法）包括所有的文法。
  - 1型文法（上下文相关文法）生成上下文相关语言。
  - 2型文法（上下文无关文法）生成上下文无关语言。
  - 3型文法（正规文法）生成正则语言。
+ 形式语言 - 用途
    - 数据描述语言 html、css、sql、json ...
    - 编程语言 java、javascript ...
+ 形式语言 - 表达方式
  - 声明式语言 html、json、sql ...
  - 命令型语言 c、javascript ...

### 二、产生式（BNF）：指 Tiger 编译器将源程序经过词法分析和语法分析后得到的一系列符合文法规则的语句
说明：巴科斯-诺尔范式 最经典最常用，简称BNF。
+ 巴科斯诺尔范式
  - 尖括号括起的名称表示语法结构名
  - 语法结构分为基础结构（终结符）和其他语法结构定义的复活合结构（非终结符）
  - 引号和中间的字符表示终结符
  - 可以有括号
  - *表示重复多次
  - |表示或
  - +表示指示一次

### 三、产生式的巴科斯诺尔范式描述四则运算
    BNF
    <MultiplicativeExpression>::= <Number> |
        <MultiplicativeExpression> "*" <Number> |
        <MultiplicativeExpression> "/" <Number> |
    <AddtiveExprssion>::=<MultiplicativeExpression> |
        <AddtiveExprssion>"+" <MultiplicativeExpression> |
        <AddtiveExprssion>"-" <MultiplicativeExpression>

    四则运算：1 + 2 * 3
    终结符：Number 、+ 、- 、* 、/
    非终结符：MultiplicativeExpression 、AddtiveExprssion

### 四、通过产生式理解乔姆斯基谱系
+ 0型 无限制文法 ?::=?
+ 1型 上下文相关文法 ?< A >?::=?< B >?
+ 2型 上下文无关文法 < A > ::=?
+ 3型 正则文法 < A >::=< A >?

### 五、编程语言性质
#### 1、图灵完备性
+ 命令式——图灵机
    - goto
    - if和while
+ 声明式——lambda
    -递归
#### 2、动态与静态
+ 动态
    - 在用户的设备/在线服务器上
    - 时机：产品实际运行时
    - 术语：Runtime
+ 静态
    - 在程序员的设备上
    - 时机：产品开发时
    - 术语：Compiletime
#### 3、类型系统
+ 动态类型系统与静态类型系统
+ 强类型(无隐式转换)与弱类型(有隐式转换)
+ 复合类型
    - 结构体
    - 函数签名（参数类型，返回值类型）
+ 子类型
+ 泛型
    - 逆变/协变

### 六、javascript 类型
+ Numble
+ String
+ Boolean
+ Null
+ Undefined
+ Object
    - obj三要素：唯一标识、状态、行为
    - 设计原则：设计对象的状态和行为时，总是遵循 "行为改变状态" 的原则
+ Symbol

