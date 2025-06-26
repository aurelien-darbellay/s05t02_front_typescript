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
      <p>
        <strong>Project Name:</strong> {portfolio.projectName}
      </p>
      <p>
        <strong>Project URL:</strong>{' '}
        <a href={portfolio.projectUrl}>{portfolio.projectUrl}</a>
      </p>
    </div>
  );
};
