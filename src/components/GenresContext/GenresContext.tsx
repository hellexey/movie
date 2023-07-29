import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface IGenre {
  id: number
  name: string
}

type GenresContextType = [IGenre[], Dispatch<SetStateAction<IGenre[]>>]

export const GenresContext = createContext<GenresContextType>([
  [],
  () => {
    console.log('GenresContext')
  },
])

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState<IGenre[]>([])

  return <GenresContext.Provider value={[genres, setGenres]}>{children}</GenresContext.Provider>
}
