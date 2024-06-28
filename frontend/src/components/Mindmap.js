import React, { useState, useEffect, useRef  } from "react";
import MindmapNode from "./MindmapNode";
import "./Mindmap.css"; // Make sure to create this CSS file
import weixin from "./assets/images/weixin.svg";
import xiaohongshu from "./assets/images/xiaohongshu.png";


const initialTeam = [
    { id: 1, name: "Jeremy", role: "3D Team Lead", headshot: weixin, size: '150px', categories: ['founders', '3d-printing'],  linkedin: 'https://linkedin.com/in/jeremy'},
    { id: 2, name: "Kevin", role: "Software Team Lead", headshot: weixin, size: '150px', categories: ['founders', 'software'],linkedin: 'https://www.linkedin.com/in/kevinchenzk/' },
    { id: 3, name: "Eric", role: "Software Developer | 3D Designer", headshot: weixin, size: '100px', categories: ['software', '3d-printing'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 4, name: "Anny", role: "Project Manager", headshot: weixin, size: '100px', categories: ['founders'] ,linkedin: 'https://linkedin.com/in/jeremy'},
    { id: 5, name: "Clyde", role: "Software Developer", headshot: weixin, size: '80px', categories: ['software'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 6, name: "Cycas", role: "Software Developer", headshot: weixin, size: '150px', categories: ['software'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 7, name: "Xiaoying", role: "UX Designer", headshot: weixin, size: '80px', categories: ['software'],linkedin: 'https://linkedin.com/in/jeremy' },
    // Add more team members here
  ];
const filters = [
    { id: 'founders', size: '60px' , headshot: xiaohongshu},
    { id: 'software', size: '80px' , headshot: xiaohongshu},
    { id: '3d-printing', size: '80px', headshot: xiaohongshu}
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
          Math.abs(parseInt(pos.top) - randomY) < 12 &&
          Math.abs(parseInt(pos.left) - randomX) < 12
      );
    }
  
    return newPosition;
  };
  
  const Mindmap = () => {
    const [team, setTeam] = useState(initialTeam);
    const [positions, setPositions] = useState({});
    const [selectedPerson, setSelectedPerson] = useState(initialTeam.find(person => person.id === 1));
    const [selectedFilter, setSelectedFilter] = useState(null);
    const mindmapRef = useRef(null);
  
    useEffect(() => {
      const initialPositions = {};
      [...team, ...filters].forEach((person) => {
        if (person.id === 1) {
          initialPositions[person.id] = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        } else {
          initialPositions[person.id] = getRandomPosition(initialPositions);
        }
      });
      setPositions(initialPositions);
    }, [team]);
  
    const handleNodeClick = (person) => {
      if ((selectedPerson && selectedPerson.id === person.id) || (selectedFilter && selectedFilter.id === person.id)) {
        return;
      }
  
      setPositions((prevPositions) => {
        const newPositions = { ...prevPositions };
        if (selectedPerson) {
          newPositions[selectedPerson.id] = getRandomPosition(newPositions);
        }
        if (selectedFilter) {
          newPositions[selectedFilter.id] = getRandomPosition(newPositions);
        }
        newPositions[person.id] = { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
        return newPositions;
      });
  
      if (filters.some(filter => filter.id === person.id)) {
        setSelectedFilter(person);
        setSelectedPerson(null);
      } else {
        setSelectedPerson(person);
        setSelectedFilter(null);
      }
    };
  
    return (
      <div className="mindmap" ref={mindmapRef}>
        {filters.map((filter) => (
          <MindmapNode
            key={filter.id}
            person={{ ...filter, showInfo: selectedFilter && selectedFilter.id === filter.id }}
            onClick={handleNodeClick}
            style={positions[filter.id]}
            size={filter.size}
          />
        ))}
        {team.map((person) => (
          <MindmapNode
            key={person.id}
            person={{ ...person, showInfo: selectedPerson && selectedPerson.id === person.id }}
            onClick={handleNodeClick}
            style={{
              ...positions[person.id],
              transform: selectedFilter && person.categories.includes(selectedFilter.id) ? 'scale(1.3)' : '',
              opacity: selectedFilter && !person.categories.includes(selectedFilter.id) ? 0.3 : 1
            }}
            size={person.size}
          />
        ))}
      </div>
    );
  };
  
  export default Mindmap;