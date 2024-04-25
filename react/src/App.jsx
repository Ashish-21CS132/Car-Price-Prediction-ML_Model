import React, { useEffect, useState } from 'react'; // Import React if not already imported

import {axiosclient} from "./axiosclient.jsx"
import axios from 'axios'

function App() {

  const [company,setcompany]=useState([]);
  const [carmodel,setcarmodel]=useState([]);
  const [year,setyear]=useState([]);
  const [fueltype,setfueltype]=useState([]);
  const [kmsdriven,setkmsdriven]=useState([]);
  const [pred,setpred]=useState('');

  // const [c_name,setc_name]=useState('');
  // const [c_model,setc_model]=useState('');

  // const [c_year,setc_year]=useState('');

  // const [c_fuel,setc_fuel]=useState('');
  // const [c_kms,setc_kms]=useState('');

  const [data,setdata] = useState({
    c_name:"",
    c_model:"",
    c_year:"",
    c_fuel:"",
    c_kms:""
  })



  useEffect(()=>{
    fetchdata();
  },[])
  
  const fetchdata=async()=>{
    try {
      const datas=await axios.get('http://127.0.0.1:5000/')
      console.log("ans",datas)
      setcompany(datas?.data?.company);
      setcarmodel(datas?.data?.car_models);
      setyear(datas?.data?.year);
      setfueltype(datas?.data?.fuel_type);
      setkmsdriven(datas?.data?.kms_driven);
    } catch (error) {

      console.log('error by ',error)
    }
  }

  const handlechange = (e) =>{
    setdata({...data,[e.target.name]:e.target.value})
  }

 async function handler(e){
  e.preventDefault();
  console.log("ans",data);
  try {
    const result=await axios.post('http://127.0.0.1:5000/predict',data,{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    setpred(result?.data?.prediction)
    console.log('result wala ',result);
  } catch (error) {
    console.log('errorwala ',error);
  }
 }

  return (
    <div className=" mx-auto ">
      {/* Header */}
      <div className="text-center text-3xl font-bold py-4 border-b-2 bg-slate-200">
        Car Price Predictor
      </div>
      
      {/* Form Section */}
      <div className="container mx-auto border border-blue-500 shadow-lg bg-white ">
        <form action="" className="flex flex-col gap-6 mt-4 mx-10 mb-4" onSubmit={handler}>
          {/* Select Company */}
          <div>
              <h1 className="text-2xl font-semibold text-center">Select the Company</h1>
              <select name="c_name" id="company" className="border border-blue-400 w-full bg-gray-200 mt-2 rounded-md p-2 focus:outline-none focus:border-blue-400" onChange={handlechange}>
                {
                  company?.map((item)=>(<option value={item}>{item}</option>))
                }
                
              </select>
          </div>

          {/* Select Model */}
          <div>
            <h1 className="text-2xl font-semibold text-center">Select the Model</h1>
            <select name="c_model" id="model" className="w-full bg-gray-200 mt-2 rounded-md p-2" onChange={handlechange}>
              {
                carmodel?.map((item)=>(<option value={item}>{item}</option>))
              }
              
             
            </select>
          </div>

          {/* Select Year of Purchase */}
          <div>
            <h1 className="text-2xl font-semibold text-center">Select the Year of Purchase</h1>
            <select name="c_year" id="year" className="w-full bg-gray-200 mt-2 rounded-md p-2" onChange={handlechange}>
              {
                year?.map((item)=>(<option value={item}>{item}</option>))
              }
              
             
            </select>
          </div>

          {/* Select Fuel Types */}
          <div>
            <h1 className="text-2xl font-semibold text-center">Select the Fuel Types</h1>
            <select name="c_fuel" id="fuel" className="w-full bg-gray-200 mt-2 rounded-md p-2" onChange={handlechange}>
            {
                fueltype?.map((item)=>(<option value={item}>{item}</option>))
              }
            </select>
          </div>

          {/* Enter the number of kms that the car has travelled */}
          <div>
            <h1 className="text-2xl font-semibold text-center">Enter the no of kms that the car has travelled</h1>
            <select name="c_kms" id="kms" className="w-full bg-gray-200 mt-2 rounded-md p-2" onChange={handlechange}>
            {
                kmsdriven?.map((item)=>(<option value={item}>{item}</option>))
              }
            </select>
          </div>
          <button className='btn btn-primary' type='submit'>button</button>
        </form>
      </div>
      <div className="text-4xl font-bold text-center mt-4">
      <div className="alert alert-success" role="alert">
      Predicted Price is: {pred}
</div>
      </div>
    </div>
  );
}

export default App;
