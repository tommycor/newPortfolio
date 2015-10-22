// Creates a throttled function, which will run *at most* every `delay`.
// It'll run immediately the first time you call it, because that's a very
// long time since it was last called, as it were.
// e.g. set up a scroll handler which will be called once every 500ms at most
//  $(window).bind('scroll', throttle(my_expensive_scroll_handler, 500));
var throttle = function(callback, delay) {
    var timeout
        ,last_run = 0;
    return function () {
        if (timeout) {
            return;
        }
        var elapsed = (+new Date()) - last_run
            ,context = this
            ,args = arguments
            ,run_callback = function() {
                last_run = +new Date();
                timeout = false;
                callback.apply(context, args);
            }
            ;
        if (elapsed >= delay) {
            run_callback();
        }
        else {
            timeout = setTimeout(run_callback, delay);
        }
    };
};