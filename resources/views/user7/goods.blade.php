<div class="card">
    <div class="card-header text-center">
        <h4>Ապրանքններ</h4>
    </div>
    <div class="card-body">
        <div class="row flex text-center">
            <div class="col-md-12 box">
                <div class="form-group">
                   <button id="add_new_good" type="button"  data-toggle="modal" data-target="#good_dialog">Ավելացնել նոր ապրանք</button>
                </div>
            </div>
        </div>
        <table id="good_table"></table>
    </div>
</div>


<div class="modal fade" tabindex="-1" id="good_dialog" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="good_title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="text" class="gj-textbox-md modal_input" id="new_good_name" placeholder=Անուն>
                </div>
                <div class="form-group">
                    <input type="text" class="gj-textbox-md modal_input" id="new_good_unit" placeholder=Միավոր>
                </div>
                <div class="form-group">
                    <input type="number" class="gj-textbox-md modal_input" id="new_good_price" placeholder=Գին>
                </div>
                <div class="form-group">
                    <select id="good_modal_select"></select>
                </div>
                <div class="form-group">
                    <select id="good_modal_select_section"></select>
                </div>
                <div class="form-group">
                    <select id="good_modal_select_supplier"></select>
                </div>
                <p class="error_message text-danger"></p>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn_good" class="btn btn-primary">Հաստատել</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Փակել</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" tabindex="-1" id="remove_good_confirm_modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <h5>Պատրաստվում եք հեռացնել ապրանքը</h5>
            </div>
            <div class="modal-footer">
                <button type="button" id="btn_remove_good" data-dismiss="modal" class="btn btn-primary">Հեռացնել</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Փակել</button>
            </div>
        </div>
    </div>
</div>