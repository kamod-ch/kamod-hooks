import { useTheme } from '@kamod-ch/hooks'

export default function UseThemeDemo() {
  const { theme, themeMode, setThemeMode } = useTheme({ localStorageKey: 'kamod-hooks-demo-theme' })

  return (
    <div>
      <p><strong>Resolved theme:</strong> {theme}</p>
      <p><strong>Mode:</strong> {themeMode}</p>
      <div class="demo-actions">
        <button type="button" onClick={() => setThemeMode('light')}>Light</button>
        <button type="button" onClick={() => setThemeMode('dark')}>Dark</button>
        <button type="button" onClick={() => setThemeMode('system')}>System</button>
      </div>
    </div>
  )
}
