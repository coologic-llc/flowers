<?php

namespace App\Http\Controllers\Users;

use App\Good;
use App\Subdivision;
use App\Warehouse;
use App\Place;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class User1Controller extends Controller
{
    protected $redirectTo = 'user1';

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        if (\Request::isMethod('get')){
            return view('user1.home');
        }
        return abort(404);
    }

    /**
     * @return array
     */
    public function showGoodsHistoryPage() {
        if (\Request::isMethod('get') && \Request::ajax()){
            return view('user1.goods_history_table');
        }
        return abort(404);
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function goodsHistoryData(Request $request){
        $ware = Warehouse::select('warehouses.amt as amt','warehouses.balance as balance',
            'warehouses.created_at as date','warehouses.good_id as good_id',
            'goods.name as good_name','goods.unit as good_unit', 'goods.subdivision_id as sub_id',
            'places.name as place_name', 'warehouses.place_id as place_id')
            ->join('goods', 'goods.id', '=', 'warehouses.good_id')
            ->leftJoin('places', 'places.id', '=', 'warehouses.place_id')
            ->where('goods.subdivision_id', 1)
            ->when( $request,function($query) use($request){

                if ($request->select && $request->select == 'access') {
                    $query->where('warehouses.amt', '>', 0);
                }
                if ($request->history_sections){
                    $query->where('goods.subdivision_id', $request->history_sections);
                }
                else if ($request->select && $request->select == 'exit'){
                    $query->where('warehouses.amt', '<', 0);
                }
                if ($request->name){
                   if ($request->group_by == 'group_by_name'){
                       $query->where('goods.name','ilike', $request->name.'%');
                   }
                   else if($request->group_by == 'group_by_place'){
                       $query->where('places.name','ilike', $request->name.'%');
                   }
                }
                if ($request->from){
                    $date_from = Carbon::parse($request->from);
                    $query->where('warehouses.created_at','>', $date_from);
                }
                if ($request->to){
                    $date_to = Carbon::parse($request->to.'24:00:00');
                    $query->where('warehouses.created_at','<', $date_to);
                }
                if ($request->good_id){
                    if ($request->group_by == 'group_by_name'){
                        $query->where('good_id', $request->good_id);
                    }
                    else if ($request->group_by == 'group_by_place'){
                        $query->where('warehouses.place_id', $request->good_id);
                    }
                    $query->orderBy('date', 'desc');
                }
                return $query;
            })->get();

        if ($request->isMethod('get')){
            $ware->map(function($item) {
                if($item->amt < 0){
                    $item->exit = abs($item->amt);
                    $item->access = 0;
                }else{
                    $item->access = $item->amt;
                    $item->exit = 0;
                }
            });
            $this->exportGoodHistory($ware->toArray());
        }
        else if($request->isMethod('post')){
            $ware->map(function($item) {
                if (is_null($item->place_name)){
                    $item->place_name = $item->sub_name;
                }
                ($item->amt < 0) ? $item->exit = abs($item->amt) : $item->access = $item->amt;

            });
            if (!$request->good_id){
                if ($request->group_by && $request->group_by == 'group_by_name'){
                    $ware = $ware->groupBy('good_id')->toArray();
                }
                else if ($request->group_by && $request->group_by == 'group_by_place'){
                    $ware = $ware->where('amt','<',0)->groupBy('place_id')->toArray();
                }
            }

            return $ware;
        }
        return abort(404);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function posts(Request $request) {
        if($request->isMethod('post')) {
            foreach ($request->data as  $data) {
                $balance = Warehouse::select(DB::raw('SUM(amt) as balance'))
                    ->where('good_id', $data['id'] )
                    ->get();
                $ware = new Warehouse;
                $ware->amt = $data['amt'];
                $ware->balance = $balance[0]->balance + $data['amt'];
                if (isset($data['place'])){
                    $ware->place()->associate( $data['place']);
                }
                $ware->good()->associate($data['id']);
                $ware->save();
            }
            return response()->json([
                'status' => 'success'
            ]);
        }
        return abort(404);
    }

    /**
     * @return array
     */
    public function getGoods(){
        if (\Request::isMethod('get')){
                return view('user1.goods_table');
        }
        return abort(404);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function goodsData(Request $request){
        if ($request->isMethod('post')){
            $goods = Warehouse::select('goods.name as good_name', 'goods.unit as good_unit',
                'goods.subdivision_id as sub_id', DB::raw('SUM(amt) as sum_amt'))
                ->join('goods', 'goods.id', '=', 'warehouses.good_id')
                ->where('goods.subdivision_id', 1)
                ->when($request, function ($query) use($request){
                    if ($request->sortBy){
                        $query->orderBy($request->sortBy, $request->direction);
                    }
                    if ($request->section){
                        $query->where('goods.subdivision_id', $request->section);
                    }

                    return $query;
                })
                ->orderBy('good_name', 'asc')
                ->groupBy('good_id','goods.name', 'goods.unit','goods.subdivision_id')
                ->paginate($request->limit)->toArray();

            return [
                'records' =>  $goods['data'],
                'total' =>  $goods['total']
            ] ;
        }
        return abort(404);
    }

    /**
     * @return array
     * @throws \Throwable
     */
    public function accessGoodGet() {
        if (\Request::isMethod('get') && \Request::ajax()){
            $subs = Subdivision::select('id', 'name')->get();
            return view('user1.access_table', ['subs' => $subs]);
        }
        return abort(404);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function accessGoodData (Request $request){
        if ($request->isMethod('post')){
            $goods = Good::select('id', 'name','unit','subdivision_id')
                ->where('subdivision_id', '1')
                ->when($request, function ($query) use($request){
                    if ($request->section){
                        $query->where('subdivision_id', $request->section);
                    }
                })
                ->orderBy('name','asc')
                ->get();
            return $goods;
        }
        return abort(404);
    }

    /**
     * @return array
     * @throws \Throwable
     */
    public function exitGoodGet() {
        if (\Request::isMethod('get') && \Request::ajax()){
            $places = Place::select('id', 'name')->get();
            return view('user1.exit_table',['places' => $places]);
        }
        return abort(404);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function exitGoodPost(Request $request) {
        if ($request->isMethod('post')){
            $goods = DB::select("select distinct on (good_id) w.balance, w.good_id , g.name, g.unit, g.place_id, g.subdivision_id
            from warehouses w 
            join goods g ON w.good_id = g.id
            WHERE g.place_id = $request->place_id AND g.subdivision_id = 1
            ORDER BY w.good_id, w.id DESC");

            return $goods;
        }
        return abort(404);
    }

    /**
     * @param $data
     * @return $this
     */
    public function exportGoodHistory($data){
        return Excel::create('Պահեստի շարժ', function($excel) use($data) {
            $excel->sheet('Պահեստի շարժ', function($sheet) use($data) {
                $data = array_map(function ($item){

                    return[
                        'Անուն' => $item['good_name'],
                        'Մուտքեր' => $item['access'],
                        'Ելքեր' => $item['exit'],
                        'Միավոր' => $item['good_unit'],
                        'Մնացորդ' => $item['balance'],
                        'Ամսաթիվ' => $item['date'],
                    ];
                },$data);
                $sheet->fromArray($data);
            });
        })->export('xls');
    }
}
