export default function ImagePicker({ images, selectedImage, onSelect }) {
  // const baseUrl = import.meta.env.VITE_API_URL;
  const baseUrl = 'http://localhost:3000';
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? 'selected' : undefined}
          >
            <img
              src={`${baseUrl}/${image.path}`}
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
