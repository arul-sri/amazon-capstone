import AWS from 'aws-sdk';

// import check_icon from './images/check_icon.png';
// import x_icon from './images/x_icon.png';
import dash_icon from './images/dash_icon.png';

// removing these from this for warnings for now: updateConfidenceCustom, updateCustomMap
import {beginning_map, updateConfidence } from './ConfidenceUpdating.js';
import { imageDimensions } from './s3.js';


// Rekognition call uses the IAM User "CapstoneImageUploader" defined in "s3.js"

// Grab a photo from the uploaded image s3 bucket
const bucket = 'capstone-cse498-image-upload-test'
// const photo = 'images/team-photo.jpg'

// Function sends the S3 object to Rekognitions Detect Labels model
// and returns an array of detected labels

var sunglassesStatusIcon = dash_icon;
var hatStatusIcon = dash_icon;
var warning = false;
var warning_type = '';


const detect_labels = (file, callback) => {
    // Set params
    const params = {
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: file
            },
        },
    };
    const rekognition = new AWS.Rekognition();

    // Call Rekognitions Detect Labels Model
    rekognition.detectLabels(params, function(err, data){
        if (err) console.log(err, err.stack);
        else 
            // process this data to ID if people in image and amount of people
            console.log("DATA BEFROE EVAL: ", data);
            
            evaluate_results(data);

            callback(data);
            // updateConfidence(data);
            // console.log("IMAGE INFO: ", image_info);
    });
    

};

// Function evaluates the data returned from Rekognition Detect Labels 
const evaluate_results = (image_data) => {

    // image info entires contain - label name : [confidence, instances]
    var image_info = {};
    let labelsDetected = [];

    console.log("UPLOADED PHOTO JSON DATA", image_data);
    
    image_data.Labels.forEach(label => {
        // Get labels name, confidence, and amount found
        var name = label['Name'];
        var confidence = label['Confidence'].toFixed(2);
        var instances = label['Instances'];
        var boundingBoxes = instances.map(instance => instance.BoundingBox);
        image_info[name] = {confidence, instances: instances.length, boundingBoxes};
        labelsDetected.push(`${name} (${confidence}%)`);
    });

    
    var minimum_requirements_met = true;
    // Check minimum requirements for a photo
    // If no person labeled or the confidence of label is less than 75%
    if ((!image_info.hasOwnProperty('Person')) || (image_info.hasOwnProperty('Person') && image_info['Person']['confidence'] < 75)){
        warning = true;
        warning_type = 'no person';
        minimum_requirements_met = false;
    } 
    // If there are multiple people
    else if (image_info['Person']['instances'] > 1){
        warning = true;
        warning_type = 'multiple people';
        minimum_requirements_met = false;
    }
    // If pets or other animals detected
    else if (image_info.hasOwnProperty('Animal')){
        warning = true;
        warning_type = 'animals';
        minimum_requirements_met = false;
    }

    if (minimum_requirements_met) {
        updateConfidence(image_data);
  
        // Full body detection
        // If these labels come up, it is most likely not an image of a person from shoulder and up
        var full_body_tags = ["Hand", "Finger", "Handbag", "Bracelet", "Skirt", "Sock", "Sitting", "Stomach", "Arm", "Glove", "Pants", "Belt", "Standing", "Jeans", "Shorts", "Shoe", "Footwear", "Long Sleeve", "Sleeve", "Backpack"];
        var full_body = false;
        for (const label in image_info) {
            // If any image labels are in full body labels break
            if (full_body_tags.includes(label)){
                // if full body set confidence to display x icon
                if (image_info[label]['confidence'] >= 50){
                    full_body = true;
                    beginning_map.Labels[1]['Confidence'] = 0;
                    break;
                }
            }
            // if detect labels detects headphones change the avoiding caps/hat to x icon
            if (label === "Headphones"){
                console.log(beginning_map.Labels[6]['Confidence'] = 0);
            }
        }
        // if not full body set confidence low to display check icon
        if (!full_body){beginning_map.Labels[1]['Confidence'] = 95;}

        try {
            var personBoundingBoxDict = image_info['Person']['boundingBoxes'][0];

            // image dimensions
            // const image_width = imageDimensions.width;
            // const image_height = imageDimensions['height'];
            // console.log("IMAGE SIZE: width ", image_width, "height ", image_height);
    
            // person bounding box coordinates
            // Scale coordinates from 0 to 100
            const person_width = personBoundingBoxDict['Width'] * 100;
            const person_top = personBoundingBoxDict['Top'] * 100;
            const person_left = personBoundingBoxDict['Left'] * 100;
            const person_height = personBoundingBoxDict['Height'] * 100;

            const person_right = (person_left + person_width);
    
            // left side of image = 0 right side = 100
            var distanceFromLeftSide = person_left;
            var distanceFromRightSide = 100 - person_right;
            console.log( " person left ", person_left, " person right ", person_right);
            console.log("Distance from left side of image ", distanceFromLeftSide, " Distance from right side of image ", distanceFromRightSide);
            const difference = Math.abs(distanceFromLeftSide - distanceFromRightSide);

            const differenceThreshold = 10;
            // vertical centering
            const distanceFromTop = person_top;
            const heightThreshold = person_height;
            console.log("Top :", distanceFromTop, "  Height :", heightThreshold);
            if (distanceFromTop <= 1.0){
                console.log("Reached");
                beginning_map.Labels[2]['Confidence'] = 0;
            }else if(heightThreshold <= 60.0){
                beginning_map.Labels[2]['Confidence'] = 0;
            }  
            // if the difference between the center of the person to the left and right sides of the images is greater
            // than 10% of the image width change to x icon
            // 10% is just a guess number this can be changed for higher/lower precision
            else if (difference > differenceThreshold){
                beginning_map.Labels[2]['Confidence'] = 0;
            }else{beginning_map.Labels[2]['Confidence'] = 90;}
        } 
        catch {
            beginning_map.Labels[2]['Confidence'] = 0;
        }
    }

};

