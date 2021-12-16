function onChangeRadio(bShow) {
    if (bShow === true) {
        $('#hourly_rate_wrapper').show();
    } else {
        $('#hourly_rate_wrapper').hide(400);
    }
}

function is_caPostalCode(str) {
    let regexp = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/;

    return regexp.test(str);
}

function onSubmitForm(event) {
    event.preventDefault();

    toastr.success("Successfully submitted!");

    $('#buy-modal').modal('hide');

    return false;
}

function onCheckValid(event) {
    event.preventDefault();

    let value = event.target.value;

    if (value !== "" && !is_caPostalCode(value)) {
        toastr.error("Postal code is not correct!");
    }
}

function onBuyNow(event) {
    let target = event.target;
    let parent = target.parentElement.parentElement;

    let name = $(parent).find('.name').html();
    let price = $(parent).find('.price').html();

    $('#shop-name').html(name);
    $('#shop-price').html(price);

    $('#buy-modal').modal('show');
}

function onCheckNumber(event) {
    let validVal = "1234567890 ";
    if (!validVal.includes(event.key)) {
        return false;
    }

    let val = $('#card_number').val();

    if (val.length > 18) {
        return false;
    }

    if (val.length === 4 || val.length === 9 || val.length === 14) {
        $('#card_number').val(val + " ");
        return true;
    }

    return true;
}

function onCheckCvc(event) {
    let validVal = "1234567890";
    if (!validVal.includes(event.key)) {
        return false;
    }

    let val = $('#card_cvc').val();

    if (val.length > 3) {
        return false;
    }

    return true;
}


function onCheckExpired(event) {
    let validVal = "1234567890/";
    if (!validVal.includes(event.key)) {
        return false;
    }

    let val = $('#card_expires').val();

    if (val.length > 4) {
        return false;
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    if (val.length === 1) {
        let realVal = parseInt(val + "" + event.key);

        if (realVal < 1 || realVal > 12) {
            return false;
        }
    }

    if (val.length === 4) {
        let realVal = val + "" + event.key;
        let tempArr = realVal.split("/");

        if (tempArr.length > 1) {
            if (parseInt("20" + tempArr[1]) < year) {
                return false;
            } else if (parseInt("20" + tempArr[1]) > year) {
                return true;
            } else {
                if (parseInt(tempArr[0]) <= month + 1) {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    if (val.length === 2) {
        $('#card_expires').val(val + "/");
        return true;
    }

    return true;
}

$(document).ready(function () {
    $('.select-count').selectpicker();
});


