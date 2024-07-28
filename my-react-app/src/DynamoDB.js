// going to have a put item
// delete item
// update item
// and query function

import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

const docClient = new AWS.DynamoDB.DocumentClient();



// Function to get an item from DynamoDB
const getItem = async (tableName, key) => {
    const params = {
      TableName: tableName,
      Key: key,
    };
  
    try {
      const data = await docClient.get(params).promise();
      console.log("Data returned from getItem:", data);
      console.log("Item retrieved:", data.Item);
      return data.Item;
    } catch (error) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const putItem = async (tableName, item) => {
    const params = {
      TableName: tableName,
      Item: item,
    };
  
    try {
      await docClient.put(params).promise();
      console.log("Item successfully added to DynamoDB:", JSON.stringify(item));
    } catch (error) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const deleteItem = async (tableName, key) => {
    const params = {
      TableName: tableName,
      Key: key,
    };
  
    try {
      await docClient.delete(params).promise();
      console.log("Item successfully deleted from DynamoDB:", JSON.stringify(key));
    } catch (error) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const queryItems = async (tableName, queryParams) => {
    const params = {
      TableName: tableName,
      ...queryParams,
    };
  
    try {
      const data = await docClient.query(params).promise();
      console.log("QUERY: ", data.Items[0]);
      return data.Items[0];

    } catch (error) {
      console.error("Unable to query items. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const queryUnmetRequirements = async (tableName, queryParams) => {
    const params = {
      TableName: tableName,
      ...queryParams,
    };
  
    try {
      const data = await docClient.query(params).promise();
    //   console.log("QUERY: ", data.Items[0].unmet_requirements);
      const requirements_list = data.Items[0].unmet_requirements;
      return requirements_list;

    } catch (error) {
      console.error("Unable to query items. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const scanItems = async (tableName) => {
    const params = {
      TableName: tableName,
    };
  
    try {
      const data = await docClient.scan(params).promise();
      console.log("Data Items: ", data.Items);
      return data.Items;
    } catch (error) {
      console.error("Unable to scan items. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const updateItem = async (tableName, key, updateExpression, expressionAttributeValues) => {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW" // Return all attributes of the item after the update
    };
  
    try {
      const data = await docClient.update(params).promise();
      console.log("Item successfully updated in DynamoDB:", JSON.stringify(data.Attributes));
      return data.Attributes;
    } catch (error) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(error, null, 2));
      throw error;
    }
  };

const createChartData = async (tableName) => {
  var dataList = [];
  const params = {
    TableName: tableName,
  };

  try {
    const data = await docClient.scan(params).promise();
    console.log("Data Items: ", data.Items);
    const list_loop = data.Items;
    list_loop.forEach(pair => {
      // const {Name, Count} = pair;
      const Name = pair.requirementName;
      const Count = +pair.inaccuracyCount;
      var dataPair = {x : Name, y : Count};
      dataList.push(dataPair);
    
    })
    // return data.Items;
    console.log("CHart DData: ", dataList);
    return dataList;
  } catch (error) {
    console.error("Unable to scan items. Error JSON:", JSON.stringify(error, null, 2));
    throw error;
  }
};
  


  export {getItem, putItem, deleteItem, queryItems, scanItems, queryUnmetRequirements, updateItem, createChartData };