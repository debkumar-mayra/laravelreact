<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getRoleNameAttribute()
    {
        if ($this->roles()->exists())
            return $this->roles()->first()->name;
        else
            return 0;
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getDobAttribute($val)
    {
        return $val ? date('m-d-Y', strtotime($val)) : null;
    }


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['name'] ?? null, function ($query, $search) {
            $query->WhereRaw("concat(first_name,' ', last_name) like '%" . trim($search) . "%' ");
        });

        $query->when($filters['email'] ?? null, function ($query, $search) {
            $query->where('email','like', "%" . trim($search) . "%");
        });

        $query->when($filters['phone'] ?? null, function ($query, $search) {
            $query->where('phone','like', "%" . trim($search) . "%");
        });

        $query->when(isset($filters['status']) ?? null, function ($query, $search) use($filters){
            $query->where('status',$filters['status']);
        });
    }

    public function scopeOrdering($query, array $filters)
    {
        $query->when($filters['field_name'] ?? null, function ($query, $search) use($filters){
            $query->orderBy($filters['field_name'],$filters['short_by']);
        });
    }
    
}