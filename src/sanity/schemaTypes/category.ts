import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: '📁 Categories',
  type: 'document',
  icon: () => '📁',
  groups: [
    {
      name: 'content',
      title: 'Category Details',
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
      title: '📝 Category Name',
      type: 'string',
      description: 'Example: Boys Ethnic Wear, Girls Party Wear, Newborn Wear',
      group: 'content',
      validation: (Rule) => Rule.required().error('Category name is required'),
    }),
    defineField({
      name: 'description',
      title: '💬 Short Description',
      type: 'string',
      description: 'Optional tagline for this category (Example: Traditional wear for special occasions)',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: '🖼️ Category Image',
      type: 'image',
      description: 'Upload a representative image for this category',
      options: {
        hotspot: true,
      },
      group: 'content',
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
      initialValue: 'blush',
      description: '⚠️ This is ONLY for website badge/accent styling, NOT actual product color',
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
      description: 'Turn off to hide this category from the website without deleting it',
      initialValue: true,
      group: 'display',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from category name. Used for website URLs.',
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
        title: title || 'Untitled Category',
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
      title: 'Category Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
