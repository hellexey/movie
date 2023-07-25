const ratingColor = (rating: number) => {
  if (rating < 3) {
    return '#E90000'
  } else if (rating < 5) {
    return '#E97E00'
  } else if (rating < 7) {
    return '#E9D100'
  } else {
    return '#66E900'
  }
}

export default ratingColor
