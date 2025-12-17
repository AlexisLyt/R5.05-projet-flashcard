# Methods HTTP and route
| route | role | access | type | query params | body |
|---|---|---|---|---|---|
| `/auth` | display user's infos | authenticate | GET |  |  |
| `/auth/register` | create user | public | POST |  |  |
| `/auth/login` | authentification user/admin | public | POST |  |  |
| `/users` | admin management | admin | GET |  |  |
| `/users/:id` | display user's infos by their id | admin | GET |  |  |
| `/users/:id` | delete user by their id | admin | DELETE |  |  |
| `/flashcards` | create a flashcard | authenticate | POST |  |  |
| `/flashcards/`<span style="color:red">`:id`</span> | display flashcard by their id | authenticate | GET |  |  |
| `/flashcards/collection/`<span style="color:red">`:id`</span> | diplay flashcards' of a collection by id | authenticate | GET |  |  |
| `/flashcards/collection/`<span style="color:red">`:id`</span>`/revise` | Show only flashcards from the collection that need to be reviewed | authenticate | GET |  |  |
| `/flashcards/`<span style="color:red">`:id`</span> | edit flashcard (by id) | authenticate | PATCH |  |  |
| `/flashcards/`<span style="color:red">`:id`</span> | delete flashcard (by id) | authenticate | DELETE |  |  |
| `/flashcards/revise/`<span style="color:red">`:id`</span> | revise the flashcard | authenticate | POST |  |  |
| `/collections` | display user collections | authenticate | GET |  |  |
| `/collections/`<span style="color:red">`:id`</span> | display collection by their collection id | authenticate | GET |  |  |
| `/collections` | create collection | authenticate | POST |  |  |
| `/collections/search/` | search collection (with param) | authenticate | GET |  |  |
| `/collections/`<span style="color:red">`:id`</span> | edit collection user | authenticate | PATCH |  |  |
| `/collections/`<span style="color:red">`:id`</span> | delete collection user | authenticate | DELETE |  |  |