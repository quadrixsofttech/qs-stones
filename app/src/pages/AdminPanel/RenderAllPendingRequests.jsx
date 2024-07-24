import React from 'react';
import useEmployees from '../../hooks/useEmployees';

export const RenderAllPendingRequests = () => {
  const { data } = useEmployees('time off');
  return <div>Burek</div>;
};
