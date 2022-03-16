import React from "react";


export default function Buttonid(props){

    let id=props.cid
    function testid(){
        console.log(id)
    }
    return(
        <div>
            <input type="button" value="Finish Service" onClick={testid}/>
            
        </div>
    )
}