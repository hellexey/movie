const descriptionCut = function (description: string) {
  if (description.length > 100) {
    const lastSpaceIndex = description.lastIndexOf(' ', 190)
    return description.substring(0, lastSpaceIndex) + '...'
  }
  return description
}

export default descriptionCut
