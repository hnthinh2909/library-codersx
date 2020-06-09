$('#myButton').click(function(){
    var that = $(this);
    that.attr('disabled', true);
    var timer = setTimeout(function(){
        that.attr('disabled', false);
    }, 55000);
});