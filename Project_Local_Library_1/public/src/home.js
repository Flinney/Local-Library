//helper function below
function _getTotalArrayCount(arr) {
  return arr.length
}

function getTotalBooksCount(books) {
  return _getTotalArrayCount(books)
}

function getTotalAccountsCount(accounts) {
  return _getTotalArrayCount(accounts)
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (!book.borrows[0].returned) {
      acc++
    }
    return acc
  }, 0)
}

function getMostCommonGenres(books) {
  const genreObj = {}
  for (book of books) {
    if (genreObj[book.genre]) {
      genreObj[book.genre]++
    } else {
      genreObj[book.genre] = 1
    }
  }
  const genreArr = Object.entries(genreObj).map(([name, count]) => ({
    name,
    count
  }))
  const sorted = genreArr.sort((a, b) => b.count - a.count)
  return sorted.slice(0, 5)
}

function getMostPopularBooks(books) {
  return Object.entries(
      books.reduce((acc, book) => {
        acc[book.title] = book.borrows.length
        return acc
      }, {})
    )
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = []
  for (author of authors) {
    const writtenWorks = books.filter((book) => book.authorId === author.id)
    popularAuthors.push({
      'name': (`${author.name.first} ${author.name.last}`),
      'count': writtenWorks.reduce((acc, book) => acc + book.borrows.length, 0)
    })
  }
  return popularAuthors.sort((a, b) => b['count'] - a['count']).slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};