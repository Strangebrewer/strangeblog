
# Features

- Main Page:
  - Should look similar to my last portfolio page, except it will list articles in descending order, starting with my most recent.
    - Isn't actually a portfolio page and won't have my real name on it.
  - Each article should have a title (required), a subtitle (optional), a category (defaults to "None"), a main body, a creation date, a last-edited date, and tags
  - Logged in users should be able to privately tag posts for their own future reference
  - There should be a search feature to search by title, date range, or tag(s)
    - title search should work with partial searches
    - all searches should be searchable together (i.e. this title after this date)
    - search by multiple tags will only find articles with both tags

# ToDo
- FIRST: Figure out WTF is going on with the "/list" POST vs "/" GET endpoints
  - searching by date seems to work with public posts (i.e. non-friend users)
      but not with admin users. Strange things are afoot at the Circle K...

- Clicking on a user tag to filter by that tag doesn't seem to be working...
- Login:
  - Style the login/register page to align with the rest
  - Set it up to deny banned users access
  - Set it up to ask inactive users if they want to reactivate
- Set up singlePost page to let me print the article to a pdf (see og-dragon-writer)

## Next

### Sources page:

### Admin page:
- Cray Cray can be whatev - but it makes the rainbow of buttons look cool :)

### SinglePost page:
- The point of this page is to make it so you can link directly to one post
  - consequently, the url will need to use the postId rather than the name
- button to edit (should just go to the "/editor/:id" page)


### Main page:



## DONE:
- DONE: Add navbar for all non-Main pages
- Add functionality for allowing friends to see all posts instead of just the public ones
  - it could also be an "acl" array field on the schema:
    - "admin"
    - "friend"
    - "public"
  - the only thing this will change is what posts they see; it will still require "admin" to create, edit, or delete
- add save, save & close, and cancel functionality to the "/editor" page

### Main.jsx:
- FIXED: If there are usertags and you delete the last one, the "My Tags:" label still shows.
- DONE: add category to the display
- DONE: add functionality for changing the category
- DONE: Top of page button on Main.jsx
- DONE: create a Search component for the Main page, something to go in the expanding search box
  - DONE: Add notice thing that appears under the nav that shows what the current search criteria are
  - DONE: each criteria should have an "x" that allows to remove just that part of the search criteria
  - DONE: add a reset button for resetting the search to baseline
  
- Criteria.jsx
  - DONE: Display each search criteria:
    - DONE: Category
    - DONE: Title
    - DONE: Tags
    - DONE: Dates

- Post.jsx
  - DONE: add tags to the display
  - DONE: add functionality for adding and removing tags (mine and users') to Posts
  - DONE: add deletePost functionality to Posts component
  - DONE: add functionality for filtering by category
  - DONE: add search functionality:
    - DONE: this should unfold a search box that expands the grey buttons area
        - it should have:
          - DONE: title input box
          - DONE: tags input box
          - DONE: date range inputs

### Sources.jsx
- DONE: an explanation of what these sources are for (for me) and how I went about compiling the list
- DONE: a list of news and data sources I like (the one from my spread sheet)
- DONE: style the cards on the Sources page

### Admin page:
- DONE: a button each for Users, Sources, Blog, Categories and Cray Cray
  - DONE: the buttons will toggle which component is visible
  - DONE: each item for each category will have an edit and a delete button
  - DONE: Build search function for finding users. Search by: acl, status, email, username

- DONE: adding or removing sources
- DONE: adding or removing categories
- DONE: editing user accounts
- DONE: editing the blog title and subtitle