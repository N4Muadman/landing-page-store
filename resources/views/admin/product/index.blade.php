@extends('admin.layout')

@section('content')
    <div class="page-header">
        <div class="page-block">
            <div class="row align-items-center">
                <div class="col-md-12">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Thống kê</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">Quản lý sản phẩm</li>
                    </ul>
                </div>
                <div class="col-md-12">
                    <div class="page-header-title">
                        <h2 class="mb-2">Danh sách sản phẩm</h2>
                        <a href="{{ route('products.create') }}"
                            class="btn btn-light-primary d-flex align-items-center gap-2"><i class="ti ti-plus"></i> Thêm
                            sản phẩm</a>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <form action="{{ route('products.index') }}" method="get">
        <div class="row align-items-center mb-3">
            <div class="col-12 col-md-3">
                <input type="text" class="form-control" name="name" placeholder="Tìm kiếm theo tên"
                    value="{{ request('name') }}">
            </div>

            <div class="col-3">
                <button type="submit" class="btn btn-info">Tìm kiếm</button>
            </div>
        </div>
    </form>
    <div class="row">
        <div class="col-12">
            <div class="card table-card">
                <div class="card-body pt-3">
                    <div class="table-responsive">
                        <table class="table table-hover text-center" id="pc-dt-simple">
                            <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Ảnh</th>
                                    <th>Giá</th>
                                    <th>Giảm giá</th>
                                    <th>Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($products as $product)
                                    <tr>
                                        <td>{{ $product->name }}</td>
                                        <td><img src="{{ $product->images?->first()->image_path }}" width="60px"
                                                alt="ảnh sp"></td>
                                        <td>{{ number_format($product->price, 0, '.', ',') }} đ</td>
                                        <td>
                                            {{ number_format($product->discount, 0, '.', ',') }} đ
                                        </td>

                                        <td>
                                            <a href="{{ route('product.detail', $product->id) }}"
                                                class="avtar avtar-details avtar-xs btn-link-secondary"
                                                title="Xem chi tiết">
                                                <i class="ti ti-eye f-20"></i>
                                            </a>
                                            <a href="{{ route('admin.products.edit', $product->id) }}"class="avtar avtar-change avtar-xs btn-link-secondary"
                                                data-id="{{ $product->id }}" title="Chỉnh sửa">
                                                <i class="ti ti-edit f-20"></i>
                                            </a>
                                            <a href="#" class="avtar avtar-delete avtar-xs btn-link-secondary"
                                            onclick="showDeleteModal('$product->name', $product->id)"
                                                title="XÓA ĐƠN HÀNG">
                                                <i class="ti ti-trash f-20"></i>
                                            </a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5">
                                            <p class="text-center">không có đơn hàng nào</p>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                        <div class="ps-5 pe-5">
                            {{ $products->links('pagination::bootstrap-5') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">
                        <i class="fas fa-exclamation-triangle me-2"></i>Xác nhận xóa
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center py-3">
                        <i class="fas fa-trash-alt text-danger" style="font-size: 3rem;"></i>
                        <h5 class="mt-3">Bạn có chắc chắn muốn xóa?</h5>
                        <p class="text-muted">Sản phẩm: <strong id="product-name"></strong></p>
                        <p class="text-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Hành động này không thể hoàn tác!
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>Hủy
                    </button>
                    <button type="button" class="btn btn-danger" onclick="deleteProduct()">
                        <i class="fas fa-trash me-2"></i>Xóa sản phẩm
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        let currentProductId = null;

        function showDeleteModal(productName, productId) {
            document.getElementById('product-name').textContent = productName;
            currentProductId = productId;
            const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
            modal.show();
        }

        function deleteProduct() {
            if (currentProductId) {
                // Simulate delete action
                console.log('Deleting product with ID:', currentProductId);

                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
                modal.hide();

                // Show success message (you can implement toast notification here)
                alert('Sản phẩm đã được xóa thành công!');

                // Reload page or remove row from table
                location.reload();
            }
        }

        // Search functionality
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const searchParams = {};

            for (let [key, value] of formData.entries()) {
                if (value.trim() !== '') {
                    searchParams[key] = value;
                }
            }

            console.log('Search parameters:', searchParams);
            // Implement your search logic here
        });

        // Add some interactive effects
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    </script>
@endsection
