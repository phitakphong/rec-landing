const getConfig = () => {
  if (typeof window !== "undefined") {
    const env = window as unknown as {
      __ENV__?: {
        NEXT_PUBLIC_CLIENT_API_HOST: string;
        NEXT_PUBLIC_API_KEY: string;
        NEXT_GOOGLE_MAP_API_KEY: string;
      };
    };

    if (env.__ENV__) {
      return {
        baseURL: env.__ENV__.NEXT_PUBLIC_CLIENT_API_HOST,
        apiKey: env.__ENV__.NEXT_PUBLIC_API_KEY,
        googleMapsApiKey: env.__ENV__.NEXT_GOOGLE_MAP_API_KEY,
      };
    }
  }

  return {
    baseURL: process.env.NEXT_PUBLIC_CLIENT_API_HOST || "http://pntdev.ddns.net:28082/api",
    apiKey: process.env.NEXT_PUBLIC_API_KEY || "SaCE5o6t5haRyanQfO3dzPxKCQMg6IcjHkp4oDDSiao4sNZnnYbDQAB2r7n9dZVz",
    googleMapsApiKey: "AIzaSyArRpUnfBJKShmHioFxRt70uH4i90XWNWw",
  };
};

export default getConfig;
