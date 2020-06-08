// глобальные переменные
var host = 'tp.allseo-host.ru',
phoneMask = '+7 (999) 999-99-99',
min = 3000,
max = 100000,
defaultValue = 10000,
currency = 'руб.',
language = {
    contactInformation: 'Контактная информация',
    personalData: 'Личные данные',
    passportData: 'Паспортные данные',
    registrationAddress: 'Адрес регистрации'
},
sendData = {
    summ: 0,
    tariffName: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    birthday: '',
    sex: '',
    passportData: {
        series: '',
        number: '',
        dateGet: '',
        code: '',
        who: '',
        birthdayPlace: '',
    },
    registrationAddress: {
        region: '',
        city: '',
        street: '',
        homeNum: '',
        kvNum: '',
    },
    actualAddress: {
        region: '',
        city: '',
        street: '',
        homeNum: '',
        kvNum: '',
    }
};

// Функция вызова уведомления из тех частей кода, где $.noty недоступен
function callNoty(text, type) {
	var n = Noty('id');
	$.noty.setText(n.options.id, text);
	$.noty.setType(n.options.id, type);
}

$(document).ready(function ($) {
    $('.item-right-top button').click(function() {
        sendData.summ = $(this).parent().parent().prev().find('.item-center-top>div:nth-child(2)>.item-center_info-data').html();
        sendData.tariffName = $(this).parent().parent().parent().prev().find('.item_wrap_head_text').html();
        clearForm();
    });
    
    // открыть попап
	$('#zaym-form').jqm({
		trigger: '.item-right-top button',
		overlay: 30,
		overlayClass: 'jqmOverlay'
    });
	
	// Функция передачи фокуса на selector элемент
	function triggerFocus(selector) {
		setTimeout(function() {
			$(selector).trigger('focus');
		}, 100);
	}
	
	// Функция отрисовки правильности/неправильности ввода данных в поле
	function drawRightFilled(elem, state) {
		if (typeof state !== 'undefined') {
			$(elem).removeClass('right-filled-input');
			$(elem).addClass('wrong-filled-input');
		} else {
			$(elem).addClass('right-filled-input');
			$(elem).removeClass('wrong-filled-input');
		}
	}

    // Маски ввода
    $('input[name="phone"]').inputmask(phoneMask, {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="email"]');
        },
        "onincomplete": function() {
            drawRightFilled(this, false);
        }
    });
    $('input[name="birthday"]').inputmask('99.99.9999', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('.step__btn');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="series"]').inputmask('99 99', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="number"]');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="number"]').inputmask('999 999', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="when_issued"]');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="when_issued"]').inputmask('99.99.9999', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="unit_code"]');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="unit_code"]').inputmask('999-999', {
        "oncomplete": function() {
            drawRightFilled(this);
            setTimeout(function() {
                // Подгружаем подсказку из поля "Код подразделения"
                //getIssuedBy();
                triggerFocus('input[name="issued_by"]');
            }, 100);
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="id_card_number"]').inputmask('999999999', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="id_code"]');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="id_code"]').inputmask('9999999999', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="issued_by"]');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });
    $('input[name="iin"]').inputmask('999999999999', {
        "oncomplete": function() {
            drawRightFilled(this);
            triggerFocus('input[name="address_region"]');
        },
        "onincomplete": function(){
            drawRightFilled(this, false);
        }
    });

    $('input[name="email"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                if (elem.value.length != 0) {
                    drawRightFilled(elem, false);
                }
            }
        }, 100);
    });
    $('input[name="surname"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="name"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="middle_name"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="issued_by"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="place_of_birth"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    // Адрес регистрации
    $('input[name="address_region"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="address_city"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="address_street"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="address_house"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 1) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="address_apartment"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 1) {
                drawRightFilled(elem);
            } else {
                $(elem).removeClass('right-filled-input');
            }
        }, 100);
    });
    // Фактический адрес
    $('input[name="actual_address_region"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="actual_address_city"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="actual_address_street"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 3) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="actual_address_house"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 1) {
                drawRightFilled(elem);
            } else {
                drawRightFilled(elem, false);
            }
        }, 100);
    });
    $('input[name="actual_address_apartment"]').focusout(function() {
        var elem = this;
        setTimeout(function() {
            if (elem.value.length >= 1) {
                drawRightFilled(elem);
            } else {
                $(elem).removeClass('right-filled-input');
            }
        }, 100);
    });

    // Всплывающие подсказки
    hint('birthday');
    hint('series');
    hint('number');
    hint('when_issued');
    hint('unit_code');
    hint('iin');

    // Автозаполнение (выпадающие подсказки)
    suggest('email', {});
    suggest('name', {'parts':['name']});
    suggest('surname', {'parts':['surname']});
    suggest('middle_name', {'parts':['patronymic']});
    suggest('address_region', {'from_bound': {'value': 'region'}, 'to_bound': {'value': 'region'}});
    suggest('actual_address_region', {'from_bound': {'value': 'region'}, 'to_bound': {'value': 'region'}});

    // Disable/enable поля "Отчество" при нажатии на галочку "Нет отчества"
    $('input[name="isset_middle_name"]').on('click', function() {
        var elem = this;
        addMiddleName(elem);
    });

    // Начинаем шаги
    $('.step__btn').on('click', function() {

        var step = parseInt($('input[name="step"]').val());

        switch (step) {
            case 2:
                if ($('#check1').is(":not(:checked)")) {
					callNoty('Необходимо согласиться с условиями договора', 'warning');
                    $('.checkbox-item').addClass('check-shadow');
                } else {
                    $('.checkbox-item').removeClass('check-shadow');
                    sendData.phoneNumber = $('input[name="phone"]').val();
                    sendData.email = $('input[name="email"]').val();
                    drawForm(step);
                }
                break;
            case 3:
                if (!checkValue($('input[name="birthday"]').val(), 'data')) {
                    return false;
                }
                sendData.fullName = `${ $.trim($('input[name="surname"]').val()) } ${ $.trim($('input[name="name"]').val()) } ${ $.trim($('input[name="middle_name"]').val()) }`;
                sendData.birthday = $('input[name="birthday"]').val();
                sendData.sex = $('input[name="sex"]:checked').val();
				drawForm(step);
                break;
            case 4:
                if ((!checkValue($('input[name="when_issued"]').val(), 'data'))
                    || (!checkValue($('input[name="unit_code"]').val(), 'number', 6))
                    || (!checkValue($('input[name="series"]').val(), 'number', 4))
                    || (!checkValue($('input[name="number"]').val(), 'number', 6))) {
                    return false;
                }
                sendData.passportData.series = $('input[name="series"]').val().replace(/\s/g, '');
                sendData.passportData.number = $('input[name="number"]').val().replace(/\s/g, '');
                sendData.passportData.dateGet = $('input[name="when_issued"]').val();
                sendData.passportData.code = $('input[name="unit_code"]').val();
                sendData.passportData.who = $('input[name="issued_by"]').val();
                sendData.passportData.birthdayPlace = $('input[name="place_of_birth"]').val();
                drawForm(step);
                break;
            case 5:
                sendData.registrationAddress.region = $('input[name="address_region"]').val();
                sendData.registrationAddress.city = $('input[name="address_city"]').val();
                sendData.registrationAddress.street = $('input[name="address_street"]').val();
                sendData.registrationAddress.homeNum = $('input[name="address_house"]').val();
                sendData.registrationAddress.kvNum = $('input[name="address_apartment"]').val();
                // Если галочка "Совпадает с фактическим" снята - добавляем фактический адрес
	            if ($('#checkAddr').is(":not(:checked)")) {
                    sendData.actualAddress.region = $('input[name="actual_address_region"]').val();
                    sendData.actualAddress.city = $('input[name="actual_address_city"]').val();
                    sendData.actualAddress.street = $('input[name="actual_address_street"]').val();
                    sendData.actualAddress.homeNum = $('input[name="actual_address_house"]').val();
                    sendData.actualAddress.kvNum = $('input[name="actual_address_apartment"]').val();
                }
                sendRequest(sendData);
                break;
            default:
                drawForm(1);
        }
    });
    $('.step__back').on('click', function() {
        var step = parseInt($('input[name="step"]').val());
            step = step-2;
            $('input[name="step"]').val(step);
            drawForm(step);
    });

    // Скрываем/показываем фактический адрес в зависимости от чекбокса
    $('#checkAddr').on('click', function() {
        $('.actual_address').removeClass('hide');
        if ($(this).is(':checked')) {
            $('.actual_address').slideUp();
        } else {
            $('.actual_address').slideDown();
        }
    });

    // Функция отправки данных
	function sendRequest(userData) {
        showLoader();
        console.log(userData);
        // отсылаем данные userData
		// return $.ajax({
		// 	url: "",
		// 	method: 'post',
		// 	data: {
		// 		userData: userData
		// 	},
		// 	dataType: 'json'
		// }).done(function (data) {
		// 	if (data.type == 'error') {
		// 		var n = Noty('id');
		// 		$.noty.setText(n.options.id, data.message);
		// 		$.noty.setType(n.options.id, data.type);
		// 	}
		// hideLoader();
		// }).fail(function (jqXHR, textStatus) {
		// 	var n = Noty('id');
		// 	$.noty.setText(n.options.id, "Что-то пошло совсем не так: " + textStatus);
		// 	$.noty.setType(n.options.id, 'warning');
        // });
        setTimeout(() => {
            hideLoader();
            drawForm(1);
            $('.final-step').removeClass('hide');
        }, 1000);
    }
});

