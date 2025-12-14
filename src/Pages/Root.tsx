import { Outlet } from 'react-router-dom'
import Header from '../gcomponents/header'


export default function Root(){

    return <div>
        <Header />
        <Outlet />
    </div>
}