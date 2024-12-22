import Dexie from 'dexie';

export interface ImageData {
  id: string; // 이미지 식별용 ID
  base64: string; // Base64 (data URL) 형태로 저장
  fileName?: string; // 파일명(확장자 제거 등) 저장할 경우
}

class ImageDB extends Dexie {
  public images!: Dexie.Table<ImageData, string>;

  constructor() {
    super('ImageDB');
    this.version(1).stores({
      // 기본 키를 'id'로
      images: 'id',
    });
  }
}

export const db = new ImageDB();
