

(function( jQuery ){
  var $module = jQuery('#m-1632162024596').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );
    
    
    /* add your custom script here */
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    (function( jQuery ){
  var $module = jQuery('#m-1585826704073').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );/* add your custom script here */(function( jQuery ){
  var $module = jQuery('#m-1585826704104').children('.module');
  var style = $module.attr('data-style');
  var updatePrice = $module.attr('data-updateprice');

  $module.gfV3ProductQuantity({
    'style': style,
    'updatePrice': updatePrice
  });
})( window.GemQuery || jQuery );(function(jQuery) {
  var $module = jQuery('#m-1585826704083').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {}
  });
})(window.GemQuery || jQuery);(function(jQuery) {
    var $module = jQuery('#m-1585826704073-2').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);(function( jQuery ){
  var $module = jQuery('#m-1585826704166').children('.module');
  $module.gfV1StockCounter();
})( window.GemQuery || jQuery );(function( jQuery ){
  var $module = jQuery('#m-1585826704073-3').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );(function(jQuery) {
  var $module = jQuery('#m-1585826704073-0').children('.module');
  var effect = $module.attr('data-effect');
  var magnify = $module.attr('data-zoom-level');
  var displayType = $module.attr('data-displaytype');
  $module.gfV3ProductImage({
    'effect': effect,
    'displayType': displayType,
    'magnify': magnify
  });
})(window.GemQuery || jQuery);
(function(jQuery) {
var $module = jQuery('#m-1632163153729').children('.module');
$module.gfV4ProductImageList({
  onImageClicked: function(imageUrl, imageZoomUrl) {}
});

var style = $module.attr('data-style');
switch(style) {
  case 'slider':
      var navspeed = $module.data('navspeed'),
          navlg = $module.data('navlg'),
          navmd = $module.data('navmd'),
          navsm = $module.data('navsm'),
          navxs = $module.data('navxs'),
          collg = $module.data('collg'),
          colmd = $module.data('colmd'),
          colsm = $module.data('colsm'),
          colxs = $module.data('colxs'),
          dotslg = $module.data('dotslg'),
          dotsmd = $module.data('dotsmd'),
          dotssm = $module.data('dotssm'),
          dotsxs = $module.data('dotsxs'),

          marginlg = parseInt($module.data('mlg')),
          marginmd = parseInt($module.data('mmd')),
          marginsm = parseInt($module.data('msm')),
          marginxs = parseInt($module.data('mxs'));

      var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
      if(mode == 'production') {
          var loop = $module.data('loop');
      } else {
          var loop = 0;
      }
      $module.find('.gf_product-images-list').children().each( function( index ) {
        jQuery(this).attr( 'data-position', index );
      });
      $module.find('.gf_product-images-list').owlCarousel({
          mouseDrag: false,
          navSpeed: navspeed,
          autoWidth: !1,
          loop: loop,
          responsiveClass:true,
          responsive:{
              0:{
                  items:colxs,
                  nav: navxs,
                  dots:dotsxs,
                  margin: marginxs
              },
              768:{
                  items:colsm,
                  nav: navsm,
                  dots:dotssm,
                  margin: marginsm
              },
              992:{
                  items:colmd,
                  nav: navmd,
                  dots:dotsmd,
                  margin: marginmd
              },
              1200:{
                  items:collg,
                  nav: navlg,
                  dots:dotslg,
                  margin: marginlg
              }
          },
          onInitialized: function(){
            $module.closest('.module-wrap[data-label="(P) Image List"]').addClass('gf-carousel-loaded');
          }
      }); 
      break;
}
})(window.GemQuery || jQuery); 
    (function( jQuery ){
  var $module = jQuery('#m-1637806072129').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );/* add your custom script here */(function( jQuery ){
  var $module = jQuery('#m-1637806072172').children('.module');
  var style = $module.attr('data-style');
  var updatePrice = $module.attr('data-updateprice');

  $module.gfV3ProductQuantity({
    'style': style,
    'updatePrice': updatePrice
  });
})( window.GemQuery || jQuery );(function(jQuery) {
  var $module = jQuery('#m-1637806072158').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {}
  });
})(window.GemQuery || jQuery);(function(jQuery) {
    var $module = jQuery('#m-1637806072129-2').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);(function( jQuery ){
  var $module = jQuery('#m-1637806072175').children('.module');
  $module.gfV1StockCounter();
})( window.GemQuery || jQuery );(function( jQuery ){
  var $module = jQuery('#m-1637806072129-3').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );(function(jQuery) {
  var $module = jQuery('#m-1637806072129-0').children('.module');
  var effect = $module.attr('data-effect');
  var magnify = $module.attr('data-zoom-level');
  var displayType = $module.attr('data-displaytype');
  $module.gfV3ProductImage({
    'effect': effect,
    'displayType': displayType,
    'magnify': magnify
  });
})(window.GemQuery || jQuery);
(function(jQuery) {
var $module = jQuery('#m-1637806072214').children('.module');
$module.gfV4ProductImageList({
  onImageClicked: function(imageUrl, imageZoomUrl) {}
});

var style = $module.attr('data-style');
switch(style) {
  case 'slider':
      var navspeed = $module.data('navspeed'),
          navlg = $module.data('navlg'),
          navmd = $module.data('navmd'),
          navsm = $module.data('navsm'),
          navxs = $module.data('navxs'),
          collg = $module.data('collg'),
          colmd = $module.data('colmd'),
          colsm = $module.data('colsm'),
          colxs = $module.data('colxs'),
          dotslg = $module.data('dotslg'),
          dotsmd = $module.data('dotsmd'),
          dotssm = $module.data('dotssm'),
          dotsxs = $module.data('dotsxs'),

          marginlg = parseInt($module.data('mlg')),
          marginmd = parseInt($module.data('mmd')),
          marginsm = parseInt($module.data('msm')),
          marginxs = parseInt($module.data('mxs'));

      var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
      if(mode == 'production') {
          var loop = $module.data('loop');
      } else {
          var loop = 0;
      }
      $module.find('.gf_product-images-list').children().each( function( index ) {
        jQuery(this).attr( 'data-position', index );
      });
      $module.find('.gf_product-images-list').owlCarousel({
          mouseDrag: false,
          navSpeed: navspeed,
          autoWidth: !1,
          loop: loop,
          responsiveClass:true,
          responsive:{
              0:{
                  items:colxs,
                  nav: navxs,
                  dots:dotsxs,
                  margin: marginxs
              },
              768:{
                  items:colsm,
                  nav: navsm,
                  dots:dotssm,
                  margin: marginsm
              },
              992:{
                  items:colmd,
                  nav: navmd,
                  dots:dotsmd,
                  margin: marginmd
              },
              1200:{
                  items:collg,
                  nav: navlg,
                  dots:dotslg,
                  margin: marginlg
              }
          },
          onInitialized: function(){
            $module.closest('.module-wrap[data-label="(P) Image List"]').addClass('gf-carousel-loaded');
          }
      }); 
      break;
}
})(window.GemQuery || jQuery); 
    
    
    
    (function( jQuery ){
  var $module = jQuery('#m-1585826704018').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );
    (function( jQuery ){
  var $module = jQuery('#m-1636536479719').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );
    (function( jQuery ){
  var $module = jQuery('#m-1636536476001').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
(function( jQuery ){
  var $module = jQuery('#m-1637129738464').children('.module');
  if(jQuery().gfYoutube) {
    $module.gfYoutube();
  }
})( window.GemQuery || jQuery );
    
    
    
    
(function( jQuery ){
  var $module = jQuery('#m-1637563008721').children('.module');
  if(jQuery().gfYoutube) {
    $module.gfYoutube();
  }
})( window.GemQuery || jQuery );
    
    
    
    (function( jQuery ){
  var $module = jQuery('#m-1585826704192').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );/* add your custom script here */(function( jQuery ){
  var $module = jQuery('#m-1585826704197').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );(function( jQuery ){
  var $module = jQuery('#m-1585826704040').children('.module');
  $module.gfV1StockCounter();
})( window.GemQuery || jQuery );(function( jQuery ){
  var $module = jQuery('#m-1585826704197-3').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );/* add your custom script here */