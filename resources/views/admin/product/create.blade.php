@extends('admin.layout')

@section('content')
    <div class="page-header">
        <div class="page-block">
            <div class="row align-items-center">
                <div class="col-md-12">
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="{{ route('dashboard') }}">Thống kê</a>
                        </li>
                        <li class="breadcrumb-item"><a href="{{ url()->previous() }}">Quản lý sản phẩm</a>
                        </li>
                        <li class="breadcrumb-item" aria-current="page">Thêm sản phẩm</li>
                    </ul>
                </div>
                <div class="col-md-12">
                    <div class="page-header-title">
                        <h2 class="mb-2">Thêm sản phẩm mới</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <form id="product-form" enctype="multipart/form-data">
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
                                placeholder="Tiêu đề sản phẩm" required>
                            <label for="productTitle" class="required-field">Tiêu đề sản phẩm</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="productName" name="name"
                                placeholder="Tên sản phẩm" required>
                            <label for="productName" class="required-field">Tên sản phẩm</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="productSlug" name="slug"
                                placeholder="Đường dẫn (slug)" readonly>
                            <label for="productSlug">Đường dẫn (slug)</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <select class="form-select" id="productLayout" name="layout" required>
                                <option value="">Chọn bố cục</option>
                                <option value="tiktok">Bố cục Tiktok</option>
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
                                placeholder="Giá bán" required>
                            <label for="productPrice" class="required-field">Giá bán (VNĐ)</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="productDiscount" name="discount"
                                placeholder="Giảm giá" required>
                            <label for="productDiscount" class="required-field">Giảm giá (VNĐ)</label>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="productSold" name="sold"
                                placeholder="Đã bán" required>
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
                <div class="upload-area" id="upload-area">
                    <i class="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                    <h5>Kéo thả ảnh vào đây hoặc click để chọn</h5>
                    <p class="text-muted">Hỗ trợ nhiều ảnh, định dạng: JPG, PNG, GIF</p>
                    <input type="file" id="file-upload" name="images[]" accept="image/*" multiple style="display: none;">
                    <button type="button" class="custom-file-upload">
                        <i class="fas fa-plus me-2"></i>Chọn ảnh
                    </button>
                </div>
                <div class="d-flex flex-wrap mt-3" id="image-preview-container">
                    <!-- Preview images will be inserted here -->
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
                </div>
                <div class="mt-3">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="optionName" name="name_option"
                            placeholder="Tên nhóm tùy chọn">
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
                </div>
            </div>

            <!-- Feedback Images -->
            <div class="section-card">
                <div class="section-title">
                    <i class="fas fa-camera"></i>
                    Ảnh feedback khách hàng
                </div>
                <div class="upload-area" id="feedback-upload-area">
                    <i class="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                    <h5>Kéo thả ảnh feedback vào đây hoặc click để chọn</h5>
                    <p class="text-muted">Hỗ trợ nhiều ảnh, định dạng: JPG, PNG, GIF</p>
                    <input type="file" id="feedback-file-upload" name="feedbacks[]" accept="image/*" multiple
                        style="display: none;">
                    <button type="button" class="custom-file-upload" id="feedback-upload-btn">
                        <i class="fas fa-plus me-2"></i>Chọn ảnh feedback
                    </button>
                </div>
                <div class="d-flex flex-wrap mt-3" id="feedback-preview-container">
                    <!-- Feedback images preview will be inserted here -->
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
                                placeholder="Mô tả chi tiết sản phẩm"></textarea>
                            {{-- <label for="productDescription">Mô tả chi tiết sản phẩm</label> --}}
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
                                placeholder="Facebook Pixel ID">
                            <label for="pixelFb">Facebook Pixel ID</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control number-format" id="countReviews"
                                name="count_reviews" placeholder="Số lượng đánh giá" required>
                            <label for="countReviews" class="required-field">Số lượng đánh giá</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating">
                            <select class="form-select" id="productStar" name="star" required>
                                <option value="5">5 sao</option>
                                <option value="4">4 sao</option>
                                <option value="3">3 sao</option>
                                <option value="2">2 sao</option>
                                <option value="1">1 sao</option>
                            </select>
                            <label for="productStar" class="required-field">Đánh giá sao</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit Buttons -->
            <div class="section-card">
                <div class="d-flex justify-content-end gap-3">
                    <button type="button" class="btn-cancel">
                        <i class="fas fa-times me-2"></i>Hủy bỏ
                    </button>
                    <button type="submit" class="btn-submit">
                        <i class="fas fa-save me-2"></i>Lưu sản phẩm
                    </button>
                </div>
            </div>
        </form>
    </div>

    <script src="/adminAssets/ckeditor/ckeditor.js"></script>
    <script>
        let optionIndex = 1;
        let commentIndex = 1;
        let uploadedFiles = [];
        let feedbackFiles = [];
        let commentFiles = {};

        CKEDITOR.replace('productDescription', {
            extraPlugins: 'uploadimage,image2',
            removePlugins: 'image',
            filebrowserUploadUrl: '/upload-image',
            filebrowserUploadMethod: 'form'
        });

        // Generate slug from title
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

        // Product Images Upload
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
            }
        });

        // Feedback Images Upload
        const feedbackFileUpload = document.getElementById('feedback-file-upload');
        const feedbackUploadArea = document.getElementById('feedback-upload-area');
        const feedbackPreviewContainer = document.getElementById('feedback-preview-container');

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

        feedbackUploadArea.addEventListener('click', function() {
            feedbackFileUpload.click();
        });

        feedbackFileUpload.addEventListener('change', function() {
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
                            <button type="button" class="delete-btn" data-index="${index}">
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
                const index = parseInt(btn.getAttribute('data-index'));
                feedbackFiles.splice(index, 1);
                btn.parentElement.remove();
            }
        });

        // Product Options
        document.getElementById('add-option').addEventListener('click', function() {
            const container = document.getElementById('product-options');
            const newOption = document.createElement('div');
            newOption.className = 'characteristics-item';
            newOption.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-11">
                        <div class="form-floating">
                            <input type="text" class="form-control" name="options[${optionIndex}][name]" placeholder="Tên tùy chọn" required>
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
            container.appendChild(newOption);
            optionIndex++;
        });

        document.getElementById('product-options').addEventListener('click', function(e) {
            if (e.target.closest('.remove-option')) {
                e.target.closest('.characteristics-item').remove();
            }
        });

        // Customer Comments
        document.getElementById('add-comment').addEventListener('click', function() {
            const container = document.getElementById('customer-comments');
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
            container.appendChild(newComment);
            commentIndex++;
        });

        // Handle comment removal
        document.getElementById('customer-comments').addEventListener('click', function(e) {
            if (e.target.closest('.remove-comment')) {
                const commentItem = e.target.closest('.comment-item');
                const commentIdx = commentItem.querySelector('[data-comment-index]').getAttribute(
                    'data-comment-index');
                delete commentFiles[commentIdx];
                commentItem.remove();
            }
        });

        // Handle avatar upload
        document.addEventListener('change', function(e) {
            if (e.target.matches('[id^="avatar-upload-"]')) {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    const avatarId = e.target.id.replace('avatar-upload-', 'avatar-');
                    reader.onload = function(event) {
                        const avatarDisplay = document.getElementById(avatarId);
                        avatarDisplay.innerHTML = `<img src="${event.target.result}" alt="Avatar">`;
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        // Handle comment images upload
        document.addEventListener('click', function(e) {
            if (e.target.closest('.comment-upload-area')) {
                const uploadArea = e.target.closest('.comment-upload-area');
                const fileInput = uploadArea.querySelector('.comment-file-upload');
                fileInput.click();
            }
        });

        document.addEventListener('change', function(e) {
            if (e.target.matches('.comment-file-upload')) {
                const files = e.target.files;
                const commentIndex = e.target.closest('[data-comment-index]').getAttribute('data-comment-index');
                const previewContainer = document.querySelector(
                    `.comment-images-preview[data-comment-index="${commentIndex}"]`);

                if (!commentFiles[commentIndex]) {
                    commentFiles[commentIndex] = [];
                }

                Array.from(files).forEach(file => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const fileIndex = commentFiles[commentIndex].push(file) - 1;
                            const imageDiv = document.createElement('div');
                            imageDiv.className = 'image-preview';
                            imageDiv.innerHTML = `
                                <img src="${event.target.result}" alt="Comment Image">
                                <button type="button" class="delete-btn" data-comment-index="${commentIndex}" data-file-index="${fileIndex}">
                                    <i class="fas fa-times"></i>
                                </button>
                            `;
                            previewContainer.appendChild(imageDiv);
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }
        });

        // Handle comment image deletion
        document.addEventListener('click', function(e) {
            if (e.target.closest('.comment-images-preview .delete-btn')) {
                const btn = e.target.closest('.delete-btn');
                const commentIdx = btn.getAttribute('data-comment-index');
                const fileIdx = parseInt(btn.getAttribute('data-file-index'));

                if (commentFiles[commentIdx]) {
                    commentFiles[commentIdx].splice(fileIdx, 1);
                }
                btn.parentElement.remove();
            }
        });

        // Form submission
        document.getElementById('product-form').addEventListener('submit', async function(e) {
            e.preventDefault();

            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }

            const formData = new FormData(this);

            // // Add product images
            // uploadedFiles.forEach((file, index) => {
            //     formData.append(`images[${index}]`, file);
            // });

            // // Add feedback images
            // feedbackFiles.forEach((file, index) => {
            //     formData.append(`feedbacks[${index}]`, file);
            // });

            // // Add comment images
            // Object.keys(commentFiles).forEach(commentIdx => {
            //     if (commentFiles[commentIdx]) {
            //         commentFiles[commentIdx].forEach((file, fileIdx) => {
            //             formData.append(`comments[${commentIdx}][images][${fileIdx}]`, file);
            //         });
            //     }
            // });

            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang lưu...';
            submitBtn.disabled = true;

            [...formData.entries()].forEach(([key, value]) => {
                console.log(key, value);
            });

            try {
                const response = await fetch('{{route('products.store')}}', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{csrf_token()}}'
                    }
                });
            } catch (error) {
                
            }
            

            // Simulate API call
            // setTimeout(() => {
            //     alert('Sản phẩm đã được thêm thành công!');
            //     submitBtn.innerHTML = originalText;
            //     submitBtn.disabled = false;

            //     // Reset form
            //     this.reset();
            //     previewContainer.innerHTML = '';
            //     feedbackPreviewContainer.innerHTML = '';
            //     uploadedFiles = [];
            //     feedbackFiles = [];
            //     commentFiles = {};

            //     // Reset avatar displays
            //     document.querySelectorAll('.avatar-display').forEach(avatar => {
            //         avatar.innerHTML = '<i class="fas fa-user-circle fa-3x text-muted"></i>';
            //     });

            //     // Reset comment image previews
            //     document.querySelectorAll('.comment-images-preview').forEach(preview => {
            //         preview.innerHTML = '';
            //     });

            //     // Redirect to product list
            //     // window.location.href = '/admin/products';
            // }, 2000);
        });

        // Cancel button
        document.querySelector('.btn-cancel').addEventListener('click', function() {
            if (confirm('Bạn có chắc muốn hủy? Tất cả dữ liệu đã nhập sẽ bị mất.')) {
                // window.location.href = '/admin/products';
                window.history.back();
            }
        });

        // Number formatting
        document.querySelectorAll('.number-format').forEach(input => {
            input.addEventListener('input', function() {
                let value = this.value.replace(/[^\d]/g, '');
                if (value) {
                    value = parseInt(value).toLocaleString('vi-VN');
                    this.value = value;
                }
            });
        });

        function displayValidationErrors(errors) {
            // $('.error-text').remove();
            // $('.is-invalid').removeClass('is-invalid');

            for (let field in errors) {
                const messages = errors[field];
                const inputName = field.replace(/\./g, '\\.');

                const input = $(`[name="${inputName}"]`);
                if (input.length) {
                    input.addClass('is-invalid');
                    input.after(`<div class="error-text text-danger">${messages[0]}</div>`);
                } else {
                    console.warn('Không tìm thấy input:', field);
                }
            }
        }
    </script>
@endsection
