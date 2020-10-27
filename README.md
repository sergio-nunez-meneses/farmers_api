1. ```express folder_name --view=pug```

2. ```cd folder_name```

3. ```npm install nodemon sequelize mysql2 pg pg-hstore express-session express-async-handler cors body-parser joi bcrypt fs express-fileupload --save```

4. ```sequelize init```

5. ```sequelize db:create```

6. ```sequelize model:create --name table_name --attributes index:type,index:type,index:type...```

7. assuming you have already created a new heroku app and connected it to a github repository: on the dashboard overview, click on _Configure Add-ons_, and in the search input, type _Postgres_ and select it.

8. get heroku database url: ```heroku config:get DATABASE_URL --app app-name```

9. if errors: ```heroku logs --tail --app app-name```

10. ```heroku ps:stop dyno --app app-name```
