import "./globals.css";

export const metadata = {
  title: "Aarti Jewellers & Fashions | Triveni Nagar, Lucknow",
  description:
    "Aarti Jewellers & Fashions - Sarees, Lehengas & Jewellery in Triveni Nagar, Lucknow. Visit us or message on WhatsApp.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
