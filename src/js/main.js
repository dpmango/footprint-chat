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
    triggerPreloader('empty');
  });

  $('.chat__navigation__toggler').on('click', function(){
    if( !$(this).is('.active') ){
      triggerPreloader('error');
    }
  });

  function triggerPreloader(status){
    $('.preloader-error').remove();
    $('.chat').addClass('loading');
    if ( status == 'empty' ){
      setTimeout(function(){
        $('.chat').removeClass('loading');
      }, 1500);
    } else if (status == 'error'){
      setTimeout(function(){
        $('.preloader').append('<div class="preloader-error">Internet connection lost, please try again...</div>');
      }, 1000);

      setTimeout(function(){
        $('.chat').removeClass('loading');
      }, 5000);
    }
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

  // Fake messages sending
  $('.chat__writing-area__new-message').keyup(function(e){
    if(e.keyCode == 13){
      var message = $(this).val();
      $(this).val('');
      fakeMessaging(message);
    }
  });
  $('.chat__writing-area__submit-message').on('click', function(){
    var message = $('.chat__writing-area__new-message').val();
    $('.chat__writing-area__new-message').val('');
    fakeMessaging(message);
  });

  function fakeMessaging(messageParam){
    var message = messageParam;
    var messageToHtml =
      "<div class='chat__message'> \
        <div class='chat__message__wrapper--self'> \
          <div class='chat__message__profile-pic'><img src='images/profile_pic_4.png'></div> \
          <div class='chat__message__author'> Sergey Khmelevskoy<span>Mon, Jan 23, 16:08 PM</span></div> \
          <div class='chat__message__content'>"
          +  "<p>" + message + "</p>" +
          "</div> \
          <div class='chat__message__icon'></div> \
        </div> \
      </div>";
    var messageToAppend = $(messageToHtml).hide().fadeIn(1000);
    $('.chat__messages').append(messageToAppend);

    //scroll to bottom then
    var scrollObject    = $('.chat__scrollable-area');
    var height = scrollObject[0].scrollHeight;
    scrollObject.animate({scrollTop: height}, 1000);

    // Make fake reply after
    setTimeout(function(){
      var message = ["Really?", "Sounds great!", "Hey! Nice to hear from you", "What's your plan?", "How are you doing?", "Love it!", "Yeh, I think this is right", "Maybe later on", "Have you talked with Francesca about that?", "Im not sure if I understand you", "Can we discuss it later?", "Please the the attachement above. We already did that", "No.", "Thanks!"]
      var randomItem = Math.floor(Math.random() * message.length);
      var messageToHtml =
        "<div class='chat__message'> \
          <div class='chat__message__wrapper--self'> \
            <div class='chat__message__profile-pic'><img src='images/Koala.png'></div> \
            <div class='chat__message__author'> Koala<span>Mon, Jan 23, 16:08 PM</span></div> \
            <div class='chat__message__content'>"
            +  "<p>" + message[randomItem] + "</p>" +
            "</div> \
            <div class='chat__message__icon'></div> \
          </div> \
        </div>";
      var messageToAppend = $(messageToHtml).hide().fadeIn(1000);
      $('.chat__messages').append(messageToAppend);
      scrollObject.animate({scrollTop: height}, 1000);
    }, 5000);
  }

  // DROPDOWNS
  $('.chat__controls__icon-menu').on('click', function(){
    $(this).find('.chat__controls__icon-menu__dropdown').toggleClass('active');
  });

  $('.chat__controls__icon-menu__dropdown li').on('click', function(e){
    e.preventDefault();
    triggerPreloader('error');
    e.stopPropagation();
  });

  // active area - exit on click outside
  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($('.chat__controls__icon-menu'));
    container.push($('.chat__controls__icon-menu__dropdown'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });
  // MOBILE
  // plain javascript as 3.x not hapy about slideout - refactor
  var slideoutLeft = new Slideout({
    'panel': document.querySelector('.chat'),
    'menu': document.querySelector('.sidebar-left'),
    'padding': 80,
    'tolerance': 70,
    'easing': 'ease-out'
  });
  slideoutLeft.on('beforeopen', function() {
    $('.sidebar-left').addClass('active');
  });
  slideoutLeft.on('beforeclose', function() {
    $('.sidebar-left').removeClass('active');
  });

  var slideoutRight = new Slideout({
    'panel': document.querySelector('.chat'),
    'menu': document.querySelector('.sidebar-right'),
    'padding': 240,
    'tolerance': 70,
    'easing': 'ease-out',
    'side': 'right'
  });
  slideoutRight.on('beforeopen', function() {
    $('.sidebar-right').addClass('active');
  });
  slideoutRight.on('beforeclose', function() {
    $('.sidebar-right').removeClass('active');
  });

  // Toggle button
  document.querySelector('.ico-hamburger').addEventListener('click', function() {
    slideoutLeft.toggle();
  });

  document.querySelector('.chat__mobile-header__menu-right').addEventListener('click', function() {
    slideoutRight.toggle();
  });

  $('.sidebar-left__nav-icon .ico-logo').on('click', function(){
    if($(window).width() < 992 && $(window).width() > 568 ){
      $('.sidebar-right').toggleClass('active');
    }else{
      $('.sidebar-right').removeClass('active');
    }
  });

  $(window).resize(function() {
    if($(window).width() < 568 ){
      $('.sidebar-right').removeClass('active');
      $('.chat').css('transform', 'translateX(0)');
    }
  });


});
