#### DOM对象
##### document
> document是核心对象，对元素的样式，内容，位置进行操作

##### 获取元素
* document.getElementById（）id
* document/obj.getElementsByClassName 兼容性问题 类名。IE 8下不支持通过类名获取元素
* document.getElementsByName 名字
* document/obj.getElementsByTagName 标签
* document.write（）
* document.URL:只能获取不能赋值
* document.title: 获取当前文档的标题

#####  dom集合
* document.all 文档所有元素的集合
* document.forms 文档form对象的集合
* document.images  文档所有图片的集合
* document.links 文档所有连接的集合 包括图片地图
* document.anchors 文档锚链接的集合

##### 操作元素
>innerHTML和innerText都会替换元素里的所有内容。
1. 操作元素内容
* innerHTML 可以识别标签
* innerText 只能获取文本或者设置文本
* textContent 获取元素内的文本

* innerText与textContent的区别：
    * textContent不会理会html样式，直接输出文本，包括元素设置为display：none
    * innerText会根据标签里的元素独立一行，它不会去获取到display：none的元素的文本
    * 兼容性：innerText 对IE的兼容性比较好。textContent虽然作为标准方法但是只支持IE8+以上的浏览器。高版本浏览器。两个都可以使用。
2. 操作元素属性
* 标准属性：id class等，可以直接操作，obj.id，获取或者是设置都可以
* 非标准属性：（自定义属性） 不可以直接操作   必须通过getAttribude（）去获取
* 不论是标准的还是自定义的都可以通过getAttribute（）去获取，可以通过setAttribute（）去设置。element.setAttribute(attributename,attributevalue)
    >注意：通过setAttribute设置属性 会覆盖掉元素原有的属性

```
html：
<body>
    <span>123sdd</span>
    <div id="box" a="b" class="boxWrap boxWrap1">
        <div class="box1">
            <h1>1233</h1>
            <span>123333aaaa</span>
        </div>
    </div>
</body>

Javascript:
    var box = document.getElementById('box');
    console.log(box.id); //输出元素上标准属性
    console.log(box.getAttribute('a')); // 通过getAttribute()获取自定义属性
    console.log(box.getAttribute('class'));//通过getAttribute()获取标准属性
    box.setAttribute('class','boxWrap2')//通过setAttribute设置标准属性。这里boxWrap2 会覆盖掉原先的boxWrap boxWrap1
    box.setAttribute('b','a')//通过setAttribute设置自定义属性
```

3. 操作元素样式
* 获取样式：
    * div.style.css属性 这种获取方式只能获取行内样式。这种方式在实际项目中很少用。
    * div.currentSyle.css属性 只能获取不能设置(IE6-IE8)。能获取到元素所有经过计算过的样式。
    * getComputedStyle(对象,null).css属性 只能获取不能设置。这个方法不兼容IE6-8。可以使用div.currentSyle.css代替。
```
<style>
        body span{
            font-size: 16px;
        }
        #box{
            font-size: 20px;
            color: red;
        }
</style>
<div id="box" a="b" class="boxWrap boxWrap1" style="border: 1px solid yellow">
        <div class="box1" >
            <h1>1233</h1>
            <span>123333aaaa</span>
        </div>
</div>


javascript:
    var box = document.getElementById('box');
    console.log(box.style.border); //1px solid yellow。此方法只能获取到行内样式
    console.log(box.currentStyle.color) // 在IE浏览器下
    console.log(window.getComputedStyle(box,null).color);
```
* 设置元素样式
    *  设置单个属性：obj.style.css属性
    *  设置多个css属性：obj.cssText。
    >使用cssText能设置多个css属性。这样就可以尽量避免页面回流(reflow)，提高页面性能。但是使用此方法会覆盖原先的css属性。有两种方法可以解决。
    1.可以采用cssText累加的方法：Element.style.cssText += ‘width:100px;height:100px;top:100px;left:100px;’。但是这种方法在IE中是无效的。
    2. 可以在前面添加一个分号来解决这个问题：Element.style.cssText += ‘;width:100px;height:100px;top:100px;left:100px;’

4. 获取元素的尺寸和位置。
    * 内高度、内宽度： 内边距 + 内容框
    ```
    element.clientWidth
    element.clientHeight
    ```
    * 外高度，外宽度： 边框 + 内边距 + 内容框
    ```
    element.offsetWidth
    element.offsetHeight
    ```
    * 上边框、左边框
    ```
    element.clientTop
    element.clientLeft
    ```
    * 元素的大小及其相对于视口的位置
    ```
    element.getBoundingClientRect()
        //x\y:元素的左上角和父元素左上角的距离
        //width/height:边框 + 内边距 + 内容框
        //top:元素的上边界和父元素上边界的距离
        //left:元素的左边界和父元素左边界的距离
        //right:元素的右边界和父元素的左边界的距离
        //bottom:元素的下边界和父元素上边界的距离
    ```
    * 上边偏移量，左边的偏移量
    ```
    element.offsetTop
    element.offsetLeft
    ```
        * 如果上级父元素都没有定位，计算的是相对于浏览器左上角的距离
        * 如果上级父元素有定位，那么计算的是相对于这个父级元素的距离
        * 绝对定位是忽略父元素的padding值的
    * 可视区域的大小
    ```
    document.documentElement.clientWidth
    document.documentElement.clientHeight
    ```
    * 页面的实际大小
    ```
    document.documentElement.scrollWidth
    document.documentElement.scrollHeight
    ```
    * 屏幕宽高
    ```
    window.screen.width
    window.screen.height
    ```
    * 屏幕可用宽高（去除任务栏）
    ```
        window.screen.availWidth
        window.screen.availHeight
    ```
    * 窗口的内高度、内宽度（文档显示区域+滚动条）
    ```
    window.innerWidth
    window.innerHeight
    ```
    * 窗口的外高度、外宽度
    ```
    window.outerWidth
    window.outerHeiht
    ```