import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import dash_icon from './images/dash_icon.png';
import x_icon from './images/x_icon.png';



// import Layout from './layout.jsx';
import './css/Fonts.css';
import './css/FileSelect.css';
import "./css/requirements.css";
import "./css/ExamplePhotos.css";
import "./css/warningPopup.css";
import "./css/Email.css";
import "./css/Admin.css";
import "./css/ListView.css";

// removing these from here for now: downloadAllImagesFromS3,
import { uploadToS3,  deleteImageFromS3, enrichImagesWithUserEmail } from './s3.js';
import { sendEmail } from './Email.js';
// import { detect_labels, evaluate_results, calculateAverageConfidence, sunglassesStatusIcon, hatStatusIcon } from './labelDetection.js';
// import { get_test_data } from './testJSON.js';
// removing these for now: getItem, putItem, deleteItem,scanItems, createChartData
import {  queryItems, queryUnmetRequirements, updateItem, getItem  } from './DynamoDB.js';


// function ListView({ reviewImages }) {
//   return (
//     <div>
//       {reviewImages.map((image) => (
//         <div key={image.key} className="listViewItem">
//           <p>email: {image.user_email}</p>
//           <img src={URL.createObjectURL(new Blob([image.data]))} alt="user submission" style={{ width: '100px', height: 'auto' }} />
//         </div>
//       ))}
//     </div>
//   );
// }

const getDescription = async (imageId, userEmail) => {
  console.log("*************" + imageId)
  console.log("*************" + userEmail)
  try {
    // Assuming you have a function to fetch the description based on image_id
    const item = await getItem('reviewImages', { image_id: imageId, user_email: userEmail });
    if (item)
      return item.description; // Adjust this based on your DynamoDB structure
    else
      console.log("Image not found.")
      return null;
  } catch (error) {
    console.log("ERROR in getting description", error)
    throw error;
  }
};

