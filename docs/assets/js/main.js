/*
* Page interactions
*/
function scroll_to_section() {

    $('.sidebar-list a').on('click', function(e) {

      $('.sidebar-list a').removeClass('is-active');
      $(this).addClass('is-active');

      var target = this.hash;
      var $target = $(target);


      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 300, 'swing');
    });

}

function scroll_to_sub_section() {

    $('.page-anchors a').on('click',function (e) {

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 300, 'swing');

    });
    
}

function scroll_to_top() {
  $('.scroll-top').click(function(){
          $('html, body').animate({scrollTop : 0}, 300);
          return false;
      });
}

function toggle_sidebar() {

    $('.nav__toggle').on('click', function(e) {

          e.preventDefault();

          $(this).parent().toggleClass('is-active');
          $(this).toggleClass('is-active');

          if( $(window).width() > 1024) {
              $('#section-wrapper').toggleClass('shift-left');
          }
      });

}

function detect_mobile() {

    var navToggle = $('.nav__toggle'),
        sideNav = $('.nav__side'),
        sectionWrapper = $('#section-wrapper');

    if( $(window).width() > 1024) {
        navToggle.addClass('is-active');
        sideNav.addClass('is-active');
        sectionWrapper.addClass('shift-left');
    } else {
        navToggle.removeClass('is-active');
        sideNav.removeClass('is-active');
        sectionWrapper.removeClass('shift-left');
    }

}

function fill_viewport() {

  var viewportHeight = $(window).height,
      element = $('.fill-viewport');

  element.css('height', viewportHeight + 'px');

}

function on_ready() {

    $(document).ready( function() {

        scroll_to_section();
        scroll_to_top();
        scroll_to_sub_section();
        toggle_sidebar();
        on_resize();

    });

}

function on_resize() {

    $(window).on( 'resize', function() {

        detect_mobile();
        fill_viewport();

    });

}

/*
* Invoke
*/
(function($, document) {
    on_ready();
    on_resize();


    /* CONNECT TO FIREBASE */
    
  var config = {
      apiKey: "AIzaSyDKIKhiqJjxthQIEB4D8JmzNHAThVp_VxQ",
      authDomain: "lost-grid.firebaseapp.com",
      databaseURL: "https://lost-grid.firebaseio.com",
      projectId: "lost-grid",
      storageBucket: "lost-grid.appspot.com",
      messagingSenderId: "991174246927"
  };

  firebase.initializeApp(config);

/* FIREBASE AUTHENTICATION LISTENER */

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      $('#faq-form').show();
      $('#logout').show();
      $('#login').hide();
    } else {
      $('#faq-form').hide();
      $('#logout').hide();
      $('#login').show();
    }
  });

/* INITIAL SETUP */

  var database = firebase.database();
  var ref = database.ref('faqs');
  ref.on('value', got_data, err_data);

/* DATA HANDLING */

  // handle returned data
  function got_data( data ) {

    // clear the list
    $('#faq-list').empty();

    var faqs = data.val();
    var keys = Object.keys(faqs);

    // show newest first
    keys.reverse();

    for( var i = 0; i < keys.length; i++ ) {
      var k = keys[i];
      var question = faqs[k].question;
      var answer = faqs[k].answer;

      var $faq = '<li class="faq">';
          $faq += '<h2 class="accordion__toggle">'+ question +'</h2>';
          $faq += '<div class="accordion__content">'+ answer +'</div>';
        $faq += '</li>';

      $($faq).appendTo('#faq-list');
    }
  }

  // handle error if no data is returned
  function err_data( err ) {
    console.log( err );
  }

/* LOGIN */

  var provider = new firebase.auth.GithubAuthProvider();

  // login button
  $('#login').on('click', function(e) {

    var auth = firebase.auth();
    var promise = auth.signInWithPopup(provider);
    
    promise.catch(e => console.log(e.provider));

  });

/* FORM ACTION */

  // create new data object each time form is submitted
  function submit_faq() {

    var question_field = $('#faq-question');
    var answer_field = $('#faq-answer');

    var data = {
      question: question_field.val(),
      answer: answer_field.val()
    }

    var ref = database.ref('faqs');
    // push data to firebase
    ref.push(data);

    question_field.val('');
    answer_field.val('');

  }

  // form submit
  $('#faq-form').on('submit', function(e) {
    e.preventDefault();
    submit_faq();
  });

/* USER LOGOUT */

  // logout button
  $('#logout').on('click', function(e) {
    firebase.auth().signOut();
  });

/* ACCORDION */

  $(document).on('click', '.accordion__toggle', function() {

     //Expand or collapse this panel
        $(this).next().slideToggle('fast');

        //Hide the other panels
        $('.accordion__content').not($(this).next()).slideUp('fast');

  });

}(jQuery, document));
