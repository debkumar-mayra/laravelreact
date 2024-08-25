<?php
namespace App\Traits;
use Intervention\Image\ImageManagerStatic as Image;

trait NameImage{
        public static function generateNameImage($name)
        {
            $initials = collect(explode(' ', $name))->map(function($part) {
                return strtoupper(substr($part, 0, 1));
            })->implode('');
        
            // Create an image canvas
            $img = Image::canvas(50, 50, '#f8f9fa'); // Set the size and background color
        
            // Write the initials on the image
            $img->text($initials, 25, 25, function($font) {
                $font->file(5); // Use internal font, between 1 and 5
                $font->size(50); // Size of the internal font, not very customizable
                $font->color('#333333');
                $font->align('center');
                $font->valign('middle');
            });
        
            // Save the image or output it directly
            $img->save(public_path('images/name_image.png')); // Save to a file
        
            // Or return the image as a response
            return $img->response('png');
        }
}