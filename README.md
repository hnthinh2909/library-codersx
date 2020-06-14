# This repo is exercise from Coders X about create a web app to manage library
- I used tool on github: 
  + [lowdb](https://github.com/typicode/lowdb)
  + [pug](https://pugjs.org/api/getting-started.html)
  + [shortid](https://github.com/dylang/shortid)
  + [body-parser](https://github.com/expressjs/body-parser)
  + [nodemon](https://github.com/remy/nodemon)
  + [bcrypt](https://www.npmjs.com/package/bcrypt)
  + [@sendgrid/mail](https://sendgrid.com/)
  + [cloudinary](https://cloudinary.com/users/register/free)
  + [dotenv](https://github.com/motdotla/dotenv)
  + [--inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/)
  + [multer](https://github.com/expressjs/multer)
  + [serve-favicon](https://github.com/expressjs/serve-favicon)
## And it's made to create, edit or delete a book, a user or to watching who is borrowing book in library
- I create Transactions(who is borrowed book), User(information, avatar) is two route just admin can use.
- And route Library(title and description of the book), Products, Cart is for user to use. In there Product and Cart is public, but Library is private, just user logined can use.
