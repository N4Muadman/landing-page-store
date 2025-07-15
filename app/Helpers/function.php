<?php 

if (!function_exists('formatNumberShort')) {
    function formatNumberShort($number) {
        if ($number >= 10000000) {
            return rtrim(rtrim(number_format($number / 1000000, 1), '0'), '.') . 'M';
        } elseif ($number >= 10000) {
            return rtrim(rtrim(number_format($number / 1000, 1), '0'), '.') . 'k';
        } else {
            return number_format($number, 0, '', '.');
        }
    }
}