function calculateAverageConfidence(responseData) {
    // Extract the custom_labels array from the responseData object
    const customLabels = responseData.custom_labels;
  
    // var newResponseLabel = {"custom_labels" : []}
    var newResponseList = []
  
    // Iterate over the custom_labels array
    customLabels.forEach(item => {
      var { Name, Confidence } = item;
      var confidence = parseFloat(Confidence);
      const averageConfidenceByLabel = {};
      var checker = true;

     
      // Check if the label already exists in the dictionary
      

      if(newResponseList){
        newResponseList.forEach(item => {
            // item is gonna be a dictionary of the {"Name" : value, "Confidence" : value}
            // i want to see if the Name is already in the list
            if (item["Name"] === Name){
                checker = false;
            }
        })
      }
      else {
        averageConfidenceByLabel["Name"] = Name;

        averageConfidenceByLabel["Confidence"] = +confidence;
        newResponseList.push(averageConfidenceByLabel);
        
      }
      if(checker) {
        averageConfidenceByLabel["Name"] = Name;

        averageConfidenceByLabel["Confidence"] = +confidence;
        newResponseList.push(averageConfidenceByLabel);
      }
      
      
      console.log("avg confidence by label: ", averageConfidenceByLabel);
      
     
      console.log("Response List: ", newResponseList);

      
    });


    var newResponseLabel = {"custom_labels" : newResponseList};

  


    console.log("Averages: " ,newResponseLabel);

  
    return newResponseLabel;
};

const setWarning = () => {
    if (warning) {
        warning = false;
        warning_type = '';
    } else {
        warning = true;
    }
};

// making a function that will use the detected labels to test for sunglasses or hats

export { detect_labels, evaluate_results, calculateAverageConfidence, sunglassesStatusIcon, hatStatusIcon, warning, setWarning, warning_type };