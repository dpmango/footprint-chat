$(document).ready(function(){

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // Sidebar nav fake active
  $('.sidebar-left__nav:not(:first-child)').on('click', function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    triggerPreloader();
  });

  function triggerPreloader(){
    $('.chat').addClass('loading');
    setTimeout(function(){
      $('.chat').removeClass('loading');
    }, 1500);
  }

  //Sidebar toggler section
  $('.sidebar-right__section-title').on('click', function(){
    $(this).parent().find('.sidebar-right__control-dropdown__content').toggleClass('active');
  });

  // Sidebar toggler more
  $('.sidebar-right__content-toggler').on('click', function(){
    var hiddenCount = $(this).data('hidden-cout');
    if ( !$(this).parent().is('.expanded') ){
      $(this).parent().addClass('expanded');
      $(this).parent().find('.sidebar-right__content-link').addClass('show');
      $(this).text('hide...');
    } else{
      $(this).parent().removeClass('expanded');
      $(this).parent().find('.sidebar-right__content-link').removeClass('show');
      $(this).text('+' + hiddenCount + ' more');
    }
  });

});
