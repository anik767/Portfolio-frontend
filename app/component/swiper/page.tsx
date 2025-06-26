'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import only the required Swiper styles
import 'swiper/css';

export default function SwiperSlider() {
  const slides = [
    {
      img: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/slide-1.jpg',
      title: 'Winds of Change',
      price: '$175',
      author: 'Andrew Kelman',
      authorImg: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/author-1.jpg',
      text: 'Gentle pink and blue hues remind us of moments when everything changes for the better.',
    },
    {
      img: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/slide-2.jpg',
      title: 'Flames of Passion',
      price: '$270',
      author: 'Alex Bilyk',
      authorImg: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/author-2.jpg',
      text: 'This piece represents the fire of inspiration burning within us all.',
    },
    {
      img: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/slide-3.jpg',
      title: 'Oceans of Serenity',
      price: '$225',
      author: 'Inna Grande',
      authorImg: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/author-3.jpg',
      text: 'Immerse yourself in the depths of calm and harmony.',
    },
    {
      img: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/slide-3.jpg',
      title: 'Oceans of Serenity',
      price: '$225',
      author: 'Inna Grande',
      authorImg: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/author-3.jpg',
      text: 'Immerse yourself in the depths of calm and harmony.',
    },
    {
      img: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/slide-3.jpg',
      title: 'Oceans of Serenity',
      price: '$225',
      author: 'Inna Grande',
      authorImg: 'https://bato-web-agency.github.io/bato-shared/img/slider-1/author-3.jpg',
      text: 'Immerse yourself in the depths of calm and harmony.',
    },
    // Duplicates or more slides if needed
  ];

  return (
    <section className="max-w-[1560px] mx-auto px-4">
      <Swiper slidesPerView={3} spaceBetween={30} className="mySwiper">
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            style={{ display: 'block' }}
          >
            <img src={slide.img} alt={slide.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{slide.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{slide.text}</p>
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-bold">{slide.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={slide.authorImg}
                    alt={slide.author}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{slide.author}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
