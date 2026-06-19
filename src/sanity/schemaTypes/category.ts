import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short tagline for the category',
    }),
    defineField({
      name: 'accent',
      title: 'Accent Color',
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
      description: 'Brand color accent for category badges',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only active categories will be shown on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'active',
    },
    prepare({ title, media, active }) {
      return {
        title: title,
        subtitle: active ? 'Active' : 'Inactive',
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
  ],
})
