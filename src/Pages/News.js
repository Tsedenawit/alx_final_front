import { Carousel } from "react-bootstrap";
export default function News(){
return(
    <div>
      <div className="max-w-[60%] shadow-lg mr-auto ml-auto bg-gray-200 rounded-md mt-[100px] mb-[70px] " >
            <div className="flex ml-[5px] justify-between">
                <img src="../images/logo.jpg" className="busimg"></img>
                <h2 className="mt-[5px] text-2xl ml-[10px]">Habesha Bus</h2>  
                <div className="flex "> 
                <h2 className="flex-end mr-[10px]">150 Birr</h2></div>
               
            </div>
            <h3 className="ml-[15px]">5 hours</h3>
            <hr></hr>
            <div className="flex justify-evenly">
                <h2>Dep <br></br> 3:00pm</h2>
                <h2 className="pt-[15px]">14 seats available</h2>
                <h2>Arr <br></br> 9:00pm </h2>
            </div>
            </div>
</div>
)


}