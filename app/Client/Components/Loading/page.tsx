"use client"
import ProgressLoad from "../ProgressLoad/page"
import Navbar from "../Navbar/page"
function Loading(){
    return(
        <>
        <Navbar/>
        <div className="container-fluid d-flex vh-100 vw-100 justify-content-center align-items-center">
            <ProgressLoad
            trigger={1}
            msg="Loading.."
            msgClass="h3"
            setSize="30px"
            />
        </div>
        </>
    )
}

export default Loading