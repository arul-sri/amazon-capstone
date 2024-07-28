import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { height } from "@mui/system";
import { useDropzone } from 'react-dropzone';

import amazonPicture from './images/amazon-image.png';
import check_icon from './images/check_icon.png';
import x_icon from './images/x_icon.png';
import dash_icon from './images/dash_icon.png';
import info_icon from './images/info_icon2.jpeg';

import empty_icon from './images/empty_icon.png';
import acceptable1 from './images/acceptable_1_2x.png';
import acceptable2 from './images/acceptable_4_2x.png';
import acceptable3 from './images/acceptable_wb.jpeg';
import unacceptable1 from './images/unacceptable_1_2x.png';
import unacceptable2 from './images/unacceptable_5_2x.png';
import unacceptable3 from './images/unacceptable_7_2x.png';

import acceptable_ex from './images/acceptable_example.png';
import shadows_ex from './images/shadows_example.png';
import photo_of_photo from './images/photo_of_photo_example.png';
import off_center from './images/off_center_example.png';
import hat_ex from './images/hat_example.png';
import head_tilt from './images/head_tilt_example.png';
import non_white_bg from './images/bg_color_example.png';
import emptyTemplateImage from './images/template_notext.jpg';

import Layout from './layout.jsx';
import Warning from './warning.jsx';
import './css/Fonts.css';
import './css/FileSelect.css';
import "./css/requirements.css";
import "./css/ExamplePhotos.css";
import "./css/warningPopup.css";

import { uploadToS3, downloadAllImagesFromS3, deleteImageFromS3 } from './s3.js';
import { detect_labels, evaluate_results, calculateAverageConfidence, sunglassesStatusIcon, hatStatusIcon, warning, setWarning, warning_type } from './labelDetection.js';
import { get_test_data } from './testJSON.js';
import { beginning_map, updateConfidence, updateConfidenceCustom, custom_map } from './ConfidenceUpdating.js';
import { getItem, putItem, deleteItem, queryItems, scanItems } from './DynamoDB.js';


