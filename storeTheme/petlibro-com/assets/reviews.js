$(document).ready(function(){
  var interval = null;
  interval = setInterval(Custom_reviewRating,1000);
  function Custom_reviewRating(){
    console.log(343434343);
    var data = $('.Custom_reviewRating').html();
    $('.Custom_reviewRating').remove();
    var cus_sorting_r = $('.cus_sorting_r').html();
    $('.cus_sorting_r').remove();
    if(!$('.jdgm-rev-widg__header div').hasClass('Custom_reviewRating')){
      $('<div class="Custom_reviewRating">'+ data +'</div>').insertAfter('.jdgm-rev-widg__header .jdgm-rev-widg__title');
      $('<div class="cus_sorting_r">'+ cus_sorting_r +'</div>').insertAfter('.jdgm-rev-widg__header .jdgm-widget-actions-wrapper');
    }
    console.log('write a review not Added');
    $('.product-desc-contianer .jdgm-rev-widg__header').addClass('final-wrBtn');
    if(!$('.Custom_reviewRating div').hasClass('jdgm-widget-actions-wrapper')){
      console.log('write a review Added');
      // $('#judgeme_product_reviews[data-from-snippet="true"] .jdgm-rev-widg__header .jdgm-widget-actions-wrapper').insertAfter('#judgeme_product_reviews[data-from-snippet="true"] .jdgm-rev-widg__header .topHeader');
   
    $('.psc-content .jdgm-rev-widg__header .jdgm-widget-actions-wrapper').insertAfter('.psc-content .jdgm-rev-widg__header .topHeader');

      // $('.final-wrBtn.jdgm-rev-widg__header .jdgm-widget-actions-wrapper').insertAfter('.final-wrBtn.jdgm-rev-widg__header .topHeader');

      $('.jdgm-sort-dropdown').eq(0).addClass('desktopOne MobileOne');
      $('.jdgm-sort-dropdown').eq(1).addClass('desktopOne MobileOne');
      var countProductReview = $('.cus-rating .jdgm-prev-badge').attr('data-number-of-reviews');
      $('.sg_count').html('('+countProductReview+')');
      clearInterval(interval);

    }

$('.jdgm-rev-widg__header  form.jdgm-form').append('<span class="jdgm-rev-widg-close-btn"><svg t="1649649203825" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2194" width="20" height="20"><path d="M548.992 503.744L885.44 167.328a31.968 31.968 0 1 0-45.248-45.248L503.744 458.496 167.328 122.08a31.968 31.968 0 1 0-45.248 45.248l336.416 336.416L122.08 840.16a31.968 31.968 0 1 0 45.248 45.248l336.416-336.416L840.16 885.44a31.968 31.968 0 1 0 45.248-45.248L548.992 503.744z" p-id="2195" fill="#1b1b1b"></path></svg></span>');

    
    
    
  }



});



$('body').on("click",".jdgm-rev-widg-close-btn",function(){
 $('.jdgm-form-wrapper').hide();
})


jQuery(document).ready(function(jQuery) {
  var intervall = null;
  interval = setInterval(Custom_reviewRatingg,1000);
  function Custom_reviewRatingg(){
    if($('.jdgm-rev-widg__header').hasClass('final-wrBtn')){
      if(!$('.Custom_reviewRating div').hasClass('jdgm-widget-actions-wrapper')){
        $('.final-wrBtn.jdgm-rev-widg__header .jdgm-widget-actions-wrapper').insertAfter('.final-wrBtn.jdgm-rev-widg__header .topHeader');
        clearInterval(intervall);
      }
    }
  }

});




jQuery(document).ready(function(jQuery) {
  var interval = null;
  interval = setInterval(reviewHtml,2000);
  function reviewHtml(){
    console.log(jQuery(".jdgm-rev__header span.jdgm-rev__rating").length);
    if (jQuery(".jdgm-rev__header span.jdgm-rev__rating").length > 1){
      console.log("found");
      jQuery(".jdgm-rev__header span.jdgm-rev__rating").each(function(index) {
        jQuery(this).next("span.jdgm-rev__timestamp").addBack().wrapAll("<div class='reviewPlusTime' />")
      });

      //       *************************************************************************************************
      jQuery(".jdgm-rev span.jdgm-rev__buyer-badge-wrapper span.jdgm-rev__buyer-badge").each(function(index) {
        var verified ='<img class="verifed_img" src="https://cdn.shopify.com/s/files/1/0252/5197/1119/files/verifed.png?v=1646288388">';
        if (!jQuery(this).find('img').hasClass('verifed_img')){
          jQuery(this).append(verified);  
        }
      });


      //       *************************************************************************************************


      jQuery(".jdgm-rev .jdgm-rev__body-read-more").each(function(index) {
        var readmoretext =$(this).text();
        if(readmoretext == 'Read more'){
          $(this).text('Learn more');
        }
      });

      jQuery(".jdgm-rev .jdgm-rev__votes .jdgm-rev__thumb-btn.jdgm-rev_thumb-up").each(function(index) {
        var Newthumb ='<img class="thumb_img" src="https://cdn.shopify.com/s/files/1/0252/5197/1119/files/thumb.png?v=1646288388">';
        if (!jQuery(this).find('img').hasClass('thumb_img')){
          jQuery(this).append(Newthumb);  
        }
      });

      jQuery(".jdgm-rev .jdgm-rev__header").each(function(index) {
        jQuery(this).next(".jdgm-rev__content").addBack().wrapAll("<div class='header-plus-content' />")
      });
      jQuery(".jdgm-rev__content .jdgm-rev__title").each(function(index) {
        jQuery($(this).parents('.header-plus-content').find('.reviewPlusTime').insertBefore(this));
      });
      clearInterval(interval);
    }
  }

  jQuery(document).on('click','.jdgm-paginate a',function(){
    console.log(jQuery(".jdgm-rev__header span.jdgm-rev__rating").length);
    interval = setInterval(reviewHtml,1200);
  });

  $(document).on('click','.main_sort .allReviews' , function(){
    var reviewData = $(this).attr('data-review');
    $('.main_sort .allReviews').removeClass('review_active');
    $(this).addClass('review_active');
    console.log(reviewData);
    var optionValue = $.trim(reviewData);
    var new_class = '.MobileOne';
    var sortBySelect = document.querySelector(new_class);
    sortBySelect.value = optionValue;
    sortBySelect.dispatchEvent(new Event("change"));
    interval = setInterval(reviewHtml,1200);

  });
});