// фугнкция очистки формы
function clearForm() {
    $('.final-step').addClass('hide');
    $('.step4').addClass('hide');
    $('.step3').addClass('hide');
    $('.step2').addClass('hide');
    $('input[name="phone"]').removeClass('right-filled-input').val('');
    $('input[name="email"]').removeClass('right-filled-input').val('');
    $('input[type="checkbox"]').prop('checked', false);
    addMiddleName($('input[type="checkbox"]#check2'));
    $('input[type="checkbox"]#checkAddr').prop('checked', true);
    $('input[type="checkbox"]#checkAddr').addClass('hide');
    $('.actual_address').slideDown();
    $('input[name="surname"]').removeClass('right-filled-input').val(''); 
    $('input[name="name"]').removeClass('right-filled-input').val('');
    $('input[name="middle_name"]').removeClass('right-filled-input').val('');
    $('input[name="birthday"]').removeClass('right-filled-input').val('');
    $('input[name="series"]').removeClass('right-filled-input').val('');
    $('input[name="number"]').removeClass('right-filled-input').val('');
    $('input[name="when_issued"]').removeClass('right-filled-input').val('');
    $('input[name="unit_code"]').removeClass('right-filled-input').val('');
    $('input[name="issued_by"]').removeClass('right-filled-input').val('');
    $('input[name="place_of_birth"]').removeClass('right-filled-input').val('');
    $('input[name="address_region"]').removeClass('right-filled-input').val('');
    $('input[name="address_city"]').removeClass('right-filled-input').val('');
    $('input[name="address_street"]').removeClass('right-filled-input').val('');
    $('input[name="address_house"]').removeClass('right-filled-input').val('');
    $('input[name="address_apartment"]').removeClass('right-filled-input').val('');
    $('input[name="actual_address_region"]').removeClass('right-filled-input').val('');
    $('input[name="actual_address_city"]').removeClass('right-filled-input').val('');
    $('input[name="actual_address_street"]').removeClass('right-filled-input').val('');
    $('input[name="actual_address_house"]').removeClass('right-filled-input').val('');
    $('input[name="actual_address_apartment"]').removeClass('right-filled-input').val('');
    sendData = {
        summ: 0, tariffName: '', phoneNumber: '',
        email: '', fullName: '', birthday: '', sex: '',
        passportData: {
            series: '', number: '', dateGet: '', code: '', who: '', birthdayPlace: '',
        },
        registrationAddress: {
            region: '', city: '', street: '', homeNum: '', kvNum: '',
        },
        actualAddress: {
            region: '', city: '', street: '', homeNum: '', kvNum: '',
        }
    };
    drawForm(1);
}

