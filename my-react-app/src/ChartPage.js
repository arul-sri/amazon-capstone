import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie } from 'recharts'; // Import components from Recharts

import './css/Fonts.css';
import './css/FileSelect.css';
import "./css/requirements.css";
import "./css/ExamplePhotos.css";
import "./css/warningPopup.css";
import "./css/Email.css";

import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const colors = [
  '#4C8E7D',
  '#363AB9',
  '#4C7F31',
  '#FF9900',
  '#146EB4',
  '#232F3E',
  '#D94B7B',
  '#D44643',
  '#623EBE',
  '#000000'
];

const shortened_labels = {
  "Labels" : [
    {Name : 'Caps/Hats', requirementName : 'Avoid caps and hats'},
    {Name : 'Shadows', requirementName : 'Photo is properly exposed with no shadows'},
    {Name : 'White Background', requirementName : 'Background of the photo should be white'},
    {Name : 'Centered', requirementName : 'Person is centered in the image'},
    {Name : 'Look Straight', requirementName : 'Look straight into the camera'},
    {Name : 'Sunglasses', requirementName : 'Avoid sunglasses'},
    {Name : 'Pic of Pic', requirementName : 'Avoid taking a photograph of another photograph'},
    {Name : 'Top Head Mid Chest', requirementName : 'Include top of head to mid chest'},
    {Name : 'Head tilt', requirementName : 'Avoid tilting your head up'},
    {Name : 'Cropped', requirementName : 'Avoid cropping from a larger image'}
  ]
};


const docClient = new AWS.DynamoDB.DocumentClient();

const ChartPage = () => {
    const [chartData, setChartData] = useState([]);
    const [chartType, setChartType] = useState('bar'); // Default chart type is bar chart

    const createChartData = async (tableName) => {
        var dataList = [];
        const params = {
            TableName: tableName,
        };

        try {
            const data = await docClient.scan(params).promise();
            console.log("Data Items: ", data.Items);
            const list_loop = data.Items;
            console.log("current output: ", list_loop);
            var counter = 0;
            list_loop.forEach(pair => {
                const oldName = pair.requirementName;
                const Count = +pair.inaccuracyCount;
                const newName = shortened_labels.Labels.find(item => item.requirementName === oldName);
                var dataPair = { name: newName.Name, value: Count, fill: colors[counter] }; // Recharts uses 'name' and 'value' keys
                dataList.push(dataPair);
                counter++;
            });
            console.log("Chart Data: ", dataList);
            setChartData(dataList);
        } catch (error) {
            console.error("Unable to scan items. Error JSON:", JSON.stringify(error, null, 2));
            throw error;
        }
    };

    useEffect(() => {
        createChartData('requirementsAccuracy');
    }, []);

    const handleChartTypeChange = (type) => {
        setChartType(type);
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <BarChart
                        width={800}
                        height={600}
                        data={chartData}
                        margin={{ left: 50, right: 50, top: 20, bottom: 200 }} // Adjust left margin to provide space for rotated labels

                    >
                        <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0}/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="fill" />
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart width={800} height={300}>
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label/>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <h2>Inaccurate Rejections of Requirements by Rekognition Model</h2>
            <p>The figure below displays each requirement and the number of times an admin has overridden
              the models rejection of that requirement to submit the image to be used as a badge.
            </p>
            <p>Our hope is to use this data to find weak points in our model, so we can target those areas and 
              increase the accuracy of our model.
            </p>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="chartType">Select Chart Type:</label>
                <select id="chartType" value={chartType} onChange={(e) => handleChartTypeChange(e.target.value)}>
                    <option value="bar">Bar Chart</option>
                    <option value="pie">Pie Chart</option>
                </select>
            </div>
            {renderChart()}
        </div>
    );
};

export default ChartPage;


