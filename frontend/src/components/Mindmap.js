import React, { useState, useEffect } from "react";
import MindmapNode from "./MindmapNode";
import "./Mindmap.css"; // Make sure to create this CSS file
import weixin from "./assets/images/weixin.svg";
import xiaohongshu from "./assets/images/xiaohongshu.png";
const initialTeam = [
    { id: 1, name: "Jeremy", role: "CEO", headshot: weixin, size: '150px', categories: ['founders', 'software'] },
    { id: 2, name: "Kevin", role: "CTO", headshot: weixin, size: '150px', categories: ['founders', 'software'] },
    { id: 3, name: "Eric", role: "Tech", headshot: weixin, size: '100px', categories: ['software'] },
    { id: 4, name: "Anny", role: "CFO", headshot: weixin, size: '150px', categories: ['founders'] },
    { id: 5, name: "Clyde", role: "CTO", headshot: weixin, size: '150px', categories: ['software', '3d-printing'] },
    { id: 6, name: "Cycas", role: "Tech", headshot: weixin, size: '100px', categories: ['software'] },
    { id: 7, name: "Xiaoying", role: "CFO", headshot: weixin, size: '150px', categories: ['3d-printing'] },
    // Add more team members here
  ];
const filters = [
    { id: 'founders', name: 'Founders' },
    { id: 'software', name: 'Software Team' },
    { id: '3d-printing', name: '3D Printing Team' }
];
const getRandomPosition = (existingPositions) => {
    let randomX, randomY, newPosition;
    let overlap = true;
  
    while (overlap) {
      randomX = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      randomY = Math.floor(Math.random() * 80) + 10; // 10% to 90%
      newPosition = { top: `${randomY}%`, left: `${randomX}%` };
  
      overlap = Object.values(existingPositions).some(
        (pos) =>
          Math.abs(parseInt(pos.top) - randomY) < 20 &&
          Math.abs(parseInt(pos.left) - randomX) < 18
      );
    }
  
    return newPosition;
  };
  
  const Mindmap = () => {
    const [team, setTeam] = useState(initialTeam);
    const [positions, setPositions] = useState({});
    const [selectedPerson, setSelectedPerson] = useState(initialTeam.find(person => person.id === 1));
  
    useEffect(() => {
      const initialPositions = {};
      team.forEach((person) => {
        if (person.id === 1) {
          initialPositions[person.id] = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        } else {
          initialPositions[person.id] = getRandomPosition(initialPositions);
        }
      });
      setPositions(initialPositions);
    }, [team]);
  
    const handleNodeClick = (person) => {
      if (selectedPerson && selectedPerson.id === person.id) {
        return;
      }
  
      setPositions((prevPositions) => {
        const newPositions = { ...prevPositions };
        if (selectedPerson) {
          newPositions[selectedPerson.id] = getRandomPosition(newPositions);
        }
        newPositions[person.id] = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return newPositions;
      });
  
      setSelectedPerson(person);
    };
  
    return (
      <div className="mindmap">
        {team.map((person) => (
          <MindmapNode
            key={person.id}
            person={{ ...person, showInfo: selectedPerson && selectedPerson.id === person.id }}
            onClick={handleNodeClick}
            style={positions[person.id]}
            size={person.size}
          />
        ))}
      </div>
    );
  };
  
  export default Mindmap;