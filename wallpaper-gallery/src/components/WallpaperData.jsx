import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Wallpaper } from "./Wallpaper";

export const WallpaperData = () => {
  const [wallpaper, setWallpaper] = useState([]);
  const [page, setPage] = useState(1);

  const fetchWallpaper = async () => {
    const newWallpaper = Array.from({ length: 10 }, (_, index) => {
      // Generate a stable ID for each image
      const imageId = (page - 1) * 10 + index + 1;
      return {
        id: wallpaper.length + index + 1,
        // Use the stable ID in the URL
        url: `https://picsum.photos/id/${imageId}/720/1280`,
      };
    });

    setWallpaper([...wallpaper, ...newWallpaper]);
    setPage(page + 1);
  };

  // Function to handle wallpaper download
  const downloadWallpaper = async (url, e) => {
    const button = e.currentTarget;
    const originalText = button.textContent;

    try {
      // Show loading message
      button.textContent = "Downloading...";

      // Fetch the image with cache: 'no-store' to ensure we get the exact image
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      // Use a more descriptive filename with the image ID
      const imageId = url.split("/id/")[1].split("/")[0];
      link.download = `wallpaper-${imageId}.jpg`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(downloadUrl);
      button.textContent = originalText;
    } catch (error) {
      console.error("Error downloading wallpaper:", error);
      alert("Failed to download wallpaper");
      // Reset button text if there's an error
      button.textContent = "Download";
    }
  };

  // Load initial wallpapers when the component mounts
  useEffect(() => {
    fetchWallpaper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <h1>Wallpaper Gallery</h1>
      <div className="wallpaper-grid">
        <InfiniteScroll
          dataLength={wallpaper.length}
          next={fetchWallpaper}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {wallpaper.map((item) => (
            <Wallpaper
              key={item.id}
              url={item.url}
              id={item.id}
              onDownload={(e) => downloadWallpaper(item.url, e)}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};
