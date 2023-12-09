# Social Media App - Twitter Clone - Nuxt 3 App

*Tweets*

![image](https://github.com/leomiranda/nuxt-3-tailwind-prisma/assets/32196/3eee082c-4c9c-4445-b3b7-ef30a41d1e2c)

*Dark Mode*

![image](https://github.com/leomiranda/nuxt-3-tailwind-prisma/assets/32196/eff52042-fcca-4f37-b16c-c0f89eee13f3)

*Tweet*

![image](https://github.com/leomiranda/nuxt-3-tailwind-prisma/assets/32196/c367e0bd-b624-4ff2-a0e1-0654135f8140)

*Search* 

![image](https://github.com/leomiranda/nuxt-3-tailwind-prisma/assets/32196/99f73bc9-5735-4919-a65a-254f9a0e89cf)


## Challenge

The project is a Social Media App (a Twitter clone) built with Nuxt 3, Tailwind CSS and Prisma. 

The code ncludes Auth made from scratch using JWT the ability to create posts, upload images using cloudinary, nested posts, searching functionality, post details page, responsive design using Tailwind css and much more.


### Credit

The code was based on the video https://www.youtube.com/watch?v=_cM4j9_LfQk with some changes and updates.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

Clone the file `.env.example` and rename to `.env`, fills with your data.

Run prisma.

```bash
# pnpm
npx prisma generate
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
