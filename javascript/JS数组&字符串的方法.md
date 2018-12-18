#### 数组
1. push()
> 向一个数组尾部添加一个或者多个元素，并返回添加新元素后的数组长度。会改变原来的数组。
```
    let arr1 = [1,2,3];
    let arrLength= arr1.push(4,5); // 返回添加元素后的数组的长度
    console.log(arrLength);
```
2. pop()
> 删除元素的最后一个元素，并返回该元素。 会改变原素组。
```
let popArr = [1,2,3,4];
let popArr1 = popArr.pop(); //返回被删除的元素
console.log(popArr,popArr1);
```
3. unshift()
> 在数组的第一个位置上添加元素，并返回数组长度。原数组会改变。
```
let arr = [1,2,3,4];
let ab = arr.unshift(1); //ab 为添加元素后 返回的数组长度
console.log(ab,arr);
```
4. shift()
> 删除数组的第一个元素，并返回被删除掉的元素，原数组会被改变。
```
let arr = [1,2,3,4];
let ab = arr.shift(); //ab 为添加元素后 返回的数组长度
console.log(ab,arr);
```
5. valueOf()
> 返回数组本身
```
let arr = [1,2,3,4];
let ab = arr.valueOf();
console.log(ab,arr);
```
6. indexOf(arg1,arg2)
> 改方法用来查询数组中指定元素的位置,有两个参数，第二个参数可选。arg1:为要查询的元素，arg2:查询的开始位置。
```
let arr =[1,2,3,4,'a','b','c'];
let ab = arr.indexOf('a'); // 4
let ab1 = arr.indexOf('a',2); //4
console.log(ab,arr,ab1);
```
7. toString()
>把一个数组转化成字符串。
```
let arr =[1,2,3,4,'a','b','c'];
console.log(arr.toString());
```
8. join([arg])
> arg可传可不传。以参数为分割符，将数组成员组成一个字符串返回。如果不传，则默认以逗号分割。
```
let arr =[1,2,3,4,'a','b','c'];
console.log(arr.join('|'));
```
9. concat()
> 用于多个数组的合并。它将新数组添加原数组的末位，并返回一个新数组。原数组不变。
```
let arr =[1,2,3,4,'a','b','c'];
console.log(arr.concat([1,2]));
```
10. reverse()
> 用于颠倒数组中元素的顺序，返回改变后的数组。改变了原数组。
```
let arr =[1,2,3,4,'a','b','c'];
arr.reverse()
console.log(arr);
```
11. slice(start,end)
> 用于截取元素组，返回一个新数组，原数组不变。参数可以为负。
```
let arr=['q','e','c','r'];
console.log(arr.slice(1,)
```
12. splice(start,delNum,addEle1,addEle2,..)
>删除原数组的部分成员,第一个参数为开始位置，第二个参数是被删除的个数，如果后面还有更多参数，则表示这些参数是要被插入数组的新元素。改方法会改变原来的数组。返回值是被删除的元素组成的新数组。
```
let arr = [1,2,3,4,'a','b','c'];
let ab = arr.splice(1,3,'bb','dd');
console.log(ab,arr);
```
13. sort()
> 对数组成员进行排序，默认是按照字典书序排序。原数组将会被改变。
```
let arr=[1,2,3,4];
arr.sort(); // 按照字典顺序排序
console.log(arr);

let arr=[1,2,3,4]; 
arr.sort(function(a,b){
    return a-b;
})
console.log(arr)
```
14. map()
> 对原数组映射成为一个新数组，需要有返回值。
```
let arrMap = [1,2,3,4,5];
let a = arrMap.map(function (n) {
    return n*2;
});
console.log(arrMap,a);
```
15. filter
> 过滤。会把遍历数组所有成员，然后过滤掉不符合条件的元素。
```
let arrMap = [1,2,3,4,5];
let aFilter = arrMap.filter(function (arg) {
    return arg%2 != 0;
})
console.log(arrMap,aFilter);
```
16. forEach()
> 遍历数组。
```
let arrForEach  =[1,'33','a','b',123];
arrForEach.forEach(function (item,index) {
    console.log(item,index);
});
```
17. reduce()
```
let abc = [1,2,3,4,5,6];
let cba = abc.reduce(function (a,b) {
    return a*10+b;
},[0,1]);
console.log(cba)
```

#### 字符串
1. concat()
> 将两个字符串连接成一个字符串。
2. indexOf()
> 查询字符串中指定字符第一次出现的位置，没有返回-1
3. charAt()
> 返回字符串中指定位置的字符
4. lastIndexOf()
> 返回字符串中指定字符最后出现的位置，没有返回-1
5. match()
>检查一个字符串匹配一个正则表达式内容，如过没有返回null
6. substring(start,[end])
> 截取字符串.
7. substr(start,[length])
>截取字符串。参数为开始位置和截取长度
8. replace(rgExp/substr,replaceString)
> 替换字符串的内容,第一个参数为被替换的字符串或者正则表达式，第二个参数为替换后打的字符串。
9. search()
> 执行一个正则表达式匹配查找，成功。返回字符串的索引值，否则返回-1；
10. slice(star,[end])
> 截取字符串.与substring相同
11. split()
> 将字符串转换成为数组
12. length()
> 获取字符串的长度
13. toLowerCase()
> 将字符串装换成小写
14. toUpperCase()
> 将字符串装换成大写