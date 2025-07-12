// PortfolioComponent.tsx
import React from 'react';
import { Portfolio } from '../../../model/concreteEntries/Portfolio';

interface PortfolioComponentProps {
  portfolio: Portfolio;
}

export const PortfolioComponent: React.FC<PortfolioComponentProps> = ({
  portfolio,
}) => {
  return (
    <div>
      <a
        href={portfolio.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="purple-link"
      >
        {portfolio.projectName}
      </a>
    </div>
  );
};
