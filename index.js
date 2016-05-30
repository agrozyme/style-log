'use strict';
let $ = require('autoload-modules')({paths: module.paths});

module.exports = class {
  options = {
    log: console.log, pairJoin: ': ', inlineJoin: ', ', labelStyle: (text) => '' + text, textStyle: (text) => '' + text
  };

  constructor(options = {}) {
    let that = this;

    Object.keys(that.options).forEach((index)=> {
      if (options.hasOwnProperty(index)) {
        that.options[index] = options[index];
      }
    });

    return that;
  }

  doLog(text = '', log = true) {
    let that = this;

    if (log) {
      that.options.log(text);
    }
  }

  style(text = '', textStyle = this.options.textStyle, log = true) {
    let that = this;
    let useText = textStyle(text);
    that.doLog(useText, log);
    return uesText;
  }

  format(text = '', args = [], textStyle = this.options.textStyle, log = true) {
    let that = this;
    args.unshift(text);
    return that.style($.util.format.apply(null, args), textStyle, log);
  }

  inline(items = [], log = true) {
    let that = this;
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [text = '', style = that.options.textStyle] = item;
        data.push(style(text));
      } else {
        data.push(that.default.style(item));
      }
    });

    let useText = data.join(that.options.inlineJoin);
    that.doLog(useText, log);
    return useText;
  }

  pair(label = '', text = '', {labelStyle = this.options.labelStyle, textStyle= this.options.textStyle} = {}, log = false) {
    let that = this;
    let useText = labelStyle(label + that.options.pairJoin) + textStyle(text);
    that.doLog(useText, log);
    return useText;
  }

  pairItems(items = [], inline = false, log = false) {
    let that = this;
    let data = [];

    items.forEach((item) => {
      if ($.util.isArray(item)) {
        let [label = '', text = '', style = {}] = item;
        data.push(that.pair(label, text, style, false));
      } else {
        data.push(that.default.style(item));
      }
    });

    if (inline) {
      that.doLog(data.join(that.options.inlineJoin), log);
    } else {
      data.forEach((item) => {
        that.doLog(item, log);
      });
    }

    return data;
  }
};
