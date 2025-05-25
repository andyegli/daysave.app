
**User Stories and Use Cases for DaySave.app**


---

## 👤 User Personas
- **Archithect**: Designing the software Archidecture
- **Guest**: An unregistered visitor exploring the app
- **TrialUser: A registered user with limited funcctionality allowed access untill the end of the trial periode 
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
- I would like to be able to rate limit access to API
- I would kike to be able to detect bots accessing the system
- I would kike to use MySQL with Sequelize and migrate.js for saver and easier database interaction
- I would like to implemnt an API for easier integration with mobiles and 3rd party applications 
- I would like to use MVC architecture for the pages
- I would like to use ECMAScript Modules (ESM) syntax for uniform server and client code and better performance
- I would like to implement and support subscription, payment_methodes and payments 
- require guests to register before beeing able to authenticate
- require users to be authenticated before using the application
- like to offer the guest multiple option to register
- like to offer users to authenticate using their preffered authentication methode
- like to offer users to assign one or more 2fa methodes to a authentication methode
- want a comprehencive audit log 
- want users to be locked out after to many login attemps to throttle brute-force attempts
- I want source IP's to be blocked if they abuse the system 

### Use Cases
- User Name Password Authentication
- oAuth Authntication
- SSO Authentication
- Passkey Authentication
- 2FA OTP (TOTP via Authenticator app))
- 2FA Email verification
- 2FA SMS Code
- 2FA Passcode list (HOTP style)

## Mobile & Accessibility

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
- I like to see a previw, of content along with title, sumary and tags while browsing content
- I like to be able to seach for content 
- I like to be able to group content by channel, type, category, tag, datetime submitted and place submitted  
- I like my content to be sumarized, classified and taged further by a AI for easier finding and grouping
- I like to be able the AI to suggest appropriate related conent on request 
- I want to use share-to functionality when connecting forom my mobile.
_ I want to be avlel to share content with contacts
- I want contacts to be able to tag and coment on shared content
- I wanto to want to use contact_groups to share content with multiple contacts
- As a visually impaired user, I want the app to be screen-reader friendly.
- As a mobile user, I want offline caching of recent content.

as a Admin I
- would like to suspend/reactivate a user_prfile to prevent a user from authenticating
- like to archive a user profile retaining data but preventing changes
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

- Share-to integration
- Web Content Accessibility Guidelines (WCAG) markup and styles
- Service worker for offline

