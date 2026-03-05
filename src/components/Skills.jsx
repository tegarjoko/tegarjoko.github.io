import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faCloud, faLayerGroup, faCode, faWind, faBolt, faServer } from '@fortawesome/free-solid-svg-icons';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { skillsData } from '../data/skillsData';

// Register all brand icons + needed solid icons
library.add(fab, faDatabase, faCloud, faLayerGroup, faCode, faWind, faBolt, faServer);

export default function Skills() {
    const ref = useRef(null);
    useScrollReveal(ref);

    return (
        <div id="skills" className="section-outer" ref={ref}>
            <div className="section-inner">
                <div className="section-label">// 03 — CAPABILITIES</div>
                <h2 className="section-title reveal">
                    <span className="prefix">&gt;&gt;</span> SKILL MATRIX
                </h2>
                {skillsData.map((group) => (
                    <div className="skills-group reveal" key={group.group}>
                        <div className="skills-group-label">{group.group}</div>
                        <div className="skills-grid">
                            {group.skills.map((skill) => (
                                <div className="skill-card" key={skill.name}>
                                    <span className="skill-icon">
                                        <FontAwesomeIcon icon={skill.icon} />
                                    </span>
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
