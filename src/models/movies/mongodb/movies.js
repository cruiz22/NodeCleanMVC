import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import IMovieModel from '../../interfaces/IMovies.js';

import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPASSWORD}@cluster0.wtwyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function connect() {
  try {
    await client.connect();
    const database = client.db('database');
    return database.collection('movies');
  } catch (error) {
    console.error('Error connecting to the database');
    console.error(error);
    await client.close();
  }
}

export class MovieModel extends IMovieModel {
  static async getAll({ genre }) {
    try {
      const db = await connect();

      if (genre) {
        return db
          .find({
            genre: {
              $elemMatch: {
                $regex: genre,
                $options: 'i'
              }
            }
          })
          .toArray();
      }

      return db.find({}).toArray();
    } catch (error) {
      console.error('Error getAll from the database');
      console.error(error);
      return;
    }
  }

  static async getById({ id }) {
    try {
      const db = await connect();
      const objectId = ObjectId.createFromHexString(id);
      return db.findOne({ _id: objectId });
    } catch (error) {
      console.error('Error getById from the database');
      console.error(error);
      return;
    }
  }

  static async create({ input }) {
    try {
      const db = await connect();

      const { insertedId } = await db.insertOne(input);

      return {
        id: insertedId,
        ...input
      };
    } catch (error) {
      console.error('Error getById from the database');
      console.error(error);
      return;
    }
  }

  static async delete({ id }) {
    try {
      const db = await connect();
      const objectId = ObjectId.createFromHexString(id);
      const { deletedCount } = await db.deleteOne({ _id: objectId });
      return deletedCount > 0;
    } catch (error) {
      console.error('Error getById from the database');
      console.error(error);
      return;
    }
  }

  static async update({ id, input }) {
    try {
      const db = await connect();
      const objectId = ObjectId.createFromHexString(id);

      const result = await db.findOneAndUpdate(
        { _id: objectId },
        { $set: input },
        { returnNewDocument: true }
      );

      if (!result) return false;
      return result;
    } catch (error) {
      console.error('Error getById from the database');
      console.error(error);
      return;
    }
  }
}
