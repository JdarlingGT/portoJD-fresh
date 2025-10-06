// SEO Configuration

const SEO_CONFIG = {
  title: "Your Website Title",
  description: "Your website description for better SEO.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    site_name: "Your Website Name",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    handle: "@yourhandle",
    site: "@yoursite",
    cardType: "summary_large_image",
  },
};

export default SEO_CONFIG;
