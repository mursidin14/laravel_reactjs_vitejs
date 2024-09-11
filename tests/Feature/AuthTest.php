<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UserSeed;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    // test register success
    public function testRegisterSuccess()
    {
        $this->post('api/users', [
            'name' => 'mursidin',
            'email' => 'mur@gmail.com',
            'password' => 'rahasia_'
        ])->assertStatus(201)
          ->assertJson([
            'data' => [
                'name' => 'mursidin',
                'email' => 'mur@gmail.com',
            ]
            ]);
    }

    // test Register Failed
    public function testRegisterFailed()
    {
        $this->post('api/users', [
            'name' => 'rudi',
            'email' => '',
            'password' => 'rahasia_2'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [
                'email' => [
                    'The email field is required.'
                ]
            ]
            ]);
    }

    // test Register email already
    public function testRegisterAlready()
    {
        $this->testRegisterSuccess();
        $this->post('api/users', [
            'name' => 'rudi',
            'email' => 'mur@gmail.com',
            'password' => 'rahasia_'
        ])->assertStatus(400)
          ->assertJson([
            'errors' => [ 
                'email' => [
                    'email already registered'
                ]
            ]
                ]);
    }

    // Login test
    public function testLoginSuccess()
    {
        $this->seed([UserSeed::class]);
        $this->post('api/users/login', [
            'email' => 'mur@gmail.com',
            'password' => 'rahasia_',
        ])->assertStatus(200)
          ->assertJson([
             'data' => [
                'name' => 'mursidin',
                'email' => 'mur@gmail.com'
             ]
             ]);

        $user = User::where('email', 'mur@gmail.com')->first();
        self::assertNotNull($user->token);
    }

    public function testLoginFailedEmail()
    {
        $this->post('api/users/login', [
            'email' => 'test@gmail.com',
            'password' => 'rahasia_'
        ])->assertStatus(401)
          ->assertJson([
                'errors' => [
                    'message' => [
                        'email or password is wrong'
                    ]
                ]
                    ]);
    }

    public function testLoginFiledPassword()
    {
        $this->post('api/users/login', [
            'email' => 'mur@gmail.com',
            'password' => 'salah_'
        ])->assertStatus(401)
          ->assertJson([
            'errors' => [
                'message' => [
                    'email or password is wrong'
                ]
            ]
                ]);
    }
}
