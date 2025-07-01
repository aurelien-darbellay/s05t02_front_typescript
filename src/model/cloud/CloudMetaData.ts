// Base interface with discriminator
export interface CloudMetaData {
  type: string;
  id: string;
  publicUrl: string;
}

export class CloudinaryMetaData implements CloudMetaData {
  public type: string = 'CLOUDINARYMETADATA';
  constructor(
    public id: string,
    public publicUrl: string
  ) {
    this.id = id;
    this.publicUrl = publicUrl;
  }
  static isCloudinaryMetaData(obj: any): obj is CloudinaryMetaData {
    return (
      obj != null &&
      typeof obj === 'object' &&
      obj.type === 'CLOUDINARYMETADATA' &&
      typeof obj.id === 'string' &&
      typeof obj.publicUrl === 'string'
    );
  }
} // Specific implementation
