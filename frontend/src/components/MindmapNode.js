import React from "react";
import { Image } from "react-bootstrap";
import "./MindmapNode.css";

const MindmapNode = ({ person, onClick, style }) => {
  return (
    <div className="mindmap-node" onClick={() => onClick(person)} style={style}>
      <Image
        src={person.headshot}
        alt={person.name}
        roundedCircle
        className="headshot"
      />
      {person.showInfo && (
        <div className="info">
          <h3>{person.name}</h3>
          <p>{person.role}</p>
        </div>
      )}
    </div>
  );
};

export default MindmapNode;