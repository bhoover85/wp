//Returns offset relative to document, needed to calculate multiplier for dynamic width adjustment of #lightbox.
function get_offset($lightbox) {
    return $lightbox.offset();
}

//Center #lightbox in the viewport.
function center_div() {
    var $lightbox = $('#lightbox');
    
    $lightbox.css({
        position:'absolute',
        marginTop: $(window).scrollTop() + "px",
        left: ($(window).width() - $lightbox.outerWidth())/2,
        top: ($(window).height() - $lightbox.outerHeight())/2
    });
}

//Handles the dynamic width adjustment of #lightbox based on the size of the viewport.
function lightbox() {
    
    //DOM elements stored as a variable to save resources.
    var $lightbox = $('#lightbox');
    var $image = $('.image');
    
    //Get offset of #lightbox relative to document
    var offset = get_offset($lightbox);
    var top = offset.top; 
    
    //Since #lightbox is centered in viewport and the viewport is not a set size, 
    //need to calculate distance to travel in order to get the right multiplier for adjusting the width.
    //Height of container - Whitespace above/below #lightbox - Height of #lightbox
    var bottom = 2000 - (2*offset.top) - $lightbox.outerHeight();
    
    //Width multiplier, 800px (initial size) - 266px (final size) = 534px/distance to travel
    var mult = 534/bottom;
    
    $(window).scroll(function(){
        $lightbox.css({
            marginTop: $(window).scrollTop() + "px",
            width: (800 - ($(window).scrollTop()*mult))
        });
        
        $image.css({
            height: $image.width()/1.6
        });
        
        center_div();
    });
}

$(window).resize(function(){
    center_div();
    lightbox();
});

$(document).ready(function() {
    center_div();
    lightbox();
});