// скрыть/показать Отчество
function addMiddleName(elem) {
    selector = 'input[name="middle_name"]';
    setTimeout(function() {
        if ($(elem).is(':checked')) {
            $(selector).prop('disabled', true);
            $(selector).val('');
            $(selector).css({'color':'lightgray'});
            $(selector).css({'-webkit-text-fill-color':'lightgray'});
            $(selector).removeClass('right-filled-input');
            $(selector).removeClass('wrong-filled-input');
        } else {
            $(selector).removeAttr('disabled');
            $(selector).css({'color':'#373737'});
            $(selector).css({'-webkit-text-fill-color':'#373737'});
        }
    }, 100);
}

function showLoader() {
    // Плавно показываем фон и лоадер
    $('.loader-bg').fadeIn(500);
    $('.loader').fadeIn(500);
}

function hideLoader() {
    // Плавно скрываем попап и лоадер
    $('.loader-bg').fadeOut(500);
    $('.loader').fadeOut(500);
}

// Получаем строку "Кем выдан" по коду подразделения
// Есл нужно будет проверять по апи для подсказки 
function getIssuedBy() {
    $('input[name="issued_by"]').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: '/api/getissuedby/',
                method: 'post',
                data: {
                    // код подразделения
                    query: $('input[name="unit_code"]').val(),
                    // в этот инпут вбить апи-код, либо прямо сюда вставить
                    '_csrf-frontend': $('input[name="_csrf"]').val()
                },
                dataType: 'json'
            }).done(function (data) {
                response(data.suggest);
            }).fail(function (jqXHR, textStatus) {
                var n = Noty('id');
                $.noty.setText(n.options.id, 'Что-то пошло совсем не так: ' + textStatus);
                $.noty.setType(n.options.id, 'warning');
            });
        },
        minLength: 0,
        select: function(event, ui) {
            console.log(ui.item);
            triggerFocus('input[name="place_of_birth"]');
        }
    });
}

