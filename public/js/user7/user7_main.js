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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29);


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

var log = console.log;
$(function () {

    var fn = {
        clients: function clients() {
            return _clients();
        },
        goods: function goods() {
            return _goods();
        },
        products: function products() {
            return _products();
        },
        orders: function orders() {
            return _orders();
        },
        expenses: function expenses() {
            return _expenses();
        },
        history: function history() {
            return _history();
        },
        accept: function accept() {
            return _accept();
        },
        places: function places() {
            return _places();
        },
        suppliers: function suppliers() {
            return _suppliers();
        },
        newExpenses: function newExpenses() {
            return _newExpenses();
        },
        utilities: function utilities() {
            return _utilities();
        }
    };
    if (sessionStorage.url) {
        log(sessionStorage.url);
        var f = getFn();
        fn[f]();
    } else {
        _clients();
    }

    function getFn() {
        return sessionStorage.url.split('/').pop().split('_').shift();
    }

    function removeActive() {
        if (sessionStorage.url) {
            $('#' + getFn(sessionStorage.url)).removeClass('active');
            return true;
        }
        return false;
    }
    events();
    function events() {
        $('#clients').off('click').on('click', _clients);
        $('#goods').off('click').on('click', _goods);
        $('#products').off('click').on('click', _products);
        $('#orders').off('click').on('click', _orders);
        $('#expenses').off('click').on('click', _expenses);
        $('#history').off('click').on('click', _history);
        $('#accept').off('click').on('click', _accept);
        $('#places').off('click').on('click', _places);
        $('#suppliers').off('click').on('click', _suppliers);
        $('#newExpenses').off('click').on('click', _newExpenses);
        $('#utilities').off('click').on('click', _utilities);
    }

    function _utilities() {
        var url = 'user7/utilities_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response.view);
            $('#utilities').addClass('active');
            sessionStorage.setItem('url', url);
            utilitiesData(response);
        }).fail(error);
    }

    function utilitiesData(response) {

        var months = '<option value=""> Ընտրել ամիսը</option>';
        for (var x in response['months']) {
            months += '<option value="' + response['months'][x].id + '">' + response['months'][x].name + '</option>';
        }
        $('#utilities_table').grid({
            dataSource: response['utilities'],
            fixedHeader: true,
            fontSize: 15,
            height: 628,
            notFoundText: 'Արդյունք չի գտնվել',
            columns: [{ field: 'name', title: 'Անուն' }, { field: 'unit', title: 'Միավոր' }, { tmpl: '<input type="number" class="num_input amt">', title: 'Քանակ' }, { tmpl: '<input type="number" class="num_input price" data-id="{id}" >', title: 'Գումար' }, { tmpl: '<select class="form-control" id="select_month">' + months + '</select>', title: 'Որ ամսվա համար' }]
        });

        $('#utility_btn').off().on('click', function () {
            var message = $('.message');
            var modal = $('#expense_modal');
            var input = $('#utilities_table input.price');
            var obj = [];
            $.each(input, function () {
                var inp = $(this);
                var id = inp.data('id');
                var amt = inp.closest('tr').find('.amt');
                var month = inp.closest('tr').find('#select_month');

                if (inp.val() != '' && amt.val() != '' && month.val() != '') {
                    obj.push({
                        id: id,
                        amt: amt.val(),
                        price: inp.val(),
                        month: month.val()
                    });
                } else if (amt.val() == '' && inp.val() != '' && month.val() != '') {
                    return obj = false;
                } else if (amt.val() == '' && inp.val() == '' && month.val() != '') {
                    return obj = false;
                } else if (amt.val() == '' && inp.val() != '' && month.val() == '') {
                    return obj = false;
                } else if (amt.val() != '' && inp.val() != '' && month.val() == '') {
                    return obj = false;
                } else if (amt.val() != '' && inp.val() == '' && month.val() != '') {
                    return obj = false;
                } else if (amt.val() != '' && inp.val() == '' && month.val() == '') {
                    return obj = false;
                }
            });

            if (!obj) {
                modal.modal('show');
                message.text('Ունեք անկանոն լրացրած դաշտ');
            } else if (obj.length != 0) {
                $.ajax({
                    url: 'user7/accept_utilities',
                    type: 'post',
                    data: { records: obj },
                    success: function success(response) {
                        if (response.status == 'success') {
                            modal.modal('show');
                            message.text('Պատրաստ');
                            input.val('');
                            input.closest('tr').find('.amt').val('');
                            input.closest('tr').find('#select_month').val('');
                        } else {
                            return false;
                        }
                    },
                    error: error
                });
            } else {
                modal.modal('show');
                message.text('Լրացրեք դաշտերից առնվազը մեկը');
            }
        });
    }

    function _expenses() {
        var url = 'user7/expenses_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response);
            $('#expenses').addClass('active');
            sessionStorage.setItem('url', url);
            // addexpenses(response);
            $('#suppliers_list').on('change', expensesData);
        }).fail(error);
    }

    function expensesData() {
        var supplier_id = $(this).val();
        $('#add_expenses_table').grid('destroy', true, true);
        var grid = $('#add_expenses_table').grid({
            dataSource: { url: 'user7/add_expenses_data', type: 'post', success: function success(response) {
                    var records = [];

                    for (var x in response) {
                        var balance = 0;
                        for (var j in response[x]) {
                            balance += response[x][j].good_amt * response[x][j].good_price;
                        }
                        response[x][0].balance = numberWithCommas(balance);
                        records.push(response[x][0]);
                    }
                    grid.render(records);
                } },
            fixedHeader: true,
            params: { supplier_id: supplier_id },
            primaryKey: 'date',
            height: 628,
            detailTemplate: '<div><table  style="background:#fcf8e3"></div>',
            responsive: true,
            notFoundText: 'Արդյունք չի գտնվել',
            columns: [{ field: 'date', title: 'Ապրանքի ընդունման ամսաթիվ' }, { field: 'balance', title: 'Օրվա գործարքի ընդհանուր գումարը' }, { tmpl: '<button>Վճարել</button>', align: 'right', cssClass: 'fa_button', events: { 'click': acceptExpenses } }]
        });

        function acceptExpenses(e) {
            $('#expense_modal').modal('show');
            $('#btn_accept_expense').off('click').on('click', function () {
                var date = e.data.record.date;
                var supplier_id = e.data.record.supplier_id;
                $.ajax({
                    url: 'user7/accept_expenses',
                    type: 'post',
                    data: {
                        date: date,
                        supplier_id: supplier_id
                    },
                    success: function success(response) {
                        if (response.status == 'success') {
                            grid.reload();
                        }
                    }
                });
            });
        }
        grid.on('detailExpand', function (e, $detailWrapper, date) {

            var detail = $detailWrapper.find('table').grid({
                dataSource: { url: 'user7/add_expenses_data', type: 'post', success: function success(response) {
                        detail.render(response);
                    } },
                params: { date: date, supplier_id: supplier_id },
                responsive: true,
                notFoundText: 'Արդյունք չի գտնվել',
                fixedHeader: true,
                columns: [{ field: 'good_name', title: 'Ապրանք' }, { field: 'good_unit', title: 'Միավոր' }, { field: 'good_price', title: 'Գին' }, { field: 'good_amt', title: 'Քանակ' }]
            });
        });
    }

    function _history() {

        $('#history').off('click');
        var url = 'user7/history_get';
        $.get(url, function (response) {
            $('#history').off('click');
            removeActive();
            $('#content').html(response);
            $('#history').addClass('active');
            sessionStorage.setItem('url', url);
        }).then(function () {
            paidExpensesHistory();
        }).then(function () {
            return $('#history').off('click').on('click', _history);
        }).fail(error);
    }

    function paidExpensesHistory() {

        var from = $('#exp_from').val();
        var to = $('#exp_to').val();
        var input = $('#textSearch').val();

        $('#grid_history_expenses').grid('destroy', true, true);
        var expenses_grid = $('#grid_history_expenses').grid({
            dataSource: { url: 'user7/paid_goods_history', type: 'post', success: function success(response) {
                    var records = [];
                    for (var x in response) {
                        var sum = 0;
                        for (var j in response[x]) {
                            sum += response[x][j].balance;
                        }
                        response[x][0].sum = numberWithCommas(sum);
                        records.push(response[x][0]);
                    }
                    expenses_grid.render(records);
                } },
            responsive: true,
            primaryKey: 'date',
            fixedHeader: true,
            height: 600,
            notFoundText: 'Արդյունք չի գտնվել',
            detailTemplate: '<div><table  style="background:#fcf8e3"></div>',
            params: { name: input, from: from, to: to },
            columns: [{ field: 'date', title: 'Վճարման ամսաթիվ' }, { field: 'release_date', title: 'Ընդունման ամսաթիվ' }, { field: 'sum', title: 'Օրվա գործարքի ընհանուր գումարը ' }]
        });
        expenses_grid.on('detailExpand', function (e, $detailWrapper, id) {
            var detail = $detailWrapper.find('table').grid({
                dataSource: { url: 'user7/paid_goods_history', type: 'post', success: onSuccessDetailFunction },
                responsive: true,
                notFoundText: 'Արդյունք չի գտնվել',
                fixedHeader: true,
                params: { name: input, from: from, to: to, date: id },
                columns: [{ field: 'good_name', title: 'Ապրանք', cssClass: 'bold' }, { field: 'good_unit', title: 'Միավոր' }, { field: 'amt', title: 'Քանակ' }, { field: 'good_price', title: 'Գին' }]
            });
            function onSuccessDetailFunction(response) {
                detail.render(response);
            }
        });

        $('#grid_history_utilities').grid('destroy', true, true);
        var utilities_grid = $('#grid_history_utilities').grid({
            dataSource: { url: 'user7/paid_utilities_history', type: 'post', success: function success(response) {
                    var records = [];
                    for (var x in response) {
                        var sum = 0;
                        for (var j in response[x]) {
                            sum += response[x][j].balance;
                        }
                        response[x][0].sum = numberWithCommas(sum);
                        records.push(response[x][0]);
                    }
                    utilities_grid.render(records);
                } },
            responsive: true,
            primaryKey: 'month_id',
            notFoundText: 'Արդյունք չի գտնվել',
            height: 560,
            fixedHeader: true,
            detailTemplate: '<div><table  style="background:#fcf8e3"></div>',
            params: { name: input, from: from, to: to },
            columns: [{ field: 'month_name', title: 'Ամիս' }, { field: 'date', title: 'Վճարման ամսաթիվ' }, { field: 'sum', title: 'Ամսվա գործարքի ընհանուր գումարը ' }]
        });
        utilities_grid.on('detailExpand', function (e, $detailWrapper, id) {
            $detailWrapper.find('table').grid({
                dataSource: { url: 'user7/paid_utilities_history', type: 'post' },
                responsive: true,
                fixedHeader: true,
                notFoundText: 'Արդյունք չի գտնվել',
                params: { name: input, from: from, to: to, month: id },
                columns: [{ field: 'expense_name', title: 'Ծախսի տեսակ', cssClass: 'bold' }, { field: 'amt', title: 'Քանակ' }, { field: 'balance', title: 'Գումարը' }]
            });
        });

        $('.box input').off('keypress').on('keypress', function (e) {
            if (e.keyCode == 13) return false;
        });
        $('.box input').off('input').on('input', function () {
            paidExpensesHistory();
        });
        $('.btn_clear_search').off().on('click', function () {
            paidExpensesHistory();
        });
    }

    function _orders() {
        $('#orders').off('click');
        var url = 'user7/orders_get';
        $.get(url, function (response) {
            removeActive();
            $('#orders').addClass('active');
            $('#content').html(response);
            sessionStorage.setItem('url', url);
        }).then(function (response) {
            return getOrdersInfo(response);
        }).then(function () {
            return $('#orders').off('click').on('click', _orders);
        }).fail(error);
    }

    function getOrdersInfo() {
        var groupBy = function groupBy(client, product) {
            return group_by.val() == 'client_id' ? client : product;
        };
        var from = $('#order_from').val();
        var to = $('#order_to').val();
        var name = $('#receiving_order_search').val();
        var group_by = $('#group_by');

        $('#orders_table').grid('destroy', true, true);

        var grid = $('#orders_table').grid({
            primaryKey: 'id',
            dataSource: { url: 'user7/orders_data', type: 'post', success: gridDataFunction },
            params: { from: from, to: to, name: name, group_by: group_by.val() },
            detailTemplate: '<div><table  style="background:#fcf8e3"></div>',
            responsive: true,
            fixedHeader: true,
            height: 580,
            fontSize: 15,
            notFoundText: 'Արդյունք չի գտնվել',
            columns: [{ field: groupBy('client_name', 'product_name'), title: 'Անուն', hidden: false }, { field: groupBy('', 'total_amt'), title: groupBy('', 'Ընդանուր քանակ'), hidden: groupBy(true, false) }, { field: 'total_price', title: 'Ընդանուր գումար', hidden: false }, { field: groupBy('debt', ''), title: groupBy('Պարտք', ''), hidden: groupBy(false, true) }, { field: groupBy('bucket', ''), title: groupBy('Դույլ', ''), hidden: groupBy(false, true) }, { field: groupBy('lid', ''), title: groupBy('Կրիշկա', ''), hidden: groupBy(false, true) }]
        });
        function gridDataFunction(response) {
            for (var x in response) {
                response[x].debt = numberWithCommas(response[x].debt);
                response[x].total_price = numberWithCommas(response[x].total_price);
                response[x].product_name = numberWithCommas(response[x].product_name + ' ' + response[x].product_height);
                response[x].id = groupBy(response[x].client_id, response[x].product_id);
            }
            grid.render(response);
        }
        grid.on('detailExpand', function (e, $detailWrapper, id) {
            var detail = $detailWrapper.find('table').grid({
                dataSource: { url: 'user7/orders_data', type: 'post', success: detailFunction },
                params: { id: id, from: from, to: to, name: name, group_by: group_by.val() },
                responsive: true,
                notFoundText: 'Արդյունք չի գտնվել',
                fontSize: 15,
                fixedHeader: true,
                columns: [{ field: 'date', title: 'Ամսաթիվ <i class="fas fa-sort"></i>', sortable: true }, { field: groupBy('product_name', 'client_name'), title: groupBy('Ապրանք ', 'Հաճախորդ ') + '<i class="fas fa-sort"></i>', sortable: true }, { field: 'product_amt', title: 'Քանակ <i class="fas fa-sort"></i>', sortable: true }, { field: 'order_price', title: 'Գումար <i class="fas fa-sort"></i>', sortable: true }]
            });
            function detailFunction(response) {
                for (var x in response) {
                    response[x].product_name = response[x].product_name + ' ' + response[x].product_height;
                    response[x].order_price = numberWithCommas(response[x].order_price);
                }
                detail.render(response);
            }
        });

        group_by.off('change').on('change', getOrdersInfo);
        $('.box input').off('keypress').on('keypress', function (e) {
            if (e.keyCode == 13) {
                return false;
            }
        });
        $('.box input').off('input').on('input', getOrdersInfo);
        $('#btn_search_receiving_order_clear').off().on('click', _orders);
    }

    function _clients() {
        $('#clients').off('click');
        var url = 'user7/clients_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response);
            $("#clients").addClass('active');
            sessionStorage.setItem('url', url);
            $('#client_status').dropdown();
        }).then(function (response) {
            return getClientsInfo(response);
        }).then(function () {
            return $('#clients').off('click').on('click', _clients);
        }).fail(error);
    }

    function getClientsInfo() {
        var modal_title = $('#client_dialog .client_title');
        var error_message = $('#client_dialog .error_message');
        var status_values = [{ value: 0, text: "Տեղական" }, { value: 1, text: "Արտահանում" }];
        var grid = $('#client_table').grid({
            dataSource: { url: 'user7/client_data', type: 'post', success: function success(response) {
                    $.each(response.records, function (k, v) {
                        v.status == 0 ? v.status_name = 'Տեղական' : v.status_name = 'Արտահանում';
                    });
                    grid.render(response);
                } },
            primaryKey: 'id',
            fontSize: 15,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            inlineEditing: { mode: 'command', managementColumn: false },
            pager: { limit: 10, sizes: [5, 10, 20, 50] },
            columns: [{ field: 'name', title: 'Անուն <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'address', title: 'Հասցե <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'phone', title: 'Հեռախոս', editor: true }, { field: 'status_name', title: 'Կարգավիճակ', type: 'dropdown',
                editField: 'status', editor: { dataSource: status_values, valueField: 'value' } }, { width: 200, align: 'center', renderer: editManager, cssClass: 'fa_button' }]
        });

        grid.on('rowDataChanged', function (e, id, record) {
            var data = $.extend(true, {}, record);

            $.ajax({
                url: 'user7/update_client',
                data: { record: data },
                method: 'post',
                error: error
            });
        });

        $('#add_new_client').off().on('click', function () {
            modal_title.text('Ավելացնել նոր Հաճախորդ');
            error_message.text('');
            $('#btn_client').off().on('click', function () {
                var client_name = $('#new_client_name');
                var client_address = $('#new_client_height');
                var client_phone = $('#new_client_price');
                var client_status = $('#client_status');
                var record = {
                    name: client_name.val(),
                    address: client_address.val(),
                    phone: client_phone.val(),
                    status: client_status.val()
                };
                if (client_name.val() == '') {
                    return error_message.text('Անունը պարտադիր դաշտ է');
                } else if (client_status.val() == '') {
                    return error_message.text('Կարգավիճակը պարտադիր դաշտ է');
                } else {
                    $.ajax({
                        url: 'user7/add_client',
                        data: { record: record },
                        method: 'post',
                        success: function success() {
                            grid.reload();
                            client_name.val('');
                            client_address.val('');
                            client_phone.val('');
                            client_status.val('');
                            $('#client_dialog ').modal('hide');
                        },
                        error: error
                    });
                }
            });
        });

        function editManager(value, record, $cell, $displayEl, id, $grid) {
            var $edit = $('<button><i class="far fa-edit"></i></button>').attr('data-key', id),
                $delete = $('<button><i class="far fa-trash-alt"></i></button>').attr('data-key', id),
                $update = $('<button><i class="far fa-save"></i></button>').attr('data-key', id).hide().css('background', '#610d0d'),
                $cancel = $('<button><i class="fas fa-ban"></i></button>').attr('data-key', id).hide().css('background', '#610d0d');
            $edit.on('click', function () {
                $grid.edit($(this).data('key'));
                $edit.hide();
                $delete.hide();
                $update.show();
                $cancel.show();
            });
            $delete.on('click', function () {
                var id = $(this).data('key');
                $('#remove_client_confirm_modal').modal('show');

                $('#btn_remove_client').off('click').on('click', function () {
                    $.ajax({
                        url: 'user7/delete_client',
                        data: { id: id },
                        method: 'delete',
                        success: function success() {
                            $grid.removeRow($(this).data('key'));
                        },
                        error: error
                    });
                });
            });
            $update.on('click', function () {
                $grid.update($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $cancel.on('click', function () {
                $grid.cancel($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $displayEl.empty().append($edit, $delete, $update, $cancel);
        }
    }

    function _places() {
        $('#places').off('click');
        var url = 'user7/places_get';
        $.get(url, function (response) {
            removeActive();
            $("#content").html(response);
            $("#places").addClass('active');
            sessionStorage.setItem('url', url);
        }).then(function () {
            return getPlacesInfo();
        }).then(function () {
            return $('#places').off('click').on('click', _places);
        }).fail(error);
    }

    function getPlacesInfo() {
        var grid = void 0;
        var modal_title = $('#place_dialog .place_title');
        var error_message = $('#place_dialog .error_message');

        grid = $('#internal_destination_table').grid({
            dataSource: { url: 'user7/place_data', type: 'post' },
            primaryKey: 'id',
            fontSize: 15,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            inlineEditing: { mode: 'command', managementColumn: false },
            columns: [{ field: 'name', title: 'Անուն <i class="fas fa-sort"></i>', editor: true, sortable: true }, { width: 200, align: 'center', renderer: editManager, cssClass: 'fa_button' }],
            pager: { limit: 10, sizes: [5, 10, 20, 50] }
        });

        grid.on('rowDataChanged', function (e, id, record) {
            var data = $.extend(true, {}, record);
            $.ajax({
                url: 'user7/update_place',
                data: { record: data },
                method: 'post',
                error: error
            });
        });

        $('#add_new_place').off().on('click', function () {
            modal_title.text('Ավելացնել նոր ուղություն');
            error_message.text('');
            $('#btn_place').off().on('click', function () {
                var place_input = $('#new_place_name');
                var record = {
                    name: place_input.val()
                };
                if (place_input.val() != '') {
                    $.ajax({
                        url: 'user7/add_places',
                        data: { record: record },
                        method: 'post',
                        success: function success() {
                            place_input.val('');
                            $('#place_dialog ').modal('hide');
                            grid.reload();
                        },
                        error: error
                    });
                } else {
                    error_message.text('Լրացրեք նոր ուղություն');
                }
            });
        });

        function editManager(value, record, $cell, $displayEl, id, $grid) {
            var $edit = $('<button><i class="far fa-edit"></i></button>').attr('data-key', id),
                $delete = $('<button><i class="far fa-trash-alt"></i></button>').attr('data-key', id),
                $update = $('<button><i class="far fa-save"></i></button>').attr('data-key', id).hide().css('background', '#610d0d'),
                $cancel = $('<button><i class="fas fa-ban"></i></button>').attr('data-key', id).hide().css('background', '#610d0d');
            $edit.off().on('click', function () {
                $grid.edit($(this).data('key'));
                $edit.hide();
                $delete.hide();
                $update.show();
                $cancel.show();
            });
            $delete.on('click', function () {
                var id = $(this).data('key');
                $('#remove_place_confirm_modal').modal('show');

                $('#btn_remove_place').off('click').on('click', function () {
                    $.ajax({
                        url: 'user7/delete_place',
                        data: { id: id },
                        method: 'delete',
                        success: function success() {
                            $grid.removeRow($(this).data('key'));
                        },
                        error: error
                    });
                });
            });
            $update.off().on('click', function () {
                $grid.update($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $cancel.off().on('click', function () {
                $grid.cancel($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $displayEl.empty().append($edit).append($delete).append($update).append($cancel);
        }
    }

    function _suppliers() {
        $('#suppliers').off('click');
        var url = 'user7/suppliers_get';
        $.get(url, function (response) {
            removeActive();
            $("#content").html(response);
            $("#suppliers").addClass('active');
            sessionStorage.setItem('url', url);
        }).then(function () {
            return getSuppliersInfo();
        }).then(function () {
            return $('#suppliers').off('click').on('click', _suppliers);
        }).fail(error);
    }

    function getSuppliersInfo() {
        var modal_title = $('#suppliers_dialog .place_title');
        var error_message = $('#suppliers_dialog .error_message');
        var grid = $('#suppliers_table').grid({
            dataSource: { url: 'user7/suppliers_data', type: 'post' },
            primaryKey: 'id',
            fontSize: 15,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            inlineEditing: { mode: 'command', managementColumn: false },
            columns: [{ field: 'name', title: 'Անուն <i class="fas fa-sort"></i>', editor: true, sortable: true }, { width: 200, align: 'center', renderer: editManager, cssClass: 'fa_button' }],
            pager: { limit: 10, sizes: [5, 10, 20, 50] }
        });

        grid.on('rowDataChanged', function (e, id, record) {
            var data = $.extend(true, {}, record);
            $.ajax({
                url: 'user7/update_supplier',
                data: { record: data },
                method: 'post',
                error: error
            });
        });

        $('#add_new_suppliers').off('click').on('click', function () {
            modal_title.text('Ավելացնել նոր ուղություն');
            error_message.text('');
            $('#btn_suppliers').off().on('click', function () {
                var suppliers_input = $('#new_suppliers_name');
                var record = {
                    name: suppliers_input.val()
                };
                if (suppliers_input.val() != '') {
                    $.ajax({
                        url: 'user7/add_supplier',
                        data: { record: record },
                        method: 'post',
                        success: function success() {
                            suppliers_input.val('');
                            $('#suppliers_dialog ').modal('hide');
                            grid.reload();
                        },
                        error: error
                    });
                } else {
                    error_message.text('Լրացրեք նոր ուղություն');
                }
            });
        });

        function editManager(value, record, $cell, $displayEl, id, $grid) {
            var $edit = $('<button><i class="far fa-edit"></i></button>').attr('data-key', id),
                $delete = $('<button><i class="far fa-trash-alt"></i></button>').attr('data-key', id),
                $update = $('<button><i class="far fa-save"></i></button>').attr('data-key', id).hide().css('background', '#610d0d'),
                $cancel = $('<button><i class="fas fa-ban"></i></button>').attr('data-key', id).hide().css('background', '#610d0d');
            $edit.off().on('click', function () {
                $grid.edit($(this).data('key'));
                $edit.hide();
                $delete.hide();
                $update.show();
                $cancel.show();
            });
            $delete.on('click', function () {
                var id = $(this).data('key');
                $('#remove_suppliers_confirm_modal').modal('show');

                $('#btn_remove_suppliers').off('click').on('click', function () {
                    $.ajax({
                        url: 'user7/delete_supplier',
                        data: { id: id },
                        method: 'delete',
                        success: function success() {
                            $grid.removeRow($(this).data('key'));
                        },
                        error: error
                    });
                });
            });
            $update.off().on('click', function () {
                $grid.update($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $cancel.off().on('click', function () {
                $grid.cancel($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $displayEl.empty().append($edit, $delete, $update, $cancel);
        }
    }

    function _newExpenses() {

        $('#newExpenses').off('click');
        var url = 'user7/newExpenses_get';
        $.get(url, function (response) {
            removeActive();
            $("#content").html(response);
            $("#newExpenses").addClass('active');
            sessionStorage.setItem('url', url);
        }).then(function () {
            return getExpensesInfo();
        }).then(function () {
            return $('#newExpenses').off('click').on('click', _newExpenses);
        }).fail(error);
    }

    function getExpensesInfo() {

        var error_message = $('#expense_dialog .error_message');
        var grid = $('#expenses_table').grid({
            dataSource: { url: 'user7/expense_data', type: 'post' },
            primaryKey: 'id',
            fontSize: 15,
            autoLoad: false,
            inlineEditing: { mode: 'command', managementColumn: false },
            columns: [{ field: 'name', title: 'Անուն <i class="fas fa-sort"></i>', editor: true, sortable: true }, { width: 200, align: 'center', renderer: editManager, cssClass: 'fa_button' }],
            pager: { limit: 10, sizes: [5, 10, 20, 50] }
        });

        grid.on('rowDataChanged', function (e, id, record) {
            var data = $.extend(true, {}, record);
            $.ajax({
                url: 'user7/update_expense',
                data: { record: data },
                method: 'post',
                error: error
            });
        });

        $('#add_new_expense').off('click').on('click', function () {
            error_message.text('');
            $('#btn_expense').off('click').on('click', function () {
                var expense_input = $('#new_expense_name');
                var expense_unit = $('#new_expense_unit');
                if (expense_input.val() != '' && expense_unit.val() != '') {
                    $.ajax({
                        url: 'user7/add_new_expense',
                        data: { name: expense_input.val(), unit: expense_unit.val() },
                        method: 'post',
                        success: function success() {
                            expense_input.val('');
                            expense_unit.val('');
                            error_message.text('Ավելացված է');
                            grid.reload();
                        },
                        error: error
                    });
                } else {
                    error_message.text('Ունեք չլթացրած դաշտ');
                }
            });
        });
        function editManager(value, record, $cell, $displayEl, id, $grid) {
            var $edit = $('<button><i class="far fa-edit"></i></button>').attr('data-key', id),
                $delete = $('<button><i class="far fa-trash-alt"></i></button>').attr('data-key', id),
                $update = $('<button><i class="far fa-save"></i></button>').attr('data-key', id).hide().css('background', '#610d0d'),
                $cancel = $('<button><i class="fas fa-ban"></i></button>').attr('data-key', id).hide().css('background', '#610d0d');
            $edit.on('click', function () {
                $grid.edit($(this).data('key'));
                $edit.hide();
                $delete.hide();
                $update.show();
                $cancel.show();
            });
            $delete.on('click', function () {
                var id = $(this).data('key');
                $('#remove_expense_confirm_modal').modal('show');

                $('#btn_remove_expense').off('click').on('click', function () {
                    $.ajax({
                        url: 'user7/delete_expense',
                        data: { id: id },
                        method: 'delete',
                        success: function success() {
                            $grid.removeRow($(this).data('key'));
                        },
                        error: error
                    });
                });
            });
            $update.on('click', function () {
                $grid.update($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $cancel.on('click', function () {
                $grid.cancel($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $displayEl.empty().append($edit, $delete, $update, $cancel);
        }
    }

    function _goods() {
        $('#goods').off('click');
        var url = 'user7/goods_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response.view);
            $("#goods").addClass('active');
            sessionStorage.setItem('url', url);
            getGoodsInfo(response);
        }).then(function (response) {
            return getGoodsInfo(response);
        }).then(function () {
            return $('#goods').off('click').on('click', _goods);
        }).fail(error);
    }

    function getGoodsInfo(response) {
        var modal_title = $('#good_dialog .good_title');
        var error_message = $('#good_dialog .error_message');

        $('#good_modal_select').dropdown({
            dataSource: response.places,
            placeholder: 'Ընտրել Ուղությունը',
            valueField: 'id',
            textField: 'name'
        });
        $('#good_modal_select_section').dropdown({
            dataSource: response.subdivisions,
            placeholder: 'Ընտրել Բաժինը',
            valueField: 'id',
            textField: 'name'
        });
        $('#good_modal_select_supplier').dropdown({
            dataSource: response.suppliers,
            placeholder: 'Ընտրել մատակարարին',
            valueField: 'id',
            textField: 'name'
        });
        var grid = $('#good_table').grid({
            dataSource: { url: 'user7/good_data', type: 'post' },
            primaryKey: 'id',
            fontSize: 15,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            inlineEditing: { mode: 'command', managementColumn: false },
            columns: [{ field: 'name', title: 'Անուն <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'unit', title: 'Միավոր <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'price', title: 'Գին <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'place_name', title: 'Ուղություն', type: 'dropdown', editField: 'place_id',
                editor: { dataSource: response.places, valueField: 'id', textField: 'name' }
            }, { field: 'supplier_name', title: 'Մատակարար', type: 'dropdown', editField: 'supplier_id',
                editor: { dataSource: response.suppliers, valueField: 'id', textField: 'name' }
            }, { field: 'subdivision_name', title: 'Բաժինը', type: 'dropdown', editField: 'subdivision_id',
                editor: { dataSource: response.subdivisions, valueField: 'id', textField: 'name' }
            }, { width: 200, align: 'center', renderer: editManager, cssClass: 'fa_button' }],
            pager: { limit: 10, sizes: [5, 10, 20, 50] }
        });
        grid.off('rowDataChanged').on('rowDataChanged', function (e, id, record) {
            $.ajax({
                url: 'user7/update_good',
                data: { record: record },
                method: 'post',
                error: error
            });
        });
        function editManager(value, record, $cell, $displayEl, id, $grid) {
            var $edit = $('<button><i class="far fa-edit"></i></button>').attr('data-key', id),
                $delete = $('<button><i class="far fa-trash-alt"></i></button>').attr('data-key', id),
                $update = $('<button><i class="far fa-save"></i></button>').attr('data-key', id).hide().css('background', '#610d0d'),
                $cancel = $('<button><i class="fas fa-ban"></i></button>').attr('data-key', id).hide().css('background', '#610d0d');
            $edit.on('click', function () {
                $grid.edit($(this).data('key'));
                $edit.hide();
                $delete.hide();
                $update.show();
                $cancel.show();
            });
            $delete.on('click', function () {
                var id = $(this).data('key');
                $('#remove_good_confirm_modal').modal('show');

                $('#btn_remove_good').off('click').on('click', function () {
                    $.ajax({
                        url: 'user7/delete_good',
                        data: { id: id },
                        method: 'delete',
                        success: function success() {
                            $grid.removeRow($(this).data('key'));
                        },
                        error: error
                    });
                });
            });
            $update.on('click', function () {
                $grid.update($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $cancel.on('click', function () {
                $grid.cancel($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $displayEl.empty().append([$edit, $delete, $update, $cancel]);
        }

        $('#add_new_good').off('click').on('click', function () {
            modal_title.text('Ավելացնել նոր Հումք');
            error_message.text('');
            $('#btn_good').off().on('click', function () {
                var good_name = $('#new_good_name');
                var good_unit = $('#new_good_unit');
                var good_price = $('#new_good_price');
                var place_id = $('#good_modal_select');
                var sub_id = $('#good_modal_select_section');
                var supplier_id = $('#good_modal_select_supplier');
                var record = {
                    name: good_name.val(),
                    unit: good_unit.val(),
                    price: good_price.val(),
                    place_id: place_id.val(),
                    sub_id: sub_id.val(),
                    supplier_id: supplier_id.val()
                };

                if (good_name.val() != '' && supplier_id.val() != '' && sub_id.val() != '' && good_unit.val() != '' && good_price.val() != '' && place_id.val() != '') {
                    $.ajax({
                        url: 'user7/add_good',
                        data: { record: record },
                        method: 'post',
                        success: function success() {
                            good_name.val('');
                            good_unit.val('');
                            good_price.val('');
                            sub_id.val('');
                            supplier_id.val('');
                            place_id.val('');
                            $('#good_dialog ').modal('hide');
                            grid.reload();
                        },
                        error: error
                    });
                } else {
                    error_message.text('Ունեք բաց թողած դաշտ');
                }
            });
        });
    }

    function excelValidateAndProductAdd(e) {
        var formData = new FormData();
        var file_input = $('#exc_file');
        var file = file_input[0].files[0];
        var message = $('.message');
        formData.append('excel', file);
        if (file) {
            if (file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && file.type != 'application/vnd.ms-excel') {
                return message.text('Սխալ ֆայլ');
            } else {
                $.ajax({
                    url: 'user7/add_product_excel',
                    type: 'post',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function success(response) {
                        if (response.status == 'success') {
                            $('#excel_product_dialog').modal('hide');
                            file_input.val('');
                            e.data.grid.reload();
                        } else {
                            message.text('Սխալ ֆայլ');
                        }
                    },
                    error: function error() {
                        message.text('Սխալ ֆայլ');
                    }
                });
            }
        } else {
            return message.text('Ընտրեք ֆայլ');
        }
    }

    function productInputsValidate(e) {

        var tr = $('.add_new_product_table tr');
        var product_name = void 0,
            product_height = void 0,
            local_price = void 0,
            export_price = void 0,
            record = [],
            error = false;
        var error_message = $('#product_dialog .error_message');

        $.each(tr, function () {
            product_name = $(this).find('.new_product_name');
            product_height = $(this).find('.new_product_height');
            local_price = $(this).find('.new_local_price');
            export_price = $(this).find('.new_export_price');

            if (product_name.val() == '' || product_height.val() == '' || local_price.val() == '' || export_price.val() == '') {
                error_message.text('Ունեք բաց թողած դաշտ');
                return error = true;
            } else if (product_height.val() == /[^1-9'"]+/ || local_price.val() == /[^1-9'"]+/ || export_price.val() == /[^1-9'"]+/) {
                error_message.text('Ունեք սխալ լրացրած դաշտ');
                return error = true;
            }
            record.push({
                name: product_name.val(),
                height: product_height.val(),
                local_price: local_price.val(),
                export_price: export_price.val()
            });
        });

        if (!error) {
            $.ajax({
                url: 'user7/add_product',
                data: { record: record },
                method: 'post',
                success: function success() {
                    e.data.grid.reload();
                    $('#product_dialog ').modal('hide');
                    $('.new_product_name').val('');
                    $('.new_product_height').val('');
                    $('.new_product_price').val('');
                    $('.add_new_product_table tr:not(:first)').remove();
                },
                error: error
            });
        }
    }

    function _products() {
        $('#products').off('click');
        var url = 'user7/products_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response);
            $("#products").addClass('active');
            sessionStorage.setItem('url', url);
            $('#add_new_product_table').grid({});
        }).then(function () {
            return getProductInfo();
        }).then(function () {
            return $('#products').off('click').on('click', _products);
        }).fail(error);
    }

    function getProductInfo() {

        $('#btnAddRow').off().on('click', function () {

            $('.add_new_product_table').append('<tr>\n' + '<td><input type="text" class="gj-textbox-md modal_input new_product_name"></td>' + '<td><input type="text" class="gj-textbox-md modal_input new_product_height"></td>' + '<td><input type="number" class="gj-textbox-md modal_input new_local_price"></td>' + '<td><input type="number" class="gj-textbox-md modal_input new_export_price"></td>' + '<td><button class="remove_row"><i class="fas fa-minus-circle"></i></button></td>' + '</tr>');

            $('.remove_row').off().on('click', function () {
                $(this).closest('tr').remove();
            });
        });

        var grid = $('#product_table').grid({
            dataSource: { url: 'user7/product_data', type: 'post' },
            primaryKey: 'id',
            autoLoad: false,
            responsive: true,
            fontSize: 15,
            notFoundText: 'Արդյունք չի գտնվել',
            inlineEditing: { mode: 'command', managementColumn: false },
            columns: [{ field: 'name', title: 'Անուն <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'height', title: 'Բոյ <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'local_price', title: 'Արտահանման գին <i class="fas fa-sort"></i>', editor: true, sortable: true }, { field: 'export_price', title: 'Տեղական գին <i class="fas fa-sort"></i>', editor: true, sortable: true }, { width: 200, align: 'center', renderer: editManager, cssClass: 'fa_button' }],
            pager: { limit: 10 }
        });

        grid.on('rowDataChanged', function (e, id, record) {
            var data = $.extend(true, {}, record);
            $.ajax({
                url: 'user7/update_product',
                data: { record: data },
                method: 'post',
                error: error
            });
        });
        function editManager(value, record, $cell, $displayEl, id, $grid) {
            var $edit = $('<button><i class="far fa-edit"></i></button>').attr('data-key', id),
                $delete = $('<button><i class="far fa-trash-alt"></i></button>').attr('data-key', id),
                $update = $('<button><i class="far fa-save"></i></button>').attr('data-key', id).hide().css('background', '#610d0d'),
                $cancel = $('<button><i class="fas fa-ban"></i></button>').attr('data-key', id).hide().css('background', '#610d0d');
            $edit.off().on('click', function () {
                $grid.edit($(this).data('key'));
                $edit.hide();
                $delete.hide();
                $update.show();
                $cancel.show();
            });
            $delete.on('click', function () {
                var id = $(this).data('key');
                $('#remove_product_confirm_modal').modal('show');

                $('#btn_remove_product').off('click').on('click', function () {
                    $.ajax({
                        url: 'user7/delete_product',
                        data: { id: id },
                        method: 'delete',
                        success: function success() {
                            $grid.removeRow($(this).data('key'));
                        },
                        error: error
                    });
                });
            });
            $update.on('click', function () {
                $grid.update($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $cancel.on('click', function () {
                $grid.cancel($(this).data('key'));
                $edit.show();
                $delete.show();
                $update.hide();
                $cancel.hide();
            });
            $displayEl.empty().append($edit, $delete, $update, $cancel);
        }

        $('#btn_add_product_excel').off().click({ grid: grid }, excelValidateAndProductAdd);
        $('#btn_product').off().click({ grid: grid }, productInputsValidate);
    }

    function _accept() {
        $('#accept').off('click');
        var url = 'user7/accept_get';
        $.get(url, function (response) {
            removeActive();
            $('#content').html(response);
            $('#accept').addClass('active');
            sessionStorage.setItem('url', url);
        }).then(function () {
            return getAcceptInfo();
        }).then(function () {
            return $('#accept').off('click').on('click', _accept);
        }).fail(error);
    }

    function getAcceptInfo() {
        var table = $('#accept_table');
        table.grid({
            primaryKey: 'id',
            dataSource: { url: 'user7/get_clients', method: 'post' },
            responsive: true,
            notFoundText: 'Արդյունք չի գտնվել',
            fixedHeader: true,
            height: 630,
            fontSize: 15,
            columns: [{ field: 'name', title: 'Անուն ' }, { field: 'address', title: 'Հասցե' }, { field: 'phone', title: 'Հեռախոս' }, { title: 'Գումար', tmpl: '<input type="number" class="num_input paid" data-id="{id}">' }, { title: 'Դույլ', tmpl: '<input type="number" class="num_input bucket">' }, { title: 'Կրիշկա', tmpl: '<input type="number" class="num_input lid">' }]
        });
        $('#btn_accept').off().on('click', function () {
            var input = table.find('input.paid');
            var dialog = $('#accept_dialog');
            var data = [];
            $.each(input, function () {
                var bucket = $(this).closest('tr').find('.bucket');
                var lid = $(this).closest('tr').find('.lid');
                if ($(this).val() != '' || bucket.val() != '' || lid.val() != '') {
                    data.push({
                        paid: $(this).val(),
                        bucket: bucket.val(),
                        lid: lid.val(),
                        id: $(this).attr('data-id')
                    });
                }
            });
            if (data.length != '') {
                $.ajax({
                    url: 'user7/accept_post',
                    type: 'post',
                    data: { data: data },
                    success: function success(response) {
                        if (response.status == 'success') {
                            table.find('input[type=number]').val('');
                            dialog.find('.message').text('Մուտք են արվել բոլոր գումարները');
                        }
                    },
                    error: error
                });
            } else {
                dialog.find('.message').text('Բոլոր դաշտերը դատարկ են');
            }
        });
    }

    function error(jqXHR, textStatus, errorThrown) {
        console.error("error occurred: " + textStatus, errorThrown, jqXHR);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});

/***/ })

/******/ });