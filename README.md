#SlidersJS

Custom JavaScript widget that will create and mimic the stock jQuery UI
slider widget.  The slider should be able to scroll horizontally, contained
within a bounding box, and report the horizontal value below the slider.

##To use:

    var myslider = new AWSlider(selector, [options])

[options] = { width: Npx, initial_value: 0, min_value: 0, max_value: 100, show_values: bool }
 *options object can contain any or all of the parameters

##Samples

HTML code:

    <div id="slider1"></div>
    <div id="slider4"></div>
    <div id="slider2"></div>
    <div id="slider3"></div>

JavaScript code:

    var myslider1 = new AWSlider('#slider1');
    var myslider2 = new AWSlider('#slider2', { width: 500 });
    var myslider3 = new AWSlider('#slider3', { width: 700, initial_value: 100, min_value: 50, max_value: 300, show_values: false });
    var myslider4 = new AWSlider('#slider4', { width: 600, initial_value: 75, min_value: 25, max_value: 375 });
