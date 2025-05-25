
**User Stories and Use Cases for DaySave.app**


---

## 👤 User Personas
- **Archithect**: Designing the software Archidecture
- **Guest**: An unregistered visitor exploring the app
- **TrialUser**: A registered user with limited funcctionality allowed access untill the end of the trial periode 
- **Subscriber**: A registered user with access to his content untill the endof the subscribed periode who can save, comment, and organize content
- **Admin**: A privileged user who manages the system, users, content, tags, and comment. 
- **AIBackend**: Backend service for tagging, summarizing, and categorizing

## Authentication and Security
As a Archithect I:
### User Stories
- I would like to use a flexible Authenticaion Methodes
- I would like to use flexible 2FA Methodes
- I would like to use Role-Based Access Control (RBAC) and Permissions
- I would like to follow the principle of least privileges
- I would like to the app to support multiple languages
- I would all EJS pages to be mobile friendly
- I would like all EJS Pages to be screen reader frinedly to support visually impaired users
- I like mobile devices to be able to provide their location to the app (mobile_location)
- I like the web app to translate each login source ip to a location  (ip_location)
- I would like to be able to rate limit access to API
- I would kike to be able to detect bots accessing the system
- I would like to use ECMAScript Modules (ESM) syntax for uniform server and client code and better performance
- I would kike to use MySQL with Sequelize and migrate.js for saver and easier database interaction
- I would like to implemnt an API for easier integration with mobiles and 3rd party applications 
- I would like to use versioning in the API endpoints /api/v1/
- I would like all API calls / payload to be encrypted and use a secure endpoint  /api/v1/s/
- I would like to have EJS pages and mobile apps use / share the API endpoints
- I would like all API calls / payload to be encrypted independent of https
- I would like to use MVC architecture for the pages
- I would like to implement and support subscription, payment_methodes and payments 
- require guests to register before beeing able to authenticate
- require users to be authenticated before using the application
- like to offer the guest multiple option to register
- like to offer users to authenticate using their preffered authentication methode
- like to offer users to assign one or more 2fa methodes to a authentication methode
- want a comprehensive audit log in development and production
- want users to be locked out after to many login attemps to throttle brute-force attempts
- I want source IP's to be blocked if they abuse the system 
- I want extensive console log during development
- I want to use devcontainer and remote development 
- I want to deploy to Google Clooud (primary) and support other Cloud Platform
- I want the app to suport distributed and redundant deployment

### Use Cases ###
- Auth User Name Password Authentication
- Auth oAuth Authntication
- Auth SSO Authentication
- Auth Passkey Authentication
- 2FA OTP (TOTP via Authenticator app))
- 2FA Email verification
- 2FA SMS Code
- 2FA Passcode list (HOTP style)
- 2FA Magic Link
- 2FA Passkey

## Mobile & Accessibility
section to be defined

### User Stories
As a Guset / TrialUser / Subscriber / Admin I:

- I want to register with my prefferd methode (UN/PW, Google, Microsoft, FB, Insta etc)
- I want to be able to reset my password if I can not remember
- I want to be able to enable and use my prefferd 2fa metode
- I want to be able to submit password and 2fa in one shot (example: password + otp)
- want to have a free trial period (guest user )
- want to be reminded before the trial expires (trialuser)
- want to subscribe to the service and register payment methodes
- as a user i want to select from plans which enable additional features
- I want to submit intresting web social content so i can find and investigate later
- I want to be able to set reminders on content to be reminded 
- I want to be able to assign tags to submitted content
- I want ot be able to assign coments to submitted content
- I want to be able to view, update, archive and delete content
- I want to be able to change tags on submitted content
- I want to be able to chnage comments on submitted conent
- I like to scroll through submitted content
- I like to see a previw, of content_items along with title, sumary and tags while browsing content
- I like to be able to seach for content 
- I like to document all diagrams using PlantUML server .puml files
- I like to use Squlizer and ORM for more secure and uniform schema managemnt
- I want to be able to use the bootstrap frame work for styling
- I want to use public/partials on EJS pages for more effective development
- I want to use public/central css folderfor styling
- I want to use public/js for client side scripting
- I want pages to have modern and fresh responsive design
- I want the page to use the logo located at https://github.com/andyegli/daysave.app/blob/main/public/image/logo1.png
- I want the page to be in contrast collors to the collors in the logo
- I want the header and footer to be sticky when scrolling on the pages
- I want the pages to have a head with logo and navigation on the left and a profile_picture wich links to account_details on the right
- i want a ? on the right in the navbar for easy accesss to conext base self help and support page. 
- I want the content page to be inspired by https://github.com/andyegli/daysave.app/blob/main/public/image/content_section.png
- I wan the footer to have links to privacy_policy, terms_of_service, about_us pages and show contact us info and copy right
- I like to be able to group content by channel, type, category, tag, datetime submitted and place submitted  
- I like my content to be sumarized, classified and taged further by a AI for easier finding and grouping
- I like to be able the AI to suggest appropriate related conent on request 
- I want to use share-to functionality when connecting forom my mobile.
_ I want to be avlel to share content with contacts
- I want contacts to be able to tag and coment on shared content
- I wanto to want to use contact_groups to share content with multiple contacts
- As a visually impaired user, I want the app to be screen-reader friendly.
- As a mobile user, I want offline caching of recent content.
- I want the conent management page to display content items in a blog style content_items
- I want the content_items to have a priview generated form the link submitted 
- I want the content_items to have a title, many tags, a type, a category, status, 
- I want to be able to select multiple content items to apply crud actions to a selected group of contact_item
- I want to be able to search content_items by any field as well using one or multiple valies, date range, location radius, aswell as  full text search
- I want to be able to order views by any field as well using one or multiple values,
- like to use AI to provide ai_tags, ai_acategory, ai_sumary ai_sentiment, ai_meta, ai_keywords, ai_detected_objects for each of the content_items
- I like to use multiple payment_providers like paypal and strype
- I like to import payments via csv or receive them via api
- I like to be able to send invoices via email
_ i like a profile_account page that shows account_details, payments, oustanding payments, invoices and payment_methodes, subsription and subsciption_status
- I like the contact management page to be inspired by apples contact management
- I want a contact to have multiple notes with lables and tags
- I want to be able to remind users about content, contacts_dob, any contact_nots or to be able to set allerts and be reminded of them 
- I like the reminder to support reminder_duration, reminder_interval and have the ability to pause reminders 
- I like track comprehensive statistic on the use, devices, locatios, performance


as a Admin I
- would like to suspend/reactivate a user_prfile to prevent a user from authenticating
- like to archive a user profile retaning data but preventing changes
- would like to be able to remove and userprofile removing all userdata associated with a profile
- would kike to have a overview of all submissions
- would like to remove a content if inappropriate
- like to be able to search for locked out users to enable then again 
- like to see statistics nr of logins, number of faild logins, top sumitter, ....
- want to be notified when a user is locked out
- like to review locked out ip address
- like to understand where users are connecting from 
- like to understand what device, os version, browser version is connecting for easier debuging 



### Use Cases
- Site Structure
- Page design
- Share-to integration
- Web Content Accessibility Guidelines (WCAG) markup and styles
- Service worker for offline

