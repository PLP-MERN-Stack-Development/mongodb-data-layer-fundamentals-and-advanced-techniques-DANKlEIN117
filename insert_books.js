const {MongoClient} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = "plp_bookstore";
const collectionName = "books";

async function run()
{
  try{
    await client.connect();
    console.log("Connected to Mongodb");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const books = [
      { title: "The Alchemist",
        Author: "Paulo Coelho",
        genre: "Fiction",
        published_year: 1988,
        price: 12.99,
        in_stock: true,
        pages: 208,
        publisher: "HarperOne"
      },
      { title: "Atomic Habits",
        Author: "James Clear",
        genre: "Self_Help",
        published_year: 2018,
        price: 18.99,
        in_stock: true,
        pages: 320,
        publisher: "Avery"
      },
      { title: "Rich Dad Poor Dad",
        Author: "Robert T",
        genre: "Finance",
        published_year: 1997,
        price: 10.5,
        in_stock: true,
        pages: 336,
        publisher: "Warner Books"
      },
      { title: "Sapiens: A Brief History of HumanKind",
        Author: "Yuvai Noah Harari",
        genre: "History",
        published_year: 2011,
        price: 22.00,
        in_stock: true,
        pages: 498,
        publisher: "Harper"
      },
      { title: "The Pragmatic programmer",
        Author: "Andrew Hunt & David Thomas",
        genre: "Programming",
        published_year: 1999,
        price: 30.0,
        in_stock: true,
        pages: 352,
        publisher: "Addison-Wesley"
      },
      { title: "Clean Code",
        Author: "Robert C. Martin",
        genre: "Programming",
        published_year: 2008,
        price: 28.99,
        in_stock: false,
        pages: 464,
        publisher: "prentice Hall"
      },
      { title: "Thinking, Fast and Slow",
        Author: "Daniel Kahneman",
        genre: "psychology",
        published_year: 2011,
        price: 15.99,
        in_stock: true,
        pages: 499,
        publisher: "Farrar, Straus and Giroux"
      },
      { title: "1984",
        Author: "George Orwell",
        genre: "Dystopian",
        published_year: 1949,
        price: 9.99,
        in_stock: true,
        pages: 328,
        publisher: "Secker and Warburg"
      },
      { title: "To Kill a Mockingbird",
        Author: "Harper Lee",
        genre: "Classic",
        published_year: 1960,
        price: 11.5,
        in_stock: false,
        pages: 281,
        publisher: "J.B. Lippincott & Co."
      },
      { title: "The Subtle Art of Not Giving a F*ck",
        Author: "Mark Manson",
        genre: "Self-Help",
        published_year: 2016,
        price: 16.99,
        in_stock: true,
        pages: 224,
        publisher: "HarperOne"
      },
    ];

    const result = await collection.insertMany(books);
    console.log(`Inserted ${result.insertedCount} books`);
    } catch (err) {
      console.error("Error inserting books:", err);

    }finally{
      await client.close();
    }
  }

run();