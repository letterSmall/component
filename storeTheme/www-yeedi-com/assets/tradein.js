$(document).ready(function () {
  	/** Display discount based on cookie -- start **/
    if (getCookie("tradein_discounted_type") != "" && getCookie("tradein_discounted_amount") != "" && getCookie("tradein_discounted_coupon") != "") {
     	if(getCookie("tradein_product_id") == $("#tradein_product_id").val()){
            $('.sm_discounted_amount').html(getCookie("tradein_discounted_amount"));
            $('.sm_discount_coupon').html(getCookie("tradein_discounted_coupon"));

            if(getCookie("tradein_discounted_type") == 'percentage'){
                $('.sm_fixed_discount').hide();
                $('.sm_percentage_discount').show();
            } else {
                $('.sm_fixed_discount').show();
                $('.sm_percentage_discount').hide();
            }

            $('#sm_avail_tradein').hide();
            $('#sm_availed_tradein').show();
      	}
    }
   /** Display discount based on cookie -- end **/

    var cookie_expiry_days = 7;
    $("#tradein_form").on("submit", function (e) {
        e.preventDefault();
        $("#tradein_submit_button").prop('disabled', true);
        $(".tradein_form_errors").remove();
        $(".tradein_inp_errors").removeClass("tradein_inp_errors");
        $.ajax({
            url: "https://vivirhub.com/tradein/us/form_submission.php",
            //url: "http://localhost/xyz/us/form_submission.php",
            type: "POST",
            data: $("#tradein_form").serialize(),
            success: function (response) {
                console.log(response.success);
                if (typeof (response.success) === "undefined") {
                    var result = JSON.parse(response);
                } else {
                    var result = response;
                }

                if (result.success == true) {
                    if (result.discounted_type == 'percentage') {
                        $('.sm_fixed_discount').hide();
                        $('.sm_percentage_discount').show();
                    } else {
                        $('.sm_fixed_discount').show();
                        $('.sm_percentage_discount').hide();
                    }

                    setCookie("tradein_discounted_type", result.discounted_type, cookie_expiry_days);
                    setCookie("tradein_discounted_amount", result.discounted_amount, cookie_expiry_days);
                  	setCookie("tradein_discounted_coupon", result.coupon_code, cookie_expiry_days);
                  	setCookie("tradein_product_id", $("#tradein_product_id").val(), cookie_expiry_days);

                    $('.sm_discounted_amount').html(result.discounted_amount);
                    $('.sm_discount_coupon').val(result.coupon_code);
                    $('.sm_discount_coupon').html(result.coupon_code);
                    $('#sm_popup_tradein_code').hide();
                    $('#sm_popup_with_form').show();

                    $('#sm_avail_tradein').hide();
                    $('#sm_availed_tradein').show();
                } else if (result.success == false && result.errors != undefined) {
                    $.each(result.errors, function (field_name, error_message) {
                        if (field_name == "general") {
                            $("#input_serial_number").after('<span class="tradein_form_errors">' + error_message + '</span>');
                        } else {
                            $(".sm_tradein_input_" + field_name).addClass("tradein_inp_errors");
                            $("#input_" + field_name).after('<span class="tradein_form_errors" >' + error_message + '</span>');
                        }
                    });
                } else {
                    console.log("else ");
                }

                $("#tradein_submit_button").prop('disabled', false);
            },
            error: function (err) {
                console.log(err);
                console.log("error");
                // check the err for error details
                $("#tradein_submit_button").prop('disabled', false);
            }
        });
    });


    $("#sm_help_trigger").on("click", function () {
        $("#sm_help_text").show();
    });

    $("#sm_arrow_down").on("click", function () {
        $("#sm_text_down").show();
        $("#sm_arrow_down").hide();
    });

    $("#sm_copy_code").on("click", function () {
        $('.sm_discount_coupon').select();
        document.execCommand('copy');
        $(".copy_code_msg").show();
        $("#sm_copy_code").addClass("btn-faded");
        // $("#sm_ontinue_shopping_button").removeClass("btn btn-faded");
        return false;
    });


});






$(document).on('change','select.tradein-popup-custom-select1', function() {
	myFunction1()
});
$(document).ready(myFunction1);
  function myFunction1(){
  var el = $('select.tradein-popup-custom-select1');
  el.toggleClass('tradein-select-default1', !el.val());
}

$(document).on('change','select.tradein-popup-custom-select2', function() {
	myFunction2()
});
$(document).ready(myFunction2);
  function myFunction2(){
  var el = $('select.tradein-popup-custom-select2');
  el.toggleClass('tradein-select-default2', !el.val());
}

$(document).on('change','select.tradein-popup-custom-select3', function() {
	myFunction3()
});

$(document).ready(myFunction3);
  function myFunction3(){
  var el = $('select.tradein-popup-custom-select3');
  el.toggleClass('tradein-select-default3', !el.val());
}








/*** popup code starts here */

document.querySelector(".popup-btn").addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelector(".popup").style.display = 'block';
}, false);
document.querySelector(".popup-btn").addEventListener('click', function () {
    document.querySelector(".popup-overlay").style.display = 'block';
}, false);
document.querySelector(".popup-close").addEventListener('click', function () {
    document.querySelector(".popup").style.display = 'none';
    document.querySelector(".popup-overlay").style.display = 'none';
}, false);
document.querySelector(".popup-close-btn").addEventListener('click', function () {
    document.querySelector(".popup").style.display = 'none';
    document.querySelector(".popup-overlay").style.display = 'none';
}, false);
document.querySelector("body").addEventListener('click', function () {
    document.querySelector(".popup").style.display = 'none';
    document.querySelector(".popup-overlay").style.display = 'none';
}, false);
document.querySelector(".popup").addEventListener('click', function (e) {
    e.stopPropagation();
}, false);


/** Cookies **/
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

