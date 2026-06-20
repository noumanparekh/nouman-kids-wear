import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fieldsets: [
    {
      name: 'basic',
      title: '📦 Basic Product Details',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'images',
      title: '📸 Product Images',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'display',
      title: '🎯 Website Display Settings',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'advanced',
      title: '⚙️ Advanced/SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      fieldset: 'basic',
      validation: (Rule) => Rule.required().max(60).warning('Keep product names under 60 characters for better mobile display'),
      description: 'Product name as shown on website (max 60 characters)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'basic',
      validation: (Rule) => Rule.required(),
      description: 'Select product category (Boys Wear, Girls Wear, etc.)',
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
      fieldset: 'basic',
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
      fieldset: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageRangeDisplay',
      title: 'Age Range Display',
      type: 'string',
      fieldset: 'basic',
      description: 'Example: "1–14 Years" or "4–10 Years" - This shows on the product card',
      placeholder: '4–10 Years',
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: 'basic',
      description: 'Add sizes one by one (e.g., "2-3Y", "4-5Y", "16×40")',
    }),
    defineField({
      name: 'colors',
      title: 'Product Colors',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Black', value: 'Black' },
          { title: 'White', value: 'White' },
          { title: 'Mint Green', value: 'Mint Green' },
          { title: 'Olive Green', value: 'Olive Green' },
          { title: 'Maroon', value: 'Maroon' },
          { title: 'Dusty Pink', value: 'Dusty Pink' },
          { title: 'Rose Gold', value: 'Rose Gold' },
          { title: 'Peach', value: 'Peach' },
          { title: 'Beige', value: 'Beige' },
          { title: 'Blue', value: 'Blue' },
          { title: 'Cream', value: 'Cream' },
          { title: 'Multi Color', value: 'Multi Color' },
          { title: 'Navy', value: 'Navy' },
          { title: 'Red', value: 'Red' },
          { title: 'Yellow', value: 'Yellow' },
          { title: 'Purple', value: 'Purple' },
          { title: 'Orange', value: 'Orange' },
          { title: 'Brown', value: 'Brown' },
          { title: 'Grey', value: 'Grey' },
          { title: 'Gold', value: 'Gold' },
        ],
      },
      fieldset: 'basic',
      description: 'Select the actual product colors (separate from category styling)',
    }),
    defineField({
      name: 'priceText',
      title: 'Price Text',
      type: 'string',
      initialValue: 'Price on request',
      fieldset: 'basic',
      description: 'Leave as "Price on request" unless you want to show a specific price',
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
              title: 'Image Description',
              type: 'string',
              description: 'Describe the image (e.g., "Boys maroon kurta front view")',
            },
          ],
        },
      ],
      fieldset: 'images',
      validation: (Rule) => Rule.required().min(1).warning('Add at least one product image'),
      description: 'Upload product images - first image will be the main display image',
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
      fieldset: 'display',
      description: 'Add a badge to highlight this product (optional)',
    }),
    defineField({
      name: 'isNewArrival',
      title: '✨ Mark as New Arrival',
      type: 'boolean',
      fieldset: 'display',
      description: 'Turn ON to show in "New Arrivals" section on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: '⭐ Mark as Featured',
      type: 'boolean',
      fieldset: 'display',
      description: 'Turn ON to highlight this product in featured sections',
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
      fieldset: 'display',
      initialValue: 'available',
    }),
    defineField({
      name: 'active',
      title: '👁️ Show on Website',
      type: 'boolean',
      fieldset: 'display',
      description: 'Turn OFF to hide from website without deleting the product',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      fieldset: 'display',
      description: 'Lower numbers appear first in the catalogue (e.g., 1, 2, 3...)',
      initialValue: 0,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      fieldset: 'advanced',
      description: 'Optional: Brief product description',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      fieldset: 'advanced',
      validation: (Rule) => Rule.required(),
      description: 'Auto-generated from product name - click "Generate" button',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Custom WhatsApp Message',
      type: 'text',
      rows: 2,
      fieldset: 'advanced',
      description: 'Optional: Custom message when customer enquires via WhatsApp',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      media: 'images.0',
      active: 'active',
      isNew: 'isNewArrival',
      isFeatured: 'isFeatured',
    },
    prepare({ title, category, media, active, isNew, isFeatured }) {
      const badges = []
      if (!active) badges.push('❌ Hidden')
      if (isNew) badges.push('✨ New')
      if (isFeatured) badges.push('⭐ Featured')
      
      return {
        title: title,
        subtitle: `${category || 'No category'}${badges.length > 0 ? ' • ' + badges.join(' • ') : ''}`,
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
    {
      title: 'Newest First',
      name: 'newest',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})
