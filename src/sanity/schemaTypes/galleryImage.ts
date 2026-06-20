import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: '🖼️ Gallery',
  type: 'document',
  icon: () => '🖼️',
  groups: [
    {
      name: 'content',
      title: 'Photo Details',
      default: true,
    },
    {
      name: 'display',
      title: 'Display Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: '📝 Photo Title',
      type: 'string',
      description: 'Give this photo a descriptive name (Example: Store Front View, Kids Ethnic Section)',
      group: 'content',
      validation: (Rule) => Rule.required().error('Photo title is required'),
    }),
    defineField({
      name: 'image',
      title: '📷 Upload Photo',
      type: 'image',
      description: 'Upload a high-quality photo of your store or products',
      options: {
        hotspot: true,
      },
      group: 'content',
      validation: (Rule) => Rule.required().error('Photo is required'),
      fields: [
        {
          name: 'alt',
          title: 'Image Description',
          type: 'string',
          description: 'Describe what is in the photo (helps with accessibility and SEO)',
        },
      ],
    }),
    defineField({
      name: 'section',
      title: '📂 Photo Category',
      type: 'string',
      description: 'What type of photo is this?',
      options: {
        list: [
          { title: '🏪 Store Interior (inside the shop)', value: 'store_interior' },
          { title: '🏬 Store Exterior (shop front/outside)', value: 'store_exterior' },
          { title: '👕 Product Display (clothes on display)', value: 'product_display' },
          { title: '🎉 Events (special occasions/festivals)', value: 'events' },
          { title: '📦 Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'store_interior',
      group: 'display',
    }),
    defineField({
      name: 'displayOrder',
      title: '🔢 Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the gallery (Example: 1, 2, 3, etc.)',
      initialValue: 0,
      group: 'display',
    }),
    defineField({
      name: 'active',
      title: '✅ Show in Gallery',
      type: 'boolean',
      description: 'Turn off to hide this photo from the website gallery without deleting it',
      initialValue: true,
      group: 'display',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      section: 'section',
      active: 'active',
    },
    prepare({ title, media, section, active }) {
      const sectionLabels: Record<string, string> = {
        store_interior: '🏪 Interior',
        store_exterior: '🏬 Exterior',
        product_display: '👕 Products',
        events: '🎉 Events',
        other: '📦 Other',
      }
      return {
        title: title || 'Untitled Photo',
        subtitle: `${sectionLabels[section] || section} ${active ? '✅' : '❌ Hidden'}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Section',
      name: 'section',
      by: [{ field: 'section', direction: 'asc' }],
    },
  ],
})
