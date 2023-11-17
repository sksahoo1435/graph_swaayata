import { Handle, Position } from 'reactflow';

function Parallelogram({ data }) {
 

  return (
    <div className="parallelogram">
      <Handle type="target" position={Position.Top} />
     
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default Parallelogram;