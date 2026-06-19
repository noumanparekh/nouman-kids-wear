import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'storeInfo',
  title: 'Store Information',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Nouman Kids Wear',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short brand tagline (e.g., "Readymade kidswear for every little occasion")',
    }),
    defineField({
      name: 'description',
      title: 'Store Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of the store for SEO and about section',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'line1',
          title: 'Address Line 1',
          type: 'string',
          description: 'Street address',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
        },
        {
          name: 'pincode',
          title: 'Pin Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'India',
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Display format (e.g., "+91 84989 86699")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link',
      type: 'string',
      description: 'For tel: link (e.g., "+918498986699")',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Digits only with country code (e.g., "918498986699")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'hours',
      title: 'Store Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Days',
              type: 'string',
              description: 'e.g., "Monday – Saturday"',
            },
            {
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'e.g., "10:00 AM – 9:30 PM"',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Full iframe src URL from Google Maps embed code',
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'justdial',
          title: 'Justdial URL',
          type: 'url',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'brandName',
      subtitle: 'address.city',
    },
  },
})