function Homepage() {
  // Redirect out if not logged in as a user
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'user';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const userEmail = localStorage.getItem('userEmail');
  console.log(userEmail);
  const [selectedImage, setSelectedImage] = useState('');
  
  const [fileName, setFileName] = useState('');

  // keep the uploaded file info after callback
  const [imageInfo, setImageInfo] = useState('');

  var successful_requirement_count = 0;
  // for the dialog
  const [openDialog, setDialogOpen] = useState(false);

  const [detectedLabels, setDetectedLabels] = useState(null);

  const [statusIcon, setStatusIcon] = useState(dash_icon);

  const [statusSunglassesIcon, setStatusSunglassesIcon] = useState(dash_icon);

  const [statusHatIcon, setStatusHatIcon] = useState(dash_icon);

  const [boundingBoxes, setBoundingBoxes] = useState([]);

  const canvasRef = useRef(null);

  var unmet_requirements_list = [];

  // for no peron warning popup
  const [isNoPersonWarningOpen, setIsNoPersonWarningOpen] = useState(false);
  // for multiple people warning popup
  const [isMultiplePeopleWarningOpen, setIsMultiplePeopleWarningOpen] = useState(false);
  // for animals in photo warning
  const [isAnimalsWarningOpen, setIsAnimalsWarningOpen] = useState(false);

  const [isSubmittedForReview, setIsSubmittedForReview] = useState(false);

  const [isSubmittedForSuccess, setIsSubmittedForSuccess] = useState(false);

  const [reviewDescription, setReviewDescription] = useState('');

  const [isInvalidImageTypeOpen, setInvalidImageType] = useState(false);

  const [isBadResponseOpen, setBadResponseOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // const [forReview, setForReview] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && isImageFile(selectedFile)) {
      setSelectedImage(selectedFile);
      console.log('Selected image set:', selectedFile);
      setBoundingBoxes([]);
      displaySelectedImage(selectedFile);
      setImageInfo(selectedFile);
      handleUpload(selectedFile);
    } else {
      openInvalidImageType();
    }
  };

  const resetSelectionAndIcons = () => {
    //setSelectedImage(null);
    setStatusIcon(dash_icon);
    setStatusSunglassesIcon(dash_icon);
    setStatusHatIcon(dash_icon);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file in handleFileInputChange:', selectedFile);
    if (selectedFile && isImageFile(selectedFile)) {
      setSelectedImage(selectedFile);
      handleUpload(selectedFile);
    } else {
      openInvalidImageType();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
    onDrop,
    multiple: false,
  });

  const isImageFile = (file) => {
    const imageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'];
    return imageTypes.includes(file.type);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  // Changing state for warning popups
  const openNoPersonWarning = () => {
    setIsNoPersonWarningOpen(true);
  };
  const closeNoPersonWarning = () => {
    setIsNoPersonWarningOpen(false);
  };
  const openMultiplePeopleWarning = () => {
    setIsMultiplePeopleWarningOpen(true);
  };
  const closeMultiplePeopleWarning = () => {
    setIsMultiplePeopleWarningOpen(false);
  };
  const openAnimalsWarning = () => {
    setIsAnimalsWarningOpen(true);
  };
  const closeAnimalsWarning = () => {
    setIsAnimalsWarningOpen(false);
  };

  const openInvalidImageType = () => {
    setInvalidImageType(true);
  };

  const closeInvalidImageType = () => {
    setInvalidImageType(false);
  };

  const openBadResponse = () => {
    setBadResponseOpen(true);
  };

  const closeBadResponse = () => {
    setBadResponseOpen(false);
  };

  const closeSubmittedForReview = () => {
    setIsSubmittedForReview(false);
  };
  const closeSubmittedForSuccess = () => {
    setIsSubmittedForSuccess(false);
  }
    // Monitor changes of warning variable state
    useEffect(() => {
      if (warning) {
        if (warning_type === 'no person') {
          openNoPersonWarning();
        } else if (warning_type === 'multiple people') {
          openMultiplePeopleWarning();
        } else if (warning_type === 'animals') {
          openAnimalsWarning();
        }
        setWarning(false); // Reset the warning state after opening the modal
      }
    }, [warning]);

  /* Check console for successful upload */
  const handleUploadSuccess = async (key) => {
    console.log('Image uploaded successfully!');
    setLoading(true);
    // If the photo has been successfully uploaded to the S3 bucket
    // We can use Rekognition to get infomation about the photo
    setStatusIcon(check_icon);
    // detect_labels(key, resetSelectionAndIcons);
    detect_labels(key, (data) => {
      resetSelectionAndIcons();
      console.log("DETECT LABEL WORKS!")
      // Assuming 'data' contains the bounding box information
      // Update state with bounding box data
      const boxes = data.Labels.flatMap(label => label.Instances.map(instance => instance.BoundingBox));
      setBoundingBoxes(boxes);
      console.log("LOOK HERE", boxes);
    });

    try {
      const response = await fetch('https://ta7kvhbtk9.execute-api.us-east-2.amazonaws.com/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // setLambdaResponse(data);
      const averageConfidence = calculateAverageConfidence(data);
      updateConfidenceCustom(averageConfidence);
      console.log("NEW RESPONSE FOR LAMBDA: ", averageConfidence);
      console.log("LAMBDA RESPONSE: ", data);
    } catch (error) {
      // alert("AWS cannot process your image at this time, please try again.")
      openBadResponse();
      console.error('Error fetching data:', error);
    }finally {
      // Always set loading state to false, whether successful or not
      setLoading(false);
    }


  };


  /* Uploads the selected image to S3 */
  const handleUpload = async (selectedImage, forReview = false, forSuccess = false) => {
    beginning_map.Labels.forEach(item => {
      item.Confidence = -1;

    });

    custom_map.Labels.forEach(item => {
      item.Confidence = -1;
    })

    var buttonOne = document.getElementById("submitForReview");
    buttonOne.style.display = "none";
    var buttonTwo = document.getElementById("submitSuccess");
    buttonTwo.style.display = "none";
    console.log('Selected image before upload:', selectedImage);
    // Generate UUID to randomize name of the file so it doesn't overwrite other files
    const uniqueFileName = uuidv4();
    // Generate the filename with the original file extension
    setFileName(`${uniqueFileName}.${selectedImage.name.split('.').pop()}`);
    // unmet_requirements_list = [];
    // Get the file name
    var name_of_file = selectedImage.name.split('.')[0];
    if (name_of_file.length >= 18) {
      var name_substring = name_of_file.substring(0, 18);
      if (name_substring === 'amazon_test_photo_') {
        console.log("THIS IS A TEST PHOTO IT IS NOT UPLOADED TO S3 AND DOES NOT CALL REKOGNITION");
        var json_info = get_test_data(name_of_file);
        if (json_info) {
          evaluate_results(json_info);
        }
        else {
          console.log("Test Data needs to be updated. The JSON data needs to be added to testJSON");
        }
      }
    }
    else {
      if (selectedImage) {
        setStatusIcon(dash_icon);
        setStatusSunglassesIcon(dash_icon);
        setStatusHatIcon(dash_icon);
        if (forReview) {
          try {
            console.log("For Review Value: ", forReview);
            const bucketName = 'cse-498-capstone-submit-for-review-images';
            const key = `images/${fileName}`;
            await uploadToS3(selectedImage, bucketName, key);
            console.log('Upload to review successful!');
            // setForReview(false);
            // handleUploadSuccess(key);
          } catch (error) {
            console.error('Error uploading to S3:', error);
            setStatusIcon(x_icon);
          }
        }
        else if (forSuccess) {
          try {
            console.log("For Review Value: ", forReview);
            const bucketName = 'valid-badge-photos';
            const key = `images/${fileName}`;
            await uploadToS3(selectedImage, bucketName, key);
            console.log('Upload to review successful!');
            // setForReview(false);
            // handleUploadSuccess(key);
          } catch (error) {
            console.error('Error uploading to S3:', error);
            setStatusIcon(x_icon);
          }
        }
        else {
          try {
            const bucketName = 'capstone-cse498-image-upload-test';
            const key = `images/${fileName}`;
            await uploadToS3(selectedImage, bucketName, key);
            console.log('Upload successful!');
            handleUploadSuccess(key);
          } catch (error) {
            console.error('Error uploading to S3:', error);
            setStatusIcon(x_icon);
          }
        }
        // need to make a button that appears when it isnt successful
        // this button will submit for review 
        // if it is successful then there will be a submit button that appears

        // this is just a practice to see if I can get the images into the other s3 bucket i made
        // we should change this to happen if they click like a submit for review button
        // but we need the submit for review button to show up when they do not pass all requirements
        // also need to change the name of it so that it wont replace other images

      }
      else {
        console.warn('No file selected');
        setStatusIcon(x_icon);
      }


    }
  };

  const submitForReviewPopup = () => {
    setIsSubmittedForReview(true);
  }

const submitForReview = () => {
  const forReview = true;
  handleUpload(selectedImage, forReview);
  const item = {
    image_id : "images/" + fileName,
    user_email : userEmail,
    unmet_requirements : unmet_requirements_list,
    description : reviewDescription
  }
  putItem('reviewImages', item);
  setIsSubmittedForReview(false);
};

const submitSuccess = () => {
  const forSuccess = true;
  handleUpload(selectedImage, false, forSuccess);
  setIsSubmittedForSuccess(true);
};

  // New function to display the image as soon as it's selected
  const displaySelectedImage = (imageFile) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);
    
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0);
      // Create badge template once there's an image
      const imageContainer = document.querySelector('.image-container');
      if (imageContainer) {
        imageContainer.style.backgroundImage = `url(${emptyTemplateImage})`;
        imageContainer.style.marginRight = '40px';
        imageContainer.style.marginLeft = '40px';
        imageContainer.style.boxShadow = '0 0 10px #e1ae48';
        imageContainer.style.borderRadius = '20px';
        imageContainer.style.backgroundSize = 'contain';
        imageContainer.style.backgroundPosition = 'center';
        imageContainer.style.maxWidth = '30vw';
        imageContainer.style.border = '0.4vw solid #f90';
      }
      const punchHole = document.querySelector('.punch-hole');
      if (punchHole) {
        punchHole.style.display = 'flex';
      }

    };
  };

  useEffect(() => {
    console.log('Effect running', selectedImage, boundingBoxes);
    if (!selectedImage || boundingBoxes.length === 0) {
      console.log('No image selected or no bounding boxes');
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = URL.createObjectURL(selectedImage);

    image.onload = () => {
      // Resize canvas to match image dimensions
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw bounding boxes
      boundingBoxes.forEach(box => {
        context.beginPath();
        context.rect(
          box.Left * canvas.width,
          box.Top * canvas.height,
          box.Width * canvas.width,
          box.Height * canvas.height
        );
        context.strokeStyle = 'red';
        // Adjust bounding box thickness depending on image size
        if(image.naturalWidth < 200){ context.lineWidth = 3; }
        else if(image.naturalWidth < 250){ context.lineWidth = 5; }
        else if(image.naturalWidth < 400){ context.lineWidth = 7; }
        else{ context.lineWidth = 10; }
        context.stroke();
      });
    };
  }, [selectedImage, boundingBoxes]);

  // };

  
    //     const existingLabel = beginning_map.Labels.find(item => item.Name === name);
  return (
    // Use layout.jsx display default header and footer
    // <Layout>
    <div>

      {/* Homepage Unique Content */}
      <div>
        <div className='welcome_statement'>
          <div className='welcome_text_container'>
            <h2 className="welcome_text">Welcome new hires! We look forward to seeing your contributions to the team!</h2>
            <h3 className="welcome_text_two">In preparation for your exciting first day, we invite you to pre-submit an image of yourself for your employee badge.</h3>
            <div className="example_container">
              <button className="info_icon" src={info_icon} alt="info_icon" onClick={handleDialogOpen}>Explore Examples</button> {/* Attach onClick event */}
            </div>
          </div>
        </div>
      </div>
      <section className="section-container">
        <div className={`${selectedImage ? '' : 'no-image'} image-container ${isDragActive ? 'drag-active' : ''}`} {...getRootProps()}>
          <input {...getInputProps()} accept=".jpg, .jpeg, .png, .gif, .bmp" />
          {!selectedImage && (
            <p>
              {isDragActive ?
                "Drop the photo here" :
                <>Drag & drop an image here, or <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>click this box to select one</span></>
              }
            </p>
          )}
          {/* {selectedImage && (
            <img ref={canvasRef} id="selectedImage" alt="Selected Image" src={URL.createObjectURL(selectedImage)} style={{ maxWidth: '500px', maxHeight: '500px' }}/>
          )} */}
          {selectedImage && (
            <>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', height: '100%', width: '100%', aspectRatio: 'auto' }}></canvas>
            <div className="punch-hole"></div>
            </>
          )}
        </div>
        <div id="submitButtons">
          <button id="submitForReview" className="submit_icon" onClick={submitForReviewPopup} style={{ display: 'none' }}>
          Submit for Manual Review
          </button>
          <button id="submitSuccess" className="submit_icon" onClick={submitSuccess} style={{ display: 'none' }}>
          Submit Successful Image
          </button>
        </div>
 
        <div>
          <div className="rqrmnt_section">
            <h3 id="rqrmnt_title">
              Badge Image Requirements</h3>

              {loading && <p>Loading...</p>}




            <div className="requirements">
              {beginning_map.Labels.map(label => {
                const { Name, Confidence, Description } = label;
                // Determine the status icon based on the value
                var iconSrc = dash_icon;
                if (Confidence >= 70) {
                      iconSrc = check_icon;
                      successful_requirement_count += 1;
                      if (successful_requirement_count === beginning_map.Labels.length) {
                        var button = document.getElementById('submitSuccess');
                        button.style.display = 'flex';
                        successful_requirement_count = 0;
                      }
                    }
                    else if (Confidence === -1) {
                      iconSrc = dash_icon;
                    }
                    else {
                      iconSrc = x_icon;
                      var button = document.getElementById('submitForReview');
                      button.style.display = 'flex';
                      
                      successful_requirement_count = 0;
    
                      unmet_requirements_list.push(Description);
                    }

                return (
                  <div className="unfulfilled">
                    <div className="img_container">
                      <img className="x_icon" src={iconSrc} alt="X"></img>
                    </div>
                    <div className="desc_container">
                      <p className="req_desc">{Description}</p>
                    </div>
                  </div>
                );
              })}
            </div>


            <p>*Daily religious attire is acceptable</p>
            <p>*Minimum Requirement: An image of yourself and just yourself</p>
            <p>*No feedback will be given to images that do not need the minimum requirement</p>
            <p>*Avoid cropping from a larger image if it sacrifices the quality of the image</p>

          </div>
        </div>


      </section>

      {selectedImage && (
        <p style={{paddingLeft: '6vw', marginTop: '0'}}>Click on your uploaded image to select another image</p>
      )}
          
      {/* <div className='label-container'>
        <label htmlFor="fileInput" id='fileInputLabel' className='label-text'>Select Image:</label>
        <input type="file" id="fileInput" name="fileInput" accept=".jpg, .jpeg, .png, .gif, .bmp" onChange={handleFileInputChange} />
      </div> */}
      

      <Dialog open={openDialog} onClose={handleDialogClose} className="dialog_base">
        <button className="close-button" onClick={handleDialogClose}>X</button>
        <DialogTitle className='requirements-banner'>
          <h4 className='requirements_title'>Photo Requirements Examples</h4>
        </DialogTitle>
        <div className="ex_requirements">
          {/* example of one that is good */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={acceptable_ex} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo is an example of an acceptable badge photo that meets all of the requirements. Note that daily religious attire is acceptable</span>
            </div>
          </div>
          {/* this is the photo of photo example */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={photo_of_photo} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo does not pass the requirement that the photo may not be a photo of a photo and therefore is an unacceptable badge photo.</span>
            </div>
          </div>
          {/* this is the off center example */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={off_center} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo does not pass the requirement that the person must be centered in the photo and therefore is an unacceptable badge photo.</span>
            </div>
          </div>
          {/* this is the shadows example */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={shadows_ex} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo does not pass the requirement for no shadows in the background and therefore is an unacceptable badge photo.</span>
            </div>
          </div>
          {/* this is the hat example */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={hat_ex} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo does not pass the requirement that the person in the photo may not wear accessories such as hats, caps, and sunglasses and therefore is an unacceptable badge photo.</span>
            </div>
          </div>
          {/* this is the back ground color example */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={non_white_bg} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo does not pass the requirement that the photo must have a white background and therefore is an unacceptable badge photo.</span>
            </div>
          </div>
          {/* this is the head tilt example */}
          <div class="example-content">
            <div className="ex_img">
              <img className='actual_image' src={head_tilt} alt="acceptable"></img>
            </div>
            <div className="ex_desc">
              <span>This photo does not pass the requirement that the person in the photo needs to look straight into the camera and avoid tilting their head and therefore is an unacceptable badge photo.</span>
            </div>
          </div>


        </div>
      </Dialog>

      <Dialog open={isInvalidImageTypeOpen} onClose={closeInvalidImageType} className='dialog_base'>
        <div className='invalid_container'>
          <h3>Invalid Image Type</h3>
          <p>We can only accept image types of <strong>.jpg, .jpeg, .png, .bmp</strong></p>
          <p>Please submit a new image</p>
          </div>
      </Dialog>

      <Dialog open={isBadResponseOpen} onClose={closeBadResponse} className='dialog_base'>
        <div className='invalid_container'>
          <h3>Response Error</h3>
          <p>AWS is handling too many requests at this moment</p>
          <p>Please try again</p>
        </div>
      </Dialog>
      <Dialog open={isNoPersonWarningOpen} onClose={closeNoPersonWarning} className='warning_base'>
        <Warning photo={imageInfo} type={'no people'}>
        </Warning>
      </Dialog>
      <Dialog open={isMultiplePeopleWarningOpen} onClose={closeMultiplePeopleWarning} className='warning_base'>
        <Warning photo={imageInfo} type={'multiple people'} >
        </Warning>
      </Dialog>
      <Dialog open={isAnimalsWarningOpen} onClose={closeAnimalsWarning} className='warning_base'>
        <Warning photo={imageInfo} type={'animals'} >
        </Warning>
      </Dialog>
      <Dialog open={isSubmittedForReview} onClose={closeSubmittedForReview} className='dialog_base'>
        <Warning photo={imageInfo} type={'submit for review'} description={reviewDescription} setDescription={setReviewDescription}>
        </Warning>
          <button className="info_icon" onClick={submitForReview}>Submit Anyways</button>
      </Dialog>
      <Dialog open={isSubmittedForSuccess} onClose={closeSubmittedForSuccess} className='dialog_base'>
      <DialogTitle className='requirements-banner'>
          <h4 className='requirements_title'>Photo Successfully Submitted!</h4>
        </DialogTitle>
      </Dialog>

      {/* </Layout> */}
    </div>
  );
}

export default Homepage;
