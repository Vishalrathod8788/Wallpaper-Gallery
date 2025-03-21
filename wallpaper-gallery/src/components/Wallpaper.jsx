export const Wallpaper = ({ url, id, onDownload }) => {
  return (
    <div>
      <img src={url} alt={`wallpaper ${id}`} loading="lazy" />
      <button onClick={onDownload}>Download</button>
    </div>
  );
};
