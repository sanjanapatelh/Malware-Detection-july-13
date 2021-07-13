import type { NextApiRequest, NextApiResponse } from 'next'

const { Octokit } = require("@octokit/rest")
const { Base64 } = require("js-base64")
const fs = require("fs")

require("dotenv").config()

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
})
const main2=async(str)=>{

}
export default async (req:NextApiRequest, res:NextApiResponse)=> {


        const hash = req.body.hash;


        try{
            const filename=hash//assign as str
            const {data}=await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: 'manjularachana',
                repo: 'githubApiUsageToUploadDownload',
                path: filename
              })
              console.log(data.html_url)
              res.status(200).json(data.html_url)
            }
             catch (err) {
            console.error(err)
            }
          }
