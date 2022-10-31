<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'call_custom_id',
        'cutomer_nbr',
        'audio_url',
        'duration',
        'positive_emotions_pct',
        'negative_emotions_pct',
        'neutral_emotions_pct',
        'operator_id'
    ];


    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
