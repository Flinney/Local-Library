//helper function below
function _findItemById(items, id) {
  return items.find((item) => item.id === id)
}


function findAccountById(accounts, targetId) {
  return _findItemById(accounts, targetId)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last < b.name.last ? -1 : 1)
}

function getTotalNumberOfBorrows({
  id
}, books) {
  let total = 0
  for (book of books) {
    for (user of book.borrows) {
      if (user.id === id) {
        total++
      }
    }
  }
  return total
}

function getBooksPossessedByAccount({
  id
}, books, authors) {
  const filtered = books.filter((book) => book.borrows.some((user) => user.id === id && !user.returned))
  for (book of filtered) {
    book['author'] = _findItemById(authors, book.authorId)
  }
  return filtered
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};