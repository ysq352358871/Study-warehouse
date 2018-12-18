#### 什么是<!DOCTYPE html>?
<!DOCTYPE html> 是H5的标准页面的声明，表示网页采用html5. 此标签是告诉浏览器文档使用哪种html规范。在标准模式中，浏览器根据标准模式展示页面。在混杂模式中，页面以一种宽松的向后兼容的方式呈现页面，在混杂模式中浏览器模拟老式浏览器的行为以防止站点无法工作。在IE6时已经出现了标准的盒模型。在混杂模式中，浏览器为了维持站点在低版本浏览器的兼容性，使用了老式的专用的盒模型。

#### 在H5中，为什么只需要写<!DOCTYPE html>？
应为html5不是基于SGML的。因此不需要引用DTD。但是需要doctype来规定浏览器使用哪种规范。SGML是标准的通用标记语言，它是国际上定义电子文件结构和内容描述的标准，但是SGML不太适用于web数据描述。随着web应用上越来越多的需求，因此H5就不在基于SGML。DTD是一套关于标记符的语法，是html的一部分。有三种文档类型：严格的、过度的、框架集的。

#### 什么是盒子模型? 标准模型和怪异盒子模型的区别？
1. 盒子模型：网页上的每一个标签都是一个盒子,每个盒子都有四个属性
    * content
    * padding
    * border
    * margin
2. 标准盒子模型：
![image](https://images2017.cnblogs.com/blog/1258515/201710/1258515-20171023230013051-545804378.png)

3.IE标准的盒子模型(怪异盒子模型)
![image](https://images2017.cnblogs.com/blog/1258515/201710/1258515-20171023230320941-1160589931.png)

4.他们的区别在于：
    * 在标准模型下width和height即为content的width和height。
    * 在怪异盒子模型下：盒子width和height包括了盒子的border、padding、content.
5. 在CSS3中box-sizing.可以让我自由切换两种盒子模型。box-sizing的值有：
    * border-box: 使用IE模型
    * content-box：默认，标准模型
    * inherit： 从父元素继承

#### 行内块元素的兼容性使用(IE8 以下)
1. 代码兼容性：display：inline-block;*display:inline;*zoom:1;
    > \* 是hack 写法。\*后面的属性 IE6/IE7能识别。IE8以上不能识别。
    \_ 后面的属性 只有IE6识别，其他版本都不识别。
2. Zoom属性是IE浏览器的专有属性，Firefox等浏览器不支撑。它可以设置或检索对象的缩放比例。除此之外，它还有其他一些小感化，比如触发ie的hasLayout属性，清除浮动、清除margin的重叠等。