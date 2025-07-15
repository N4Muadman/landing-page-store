@extends('admin.layout')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h3 class="card-title mb-0">
                        <i class="fas fa-chart-line me-2"></i>
                        Thống kê đơn hàng
                    </h3>
                </div>

                <div class="card-body">
                    {{-- Stats Cards --}}
                    <div class="row g-3 mb-4">
                        <div class="col-lg-3 col-md-6">
                            <div class="card border-0 bg-gradient-info text-white h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h2 class="fw-bold mb-1">{{ $stats['total'] }}</h2>
                                            <p class="mb-0 opacity-75">Tổng đơn hàng</p>
                                        </div>
                                        <div class="fs-1 opacity-50">
                                            <i class="fas fa-shopping-cart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="card border-0 bg-gradient-success text-white h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h2 class="fw-bold mb-1">{{ $stats['today'] }}</h2>
                                            <p class="mb-0 opacity-75">Đơn hàng hôm nay</p>
                                        </div>
                                        <div class="fs-1 opacity-50">
                                            <i class="fas fa-calendar-day"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="card border-0 bg-gradient-warning text-white h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h2 class="fw-bold mb-1">{{ $stats['consulted'] }}</h2>
                                            <p class="mb-0 opacity-75">Đã tư vấn</p>
                                        </div>
                                        <div class="fs-1 opacity-50">
                                            <i class="fas fa-phone"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <div class="card border-0 bg-gradient-danger text-white h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h2 class="fw-bold mb-1">{{ $stats['not_consulted'] }}</h2>
                                            <p class="mb-0 opacity-75">Chưa tư vấn</p>
                                        </div>
                                        <div class="fs-1 opacity-50">
                                            <i class="fas fa-phone-slash"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Charts Row --}}
                    <div class="row g-3 mb-4">
                        <div class="col-lg-8">
                            <div class="card shadow-sm">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">
                                        <i class="fas fa-chart-bar me-2"></i>
                                        Biểu đồ đơn hàng theo trạng thái
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <canvas id="orderStatusChart" width="400" height="200"></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="card shadow-sm">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">
                                        <i class="fas fa-chart-pie me-2"></i>
                                        Tỷ lệ tư vấn
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <canvas id="consultationChart" style="height: 200px; max-height: 200px;" width="200" height="200"></canvas>
                                    @php
                                        $consultedRate = $stats['total'] > 0 ? round(($stats['consulted'] / $stats['total']) * 100, 2) : 0;
                                    @endphp
                                    <div class="text-center mt-3">
                                        <h4 class="text-primary">{{ $consultedRate }}%</h4>
                                        <p class="text-muted mb-0">{{ $stats['consulted'] }}/{{ $stats['total'] }} đơn hàng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Time Stats & Status Stats --}}
                    <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <div class="card shadow-sm">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">
                                        <i class="fas fa-clock me-2"></i>
                                        Thống kê theo thời gian
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="text-center p-3 bg-light rounded">
                                                <h3 class="text-primary mb-1">{{ $stats['this_week'] }}</h3>
                                                <p class="text-muted mb-0">Tuần này</p>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="text-center p-3 bg-light rounded">
                                                <h3 class="text-success mb-1">{{ $stats['this_month'] }}</h3>
                                                <p class="text-muted mb-0">Tháng này</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="card shadow-sm">
                                <div class="card-header bg-light">
                                    <h5 class="mb-0">
                                        <i class="fas fa-tasks me-2"></i>
                                        Chi tiết trạng thái
                                    </h5>
                                </div>
                                <div class="card-body">
                                    <div class="row g-2">
                                        <div class="col-6">
                                            <div class="d-flex align-items-center p-2 bg-warning bg-opacity-10 rounded">
                                                <span class="badge bg-warning me-2">{{ $stats['by_status']['pending'] }}</span>
                                                <small class="text-muted">Chờ xử lý</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="d-flex align-items-center p-2 bg-info bg-opacity-10 rounded">
                                                <span class="badge bg-info me-2">{{ $stats['by_status']['processing'] }}</span>
                                                <small class="text-muted">Đang xử lý</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="d-flex align-items-center p-2 bg-success bg-opacity-10 rounded">
                                                <span class="badge bg-success me-2">{{ $stats['by_status']['completed'] }}</span>
                                                <small class="text-muted">Hoàn thành</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="d-flex align-items-center p-2 bg-danger bg-opacity-10 rounded">
                                                <span class="badge bg-danger me-2">{{ $stats['by_status']['cancelled'] }}</span>
                                                <small class="text-muted">Đã hủy</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {{-- Recent Orders --}}
                    <div class="row">
                        <div class="col-12">
                            <div class="card shadow-sm">
                                <div class="card-header bg-light d-flex justify-content-between align-items-center">
                                    <h5 class="mb-0">
                                        <i class="fas fa-list me-2"></i>
                                        Đơn hàng gần đây
                                    </h5>
                                    <a href="{{ route('orders.index') }}" class="btn btn-sm btn-primary">
                                        <i class="fas fa-eye me-1"></i>
                                        Xem tất cả
                                    </a>
                                </div>
                                <div class="card-body p-0">
                                    <div class="table-responsive">
                                        <table class="table table-hover mb-0">
                                            <thead class="table-light">
                                                <tr>
                                                    <th class="border-0">ID</th>
                                                    <th class="border-0">Khách hàng</th>
                                                    <th class="border-0">Sản phẩm</th>
                                                    <th class="border-0">SĐT</th>
                                                    <th class="border-0">Trạng thái</th>
                                                    <th class="border-0">Tư vấn</th>
                                                    <th class="border-0">Thời gian</th>
                                                    <th class="border-0">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($stats['recent_orders'] as $order)
                                                <tr>
                                                    <td class="fw-bold text-primary">#{{ $order->id }}</td>
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="avatar-circle me-2">
                                                                {{ substr($order->name, 0, 1) }}
                                                            </div>
                                                            {{ $order->name }}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        @if($order->productOption && $order->productOption->product)
                                                            <span class="text-truncate d-inline-block" style="max-width: 150px;" title="{{ $order->productOption->product->name }}">
                                                                {{ Str::limit($order->productOption->product->name, 20) }}
                                                            </span>
                                                        @else
                                                            <span class="text-muted">N/A</span>
                                                        @endif
                                                    </td>
                                                    <td>
                                                        <a href="tel:{{ $order->phone_number }}" class="text-decoration-none">
                                                            <i class="fas fa-phone-alt me-1"></i>
                                                            {{ $order->phone_number }}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-{{ $order->status === 'completed' ? 'success' : ($order->status === 'cancelled' ? 'danger' : ($order->status === 'processing' ? 'info' : 'warning')) }}">
                                                            {{ $order->status_text }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span class="badge bg-{{ $order->is_consulted ? 'success' : 'secondary' }}">
                                                            <i class="fas fa-{{ $order->is_consulted ? 'check' : 'times' }} me-1"></i>
                                                            {{ $order->consulted_status_text }}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <small class="text-muted">
                                                            {{ $order->created_at->format('d/m/Y') }}<br>
                                                            {{ $order->created_at->format('H:i') }}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <a href="{{ route('orders.show', $order) }}" class="btn btn-sm btn-outline-primary">
                                                            <i class="fas fa-eye"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Custom CSS --}}
