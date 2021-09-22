import { useState } from "react"

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e)=> {
        e.preventDefault()

        if(!text){
            alert('Please enter a task')
            return
        }

        onAdd({ text, reminder })

        setText('')
        setReminder(false)
    }

    return (
        <form onSubmit={onSubmit} >
            <div className='form-control'>
                <label>Add Task</label>
                <input type='text' placeholder='Add task' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' 
                    checked={reminder}
                    value={reminder} 
                    onChange={(e)=> setReminder(e.currentTarget.checked) }/>
            </div>
            <input className='btn btn-block' type='submit' value='Save task' />
        </form>
    )
}

export default AddTask
