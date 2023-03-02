import React, { useState } from 'react';

const Tags = () => {

    const types = ['Brunch', 'Dessert', 'Cafe', 'Lunch/Dinner', 'Drink'];

    const [active, setActive] = useState(types[0]);
    return (
        <div className='tags' >
        {types.map(type => (
            <button
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
            style={{opacity: active===type ? '1':'0.6'}}
            >
            {type}
            </button>
        ))}
        </div>
    );
}

export default Tags;