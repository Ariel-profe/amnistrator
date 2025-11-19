"use client"

import React from 'react'

import { FeaturesSection } from '@/components/homepage/features-section'
import { FAQs } from '@/components/homepage/faqs'
import { AboutHeroSection } from '@/components/homepage/about-hero-section'

export default function About() {
    return (
        <main className="container mx-auto px-3">
            <AboutHeroSection />
            <FeaturesSection />
            <FAQs />
        </main>
    )
}
