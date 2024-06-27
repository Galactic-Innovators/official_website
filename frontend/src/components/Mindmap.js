import React, { useState } from "react";
import MindmapNode from "./MindmapNode";
import "./Mindmap.css"; // Make sure to create this CSS file
import weixin from "./assets/images/weixin.svg";
import xiaohongshu from "./assets/images/xiaohongshu.png";
const initialTeam = [
  { id: 1, name: "Jeremy", role: "CEO", headshot: weixin },
  { id: 2, name: "Kevin", role: "CTO", headshot: xiaohongshu },
  // Add more team members here
];
const getRandomPosition = () => {
    const randomX = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    const randomY = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    return { top: `${randomY}%`, left: `${randomX}%` };
  };
  
const Mindmap = () => {
    const [team, setTeam] = useState(initialTeam);
    const [selectedPerson, setSelectedPerson] = useState(null);
  
    const handleNodeClick = (person) => {
      setSelectedPerson((prevPerson) =>
        prevPerson && prevPerson.id === person.id ? null : person
      );
    };
  
    return (
      <div className="mindmap">
        {team.map((person) => (
          <MindmapNode
            key={person.id}
            person={{ ...person, showInfo: selectedPerson && selectedPerson.id === person.id }}
            onClick={handleNodeClick}
          />
        ))}
      </div>
    );
  };
  
  export default Mindmap;
