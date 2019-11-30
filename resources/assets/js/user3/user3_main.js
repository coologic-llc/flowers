const log = console.log;

$(document).ready(function(){

    const fn = {
        accessPesticide:()=>accessPesticide(),
        exitPesticide:()=>exitPesticide(),
        pesticideHistory:()=>pesticideHistory(),
        pesticides:()=>pesticides()
    };
    if(sessionStorage.url){
        let f = getfn(sessionStorage.url);
        fn[f]();
    }else{
        pesticides();
    }
    function getfn(){
        return sessionStorage.url.split('/').pop().split('_').shift();
    }
    function removeActive(){
        if(sessionStorage.url) {
            $('#' + getfn(sessionStorage.url)).removeClass('active');
            return true;
        }
        return false;
    }
    events();
    function events() {
        $('#pesticides').off('click').on('click',pesticides);
        $('#accessPesticide').off('click').on('click',accessPesticide);
        $('#exitPesticide').off('click').on('click',exitPesticide);
        $('#pesticideHistory').off('click').on('click',pesticideHistory);
    }



    function pesticides(){

        $('#pesticides').off('click');
        let url = 'user3/pesticides_get';
        $.get(url, function(response){
            removeActive();
            $('#content').html(response);
            $('#pesticides').addClass('active');
            sessionStorage.setItem('url',url);
        })
            .then(()=> pesticidesData())
            .then(()=> $('#pesticides').off('click').on('click', pesticides))
            .fail(errors);
    }
    function pesticidesData() {
        $('#pesticides_table').grid('destroy', true, true);
        $('#pesticides_table').grid({
            dataSource: {url: 'user3/pesticides_data', type: 'post'},
            fontSize: 15,
            responsive: true,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            columns: [
                { field: 'pesticide_name', title: 'Անուն <i class="fas fa-sort"></i>', sortable: true},
                { field: 'pesticide_unit', title: 'Միավոր <i class="fas fa-sort"></i>', sortable: true},
                { field: 'sum_amt', title: 'Քանակ <i class="fas fa-sort"></i>', sortable: true},
            ],
            pager: {
                limit: 10,
                sizes: [10, 15, 20, 50],
            }
        });
    }

    function accessPesticide(){
        $('#accessPesticide').off('click');
        let url = 'user3/accessPesticide_get';
        $.get(url, function (response) {
            removeActive();
            sessionStorage.setItem('url', url);
            $('#content').html(response);
            $('#accessPesticide').addClass('active');
        })
            .then(()=> accessData())
            .then(()=> $('#accessPesticide').off('click').on('click', accessPesticide))
            .fail(errors);
    }
    function accessData(){
        $('#access_pesticide_table').grid('destroy', true, true);
        $('#access_pesticide_table').grid({
            dataSource: {url: 'user3/accessPesticide_data', type: 'post'},
            responsive: true,
            notFoundText: 'Արդյունք չի գտնվել',
            fixedHeader: true,
            fontSize: 15,
            height: 620,
            columns: [
                {field: 'name', title: 'Անուն'},
                {field: 'unit', title: 'Միավոր'},
                {tmpl: '<input type="number" class="num_input" data-id="{id}"> ', title: 'Քանակ'},
            ],
        });


        $('#btn_access_pesticide_table').off('click').on('click', function () {
            let message = $('.access_pesticide_message');
            let input_amt = $('#access_pesticide_table input');
            let obj = [];
            $.each(input_amt, function () {
                if ($(this).val() != '' && $(this).val() > 0 ) {
                    obj.push({
                        id: $(this).attr('data-id'),
                        amt: $(this).val(),
                    });
                }
            });

            if (obj.length != 0){
                $.ajax({
                    url: 'user3/posts',
                    type: 'POST',
                    dataType: 'json',
                    data: {data: obj},
                    success: function (response) {
                        if (response.status == 'success') {
                            message.text('Մուտքերը հաջողությամբ կատարվեցին');
                            input_amt.val('')
                        }
                    },
                    error: errors
                });
            }else{
                message.text('Լրացնել քանակ')
            }
        })
    }

    function exitPesticide(){
        $('#exitPesticide').off('click');
        let url = 'user3/exitPesticide_get';
        $.get(url, function (response) {
            removeActive();
            sessionStorage.setItem('url', url);
            $('#content').html(response);
            $('#exitPesticide').addClass('active');
        }).then(()=> exitData())
            .then(()=> $('#exitPesticide').off('click').on('click', exitPesticide))
            .fail(errors);
    }
    function exitData(){

        $('#select_place').off().on('change', function () {
            let place = $(this);
            if (place.val()  != ''){
                $('#exit_pesticide_table').grid('destroy', true, true);
                let grid = $('#exit_pesticide_table').grid({
                    dataSource: {url: 'user3/exitPesticide_data', type: 'post'},
                    primaryKey: 'good_id',
                    params: {place_id: place.val()},
                    responsive: true,
                    fixedHeader: true,
                    height: 630,
                    fontSize: 15,
                    notFoundText: 'Արդյունք չի գտնվել',
                    columns:[
                        {field: 'name', title: 'Անուն'},
                        {field: 'unit', title: 'Միավոր'},
                        {tmpl: '<input type="number" class="num_input" data-balance="{balance}" data-id="{good_id}"/>', title: 'Քանակ'},
                        {field: 'balance', title: 'Մնացորդ'}

                    ]
                });
                $('#btn_exit_pesticide_table').off().on('click', function () {

                    let message = $('.exit_pesticide_message'),
                        input_amt = $('#exit_pesticide_table input'),
                        place = $('#select_place'),
                        obj = [],
                        error_id = [],
                        error = false;

                    input_amt.removeClass('product_not_enough');
                    if ( place.val() != '' ){
                        $.each(input_amt, function(){
                            let pesticide_id = $(this).attr('data-id');
                            let amt =  $(this).val();
                            let balance = $(this).attr('data-balance');

                            if (amt !== '' && amt > 0 ) {
                                obj.push({
                                    id: pesticide_id,
                                    amt: -amt,
                                    place: place.val(),
                                });
                                if ((balance - amt) < 0 ){
                                    error_id.push(pesticide_id);
                                }
                            }
                        });
                        if (obj.length == 0){
                            error = true;
                            message.text('Լրացրեք քանակ');
                        }

                        $.each(error_id, function(x){
                            let not = $('#exit_pesticide_table input[data-id='+ error_id[x] +']');
                            message.text('Լրացրել եք մնացորդից ավել քանակ');
                            not.addClass('product_not_enough');
                            error = true

                        });
                        if (!error){
                            $.ajax({
                                url: 'user3/posts',
                                type: 'post',
                                data: {data: obj},
                                success: function (response) {
                                    if (response.status == 'success') {
                                        message.text('Ելքերը հաջողությամբ կատարվեցին');
                                        input_amt.val('');
                                        grid.reload();
                                    }
                                },
                                error: errors
                            });
                        }
                    }else{
                        message.text('Ընտրեք Ուղությունը')
                    }
                })
            }else{
                $('#grid_exit').html('')
            }
        });
    }

    function pesticideHistory() {
        $('#pesticideHistory').off('click');
        let url = 'user3/pesticideHistory_get';
        removeActive();
        sessionStorage.setItem('url', url);
        $.get(url, function (response) {
            $('#content').html(response);
            $('#pesticideHistory').addClass('active');
        })
        .then(()=> pesticideHistoryData())
        .then(()=> $('#pesticideHistory').off('click').on('click', pesticideHistory))
        .fail(errors);

    }
    function pesticideHistoryData(){
        let from = $('#history_from').val();
        let to = $('#history_to').val();
        let name = $('#history_search_name').val();
        let select = $('#pesticide_history_drop_down');
        let group_by = $('#groupByName');

        let groupBy = (pesticide, place)=>(group_by.val() == 'group_by_name' ) ? pesticide : place;
        let selectBy = (access, exit, all)=>{
            switch (select.val()){
                case 'access':
                    return access;
                case 'exit':
                    return exit;
                default :
                    return all;
            }
        };

        $('#pesticides_history_table').grid('destroy', true, true);
        let grid = $('#pesticides_history_table').grid({
            primaryKey: 'id',
            dataSource: {url: 'user3/pesticides_history_data', type: 'post', success: onSuccessGridFunction},
            fontSize: 15,
            fixedHeader: true,
            height: 555,
            notFoundText: 'Արդյունք չի գտնվել',
            params: {
                from: from,
                to: to,
                select: select.val(),
                name: name,
                group_by: group_by.val(),
            },
            showHiddenColumnsAsDetails: true,
            detailTemplate: '<div><table  style="background: #fcf8e3"></div>',
            responsive: true,
            columns: [
                { field: groupBy('pesticide_name','place_name'), title: 'Անուն'},
                { field: groupBy('pesticide_unit',''), title: groupBy('Միավոր','')},
                { field: groupBy(selectBy('access_sum','exit_sum','access_sum'),selectBy('access_sum','exit_sum','access_sum')), title: groupBy(selectBy('Ընդհանուր մուտքեր','Ընդհանուր ելքեր','Ընդհանուր մուտքեր'),selectBy('Ընդհանուր մուտքեր','Ընդհանուր ելքեր','Ընդհանուր մուտքեր'))},
                { field: selectBy('','','exit_sum'), title: selectBy('','','Ընդհանուր ելքեր')},
            ]
        });


        function onSuccessGridFunction(response) {

            select.removeAttr('disabled');
            group_by.removeAttr('disabled');
            if (group_by.val() == 'group_by_place'){
                select.attr('disabled', true);
                grid.hideColumn('access_sum');
            }
            if (select.val() == 'access'){
                group_by.attr('disabled', true)
            }

            let records = [];
            for( let x in response ){
                let access = 0, exit = 0;
                for (let j in response[x]){
                    response[x][j].id =  groupBy(response[x][j].pesticide_id,response[x][j].place_id);
                    if (response[x][j].amt > 0){
                        access += +response[x][j].amt
                    }else{
                        exit += +response[x][j].amt
                    }
                }
                response[x][0].access_sum = access;
                response[x][0].exit_sum = Math.abs(exit);
                records.push(response[x][0])
            }
            grid.render(records);
        }
        grid.on('detailExpand', function (e, $detailWrapper, id) {

            let detail = $detailWrapper.find('table').grid({
                params: {
                    pesticide_id: id,
                    from: from,
                    to: to,
                    select: select.val(),
                    group_by: group_by.val()
                },
                dataSource: { url:'user3/pesticides_history_data', type: 'post', success: successDetailFunction },
                fixedHeader: true,
                responsive: true,
                fontSize: 15,
                notFoundText: 'Արդյունք չի գտնվել',
                columns: [
                    { field: 'date', title: 'Ամսաթիվ'},
                    { field: groupBy('place_name','pesticide_name'), title: groupBy('Ուղություն','Ապրանք')},
                    { field: groupBy('','pesticide_unit'), title: groupBy('','Միավոր')},
                    { field: 'access', title: 'Մուտքեր', hidden: groupBy(selectBy(false, true, false), true)},
                    { field: 'exit', title: 'Ելքեր', hidden: selectBy(true, false, false)},
                    { field: 'balance', title: 'Մնացորդ'},
                ],
            });
            function successDetailFunction (response) {
                response.map(function (value) {
                    return (!value.place_name) ? value.place_name = 'Պահեստ' : value.place_name
                });
                detail.render(response);
            }
        });

        $('.box input').off('keypress').on('keypress', function(e){
            if(e.keyCode == 13) {
                return false
            }
        });
        $('.box input').off('input').on('input', pesticideHistoryData);
        $('.box select, .box input').off('change').on('change', pesticideHistoryData);

        $('#btn_exit_history_search_clear').off('click').on('click', pesticideHistory);
    }

    function errors(jqXHR, textStatus, errorThrown) {
        console.error("error occurred: " + textStatus, errorThrown, jqXHR);
    }



});