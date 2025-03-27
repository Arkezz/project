import { useEffect, useState } from "react";

function ProfileHeader() {
  const defaultBanner =
    "https://s4.anilist.co/file/anilistcdn/user/banner/b749709-NL5ZKZoCj9AU.jpg";
  const defaultAvatar =
    "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b749709-d10WtjTrjyWK.png";

  // For the fly animation effect
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setShowAvatar(true);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-64 overflow-hidden md:h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <img
          src={defaultBanner}
          alt="Profile Banner"
          className="h-full w-full object-cover"
        />

        {/* Currently Reading Badge */}
        <div className="absolute left-4 top-4 overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm">
          <div className="px-3 py-1 text-xs text-white/80">
            Currently Reading
          </div>
          <div className="flex cursor-pointer items-center gap-2 p-2 transition-colors hover:bg-white/10">
            <img
              src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=100"
              alt="Currently Reading"
              className="h-14 w-10 rounded object-cover"
            />
            <div>
              <p className="line-clamp-1 text-sm font-medium text-white">
                The Beginning After The End
              </p>
              <p className="text-xs text-white/80">Chapter 324</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end pb-0">
            <div
              className="relative"
              style={{
                opacity: showAvatar ? 1 : 0,
                transform: `translateY(${showAvatar ? 0 : 20}px)`,
                transition: "opacity 300ms, transform 300ms",
              }}
            >
              <div className="flex h-24 w-24 items-end md:h-32 md:w-32">
                <img
                  src={defaultAvatar}
                  alt="Profile Avatar"
                  className="w-full object-cover"
                />
              </div>
            </div>

            <div className="mb-4 ml-4 text-white md:ml-6">
              <h1 className="text-2xl font-bold md:text-3xl">John Doe</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
