import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'storeInfo',
  title: 'Store Information',
  type: 'document',
  fieldsets: [
    {
      name: 'contact',
      title: '📞 Contact Information',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'address',
      title: '📍 Store Address',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'hours',
      title: '🕒 Store Timings',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'social',
      title: '📱 Social Media',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Store Name',
      type: 'string',
      description: 'Your store name as it appears on the website',
      validation: (Rule) => Rule.required(),
      initialValue: 'Nouman Kids Wear',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short tagline or slogan (e.g., "Readymade kidswear for every little occasion")',
    }),
    defineField({
      name: 'description',
      title: 'Store Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of your store',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Store phone number for display (e.g., "+91 84989 86699")',
      fieldset: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link',
      type: 'string',
      description: 'Phone number for calling link (e.g., "+918498986699")',
      fieldset: 'contact',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'WhatsApp number with country code, digits only (e.g., "918498986699")',
      fieldset: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Store email address (optional)',
      fieldset: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Store Address',
      type: 'object',
      fieldset: 'address',
      fields: [
        {
          name: 'line1',
          title: 'Street Address',
          type: 'string',
          description: 'Street address, building name/number',
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
          title: 'PIN Code',
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
      name: 'mapEmbedUrl',
      title: 'Google Maps Link',
      type: 'url',
      description: 'Optional: Google Maps embed URL for your store location',
      fieldset: 'address',
    }),
    defineField({
      name: 'hours',
      title: 'Store Timings',
      type: 'array',
      fieldset: 'hours',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'days',
              title: 'Days',
              type: 'string',
              description: 'Example: "Monday – Saturday" or "Sunday"',
            },
            {
              name: 'time',
              title: 'Time',
              type: 'string',
              description: 'Example: "10:00 AM – 9:00 PM"',
            },
          ],
          preview: {
            select: {
              days: 'days',
              time: 'time',
            },
            prepare({ days, time }) {
              return {
                title: days,
                subtitle: time,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Media Links',
      type: 'object',
      fieldset: 'social',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          description: 'Your Instagram page URL (e.g., https://instagram.com/yourstore)',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          description: 'Your Facebook page URL (e.g., https://facebook.com/yourstore)',
        },
        {
          name: 'justdial',
          title: 'Justdial URL',
          type: 'url',
          description: 'Your Justdial listing URL (optional)',
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
