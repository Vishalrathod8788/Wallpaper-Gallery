export const Wallpaper = ({ url, id, onDownload }) => {
  return (
    <div className="wallpaper-item">
      <img src={url} alt={`wallpaper ${id}`} loading="lazy" />
      <button className="download-button" onClick={onDownload}>
        Download
      </button>
    </div>
  );
};
