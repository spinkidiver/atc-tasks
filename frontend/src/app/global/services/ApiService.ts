export class ApiService {
  private static baseUrl = ""; // Puedes cambiar esto según tu configuración
  private static csrfCookieUrl = "/sanctum/csrf-cookie";
  private static csrfInitialized = false;
  private static handleUnauthorizedFn: (() => void) | null = null;

  static async ensureCsrfCookie(): Promise<void> {
    if (this.csrfInitialized) return;

    await fetch(this.csrfCookieUrl, {
      method: "GET",
      credentials: "include",
    });

    this.csrfInitialized = true;
  }
  // Método para configurar la función de redirección
  static setHandleUnauthorized(fn: () => void) {
    this.handleUnauthorizedFn = fn;
  }

  private static async fetchRequest<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    try {
      await this.ensureCsrfCookie();

      const response = await fetch(url, {
        ...options,
        credentials: "include", // importante para enviar cookies
      });

      if (response.status === 401) {
        this.handleUnauthorizedFn?.();
        throw new Error("Unauthorized");
      }

      //   if (!response.ok) {
      //     throw new Error(`Error ${response.status}: ${response.statusText}`);
      //   }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: any = new Error(`Error ${response.status}`);
        error.response = {
          status: response.status,
          data: errorData,
        };
        throw error;
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`Fetch Error (${url}):`, error);
      throw error;
    }
  }

  /**
   * Método GET con soporte para query params
   */
  static async get<T>(
    endpoint: string,
    queryParams?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
          // Si la clave es "filters", la convertimos en JSON
          if (key === "filters") {
            url.searchParams.append(key, JSON.stringify(queryParams[key]));
          } else {
            url.searchParams.append(key, queryParams[key]);
          }
        }
      });
    }

    return this.fetchRequest<T>(url.toString(), {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  /**
   * Método POST
   */
  static async post<T>(endpoint: string, body: any): Promise<T> {
    return this.fetchRequest<T>(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    });
  }

  /**
   * Método PUT
   */
  static async put<T>(endpoint: string, body: any): Promise<T> {
    return this.fetchRequest<T>(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    });
  }

  /**
   * Método DELETE
   */
  static async delete<T>(endpoint: string): Promise<T> {
    return this.fetchRequest<T>(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest", // <-- agrega esto
    };

    return headers;
  }

  static async logout(): Promise<void> {
    await this.fetchRequest(`${this.baseUrl}/logout`, {
      method: "POST",
      headers: this.getHeaders(),
    });
    this.csrfInitialized = false;
  }
}
