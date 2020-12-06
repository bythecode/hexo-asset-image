# hexo-asset-file

# Usege

```shell
npm install hexo-asset-file --save
```

# Example



## Config

Give asset image/file in hexo a absolutely path automatically

**Make sure `post_asset_folder: true` in your `_config.yml`.**

```yml
# 1. root directory:
post_asset_folder: true
permalink: :year/:month/:day/:title/
url: https://tech.panqingshan.cn
root: /

# 2. child directory
post_asset_folder: true
permalink: :year/:month/:day/:title/
url: https://tech.panqingshan.cn/blog
root: /blog/
```



## Examples of Relative Path

```shell
source
├── _posts
│   ├── hello-world.md
│   ├── MacGesture2-Publish
│   │   ├── logo.jpg
│   │   └── 1.pdf
│   └── MacGesture2-Publish.md
├── assets
│   ├── 1.pdf
│   └── 2.png
├── images
│   ├── 1.pdf
│   └── 2.png
├── tags
│   └── index.md
└── uploads
    ├── 1.pdf
    └── 2.png
```

Images:

> Just use `Typora <img src="MacGesture2-Publish/logo.jpg" alt="logo.jpg"  />` or `![logo](MacGesture2-Publish/logo.jpg)` 
>
> ​	to `logo.jpg`
>
> ​	1:`<img src="/:year/:month/:day/:title/logo.jpg" alt="logo.jpg"  />` 或 2:`<img src="/blog/:year/:month/:day/:title/logo.jpg" alt="logo.jpg"  />`



Files:

> Just use `Typora <a href"MacGesture2-Publish/1.pdf">pdf</a>` or `[pdf](MacGesture2-Publish/1.pdf)` 
>
> ​	to `1.pdf`
>
> ​	1:`<a href"/:year/:month/:day/:title/1.pdf">pdf</a>` 或 2:`<a href"/blog/:year/:month/:day/:title//1.pdf">pdf</a>`



## Example of Absolute Path

```shell
source
├── _posts
│   ├── hello-world.md
│   ├── MacGesture2-Publish
│   │   ├── logo.jpg
│   │   └── MacGesture2-Publish.pdf
│   └── MacGesture2-Publish.md
├── assets
│   ├── 1.pdf
│   └── 2.png
├── images
│   ├── 1.pdf
│   └── 2.png
├── tags
│   └── index.md
└── uploads
    ├── 1.pdf
    └── 2.png
```



Images:

> Just use `Typora <img src="/images/1.png" alt="logo.jpg"  />` or `![logo](/images/1.png)` 
>
> ​	to `/images/1.png`
>
> ​	1:`<img src="/images/1.png" alt="logo.jpg"  />` 或 2:`<img src="/blog/images/1.png" alt="logo.jpg"  />`



Files:

> Just use `Typora <a href"/uploads/1.pdf">pdf</a>` or `[pdf](/images/1.pdf)` or `[pdf](/assets/1.pdf)` or `[pdf](/uploads/1.pdf)` 
>
> ​	to `/images/1.png`
>
> ​	1:`<a href"/uploads/1.pdf">pdf</a>` 或 2:`<a href"/blog/uploads/1.pdf">pdf</a>`
>
> ​	1:`<a href"/images/1.pdf">pdf</a>` 或 2:`<a href"/blog/images/1.pdf">pdf</a>`
>
> ​	1:`<a href"/assets/1.pdf">pdf</a>` 或 2:`<a href"/blog/assets/1.pdf">pdf</a>`

# History

2020-12-06: support images/file `Types` of `Absolute/Relative` Path

2018-04-18: support hexo-abbrlink

2020-04-02: support lozad.js