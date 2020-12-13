<<<<<<< HEAD
function transitionToPage(url){
    $("body").fadeOut(1000,function(){
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
=======
>>>>>>> 196046d13d00cf17e73b2a9ef8113d8b8239ebe9
