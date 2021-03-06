#### 数据类型
1. Number
2. String
3. Null
4. Undefind
5. Object
6. Boolean


#### 操作符
1. 算数运算符：+ - * / % ++ --
2. 复制运算符：+= -= *= /= %=
3. 逻辑运算符： && || ！
4. 比较运算符：< > <= >= == === != !==
5. 三元运算符：?:
6. 一元运算符： ！ + - new delete typeof ++ --
7. 特殊运算符：(): 优先计算/形成原子分组(正则)/函数调用  []:数据

#### JS的传值赋值与引用赋值
1. JS的基本类型
>基本类型有undefined，boolean，number，string，null。基本类型是存在栈区。访问是按值访问的，就是说你可以操作保存在变量中的实际的值。

![image](https://images2015.cnblogs.com/blog/815016/201607/815016-20160728111445559-1827593731.png)

当基本类型的数据赋值时，赋得是实际的值，a和b是没有关联关系的，b由a复制得到，相互独立。（字面量的才是基本类型）

var a=10;

var b=a; 这时候会初始化b的栈区，并把a的值赋给b,但是a和b是没有实际关联的
![image](https://images2015.cnblogs.com/blog/815016/201607/815016-20160728111949419-801259735.png)
```
var a=30;
var  b =a;
a= 20;
console.log(b) // 30
```
2. 引用类型(对象)
> 引用类型指的是对象。可以拥有属性和方法，并且我们可以修改其属性和方法。引用对象存放的方式是：在栈中存放对象变量标示名称和该对象在堆中的存放地址，在堆中存放数据。

对象使用的是引用赋值。当我们把一个对象赋值给一个新的变量时，赋的其实是该对象的在堆中的地址，而不是堆中的数据。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
![image](https://images2015.cnblogs.com/blog/815016/201607/815016-20160728112111466-62705191.png)

```
var a = [1,2,3];
var b =a;
a=[4,5];
console.log(b) // [1,2,3]
```
如上例子：
当把a赋给b时，只是把[1,2,3]这个对象在堆区的应用地址在栈区赋值给了b。而当a=[4,5]时，此时a在栈区的引用地址指向了[4，5]这个对象,所以这个时候a,b是没有关系的。

3. 参数传递
> 参数传递 是值传递。

- 当传入的是 基本类型的参数时：就是复制了份内容给i而已，i与age之间没有关系。
```
function setAge(i){
    alert(i);//24
    i = 18;
    alert(i);//18,i的改变不会影响外面的age
};
var age = 24;
setAge(age);
alert(age);//24
```
- 当传入的参数为引用类型时.
```
function setName(obj){
    obj.name = 'haha';
};
 
var obj2 = new Object();
setName(obj2);
alert(obj2.name);    //  haha
```
这看起来很像是传递的是引用，因为obj.name受到改变了，但其实不是，其实还是值，因为obj2本身的值就是新对象的地址，所以传进去的就是这个地址。

#### 原生Ajax
>ajax是asynchronous javascript and XML的简写. 中文是异步的javascript 和Xml.

1. 应用场景：
    - 表单验证
    - 深层次导航
    - 实时显示用户交互状态
    - 普通文本输入提示即完成
    - 开发类似投票系统：在页面不刷新的情况下，获得结果

1. ajax包括以下几步骤：
     - 创建AJAX对象；
     - 发出HTTP请求；
     - 接收服务器传回的数据；
     - 更新网页数据
     
2. 创建Ajax
> ajax技术的核心是XMLHttpRequest对象(简称XHR)，这是由微软首先引入的一个特性