# A full stack application starter for your next big idea

*Using typescript, react, express, and typeorm and hosted on heroku free tier*

Recently I've been dreaming of building up my own web app project, from inception to launch. This article by levels.io really inspired me to get started and build an idea as fast as possible. However, when I looked around I didn't see a suitable platform to get my application off the ground as fast as possible. All the existing tutuorials, 'hackathon starters', project generators, you name it, didn't seem to cover all the bases I needed. In short, I wanted:

- Freedom from vendor lock-in or reliance on external services
- Front and backend all in typescript
- easy to deploy and develop
- API-based backend to talk to other platforms (i.e. React Native)
- lots of available documentation

Eventually, I settled on this list of technologies:

## Frontend: React 

Currently the most popular frontend javascript framework out there for making dynamic, responsive webapps. I also have more experience with it than others like angular or vue.

I'm currently sticking with the tooling provided by `create-react-app`. The built-in support for TypeScript and Sass compilation is absolutely killer. For TypeScript, you just replace all your `.js` files with `.ts` or `.tsx`. That's it. I've spent so many hours fiddling with build scripts in previous projects just to get my code to compile, it was such a refreshing change to not have to do so again. I want this project to help other developers cut down on headaches from tooling issues and get to work.

There are a few necessary packages I've also added alongside react:

### React-Router

Our express server will be acting as an API server only - so no pages getting served from there besides the initial `index.html` page. All routing will be done client-side by react-router.

### Bootstrap

There are lots of ways to style your react app. I've always liked bootstrap, so I chose to use the `react-bootstrap` package for some quick and easy styles. I also included `react-router-bootstrap` for nav components that play nicely with `react-router`.

### Bootswatch

Bootswatch makes and distributes bootstrap themes. This package includes all of their free ones. I chose the `simplex` theme for my project because it looked nice and modern.

### Other options

As I mentioned, the express backend will be serving as only an API server. So, that means you could choose to replace the whole frontend with Vue or Angular if you wish, and all the backend code would stay the same. If you stay with React, some people also really like `styled-components` and you might choose to use that instead of premade UI Components. However the point of this starter is to be the least intrusive and easiest to use, so I find having tons of components already made to be really helpful. 

## Backend: Express.js 

(with `passport` for auth and `typeORM` for db)

## Hosting: Heroku free tier

Our express backend works as an API server and also serves the react app. It'll be entirely possible for you to separate these two things too, for example to deploy your Express server to AWS and your react frontend to Netlify. However, I chose to keep it all together on heroku.

# Setup

