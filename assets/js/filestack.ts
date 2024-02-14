import { client } from "filestack-react";

class FilestackApi {
  protected readonly client: client.Client;

  public constructor() {
    this.client = new client.Client("AUhXmDegGSgGgXYMTNi53z");
  }

  public async upload(file: File | File[], onProgress: (event: any) => void) {
    if (Array.isArray(file)) {
    } else {
      let res = await this.client.upload(file, { onProgress });

      return res;
    }
  }
}

export default FilestackApi;
