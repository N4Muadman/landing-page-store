<?php
namespace App\Service;
use App\Models\Order;
use App\Models\ProductOption;

class OrderService
{
    public function placeOrder(array $data)
    {
        $orderData = array_merge($data, [
            'status' => Order::STATUS_PENDING,
            'is_consulted' => false
        ]);

        return Order::create($orderData);
    }

    public function getOrderStats()
    {
        return [
            'total_orders' => Order::count(),
            'pending_orders' => Order::byStatus(Order::STATUS_PENDING)->count(),
            'completed_orders' => Order::byStatus(Order::STATUS_COMPLETED)->count(),
            'consulted_orders' => Order::consulted()->count(),
            'not_consulted_orders' => Order::notConsulted()->count(),
            'today_orders' => Order::today()->count(),
            'this_month_orders' => Order::thisMonth()->count(),
        ];
    }

    public function markAsConsulted(Order $order, string $notes = null)
    {
        return $order->update([
            'is_consulted' => true,
            'consulted_at' => now(),
            'notes' => $notes
        ]);
    }

    public function updateOrderStatus(Order $order, string $status)
    {
        return $order->update(['status' => $status]);
    }
}
