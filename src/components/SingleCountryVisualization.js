import {Line} from "react-chartjs-2";
import React from "react";

const SingleCountryVisualization = ({ singleCountry, singleCountryData }) => (
    <>
        <div className={"chart-title"}>Energy production and consumption for {singleCountry}</div>
        <Line data={singleCountryData} />
    </>
);

export default SingleCountryVisualization;