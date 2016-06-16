---
layout: post
title: Javascript Structure 1 (โครงสร้าง javascript webapp)
---

repo นี้เอาไว้เป็นแนวทางสำหรับคนที่กำลังหัดเขียน webapp ด้วย javascript คับ กะไว้ว่าเขียนให้คนที่พอมีพื้นฐานเขียนโปรแกรม / javascript อยู่แล้ว แต่ยังงงๆเรื่องพวก environment /structure ในการประกอบร่างกันเป็นแอพอันนึง

จะมีวิธีการเซตอัพ structure พื้นฐาน และตัวอย่างการใช้ babel + webpack + gulp ในการ compile/transpile โค้ดเราให้มันพร้อมใช้ได้จริงๆ

ผมเองก็พึ่งหัด เพราะงั้นเห็นตรงไหนผิด / ควรแก้ไขก็บอกได้นะ 55

แปะลิ้งที่มีประโยชน์ : <http://blog.differential.com/the-javascript-ecosystem-demystified/>

### 1. เริ่มด้วยการ new project
ไปสร้างโฟลเดอร์ที่เราต้องการแล้วพิม `npm init` โลด มันเป็นคำสั่งสำหรับสร้าง package.json ซึ่งก็คือคอนฟิกของ node project อะแหละ
กด enter ไปรัวๆก่อน จนมันเสร็จ เราจะได้ package.json มาเชยชม

### 2. run javascript ด้วย Node.js

