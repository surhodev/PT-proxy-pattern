/**
 * 3 kind of proxies
 * - Remote (for remote ressource, like HTTP, Promises, ...)
 * - Virtual (for creating heavy ressources, kind of caching )
 * - Protection (for users restrictions)
 */

/** BookParser interface */
class IBookParser {
  book = null

  constructor(book) {
    this.book = book
  }

  displayNumberChars() {}
}

/** Original book parser with a heavy load in constructor */
class BookParser extends IBookParser {
  numberChars = 0

  constructor(book) {
    super(book)

    this.numberChars = book.length
    console.log('HEAAAAAVY LOAD !')
  }

  displayNumberChars() {
    console.log(`There are ${this.numberChars} chars in this book.`)
  }
}

/** Proxy that IS A book parser and HAS A book parser. 
 * He tries to optimize the huuuge load of original parser 
 */
class LazyBookParserProxy extends IBookParser {
  bookParser = null

  constructor(book) {
    super(book)
  }

  displayNumberChars() {
    if( !this.bookParser ) this.bookParser = new BookParser(this.book)
    this.bookParser.displayNumberChars()
  }
}

// Use of the Pattern
const book = 'huuuuuge book'
// Using parser without proxy
console.log('--- without proxy')
console.log('new BookParser')
const parser = new BookParser(book)
console.log('call')
parser.displayNumberChars()

// Using proxy
console.log('--- with proxy')
console.log('new LazyBookParser')
const proxyParser = new LazyBookParserProxy(book)
console.log('proxy call')
proxyParser.displayNumberChars()