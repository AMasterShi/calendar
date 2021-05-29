# calendar
Microsoft calendar control based on JavaScript  
![calendar](img/20210529222932.png "calendar")  
## How to use calendar on your project?
`### 1.import bootstrap`  
Because the style of this project depends on bootstrap, to display the complete style, please import bootstrap into your project first.  
The following is import CSS file through CDN, please import after the title tag of the HTML page.  
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
```  
The following is to import JavaScript file through CDN, please import it before the body end tag of HTML page.  
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
```  
Of course, you can also customize the style.  
`2.import calendar.css ,minidaemon.js and calendar.js`  
* import calendar.css after bootstrap.css  
```html
<link rel="stylesheet" type="text/css" href="./css/calendar.css"/>
```  
* import minidaemon.js and calendar.js after bootstrap.js  
```html
<script src="./js/minidaemon.js" type="text/javascript" charset="utf-8"></script>
<script src="./js/calendar.js"></script>
```
Now, you get a calendar!
