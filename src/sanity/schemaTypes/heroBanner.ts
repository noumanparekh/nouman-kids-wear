import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main hero headline (e.g., "Dressed for every little occasion")',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the headline',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image (Desktop)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Hero background for desktop screens',
    }),
    defineField({
      name: 'mobileBackgroundImage',
      title: 'Background Image (Mobile)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional separate background for mobile screens',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      description: 'Primary button text (e.g., "Enquire on WhatsApp")',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
      description: 'Link or anchor (e.g., "#catalogue", "https://wa.me/...")',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      description: 'Secondary button text (e.g., "Browse catalogue")',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
      description: 'Link or anchor for secondary button',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only one hero banner should be active at a time',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'backgroundImage',
      active: 'active',
    },
    prepare({ title, media, active }) {
      return {
        title: title || 'Hero Banner',
        subtitle: active ? 'Active' : 'Inactive',
        media: media,
      }
    },
  },
})
