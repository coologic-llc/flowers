<div class="card">
    <div class="card-header">
        <div class="row text-center">
            <div class="col-md-12">
                <h4>Ապրանքների վճարումններ</h4>
            </div>
        </div>
    </div>
    <div class="card-body">
        <div class="row flex text-center">
            <div class="col-md-12 box">
                <div class="form-group">
                    <select id="suppliers_list" class="form-control">
                        <option value="">Ընտրել մատակարարին</option>
                        @if($suppliers)
                            @foreach($suppliers as $supplier)
                                <option value="{{$supplier->id}}">{{$supplier->name}}</option>
                            @endforeach
                        @endif
                    </select>
                </div>
            </div>
        </div>
        <table id="add_expenses_table"> </table>
    </div>
</div>


<div class="modal fade" id="expense_modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <h5 class="message">Կատարել վճարում</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btn_accept_expense" data-dismiss="modal">Այո</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Ոչ</button>
            </div>
        </div>
    </div>
</div>