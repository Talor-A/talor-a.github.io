---
layout: post
title: MC Alexa
Published: false
---

![MC Alexa Poster](images/posts/mc-alexa.jpg)

## Inspiration

We wanted to use Amazon's Alexa to demonstrate how wolfram alpha's API could be used in a simple, real world setting and decided to use the 'rhyming words' feature to create short raps about a given word.

## What it does

When given a word, the Amazon Echo gets a list of rhymes from Wolfram Alpha and answers with a few short rap verses.

## How we built it

We used Amazon's Lambda serverless architecture to create a custom node.js server to run when contacted by the Echo. The node server then contacts Wolfram Alpha using their API, parses the response it receives and transforms it into a short rap, then sends this data back to the Echo to be spoken aloud.

## Challenges we ran into

- We had difficulty setting up the AWS Lambda but were helped by a fellow hacker. We also hoped to have a custom web server running alongside the AWS Lambda, but it would have taken too long. 

## Accomplishments that we're proud of

- We demo'ed MC Alexa on stage at HackPoly during the night's freestyle battle with great success. 
- This was our team's first hackathon ever, and as first year students we're happy to have finished a product in the end

## What we learned

- Only 2 of our 4 team members had prior experience with JavaScript / NodeJS. 
- None of us had developed with AWS or an Echo before

## What's next for MC Alexa

- We'd like to expand MC Alexa's database of rap verses, or even connect it to a service like [Genius](http://rapgenius.com/).
- Share our project with others or publish our Alexa Skill for others to use 

## Built With

- 