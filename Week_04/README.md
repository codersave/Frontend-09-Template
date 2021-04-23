### 一、字符串算法
![](https://github.com/codersave/Frontend-09-Template/blob/main/Week_04/string.png?raw=true)

### 二、字典树：树形数据结构

1、字典树分析过程

![](https://github.com/codersave/Frontend-09-Template/blob/main/Week_04/tree.png?raw=true)


### 三、kmp字符串匹配模式算法：消除了主串指针的回溯，从而使算法效率有了某种程度的提高

	function kmp(source, pattern) {
		// 初始化跳转表格
		let table = new Array(pattern.length).fill(0);

		// 计算跳转表格 table
		{
			// i自重复索引、j自重复数
			let i = 1, j = 0;
			while(i < pattern.length) {
				// 重复前进一位并记录重复数j
				if(pattern[i] === pattern[j]) {
					++i, ++j;
					table[i] = j;
				} else {
					// 不匹配 j大于0作为索引跳转到table对应位置得j值
					if(j > 0)
						j = table[j];
					else
						++i;
				}
			}
		}
		// 匹配
		{
			// i原自符串source位置，j需匹配字符串pattern
			let i = 0, j = 0;
			while(i < source.length) {
				if(source[i] === pattern[j]) {
					++i, ++j;
				} else {
					if(j > 0)
						j = table[j];
					else
						++i;
				}
				if(j === pattern.length)
					return true;
			}
			return false;
		}
	}

### 四、Wildcard

1、特点：含有通配符?(匹配任一字符)与*(匹配任意多个字符)

2、分析：分成只含*号与只含？。再次分成第一星号前、最后星号后及中间字符串匹配

3、代码实现

	function find(source, pattern) {
		// 查找星号个数
		let starCount = 0;
		for(let i = 0; i < pattern.length; i++) {
			if(pattern[i] === "*")
				starCount ++;
		}
		// 没有星号
		if(starCount === 0) {
			for(let i = 0; i < pattern.length; i++) {
				if(pattern[i] !== source[i] && pattern[i] !== "?")
					return false;
			}
			return ;
		}
		// 第一个星号前字符串处理 i pattern位置、lastIndex source位置
		let i = 0;
		let lastIndex = 0;
		for(i = 0; pattern[i] !== "*"; i++) {
			if(pattern[i] != source[i] && pattern[i] !== "?")
				return false;
		}
		lastIndex = i;
		// 中间部分处理 只有一个星号当作最后一个处理
		for(let p = 0; p < starCount -1; p++) {
			i++;
			let subPattern = "";
			// 找到 *
			while(pattern[i] != "*") {
				subPattern += pattern[i];
				i++;
			}
			let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
			reg.lastIndex = lastIndex;
			console.log(reg.exec(source));
			if(!reg.exec(source))
				return false;
			lastIndex = reg.lastIndex;
		}
		// 最后星号部分
		for(let j = 0; j <= source.length - lastIndex && pattern[pattern.length -j] !== "*"; j++) {
			if(pattern[pattern.length - j] !== source[source.length - j] && pattern[pattern.length - j] !== "?")
				return false;
		}
		return true;
	}
