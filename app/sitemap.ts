import { MetadataRoute } from 'next';
import { TREATMENTS, DOCTORS } from '@/lib/clinic-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://manavdentalcare.com';

  const staticRoutes = [
    '',
    '/about',
    '/treatments',
    '/doctors',
    '/patient-stories',
    '/results',
    '/gallery',
    '/faqs',
    '/contact',
    '/book-appointment',
    '/privacy-policy',
    '/medical-disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const treatmentRoutes = TREATMENTS.map((t) => ({
    url: `${baseUrl}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const doctorRoutes = DOCTORS.map((d) => ({
    url: `${baseUrl}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...doctorRoutes];
}
