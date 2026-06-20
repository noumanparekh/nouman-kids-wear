import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featuredCollection',
  title: '⭐ Featured Collections',
  type: 'document',
  icon: () => '⭐',
  groups: [
    {
      name: 'content',
      title: 'Collection Details',
      default: true,
    },
    {
      name: 'display',
      title: 'Display Settings',
    },
    {
      name: 'advanced',
      title: 'Advanced',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: '📝 Collection Name',
      type: 'string',
      description: 'Example: Festival Special, Wedding Collection, Summer Casuals',
      group: 'content',
      validation: (Rule) => Rule.required().error('Collection name is required'),
    }),
    defineField({
      name: 'description',
      title: '💬 Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of this collection (1-2 lines)',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: '🖼️ Collection Image',
      type: 'image',
      description: 'Upload a representative image for this collection',
      options: {
        hotspot: true,
      },
      group: 'content',
      validation: (Rule) => Rule.required().error('Collection image is required'),
      fields: [
        {
          name: 'alt',
          title: 'Image Description',
          type: 'string',
          description: 'Describe what is in the image (for accessibility)',
        },
      ],
    }),
    defineField({
      name: 'accent',
      title: '🎨 UI Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blush (Pink)', value: 'blush' },
          { title: 'Mint (Green)', value: 'mint' },
          { title: 'Sky (Blue)', value: 'sky' },
          { title: 'Peach (Orange)', value: 'peach' },
          { title: 'Lilac (Purple)', value: 'lilac' },
        ],
        layout: 'radio',
      },
      initialValue: 'peach',
      description: 'Brand color accent for this collection card on the website',
      group: 'display',
    }),
    defineField({
      name: 'displayOrder',
      title: '🔢 Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the website (Example: 1, 2, 3, etc.)',
      initialValue: 0,
      group: 'display',
    }),
    defineField({
      name: 'active',
      title: '✅ Show on Website',
      type: 'boolean',
      description: 'Turn off to hide this collection from the website without deleting it',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from collection name. Used for website URLs.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'advanced',
      validation: (Rule) => Rule.required().error('Click "Generate" to create a slug'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'active',
      accent: 'accent',
    },
    prepare({ title, media, active, accent }) {
      return {
        title: title || 'Untitled Collection',
        subtitle: `${accent ? accent + ' • ' : ''}${active ? '✅ Active' : '❌ Inactive'}`,
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
      title: 'Collection Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
