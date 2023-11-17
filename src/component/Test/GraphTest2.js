import React, { useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const Graph = () => {
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: 'parent', name: 'Parent' },
      { id: 'child1', name: 'Child 1' },
      { id: 'child2', name: 'Child 2' },
    ],
    links: [
      { source: 'parent', target: 'child1' },
      { source: 'parent', target: 'child2' },
    ],
  });

  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="name"
      linkWidth={2}
      linkDirectionalArrowLength={6}
    />
  );
};

export default Graph;
