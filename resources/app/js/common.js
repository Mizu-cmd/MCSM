function transitionToPage(url){
    $("body").fadeOut(100,function(){
        window.location.href = url;
    })
}

$('a').on("click",function(){
    transitionToPage($(this).attr('link'));
    console.log('cliked');
});

$(window).on('load',function() {
    $('body').css('opacity', 1)
});