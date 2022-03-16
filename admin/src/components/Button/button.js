import React from "react";


export default function Buttonid(props){

    let id=props.cid
    function testid(){
        console.log(id)
    }
    return(
        <div>
            <input type="button" value="test" onClick={testid}/>
            
        </div>
    )
}