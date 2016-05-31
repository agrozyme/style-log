'use strict';
let $ = require('autoload-modules')({paths: module.paths});

module.exports = class {
  constructor(options = {}) {
    this.options = Object.assign({}, this.defaultOptions(), options);
    return this;
  }

  defaultOptions() {
    return {
      log: console.log,
      pairJoin: ': ',
      inlineJoin: ', ',
      labelStyle: (text) => '' + text,
      textStyle: (text) => '' + text
    };
  }

  doLog(text = '', log = true) {
    if (log) {
      this.options.log(text);
    }
  }

  doMultiLog(data = [], log = true) {
    if (log) {
      data.forEach((text) => {
        this.options.log(text);
      });
    }

    return data;
  }

  inline(items = [], inlineJoin = this.options.inlineJoin, log = true) {
    let text = items.join(inlineJoin);
    this.doLog(text, log);
    return text;
  }

  multiLine(items = [], textStyle = this.options.textStyle, log = true) {
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [text = '', useTextStyle = textStyle] = item;
        data.push(useTextStyle(text));
      } else {
        data.push(item);
      }
    });

    return this.doMultiLog(data, log);
  }

  style(text = '', textStyle = this.options.textStyle, log = true) {
    let useText = textStyle(text);
    this.doLog(useText, log);
    return useText;
  }

  format(text = '', args = [], textStyle = this.options.textStyle, log = true) {
    args.unshift(text);
    return this.style($.util.format.apply(null, args), textStyle, log);
  }

  pair(label = '', text = '', options = {}, log = true) {
    let useOptions = Object.assign({}, this.options, options);
    let useText = useOptions.labelStyle(label + useOptions.pairJoin) + useOptions.textStyle(text);
    this.doLog(useText, log);
    return useText;
  }

  pairArray(items = [], options = {}, log = true) {
    let useOptions = Object.assign({}, this.options, options);
    let inlineJoin = useOptions.inlineJoin;
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [label = '', text = '', style = {}] = item;
        let useStyle = Object.assign({}, useOptions, style);
        data.push(this.pair(label, text, useStyle, false));
      } else {
        data.push(item);
      }
    });

    return (inlineJoin) ? this.inline(data, inlineJoin, log) : this.doMultiLog(data, log);
  }

  pairObject(items = {}, options = {}, log = true) {
    let useOptions = Object.assign({}, this.options, options);
    let inlineJoin = useOptions.inlineJoin;
    let data = [];

    Object.keys(items).forEach((index) => {
      data.push(this.pair(index, items[index], useOptions, false));
    });

    return (inlineJoin) ? this.inline(data, inlineJoin, log) : this.doMultiLog(data, log);
  }

};
