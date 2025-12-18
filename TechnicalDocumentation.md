# Methods HTTP and route
| route | role | access | type | body |
|---|---|---|---|---|
| `/auth` | display user's infos | authenticate | GET 👀 | ❌ |  
| `/auth/register` | create user | public | POST 🍕 | `{`<br>`email: 'complete',`<br>`firstName: 'complete',`<br>`lastName: 'complete',`<br>`password: 'complete',`<br><span style="color:violet">`admin: true/false,`</span><br>`},` |  
| `/auth/login` | authentification | public | POST 🍕 | `{`<br>`email: 'complete',`<br>`password: 'complete',`<br>`},` |  
| `/users` | admin management | admin | GET 👀 | ❌ |  
| `/users/`<span style="color:red">`:id`</span> | display <span style="color:red">user</span>'s infos by their <span style="color:red">id</span> | admin | GET 👀 | ❌ |  
| `/users/`<span style="color:red">`:id`</span> | delete <span style="color:red">user</span> by their <span style="color:red">id</span> cascade | admin | DELETE ☠️ | ❌ |  
| `/flashcards` | create a flashcard | authenticate | POST 🍕 | `{`<br>`frontText: 'complete',`<br>`backText: 'complete',`<br><span style="color:violet">`frontUrl: 'complete',`</span><br><span style="color:violet">`backUrl: 'complete',`</span><br>`},` |  
| `/flashcards/`<span style="color:red">`:id`</span> | display <span style="color:red">flashcard</span> by their <span style="color:red">id</span> | authenticate | GET 👀 | ❌ |  
| `/flashcards/collection/`<span style="color:red">`:id`</span> | diplay flashcards' of a <span style="color:red">collection</span> by <span style="color:red">id</span> | authenticate | GET 👀 | ❌ |  
| `/flashcards/collection/`<span style="color:red">`:id`</span>`/revise` | Show only flashcards from the <span style="color:red">collection</span> that need to be reviewed by <span style="color:red">id</span> | authenticate | GET 👀 | ❌ |  
| `/flashcards/`<span style="color:red">`:id`</span> | edit <span style="color:red">flashcard</span> by <span style="color:red">id</span> | authenticate | PATCH 🎨 | <span style="color:blue">`{`<br>`frontText: 'complete',`<br>`backText: 'complete',`<br>`frontUrl: 'complete',`<br>`backUrl: 'complete',`<br>`},`</span> |  
| `/flashcards/`<span style="color:red">`:id`</span> | delete <span style="color:red">flashcard</span> by <span style="color:red">id</span> | authenticate | DELETE ☠️ | ❌ |  
| `/flashcards/revise/`<span style="color:red">`:id`</span> | revise the <span style="color:red">flashcard</span> by <span style="color:red">id</span> | authenticate | POST 🍕 | <span style="color:violet">`{`<br>`level: 1/2/3/4/5,`<br>`},`</span> |  
| `/collections` | display user collections | authenticate | GET 👀 | ❌ |  
| `/collections/`<span style="color:red">`:id`</span> | display <span style="color:red">collection</span> by their <span style="color:red">id</span> | authenticate | GET 👀 | ❌ |  
| `/collections` | create collection | authenticate | POST 🍕 | `{`<br>`title: 'complete',`<br><span style="color:violet">`description: 'complete',`</span><br><span style="color:violet">`visibility: public/private,`</span><br>`},` |  
| `/collections/search`<span style="color:#66CDAA">`?q=`</span> | search collection (with param) | authenticate | GET 👀 | ❌ |  
| `/collections/`<span style="color:red">`:id`</span> | edit <span style="color:red">collection</span> user by <span style="color:red">id</span> | authenticate | PATCH 🎨 | <span style="color:blue">`{`<br>`title: 'complete',`<br>`description: 'complete',`<br>`visibility: public/private,`<br>`},`</span> |  
| `/collections/`<span style="color:red">`:id`</span> | delete <span style="color:red">collection</span> user cascade by <span style="color:red">id</span> | authenticate | DELETE ☠️ | ❌ |  

<span style="color:red">route params</span><br><span style="color:violet">optional</span><br><span style="color:blue">optional but at least 1 parameter</span><br><span style="color:#66CDAA">query params</span> 