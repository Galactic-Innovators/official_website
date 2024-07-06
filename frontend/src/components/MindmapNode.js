import React from "react";
import { Image } from "react-bootstrap";
import "./MindmapNode.css"; // Ensure CSS rules are correctly set up
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const MindmapNode = ({ person, onClick, style }) => {
    const sizeClass = `headshot-${person.sizeCategory}`;

    return (
        <div className="mindmap-node" onClick={() => onClick(person)} style={style}>
          <Image
            src={person.headshot}
            alt={person.name}
            roundedCircle
            className={`headshot ${sizeClass}`} // Using size class
          />
          {person.showInfo && (
            <div className="info">
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              {person.linkedin && (
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
            </div>
          )}
        </div>
      );
    };
    
    export default MindmapNode;