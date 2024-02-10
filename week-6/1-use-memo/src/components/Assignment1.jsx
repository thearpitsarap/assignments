import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    const factorial = useMemo(()=>{
        let fact = 1;
        for(let i=2;i<=input;i++){
            fact = fact*i;
        }
        return fact;
    },[input])

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
            />
            <p>Calculated Value: {factorial}</p>
        </div>
    );
}