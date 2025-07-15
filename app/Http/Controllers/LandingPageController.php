<?php

namespace App\Http\Controllers;

use App\Service\ProductService;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{

    public function __construct(protected ProductService $product_service) {}


    public function productDetail(Request $request, $slug)
    {
        $product = $this->product_service->getProductBySlug($slug);

        if (!$product) {
            abort(404);
        }

        return view("landing.{$product->layout}", compact('product'));
    }
}
