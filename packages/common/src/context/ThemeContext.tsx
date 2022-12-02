import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type ThemeOptions = 'The Door' | 'BSA'

interface IThemeContext {
  theme?: ThemeOptions
  setTheme: Dispatch<SetStateAction<ThemeOptions>>
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined)

const useThemeContext = () => {
  return useContext(ThemeContext) as IThemeContext
}

export const ThemeContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const [theme, setTheme] = useState<ThemeOptions | undefined>(undefined)
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: val => setTheme(val as ThemeOptions),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default useThemeContext
