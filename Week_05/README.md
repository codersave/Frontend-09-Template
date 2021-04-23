### 一、模仿vue3.x reactive实现原理
   
    let callbacks = new Map();

    let reactivties = new Map();

    let usedReactivties = [];

    let object = {
        r: 1,
        g: 1,
        b: 1
    }

    let po = reactive(object)

    effect(() => {
        document.getElementById("r").value = po.r;
    })
    effect(() => {
        document.getElementById("g").value = po.g;
    })
    effect(() => {
        document.getElementById("b").value = po.b;
    })

    document.getElementById("r").addEventListener("input", event => po.r = event.target.value);
    document.getElementById("g").addEventListener("input", event => po.g = event.target.value);
    document.getElementById("b").addEventListener("input", event => po.b = event.target.value);

    effect(() => {
        document.getElementById("color").style.backgroundColor = `rgb(${po.r},${po.g},${po.b})`;
    })

    // 可以监听po上的属性
    function effect(callback) {
        // callbacks.push(callback)
        usedReactivties = [];
        callback();
        console.log(usedReactivties)
        for(let reactivity of usedReactivties) {
            // 没有保存
            if(!callbacks.has(reactivity[0])) {
                callbacks.set(reactivity[0], new Map());
            }
            if(!callbacks.get(reactivity[0]).has(reactivity[1])) {
                callbacks.get(reactivity[0]).set(reactivity[1], []);
            }
            callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
        }
    }

    function reactive(object) {
        if(reactivties.has(object)) 
            return reactivties.get(object);

        let proxy = new Proxy(object, {
            set(obj, prop, val) {
                obj[prop] = val;

                if(callbacks.get(obj))
                    if(callbacks.get(obj).get(prop))
                        for(let callback of callbacks.get(obj).get(prop)) {
                            callback()
                        }
                return obj[prop];
            },
            get(obj, prop) {
                usedReactivties.push([obj, prop]);
                if(typeof obj[prop] === "object") 
                    return reactive(obj[prop]);
                return obj[prop];
            }
        })

        reactivties.set(object, proxy);
        return proxy;
    }

### 二、鼠标拖拽
    let dragable = document.getElementById("dragable");

	let baseX = 0, baseY = 0;

	dragable.addEventListener("mousedown", function(event) {
		let startX = event.clientX, startY = event.clientY;

		let up = event => {
			baseX = baseX + event.clientX - startX;
			baseY = baseY + event.clientY - startY;
			document.removeEventListener("mousemove", move)
			document.removeEventListener("mouseup", up)
		}
		let move = event => {
			// dragable.style.transform = `translate(${baseX + event.clientX - startX}px, ${baseY + event.clientY - startY}px)`;
			
			let range = getNearest(event.clientX, event.clientY);
			range.insertNode(dragable);
		}

		document.addEventListener("mousemove", move)
		document.addEventListener("mouseup", up)
	})




	// 找到插入范围 range
	let ranges = [];
	let container = document.getElementById("container");
	for(let i = 0; i < container.childNodes[0].textContent.length; i++) {
		let range = document.createRange();
		range.setStart(container.childNodes[0], i);
		range.setEnd(container.childNodes[0], i);

		console.log(range.getBoundingClientRect());

		ranges.push(range);
	}

	// 找到最近range
	function getNearest(x, y) {
		let min = Infinity;
		let nearest = null;

		for(let range of ranges) {
			let rect = range.getBoundingClientRect();
			let distance = (rect.x - x) **2 + (rect.y - y) **2;
			if(distance < min) {
				nearest = range;
				min = distance;
			}
		}

		return nearest;
	}

	document.addEventListener("selectstart", event => event.preventDefault());
