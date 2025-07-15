@extends('admin.layout')

@section('content')
    <div class="page-header">
        <div class="page-block">
            <div class="row align-items-center">
                <div class="col-md-12">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Thống kê</a></li>
                        <li class="breadcrumb-item"><a href="{{ url()->previous() }}">Quản lý sản phẩm</a></li>
                        <li class="breadcrumb-item" aria-current="page">Sửa sản phẩm</li>
                    </ul>
                </div>
                <div class="col-md-12">
                    <div class="page-header-title">
                        <h2 class="mb-2">Sửa sản phẩm: {{ $product->title }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <form id="product-form" enctype="multipart/form-data">
            @method('PUT')

            <!-- Basic Information -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-info-circle"></i>
                    Thông tin cơ bản
                </div>
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="productTitle" name="title"
                                placeholder="Tiêu đề sản phẩm" value="{{ $product->title }}" required>
                            <label for="productTitle" class="required-field">Tiêu đề sản phẩm</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="productName" name="name"
                                placeholder="Tên sản phẩm" value="{{ $product->name }}" required>
                            <label for="productName" class="required-field">Tên sản phẩm</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="productSlug" name="slug"
                                placeholder="Đường dẫn (slug)" value="{{ $product->slug }}" readonly>
                            <label for="productSlug">Đường dẫn (slug)</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <select class="form-select" id="productLayout" name="layout" required>
                                <option value="">Chọn bố cục</option>
                                <option value="tiktok" {{ $product->layout == 'tiktok' ? 'selected' : '' }}>Bố cục Tiktok
                                </option>
                            </select>
                            <label for="productLayout" class="required-field">Bố cục hiển thị</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pricing -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-dollar-sign"></i>
                    Thông tin giá
                </div>
                <div class="row g-3">
                    <div class="col-md-4">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="productPrice" name="price"
                                placeholder="Giá bán" value="{{ number_format($product->price, 0, ',', '.') }}" required>
                            <label for="productPrice" class="required-field">Giá bán (VNĐ)</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="productDiscount" name="discount"
                                placeholder="Giảm giá" value="{{ number_format($product->discount, 0, ',', '.') }}"
                                required>
                            <label for="productDiscount" class="required-field">Giảm giá (VNĐ)</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="productSold" name="sold"
                                placeholder="Đã bán" value="{{ number_format($product->sold, 0, ',', '.') }}" required>
                            <label for="productSold" class="required-field">Số lượng đã bán</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Images -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-images"></i>
                    Hình ảnh sản phẩm
                </div>

                <!-- Existing Images -->
                @if ($product->images && count($product->images) > 0)
                    <div class="mb-3">
                        <h6>Ảnh hiện tại:</h6>
                        <div class="d-flex flex-wrap" id="existing-images">
                            @foreach ($product->images as $index => $image)
                                <div class="image-preview existing-image" data-image-id="{{ $image->id }}">
                                    <img src="{{ asset('storage/' . $image->path) }}" alt="Existing Image">
                                    <button type="button" class="delete-btn delete-existing-image"
                                        data-image-id="{{ $image->id }}">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif

                <div class="upload-area" id="upload-area">
                    <i class="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                    <h5>Kéo thả ảnh vào đây hoặc click để chọn</h5>
                    <p class="text-muted">Hỗ trợ nhiều ảnh, định dạng: JPG, PNG, GIF</p>
                    <input type="file" id="file-upload" name="images[]" accept="image/*" multiple
                        style="display: none;">
                    <button type="button" class="custom-file-upload">
                        <i class="fas fa-plus me-2"></i>Thêm ảnh mới
                    </button>
                </div>
                <div class="d-flex flex-wrap mt-3" id="image-preview-container">
                    <!-- New preview images will be inserted here -->
                </div>
            </div>

            <!-- Product Options -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-cogs"></i>
                    Tùy chọn sản phẩm
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <p class="mb-0">Danh sách tùy chọn</p>
                    <button type="button" class="btn-add-characteristic" id="add-option">
                        <i class="fas fa-plus me-2"></i>Thêm tùy chọn
                    </button>
                </div>
                <div id="product-options">
                    @if ($product->options && count($product->options) > 0)
                        @foreach ($product->options as $index => $option)
                            <div class="characteristics-item">
                                <div class="row align-items-center">
                                    <div class="col-md-11">
                                        <div class="form-floating">
                                            <input type="text" class="form-control"
                                                name="options[{{ $index }}][name]" placeholder="Tên tùy chọn"
                                                value="{{ $option->name }}" required>
                                            <label class="required-field">Tên tùy chọn (VD: Màu sắc, Kích thước)</label>
                                        </div>
                                    </div>
                                    <div class="col-md-1 text-end">
                                        <button type="button" class="btn-remove remove-option">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <div class="characteristics-item">
                            <div class="row align-items-center">
                                <div class="col-md-11">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" name="options[0][name]"
                                            placeholder="Tên tùy chọn" required>
                                        <label class="required-field">Tên tùy chọn (VD: Màu sắc, Kích thước)</label>
                                    </div>
                                </div>
                                <div class="col-md-1 text-end">
                                    <button type="button" class="btn-remove remove-option">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
                <div class="mt-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="optionName" name="name_option"
                            placeholder="Tên nhóm tùy chọn" value="{{ $product->name_option }}">
                        <label for="optionName" class="required-field">Tên nhóm tùy chọn</label>
                    </div>
                </div>
            </div>

            <!-- Customer Comments/Reviews -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-comments"></i>
                    Đánh giá khách hàng
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <p class="mb-0">Danh sách đánh giá</p>
                    <button type="button" class="btn-add-characteristic" id="add-comment">
                        <i class="fas fa-plus me-2"></i>Thêm đánh giá
                    </button>
                </div>
                <div id="customer-comments">
                    @if ($product->comments && count($product->comments) > 0)
                        @foreach ($product->comments as $index => $comment)
                            <div class="comment-item">
                                <div class="row g-3">
                                    <input type="hidden" name="comments[{{ $index }}][id]"
                                        value="{{ $comment->id }}" />
                                    <div class="col-md-2">
                                        <div class="avatar-upload">
                                            <div class="avatar-preview">
                                                <div id="avatar-{{ $index }}" class="avatar-display">
                                                    @if ($comment->avatar)
                                                        <img src="{{ asset('storage/' . $comment->avatar) }}"
                                                            alt="Avatar">
                                                    @else
                                                        <i class="fas fa-user-circle fa-3x text-muted"></i>
                                                    @endif
                                                </div>
                                            </div>
                                            <div class="avatar-edit">
                                                <input type="file" id="avatar-upload-{{ $index }}"
                                                    name="comments[{{ $index }}][avatar]" accept="image/*" />
                                                <label for="avatar-upload-{{ $index }}" class="btn-avatar-upload">
                                                    <i class="fas fa-camera"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-10">
                                        <div class="row g-3">
                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control"
                                                        name="comments[{{ $index }}][name]"
                                                        placeholder="Tên khách hàng" value="{{ $comment->name }}"
                                                        required>
                                                    <label class="required-field">Tên khách hàng</label>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control"
                                                        name="comments[{{ $index }}][option]"
                                                        placeholder="Tùy chọn đã mua" value="{{ $comment->option }}">
                                                    <label>Tùy chọn đã mua</label>
                                                </div>
                                            </div>
                                            <div class="col-md-4 d-flex align-items-end">
                                                <button type="button" class="btn-remove remove-comment">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-floating">
                                                    <textarea class="form-control" name="comments[{{ $index }}][content]" placeholder="Nội dung đánh giá"
                                                        style="height: 80px;" required>{{ $comment->content }}</textarea>
                                                    <label class="required-field">Nội dung đánh giá</label>
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="comment-images-upload">
                                                    <label class="form-label">Ảnh đánh giá</label>

                                                    @if ($comment->images && count($comment->images) > 0)
                                                        <div class="mb-2">
                                                            <small class="text-muted">Ảnh hiện tại:</small>
                                                            <div class="d-flex flex-wrap existing-comment-images"
                                                                data-comment-index="{{ $index }}">
                                                                @foreach ($comment->images as $commentImage)
                                                                    <div class="image-preview existing-comment-image"
                                                                        data-image-id="{{ $commentImage->id }}">
                                                                        <img src="{{ asset('storage/' . $commentImage->path) }}"
                                                                            alt="Comment Image">
                                                                        <button type="button"
                                                                            class="delete-btn delete-existing-comment-image"
                                                                            data-image-id="{{ $commentImage->id }}"
                                                                            data-comment-index="{{ $index }}">
                                                                            <i class="fas fa-times"></i>
                                                                        </button>
                                                                    </div>
                                                                @endforeach
                                                            </div>
                                                        </div>
                                                    @endif

                                                    <div class="comment-upload-area"
                                                        data-comment-index="{{ $index }}">
                                                        <i class="fas fa-images fa-2x text-muted mb-2"></i>
                                                        <p class="text-muted mb-2">Thêm ảnh đánh giá mới</p>
                                                        <input type="file" class="comment-file-upload"
                                                            name="comments[{{ $index }}][images][]"
                                                            accept="image/*" multiple style="display: none;">
                                                        <button type="button"
                                                            class="btn btn-outline-primary btn-sm comment-upload-btn">
                                                            <i class="fas fa-plus me-1"></i>Chọn ảnh
                                                        </button>
                                                    </div>
                                                    <div class="comment-images-preview d-flex flex-wrap mt-2"
                                                        data-comment-index="{{ $index }}">
                                                        <!-- New comment images preview will be inserted here -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <div class="comment-item">
                            <div class="row g-3">
                                <div class="col-md-2">
                                    <div class="avatar-upload">
                                        <div class="avatar-preview">
                                            <div id="avatar-0" class="avatar-display">
                                                <i class="fas fa-user-circle fa-3x text-muted"></i>
                                            </div>
                                        </div>
                                        <div class="avatar-edit">
                                            <input type="file" id="avatar-upload-0" name="comments[0][avatar]"
                                                accept="image/*" />
                                            <label for="avatar-upload-0" class="btn-avatar-upload">
                                                <i class="fas fa-camera"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-10">
                                    <div class="row g-3">
                                        <div class="col-md-4">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" name="comments[0][name]"
                                                    placeholder="Tên khách hàng" required>
                                                <label class="required-field">Tên khách hàng</label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-floating">
                                                <input type="text" class="form-control" name="comments[0][option]"
                                                    placeholder="Tùy chọn đã mua">
                                                <label>Tùy chọn đã mua</label>
                                            </div>
                                        </div>
                                        <div class="col-md-4 d-flex align-items-end">
                                            <button type="button" class="btn-remove remove-comment">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <textarea class="form-control" name="comments[0][content]" placeholder="Nội dung đánh giá" style="height: 80px;"
                                                    required></textarea>
                                                <label class="required-field">Nội dung đánh giá</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="comment-images-upload">
                                                <label class="form-label">Ảnh đánh giá</label>
                                                <div class="comment-upload-area" data-comment-index="0">
                                                    <i class="fas fa-images fa-2x text-muted mb-2"></i>
                                                    <p class="text-muted mb-2">Thêm ảnh đánh giá</p>
                                                    <input type="file" class="comment-file-upload"
                                                        name="comments[0][images][]" accept="image/*" multiple
                                                        style="display: none;">
                                                    <button type="button"
                                                        class="btn btn-outline-primary btn-sm comment-upload-btn">
                                                        <i class="fas fa-plus me-1"></i>Chọn ảnh
                                                    </button>
                                                </div>
                                                <div class="comment-images-preview d-flex flex-wrap mt-2"
                                                    data-comment-index="0">
                                                    <!-- Comment images preview will be inserted here -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <!-- Feedback Images -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-camera"></i>
                    Ảnh feedback khách hàng
                </div>

                @if ($product->feedbacks && count($product->feedbacks) > 0)
                    <div class="mb-3">
                        <h6>Ảnh feedback hiện tại:</h6>
                        <div class="d-flex flex-wrap" id="existing-feedbacks">
                            @foreach ($product->feedbacks as $feedback)
                                <div class="image-preview existing-feedback" data-feedback-id="{{ $feedback->id }}">
                                    <img src="{{ asset('storage/' . $feedback->path) }}" alt="Existing Feedback">
                                    <button type="button" class="delete-btn delete-existing-feedback"
                                        data-feedback-id="{{ $feedback->id }}">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif

                <div class="upload-area" id="feedback-upload-area">
                    <i class="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                    <h5>Kéo thả ảnh feedback vào đây hoặc click để chọn</h5>
                    <p class="text-muted">Hỗ trợ nhiều ảnh, định dạng: JPG, PNG, GIF</p>
                    <input type="file" id="feedback-file-upload" name="feedbacks[]" accept="image/*" multiple
                        style="display: none;">
                    <button type="button" class="custom-file-upload" id="feedback-upload-btn">
                        <i class="fas fa-plus me-2"></i>Thêm ảnh feedback mới
                    </button>
                </div>
                <div class="d-flex flex-wrap mt-3" id="feedback-preview-container">
                    <!-- New feedback images preview will be inserted here -->
                </div>
            </div>

            <!-- Description -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-align-left"></i>
                    Mô tả sản phẩm
                </div>
                <div class="row g-3">
                    <div class="col-12">
                        <div class="form-floating">
                            <textarea class="form-control textarea-custom" id="productDescription" name="description"
                                placeholder="Mô tả chi tiết sản phẩm">{{ $product->description }}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SEO & Analytics -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-chart-line"></i>
                    SEO & Analytics
                </div>
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="pixelFb" name="pixel_fb"
                                placeholder="Facebook Pixel ID" value="{{ $product->pixel_fb }}">
                            <label for="pixelFb">Facebook Pixel ID</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="countReviews"
                                name="count_reviews" placeholder="Số lượng đánh giá"
                                value="{{ number_format($product->count_reviews, 0, ',', '.') }}" required>
                            <label for="countReviews" class="required-field">Số lượng đánh giá</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <select class="form-select" id="productStar" name="star" required>
                                <option value="5" {{ $product->star == 5 ? 'selected' : '' }}>5 sao</option>
                                <option value="4" {{ $product->star == 4 ? 'selected' : '' }}>4 sao</option>
                                <option value="3" {{ $product->star == 3 ? 'selected' : '' }}>3 sao</option>
                                <option value="2" {{ $product->star == 2 ? 'selected' : '' }}>2 sao</option>
                                <option value="1" {{ $product->star == 1 ? 'selected' : '' }}>1 sao</option>
                            </select>
                            <label for="productStar" class="required-field">Đánh giá sao</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Buttons -->
            <div class="section-card">
                <div class="d-flex justify-content-end gap-3">
                    <button type="button" class="btn-cancel" onclick="window.history.back()">
                        <i class="fas fa-times me-2"></i>Hủy bỏ
                    </button>
                    <button type="submit" class="btn-submit">
                        <i class="fas fa-save me-2"></i>Cập nhật sản phẩm
                    </button>
                </div>
            </div>
        </form>
    </div>

    <script src="/adminAssets/ckeditor/ckeditor.js"></script>
    <script>
        let optionIndex = {{ $product->options ? count($product->options) : 1 }};
        let commentIndex = {{ $product->comments ? count($product->comments) : 1 }};
        let uploadedFiles = [];
        let feedbackFiles = [];
        let commentFiles = {};
        let deletedImages = [];
        let deletedFeedbacks = [];
        let deletedCommentImages = [];

        // Initialize CKEditor
        CKEDITOR.replace('productDescription', {
            extraPlugins: 'uploadimage,image2',
            removePlugins: 'image',
            filebrowserUploadUrl: '/upload-image',
            filebrowserUploadMethod: 'form'
        });

        // Auto-generate slug from title
        document.getElementById('productTitle').addEventListener('input', function() {
            const name = this.value;
            const slug = name.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[đĐ]/g, 'd')
                .replace(/[^a-z0-9\s]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            document.getElementById('productSlug').value = slug;
        });

        // Handle existing image deletion
        document.addEventListener('click', function(e) {
            if (e.target.closest('.delete-existing-image')) {
                const btn = e.target.closest('.delete-existing-image');
                const imageId = btn.getAttribute('data-image-id');
                deletedImages.push(imageId);
                btn.parentElement.remove();
            }
        });

        // Handle existing feedback deletion
        document.addEventListener('click', function(e) {
            if (e.target.closest('.delete-existing-feedback')) {
                const btn = e.target.closest('.delete-existing-feedback');
                const feedbackId = btn.getAttribute('data-feedback-id');
                deletedFeedbacks.push(feedbackId);
                btn.parentElement.remove();
            }
        });

        // Handle existing comment image deletion
        document.addEventListener('click', function(e) {
            if (e.target.closest('.delete-existing-comment-image')) {
                const btn = e.target.closest('.delete-existing-comment-image');
                const imageId = btn.getAttribute('data-image-id');
                deletedCommentImages.push(imageId);
                btn.parentElement.remove();
            }
        });

        // File upload handlers (reuse from create form)
        const fileUpload = document.getElementById('file-upload');
        const uploadArea = document.getElementById('upload-area');
        const previewContainer = document.getElementById('image-preview-container');

        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        uploadArea.addEventListener('click', function() {
            fileUpload.click();
        });

        fileUpload.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const index = uploadedFiles.push(file) - 1;
                        const imageDiv = document.createElement('div');
                        imageDiv.className = 'image-preview';
                        imageDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Preview">
                            <button type="button" class="delete-btn" data-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        previewContainer.appendChild(imageDiv);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        previewContainer.addEventListener('click', function(e) {
            if (e.target.closest('.delete-btn')) {
                const btn = e.target.closest('.delete-btn');
                const index = parseInt(btn.getAttribute('data-index'));
                uploadedFiles.splice(index, 1);
                btn.parentElement.remove();

                // Cập nhật lại index cho các button còn lại
                const buttons = previewContainer.querySelectorAll('.delete-btn');
                buttons.forEach((button, i) => {
                    button.setAttribute('data-index', i);
                });
            }
        });

        // Feedback upload handlers
        const feedbackUpload = document.getElementById('feedback-file-upload');
        const feedbackUploadArea = document.getElementById('feedback-upload-area');
        const feedbackPreviewContainer = document.getElementById('feedback-preview-container');
        const feedbackUploadBtn = document.getElementById('feedback-upload-btn');

        feedbackUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            feedbackUploadArea.classList.add('dragover');
        });

        feedbackUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            feedbackUploadArea.classList.remove('dragover');
        });

        feedbackUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            feedbackUploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFeedbackFiles(files);
        });

        feedbackUploadBtn.addEventListener('click', function() {
            feedbackUpload.click();
        });

        feedbackUpload.addEventListener('change', function() {
            handleFeedbackFiles(this.files);
        });

        function handleFeedbackFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const index = feedbackFiles.push(file) - 1;
                        const imageDiv = document.createElement('div');
                        imageDiv.className = 'image-preview';
                        imageDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Feedback Preview">
                            <button type="button" class="delete-btn" data-feedback-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        feedbackPreviewContainer.appendChild(imageDiv);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        feedbackPreviewContainer.addEventListener('click', function(e) {
            if (e.target.closest('.delete-btn')) {
                const btn = e.target.closest('.delete-btn');
                const index = parseInt(btn.getAttribute('data-feedback-index'));
                feedbackFiles.splice(index, 1);
                btn.parentElement.remove();

                // Cập nhật lại index cho các button còn lại
                const buttons = feedbackPreviewContainer.querySelectorAll('.delete-btn');
                buttons.forEach((button, i) => {
                    button.setAttribute('data-feedback-index', i);
                });
            }
        });

        // Comment image upload handlers
        document.addEventListener('click', function(e) {
            if (e.target.closest('.comment-upload-btn')) {
                const btn = e.target.closest('.comment-upload-btn');
                const uploadArea = btn.closest('.comment-upload-area');
                const commentIndex = uploadArea.getAttribute('data-comment-index');
                const fileInput = uploadArea.querySelector('.comment-file-upload');
                fileInput.click();
            }
        });

        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('comment-file-upload')) {
                const fileInput = e.target;
                const commentIndex = fileInput.closest('.comment-upload-area').getAttribute('data-comment-index');
                const files = fileInput.files;
                handleCommentFiles(files, commentIndex);
            }
        });

        function handleCommentFiles(files, commentIndex) {
            if (!commentFiles[commentIndex]) {
                commentFiles[commentIndex] = [];
            }

            const previewContainer = document.querySelector(
                `.comment-images-preview[data-comment-index="${commentIndex}"]`);

            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const index = commentFiles[commentIndex].push(file) - 1;
                        const imageDiv = document.createElement('div');
                        imageDiv.className = 'image-preview';
                        imageDiv.innerHTML = `
                            <img src="${e.target.result}" alt="Comment Image Preview">
                            <button type="button" class="delete-btn" data-comment-index="${commentIndex}" data-image-index="${index}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        previewContainer.appendChild(imageDiv);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Delete comment image preview
        document.addEventListener('click', function(e) {
            if (e.target.closest('.delete-btn[data-comment-index]')) {
                const btn = e.target.closest('.delete-btn');
                const commentIndex = btn.getAttribute('data-comment-index');
                const imageIndex = parseInt(btn.getAttribute('data-image-index'));

                if (commentFiles[commentIndex]) {
                    commentFiles[commentIndex].splice(imageIndex, 1);
                }

                btn.parentElement.remove();

                // Cập nhật lại index cho các button còn lại
                const previewContainer = document.querySelector(
                    `.comment-images-preview[data-comment-index="${commentIndex}"]`);
                const buttons = previewContainer.querySelectorAll('.delete-btn');
                buttons.forEach((button, i) => {
                    button.setAttribute('data-image-index', i);
                });
            }
        });

        // Add new option
        document.getElementById('add-option').addEventListener('click', function() {
            const optionsContainer = document.getElementById('product-options');
            const newOption = document.createElement('div');
            newOption.className = 'characteristics-item';
            newOption.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-11">
                        <div class="form-floating">
                            <input type="text" class="form-control" name="options[${optionIndex}][name]"
                                placeholder="Tên tùy chọn" required>
                            <label class="required-field">Tên tùy chọn (VD: Màu sắc, Kích thước)</label>
                        </div>
                    </div>
                    <div class="col-md-1 text-end">
                        <button type="button" class="btn-remove remove-option">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            optionsContainer.appendChild(newOption);
            optionIndex++;
        });

        // Remove option
        document.addEventListener('click', function(e) {
            if (e.target.closest('.remove-option')) {
                const optionsContainer = document.getElementById('product-options');
                if (optionsContainer.children.length > 1) {
                    e.target.closest('.characteristics-item').remove();
                } else {
                    alert('Phải có ít nhất một tùy chọn!');
                }
            }
        });

        // Add new comment
        document.getElementById('add-comment').addEventListener('click', function() {
            const commentsContainer = document.getElementById('customer-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment-item';
            newComment.innerHTML = `
                <div class="row g-3">
                    <div class="col-md-2">
                        <div class="avatar-upload">
                            <div class="avatar-preview">
                                <div id="avatar-${commentIndex}" class="avatar-display">
                                    <i class="fas fa-user-circle fa-3x text-muted"></i>
                                </div>
                            </div>
                            <div class="avatar-edit">
                                <input type="file" id="avatar-upload-${commentIndex}" name="comments[${commentIndex}][avatar]" accept="image/*" />
                                <label for="avatar-upload-${commentIndex}" class="btn-avatar-upload">
                                    <i class="fas fa-camera"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control" name="comments[${commentIndex}][name]"
                                        placeholder="Tên khách hàng" required>
                                    <label class="required-field">Tên khách hàng</label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-floating">
                                    <input type="text" class="form-control" name="comments[${commentIndex}][option]"
                                        placeholder="Tùy chọn đã mua">
                                    <label>Tùy chọn đã mua</label>
                                </div>
                            </div>
                            <div class="col-md-4 d-flex align-items-end">
                                <button type="button" class="btn-remove remove-comment">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            <div class="col-12">
                                <div class="form-floating">
                                    <textarea class="form-control" name="comments[${commentIndex}][content]"
                                        placeholder="Nội dung đánh giá" style="height: 80px;" required></textarea>
                                    <label class="required-field">Nội dung đánh giá</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="comment-images-upload">
                                    <label class="form-label">Ảnh đánh giá</label>
                                    <div class="comment-upload-area" data-comment-index="${commentIndex}">
                                        <i class="fas fa-images fa-2x text-muted mb-2"></i>
                                        <p class="text-muted mb-2">Thêm ảnh đánh giá</p>
                                        <input type="file" class="comment-file-upload" name="comments[${commentIndex}][images][]"
                                            accept="image/*" multiple style="display: none;">
                                        <button type="button" class="btn btn-outline-primary btn-sm comment-upload-btn">
                                            <i class="fas fa-plus me-1"></i>Chọn ảnh
                                        </button>
                                    </div>
                                    <div class="comment-images-preview d-flex flex-wrap mt-2" data-comment-index="${commentIndex}">
                                        <!-- Comment images preview will be inserted here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            commentsContainer.appendChild(newComment);
            commentIndex++;
        });

        // Remove comment
        document.addEventListener('click', function(e) {
            if (e.target.closest('.remove-comment')) {
                const commentsContainer = document.getElementById('customer-comments');
                if (commentsContainer.children.length > 1) {
                    e.target.closest('.comment-item').remove();
                } else {
                    alert('Phải có ít nhất một đánh giá!');
                }
            }
        });

        // Avatar upload preview
        document.addEventListener('change', function(e) {
            if (e.target.id && e.target.id.startsWith('avatar-upload-')) {
                const fileInput = e.target;
                const avatarId = fileInput.id.replace('avatar-upload-', '');
                const avatarDisplay = document.getElementById(`avatar-${avatarId}`);

                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        avatarDisplay.innerHTML = `<img src="${e.target.result}" alt="Avatar Preview">`;
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
            }
        });

        // Number formatting
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('number-format')) {
                let value = e.target.value.replace(/[^\d]/g, '');
                if (value) {
                    value = parseInt(value).toLocaleString('vi-VN');
                }
                e.target.value = value;
            }
        });

        // Form submission
        document.getElementById('product-form').addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading
            const submitBtn = document.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang cập nhật...';
            submitBtn.disabled = true;

            // Prepare form data
            const formData = new FormData();

            // Add method override for Laravel
            formData.append('_method', 'PUT');

            // Add basic form data
            const formElements = this.querySelectorAll('input, select, textarea');
            formElements.forEach(element => {
                if (element.type !== 'file' && element.name) {
                    if (element.classList.contains('number-format')) {
                        // Remove formatting from number fields
                        const value = element.value.replace(/[^\d]/g, '');
                        formData.append(element.name, value);
                    } else {
                        formData.append(element.name, element.value);
                    }
                }
            });

            // Add CKEditor content
            if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances.productDescription) {
                formData.append('description', CKEDITOR.instances.productDescription.getData());
            }

            // Add new images
            if (typeof uploadedFiles !== 'undefined') {
                uploadedFiles.forEach((file, index) => {
                    formData.append(`images[${index}]`, file);
                });
            }

            // Add new feedback images
            if (typeof feedbackFiles !== 'undefined') {
                feedbackFiles.forEach((file, index) => {
                    formData.append(`feedbacks[${index}]`, file);
                });
            }

            // Add comment images
            if (typeof commentFiles !== 'undefined') {
                Object.keys(commentFiles).forEach(commentIndex => {
                    if (commentFiles[commentIndex] && commentFiles[commentIndex].length > 0) {
                        commentFiles[commentIndex].forEach((file, imageIndex) => {
                            formData.append(`comments[${commentIndex}][images][${imageIndex}]`,
                                file);
                        });
                    }
                });
            }

            document.querySelectorAll('[id^="avatar-upload-"]').forEach(input => {
                if (input.files && input.files[0]) {
                    const commentIndex = input.id.replace('avatar-upload-', '');
                    formData.append(`comments[${commentIndex}][avatar]`, input.files[0]);
                }
            });

            // Add deleted items
            if (typeof deletedImages !== 'undefined') {
                formData.append('deleted_images', JSON.stringify(deletedImages));
            }
            if (typeof deletedFeedbacks !== 'undefined') {
                formData.append('deleted_feedbacks', JSON.stringify(deletedFeedbacks));
            }
            if (typeof deletedCommentImages !== 'undefined') {
                formData.append('deleted_comment_images', JSON.stringify(deletedCommentImages));
            }

            // Submit form
            const productId = {{ $product->id }};
            fetch(`{{ route('products.update', ':id') }}`.replace(':id', productId), {
                    method: 'POST', // Changed from PUT
                    body: formData,
                    headers: {
                        'Accept': 'application/json', // Fixed typo
                        // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute(
                        //     'content')
                    }
                })
                .then(response => {
                    // Check if response is ok
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Server response:', data);
                    if (data.success) {
                        toastr.success(data.message);
                        window.location.href = '{{ route('products.index') }}';
                    } else {
                        toastr.success(data.message || 'Có lỗi xảy ra khi cập nhật sản phẩm!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    toastr.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });

        // Initialize number formatting for existing values
        document.addEventListener('DOMContentLoaded', function() {
            const numberInputs = document.querySelectorAll('.number-format');
            numberInputs.forEach(input => {
                if (input.value && !isNaN(input.value.replace(/[^\d]/g, ''))) {
                    const value = parseInt(input.value.replace(/[^\d]/g, ''));
                    input.value = value.toLocaleString('vi-VN');
                }
            });
        });
    </script>
@endsection
