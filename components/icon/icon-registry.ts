import tkIcons from './tk-icons'

export class IconRegistry {
  public static getInstance(): IconRegistry {
    const host: { __iconRegistryInstance: IconRegistry } = (window ||
      IconRegistry) as any
    if (!host.__iconRegistryInstance) {
      host.__iconRegistryInstance = new IconRegistry()
    }
    return host.__iconRegistryInstance
  }

  private defaultIconRegistried = false

  public registryDefaultIcons() {
    if (!this.defaultIconRegistried) {
      this.registrySvgSymbols(tkIcons)
      this.defaultIconRegistried = true
    }
  }

  public registrySvgSymbols(symbols: string) {
    const doc = new DOMParser().parseFromString(symbols, 'text/xml')

    const host = document.createElement('div')
    host.setAttribute('style', 'display: none;')
    host.appendChild(doc.querySelector('svg'))

    document.querySelector('body').appendChild(host)
  }
}
