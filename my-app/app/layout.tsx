import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELITES CONNECT",
  description:
    "Announcements, events, meetings, and project updates from ELITES CONNECT.",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ccs-elites-logo.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ccs-elites-logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
