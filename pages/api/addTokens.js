import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  const { user } = await getSession(req, res);
  console.log(user);
  const client = await clientPromise;
  const db = client.db("ai-tokenwriter");

  const userProfile = await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: 10,
      },
      $setOnInsert: {
        // if the document doesnt exist we have to make sure it has the auth0id as an element
        auth0Id: user.sub,
      },
    },
    {
      upsert: true,
    }
  );
  res.status(200).json({ name: "John Doe" });
}
