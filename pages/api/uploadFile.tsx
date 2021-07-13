import type { NextApiRequest, NextApiResponse } from 'next'
const { Octokit } = require("@octokit/rest")
const { Base64 } = require("js-base64")
const fs = require("fs")


require("dotenv").config()

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})

//to upload file by providing just hash as we are naming the file with hash
export default async (req:NextApiRequest, res:NextApiResponse)=> {
    try {
        //set as header and send whatever the hash u r sending
        const filePath  = req.body.filepath ;
        const hash = req.body.hash;


        const content = fs.readFileSync(filePath, "utf-8")
        const contentEncoded = Base64.encode(content)

        const { data } = await octokit.repos.createOrUpdateFileContents({
          // replace the owner and email with your own details
          owner: "manjularachana",
          repo: "githubApiUsageToUploadDownload",
          path: hash,
          message: "feat: Added OUTPUT.md programatically",
          content: contentEncoded,
        })
    res.status(200).json({data})
      } catch (err) {
        console.error(err)
      }
}
