'use strict';
var cheerio = require('cheerio');
const ROOT_ASSETS_REG = /^\/(assets|images|uploads)\/.*/

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('after_post_render', function (data) {
  var config = hexo.config;
  if (config.post_asset_folder) {
    var link = data.permalink;
    var beginPos = getPosition(link, '/', 3) ;
    // var beginPos =
    var appendLink = '';
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
    // if not with index.html endpos = link.lastIndexOf('.') + 1 support hexo-abbrlink
    var endPos = link.length - 1;
    if (/.*\/index\.html$/.test(link)) {
      // when permalink is end with index.html, for example 2019/02/20/xxtitle/index.html
      // image in xxtitle/ will go to xxtitle/index/
      appendLink = 'index/';
      endPos = link.lastIndexOf('/');
    }
    link = link.substring(beginPos, endPos) + '/' + appendLink;

    var toprocess = ['excerpt', 'more', 'content'];
    for (var i = 0; i < toprocess.length; i++) {
      var key = toprocess[i];

      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img, a').each(function () {
        let $this = $(this);
        let name = this.name ? this.name.toLowerCase() : "";
        if(name === 'a' ){
          let src = $this.attr("href");
          // 排除不需要的
          if(!src || /^\s+\//.test(src) || /http[s]*.*|\/\/.*|^#.*/.test(src)){
            return ;
          }
          // 简单处理assets/images/uploads开头的: /assets
          if (ROOT_ASSETS_REG.test(src)){
            let newSrc = config.root.replace(/\/+$/, "") + src;
            $this.attr('href', newSrc);
            console.info && console.info("update global assets as:-->" + newSrc);
            return ;
          }
          // 切割匹配
          var linkArray = link.split('/').filter(el => el != '');
          var srcArray = src.split('/').filter(el => el != '' && el != '.');
          // asset名称可以对上
          if(!linkArray.length || !srcArray.length || linkArray[linkArray.length - 1] !== srcArray[0]){
            return ;
          }
          // post_name/a.pdf -> a.pdf
          if (srcArray.length > 1)
            srcArray.shift();
          src = srcArray.join('/');

          if ($this.attr('href')) {
            $this.attr('href', link + src);
          }
          console.info && console.info("update href as:-->" + link + src);
          // content
        }else if(name === 'img'){
           // lazyload
          let attrSrc = $this.attr('src') || $this.attr('data-src');
          if (attrSrc) {
            // For windows style path, we replace '\' to '/'.
            var src = attrSrc.replace('\\', '/');
            // 优先处理全局资源
            if(ROOT_ASSETS_REG.test(src)){
              let newSrc = config.root.replace(/\/+$/, "") + src;
              $this.attr($this.attr('src')? 'src':'data-src', newSrc);
              console.info && console.info("update global assets[images] as:-->" + newSrc);
            }else if (!(/http[s]*.*|\/\/.*/.test(src) || /^\s+\//.test(src))) {
              // For "about" page, the first part of "src" can't be removed.
              // In addition, to support multi-level local directory.
              var linkArray = link.split('/').filter(function (elem) {
                return elem != '';
              });
              var srcArray = src.split('/').filter(function (elem) {
                return elem != '' && elem != '.';
              });
              if (srcArray.length > 1)
                srcArray.shift();
              src = srcArray.join('/');
              $this.attr($this.attr('src')? 'src':'data-src', link + src);
              console.info && console.info("update link as:-->" + link + src);
            }
          } else {
            console.info && console.info("no src attr, skipped...");
            console.info && console.info($this);
          }
        }
      });
      data[key] = $.html();
    }
  }
});

