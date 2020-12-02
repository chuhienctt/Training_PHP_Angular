<?php

namespace App\Controller;

use Core\Controller;
use Core\DB;
use App\Model\Users;

class HomeController extends Controller {

    public function index() {
        // $id = DB::table("users")->insert([
        //     'username' => "test",
        //     'password' => "abcxyz"
        // ]);

        // $users = DB::table("users")->where(['username' => 'test'])->take(3)->get();


        // $result = DB::table('users')->where(['id' => 6])->delete();

        // $user = new Users();

        // $user->username = "new user";
        // $user->password = "new pass";

        // $result = $user->save();

        $users = Users::where(['id' => 5])->get();

        foreach($users as $user) {
            $user->username = "ten da sua";

            $user->save();
        }

        return response()->json(1);
    }

    public function getApiNoAuth() {
        echo "Không có middleware";
    }

    public function getApiAuth() {
        echo "Có middleware";
    }
}