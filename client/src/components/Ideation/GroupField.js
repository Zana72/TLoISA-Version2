import React, { useState } from 'react';
import { Resizable } from 'react-resizable';

export default function GroupField(props) {

    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);

    
      // On top layout
    const onResize = (event, {element, size, handle}) => {
        setWidth(size.width);
        setHeight(size.height);
    };
    
    return (
        <Resizable height={height} width={width} onResize={onResize}>
            <div className="box" style={{width: width + 'px', height: height + 'px', backgroundColor: "green"}}>
                <span>Contents</span>
            </div>
        </Resizable>
    );
}