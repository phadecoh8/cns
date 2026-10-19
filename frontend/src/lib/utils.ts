export function formatDate(value: string) {
  const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

  return formatter.format(new Date(value));
}
