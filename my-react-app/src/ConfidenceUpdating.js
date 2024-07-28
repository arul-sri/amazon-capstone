// just adding some label mapping notes before i start trying to code it
// custom labels:
// blurry --> goes with proper exposure and blurry
// off center --> goes with centered and shoulders up
// PicOfPic --> goes with avoid pictures of a picture
// religious attire --> checks if it might be religious attire if hat shows up
// shadow --> goes with shadows
var beginning_map = {
    "Labels": [
        {"Name":"look straight", "Confidence": -1, "Description" : "Look straight into the camera"},
        {"Name":"top of head", "Confidence": -1, "Description" : "Include top of head to mid chest"},
        {"Name": "off center", "Confidence": -1, "Description" : "Person is centered in the image"},
        {"Name":"white background", "Confidence": -1, "Description" : "Background of the photo should be white"},
        {"Name":"shadow", "Confidence": -1, "Description" : "Photo is properly exposed with no shadows"},
        {"Name":"Sunglasses", "Confidence": -1, "Description" : "Avoid sunglasses"},
        {"Name":"Hat", "Confidence": -1, "Description" : "Avoid caps and hats"},
        {"Name":"head tilt", "Confidence": -1, "Description" : "Avoid tilting your head"}
    ]
}

// make another map that just has all of the labels for custom labels 
var custom_map = {
    "Labels": [
        {"Name":"badBackground","Confidence": -1},
        {"Name":"hat","Confidence": -1},
        {"Name":"head tilt","Confidence": -1},
        {"Name":"hood","Confidence": -1},
        {"Name":"lookingAtCamera","Confidence": -1},
        {"Name":"notLookingAtCamera","Confidence": -1},
        {"Name":"religious attire","Confidence": -1},
        {"Name":"shadow","Confidence": -1},
        {"Name":"white background","Confidence": -1},
        {"Name":"hood","Confidence": -1}
    ]
}

const updateCustomMap = (responseData) => {
    const customLabels = responseData.custom_labels;



    customLabels.forEach(label => {
        var name = label['Name'];
        var confidence = +label['Confidence'].toFixed(2);


        const existingLabel = custom_map.Labels.find(item => item.Name === name);
        
        if (existingLabel) {
            existingLabel.Confidence = confidence;
        }
    });


    console.log("Custom map; ", custom_map);



}

const updateConfidence = (responseData) => {
    // loop_map = map["Labels"]
    const customLabels = responseData.Labels;

    customLabels.forEach(label => {
        var name = label['Name'];
        var confidence = label['Confidence'].toFixed(2);
        // confidence = -1 * confidence;
        confidence = 100 - confidence;
        // const confidence = parseFloat(Confidence);
        const existingLabel = beginning_map.Labels.find(item => item.Name === name);

    // If the label exists in the beginning_map, update its confidence
        if (existingLabel) {
        existingLabel.Confidence = confidence;
    }

    const hatLabel = customLabels.find(item => item.Name === "Hat");
    const sunglassesLabel = customLabels.find(item => item.Name === "Sunglasses");
    if(!hatLabel) {
        const updateHat = beginning_map.Labels.find(item=>item.Name === "Hat");
        updateHat.Confidence = 100;
    }
    if(!sunglassesLabel) {
        const updateSunnies = beginning_map.Labels.find(item=>item.Name === "Sunglasses");
        updateSunnies.Confidence = 100;
    }

    
    }



    );
};

const updateConfidenceCustom = (responseData) => {
    // loop_map = map["Labels"]
    const customLabels = responseData.custom_labels;
    updateCustomMap(responseData);

    customLabels.forEach(label => {
        var name = label['Name'];
        var confidence = label['Confidence'].toFixed(2);
        // const confidence = parseFloat(Confidence);
        const existingLabel = beginning_map.Labels.find(item => item.Name === name);
        

    // If the label exists in the beginning_map, update its confidence
        if (existingLabel) {
            existingLabel.Confidence = +confidence;
    }
    }
    );
    console.log("Before white background logic: ", beginning_map);

    // white background logic
    const badBackground = custom_map.Labels.find(item => item.Name === 'badBackground');
    const whiteBackground = custom_map.Labels.find(item => item.Name === 'white background');
    // if neither are returned
    if (badBackground.Confidence === -1 && whiteBackground.Confidence === -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'white background');
        if (existingLabel){
            existingLabel.Confidence = 0;
        }
    }
    // if only white bg is returned
    else if(badBackground.Confidence === -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'white background');
        if (existingLabel){
            existingLabel.Confidence = whiteBackground.Confidence;
        }
    }
    // if only bad bg returned
    else if(whiteBackground.Confidence === -1){
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'white background');
        if (existingLabel){
            existingLabel.Confidence = 0;
        }
    }
    // if both are returned
    else if (badBackground.Confidence !== -1 && whiteBackground.Confidence !== -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'white background');
        if (existingLabel){
            existingLabel.Confidence = 100 - badBackground.Confidence;
        }
    }

    // head tilt requirements
    const headTilt = custom_map.Labels.find(item => item.Name === 'head tilt');
    if(headTilt.Confidence === -1){
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'head tilt');
        existingLabel.Confidence = 100;
    }
    else {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'head tilt');
        existingLabel.Confidence = 100 - headTilt.Confidence;
    }

    // shadows requirements
    const shadow = custom_map.Labels.find(item => item.Name === 'shadow');
    if(shadow.Confidence === -1){
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'shadow');
        existingLabel.Confidence = 100;
    }
    else {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'shadow');
        existingLabel.Confidence = 100 - shadow.Confidence;
    }
    //Looking at camera
    const lookingAtCamera = custom_map.Labels.find(item => item.Name === 'lookingAtCamera');
    const notLookingAtCamera = custom_map.Labels.find(item => item.Name === 'notLookingAtCamera');

    // Logic? 
    // if neither show up in the return show a check
    if (lookingAtCamera.Confidence === -1 && notLookingAtCamera === -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'look straight');
        existingLabel.Confidence = 100;
    }
    // else if just notLookingAtCamera shows up in return 
    else if (lookingAtCamera.Confidence === -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'look straight');
        existingLabel.Confidence = 100 - notLookingAtCamera.Confidence;
    }
    // else if just lookingAtCamera shows up in return 
    else if (notLookingAtCamera.Confidence === -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'look straight');
        existingLabel.Confidence = lookingAtCamera.Confidence;
    }
    // else if both do
    else if (lookingAtCamera.Confidence !== -1 && notLookingAtCamera !== -1) {
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'look straight');
        existingLabel.Confidence = 100 - notLookingAtCamera.Confidence;
    }


    // for hood
    const hood = custom_map.Labels.find(item => item.Name === 'hood');
    if(hood.Confidence !== -1){
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'Hat');
        existingLabel.Confidence = 100 - hood.Confidence;
    }

    // for religious attire
    const religiousAttire = custom_map.Labels.find(item => item.Name === 'religious attire');
    if (religiousAttire.Confidence !== -1){
        const existingLabel = beginning_map.Labels.find(item => item.Name === 'Hat');
        existingLabel.Confidence = 100;
    }



    console.log("beginning map: ", beginning_map);

    



};

export {beginning_map, updateConfidence, updateConfidenceCustom, updateCustomMap, custom_map};

