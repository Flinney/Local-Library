//helper function below
function _findItemById(items, id) {
  return items.find((item) => item.id === id)
}


function findAuthorById(authors, id) {
  return _findItemById(authors, id)
}

function findBookById(books, id) {
  return _findItemById(books, id)
}

function partitionBooksByBorrowedStatus(books) {
  const onLoan = books.filter((book) => !book.borrows[0].returned)
  const available = books.filter((book) => book.borrows[0].returned)
  return [onLoan, available]
}

function getBorrowersForBook({
  borrows
}, accounts) {
  let combined = []
  for (transaction of borrows) {
    const account = accounts.find((account) => account.id === transaction.id)
    account['returned'] = transaction.returned
    combined.push(account)
  }
  return combined.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};