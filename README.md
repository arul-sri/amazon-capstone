# Project link
http://www.capstone.cse.msu.edu/2024-01/projects/amazon/

# Employee Badge Image Validation Tool
CSE 498 Capstone Spring 2024 

## About
**Team:** Amazon

**Project:** Employee Badge Image Validation Tool

**Project Description:**
Amazonians have an Amazon issued badge that contains our photos for security purposes. These badges
grant us access to specific buildings and can be used to validate our identity with the photo. Once new
hires have accepted their offer, they are given access to a pre-boarding Portal with tasks to complete in
order to ensure they are ready for work on their Day 1. Included in this checklist is sending a photo to be
used for your badge.
There are specific guidelines for these photos to be considered valid
Acceptable photos:
1. Look straight into the camera
2. Include the top of your head to mid-chest
3. Photo is properly exposed with no shadows
4. Daily religious attire is acceptable
Unacceptable photos
1. Background of the photo should be white
2. Avoid sunglasses
3. Avoid caps & hats
4. Avoid tilting your head up
5. Avoid cropping from a larger image
6. Avoid full-length images
7. Avoid taking a photograph of another photograph

These guidelines are shared with new hires but the validation of their photos is entirely manual. 
This process is 
1. slow to get feedback to the new hire
2. subject to inconsistency in human validation and
3. adds costs. 

If the new hire cannot get an approved photo uploaded before their first day, they would
need to take valuable time from their first day to have a photo taken by the badging team. A system that
instantly evaluated a photo against these criteria would give new hires instant feedback and reduce the
level of effort on the HR onboarding teams to inspect these photos.
By working with the MSU Capstone team we hope to improve the new hire onboarding experience by
reducing cost and churn.

## Running our Project

Running our project is simple. The web application is deployed via Amazon Web Services Amplify 
This link will work as long as the application is still being hosted.

https://www.main.d31olj4k4f139w.amplifyapp.com/login

If the web application is no longer being supported by Amplify, you can clone this repo. Once the repo is cloned and you are in the folder "team-amazon", in your terminal, run these commands:

```
cd my-react-app
npm start
```

This will open the React application via localhost.

If you would like to login as a **new hire** you can use these credentials 

Username: user@gmail.com

Password: password

* Note if you would like to try out the email feature you will need to make an account with your email

If you wish to see the **admin** side of the application use these credentials

Username: admin@gmail.com

Password: password


***

## Additional Documentation
Our project code base is located in two different locations. This repo as well as on Amazon Web Services. You can view what is supported on AWS by viewing the provided documentation contained in this repo.

Documentation can be found within the **team-amazon/AWS** folder.



## Authors and Acknowledgments
**Capstone Students:**
- Jack Hammond
- Khloe Hayes
- Katelyn Hurst
- Arul Srivastava
- Timmy Wu 

**Capstone Instructors:**
- Dr. Wayne Dyksen
- James Mariani
- Griffin Klevering (Teaching Assistant)

**Amazon Project Sponsers:**
- Manasa Dantu
- Garret Gaw
- Derek Gebhard
- Stefan Najor
- Ed O'Brien
- Sean Whipple


## Project Status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
