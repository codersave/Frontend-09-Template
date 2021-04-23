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
console.log(kmp("kml","kml"));
