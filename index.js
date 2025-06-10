export default class extends Array
{
  #conjunction
  #disjunction
  #config =
  {
    locale  : 'en-GB',
    style   : 'short'
  }

  /**
   * Gets the configured locale configuration for the list formatters.
   * @returns {string} The configured value.
   */
  get locale()
  {
    return this.#config.locale
  }

  /**
   * Gets the configured style configuration for the list formatters.
   * @returns {string} The configured value.
   */
  get style()
  {
    return this.#config.style
  }

  /**
   * Sets the locale configuration for the list formatters, and reloads the formatters.
   * This will affect the output of conjunction and disjunction methods.
   * @param {string} locale The locale to set, e.g. 'en-US', 'es-ES'.
   */
  set locale(locale)
  {
    this.#config.locale = locale
    this.#loadListFormatters()
  }

  /**
   * Sets the style configuration for the list formatters, and reloads the formatters.
   * This will affect the output of conjunction and disjunction methods.
   * @param {string} style The style to set, e.g. 'long', 'short', 'narrow'.
   */
  set style(style)
  {
    this.#config.style = style
    this.#loadListFormatters()
  }

  constructor(...args)
  {
    super(...args)

    // Eager load list formatters with default locale and style settings.
    this.#loadListFormatters()

    // Make all properties non-enumerable to prevent them from being iterated over or serialized.
    const prototype = Object.getPrototypeOf(this)
    for(const key of Object.getOwnPropertyNames(prototype))
    {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, key)
      descriptor.enumerable = false
      Object.defineProperty(prototype, key, descriptor)
    }
  }

  /**
   * Loads the list formatters with the current locale and style configurations.
   * This is called automatically in the constructor, and when the locale or style is set.
   * @private
   */
  #loadListFormatters()
  {
    this.#conjunction = new Intl.ListFormat(this.#config.locale, { style:this.#config.style, type:'conjunction' })
    this.#disjunction = new Intl.ListFormat(this.#config.locale, { style:this.#config.style, type:'disjunction' })
  }

  /**
   * Array conjunction list format.
   * @example ['apple', 'orange', 'banana'].conjunction() === 'apple, orange and banana'
   * @param {Object} [config] Optional configurations for the conjunction format.
   * @param {string} [config.locale] Locale to format the list in, e.g. 'en-US', 'es-ES'.
   * @param {string} [config.style] Style to format the list in, e.g. 'long', 'short', 'narrow'.
   * @return {string} The formatted list.
   */
  conjunction(config)
  {
    if(config?.locale)
    {
      this.locale = config.locale
    }

    if(config?.style)
    {
      this.style = config.style
    }

    return this.#conjunction.format(this.map(String))
  }

  /**
   * Array disjunction list format
   * @example ['apple', 'orange', 'banana'].disjunction() === 'apple, orange or banana'
   * @param {Object} [config] Optional configurations for the conjunction format.
   * @param {string} [config.locale] Locale to format the list in, e.g. 'en-US', 'es-ES'.
   * @param {string} [config.style] Style to format the list in, e.g. 'long', 'short', 'narrow'.
   * @return {string} The formatted list.
   */
  disjunction(config)
  {
    if(config?.locale)
    {
      this.locale = config.locale
    }

    if(config?.style)
    {
      this.style = config.style
    }

    return this.#disjunction.format(this.map(String))
  }

  /**
   * Compares two arrays and return the distinct values
   * that are shared between the different arrays.
   * @param {...Array} args Arrays to compare "this" context to.
   * @returns The distinct items that are shared between the arrays.
   */
  intersection(...args)
  {
    if(args.every(Array.isArray))
    {
      const 
        unique      = this.unique(),
        reducer     = (accumulator, arg) => accumulator.filter(item => arg.includes(item)),
        intersected = args.reduce(reducer, unique)
  
      return intersected
    }
    else
    {
      const error = new TypeError('All arguments must be an array')
      error.code  = 'E_ARRAY_INTERSECTION_INVALID_ARGUMENT'
      throw error
    }
  }

  /**
   * Returns the last item in the array.
   * @param {number} [offset] The offset from the last item in "this" array.
   * @returns The last item in "this" array, or item at offset from the last item.
   */
  last(offset = 0) 
  {
    offset = Math.abs(offset)
    return this[(this.length - 1) - offset]
  }

  /**
   * Compares multiple arrays and return the distinct values that are exclusivly in one 
   * or the other arrays.
   * @param {...Array} args Arrays to compare "this" context to.
   * @returns The items that are not shared between the arrays.
   */
  xor(...args)
  {
    if(args.every(Array.isArray))
    {
      const
        reducer = (accumulator, arg, i, args) =>
        [
          ...accumulator.filter(item => !arg.includes(item)),
          ...arg.filter(item => !accumulator.includes(item) && !args.some((a, j) => j !== i && a.includes(item)))
        ],
        accumulated = [this].concat(args).reduce(reducer, [])
  
      return this.unique.apply(accumulated)
    }
    else
    {
      const error = new TypeError('All arguments must be an array')
      error.code  = 'E_ARRAY_XOR_INVALID_ARGUMENT'
      throw error
    }
  }

  /**
   * Returns the distinct values of "this" context, and any additional arrays passed as arguments.
   * @param {...Array} [args] Optional arrays to include unique values from in the result.
   * @returns The unique items in all the arrays.
   */
  unique(...args)
  {
    if(args.every(Array.isArray))
    {
      const
        flat  = this.concat(...args.flat()),
        set   = new Set(flat)
  
      return this.constructor.from(set)
    }
    else
    {
      const error = new TypeError('All arguments must be an array')
      error.code  = 'E_ARRAY_UNIQUE_INVALID_ARGUMENT'
      throw error
    }
  }

  /**
   * Normalises the input to an instance of the class.
   * Wraps the input as an array if it is not already an array.
   * @param {*} input The input to normalize.
   * @returns The normalized array.
   */ 
  static normalize(input)
  {
    if(input instanceof this)
    {
      return input
    }
    else if(Array.isArray(input))
    {
      return this.from(input)
    }
    else
    {
      return this.from([ input ])
    }
  }
}
