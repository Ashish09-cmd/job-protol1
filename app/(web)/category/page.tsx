import CategoryJobs from '@/components/clients-page/category/CategoryJobs';
import { MOCK_JOBS } from '@/lib/constants/mock-jobs';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Browse Jobs & Internships by Category",
  description:
    "Filter verified jobs and internships by level, employment type, education and industry, and apply directly on the platform.",
};
 

export default function CategoryPage() {
  return (
    <>
      <section className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-8 flex flex-col gap-8.5 text-center">
          <div className="flex flex-col max-w-4xl mx-auto gap-4">
            <h3 className="font-bold text-lg-2xl line-height-2xl font-manrope">
              Find the Job that{" "}
              <span className="text-primary-blue">Perfectly Fits You</span>
            </h3>
            <p className="text-sm font-regular font-inter text-text-secondary-color line-height-sm">
              Join our expert-led training sessions designed to advance your
              skills and accelerate your career growth. Browse through our
              carefully curated schedule and reserve your spot today.
            </p>
          </div>
        </div>
      </section>
      <CategoryJobs jobs={MOCK_JOBS} />;
    </>
  );
}
