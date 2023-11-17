// import React, { useState } from 'react';
// import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

// const initialElements = [
//   { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
//   { id: '2', type: 'default', data: { label: 'Node 2' }, position: { x: 200, y: 0 } },
//   { id: '3', type: 'default', data: { label: 'Node 3' }, position: { x: 400, y: 0 } },
//   { id: '4', type: 'output', data: { label: 'Node 4' }, position: { x: 200, y: 200 } },
//   { id: '5', type: 'output', data: { label: 'Node 5' }, position: { x: 400, y: 200 } },
//   { id: 'e1-2', source: '1', target: '2' },
//   { id: 'e2-3', source: '2', target: '3' },
//   { id: 'e1-4', source: '1', target: '4' },
//   { id: 'e1-5', source: '1', target: '5' },
// ];

// const App = () => {
//   const [elements, setElements] = useState(initialElements);
//   const [selectedNodeId, setSelectedNodeId] = useState(null);

//   const onNodeClick = (event, node) => {
//     setSelectedNodeId(node.id);
//     // You can customize the logic to show/hide connected nodes here
//     const connectedElements = initialElements.filter(
//       (el) => el.source === node.id || el.target === node.id
//     );
//     setElements([...initialElements, ...connectedElements]);
//   };

//   return (
//     <div style={{ height: '600px' }}>
//       <ReactFlow
//         elements={elements}
//         onElementClick={onNodeClick}
//         style={{ width: '100%', height: '100%' }}
//       >
//         <MiniMap />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'default', data: { label: 'Node 2' }, position: { x: 200, y: 0 } },
  { id: '3', type: 'default', data: { label: 'Node 3' }, position: { x: 400, y: 0 } },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const App = () => {
  const [elements, setElements] = useState(initialElements);

  return (
    <div style={{ height: '600px' }}>
      <ReactFlow elements={elements} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default App;
