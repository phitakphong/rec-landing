class ApiService {
  static API_ENDPOINT = "http://pntdev.ddns.net:28082/api";
  static API_KEY = "SaCE5o6t5haRyanQfO3dzPxKCQMg6IcjHkp4oDDSiao4sNZnnYbDQAB2r7n9dZVz";
  static YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyArRpUnfBJKShmHioFxRt70uH4i90XWNWw";

  static DEFAULT_HEADERS = {
    accept: "application/json",
    "X-ApiKey": ApiService.API_KEY,
    "Content-Type": "application/json",
  };

  static async getBilling(data: any) {
    const url = `${ApiService.API_ENDPOINT}/billing`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: ApiService.DEFAULT_HEADERS,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  static async getBanners() {
    const url = `${ApiService.API_ENDPOINT}/banners`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  static async getFaqs() {
    const url = `${ApiService.API_ENDPOINT}/faqs`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  static async getNews() {
    const url = `${ApiService.API_ENDPOINT}/news`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
  static async getNewsDetail(id: string) {
    const url = `${ApiService.API_ENDPOINT}/news/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
  static async getPartners() {
    const url = `${ApiService.API_ENDPOINT}/partners`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
