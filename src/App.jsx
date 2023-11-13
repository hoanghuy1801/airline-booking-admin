import './App.css'
import { Outlet, Link } from 'react-router-dom'

const App = () => {
    return (
        <div className='app-container'>
            <div className='header-container'></div>
            <div className='main-container'>
                <Outlet />
            </div>
        </div>
    )
}

export default App
