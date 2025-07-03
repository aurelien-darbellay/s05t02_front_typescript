import React from 'react';

export const ProjectionContext = React.createContext<{
  projected: boolean;
}>({
  projected: true,
});
