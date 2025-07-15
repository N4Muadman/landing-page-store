@extends('admin.layout')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Chi tiết đơn hàng #{{ $order->id }}</h3>
                    <div class="card-tools">
                        <a href="{{ route('orders.index') }}" class="btn btn-primary">Quay lại</a>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Thông tin khách hàng</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td width="30%"><strong>Tên:</strong></td>
                                    <td>{{ $order->name }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Số điện thoại:</strong></td>
                                    <td>{{ $order->phone_number }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Địa chỉ:</strong></td>
                                    <td>{{ $order->address }}</td>
                                </tr>
                            </table>
                        </div>

                        <div class="col-md-6">
                            <h5>Thông tin đơn hàng</h5>
                            <table class="table table-borderless">
                                <tr>
                                    <td width="30%"><strong>Sản phẩm:</strong></td>
                                    <td>
                                        @if($order->productOption && $order->productOption->product)
                                            {{ $order->productOption->product->name }}
                                        @else
                                            N/A
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Số lượng:</strong></td>
                                    <td>{{ $order->quantity }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Trạng thái:</strong></td>
                                    <td>
                                        <span class="badge bg-{{ $order->status === 'completed' ? 'success' : ($order->status === 'cancelled' ? 'danger' : 'warning') }}">
                                            {{ $order->status_text }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Tư vấn:</strong></td>
                                    <td>
                                        <span class="badge bg-{{ $order->is_consulted ? 'success' : 'secondary' }}">
                                            {{ $order->consulted_status_text }}
                                        </span>
                                        @if($order->is_consulted && $order->consulted_at)
                                            <br><small>{{ $order->consulted_at->format('d/m/Y H:i') }}</small>
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Thời gian tạo:</strong></td>
                                    <td>{{ $order->created_at->format('d/m/Y H:i:s') }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    @if($order->notes)
                    <div class="row mt-4">
                        <div class="col-12">
                            <h5>Ghi chú</h5>
                            <div class="alert alert-info">{{ $order->notes }}</div>
                        </div>
                    </div>
                    @endif

                    <div class="row mt-4">
                        <div class="col-12">
                            <h5>Cập nhật trạng thái</h5>
                            <form class="row g-3">
                                <div class="col-md-3">
                                    <label class="form-label">Trạng thái đơn hàng</label>
                                    <select class="form-select" id="status-update">
                                        <option value="pending" {{ $order->status === 'pending' ? 'selected' : '' }}>Chờ xử lý</option>
                                        <option value="processing" {{ $order->status === 'processing' ? 'selected' : '' }}>Đang xử lý</option>
                                        <option value="completed" {{ $order->status === 'completed' ? 'selected' : '' }}>Hoàn thành</option>
                                        <option value="cancelled" {{ $order->status === 'cancelled' ? 'selected' : '' }}>Đã hủy</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">Trạng thái tư vấn</label>
                                    <select class="form-select" id="consulted-update">
                                        <option value="1" {{ $order->is_consulted ? 'selected' : '' }}>Đã tư vấn</option>
                                        <option value="0" {{ !$order->is_consulted ? 'selected' : '' }}>Chưa tư vấn</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Ghi chú</label>
                                    <input type="text" class="form-control" id="notes-update" value="{{ $order->notes }}" placeholder="Ghi chú...">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">&nbsp;</label>
                                    <div class="d-flex gap-2">
                                        <button type="button" class="btn btn-primary" onclick="updateStatus()">Cập nhật</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function updateStatus() {
    const status = document.getElementById('status-update').value;
    const isConsulted = document.getElementById('consulted-update').value === '1';
    const notes = document.getElementById('notes-update').value;

    // Update order status
    fetch(`/admin/orders/{{ $order->id }}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(data => {
        // Update consulted status
        return fetch(`/admin/orders/{{ $order->id }}/consulted`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                is_consulted: isConsulted,
                notes: notes
            })
        });
    })
    .then(response => response.json())
    .then(data => {
        toastr.success('Cập nhật thành công!');
        location.reload();
    })
    .catch(error => {
        toastr.error('Có lỗi xảy ra');
        console.error('Error:', error);
    });
}
</script>
@endsection
