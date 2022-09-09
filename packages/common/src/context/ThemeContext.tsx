import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

type ThemeOptions = 'The Door' | 'BSA'

interface IContext {
  theme?: ThemeOptions
  setTheme: Dispatch<SetStateAction<ThemeOptions>>
}

const defaultValue = {
  theme: undefined,
  setTheme: () => null,
}

const ThemeContext = createContext<IContext>(defaultValue)

export const ThemeContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [theme, setTheme] = useState<ThemeOptions | undefined>(
    defaultValue.theme
  )
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

export default ThemeContext
