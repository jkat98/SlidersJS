//****************************************************************************
// Custom JavaScript widget that will create and mimic the stock jQuery UI
// slider widget.  The slider should be able to scroll horizontally, contained
// within a bounding box, and report the horizontal value below the slider.
//
// To use: var myslider = new SliderJS(selector, [options])
// [options] = { width: Npx, initial_value: 0, min_value: 0, max_value: 100, show_values: bool }
// *options object can contain any or all of the parameters
//
// Created by: Jason Krol | 6/27/13
//****************************************************************************/

var SliderJS = function (container, options) {
    var self = this;
    self.container = container;
    self.options = options;
    self.tracking = false;

    self.initSliderControls = function () {
        self.element.className += "slider-box";
        self.element.style.width = self.width + "px";

        self.element.innerHTML += "<div class='slide'></div>";
        self.slide = self.element.getElementsByClassName("slide")[0];

        //display the value labels
        if (self.show_values) {
            self.element.insertAdjacentHTML("afterend", "<div id='" + self.container + "_values" + "' class='values' style='width: " + self.width + "px;'><div class='min'>" + self.min_value + "</div><div class='set' style='left: " + self.initial_value + "px; width: " + (self.width - (self.width - self.max_value)) + "px;'>" + self.initial_value + "</div><div class='max' style='right: " + ((self.width - self.max_value) - 10) + "px'>" + self.max_value + "</div></div>");
            self.val_label = document.getElementById(self.container + "_values").getElementsByClassName('set')[0];
        }

        //show blockers if min and max values are set
        if (self.min_value > 0) {
            console.log();
            self.element.insertAdjacentHTML("beforeend", "<div class='min_block' style='width: " + (self.min_value + 1) + "px;'></div>");
        }
        if (self.max_value < self.width) {
            self.element.insertAdjacentHTML("beforeend", "<div class='max_block' style='width: " + ((self.width - self.max_value)-10) + "px;'></div>");
        }

        //track mouse events:
        self.slide.onmousedown = function () {
            self.tracking = true;
            self.slide.className += " active";
            window.SliderJS_cslider = self;
        }
        document.onmouseup = function () {
            window.SliderJS_cslider.tracking = false;
            window.SliderJS_cslider.slide.className = window.SliderJS_cslider.slide.className.replace("active", "");
        }
        document.onmousemove = function (e) {
            if (typeof window.SliderJS_cslider !== 'undefined') {
                if (window.SliderJS_cslider.tracking) {
                    var x = e.clientX - 30;
                    if (x > (window.SliderJS_cslider.min_value) && x < (window.SliderJS_cslider.max_value)) {
                        //allow it
                        window.SliderJS_cslider.setPosition(x);
                    }
                    else if (x < window.SliderJS_cslider.min_value) {
                        window.SliderJS_cslider.setPosition(window.SliderJS_cslider.min_value);
                    }
                    else if (x > window.SliderJS_cslider.max_value) {
                        window.SliderJS_cslider.setPosition(window.SliderJS_cslider.max_value);
                    }
                }
            }
        }

        self.setPosition(self.initial_value);
    };

    //set the slides left position and update the current position label if set via options
    self.setPosition = function(left) {
        self.slide.style.left = left + 'px';
        if (self.show_values) {
            if (document.all) {
                self.val_label.innerText = left;
            } else {
                self.val_label.textContent = left;
            }

        }
    };

    //return the current position of the slide
    self.getPosition = function(){
        return self.slide[0].style.left.replace('px','');
    };



    //initialize:
    (function () {
        if (typeof self.container !== 'undefined') {
            if (self.container.indexOf('#') === 0)
                self.element = document.getElementById(self.container.substring(1));
            else if (self.container.indexOf('.') === 0)
                self.element = document.getElementsByClassName(self.container.substring(1));

            self.width = 400;
            self.initial_value = 0;
            self.min_value = 0;
            self.max_value = self.width;
            self.show_values = true;

            if (typeof self.options !== 'undefined') {
                if (typeof self.options.width !== 'undefined') self.width = self.options.width;
                if (typeof self.options.initial_value !== 'undefined') self.initial_value = self.options.initial_value;
                if (typeof self.options.min_value !== 'undefined') self.min_value = self.options.min_value;
                if (typeof self.options.max_value !== 'undefined') { self.max_value = self.options.max_value; } else { self.max_value = self.width; };
                if (typeof self.options.show_values !== 'undefined') self.show_values = self.options.show_values;
            }

            //console.log(s);
            self.initSliderControls();
        }
    })();

}
