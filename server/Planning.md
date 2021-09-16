
# Features

- Main Page:
  - Should look similar to my last portfolio page, except it will list articles in descending order, starting with my most recent.
    - Isn't actually a portfolio page and won't have my real name on it.
  - Each article should have a title (required), a subtitle (optional), a main body, a creation date, a last-edited date, and tags
    - Consider adding a category - it will allow for sorting articles into subject areas (e.g. Climate Change or Advaita). It can default to "none" or something like that.
  - Logged in users should be able to privately tag posts for their own future reference
  - There should be a search feature to search by title, author, or tag(s)
    - title and author search should work with partial searches and should be searchable together (i.e. this article by this author)
    - search by multiple tags will only find articles with both tags

# ToDo

## Next
- Criteria.jsx:
  - Display the full count
  - Display each search criteria:
    - Category
    - Title
    - Tags
    - Date Range
  - Tags can be eliminated individually or entirely
    - Something like: "Tags x: (fnord x, flarp x)"
- create a Search component for the Main page, something to go in the expanding search box
  - DONE: Add notice thing that appears under the nav that shows what the current search criteria are
  - each criteria should have an "x" that allows to remove just that part of the search criteria
  - DONE: add a reset button for resetting the search to baseline
- refactor the PostEditor page
  - move save buttons from the Editor component to the PostEditor page, OR
  - move the title and other input fields into the Editor component
  - whatever other refactors make sense
- flesh out the SinglePost.jsx page:
  - functionality for adding tags
  - button to edit (should just go to the "/editor" page)

## Main.jsx:
- on the Main.jsx page:
  - add functionality for editing the title and summary
  - add category to the display
  - add functionality for changing the category

## Admin page:
  - functionality for adding or removing categories
  - functionality for editing user accounts (to add "friend" to the acl field)
  - functionality for editing the blog title and subtitle

## Some kind of "Sources" page
  - a list of news and data sources I like (the one from my spread sheet)
  - an explanation of what these sources are for (for me) and how I went about compiling the list





## DONE:
- setup search by date range
- search by category works, but it needs to be tied together with the reset button below the nav
- Add functionality for allowing friends to see all posts instead of just the public ones
  - it could also be an "acl" array field on the schema:
    - "admin"
    - "friend"
    - "public"
  - the only thing this will change is what posts they see; it will still require "admin" to create, edit, or delete
- add save, save & close, and cancel functionality to the "/editor" page

- on the Main.jsx page:
  - add tags to the display
  - add functionality for adding and removing tags (mine and users') to Posts
  - add deletePost functionality to Posts component
  - add functionality for filtering by category
  - add search functionality:
    - this should unfold a search box that expands the grey buttons area
        - it should have:
          - title input box
          - tags input box
          - date range inputs
