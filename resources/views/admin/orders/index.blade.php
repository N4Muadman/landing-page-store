@extends('admin.layout')

@section('content')
    <div class="page-header">
        <div class="page-block">
            <div class="row align-items-center">
                <div class="col-md-12">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Thống kê</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">Quản lý đơn hàng</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="card-body">
            <form method="GET" class="row g-3">
                <div class="col-md-3">
                    <label class="form-label">Tìm kiếm</label>
                    <input type="text" class="form-control" name="search" value="{{ request('search') }}"
                        placeholder="Tên, SĐT, địa chỉ...">
                </div>
                <div class="col-md-2">
                    <label class="form-label">Trạng thái</label>
                    <select class="form-select" name="status">
                        <option value="">Tất cả</option>
                        <option value="pending" {{ request('status') === 'pending' ? 'selected' : '' }}>Chờ xử lý</option>
                        <option value="processing" {{ request('status') === 'processing' ? 'selected' : '' }}>Đang xử lý
                        </option>
                        <option value="completed" {{ request('status') === 'completed' ? 'selected' : '' }}>Hoàn thành
                        </option>
                        <option value="cancelled" {{ request('status') === 'cancelled' ? 'selected' : '' }}>Đã hủy</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">Tư vấn</label>
                    <select class="form-select" name="consulted">
                        <option value="">Tất cả</option>
                        <option value="1" {{ request('consulted') === '1' ? 'selected' : '' }}>Đã tư vấn</option>
                        <option value="0" {{ request('consulted') === '0' ? 'selected' : '' }}>Chưa tư vấn</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">Thời gian</label>
                    <select class="form-select" name="period">
                        <option value="">Tất cả</option>
                        <option value="today" {{ request('period') === 'today' ? 'selected' : '' }}>Hôm nay</option>
                        <option value="week" {{ request('period') === 'week' ? 'selected' : '' }}>Tuần này</option>
                        <option value="month" {{ request('period') === 'month' ? 'selected' : '' }}>Tháng này</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">&nbsp;</label>
                    <div class="d-flex gap-2">
                        <button type="submit" class="btn btn-primary">Lọc</button>
                        <a href="{{ route('orders.index') }}" class="btn btn-secondary">Reset</a>
                    </div>
                </div>
            </form>
        </div>

        <div class="card-body">
            <form id="bulk-form">
                <div class="row g-3 align-items-end">
                    <div class="col-md-3">
                        <label class="form-label">Thao tác hàng loạt</label>
                        <select class="form-select" name="action" id="bulk-action">
                            <option value="">Chọn thao tác...</option>
                            <option value="update_status">Cập nhật trạng thái</option>
                            <option value="update_consulted">Cập nhật tư vấn</option>
                            <option value="delete">Xóa</option>
                        </select>
                    </div>
                    <div class="col-md-2" id="status-select" style="display: none;">
                        <label class="form-label">Trạng thái mới</label>
                        <select class="form-select" name="status">
                            <option value="pending">Chờ xử lý</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="cancelled">Đã hủy</option>
                        </select>
                    </div>
                    <div class="col-md-2" id="consulted-select" style="display: none;">
                        <label class="form-label">Trạng thái tư vấn</label>
                        <select class="form-select" name="is_consulted">
                            <option value="1">Đã tư vấn</option>
                            <option value="0">Chưa tư vấn</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-warning" id="bulk-submit">Thực hiện</button>
                    </div>
                </div>
            </form>
        </div>
    </div>


    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="select-all"></th>
                            <th>ID</th>
                            <th>Khách hàng</th>
                            <th>Sản phẩm</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            <th>Tư vấn</th>
                            <th>Thời gian</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($orders as $order)
                            <tr>
                                <td><input type="checkbox" name="order_ids[]" value="{{ $order->id }}"
                                        class="order-checkbox"></td>
                                <td>{{ $order->id }}</td>
                                <td>{{ $order->name }}</td>
                                <td>
                                    @if ($order->productOption && $order->productOption->product)
                                        {{ $order->productOption->product->name }}
                                    @else
                                        N/A
                                    @endif
                                </td>
                                <td>{{ $order->phone_number }}</td>
                                <td>{{ Str::limit($order->address, 30) }}</td>
                                <td>{{ $order->quantity }}</td>
                                <td>
                                    <span
                                        class="badge bg-{{ $order->status === 'completed' ? 'success' : ($order->status === 'cancelled' ? 'danger' : 'warning') }}">
                                        {{ $order->status_text }}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge bg-{{ $order->is_consulted ? 'success' : 'secondary' }}">
                                        {{ $order->consulted_status_text }}
                                    </span>
                                </td>
                                <td>{{ $order->created_at->format('d/m/Y H:i') }}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <a href="{{ route('orders.show', $order) }}" class="btn btn-sm btn-info">Xem</a>
                                        <button type="button" class="btn btn-sm btn-warning"
                                            onclick="updateConsulted({{ $order->id }}, {{ $order->is_consulted ? 'false' : 'true' }})">
                                            {{ $order->is_consulted ? 'Bỏ tư vấn' : 'Đã tư vấn' }}
                                        </button>
                                        <button type="button" class="btn btn-sm btn-danger"
                                            onclick="deleteOrder({{ $order->id }})">Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="11" class="text-center">Không có đơn hàng nào</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{ $orders->links() }}
        </div>
    </div>

    <script>
        // Select all checkbox
        document.getElementById('select-all').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.order-checkbox');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });

        // Bulk action form
        document.getElementById('bulk-action').addEventListener('change', function() {
            const statusSelect = document.getElementById('status-select');
            const consultedSelect = document.getElementById('consulted-select');

            statusSelect.style.display = 'none';
            consultedSelect.style.display = 'none';

            if (this.value === 'update_status') {
                statusSelect.style.display = 'block';
            } else if (this.value === 'update_consulted') {
                consultedSelect.style.display = 'block';
            }
        });

        // Bulk submit
        document.getElementById('bulk-submit').addEventListener('click', function() {
            const form = document.getElementById('bulk-form');
            const formData = new FormData(form);
            const selectedOrders = Array.from(document.querySelectorAll('.order-checkbox:checked')).map(cb => cb
                .value);

            if (selectedOrders.length === 0) {
                alert('Vui lòng chọn ít nhất một đơn hàng');
                return;
            }

            selectedOrders.forEach(id => formData.append('order_ids[]', id));

            fetch('{{ route('orders.bulk-action') }}', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    toastr.success(data.message);
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('Có lỗi xảy ra');

                });
        });

        // Update consulted status
        function updateConsulted(orderId, isConsulted) {
            fetch(`/admin/orders/${orderId}/consulted`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        is_consulted: isConsulted
                    })
                })
                .then(response => response.json())
                .then(data => {
                    toastr.success(data.message);
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('Có lỗi xảy ra');
                });
        }

        // Delete order
        function deleteOrder(orderId) {
            if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
                fetch(`/admin/orders/${orderId}`, {
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        toastr.success(data.message);
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);

                        toastr.success('Có lỗi xảy ra');
                    });
            }
        }
    </script>
@endsection
