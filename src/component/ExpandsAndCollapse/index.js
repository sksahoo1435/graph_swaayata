import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import './index.css';

const initialNodes = [
    {
        id: '1',
        name: 'a',
        children: [
            {
                id: '2',
                name: 'b',
                parent: '1',
                children: [
                    {
                        id: '3',
                        name: 'c',
                        parent: '2',
                        children: [
                            {
                                id: '4',
                                parent: '3',
                                name: 'd',
                                children: []
                            }
                        ]
                    },
                    {
                        id: '15',
                        name: 'test of the designnnnnnnnnnnnnn nssmmmmmmmmmmmmmmmmmms shhhhhhhhhhh',
                        parent: '2',
                        children: [
                            {
                                id: '13',
                                parent: '15',
                                name: 'testing child',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: '5',
                name: 'b',
                parent: '1',
                children: [
                    {
                        id: '6',
                        name: 'c',
                        parent: '5',
                        children: [
                            {
                                id: '7',
                                parent: '6',
                                name: 'd',
                                children: []
                            }
                        ]
                    }
                ]
            },
            {
                id: '8',
                name: 'b',
                parent: '1',
                children: [
                    {
                        id: '9',
                        name: 'c',
                        parent: '8',
                        children: [
                            {
                                id: '10',
                                parent: '9',
                                name: 'd',
                                children: []
                            }
                        ]
                    },
                    {
                        id: '11',
                        name: 'f',
                        parent: '8',
                        children: []
                    }
                ]
            },
            {
                id: '12',
                name: 'g',
                parent: '1',
                children: []
            }
        ]
    }
]

const initialEdges = [
    {
        id: 'edges-e5-7',
        source: '0',
        target: '1',
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    }
]

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
    padding: 1,
};

const ExpandAndCollapse = (props) => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isConnecting, setIsConnecting] = useState(false);

    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const isConnectionAllowed = (sourceId, targetId) => {
        const sourceNode = nodes.find((node) => node.id === sourceId);
        const targetNode = nodes.find((node) => node.id === targetId);

        return !(sourceNode && targetNode && sourceNode.type === 'output' && targetNode.type === 'input');
    };

    const onConnectStart = (event, { nodeId, handleType }) => {

        if (handleType === 'source') {

            setIsConnecting(false);
        }
    };

    const onConnectStop = () => {
        setIsConnecting(false);
    };

    const onConnect = (params) => {
        if (!isConnecting || !isConnectionAllowed(params.source, params.target)) {
            return;
        }

        setEdges((eds) => addEdge(params, eds));
    };

    

    useEffect(() => {
        setNodes([...initialNodes.map((item) => {
            return {
                id: item.id,
                type: item?.children?.length ? 'default' : 'output',
                data: { label: item.name, children: item.children },
                position: { x: 0, y: 0 },
                sourcePosition: 'right',
                targetPosition: 'left',
                isConnectable: false,
            }
        })])
    }, [])


    // const handleNodeClick = (e, data) => {
    //     const findChildren = nodes.filter((item) => item?.data?.parent === data.id)
    //     if (!findChildren.length) {
    //         const itemChildren = [...data.data.children.map((item, i) => {
    //             return {
    //                 id: item.id,
    //                 type: item?.children?.length ? 'default' : 'output',
    //                 data: { label: item.name, children: item.children, parent: item.parent },
    //                 position: { x: data.position.x + 200, y: i === 0 ? data.position.y : data.position.y + i * 100 },
    //                 sourcePosition: 'right',
    //                 targetPosition: 'left'
    //             }
    //         })]
    //         setEdges([
    //             ...edges,
    //             ...itemChildren.map((item) => {
    //                 return {
    //                     id: String(parseInt(Math.random(100000000) * 1000000)),
    //                     source: item?.data?.parent,
    //                     target: item?.id,
    //                     markerEnd: {
    //                         type: MarkerType.ArrowClosed,
    //                     },
    //                 }
    //             })
    //         ])
    //         setNodes(nodes.concat(itemChildren))
    //     } else {
    //         setNodes([
    //             ...nodes.filter((item) => item?.data?.parent !== data.id)
    //         ])
    //         setEdges([
    //             ...edges.filter((item) => data.id !== item.source)
    //         ])
    //     }
    // }

    const handleNodeClick = async (e, data) => {
        const findChildren = nodes.filter((item) => item?.data?.parent === data.id);
    
        if (!findChildren.length) {
          const itemChildren = [...data.data.children.map((item, i) => {
            return {
              id: item.id,
              type: item?.children?.length ? 'default' : 'output',
              data: { label: item.name, children: item.children, parent: item.parent },
              position: { x: data.position.x + 200, y: i === 0 ? data.position.y : data.position.y + i * 100 },
              sourcePosition: 'right',
              targetPosition: 'left',
            };
          })];
    
          for (let i = 0; i < itemChildren.length; i++) {
            const item = itemChildren[i];
            await new Promise((resolve) => setTimeout(resolve, 700));
    
            setNodes((prevNodes) => [...prevNodes, item]);
            setEdges((prevEdges) => [
              ...prevEdges,
              {
                id: String(parseInt(Math.random(100000000) * 1000000)),
                source: item.data.parent,
                target: item.id,
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              },
            ]);
          }
        } else {
          setNodes((prevNodes) => [
            ...prevNodes.filter((item) => item?.data?.parent !== data.id),
          ]);
    
          setEdges((prevEdges) => [
            ...prevEdges.filter((item) => data.id !== item.source),
          ]);
        }
      };

    return (
        <div className="wrapper" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectStop={onConnectStop}
                onNodeClick={handleNodeClick}
                fitView
                maxZoom={0.9}
                defaultViewport={{ x: 1, y: 1, zoom: 0.4 }}
                fitViewOptions={fitViewOptions}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <ExpandAndCollapse />
    </ReactFlowProvider>
);