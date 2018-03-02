// src/components/Hello.tsx

import * as React from 'react';
import './Hello.css';
export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

// export default Hello;

export default class Hello extends React.Component{
    getExclamationMarks(numChars: number) {
        return Array(numChars + 1).join('!');
    }
    render(){
        let enthusiasmLevel = 1;
        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }
        console.log(this)
        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + this.getExclamationMarks(enthusiasmLevel)}
                </div>
            </div>
        );
    }
}