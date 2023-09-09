import { Head } from '@inertiajs/react';

export default function MetaTags({
     image = 'https://yourdomain.com/path-to-your-og.jpg',
     title = 'Your Website Title',
     description = 'Your website description',
     url = 'https://yourdomain.com',
 }) {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <meta head-key="title" name="title" content={title} />
            <meta head-key="description" name="description" content={description} />
        
            {/* Open Graph / Facebook */}
            <meta head-key="og:type" property="og:type" content="website" />
            <meta head-key="og:url" property="og:url" content={url} />
            <meta head-key="og:title" property="og:title" content={title} />
            <meta head-key="og:description" property="og:description" content={description} />
            <meta head-key="og:image" property="og:image" content={image} />
        
            {/* Twitter */}
            <meta head-key="twitter:card" property="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:url" property="twitter:url" content={url} />
            <meta head-key="twitter:title" property="twitter:title" content={title} />
            <meta head-key="twitter:description" property="twitter:description" content={description} />
            <meta head-key="twitter:image" property="twitter:image" content={image} />
        </Head>
    );
}