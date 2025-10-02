const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "plp_bookstore";
const collectionName = "books";

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ---------- BASIC QUERIES ----------
    console.log("\n Find all Programming books:");
    console.log(await collection.find({ genre: "Programming" }).toArray());

    console.log("\n Find books published after 2010:");
    console.log(await collection.find({ published_year: { $gt: 2010 } }).toArray());

    console.log("\n Find books by Paulo Coelho:");
    console.log(await collection.find({ author: "Paulo Coelho" }).toArray());

    console.log("\n Update price of 'The Alchemist':");
    await collection.updateOne({ title: "The Alchemist" }, { $set: { price: 14.99 } });
    console.log(await collection.findOne({ title: "The Alchemist" }));

    console.log("\n Delete book with title '1984':");
    await collection.deleteOne({ title: "1984" });
    console.log("Deleted book '1984' ");

    // ---------- ADVANCED QUERIES ----------
    console.log("\n In stock & published after 2010:");
    console.log(await collection.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    console.log("\n Projection (title, author, price only):");
    console.log(await collection.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());

    console.log("\n Books sorted by price ASC:");
    console.log(await collection.find().sort({ price: 1 }).toArray());

    console.log("\n Books sorted by price DESC:");
    console.log(await collection.find().sort({ price: -1 }).toArray());

    console.log("\n Pagination (page 1, 5 books):");
    console.log(await collection.find().limit(5).toArray());

    console.log("\n Pagination (page 2, 5 books):");
    console.log(await collection.find().skip(5).limit(5).toArray());

    // ---------- AGGREGATIONS ----------
    console.log("\n Average price by genre:");
    console.log(await collection.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray());

    console.log("\n Author with the most books:");
    console.log(await collection.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray());

    console.log("\n Group books by decade:");
    console.log(await collection.aggregate([
      { $project: { decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray());

    // ---------- INDEXES ----------
    console.log("\n Creating index on title...");
    await collection.createIndex({ title: 1 });

    console.log("\n Creating compound index on author + published_year...");
    await collection.createIndex({ author: 1, published_year: -1 });

    console.log("\n Explain query (find by title 'Clean Code'):");
    console.log(await collection.find({ title: "Clean Code" }).explain("executionStats"));

  } catch (err) {
    console.error(" Error running queries:", err);
  } finally {
    await client.close();
    console.log("\n Connection closed");
  }
}

run();
