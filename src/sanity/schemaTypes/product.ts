import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(60).warning('Keep product names concise for better mobile display'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Boys', value: 'boys' },
          { title: 'Girls', value: 'girls' },
          { title: 'Unisex', value: 'unisex' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          { title: 'Newborn (0-12 months)', value: 'newborn' },
          { title: 'Toddler (1-3 years)', value: 'toddler' },
          { title: 'Kids (4-8 years)', value: 'kids' },
          { title: 'Juniors (9-14 years)', value: 'juniors' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageRangeDisplay',
      title: 'Age Range Display',
      type: 'string',
      description: 'Customer-friendly age range (e.g., "1–14 Years", "4–10 Years")',
      placeholder: '4–10 Years',
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add available sizes (e.g., "2-3Y", "4-5Y", "16×40")',
    }),
    defineField({
      name: 'priceText',
      title: 'Price Text',
      type: 'string',
      initialValue: 'Price on request',
      description: 'Default: "Price on request". Change only if needed.',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).warning('Add at least one product image'),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'New', value: 'New' },
          { title: 'Bestseller', value: 'Bestseller' },
          { title: 'Festive', value: 'Festive' },
          { title: 'Limited', value: 'Limited' },
        ],
      },
    }),
    defineField({
      name: 'isNewArrival',
      title: 'New Arrival',
      type: 'boolean',
      description: 'Show in New Arrivals section',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show in featured/highlighted sections',
      initialValue: false,
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Limited Stock', value: 'limited' },
          { title: 'Out of Stock', value: 'out_of_stock' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief product description',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Custom WhatsApp Message',
      type: 'text',
      rows: 2,
      description: 'Optional custom message when customer enquires via WhatsApp',
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
      description: 'Only active products will be shown on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      media: 'images.0',
      active: 'active',
    },
    prepare({ title, category, media, active }) {
      return {
        title: title,
        subtitle: `${category || 'No category'} ${active ? '' : '(Inactive)'}`,
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
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
