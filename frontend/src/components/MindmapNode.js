import React from "react";
import { Image } from "react-bootstrap";
import "./MindmapNode.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const MindmapNode = ({ person, onClick, style, size }) => {
  return (
    <div className="mindmap-node" onClick={() => onClick(person)} style={style}>
      <Image
        src={person.headshot}
        alt={person.name}
        roundedCircle
        className="headshot"
        style={{ width: size, height: size }}
      />
      {person.showInfo && (
        <div className="info">
          <h3>{person.name}</h3>
          <p>{person.role}</p>
          {person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <FontAwesomeIcon icon={faLinkedin} scale={'20px'}/>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default MindmapNode;