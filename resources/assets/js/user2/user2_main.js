const log = console.log;

$(document).ready(function(){

    const fn = {
        accessFertilizer:()=>accessFertilizer(),
        exitFertilizer:()=>exitFertilizer(),
        fertilizerHistory:()=>fertilizerHistory(),
        fertilizers:()=>fertilizers()
    };
    if(sessionStorage.url){
        let f = getfn(sessionStorage.url);
        fn[f]();
    }else{
        fertilizers();
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
        $('#fertilizers').off('click').on('click',fertilizers);
        $('#accessFertilizer').off('click').on('click',accessFertilizer);
        $('#exitFertilizer').off('click').on('click',exitFertilizer);
        $('#fertilizerHistory').off('click').on('click',fertilizerHistory);
    }



    function fertilizers(){

        $('#fertilizers').off('click');
        let url = 'user2/fertilizers_get';
        $.get(url, function(response){
            removeActive();
            $('#content').html(response);
            $('#fertilizers').addClass('active');
            sessionStorage.setItem('url',url);
        })
            .then(()=> fertilizersData())
            .then(()=> $('#fertilizers').off('click').on('click', fertilizers))
            .fail(errors);
    }
    function fertilizersData() {
        let section =  $('#ware_section_select').val();
        $('#fertilizers_table').grid('destroy', true, true);
        $('#fertilizers_table').grid({
            dataSource: {url: 'user2/fertilizers_data', type: 'post'},
            fontSize: 15,
            responsive: true,
            autoLoad: false,
            notFoundText: 'Արդյունք չի գտնվել',
            params: {section: section},
            columns: [
                { field: 'fertilizer_name', title: 'Անուն <i class="fas fa-sort"></i>', sortable: true},
                { field: 'fertilizer_unit', title: 'Միավոր <i class="fas fa-sort"></i>', sortable: true},
                { field: 'sum_amt', title: 'Քանակ <i class="fas fa-sort"></i>', sortable: true},
            ],
            pager: {
                limit: 10,
                sizes: [10, 15, 20, 50],
            }
        });
    }


    function accessFertilizer(){
        $('#accessFertilizer').off('click');
        let url = 'user2/accessFertilizer_get';
        $.get(url, function (response) {
            removeActive();
            sessionStorage.setItem('url', url);
            $('#content').html(response);
            $('#accessFertilizer').addClass('active');
            accessData();

        })
            .then(()=> accessData())
            .then(()=> $('#accessFertilizer').off('click').on('click', accessFertilizer))
            .fail(errors);
    }
    function accessData(){
        let section = $('#access_ware_section_select').val();
        $('#access_fertilizer_table').grid('destroy', true, true);
        $('#access_fertilizer_table').grid({
            dataSource: {url: 'user2/accessFertilizer_data', type: 'post'},
            responsive: true,
            notFoundText: 'Արդյունք չի գտնվել',
            fixedHeader: true,
            fontSize: 15,
            height: 620,
            params: {section: section},
            columns: [
                {field: 'name', title: 'Անուն'},
                {field: 'unit', title: 'Միավոր'},
                {tmpl: '<input type="number" class="num_input" data-id="{id}"> ', title: 'Քանակ'},
            ],
        });


        $('#btn_access_fertilizer_table').off('click').on('click', function () {
            let message = $('.access_fertilizer_message');
            let input_amt = $('#access_fertilizer_table input');
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
                    url: 'user2/posts',
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

    function exitFertilizer(){
        let url = 'user2/exitFertilizer_get';
        $.get(url, function (response) {
            removeActive();
            sessionStorage.setItem('url', url);
            $('#content').html(response);
            $('#exitFertilizer').addClass('active');
        }).then(()=> exitData())
            .then(()=> $('#exitFertilizer').off('click').on('click', exitFertilizer))
            .fail(errors);
    }
    function exitData(){

        $('#select_place').off().on('change', function () {
            let place = $(this);
            if (place.val()  != ''){
                $('#exit_fertilizer_table').grid('destroy', true, true);
                let grid = $('#exit_fertilizer_table').grid({
                    dataSource: {url: 'user2/exitFertilizer_data', type: 'post'},
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
                $('#btn_exit_fertilizer_table').off().on('click', function () {

                    let message = $('.exit_fertilizer_message'),
                        input_amt = $('#exit_fertilizer_table input'),
                        place = $('#select_place'),
                        obj = [],
                        error_id = [],
                        error = false;

                    input_amt.removeClass('product_not_enough');
                    if ( place.val() != '' ){
                        $.each(input_amt, function(){
                            let fertilizer_id = $(this).attr('data-id');
                            let amt =  $(this).val();
                            let balance = $(this).attr('data-balance');

                            if (amt !== '' && amt > 0 ) {
                                obj.push({
                                    id: fertilizer_id,
                                    amt: -amt,
                                    place: place.val(),
                                });
                                if ((balance - amt) < 0 ){
                                    error_id.push(fertilizer_id);
                                }
                            }
                        });
                        if (obj.length == 0){
                            error = true;
                            message.text('Լրացրեք քանակ');
                        }

                        $.each(error_id, function(x){
                            let not = $('#exit_fertilizer_table input[data-id='+ error_id[x] +']');
                            message.text('Լրացրել եք մնացորդից ավել քանակ');
                            not.addClass('product_not_enough');
                            error = true

                        });
                        if (!error){
                            $.ajax({
                                url: 'user2/posts',
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

    function fertilizerHistory() {
        let url = 'user2/fertilizerHistory_get';
        $('#fertilizerHistory').off('click');
        removeActive();
        sessionStorage.setItem('url', url);
        $.get(url, function (response) {
            $('#content').html(response);
            $('#fertilizerHistory').addClass('active');
        })
        .then(()=> fertilizerHistoryData())
        .then(()=> $('#fertilizerHistory').off('click').on('click', fertilizerHistory))
        .fail(errors);

    }
    function fertilizerHistoryData(){

        $('#fertilizers_history_table').grid('destroy', true, true);
        let from = $('#history_from').val();
        let to = $('#history_to').val();
        let name = $('#history_search_name').val();
        let select = $('#fertilizer_history_drop_down');
        let group_by = $('#groupByName');

        let groupBy = (fertilizer, place)=>(group_by.val() == 'group_by_name' ) ? fertilizer : place;
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

        let grid = $('#fertilizers_history_table').grid({
            primaryKey: 'id',
            dataSource: {url: 'user2/fertilizers_history_data', type: 'post', success: onSuccessGridFunction},
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
                { field: groupBy('fertilizer_name','place_name'), title: 'Անուն'},
                { field: groupBy('fertilizer_unit',''), title: groupBy('Միավոր','')},
                { field: groupBy('access_sum',selectBy('access_sum','exit_sum','access_sum')), title: groupBy('Ընդհանուր մուտքեր',selectBy('Ընդհանուր մուտքեր','Ընդհանուր ելքեր','Ընդհանուր մուտքեր'))},
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
                    response[x][j].id =  groupBy(response[x][j].fertilizer_id,response[x][j].place_id);
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
                    fertilizer_id: id,
                    from: from,
                    to: to,
                    select: select.val(),
                    group_by: group_by.val()
                },
                dataSource: { url:'user2/fertilizers_history_data', type: 'post', success: successDetailFunction },
                fixedHeader: true,
                responsive: true,
                fontSize: 15,
                notFoundText: 'Արդյունք չի գտնվել',
                columns: [
                    { field: 'date', title: 'Ամսաթիվ'},
                    { field: groupBy('place_name','fertilizer_name'), title: groupBy(selectBy('', 'Ուղություն','Ուղություն'),'Ապրանք')},
                    { field: groupBy('','fertilizer_unit'), title: groupBy('','Միավոր')},
                    { field: 'access', title: 'Մուտքեր', hidden: groupBy(selectBy(false, true, false), true)},
                    { field: 'exit', title: 'Ելքեր',},
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
        $('.box input').off('input').on('input', fertilizerHistoryData);
        $('.box select, .box input').off('change').on('change', fertilizerHistoryData);

        $('#btn_exit_history_search_clear').off('click').on('click', fertilizerHistory);
    }

    function errors(jqXHR, textStatus, errorThrown) {
        console.error("error occurred: " + textStatus, errorThrown, jqXHR);
    }



});