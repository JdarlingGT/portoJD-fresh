import React from 'react';

interface Props { name: string; title?: string; size?: number; color?: string; }
// Uses Simple Icons CDN. Example: <BrandIcon name="googleanalytics" />
const BrandIcon: React.FC<Props> = ({ name, title, size = 24, color = 'currentColor' }) => {
  const src = `https://cdn.simpleicons.org/${encodeURIComponent(name)}/${encodeURIComponent(color.replace('#',''))}`;
  return <img src={src} width={size} height={size} alt={title || name} loading="lazy" />;
};
export default BrandIcon;
