import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="122" r="120" />
    <rect x="0" y="257" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="413" rx="13" ry="13" width="90" height="38" />
    <rect x="128" y="410" rx="15" ry="15" width="150" height="45" />
  </ContentLoader>
);
