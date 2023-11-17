import React, { useState } from 'react';

const HierarchyGraph = () => {
  const [nodes, setNodes] = useState([
    {
      id: 'parent',
      children: [
        {
          id: 'child1',
          children: [
            { id: 'grandchild1', children: [{id:"sunil",children:[]},{id:"kumar",children:[]}] },
            { id: 'grandchild2', children: [{id:"sk",children:[]},{id:"sahoo",children:[]}] },
          ],
        },
        { id: 'child2', children: [] },
      ],
    },
  ]);

  const [visibleNodes, setVisibleNodes] = useState([]);

  const handleNodeClick = (nodeId) => {
    // Reset visibility for all nodes
    setVisibleNodes([]);

    // Toggle visibility for the clicked node and all its descendants
    toggleVisibility(nodeId);
  };

  // Recursive function to toggle visibility for a node and its descendants
  const toggleVisibility = (nodeId) => {
    const node = findNode(nodeId, nodes);

    if (!node) return;

    setVisibleNodes((prevVisibleNodes) => [...prevVisibleNodes, nodeId]);

    // Recursively toggle visibility for children
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        toggleVisibility(child.id);
      });
    }
  };

  // Utility function to find a node in the nested structure
  const findNode = (nodeId, nodes) => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return node;
      }

      if (node.children && node.children.length > 0) {
        const foundChild = findNode(nodeId, node.children);
        if (foundChild) {
          return foundChild;
        }
      }
    }

    return null;
  };

  return (
    <svg width="600" height="400">
      {nodes.map((node, index) => (
        <g key={node.id}>
          <circle
            cx={50 + index * 100}
            cy={50}
            r={20}
            fill="lightblue"
            onClick={() => handleNodeClick(node.id)}
            style={{ cursor: 'pointer' }}
          />
          <text
            x={50 + index * 100}
            y={55}
            textAnchor="middle"
            fontSize="12"
            fill="black"
          >
            {node.id}
          </text>
          {visibleNodes.includes(node.id) &&
            node.children.map((child, childIndex) => (
              <g key={`${node.id}-${child.id}`}>
                <circle
                  cx={50 + (index + childIndex + 1) * 50}
                  cy={100}
                  r={20}
                  fill="lightblue"
                />
                <text
                  x={50 + (index + childIndex + 1) * 50}
                  y={105}
                  textAnchor="middle"
                  fontSize="12"
                  fill="black"
                >
                  {child.id}
                </text>
                <line
                  x1={50 + index * 100}
                  y1={70}
                  x2={50 + (index + childIndex + 1) * 50}
                  y2={80}
                  stroke="gray"
                />
              </g>
            ))}
        </g>
      ))}
    </svg>
  );
};

export default HierarchyGraph;
