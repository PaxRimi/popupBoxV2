import React from "react";


class Box extends React.Component{
    constructor(props){
        super(props);

        const newDate = new Date();

        this.state = {
            oldYear: localStorage.getItem("newYear"),
            oldMonth: localStorage.getItem("newMonth"),
            oldDay: localStorage.getItem("newDay"),
            oldHour: localStorage.getItem("newHour"),
            oldMin: localStorage.getItem("newMin"),
            actualYear: newDate.getFullYear(),
            actualMonth: newDate.getMonth()+1,
            actualDay: newDate.getDate(),
            actualHour: newDate.getHours(),
            actualMin: newDate.getMinutes(),
            createBox: false,
        }
    }

    handleBtnClick = e => {

        document.querySelector('body').style.overflow = "scroll";

        localStorage.setItem("answer", e.currentTarget.innerText);

        localStorage.setItem("newYear", this.state.actualYear);
        localStorage.setItem("newMonth", this.state.actualMonth);
        localStorage.setItem("newDay", this.state.actualDay);
        localStorage.setItem("newHour", this.state.actualHour);
        localStorage.setItem("newMin", this.state.actualMin);

        this.setState({
           createBox: false,
           oldYear: localStorage.getItem("newYear"),
           oldMonth: localStorage.getItem("newMonth"),
           oldDay: localStorage.getItem("newDay"),
           oldHour: localStorage.getItem("newHour"),
           oldMin: localStorage.getItem("newMin"),
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


        let {oldYear,oldMonth,oldDay,oldHour,oldMin,actualYear,actualMonth,actualDay,actualHour,actualMin,createBox} = this.state;

        console.log(oldYear);
        console.log(oldMonth);
        console.log(oldDay);
        console.log(oldHour);
        console.log(oldMin);
        console.log(localStorage.getItem("answer"));

        if( oldYear === null || actualYear - oldYear > 0 ){
            createBox = true;
        } else if ( actualMonth - oldMonth > 0) {
            createBox = true;
        } else if( actualDay - oldDay > 1){
            createBox = true;
        } else if (actualDay - oldDay === 1 ){
            if( actualHour - oldHour > 0){
                createBox = true;
            } else if ( actualHour - oldHour === 0 ) {
                if ( actualMin - oldMin > 0){
                    createBox = true;
                }
            }
        }

        if ( createBox === false) {
            box = null;
        } else {
            document.querySelector('body').style.overflow = "hidden";
            localStorage.clear();

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