/*
 * Функция выдаёт подсказки
 * работает с ФИО и адресами
*/
// Если нужны будут подсказки
function suggest(elem, data) {
    var selector = 'input[name="' + elem + '"]';
    $(selector).autocomplete({
        source: function(request, response) {
            $.ajax({
                url: '/api/suggest/',
                method: 'post',
                data: {
                    query: $(selector).val(),
                    data: JSON.stringify(data),
                    '_csrf-frontend': $('input[name="_csrf"]').val()
                },
                dataType: 'json'
            }).done(function (data) {
                response(data.suggest);
            }).fail(function (jqXHR, textStatus) {
                var n = Noty('id');
                // не показываем ошибку так как пока запрос не работает, нет апи такого
                //$.noty.setText(n.options.id, 'Что-то пошло совсем не так: ' + textStatus);
                //$.noty.setType(n.options.id, 'warning');
            });
        },
        minLength: 2,
        delay: 500,
        select: function(event, ui) {
            // Определяем, подсказки будут для адреса регистрации или фактического
            var selectorPrefix = '';
            if (selector.indexOf('actual') > 0) {
                selectorPrefix = 'actual_';
            }
            // Устанавливаем пол при выборе ФИО
            if (typeof ui.item['gender'] !== 'undefined') {
                var sex = 1;
                if (ui.item.gender == 'MALE') {
                    sex = 0;
                }
                $('input:radio[name="sex"]').filter('[value=' + sex + ']').prop('checked', true);
            }
            // После выбора подсказки перепрыгиваем на следующее поле
            if (elem == 'email') {
                triggerFocus('.step__btn');
            }
            if (elem == 'surname') {
                triggerFocus('input[name="name"]');
            }
            if (elem == 'name') {
                if ($('input[name="isset_middle_name"]').is(":not(:checked)")) {
                    triggerFocus('input[name="middle_name"]');
                } else {
                    triggerFocus('input[name="birthday"]');
                }
            }
            if (elem == 'middle_name') {
                triggerFocus('input[name="birthday"]');
            }
            // Если выбрали дом перебрасываем на ввод квартиры
            if (elem == selectorPrefix + 'address_house') {
                triggerFocus('input[name="' + selectorPrefix + 'address_apartment"]');
            }
            console.log(ui.item);

            // Сохраняем код КЛАДР
            if (selectorPrefix == '') {
                if (typeof ui.item['region_fias_id'] !== 'undefined') {
                    $('input[name="region_kladr"]').val(ui.item['region_kladr_id']);
                }
                if (typeof ui.item['city_fias_id'] !== 'undefined') {
                    $('input[name="city_kladr"]').val(ui.item['city_kladr_id']);
                }
            }

            // Если выбрали город федерального значения в поле "Регион"
            if ((selector.indexOf('_region') > 0)&&(typeof ui.item['city_fias_id'] !== 'undefined')) {
                $('input[name="' + selectorPrefix + 'address_city"]').val(ui.item['value']);
            }

            // Если только что выбирали регион - разрешаем подсказки на город
            if (typeof ui.item['region_fias_id'] !== 'undefined') {
                triggerFocus('input[name="' + selectorPrefix + 'address_city"]');
                suggest(selectorPrefix + 'address_city', {
                    'from_bound': {
                        'value': 'city'
                    },
                    'to_bound': {
                        'value': 'city'
                    },
                    'restrict_value': true,
                    'locations': [
                        {
                            'region_fias_id': ui.item['region_fias_id']
                        }
                    ]
                });
            }
            // Если только что выбирали город - разрешаем подсказки для улиц
            if (typeof ui.item['city_fias_id'] !== 'undefined') {
                triggerFocus('input[name="' + selectorPrefix + 'address_street"]');
                suggest(selectorPrefix + 'address_street', {
                    'from_bound': {
                        'value': 'street'
                    },
                    'to_bound': {
                        'value': 'street'
                    },
                    'restrict_value': true,
                    'locations': [
                        {
                            'city_fias_id': ui.item['city_fias_id']
                        }
                    ]
                });
            }
            // Если только что выбирали улицу - разрешаем подсказки для номера дома
            if (typeof ui.item['street_fias_id'] !== 'undefined') {
                triggerFocus('input[name="' + selectorPrefix + 'address_house"]');
                suggest(selectorPrefix + 'address_house', {
                    'from_bound': {
                        'value': 'house'
                    },
                    'restrict_value': true,
                    'locations': [
                        {
                            'street_fias_id': ui.item['street_fias_id']
                        }
                    ]
                });
            }
        }
    });
}

