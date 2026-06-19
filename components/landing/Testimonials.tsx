"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kwame Osei",
    role: "Master Tailor",
    shop: "Osei Bespoke",
    image: "/testimonials/testimonial-1.png",
    quote: "Sew Digital has completely transformed how I run my workshop. I no longer lose client measurements, and my invoicing looks incredibly professional.",
    rating: 5,
  },
  {
    name: "Anya Sharma",
    role: "Fashion Designer",
    shop: "Anya Haute",
    image: "/testimonials/testimonial-2.png",
    quote: "The ability to visually organize orders and share digital templates has saved me countless hours. It's an absolute game-changer for my studio.",
    rating: 5,
  },
  {
    name: "Elena Rossi",
    role: "Senior Dressmaker",
    shop: "Rossi Elegance",
    image: "/testimonials/testimonial-3.png",
    quote: "I've been sewing for 40 years, and I was hesitant to go digital. But the simplicity of this platform won me over instantly. It just works.",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-28 md:py-48 px-6 bg-black relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-24 text-center">
          <h2
            className="text-xs font-bold tracking-cinematic uppercase text-white/40 mb-4"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Community
          </h2>
          <h3
            className="text-4xl md:text-7xl font-bold tracking-tighter mx-auto max-w-4xl leading-none uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            SUCCESS <span className="text-stone-500">STORIES.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
            >
              <div className="bg-black/60 backdrop-blur-xl h-full rounded-[23px] p-8 md:p-10 border border-white/5 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
                <div>
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed tracking-tight mb-10 text-stone-300">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-5 pt-8 border-t border-white/10 mt-auto">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-tight text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-stone-500 text-sm font-medium">
                      {testimonial.role} <span className="text-white/30 px-1">•</span> {testimonial.shop}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
