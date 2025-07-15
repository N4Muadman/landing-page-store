<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Order extends Model
{
    protected $fillable = [
        'product_option_id',
        'name',
        'phone_number',
        'address',
        'quantity',
        'status',
        'is_consulted', // Thêm field này
        'consulted_at', // Thêm field này
        'notes' // Thêm field ghi chú
    ];

    protected $casts = [
        'is_consulted' => 'boolean',
        'consulted_at' => 'datetime'
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_PROCESSING = 'processing';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    public function productOption()
    {
        return $this->belongsTo(ProductOption::class);
    }

    // Scope để lọc đơn hàng
    public function scopeConsulted($query)
    {
        return $query->where('is_consulted', true);
    }

    public function scopeNotConsulted($query)
    {
        return $query->where('is_consulted', false);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('created_at', today());
    }

    public function scopeThisWeek($query)
    {
        return $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year);
    }

    public function getStatusTextAttribute()
    {
        $statuses = [
            self::STATUS_PENDING => 'Chờ xử lý',
            self::STATUS_PROCESSING => 'Đang xử lý',
            self::STATUS_COMPLETED => 'Hoàn thành',
            self::STATUS_CANCELLED => 'Đã hủy'
        ];

        return $statuses[$this->status] ?? 'Không xác định';
    }

    public function getConsultedStatusTextAttribute()
    {
        return $this->is_consulted ? 'Đã tư vấn' : 'Chưa tư vấn';
    }
}
