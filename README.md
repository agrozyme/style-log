# style-log
這是用來產生有顏色 (樣式) 的 Log 訊息的模組

# 簡介
- 使用 ES6 的語法
- 可指定 log 函數
- 可指定預設的樣式，以及串接訊息的字串

# 執行需求
- node.js 版本 6.0.0 以上

# 安裝
```sh
npm install style-log --save
```

# 範例

```js
let styleLog = require('style-log');
let gutil = require('gulp-util');
let colors = gutil.colors;

let log = new styleLog({
  log: gutil.log,
  pairJoin: ' => ',
  inlineJoin: ', ',
  labelStyle: colors.magenta,
  textStyle: colors.gray
});

let options = {labelStyle: colors.magenta, textStyle: colors.gray, inlineJoin: false};
let styleArrayItems = [['text1', options], 123];
let pairObjectItem = {key1: 'value1', key2: 'value2'};
let pairArrayItems = [['key1', 'value1', options], 123];

log.style('single text', colors.green);
log.styleArray(styleArrayItems, options);
log.pair('key', 'value', options);
log.pairArray(pairArrayItems, options);
log.pairObject(pairObjectItem, options);

```

# 參數
底下是創建 Log 實體時，可傳入的參數：

- log ```function```: 實際上執行 log 功能時的函數，預設值為 ```console.log```

- pairJoin ```string```: 處理 Key-Value 訊息時，串接 Key 與 Value 間的字串，著色時不會有任何樣式，預設值為 ```: ```

- inlineJoin ```string```: 把多行訊息合併成一行時，串接多行訊息的字串，著色時不會有任何樣式，預設值為 ```, ```

- labelStyle ```function```: 處理 Key-Value 訊息時，Key 的樣式函數，預設值為 ``` (text) => '' + text ```

- textStyle ```function```: 預設的樣式函數，預設值為 ``` (text) => '' + text ```

# API

- style(text = '', textStyle = this.options.textStyle, log = true)

  - text ```string```: 要處理的字串
  - textStyle ```function```: 字串的樣式函數
  - log ```boolean```: 是否要進行 Log

  傳回值 ```string```：著色完的字串

- styleArray(items = [], options = {}, log = true)

  - items ```string[][]```: 一個二維陣列，該陣列的內部元素可以是可丟進 style 處理的陣列；而其他的非陣列值會被當成字串來處理
  - options ```object```: 請參考 參數 一節
  - log ```boolean```: 是否要進行 Log

  傳回值 ```string[]```：著色完後的字串陣列

- pair(label = '', text = '', options = {}, log = true)

  - label ```string```: 字串1
  - text ```string```: 字串2
  - options ```object```: 請參考 參數 一節
  - log ```boolean```: 是否要進行 Log

  傳回值 ```string```：著色完後的 字串1 + pairJoin + 字串2

- pairArray(items = [], options = {}, log = true)

  - items ```string[][]```: 一個二維陣列，該陣列的內部元素可以是可丟進 pair 處理的陣列；而其他的非陣列值會被當成字串來處理
  - options ```object```: 請參考 參數 一節
  - log ```boolean```: 是否要進行 Log

  傳回值 ```string[]```：著色完後的字串陣列

- pairObject(items = {}, options = {}, log = true)

  - items ```object```: 一個 label : text 的物件，label 與 text 可丟進 pair 處理
  - options ```object```: 請參考 參數 一節
  - log ```boolean```: 是否要進行 Log

  傳回值 ```string[]```：著色完後的字串陣列

# 備註

- 有 options 參數的 API，會將傳入的 options 與創建時的 options 做結合運算，確定實際使用的參數。
- 對於 styleArray、pairArray、pairObject 這幾個 API 來說，inlineJoin 還有另外一個額外的意義：

  - 如果 false == inlineJoin，在實際做 Log 時，會做多行輸出
  - 其他狀況會把訊息合併成一行輸出，但傳回值依然是字串陣列
