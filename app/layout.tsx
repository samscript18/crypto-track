import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/lib/providers/providers';
import { sora } from '@/lib/utils/fonts';
import { Suspense } from 'react';


export const metadata: Metadata = {
	title: {
		default: 'CryptoTrack - Digital Assets',
		template: 'CryptoTrack | %s',
	},
	description: 'CryptoTrack - Track cryptocurrency prices in real-time',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${sora.className} antialiased`}>
				<Providers>
					<Suspense>{children}</Suspense>
				</Providers>
			</body>
		</html>
	);
}
