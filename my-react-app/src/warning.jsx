import React from 'react';
import './css/warningPopup.css';

function Warning({photo, type, description, setDescription}) { // Modified to destructure props
    // This is unchanged, just properly destructured for clarity
    const type_animal = type === 'animals';
    const type_no_people = type === 'no people';
    const type_multiple_people = type === 'multiple people';
    const type_submit_for_review = type === 'submit for review';

    // Handler for description change
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="warning_container">
            <div className="warning_photo">
                <img id="test" alt="Selected Image" src={URL.createObjectURL(photo)} style={{ maxWidth: '300px', maxHeight: '300px' }} />
            </div>
            <div className="warning_information">
                <div className='warning_text'>
                    {type_no_people && (
                        <div>
                            <h3 className='minimum_warning'>No Person Detected in Image</h3>
                            <p>Unfortunately, since your image does not meet the minimum requirements, we cannot provide any feedback. Remember, <strong>the image should be just a picture of yourself.</strong></p>
                            <p>Please review the example images and submit a new image!</p>
                        </div>
                    )}
                    {type_multiple_people && (
                        <div>
                            <h3 className='minimum_warning'>Multiple People Detected in Image</h3>
                            <p>Unfortunately, since your image does not meet the minimum requirements, we cannot provide any feedback. Remember, <strong>the image should be just a picture of yourself.</strong></p>
                            <p>Please review the example images and submit a new image!</p>
                        </div>
                    )}
                    {type_animal && (
                        <div>
                            <h3 className='minimum_warning'>Animals Detected in Image</h3>
                            <p>Unfortunately, since your image does not meet the minimum requirements, we cannot provide any feedback. Remember, <strong>the image should be just a picture of yourself.</strong></p>
                            <p>Please review the example images and submit a new image!</p>
                        </div>
                    )}
                    {type_submit_for_review && (
                        <div>
                            <h3 className='minimum_warning'>Before you Submit for Review</h3>
                            <p>You can try another photo. Remember, <strong>double check.</strong></p>
                            <p>Please review the example images and submit a new image!</p>
                            {/* Form submission input for description */}
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Describe the issue or leave a message (optional)"
                                rows="4"
                                style={{ width: '100%', marginTop: '10px' }}
                            ></textarea>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Warning;