ไปโหลด [Node.js](https://nodejs.org/en/) มากันก่อนคับ
Node.js คือ javascript runtime -- คือแต่ก่อน javascript มันรันบน browser อย่างเดียวไง แต่ก็มีคนที่อยากเอามันมารันบนเครื่อง ซึ่งมันก็ใช้ javascript engine ของ Google Chrome อะแหละ ข้อดีของ Node ที่เค้าโฆษณาคือ non blocking IO/ asynchronous ซึ่งเอาจริงๆ ผมก็ยังไม่รู้สึกว่ามันแตกต่างขนาดที่ต้องย้ายจาก java มาใช้ Node นะ แต่ก็เอาเถอะ 55

หลังจากลง node เสร็จ เราก็มาลองเขียน javascript กัน ก่อนอื่นเลยเราต้องรู้ก่อนว่า javascript นั้น มันเป็นภาษา script อยู่แล้ว คือเขียนแล้วรันได้เลย ไม่เหมือนพวก java, c ที่ต้อง compile เป็น .class ถึงจะใช้งานได้จริง

ขั้นแรกที่อยากให้ลองกันคือสร้างไฟล์ main.js ไก่กามาอันนึง โดยมีโค้ดแค่นี้

{% highlight javascript %}
  console.log('Hello Javascript!');
{% endhighlight %}

เซฟไว้ตรงไหนก็ได้ เช่น myproj/main.js

เสร็จแล้วไปที่ command prompt / terminal แล้วพิมพ์ `node main.js`   มันจะปริ้นออกมาว่า Hello Javascript!

ทีนี้แอดวานซ์ขึ้นมาหน่อย ลองสร้างอีกไฟล์ ข้างๆกัน ชื่อ car.js

{% highlight javascript %}
  class Car{
    constructor(param){
      console.log(param);
    }
  }

  module.exports = Car;
{% endhighlight %}

อันนี้เป็นการสร้าง class Car syntax อาจจะงงๆบ้าง ช่างมันก่อน เอาเป็นว่ามันสร้าง class Car โดยมี constructor รับ parameter มาก็ปริ้นมาดูง่ายๆ

เสร็จแล้วไปแก้ main.js ของเราให้เป็นแบบนี้

{% highlight javascript %}
var Car = require('./car');

let carObj = new Car("red");
{% endhighlight %}

จะเป็นการสร้าง import module car ที่เราสร้างไว้มาเก็บไว้ โดย var Car ในที่นี้จะแทนตัว class Car ส่วน carObj จะเป็นการสร้าง object Car จริงๆขึ้นมาโดยในที่นี้เราใส่ constructor parameter ไปว่า 'red'

ลองไปรัน main.js  ด้วยคำสั่ง `node main.js` มันน่าจะปริ้นคำว่า red นะ

### 3. Compile javascript ด้วย Babel
ตัวอย่างข้างบนเป็นการ import module หรือเรียกเท่ห์ๆว่าการจัดการ module system
วิธีที่เขียนแบบ require('..') เค้าเรียกว่า Common.js หาอ่านเพิ่มได้ในลิ้งที่ผมแปะข้างบน

ทีนี้มันมีวิธีที่ใหม่กว่า เท่ห์ว่า ดีกว่า(ยังไงวะ) คือวิธีการ import แบบใช้มาตรฐาน ECMAScript2015 หรือ ES6 โดยทำแบบนี้
{% highlight javascript %}
  "use strict";
  import Car from './car';

  let carObj = new Car("red");
{% endhighlight javascript %}

ลองเซฟแล้วไปรัน `node main.js` ดู คราวนี้จะเจอเออเร่อ นั่นเป็นเพราะ node javascript runtime มันยังไม่รองรับคำสั่งนี้นั่นเอง ซึ่งก็เป็นคิวของ babel ที่จะมาช่วยเรา (ให้งงไปกว่าเดิม)

เรื่องของเรื่องคือไอมาตรฐาน ECMAScript2015 มันออกมาได้สักพักแล้วหละ แต่พวก runtime/browser ทั้งหลาย มันยังไม่ support เพราะคนมันน้อยมั้ง มันเลยทำไม่ทัน ทีนี้พวก developer วัยรุ่นอย่างเราๆมันใจร้อนอยากลองของใหม่ไง มันเลยมีคนทำ compiler มาแปลง ES6 ให้เป็น ES5 ให้ runtime มันรันได้ (จะรีบกันไปไหนครับพี่) ทีนี้เราก็สามารถเขียนโปรแกรมเราด้วย Syntax ใหม่ๆได้แล้ว (เพียงแต่ต้องคอมไพล์ก่อนรัน เท่านี้เอง เย้ มันง่ายขึ้นหรือยากขึ้นวะเนี่ย - -)

[Babel](https://babeljs.io/) ก็เป็นหนึ่งใน compiler ที่เค้าฮิตๆกัน นั่นเอง
babel มันมีวิธีใช้หลายแบบนะ เช่น import บน <script> tag ใน html แล้วใช้กันตรงนั้นเลยก็ได้ แต่ในที่นี้ผมจะทำแบบฝั่ง server

ก่อนอื่นลง babel กันก่อนด้วยคำสั่ง `npm install --save -g babel`  
--save หมายถึง ให้ไปอัพเดท package.json ด้วยว่าโปรเจคนี้มีการใช้ babel เวลา dev คนอื่น รัน `npm install` npm มันจะไปโหลด babel มาให้ด้วยเลย
-g หมายถึง global คือลง babel ไว้เป็น cmd ในคอมเราเลย เห็นในไกด์บอกไม่ต้อง -g ก็รันได้ แต่ผมรันไม่ได้อะ เลยลง global มันเลย

เสร็จแล้ว เราไปรัน `babel main.js -o out.js` กัน  จะเป็นการ compile main.js แล้ว output file คือ out.js
เปิด out.js ดูจะพบว่า..... โค้ดมันเหมือนกันเลย!! กำ นั่นเป็นเพราะเราลืมบอก babel นั่นเองไว่ให้ compile เป็น ES5

ให้เราสร้าง .babelrc ไว้ในโปรเจคเราอะแหละ

{% highlight json %}
{
  "presets": ["es2015"]
}
{% endhighlight %}

ทีนี้เอาใหม่ รัน `babel main.js -o out.js` ไปดู out.js จะพบว่าหน้าตามันแปลกไป ดูไม่คุ้นเคย โค้ดโคตรงง ไม่ใช่ที่เราเขียนแน่ๆ ไม่เป็นไร ช่างมัน ลองรัน
`node out.js` ดู คราวนี้จะได้ 'red' ออกมาแล้วแหละ เย้

ในการใช้งานจริง เราจะไม่ได้ compile เป็นไฟล์ๆแบบนี้หรอก เราจะคอมไพล์เป็น โฟลเดอร์เลย เหมือน java มันก็คอมไพล์โฟลเดอร์ src แล้วไปออกที่ folder bin อะไรยังงั้น

`babel src --out-dir lib`

ซึ่งเราจะไม่ได้รันเอง แต่จะใช้ตัว task runner ที่ชื่อ gulp มารันให้อีกที  
พอก่อน ขี้เกียจละ
