import React, { useState, useEffect, useRef  } from "react";
import MindmapNode from "./MindmapNode";
import "./Mindmap.css"; // Make sure to create this CSS file
import weixin from "./assets/images/weixin.svg";
import Developer_icon from "./assets/images/Developer_icon.png";
import Designer_icon from "./assets/images/Designer_icon.png";
import Printing_icon from "./assets/images/3D_printing_icon.png";
import Founder_icon from "./assets/images/Founder_icon.png";
const initialTeam = [
    { id: 1, name: "Jeremy Cheung", role: "3D Team Lead", headshot: weixin, sizeCategory: 'xlarge', categories: ['founders', '3d-printing'],  linkedin: 'https://www.linkedin.com/in/jeremyc1231/'},
    { id: 2, name: "Kevin Chen", role: "Software Team Lead", headshot: weixin, sizeCategory: 'xlarge', categories: ['founders', 'software', 'designer'],linkedin: 'https://www.linkedin.com/in/kevinchenzk/' },
    { id: 3, name: "Eric Li", role: "Software Developer | 3D Designer", headshot: weixin, sizeCategory: 'large', categories: ['software', '3d-printing'],linkedin: 'https://www.linkedin.com/in/ericxuchengli/' },
    { id: 4, name: "Anny Liu", role: "Project Manager", headshot: weixin, sizeCategory: 'large', categories: ['founders'] ,linkedin: 'https://linkedin.com/in/jeremy'},
    { id: 5, name: "Clyde Jiang", role: "Software Developer", headshot: weixin, sizeCategory: 'small', categories: ['software'],linkedin: 'https://www.linkedin.com/in/linqi-jiang-638225170/' },
    { id: 6, name: "Cycas Su", role: "Software Developer", headshot: weixin, sizeCategory: 'medium', categories: ['software'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 7, name: "Ying Xiao", role: "UX Designer", headshot: weixin, sizeCategory: 'medium', categories: ['designer'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 8, name: "Oliver Chen", role: "3D Designer", headshot: weixin, sizeCategory: 'small', categories: ['3d-printing'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 9, name: "Imran Malik", role: "3D Designer", headshot: weixin, sizeCategory: 'small', categories: ['3d-printing'],linkedin: 'https://linkedin.com/in/jeremy' },
    { id: 10, name: "Acacia Hong", role: "Graphic Designer", headshot: weixin, sizeCategory: 'large', categories: ['designer'],linkedin: 'https://www.linkedin.com/in/acacia-hong-827239109/' },
    // Add more team members her
  ];
const filters = [
    { id: 'founders', sizeCategory: 'medium' , headshot: Founder_icon},
    { id: 'software', sizeCategory: 'large', headshot: Developer_icon},
    { id: '3d-printing', sizeCategory: 'xlarge', headshot: Printing_icon},
    { id: 'designer', sizeCategory: 'large', headshot: Designer_icon}
];
const getRandomPosition = (existingPositions) => {
    let randomX, randomY, newPosition;
    let overlap = true;
  
    while (overlap) {
      randomX = Math.floor(Math.random() * 99) + 1; // 10% to 90%
      randomY = Math.floor(Math.random() * 99) + 1; // 10% to 90%
      newPosition = { top: `${randomY}%`, left: `${randomX}%` };
  
      overlap = Object.values(existingPositions).some(
        (pos) =>
          Math.abs(parseInt(pos.top) - randomY) < 35 &&
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
                    sizeCategory={filter.sizeCategory} // Pass size category instead of size
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
                    sizeCategory={person.sizeCategory} // Pass size category instead of size
                />
            ))}
        </div>
    );
};

export default Mindmap;