import React, { useState } from "react";
import { Image } from "react-bootstrap";
import "./MindmapNode.css"; // Make sure to create this CSS file

const MindmapNode = ({ person, onClick }) => {
    return (
      <div className="mindmap-node" onClick={() => onClick(person)}>
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