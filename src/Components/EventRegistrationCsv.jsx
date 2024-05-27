import React from 'react';
import JsonToCsv from 'react-json-to-csv';

const EventRegistrationCsv = ({ data }) => {
  // Extracting relevant data from the response
  console.log(data);
  const csvData = data?.map(item => ({
    Class: item?.className,
    Name: item?.fullName,
    Club: item?.clubName,
    Score: 0
  }));
console.log(csvData);
  // Rendering the JsonToCsv component with the extracted data and headers
  return (
    <JsonToCsv
      data={csvData}
      filename={`${data[0]?.event?.eventName ? data[0]?.event?.eventName : "event"}_registrations_list.csv`}
      fields={['Class', 'Name', 'Club', 'Score']}
      style={{ //pass other props, like styles
        boxShadow:"inset 0px 1px 0px 0px #FA1131",
        background:"linear-gradient(to bottom, #FA1131 5%, #FA1131 100%)",
        backgroundColor:"#FA1131",
        borderRadius:"6px",
        border:"1px solid #FA1131",
        display:"inline-block",
        cursor:"pointer","color":"#ffffff",
        fontSize:"15px",
        fontWeight:"bold",
        padding:"6px 24px",
        textDecoration:"none",
        textShadow:"0px 1px 0px #FA1131"
        }}
    />
  );
};

export default EventRegistrationCsv;

