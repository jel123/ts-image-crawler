export type ImagesTypeData = {
  url: string;
  fileSize: number;
  fileType: string;
  fileDimension: { width: number; height: number };
}[];

export type MyInterface = {
  items: ImagesTypeData[];
};
