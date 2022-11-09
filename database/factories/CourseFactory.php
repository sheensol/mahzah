<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence(2);
        return [
            "title" => $title,
            "slug" => Str::slug($title),
            "description_max" => $this->faker->text(1000),
            "description_min" => $this->faker->text(200),
            "language" => "English",
            // "img" => "courses/images/default-product-card.png",
            "instructor_id" => rand(2, 10),
            "creator_id" => 1,
        ];
    }
}
