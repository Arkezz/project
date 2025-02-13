const handleVote = (id: string, type: "up" | "down") => {
  setUserVotes((prev) => {
    const currentVote = prev[id];
    if (currentVote === type) {
      const newVotes = { ...prev };
      delete newVotes[id];
      return newVotes;
    }
    return { ...prev, [id]: type };
  });

  setVotes((prev) => ({
    ...prev,
    [id]: (prev[id] || 0) + (type === "up" ? 1 : -1),
  }));
};

const VoteOverlay = ({ id, initialVotes = 0 }) => {
  const userVote = userVotes[id];
  const currentVotes = votes[id] ?? initialVotes;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
    >
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-white text-sm">
          <Sparkles size={14} className="text-amber-400" />
          <span className="font-medium">
            {currentVotes > 0 ? `+${currentVotes}` : currentVotes}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(id, "up")}
            className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${
              userVote === "up"
                ? "bg-green-500/20 text-green-400 ring-1 ring-green-400"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <ThumbsUp size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(id, "down")}
            className={`p-1.5 rounded-full backdrop-blur-sm transition-all ${
              userVote === "down"
                ? "bg-red-500/20 text-red-400 ring-1 ring-red-400"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <ThumbsDown size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

<section>
  <h2 className="text-xl font-semibold mb-4">Related Works</h2>
  <div className="space-y-3">
    {Object.entries(relatedWorks).map(([category, works]) => (
      <div key={category}>
        {works.map((work) => (
          <motion.div
            key={work.id}
            className="relative"
            onHoverStart={() => setHoveredWork(work.id)}
            onHoverEnd={() => setHoveredWork(null)}
          >
            <div className="bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 p-3">
                {/* Timeline indicator */}
                <div className="flex-shrink-0 w-1 self-stretch bg-primary/10 rounded-full" />

                {/* Cover image */}
                <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={work.cover}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium line-clamp-1">{work.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full">
                          {work.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {work.timelinePeriod}
                        </span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {hoveredWork === work.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-2"
                      >
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {work.synopsis}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen size={12} />
                            <span>{work.chapters} chapters</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{work.status}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ))}
  </div>
</section>;
{
  /* Recommendations */
}
<section>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">Recommendations</h2>
    <div className="flex items-center gap-2">
      <select
        value={recommendationSort}
        onChange={(e) => setRecommendationSort(e.target.value as any)}
        className="text-sm bg-transparent border-none focus:ring-0 text-gray-600"
      >
        <option value="match">Best Match</option>
        <option value="recent">Recently Added</option>
      </select>
      <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-lg">
        <button
          onClick={() => setRecommendationView("grid")}
          className={`p-1.5 rounded-md transition-colors ${
            recommendationView === "grid"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <LayoutGrid size={16} />
        </button>
        <button
          onClick={() => setRecommendationView("list")}
          className={`p-1.5 rounded-md transition-colors ${
            recommendationView === "list"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <LayoutList size={16} />
        </button>
      </div>
    </div>
  </div>

  <div
    className={
      recommendationView === "grid"
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        : "space-y-3"
    }
  >
    {recommendations.map((rec) => (
      <motion.div
        key={rec.id}
        className={`group ${
          recommendationView === "list"
            ? "flex items-start gap-4 bg-surface p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            : ""
        }`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className={`relative ${
            recommendationView === "list" ? "w-20 h-28" : "aspect-[2/3]"
          } rounded-lg overflow-hidden`}
        >
          <img
            src={rec.cover}
            alt={rec.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {recommendationView === "grid" && (
            <VoteOverlay id={rec.id} initialVotes={rec.votes} />
          )}
        </div>

        <div className={recommendationView === "list" ? "flex-1" : "mt-2"}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium line-clamp-1">{rec.title}</h3>
              <div className="mt-1 flex flex-wrap gap-1">
                {rec.sharedGenres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            {recommendationView === "list" && (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVote(rec.id, "up")}
                  className={`p-1.5 rounded-full transition-all ${
                    userVotes[rec.id] === "up"
                      ? "bg-green-50 text-green-500 ring-1 ring-green-200"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <ThumbsUp size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleVote(rec.id, "down")}
                  className={`p-1.5 rounded-full transition-all ${
                    userVotes[rec.id] === "down"
                      ? "bg-red-50 text-red-500 ring-1 ring-red-200"
                      : "text-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <ThumbsDown size={16} />
                </motion.button>
              </div>
            )}
          </div>
          {recommendationView === "list" && (
            <p className="text-sm text-gray-500 mt-2">{rec.reason}</p>
          )}
        </div>
      </motion.div>
    ))}
  </div>
</section>;
