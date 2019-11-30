/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),

/***/ 17:
/***/ (function(module, exports) {


var log = console.log;
$(document).ready(function () {
    var fn = {
        accessGood: function accessGood() {
            return _accessGood();
        },
        exitGood: function exitGood() {
            return _exitGood();
        },
        goodHistory: function goodHistory() {
            return _goodHistory();
        },
        goods: function goods() {
            return _goods();
        }
    };
    if (sessionStorage.url) {
        var f = getfn(sessionStorage.url);
        fn[f]();
    } else {
        _goods();
    }
    function getfn() {
        return sessionStorage.url.split('/').pop().split('_').shift();
    }
    function removeActive() {
        if (sessionStorage.url) {
            $('#' + getfn(sessionStorage.url)).removeClass('active');
            return true;
        }
        return false;
    }
    events();
    function events() {
        $('#goods').off('click').on('click', _goods);
        $('#accessGood').off('click').on('click', _accessGood);
        $('#exitGood').off('click').on('click', _exitGood);
        $('#goodHistory').off('click').on('click', _goodHistory);
    }

    function _accessGood() {
        $('#accessGood').off();
        var url = 'user1/accessGood_get';
        $.get(url, function (response) {
            removeActive();
            sessionStorage.setItem('url', url);
            $('#content').html(response);
            $('#accessGood').addClass('active');
        }).then(function () {
            return accessData();
        }).then(function () {
            return $('#accessGood').off('click').on('click', _accessGood);
        }).fail(errors);
    }
    function accessData() {
        $('#access_good_table').grid('destroy', true, true);
        $('#access_good_table').grid({
            dataSource: { url: 'user1/accessGood_data', type: 'post' },
            responsive: true,
            notFoundText: 'Արդյունք չի գտնվել',
            fixedHeader: true,
            fontSize: 15,
            height: 620,
            columns: [{ field: 'name', title: 'Անուն' }, { field: 'unit', title: 'Միավոր' }, { tmpl: '<input type="number" class="num_input" data-id="{id}">', title: 'Քանակ' }]
        });

        $('#btn_access_good_table').off('click').on('click', function () {
            var message = $('.access_good_message');
            var input_amt = $('#access_good_table input');
            var obj = [];
            $.each(input_amt, function () {
                if ($(this).val() != '' && $(this).val() > 0) {
                    obj.push({
                        id: $(this).attr('data-id'),
                        amt: $(this).val()
                    });
                }
            });

            if (obj.length != 0) {
                $.ajax({
                    url: 'user1/posts',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: obj },
                    success: function success(response) {
                        if (response.status == 'success') {
                            message.text('Մուտքերը հաջողությամբ կատարվեցին');
                            input_amt.val('');
                        }
                    },
                    error: errors
                });
            } else {
                message.text('Լրացնել քանակ');
            }
        });
    }

    function _exitGood() {
        var url = 'user1/exitGood_get';
        $.get(url, function (response) {
            removeActive();
            sessionStorage.setItem('url', url);
            $('#content').html(response);
            $('#exitGood').addClass('active');
        }).then(function () {
            return exitData();
        }).then(function () {
            return $('#exitGood').off('click').on('click', _exitGood);
        }).fail(errors);
    }
    function exitData() {

        $('#select_place').off().on('change', function () {
            var place = $(this);
            if (place.val() != '') {
                $('#exit_good_table').grid('destroy', true, true);
                var grid = $('#exit_good_table').grid({
                    dataSource: { url: 'user1/exitGood_post', type: 'post' },
                    primaryKey: 'good_id',
                    params: { place_id: place.val() },
                    responsive: true,
                    fixedHeader: true,
                    height: 630,
                    fontSize: 15,
                    notFoundText: 'Արդյունք չի գտնվել',
                    columns: [{ field: 'name', title: 'Անուն' }, { field: 'unit', title: 'Միավոր' }, { tmpl: '<input type="number" class="num_input" data-balance="{balance}" data-id="{good_id}"/>', title: 'Քանակ' }, { field: 'balance', title: 'Մնացորդ' }]
                });
                $('#btn_exit_good_table').off().on('click', function () {

                    var message = $('.exit_good_message'),
                        input_amt = $('#exit_good_table input'),
                        place = $('#select_place'),
                        obj = [],
                        error_id = [],
                        error = false;

                    input_amt.removeClass('product_not_enough');
                    if (place.val() != '') {
                        $.each(input_amt, function () {
                            var product_id = $(this).attr('data-id');
                            var amt = $(this).val();
                            var balance = $(this).attr('data-balance');

                            if (amt !== '' && amt > 0) {
                                obj.push({
                                    id: product_id,
                                    amt: -amt,
                                    place: place.val()
                                });
                                if (balance - amt < 0) {
                                    error_id.push(product_id);
                                }
                            }
                        });
                        if (obj.length == 0) {
                            error = true;
                            message.text('Լրացրեք քանակ');
                        }

                        $.each(error_id, function (x) {
                            var not = $('#exit_good_table input[data-id=' + error_id[x] + ']');
                            message.text('Լրացրել եք մնացորդից ավել քանակ');
                            not.addClass('product_not_enough');
                            error = true;
                        });
                        if (!error) {
                            $.ajax({
                                url: 'user1/posts',
                                type: 'post',
                                data: { data: obj },
                                success: function success(response) {
                                    if (response.status == 'success') {
                                        message.text('Ելքերը հաջողությամբ կատարվեցին');
                                        input_amt.val('');
                                        grid.reload();
                                    }
                                },
                                error: errors
                            });
                        }
                    } else {
                        message.text('Ընտրեք Ուղությունը');
                    }
                });
            } else {
                $('#grid_exit').html('');
            }
        });
    }

    function _goodHistory() {
        var url = 'user1/goodHistory_get';
        $('#goodHistory').off('click');
        removeActive();
        sessionStorage.setItem('url', url);
        $.get(url, function (response) {
            $('#content').html(response);
            $('#goodHistory').addClass('active');
        }).then(function () {
            return historyData();
        }).then(function () {
            return $('#goodHistory').off('click').on('click', _goodHistory);
        }).fail(errors);
    }
    function historyData() {

        var from = $('#history_from').val();
        var to = $('#history_to').val();
        var name = $('#history_search_name').val();
        var select = $('#goods_history_drop_down');
        var group_by = $('#groupByName');

        var groupBy = function groupBy(good, place) {
            return group_by.val() == 'group_by_name' ? good : place;
        };
        var selectBy = function selectBy(access, exit, all) {
            switch (select.val()) {
                case 'access':
                    return access;
                case 'exit':
                    return exit;
                default:
                    return all;
            }
        };
        $('#exit_history_table').grid('destroy', true, true);
        var grid = $('#exit_history_table').grid({
            primaryKey: 'id',
            dataSource: { url: 'user1/history_date', type: 'post', success: onSuccessGridFunction },
            fontSize: 15,
            fixedHeader: true,
            height: 555,
            notFoundText: 'Արդյունք չի գտնվել',
            params: {
                from: from,
                to: to,
                select: select.val(),
                name: name,
                group_by: group_by.val()
            },
            detailTemplate: '<div><table  style="background: #fcf8e3"></div>',
            responsive: true,
            columns: [{ field: groupBy('good_name', 'place_name'), title: 'Անուն' }, { field: groupBy('good_unit', ''), title: groupBy('Միավոր', '') }, { field: selectBy('access_sum', 'exit_sum', 'access_sum'), title: selectBy('Ընդհանուր մուտքեր', 'Ընդհանուր ելքեր', 'Ընդհանուր մուտքեր') }, { field: selectBy('', '', 'exit_sum'), title: selectBy('', '', 'Ընդհանուր ելքեր') }]
        });

        function onSuccessGridFunction(response) {

            select.removeAttr('disabled');
            group_by.removeAttr('disabled');
            if (group_by.val() == 'group_by_place') {
                select.attr('disabled', true);
                grid.hideColumn('access_sum');
            }
            if (select.val() == 'access') {
                group_by.attr('disabled', true);
            }

            var records = [];
            for (var x in response) {
                var access = 0,
                    exit = 0;
                for (var j in response[x]) {
                    response[x][j].id = groupBy(response[x][j].good_id, response[x][j].place_id);
                    if (response[x][j].amt > 0) {
                        access += +response[x][j].amt;
                    } else {
                        exit += +response[x][j].amt;
                    }
                }
                response[x][0].access_sum = access;
                response[x][0].exit_sum = Math.abs(exit);
                records.push(response[x][0]);
            }
            grid.render(records);
        }
        grid.on('detailExpand', function (e, $detailWrapper, id) {

            var detail = $detailWrapper.find('table').grid({
                params: {
                    good_id: id,
                    from: from,
                    to: to,
                    select: select.val(),
                    group_by: group_by.val()
                },
                dataSource: { url: 'user1/history_date', type: 'post', success: successDetailFunction },
                fixedHeader: true,
                responsive: true,
                fontSize: 15,
                notFoundText: 'Արդյունք չի գտնվել',
                columns: [{ field: 'date', title: 'Ամսաթիվ' }, { field: groupBy('place_name', 'good_name'), title: groupBy('Ուղություն', 'Ապրանք') }, { field: groupBy('', 'good_unit'), title: groupBy('', 'Միավոր') }, { field: 'access', title: 'Մուտքեր', hidden: groupBy(selectBy(false, true, false), true) }, { field: 'exit', title: 'Ելքեր', hidden: selectBy(true, false, false) }, { field: 'balance', title: 'Մնացորդ' }]
            });
            function successDetailFunction(response) {
                response.map(function (value) {
                    return !value.place_name ? value.place_name = 'Պահեստ' : value.place_name;
                });
                detail.render(response);
            }
        });

        $('.box input').off('keypress').on('keypress', function (e) {
            if (e.keyCode == 13) {
                return false;
            }
        });
        $('.box input').off('input').on('input', historyData);
        $('.box select, .box input').off('change').on('change', historyData);

        $('#btn_exit_history_search_clear').off('click').on('click', _goodHistory);
    }

    function _goods() {
        $('#goods').off();
        var url = 'user1/goods_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response);
            $('#goods').addClass('active');
            sessionStorage.setItem('url', url);
        }).then(function () {
            return goodsData();
        }).then(function () {
            return $('#goods').off('click').on('click', _goods);
        }).fail(errors);
    }
    function goodsData() {
        $('#goods_table').grid('destroy', true, true);
        $('#goods_table').grid({
            dataSource: { url: 'user1/goods_data', type: 'post' },
            fontSize: 15,
            responsive: true,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            columns: [{ field: 'good_name', title: 'Անուն <i class="fas fa-sort"></i>', sortable: true }, { field: 'good_unit', title: 'Միավոր <i class="fas fa-sort"></i>', sortable: true }, { field: 'sum_amt', title: 'Քանակ <i class="fas fa-sort"></i>', sortable: true }],
            pager: {
                limit: 10,
                sizes: [10, 15, 20, 50]
            }
        });
    }
    function errors(jqXHR, textStatus, errorThrown) {
        console.error("error occurred: " + textStatus, errorThrown, jqXHR);
    }
});

/***/ })

/******/ });