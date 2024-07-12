<h1 align="center">Next.js AI Chatbot — NVIDIA NIM + Vercel AI SDK</h1>

<p align="center">

<img src ="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src ="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src ="https://img.shields.io/badge/NVIDIA-76B900.svg?style=for-the-badge&logo=NVIDIA&logoColor=white">
<img src ="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white">

</p>

<a href="https://nvidia-nim.vercel.app/" target="_blank">
  <img src="https://nvidia-nim.vercel.app/og.png" alt="Banner Image" />
</a>

An open-source AI chatbot app template built with Next.js, the Vercel AI SDK and NVIDIA NIM.

## Features

- [Next.js](https://nextjs.org/) 14 App Router
- React Server Components (RSCs) for better performance
- [NVIDIA NIM](https://build.nvidia.com/explore/discover/) API Inference
- [Vercel AI](https://sdk.vercel.ai/) SDK for streaming chat responses
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling and design
- custom rate limiter for server actions
- [Sonner](https://sonner.emilkowal.ski/) for beautiful toast notifications
- [Vercel OG](https://vercel.com/docs/functions/og-image-generation) for open graph images

## How It Works?

This template uses the NVIDIA NIM API to fetch the models and make inferences. The Vercel AI SDK is used to stream the responses from the server to the client in real-time.

## Why custom rate limiter?

NVIDIA NIM provides 1000 credits for free to every new user. So, I've implemented a custom rate limiter to prevent the users from exceeding the limit. The rate limiter is set to 10 request per hour per IP address. You can change the rate limiter settings in the [ratelimit.ts](lib/ratelimit.ts) file when deploying your own version of this template.

## Models Available via NVIDIA NIM

I've only included text-to-text models in this template. You can easily add more models by following the instructions in the [NVIDIA NIM documentation](https://build.nvidia.com/docs/nim/).

The models available in this template are:

**Google**

- `gemma-2b`
- `gemma-2-9b-it`
- `gemma-2-27b-it`

**Meta**

- `llama3-8b-instruct`
- `llama3-70b-instruct`

**NVIDIA**

- `llama3-chatqa-1.5-8b`
- `llama3-chatqa-1.5-70b`
- `nemotron-4-340b-instruct`

**IBM**

- `granite-8b-code-instruct`
- `granite-34b-code-instruct`

> `Mistral AI` and many other models available via NVIDIA NIM are not working with the Vercel AI SDK at the moment. So, I've excluded them from this template. However, you can still use them with the NVIDIA NIM API directly.

## Deploy Your Own

You can deploy your own version of this template with Vercel by clicking the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flakshaybhushan%2Fnextjs-nvidia-chatbot&env=NVIDIA_NIM_API_KEY&demo-title=Next.js%20AI%20Chatbot%20%E2%80%94%20NVIDIA%20NIM%20%2B%20Vercel%20AI%20SDK&demo-description=A%20chatbot%20demo%20built%20with%20Next.js%2C%20NVIDIA%20NIM%2C%20and%20Vercel%20AI%20SDK&demo-url=https%3A%2F%2Fnvidia-nim.vercel.app%2F&demo-image=https%3A%2F%2Fnvidia-nim.vercel.app%2Fog.png)

## Local Development

First, you will need to use the environment variables [defined in `.env.example`](.env.example) to create a `.env.local` file in the root of the project. And make sure not to commit your `.env.local` file to the repository.

```bash
NVIDIA_NIM_API_KEY=
```

To get the NVIDIA NIM API key, you need to sign up on the [NVIDIA NIM website](https://build.nvidia.com/explore/discover/).

Then clone the repository and install the dependencies. This project uses `bun` as the package manager.

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Now the app should be running at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any ideas or suggestions.

## License

I don't know what to put here. I'm not a lawyer. Use this template however you want. It's open-source and free to use.
