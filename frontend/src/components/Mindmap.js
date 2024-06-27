import React, { useState } from "react";
import MindmapNode from "./MindmapNode";
import "./Mindmap.css"; // Make sure to create this CSS file
import weixin from "./assets/images/weixin.svg";
import xiaohongshu from "./assets/images/xiaohongshu.png";
const initialTeam = [
  { id: 1, name: "Alice", role: "Developer", headshot: weixin },
  { id: 2, name: "Bob", role: "Designer", headshot: xiaohongshu },
  // Add more team members here
];

const Mindmap = () => {
  const [team, setTeam] = useState(initialTeam);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleNodeClick = (person) => {
    setSelectedPerson(person);
  };

  return (
    <div className="mindmap">
      {team.map((person) => (
        <MindmapNode
          key={person.id}
          person={{ ...person, showInfo: selectedPerson === person }}
          onClick={handleNodeClick}
        />
      ))}
    </div>
  );
};

export default Mindmap;