import React from "react";
import { motion } from "framer-motion";
import { Crown, User } from "lucide-react";
import type { Character } from "../../types/novelOverview";

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export default function CharacterGrid({
  characters,
  onCharacterClick,
}: CharacterGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {characters.map((character, index) => (
        <motion.button
          key={character.id}
          onClick={() => onCharacterClick(character)}
          className="text-left group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="flex items-center gap-3 p-3 rounded-lg bg-surface hover:bg-gray-50 transition-colors">
            {character.image ? (
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium line-clamp-1">
                  {character.name}
                </span>
                {character.role === "Main" && (
                  <Crown className="w-4 h-4 text-amber-400" />
                )}
              </div>
              {character.originalName && (
                <p className="text-sm text-gray-500 font-kr line-clamp-1">
                  {character.originalName}
                </p>
              )}
              <p className="text-xs text-gray-400">{character.role}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
