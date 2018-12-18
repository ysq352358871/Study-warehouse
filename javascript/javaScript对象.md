#### 时间对象

#### 对象到原始值的转换
> 本地对象都继承了toString() 和valueOf()两个方法。

规则：当一个对象转换成原始值时，先查看对象是否有valueOf方法，如果有并且返回值是一个原始值，
那么直接返回这个值，否则没有valueOf或返回的不是原始值，那么调用toString方法，返回字符串表示。如果没有原始值，就会返回对象本身(字符串)。
```
    function a(){
        
    }
    console.log(a) //会输出函数的本身。应为没有原始值
    
    <!--接下来我们改写函数a上面的valueOf方法-->
    function a(){
        
    }
    a.valueOf = function(){
        return 123;
    }
    console.log(a); // 输出的是123.应为这时valueOf 里有值。所以不会输出对象本身。
```
1. 知识点应用： 如何实现函数add, add(1)(2)(3) 输出6. 考虑拓展性。