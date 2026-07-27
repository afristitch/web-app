import React from 'react';
import { notFound } from 'next/navigation';
import { Organization } from '@/lib/types';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';

async function getTailor(id: string): Promise<Organization | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  try {
    const res = await fetch(`${baseUrl}/explore/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch tailor:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const tailor = await getTailor(params.slug);
 
  if (!tailor) {
    return {
      title: 'Portfolio Not Found | SewDigital',
    }
  }

  const businessName = tailor.name || 'Tailor';
  const description = tailor.bio || `Check out ${businessName}'s portfolio of work on SewDigital!`;
  const ogImage = tailor.portfolio?.[0]?.imageUrl || tailor.logoUrl || 'https://sewdigital.app/images/og-image.jpg';

  return {
    title: `${businessName} | Portfolio`,
    description: description,
    openGraph: {
      title: `${businessName} | Portfolio`,
      description: description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${businessName} Portfolio`,
        },
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${businessName} | Portfolio`,
      description: description,
      images: [ogImage],
    },
  }
}

export default async function TailorProfilePage({ params }: { params: { slug: string } }) {
  const tailor = await getTailor(params.slug);

  if (!tailor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header / Hero Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center text-center">
          {tailor.logoUrl ? (
            <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden border-2 border-gray-100">
              <Image src={tailor.logoUrl} alt={tailor.name} layout="fill" objectFit="cover" />
            </div>
          ) : (
            <div className="w-24 h-24 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
              {tailor.name.charAt(0)}
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tailor.name}</h1>
          <p className="text-gray-500 max-w-xl mx-auto">{tailor.bio || 'Premium Tailoring Services'}</p>
          
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {tailor.specialties?.map(s => (
              <span key={s} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                {s}
              </span>
            ))}
          </div>
          
          <div className="mt-8 flex gap-4">
            <a 
              href={`mailto:${tailor.email}`}
              className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition font-medium"
            >
              Contact Me
            </a>
            <a 
              href={`tel:${tailor.phone}`}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium"
            >
              Call
            </a>
          </div>
        </div>
      </header>

      {/* Portfolio Section */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">My Work</h2>
        
        {(!tailor.portfolio || tailor.portfolio.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No portfolio items available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tailor.portfolio.map((item, idx) => (
              <div key={item._id || idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 group">
                <div className="relative h-64 w-full bg-gray-100">
                  <Image src={item.imageUrl} alt={item.title} layout="fill" objectFit="cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
