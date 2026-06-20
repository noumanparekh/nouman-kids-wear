import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBanner',
  title: 'Homepage Banner',
  type: 'document',
  fieldsets: [
    {
      name: 'content',
      title: '📝 Banner Content',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'images',
      title: '🖼️ Background Images',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'buttons',
      title: '🔘 Buttons (Optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Heading',
      type: 'string',
      description: 'Main headline for the homepage banner (e.g., "Dressed for every little occasion")',
      fieldset: 'content',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Short description below the headline',
      fieldset: 'content',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Background image for desktop and tablet',
      fieldset: 'images',
    }),
    defineField({
      name: 'mobileBackgroundImage',
      title: 'Mobile Background (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional: Different background for mobile phones',
      fieldset: 'images',
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Button Text',
      type: 'string',
      description: 'Text on the main button (e.g., "Browse Products")',
      fieldset: 'buttons',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Button Link',
      type: 'string',
      description: 'Where button goes (e.g., "#catalogue" or a URL)',
      fieldset: 'buttons',
    }),
    defineField({
      name: 'active',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Turn on to display this banner on the homepage',
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
        title: title || 'Homepage Banner',
        subtitle: active ? '✅ Active' : '❌ Inactive',
        media: media,
      }
    },
  },
})
