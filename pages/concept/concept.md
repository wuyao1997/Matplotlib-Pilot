<h2 class="collapsible" onclick="toggleContent(this)"> 标识符-matplotlib.markers </h2>

<div class="collapsible-content">
可以在绘图函数内通过`marker="marker name"`设置标识符，
标识符大小通过`markersize1=<16>`设置。

[点击这里去 官网-markers](https://matplotlib.org/stable/api/markers_api.html)

下面是一些常用的`marker name`

| marker | symbol                                   | description    |
| ------ | ---------------------------------------- | -------------- |
| "."    | ![point](image/marker/m00.webp)          | point          |
| ","    | ![pixel](image/marker/m01.webp)          | pixel          |
| "o"    | ![circle](image/marker/m02.webp)         | circle         |
| "v"    | ![triangle_down](image/marker/m03.webp)  | triangle_down  |
| "^"    | ![triangle_up](image/marker/m04.webp)    | triangle_up    |
| "<"    | ![triangle_left](image/marker/m05.webp)  | triangle_left  |
| ">"    | ![triangle_right](image/marker/m06.webp) | triangle_right |
| "1"    | ![tri_down](image/marker/m07.webp)       | tri_down       |
| "2"    | ![tri_up](image/marker/m08.webp)         | tri_up         |
| "3"    | ![tri_left](image/marker/m09.webp)       | tri_left       |
| "4"    | ![tri_right](image/marker/m10.webp)      | tri_right      |
| "8"    | ![octagon](image/marker/m11.webp)        | octagon        |
| "s"    | ![square](image/marker/m12.webp)         | square         |
| "p"    | ![pentagon](image/marker/m13.webp)       | pentagon       |
| "P"    | ![plus(filled)](image/marker/m23.webp)   | plus(filled)   |
| "\*"   | ![star](image/marker/m14.webp)           | star           |
| "h"    | ![hexagon1](image/marker/m15.webp)       | hexagon1       |
| "H"    | ![hexagon2](image/marker/m16.webp)       | hexagon2       |
| "+"    | ![plus](image/marker/m17.webp)           | plus           |
| "x"    | ![x](image/marker/m18.webp)              | x              |
| "X"    | ![x(filled)](image/marker/m24.webp)      | x(filled)      |
| "D"    | ![diamond](image/marker/m19.webp)        | diamond        |
| "d"    | ![thin_diamond](image/marker/m20.webp)   | thin_diamond   |
| "\|"   | ![vline](image/marker/m21.webp)          | vline          |
| "\_"   | ![hline](image/marker/m22.webp)          | hline          |

</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 颜色-matplotlib.colors </h2>

<div class="collapsible-content">

[点击这里去官网 颜色-matplotlib.colors](https://matplotlib.org/stable/gallery/color/named_colors.html)

颜色的控制参数为`color="color name"`，`color name`有很多形式，包括

1. 单字母

![](image/color/named_colors_2.png)

2. 单词

![](image/color/named_colors_1.png)

3. 六位十六进制颜色值

- "#ff0094"
- "#ff0000"
- "#000000"
</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 颜色映射-colormap </h2>
<div class="collapsible-content">
[点击这里去官网 颜色映射-colormap](https://matplotlib.org/stable/gallery/color/colormap_reference.html)

颜色映射的控制参数为`cmap="colormap name"`，常用的`colormap name`为

- `jet`: `ANSYS Fluent`默认选项
- `coolwarm`: `Paraview`默认选项
- `hot`: `Comsol`默认选项
- `Greys` or `gray`: 灰度
- `binary`: 黑白二值
- 所有`colormapname`均支持`colormapname_r`来反转

![](image/cmap/cmap_1.png)
![](image/cmap/cmap_2.png)
![](image/cmap/cmap_3.png)
![](image/cmap/cmap_4.png)
![](image/cmap/cmap_5.png)
![](image/cmap/cmap_6.png)
![](image/cmap/cmap_7.png)
![](image/cmap/cmap_8.png)

</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 线形-linestyles </h2>
<div class="collapsible-content">
线型参数可以通过`linestyle="linestyle name"`设置，
线宽控制为`linewidth=<2>` or `lw=<2>`
常用的`linestyle name`为：

- `solid` 实线
- `dotted` 点线
- `dashed` 虚线
- `dashdot` 点画线

线形还可以通过一个元组`(a, (b,c,...))`控制，其中

- `a`: 线条的重复方式，通常为 0
- `b`: 线段长度
- `c`: 空白长度
- `d`: 下一段线长度(可选)
- `e`: 下一段空白长度(可选)

下面是一些效果，也可以 [点击这里去官网 线形-linestyles](https://matplotlib.org/stable/gallery/lines_bars_and_markers/linestyles.html)

![](image/ls/linestyle.png)

</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 阴影线-matplotlib.hatch </h2>
<div class="collapsible-content">
可以在一些绘图函数中通过`hatch`参数指定`patch`对象的填充值，
这一点在一些[条形图](https://matplotlib.org/stable/gallery/shapes_and_collections/hatch_demo.html)中常用于区分不同组数据。 也可以 [点击这里去官网 阴影线-matplotlib.hatch](https://matplotlib.org/stable/gallery/shapes_and_collections/hatch_style_reference.html)

以下是`hatch`参数的一些可选值

1. 单个字符决定样式

![](image/hatch/hatch_1.webp)

2. 重复字符可以增加密度

![](image/hatch/hatch_2.webp)

3. 组合字符可以组合样式

![](image/hatch/hatch_3.webp)

</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 文本框-BoxStyle </h2>
<div class="collapsible-content">
[点击这里去官网-BoxStyle](https://matplotlib.org/stable/api/_as_gen/matplotlib.patches.BoxStyle.html)

1. 下面的代码演示了`Axes.text`函数中指定文本框的方法，效果如下图。

<pre>
fig, ax = plt.subplots(figsize=(3,2), dpi=300)

ax.text(0.1, 0.8, "square", bbox=dict(boxstyle='square', fc='silver', ec='gray', pad=0.5))
ax.text(0.1, 0.5, "circle", bbox=dict(boxstyle='circle', fc='silver', ec='gray'))
ax.text(0.1, 0.2, "ellipse", bbox=dict(boxstyle='ellipse', fc='silver', ec='gray'))

ax.text(0.42, 0.8, "larrow", bbox=dict(boxstyle='larrow', fc='silver', ec='gray'))
ax.text(0.7, 0.8, "rarrow", bbox=dict(boxstyle='rarrow', fc='silver', ec='gray'))
ax.text(0.55, 0.5, "darrow", bbox=dict(boxstyle='darrow', fc='silver', ec='gray'))

ax.text(0.42, 0.2, "round", bbox=dict(boxstyle='round', fc='silver', ec='gray'))
ax.text(0.7, 0.2, "round4", bbox=dict(boxstyle='round4', fc='silver', ec='gray'))
</pre>

![boxstyle](image/boxstyle/boxstyle.png)

2. 对于创建时没有添加文本框的文本对象，可以使用 set_bbox 方法添加，例如

<pre>
fig, ax = plt.subplots(figsize=(3,1), dpi=200)

xticks = ax.set_xticks([0,1.57,3.14],[0,r'0.5$\pi$', r'$\pi$'])

for text in ax.get_xticklabels():
    text.set_bbox(dict(facecolor='salmon', pad=3, alpha=0.5))
    text.get_bbox_patch().set_edgecolor('none')
</pre>

![boxstyle](image/boxstyle/xticklabel_box.png)

3. 轮廓线线型、线宽、重设颜色等可以在通过 get_bbox_patch()函数获取文本框对象后，使用 set_color,set_edgecolor,set_linstyle 等函数确定
</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 箭头-ArrowStyle </h2>
<div class="collapsible-content">
[点击这里去官网-箭头ArrowStyle](https://matplotlib.org/stable/api/_as_gen/matplotlib.patches.ArrowStyle.html)

ArrowStyle 中通常在 annotate 中使用，用户可以使用如下方式修改默认参数：

<pre>
from matplotlib.patches import ArrowStyle
ax.annotate("->", xytext=(0.1,0.25), xy=(0.9,0.25),
    arrowprops=dict(
        arrowstyle=ArrowStyle('->', head_length=.4, head_width=.4), 
        connectionstyle="arc3,rad=-0.0",
        color="k", shrinkA=5, shrinkB=5,
    ), bbox=dict(boxstyle="square", fc="w"))
</pre>

下图是 matplotlib 中可用的箭头样式及其关键字参数默认值，参数含义见下表。
![](image/arrowstyle/arrowstyle.png)

| 关键字             | 含义                                    |
| ------------------ | --------------------------------------- |
| `head_length`      | 箭头的长度                              |
| `head_width`       | 箭头的敞开宽度                          |
| `widthA, widthB`   | 起点和终点的中括号张开长度              |
| `lengthA, lengthB` | 起点和终点中括号的齿牙长度              |
| `angleA, angleB`   | 起点和重点的中括号角度                  |
| `tail_width`       | 箭头尾部宽度                            |
| `shrink_factor`    | 控制楔形鼓起程度，通常保持为默认值`0.5` |

</div>

<h2 class="collapsible" onclick="toggleContent(this)"> 绘图样式-matplotlib.style </h2>
<div class="collapsible-content">
可以使用`plt.style.use('bmh')`设置相应的风格，
其中风格字符串名可以使用`print(plt.style.available)`打印，
安装一些库（例如`pip install SciencePlots`）后可以使用更多风格。

以下时一些内置风格，也可以 [点击这里去官网 绘图样式-matplotlib.style](https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html)。

![bmh](image/style/bmh.png)
![fivethirtyeight](image/style/fivethirtyeight.png)
![seaborn-v0_8-bright](image/style/seaborn-v0_8-bright.png)
![seaborn-v0_8-dark-palette](image/style/seaborn-v0_8-dark-palette.png)
![seaborn-v0_8-paper](image/style/seaborn-v0_8-paper.png)
![seaborn-v0_8-ticks](image/style/seaborn-v0_8-ticks.png)
![tableau-colorblind10](image/style/tableau-colorblind10.png)
![dark_background](image/style/dark_background.png)
![ggplot](image/style/ggplot.png)
![seaborn-v0_8-colorblind](image/style/seaborn-v0_8-colorblind.png)
![seaborn-v0_8-deep](image/style/seaborn-v0_8-deep.png)
![seaborn-v0_8-muted](image/style/seaborn-v0_8-muted.png)
![seaborn-v0_8-pastel](image/style/seaborn-v0_8-pastel.png)
![seaborn-v0_8-poster](image/style/seaborn-v0_8-poster.png)
![seaborn-v0_8-talk](image/style/seaborn-v0_8-talk.png)
![default](image/style/default.png)
![grayscale](image/style/grayscale.png)
![seaborn-v0_8-dark](image/style/seaborn-v0_8-dark.png)
![seaborn-v0_8-darkgrid](image/style/seaborn-v0_8-darkgrid.png)
![seaborn-v0_8-notebook](image/style/seaborn-v0_8-notebook.png)
![seaborn-v0_8-white](image/style/seaborn-v0_8-white.png)
![seaborn-v0_8-whitegrid](image/style/seaborn-v0_8-whitegrid.png)
![fast](image/style/fast.png)
![seaborn-v0_8](image/style/seaborn-v0_8.png)
![Solarize_Light2](image/style/Solarize_Light2.png)

</div>
