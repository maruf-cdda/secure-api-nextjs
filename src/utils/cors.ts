import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const initCors = (request: NextApiRequest, response: NextApiResponse) => {
  const cors = Cors({
    methods: ["GET", "POST", "HEAD"],
    origin: ["http://localhost:3000"], // Replace with your allowed origins
    optionsSuccessStatus: 200,
  });

  return new Promise((resolve, reject) => {
    cors(request, response, (result: any) => {
      if (result instanceof Error) {
        reject(new Error("CORS Error"));
      } else {
        resolve(result);
      }
    });
  });
};

export default initCors;