function ListView({ reviewImages,
  handleDeleteImage,
  submitOverride,
  showEmailPopup,
  setShowEmailPopup,
  selectedImageListView,
  EmailContent,
  setEmailContent,
  handleConfirm }) {
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    // Fetch descriptions for all images
    const fetchDescriptions = async () => {
      const descriptions = {};
      for (const image of reviewImages) {
        try {
          const description = await getDescription(image.key, image.user_email);
          console.log("USER EMAIL****", image.user_email)
          if (description)
            descriptions[image.key] = description;
          else
            descriptions[image.key] = "N/A";
        } catch (error) {
          console.error('Error fetching description for image:', image.key);
        }
      }
      setDescriptions(descriptions);
    };

    fetchDescriptions();
  }, [reviewImages]);

  return (
    <div className="list-view-container">
      {reviewImages.length > 0 ? (
        reviewImages.map((image) => (
          <div key={image.key} className="list-view-item">
            <div className="list-view-header">
              <p className="list-view-email"><strong>Email:</strong> {image.user_email}</p>
              <p className="list-view-description"><strong>Description:</strong> {descriptions[image.key]}</p>
            </div>
            {showEmailPopup && selectedImageListView === image.key && (
              <div className="popup_container">
                {/* Popup content here. Ensure that you use `setShowEmailPopup` to close this popup. */}
              </div>
            )}
            <div className="list-view-image-container">
              <img src={URL.createObjectURL(new Blob([image.data]))} alt="user submission" className="list-view-image" />
            </div>
            <div className="list-view-actions">
              <button className="admin_button" onClick={() => handleDeleteImage(image.key)}>Reject</button>
              <button className="admin_button" onClick={() => submitOverride(image.key)}>Override</button>
            </div>
            {showEmailPopup && (
              <div className="popup_container">
                <div className="popup_information">
                  <div className='popup_text'>
                    <p>Enter any additional information you would like to send to the user</p>
                    <textarea
                      className="popup_textarea"
                      placeholder="Enter additional information..."
                      value={EmailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="popup_buttons">
                  <button onClick={() => setShowEmailPopup(false)}>Cancel</button>
                  <button onClick={handleConfirm}>Confirm</button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className='NoImages'>No images to review.</div>
      )}
    </div>
  );
}


function Admin() {
  // Redirect out if not logged in as an admin
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'admin';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const [selectedImage, setSelectedImage] = useState('');
  const [reviewImages, setReviewImages] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState(null);


  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unmetRequirements, setUnmetRequirements] = useState([]);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [EmailContent, setEmailContent] = useState('');
  const [actionType, setActionType] = useState(''); // 'remove' or 'override'

  const [viewMode, setViewMode] = useState('single'); // 'single' or 'list'
  const [startInitiated, setStartInitiated] = useState(false);

  const [emailSearchTerm, setEmailSearchTerm] = useState('');

  const [currentImageDescription, setCurrentImageDescription] = useState('');

  const [queueListVal, setQueueListVal] = useState('List View');

  const [showEmailPopupListView, setShowEmailPopupListView] = useState(false);
  const [selectedImageListView, setSelectedImageListView] = useState('');


  var requirements = [];

  useEffect(() => {
    if (reviewImages.length > 0) {
      const currentImage = reviewImages[reviewImages.length - 1];
      console.log("CURRENT_IMAGE Format: ", currentImage);
      const blob = new Blob([currentImage.data], { type: currentImage.data.type });
      //console.log(blob);
      const imageUrl = URL.createObjectURL(blob);
      setCurrentImageUrl(imageUrl);
      setSelectedImage(currentImage.key);
      console.log("selected Image: ", currentImage.key);
      // Fetch description for the current image
      const fetchDescription = async () => {
        const description = await getDescription(currentImage.key, currentImage.user_email);
        setCurrentImageDescription(description || "N/A");
      };
      fetchDescription();

      const queryParams = {
        KeyConditionExpression: "image_id = :image",
        ExpressionAttributeValues: {
          ":image": currentImage.key,
        },
      };
      const image_items = queryUnmetRequirements('reviewImages', queryParams);
      // setUnmetRequirements(image_items);
      console.log("unmet requirements: ", image_items);
      // const image_item = getItem('reviewImages', currentImage.key);
      // setUnmetRequirements(image_item);
      // console.log("Image key: ", image_item);
      image_items.then(array => {
        // Here 'array' contains the resolved value of the Promise, which is the array
        console.log("array: ", array); // This will log the array
        requirements = array;
        console.log("Requirements: ", requirements);
        setUnmetRequirements(requirements);
      }).catch(error => {
        // Handle any errors that occur during Promise resolution
        console.error(error);
      });

    }
  }, [reviewImages]);

  const filteredImages = emailSearchTerm
    ? reviewImages.filter(image => 
        image.user_email.toLowerCase().includes(emailSearchTerm.toLowerCase()))
    : reviewImages;

  const handleDownload = async () => {
    setTimeout(() => {
      setStartInitiated(true);
    }, 1000);
    try {
      const bucketName = 'cse-498-capstone-submit-for-review-images';
      const image_for_review = await enrichImagesWithUserEmail(bucketName);
      setReviewImages(image_for_review);
      console.log('Download successful!');
      console.log("Image name:", image_for_review);

      // handleUploadSuccess(key);
    } catch (error) {
      console.error('Error downloading from S3:', error);
      // setStatusIcon(x_icon);
    }
  }

  // handleDownload();

  // Handle the delete button
  const handleDeleteImage = async (imageKey, isListView) => {
    // Handle deletion of the currently displayed image
    setEmailContent(
      `Dear Amazon Employee,

An admin has manually reviewed your submitted photo and has determined that it does not meet the requirements.

Please review the image and make the necessary changes. The image has been deleted from the review queue. Thank you for your understanding
and cooperation.

Sincerely,
The Amazon Badge Team.`
    );
    setActionType('remove');
    // setShowEmailPopup(true);
    if (isListView) {
      setSelectedImage(imageKey);
      setSelectedImageListView(imageKey);
      setShowEmailPopupListView(true);
    } else {
      setSelectedImage(imageKey);
      setShowEmailPopup(true);
    }
  };

  

  // Handle email on confirmation
  const handleConfirm = async (isListView) => {
    const queryParams = {
      KeyConditionExpression: "image_id = :image",
      ExpressionAttributeValues: {
        ":image": selectedImage,
      },
    };
    const acc = await queryItems('reviewImages', queryParams);
    const user_email = acc.user_email;

    setShowEmailPopupListView(false);
    setShowEmailPopup(false);

    const emailContentWithBr = EmailContent.replace(/\n/g, '<br>');
    //console.log("Email Content: ", emailContentWithBr);
    sendEmail(user_email, emailContentWithBr);
    // console.log("Email sent!");

    // Handles removal on confirmation
    if (actionType === 'remove') {
      removeImage();
    }
    // Handles submit override on confirmation
    else if (actionType === 'override') {
      try {
        const bucketName = 'valid-badge-photos';
        // const key = currentImageUrl;
        // original image data to reupload
        const selectedImageData = reviewImages.find(image => image.key === selectedImage);
        if (!selectedImageData) {
          console.error('Image data not found');
          return;
        }
        await uploadToS3(selectedImageData.data, bucketName, selectedImage);
        removeImage();
      } catch (error) {
        console.error('Error uploading to S3:', error);
        // setStatusIcon(x_icon);
      }
    }
  };

  // Handles the removal of the image from the review queue
  const removeImage = async () => {
    deleteImageFromS3(selectedImage);
    // Delay so that the image has time to delete before the next image is displayed
    setTimeout(() => {
      handleDownload();
      if (reviewImages.length === 1) {
        setCurrentImageUrl(null);
        setSelectedImage('');
        setReviewImages('');
      }
    }, 500);
  }

  // Handle the submit override button
  const submitOverride = async (imageKey, isListView) => {
    // upload image to successful bucket
    setActionType('override');
    setEmailContent(
      `Dear Amazon Employee,

An admin has manually reviewed your submitted badge photo and has determined that it meets the requirements.

Welcome to the Amazon team!
The Amazon Badge Team.`
    );
    // setShowEmailPopup(true);
    if (isListView) {
      setSelectedImage(imageKey);
      setSelectedImageListView(imageKey);
      setShowEmailPopupListView(true);
    } else {
      setSelectedImage(imageKey);
      setShowEmailPopup(true);
    }
    const incrementValue = 1;
    unmetRequirements.forEach(requirement => {
      const expressionAttributeValues = {
        ":increment": incrementValue,
        ":zero": 0
      };
      const updateExpression = "SET inaccuracyCount = if_not_exists(inaccuracyCount, :zero) + :increment";
      updateItem('requirementsAccuracy', {requirementName : requirement}, updateExpression, expressionAttributeValues);
    }); 

  };

  const updateToggle = () => {
    setViewMode(viewMode === 'single' ? 'list' : 'single');
    if(queueListVal === 'Review Queue'){
      setQueueListVal("List View");
    }
    else {
      setQueueListVal("Review Queue");
    }
    
    
  };


  return (
    <> {/* Assuming Layout is your page wrapper/component */}
      <div className='welcome_statement'>
        <div className='welcome_text_container'>
          <h2 className='welcome_text'>Please confirm if this image can be used for an Amazon badge</h2>
          <div className='example_container'>
            <button className="admin_button" onClick={handleDownload}>START</button>
            {/* Conditional rendering based on startInitiated */}
            {startInitiated && (
              <button className="admin_button" onClick={updateToggle}>
                {queueListVal}
              </button>
            )}
          </div>
        </div>
      </div>
  
      {
        viewMode === 'single' ? (
          currentImageUrl && (
            <section className="section-container">
              <div className='image-container'>
                <div>
                  <img id="selectedImage" src={currentImageUrl} alt="Current Image" style={{ maxWidth: '500px', maxHeight: '500px' }} />
                  <p>Description: {currentImageDescription}</p>
                </div>
                <div className="button_container">
                <button className="admin_button" onClick={() => handleDeleteImage(selectedImage)}>Reject</button>
                <button className="admin_button" onClick={() => submitOverride(selectedImage)}>Override</button>
                </div>
              </div>
  
              {/* Email input */}
              {showEmailPopup && (
                <div className="popup_container">
                  <div className="popup_information">
                    <div className='popup_text'>
                      <p>Enter any additional information you would like to send to the user</p>
                      <textarea
                        className="popup_textarea"
                        placeholder="Enter additional information..."
                        value={EmailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="popup_buttons">
                    <button onClick={() => setShowEmailPopup(false)}>Cancel</button>
                    <button onClick={handleConfirm}>Confirm</button>
                  </div>
                </div>
              )}
  
              <div className="rqrmnt_section">
                <h3 id="rqrmnt_title">
                  Badge Image Did Not Meet These Requirements:
                </h3>
                <div className='requirements'>
                  {unmetRequirements.map(item => (
                    <div className="unfulfilled" key={item}>
                      <div className="img_container">
                        <img className="x_icon" src={x_icon} alt="X"></img>
                      </div>
                      <div className="desc_container">
                        <p className="req_desc">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p>*Daily religious attire is acceptable</p>
              </div>
            </section>
          )
        ) : (
          <>
            {startInitiated && (
              <div className='search-container'>
                <input
                  className='search'
                  type="text"
                  placeholder="Search by Email"
                  value={emailSearchTerm}
                  onChange={(e) => setEmailSearchTerm(e.target.value)}
                />
              </div>
            )}
            <ListView
              reviewImages={filteredImages}
              handleDeleteImage={(key) => handleDeleteImage(key, true)}
              submitOverride={(key) => submitOverride(key, true)}
              showEmailPopup={showEmailPopupListView}
              setShowEmailPopup={setShowEmailPopupListView}
              selectedImageListView={selectedImageListView}
              EmailContent={EmailContent}
              setEmailContent={setEmailContent}
              handleConfirm={handleConfirm}
            />
          </>
      )}
    </>
  );
}

export default Admin;