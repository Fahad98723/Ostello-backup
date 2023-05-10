import React from "react";

const RightContent = () => {

  const sharesData = [
  //  { id:'1', courseName : '', purchaseBy:'', date : '', time: '', percentage:0, cost:0, rs:0},
  //  { id:'2', courseName : '', purchaseBy:'', date : '', time: '', percentage:0, cost:0,rs:0},
  //  { id:'3', courseName : '', purchaseBy:'', date : '', time: '', percentage:0, cost:0, rs:0},
  ]

  const taxesData = [
  //  { id:'1', courseName : '', purchaseBy:'', date : '', time: '', percentage:0, cost:0,rs:0},
  //  { id:'2', courseName : '', purchaseBy:'', date : '', time: '', percentage:0, cost:0, rs:0},
  //  { id:'3', courseName : '', purchaseBy:'', date : '', time: '', percentage:0, cost:0, rs:0},
  ]
  return (
    <div className="grid grid-cols-6 md:gap-4">
      <div className=" bg-white p-4 rounded-2xl col-span-6 lg:col-span-6 md:col-span-3">
        <div className="flex mb-3 justify-between">
          <p style={{ fontWeight: "700", fontSize: "20px" }}>Ostello Share</p>

          <div className="select-dropdown">
          <select>
            <option className="option" value="Option 1">Last Month</option>
            <option className="option" value="Option 2">Current Month</option>
          </select>
        </div>

        </div>
        <div className="shares" style={{minHeight:'180px'}}>
        {
          sharesData.map((s,idx) => <div key={idx} className="share flex justify-between items-center mt-5 px-2">
          <div className="flex">
          <img src={''} className="share-image" alt="" />
          <div className="texts ml-4">
            <h2 className="text-sm">
             {s.courseName}
              </h2>
            <h3 className="text-xs" style={{ color: "#8E8E8E", }}>
              Purchase By {s.purchaseBy}
            </h3>
            <h4 className="text-xs font-bold">
              {`${s.date} at ${s.time}`}
              </h4>
          </div>
          </div>
          <div className="texts">
          <h2 className="text-2xl text-right sm:text-3xl font-bold">₹ {s.cost}</h2>
           <h3 className="price-rs text-sm ">{s.percentage}% of RS.{s.rs}</h3>
          </div>
        </div>).slice(0,3)
        }
        </div>
        <div className="see-all text-right">
        <p className="text-xs  text-cyan-500 btn">See All</p>
        </div>
         
      </div>
      <div className=" bg-white p-4 rounded-2xl mt-4 md:mt-0 col-span-6 lg:col-span-6 md:col-span-3 ">
        <div className="flex mb-3 justify-between">
          <p style={{ fontWeight: "700", fontSize: "20px" }}>Taxes</p>

          <div className="select-dropdown">
          <select>
            <option className="option" value="Option 1">Last Month</option>
            <option className="option" value="Option 2">Current Month</option>
          </select>
        </div>

        </div>
        <div style={{minHeight:'180px'}} className="shares">
       {
         taxesData.map((t,idx) =>  <div key={idx} className="share flex justify-between items-center mt-5 px-2">
         <div className="flex">
         <img src={''} className="share-image" alt="" />
         <div className="texts ml-4">
           <h2 className="text-sm">
           {t.courseName}
             </h2>
           <h3 className="text-xs" style={{ color: "#8E8E8E", }}>
           Purchase By {t.purchaseBy}
           </h3>
           <h4 className="text-xs font-bold">
           {`${t.date} at ${t.time}`}
             </h4>
         </div>
         </div>
         <div className="texts">
           <h2 className="text-2xl text-right sm:text-3xl font-bold">₹ {t.cost}</h2>
           <h3 className="price-rs text-sm ">{t.percentage}% of RS.{t.rs}</h3>
         </div>
       </div>).slice(0,3)
       }
        </div>
        <div className="see-all text-right">
        <p className="text-xs  text-cyan-500 btn">See All</p>
        </div>
         
      </div>
    </div>
  );
};

export default RightContent;
