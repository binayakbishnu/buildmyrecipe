import React, { useState } from 'react'
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function CookingDetails() {
    const [hours1, setHours1] = useState("");
    const [minutes1, setMinutes1] = useState("");

    const [hours2, setHours2] = useState("");
    const [minutes2, setMinutes2] = useState("");

    const difficultyTypes = ["easy", "moderate", "difficult"];
    const [difficultyLevel, setDifficultyLevel] = useState("");
    const handleRecipeServingsChange = (e) => {
        for (let index = 0; index < difficultyTypes.length; index++) {
            const element = difficultyTypes[index];
            if (element !== e.target.value)
                document.getElementById(`${element}`).checked = false;
            else {
                document.getElementById(`${element}`).checked = true;
                setDifficultyLevel(e.target.value);
            }
        }
    }

    const navigate = useNavigate();
    const submitCookingDetails = () => {
        alert("cooking details submit");

        navigate("/home/cookingsteps");
    }

    return (
        /* Preparation Time
        Cooking Time
        Difficulty Level */
        <div className='bg-[rgb(39,52,68)] bg-opacity-60 flex flex-col gap-5 p-4 rounded w-full sm:w-[50vw] lg:w-[30vw] m-auto'>
            <h2 className='text-2xl'>Recipe Name</h2>

            <div>
                <p className='text-left p-0 m-0'>Preparation time</p>
                <hr />
                <div className='flex gap-2 mt-1 items-center flex-wrap'>
                    <div className='flex-1 flex gap-2 items-center bg-[rgba(0,0,0,0)] text-white border rounded p-2'>
                        <input type="number" value={hours1} placeholder='hours' min="0"
                            onChange={(e) => setHours1(e.target.value)} className={`w-[100px] bg-[rgba(0,0,0,0)] flex-1 text-white border-none rounded ps-2 outline-none focus:outline-none`} />
                        hours
                    </div>
                    <div className='flex-1 flex gap-2 items-center bg-[rgba(0,0,0,0)] text-white border rounded p-2'>
                        <input type="number" value={minutes1} placeholder='minutes' min="0" step="15"
                            onChange={(e) => setMinutes1(e.target.value)} className={`w-[100px] bg-[rgba(0,0,0,0)] flex-1 text-white border-none rounded ps-2 outline-none focus:outline-none`} />
                        minutes
                    </div>
                </div>
            </div>

            <div>
                <p className='text-left p-0 m-0'>Cooking time</p>
                <hr />
                <div className='flex gap-2 mt-1 items-center flex-wrap'>
                    <div className='flex-1 flex gap-2 items-center bg-[rgba(0,0,0,0)] text-white border rounded p-2'>
                        <input type="number" value={hours2} placeholder='hours' min="0"
                            onChange={(e) => setHours2(e.target.value)} className={`w-[100px] bg-[rgba(0,0,0,0)] flex-1 text-white border-none rounded ps-2 outline-none focus:outline-none`} />
                        hours
                    </div>
                    <div className='flex-1 flex gap-2 items-center bg-[rgba(0,0,0,0)] text-white border rounded p-2'>
                        <input type="number" value={minutes2} placeholder='minutes' min="0" step="15"
                            onChange={(e) => setMinutes2(e.target.value)} className={`w-[100px] bg-[rgba(0,0,0,0)] flex-1 text-white border-none rounded ps-2 outline-none focus:outline-none`} />
                        minutes
                    </div>
                </div>
            </div>

            <div>
                <p className='text-left p-0 m-0'>Difficulty level</p>
                <hr />
                <div className='text-left flex flex-row flex-wrap gap-2'>
                    {
                        difficultyTypes.map((data, index) => (
                            <div key={index} className='flex flex-row items-center gap-1'>
                                <input id={data} type="radio" value={data} name={data} onChange={handleRecipeServingsChange} />
                                <label htmlFor={data}>{data}</label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button onClick={submitCookingDetails}
                className='bg-[rgb(39,52,68)] bg-opacity-80 px-4 py-2 rounded-xl flex gap-2 items-center w-fit m-auto'
            >Next <BsArrowRightCircle />
            </button>
        </div>
    )
}

export default CookingDetails