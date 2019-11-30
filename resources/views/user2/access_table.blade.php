<div class="card" id="access_fertilizer">
    <h1>{{App::getLocale()}}</h1>
    <div class="card-header">
        <div class="card-title text-center"><h4>Ընդունել ապրանք</h4></div>
    </div>
    <div class="card-body ">
        <div class="row text-center flex">
            <div class="col-md-12 box">
                <div class="form-group">
                    <button id="btn_access_fertilizer_table" type="button" data-toggle="modal" data-target="#dialog_access_fertilizer">Ընդունել ապրանքները</button>
                </div>
            </div>
        </div>
        <table id="access_fertilizer_table"></table>
    </div>
</div>
<div class="modal fade" id="dialog_access_fertilizer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h5 class="access_fertilizer_message"></h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Լավ</button>
            </div>
        </div>
    </div>

</div>








