// Settings for yer servers
interface ServerSettings {
  // Name of the server.
  name: string;
  // Information about the server (IE, its purpose.)
  // You can leave it blank, but it'd be nice if you
  // let people know what it did, right?
  info?: string | null;
  // URL of the server, if applicable.
  location?: string;
}

// Actual general settings for Doping.
interface DopingSettings {
  // Interval between pings (in MS!)
  interval: number;
  // Site name
  name: string;
  // Site logo (Go with a big PNG or SVG ya dimwit)
  logo: string;
  servers: ServerSettings[];
}

// THE SETTINGS YOU'RE LOOKING TO CONFIGURE ARE HERE:
export const configuration: DopingSettings = {
  interval: 60000,
  name: "Doping",
  homeURL: "https://deno.land",  
  logo: "/logo.svg",
  servers: [
    {
      name: "Example.com",
      info: "Example domain used in various documentation sites.",
      location: "http://www.example.com",
    },
    {
      name: "W3C",
      info: "Standards body involved with various internet protocols.",
      location: "https://www.w3.org/",
    },
    {
      name: "MDN",
      info: "MDN Web Docs.",
      location: "https://developer.mozilla.org/en-US/",
    },
    {
      name: "404 Domain",
      info: "This domain will always return a 404 message.",
      location: "https://google.com/error",
    },
  ],
};
