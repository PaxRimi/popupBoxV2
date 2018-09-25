import React from "react";

class Box extends React.Component{
    constructor(props){
        super(props);

        const newDate = Date.parse(new Date());
        const oldDate = Number(localStorage.getItem("GDPR_lastVisit"));

        this.state = {
            oldDate: oldDate,
            newDate: newDate,
            hours24: 24*60*60*1000,
            createBox: false,
        }
    }

    handleBtnClick = e => {

        document.querySelector('body').style.overflow = "scroll";

        localStorage.setItem("GDPR_answer", e.currentTarget.innerText);

        localStorage.setItem("GDPR_lastVisit", this.state.newDate);

        let actualDate = Number(localStorage.getItem("GDPR_lastVisit"));

        this.setState({
           createBox: false,
           oldDate: actualDate,
        });
    };

    render(){

        let boxStyle = {
            boxSizing:"border-box",
            width:"600px",
            height:"300px",
            padding:"15px",
            color:"white",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"space-between",
            backgroundColor:"rgba(0, 0, 0, 0.4)",
            position:"fixed",
            top:"50%",
            left:"50%",
            margin:"-150px 0 0 -300px",
            zIndex:"10",
        };

        let btnContainer = {
            width:"70%",
            display:"flex",
            justifyContent:"space-between",
        };

        let btnAccept = {
            backgroundColor:"green",
            padding:"10px 15px",
        };

        let btnCancel = {
            backgroundColor:"red",
            padding:"10px 15px",
        };

        let box;


        let {oldDate,newDate,hours24,createBox} = this.state;


        if( oldDate === null || newDate - oldDate > hours24 ){
            createBox = true;
        }

        if ( createBox === false) {
            box = null;
        } else {
            document.querySelector('body').style.overflow = "hidden";
            localStorage.removeItem("GDPR_answer");
            localStorage.removeItem("GDPR_lastVisit");

            box = <div style={boxStyle}>
                <h1>GDPR consent</h1>
                <div style={btnContainer}>
                    <button style={btnAccept} onClick={this.handleBtnClick}>Accept</button>
                    <button style={btnCancel} onClick={this.handleBtnClick}>Cancel</button>
                </div>
                </div>
        }

        return <div>
                {box}
            </div>
    }
}

export default Box;