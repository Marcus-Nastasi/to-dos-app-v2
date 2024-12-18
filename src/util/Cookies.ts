export default class Cookie {
   private static getCookieExpirationString(days: number): string {
      const date: Date = new Date();
      date.setTime(date.getTime() + (days * 60 * 60 * 24 * 1000)); // Config to days. For hours, remove the multiply 24.
      return `expires=${date.toUTCString()}`;
   }

   public static getCookie(name: string): string | null {
      const nameEQ: string = `${name}=`;
      const ca: Array<string> = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
         const c: string = ca[i].trimStart();
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
   }

   public static create(key: string, value: string, expiration: number): void {
      document.cookie = `${key}=${value}; ${this.getCookieExpirationString(expiration)}; path=/;`;
   }

   public static cleanCookies() {
      document.cookie.split(";").forEach((cookie) => 
         document.cookie = `${cookie.split("=")[0].trim()}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`);
   }
}
