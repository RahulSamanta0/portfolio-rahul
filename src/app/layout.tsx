import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahul Samanta || Portfolio",
  description:
    "Portfolio of Rahul Samanta – AI/ML Developer, Full Stack Engineer, MCA student at MSIT Kolkata. Explore projects, education, talks, and contact info.",
  icons: {
    icon: "/assets/project img/coffee-bag_884757.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Remixicons */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        {/* Font Awesome */}
        <script
          src="https://kit.fontawesome.com/0e4a14a188.js"
          crossOrigin="anonymous"
          async
        ></script>
        {/* VanillaTilt */}
        <script src="/vanilla-tilt.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
