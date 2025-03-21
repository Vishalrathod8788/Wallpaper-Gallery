import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Wallpaper } from "./Wallpaper";

export const WallpaperData = () => {
  const [wallpaper, setWallpaper] = useState([]);
  const [page, setPage] = useState(1);

  // Function to fetch more wallpapers
  const fetchWallpaper = async () => {
    const newWallpaper = [];
    for (let i = 0; i < 10; i++) {
      newWallpaper.push({
        id: wallpaper.length + i + 1,
        url: `https://picsum.photos/720/1280?random=${Date.now() + i}`,
      });
    }

    setWallpaper([...wallpaper, ...newWallpaper]);
    setPage(page + 1);
  };

  // Function to handle wallpaper download
  const downloadWallpaper = async (url, id) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `wallpaper-${id}.jpg`; // Use the wallpaper ID for the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl); // Clean up
    } catch (error) {
      console.log(error);
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
      <InfiniteScroll
        dataLength={wallpaper.length} // Number of items loaded so far
        next={fetchWallpaper} // Function to load more items
        hasMore={true} // Whether there are more items to load
        loader={<h4>Loading...</h4>} // Show a loading message
      >
        {wallpaper.map((wallpaper) => (
          <Wallpaper
            key={wallpaper.id}
            url={wallpaper.url}
            id={wallpaper.id}
            onDownload={() => downloadWallpaper(wallpaper.url, wallpaper.id)} // Pass URL and ID
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};