const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "Usha@267",
      database: "USERLOGIN",
    },
  });


  knex.schema.hasTable('userTable').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("userTable", function (t) {
        t.increments("id")
        t.string("name").notNullable()
        t.string("email").notNullable().unique();
        t.string("password").notNullable()
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('update_at').defaultTo(knex.fn.now());

      })
    }
  });


knex.schema.hasTable('posts').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable("posts", function (t) {
      t.string("title").notNullable()
      t.string("description").notNullable()
      t.string("user_id").notNullable()
      t.increments("post_id")
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('update_at').defaultTo(knex.fn.now());
    })
  }
});

knex.schema.hasTable('likeDislike').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable("likeDislike", function (t) {
      t.increments("id")
      t.boolean("like").notNullable()
      t.boolean("dislike").notNullable()
      t.string("user_id").notNullable()
      t.integer("post_id").notNullable()
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('update_at').defaultTo(knex.fn.now());
    })
  }
});


//join tables;


// knex('posts')
//   .join('userTable', 'posts.id', '=', 'userTable.id')
//   .join('likeDislike','posts.id','=','likeDislike.id')
//   .select('posts.id', 'userTable.name')
//   .then(()=>{
//       console.log("table join");
//   })
//   .catch((err)=>{
//       console.log(err);
//   })

  

// // creatTable()

module.exports=knex; 
