import { PhotoProvider, PhotoView } from "react-photo-view";

export default function PhotoViewFull({ img }) {
  return (
    <PhotoProvider>
      <PhotoView src={img}>
        <img src={img} alt="" />
      </PhotoView>
    </PhotoProvider>
  );
}