<style>
.bg-gradient-info {
    background: linear-gradient(135deg, #17a2b8 0%, #1e7e34 100%);
}

.bg-gradient-success {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.bg-gradient-warning {
    background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
}

.bg-gradient-danger {
    background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
}

.avatar-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
}

.card {
    border: none;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.table-hover tbody tr:hover {
    background-color: #f8f9fa;
}

.bg-opacity-10 {
    background-color: rgba(var(--bs-bg-opacity), 0.1) !important;
}
</style>

{{-- Chart.js Script --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Order Status Chart
    const statusCtx = document.getElementById('orderStatusChart').getContext('2d');
    new Chart(statusCtx, {
        type: 'bar',
        data: {
            labels: ['Chờ xử lý', 'Đang xử lý', 'Hoàn thành', 'Đã hủy'],
            datasets: [{
                label: 'Số lượng đơn hàng',
                data: [
                    {{ $stats['by_status']['pending'] }},
                    {{ $stats['by_status']['processing'] }},
                    {{ $stats['by_status']['completed'] }},
                    {{ $stats['by_status']['cancelled'] }}
                ],
                backgroundColor: [
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(23, 162, 184, 0.8)',
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 193, 7, 1)',
                    'rgba(23, 162, 184, 1)',
                    'rgba(40, 167, 69, 1)',
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    // Consultation Chart
    const consultCtx = document.getElementById('consultationChart').getContext('2d');
    new Chart(consultCtx, {
        type: 'doughnut',
        data: {
            labels: ['Đã tư vấn', 'Chưa tư vấn'],
            datasets: [{
                data: [{{ $stats['consulted'] }}, {{ $stats['not_consulted'] }}],
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(108, 117, 125, 0.8)'
                ],
                borderColor: [
                    'rgba(40, 167, 69, 1)',
                    'rgba(108, 117, 125, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
});
</script>
@endsection
