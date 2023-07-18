
# ludoryan app

The purpose of this app/website was to gather RSVPs for a couple of parties around the world to celebrate a during-lockdown marriage that took place without a ceremony. It seemed like a more robustly-featured option than a Google form and cheaper (as in free) than an RSVP service.

The app was built in NextJS with TypeScript, has a Postgres db for persistent storage (with Prisma ORM for entity/transaction handling), and is deployed on Vercel. 

## build process

I wrote scripts to create usernames from our guestlist and to create random passwords. The application secures auth routes with [iron-session](https://www.npmjs.com/package/iron-session "npm package") middleware. There is an admin side of the app to handle creating and editing guest information and for displaying data about our guestlist. On the guest side of things, the user can enter their RSVP with additional fields for special needs, whether they're bringing children, and in the case of the Italy trip, whether they need transportation to the venue. If they need to, they can also update their entry.

## application flow

#### home page
* user sees the welcome page with information about the events
* can log in
  * footer contains toggles for language (English/Italian), dark/light mode, and login/logout

#### log in
* user login as an invited guest or admin

#### guest
* the guest can complete their information
  * add surname
  * add information for partner/+1
  * yes/no response to invitation
  * add that they're bringing children
    * if invited to the Italy party, can opt in or out to taking the arranged transportation to the venue
  * additional information, like allergies/dietary restrictions
  * on submission
    * modal pops up to review entries
    * go back or submit
  * with a saved RSVP
    * show saved details will do just that
    * the user can re-enter anything they need to

#### admin
* page to manage guest list
  * enter guest with name/email/generated password
    * can add a plus one
    * checkboxes to select events to invite to
    * save
  * edit guest
    * enter email into lookup field
    * if record exists, returns to enter guest screen
  * invitees
    * filterable and sortable table with all invited guests
      * link to edit the guest
      * link to impersonate the guest for testing
    * confirmed
      * table to display all guests who have submitted RSVP

#### logging
The application also includes logging for errors, successful, and unsuccessful transactions
