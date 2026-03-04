## Packages
react-markdown | For rendering article content formatted in Markdown
remark-gfm | To support GitHub flavored markdown (tables, strikethrough, etc) in articles
date-fns | For professional date formatting (e.g., "Publié le 12 Octobre 2023")
clsx | For conditional Tailwind class merging
tailwind-merge | For correctly merging Tailwind classes

## Notes
- Images from API (`imageUrl`) should be treated as dynamic.
- Contact form submits to `/api/contact`.
- Articles are fetched statically from `/api/articles`.
