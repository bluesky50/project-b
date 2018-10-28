export const handlebarInsertsRegex = /\{\{.*?}}/g;
// export const handlebarInsertsRegex = /(\B|[^{]){{[^{}]*}}(?!})/g;
// export const handlebarInsertsRegex = /(^|[^{])\{\{[^{}]*\}\}(?!\})/g;

export const insertBracketsRegex = /(^\{+|\}+$)/mg;

export const insertSplitChar = ':';