function drawForm(step) {
    switch (step) {
        case 1:
			$('#stepCounter').html('1');
			$('input[name="step"]').val(2);
			$('.step__title').html(language.contactInformation);
			$('.step__back').addClass('hide');
			$('.step1').removeClass('hide');
			$('.step2').addClass('hide');
			$('.continue').removeClass('step-col-order3');
			$('.continue').addClass('step-col-right');
			$('.step-controls').removeClass('step-controls--back');
			$('#percent').html('25%');
			break;
        case 2:
            $('#stepCounter').html('2');
            $('input[name="step"]').val(3);
            $('.step__title').html(language.personalData);
            $('.step__back').removeClass('hide');
            $('.step1').addClass('hide');
            $('.step2').removeClass('hide');
            $('.step3').addClass('hide');
            $('.continue').addClass('step-col-order3');
            $('.continue').removeClass('step-col-right');
            $('.step-controls').addClass('step-controls--back');
            $('#percent').html('50%');
            $('.step-progress__bar-complete').css('width', '50%');
			break;
        case 3:
            $('#stepCounter').html('3');
            $('input[name="step"]').val(4);
            $('.step__title').html(language.passportData);
            $('.step__back').removeClass('hide');
            $('.step2').addClass('hide');
            $('.step3').removeClass('hide');
            $('.step4').addClass('hide');
            $('.continue').removeClass('step-col-order3');
            $('.continue').addClass('step-col-right');
            $('#percent').html('75%');
            $('.step-progress__bar-complete').css('width', '75%');
            break;
        case 4:
			$('#stepCounter').html('4');
            $('input[name="step"]').val(5);
            $('.step__title').html(language.registrationAddress);
            $('.step__back').removeClass('hide');
            $('.step3').addClass('hide');
            $('.step4').removeClass('hide');
            $('.continue').addClass('step-col-right');
            $('#percent').html('99%');
            $('.step-progress__bar-complete').css('width', '100%');
            break;
    }
}

// Функция проверки данных перед отправкой на сохранение
function checkValue(value, type, length) {
    switch (type) {
        case 'data':
            var arr = value.split(/[.]/),
                date = new Date(arr[2], arr[1]-1, arr[0]);
            if (!(date instanceof Date) || isNaN(date)) {
				callNoty('Необходимо заполнить все поля', 'error');
                return false;
            }
            return true;
            break;
        case 'number':
            if (value.replace(/\D+/g, '').length == length) {
                return true;
            }
			callNoty('Необходимо заполнить все поля', 'error');
            return false;
            break;
    }
}

function hint(elemName) {
    $('input[name="' + elemName + '"]').focus(function() {
        $('.' + elemName + '-hint').removeClass('hide');
        setTimeout(function() {
            $('.' + elemName + '-hint').css({'opacity':1});
        }, 100);
    });
    $('input[name="' + elemName + '"]').focusout(function() {
        $('.' + elemName + '-hint').css({'opacity':0});
        setTimeout(function() {
            $('.' + elemName + '-hint').addClass('hide');
        }, 500);
    });
}