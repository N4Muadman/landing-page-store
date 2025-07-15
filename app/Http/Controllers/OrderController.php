<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Service\OrderService;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(protected OrderService $order_service) {}

    public function index(Request $request)
    {
        $query = Order::with(['productOption.product'])->latest();

        if ($request->has('consulted')) {
            if ($request->consulted === '1') {
                $query->consulted();
            } elseif ($request->consulted === '0') {
                $query->notConsulted();
            }
        }

        if ($request->has('status') && $request->status !== '') {
            $query->byStatus($request->status);
        }

        if ($request->has('period')) {
            switch ($request->period) {
                case 'today':
                    $query->today();
                    break;
                case 'week':
                    $query->thisWeek();
                    break;
                case 'month':
                    $query->thisMonth();
                    break;
            }
        }

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone_number', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $orders = $query->paginate(20);

        return view('admin.orders.index', compact('orders'));
    }

    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        $order = $this->order_service->placeOrder($data);

        return response()->json(['message' => 'Đặt hàng thành công', 'order' => $order], 201);
    }

    public function show(Order $order)
    {
        $order->load(['productOption.product']);
        return view('admin.orders.show', compact('order'));
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        $order->update(['status' => $request->status]);

        return response()->json(['message' => 'Cập nhật trạng thái thành công']);
    }

    public function updateConsulted(Request $request, Order $order)
    {
        $request->validate([
            'is_consulted' => 'required|boolean',
            'notes' => 'nullable|string|max:1000'
        ]);

        $updateData = [
            'is_consulted' => $request->is_consulted,
            'notes' => $request->notes
        ];

        if ($request->is_consulted) {
            $updateData['consulted_at'] = now();
        }

        $order->update($updateData);

        return response()->json(['message' => 'Cập nhật trạng thái tư vấn thành công']);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Xóa đơn hàng thành công']);
    }

    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:delete,update_status,update_consulted',
            'order_ids' => 'required|array',
            'order_ids.*' => 'exists:orders,id',
            'status' => 'required_if:action,update_status|in:pending,processing,completed,cancelled',
            'is_consulted' => 'required_if:action,update_consulted|boolean'
        ]);

        $orders = Order::whereIn('id', $request->order_ids);

        switch ($request->action) {
            case 'delete':
                $orders->delete();
                break;
            case 'update_status':
                $orders->update(['status' => $request->status]);
                break;
            case 'update_consulted':
                $updateData = ['is_consulted' => $request->is_consulted];
                if ($request->is_consulted) {
                    $updateData['consulted_at'] = now();
                }
                $orders->update($updateData);
                break;
        }

        return response()->json(['message' => 'Thực hiện thành công']);
    }

    public function stats()
    {
        $stats = [
            'total' => Order::count(),
            'today' => Order::today()->count(),
            'this_week' => Order::thisWeek()->count(),
            'this_month' => Order::thisMonth()->count(),
            'consulted' => Order::consulted()->count(),
            'not_consulted' => Order::notConsulted()->count(),
            'by_status' => [
                'pending' => Order::byStatus(Order::STATUS_PENDING)->count(),
                'processing' => Order::byStatus(Order::STATUS_PROCESSING)->count(),
                'completed' => Order::byStatus(Order::STATUS_COMPLETED)->count(),
                'cancelled' => Order::byStatus(Order::STATUS_CANCELLED)->count(),
            ],
            'recent_orders' => Order::with(['productOption.product'])
                                   ->latest()
                                   ->limit(10)
                                   ->get()
        ];

        return view('admin.orders.stats', compact('stats'));
    }
}
