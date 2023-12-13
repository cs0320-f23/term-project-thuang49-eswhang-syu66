export interface trackResponse {
    album: {
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    };
    artists: {
      name: string;
    }[];
    id: string;
    name: string;
    type: string;
    duration_ms: number;
    uri: string;
  }