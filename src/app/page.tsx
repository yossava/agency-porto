import { redirect } from 'next/navigation';

// This page only renders when the user visits the root URL (/)
// It automatically redirects to the default locale (Indonesian)
export default function RootPage() {
  redirect('/id');
}
