// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;

import QueryProcessor from "../../utils/QueryProcessor";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.url);
  
  const query = typeof req.query.q === "string" ? req.query.q : "";
  const response = QueryProcessor(query);

  res.status(200).send(response);
}
