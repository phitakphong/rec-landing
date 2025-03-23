import getConfig from "../app/config";

class ApiService {
  static API_ENDPOINT = getConfig().baseURL;
  static API_KEY = getConfig().apiKey;
 
  static get YOUR_GOOGLE_MAPS_API_KEY() {
    return getConfig().googleMapsApiKey;
  }

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

      return await ApiService.handleResponse(response);
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

      return await ApiService.handleResponse(response);
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
      return await ApiService.handleResponse(response);
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

      return await ApiService.handleResponse(response);
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

      return await ApiService.handleResponse(response);
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

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async getProvinces() {
    const url = `${ApiService.API_ENDPOINT}/ref/provinces`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async getDistricts(provinceCode: string) {
    const url = `${ApiService.API_ENDPOINT}/ref/districts/${provinceCode}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async getSubDistricts(districtCode: string) {
    const url = `${ApiService.API_ENDPOINT}/ref/sub-districts/${districtCode}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async register(req: any) {
    const url = `${ApiService.API_ENDPOINT}/register/create`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: ApiService.DEFAULT_HEADERS,
        body: JSON.stringify(req),
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async getRequests() {
    const url = `${ApiService.API_ENDPOINT}/register/requests`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async createContactUs(req: any) {
    const url = `${ApiService.API_ENDPOINT}/contact-us/create`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: ApiService.DEFAULT_HEADERS,
        body: JSON.stringify(req),
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async uploadFile(file: File) {
    const url = `${ApiService.API_ENDPOINT}/upload`;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-ApiKey": ApiService.API_KEY,
          accept: "application/json",
        },
        body: formData,
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async createOrUpdateCooperation(req: any, id: string | null = null) {
    if (id) {
      return await ApiService.updateCooperation(id, req);
    } else {
      return await ApiService.createCooperation(req);
    }
  }

  static async createCooperation(req: any) {
    const url = `${ApiService.API_ENDPOINT}/cooperation/create`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: ApiService.DEFAULT_HEADERS,
        body: JSON.stringify(req),
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async updateCooperation(id: string, req: any) {
    const url = `${ApiService.API_ENDPOINT}/cooperation/update/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: ApiService.DEFAULT_HEADERS,
        body: JSON.stringify(req),
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  static async getCooperation(id: string) {
    const url = `${ApiService.API_ENDPOINT}/cooperation/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: ApiService.DEFAULT_HEADERS,
      });

      return await ApiService.handleResponse(response);
    } catch (error) {
      throw error;
    }
  }

  private static handleResponse = async (response: any) => {
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const responseData = await response.json();
    return responseData;
  };
}

export default ApiService;
